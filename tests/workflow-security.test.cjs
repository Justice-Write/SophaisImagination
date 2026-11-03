/* Regression guards for the repository's CI supply-chain policy.
 *
 * The public release record says every GitHub Action is pinned to an immutable
 * release commit. A moving major tag such as `@v6` violates that boundary even
 * when the referenced action and runtime are otherwise correct. These tests
 * keep both the action pins and the explicitly qualified runtime floors visible.
 */

const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const root = path.resolve(__dirname, '..');
const workflowsDir = path.join(root, '.github', 'workflows');

function workflowFiles() {
  return fs
    .readdirSync(workflowsDir)
    .filter((name) => /\.ya?ml$/i.test(name))
    .sort();
}

function workflowSource(name) {
  return fs.readFileSync(path.join(workflowsDir, name), 'utf8');
}

test('every external GitHub Action is pinned to an immutable commit', () => {
  const violations = [];

  for (const name of workflowFiles()) {
    for (const [index, line] of workflowSource(name).split(/\r?\n/).entries()) {
      const match = line.match(/^\s*uses:\s*([^\s#]+)/);
      if (!match || match[1].startsWith('./')) continue;
      if (!/^[^@\s]+@[0-9a-f]{40}$/.test(match[1])) {
        violations.push(`${name}:${index + 1} ${match[1]}`);
      }
    }
  }

  assert.deepEqual(
    violations,
    [],
    'Remote workflow actions must use an immutable 40-character commit SHA: ' +
      violations.join(', '),
  );
});

test('Pages build retains the qualified Node and Python versions', () => {
  const source = workflowSource('pages.yml');
  assert.match(source, /python-version:\s*["']3\.13\.18["']/);
  assert.match(source, /node-version:\s*["']22\.23\.4["']/);
});

test('live-site health check retains the qualified Python version', () => {
  const source = workflowSource('site-health.yml');
  assert.match(source, /python-version:\s*["']3\.13\.18["']/);
});
