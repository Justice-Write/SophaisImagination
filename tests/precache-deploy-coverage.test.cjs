/* Regression guard: every service-worker PRECACHE URL must be in the DEPLOYED artifact.
 *
 * Why this exists, and why it is not a duplicate of sw.test.cjs:
 *
 * sw.test.cjs already asserts that each PRECACHE entry exists in the repository.
 * That is not the same question. `.pages-manifest` is the single source of truth
 * for what actually ships, so a file can exist in the repo, pass that check, and
 * still 404 in production because it was never added to the manifest.
 *
 * That used to be survivable. It is not any more. The 2026-09-27 hardening
 * removed `.catch(() => self.skipWaiting())` from the install handler, which was
 * the right call -- it stops a worker with a half-built cache from replacing a
 * working one. The consequence is that `cache.addAll()` now rejects hard on a
 * single 404, install fails, and the site registers NO service worker at all.
 * No offline support, no install prompt, and nothing in the UI says so.
 *
 * So the failure mode is: someone adds a page, lists it in PRECACHE, forgets
 * `.pages-manifest`, every existing test passes, and the PWA silently dies on
 * deploy. This test is the thing that catches that.
 */

const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const root = path.resolve(__dirname, '..');

function precacheUrls() {
  const source = fs.readFileSync(path.join(root, 'sw.js'), 'utf8');
  const block = source.match(/const (?:PRECACHE|ASSETS|SHELL) = (\[[\s\S]*?\]);/);
  assert.ok(block, 'Could not find the PRECACHE array in sw.js');
  return [...block[1].matchAll(/['"]([^'"]+)['"]/g)].map((m) => m[1]);
}

function manifestEntries() {
  return fs
    .readFileSync(path.join(root, '.pages-manifest'), 'utf8')
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter((line) => line && !line.startsWith('#'));
}

// Resolve a URL the way a static host does: "/" and any directory serve index.html.
function urlToRepoPath(url) {
  let relative = url.replace(/^\.?\//, '');
  if (!relative || relative.endsWith('/')) relative += 'index.html';
  return relative;
}

// `.pages-manifest` entries may name a file, a directory, or a `dir/***` subtree.
function isCoveredByManifest(relativePath, entries) {
  return entries.some((entry) => {
    if (entry === relativePath) return true;
    if (entry.endsWith('***')) return relativePath.startsWith(entry.slice(0, -3));
    if (entry.endsWith('/')) return relativePath.startsWith(entry);
    return false;
  });
}

test('every PRECACHE url is listed in .pages-manifest, so it will not 404 once deployed', () => {
  const entries = manifestEntries();
  const missing = precacheUrls().filter(
    (url) => !isCoveredByManifest(urlToRepoPath(url), entries),
  );

  assert.deepEqual(
    missing,
    [],
    'These PRECACHE urls are NOT in .pages-manifest, so they will 404 in production. ' +
      'Because the install handler no longer swallows errors, addAll() will reject, ' +
      'install will fail, and the site will register no service worker at all. ' +
      'Add them to .pages-manifest or remove them from PRECACHE: ' +
      missing.join(', '),
  );
});

test('every PRECACHE url also exists on disk', () => {
  const missing = precacheUrls().filter(
    (url) => !fs.existsSync(path.join(root, urlToRepoPath(url))),
  );
  assert.deepEqual(missing, [], `PRECACHE urls with no file on disk: ${missing.join(', ')}`);
});

test('manifest.webmanifest icons are deployable and meet installability sizes', () => {
  const entries = manifestEntries();
  const manifest = JSON.parse(
    fs.readFileSync(path.join(root, 'manifest.webmanifest'), 'utf8'),
  );

  const undeployable = manifest.icons
    .map((icon) => icon.src)
    .filter((src) => !isCoveredByManifest(urlToRepoPath(src), entries));
  assert.deepEqual(
    undeployable,
    [],
    `Manifest icons missing from .pages-manifest (they would 404): ${undeployable.join(', ')}`,
  );

  // Android will not offer installation without a 192px icon, and wants 512px
  // for the splash screen. A maskable icon keeps it from being letterboxed.
  const sizes = new Set(manifest.icons.map((icon) => icon.sizes));
  assert.ok(sizes.has('192x192'), 'Manifest needs a 192x192 icon or install will not be offered');
  assert.ok(sizes.has('512x512'), 'Manifest needs a 512x512 icon for the splash screen');
  assert.ok(
    manifest.icons.some((icon) => (icon.purpose || '').includes('maskable')),
    'Manifest needs at least one maskable icon',
  );
});

test('exactly one service worker script is shipped', () => {
  // Two workers on one origin fight over scope and caches. A superseded branch
  // (cursor/pwa-install-cb61) adds `service-worker.js` beside `sw.js`; this
  // fails loudly if it is ever merged.
  const shipped = manifestEntries().filter((entry) => /(^|\/)(sw|service-worker)\.js$/.test(entry));
  assert.deepEqual(
    shipped,
    ['sw.js'],
    `Expected only sw.js to be deployed as a service worker, found: ${shipped.join(', ')}`,
  );
});
