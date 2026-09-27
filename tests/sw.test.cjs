const { test } = require('node:test');
const assert = require('node:assert/strict');
const vm = require('node:vm');
const fs = require('node:fs');
const path = require('node:path');
const root = path.resolve(__dirname, '..');
const source = fs.readFileSync(path.join(root, 'sw.js'), 'utf8');
test('every precached file and manifest icon exists in source', () => {
  const block = source.match(/const (?:PRECACHE|ASSETS|SHELL) = (\[[\s\S]*?\]);/)[1];
  const files = [...block.matchAll(/['"]([^'"]+)['"]/g)].map(m => m[1]);
  const manifest = JSON.parse(fs.readFileSync(path.join(root, 'manifest.webmanifest'), 'utf8'));
  files.push(...manifest.icons.map(icon => icon.src));
  for (const file of files) {
    let relative = file.replace(/^\.?\//, '');
    if (!relative || relative.endsWith('/')) relative += 'index.html';
    assert.ok(fs.existsSync(path.join(root, relative)), `Missing PWA asset: ${file}`);
  }
});
function worker({ status = 200, offline = false, installFails = false } = {}) {
  const handlers = {}, writes = [], deleted = [], held = [];
  let skipped = false;
  const response = { status, ok: status === 200, type: 'basic', clone() { return this; } };
  const cache = { addAll: async () => { if (installFails) throw Error('missing shell'); },
    put: async (...args) => writes.push(args), match: async () => undefined };
  vm.runInNewContext(source, {
    URL, Request, Response,
    self: { location: { origin: 'https://example.test', href: 'https://example.test/sw.js' },
      registration: { scope: 'https://example.test/' },
      clients: { claim: async () => {} }, skipWaiting: async () => { skipped = true; },
      addEventListener: (name, fn) => { handlers[name] = fn; } },
    caches: { open: async () => cache, match: async () => undefined,
      keys: async () => ['another-app-cache'], delete: async (key) => deleted.push(key) },
    fetch: async () => { if (offline) throw Error('offline'); return response; }
  });
  return { handlers, writes, deleted, held, skipped: () => skipped,
    async request(overrides = {}) {
      let result;
      handlers.fetch({ request: { url: 'https://example.test/index.html', method: 'GET', mode: 'navigate',
        headers: { get: () => 'text/html' }, ...overrides },
        respondWith: p => { result = p; }, waitUntil: p => held.push(p) });
      const value = await result;
      await Promise.all(held);
      await new Promise(resolve => setImmediate(resolve));
      return value;
    }
  };
}
test('HTTP errors never replace the good offline page', async () => {
  const w = worker({status:503}); await w.request(); assert.equal(w.writes.length,0);
});
test('successful navigation is cached', async () => {
  const w = worker(); await w.request(); assert.equal(w.writes.length,1);
});
test('POST and cross-origin requests are never intercepted', async () => {
  const w = worker(); assert.equal(await w.request({method:'POST'}),undefined);
  assert.equal(await w.request({url:'https://other.test/index.html'}),undefined);
});
test('activation preserves other applications caches', async () => {
  const w = worker(); let pending; w.handlers.activate({waitUntil:p=>pending=p});
  await pending; assert.deepEqual(w.deleted,[]);
});
test('offline asset miss produces a Response, never undefined', async () => {
  const w = worker({offline:true}); const result = await w.request({mode:'cors',headers:{get:()=>''}});
  assert.ok(result instanceof Response);
});
test('failed shell update does not replace the working worker', async () => {
  const w = worker({installFails:true}); let pending; w.handlers.install({waitUntil:p=>pending=p});
  await assert.rejects(pending); assert.equal(w.skipped(),false);
});
