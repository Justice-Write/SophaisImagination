# Live PWA verification — sophais-imagination.com — 2026-09-27

Read-only verification performed against the **live** origin from a real browser.
No account, provider, deployment, or repository state was changed by this check.

Reachability and correct serving are not ownership, rights, or commercial-use proof.

## What was checked and what was found

Live origin: `https://sophais-imagination.com/`
Live source commit at time of check: `4855423` (`origin/main`).

### Every PWA resource is served, with the correct content type

| Resource | Status | Content-Type |
| --- | --- | --- |
| `/manifest.webmanifest` | 200 | `application/manifest+json; charset=utf-8` |
| `/sw.js` | 200 | `application/javascript; charset=utf-8` |
| `/offline.html` | 200 | `text/html; charset=utf-8` |
| `/assets/icon-192.png` | 200 | `image/png` |
| `/assets/icon-512.png` | 200 | `image/png` |
| `/assets/icon-maskable-192.png` | 200 | `image/png` |
| `/assets/icon-maskable-512.png` | 200 | `image/png` |

The manifest content type matters and is easy to get wrong on static hosts. GitHub
Pages is serving `application/manifest+json`, which is correct; a wrong type here
is a common silent cause of "the install prompt never appears."

### The service worker is actually installed and running

- Registration scope: `https://sophais-imagination.com/`
- Active: yes
- State: `activated`
- Live cache key present in the browser: `sophai-v1.0.0`

This is the check that distinguishes "the files were deployed" from "the PWA
works." A service worker that fails to parse never installs, and the site would
look finished while doing nothing.

### The live worker uses the intended strategy

- Live `CACHE` constant: `sophai-v1.0.0`
- Navigations are **network-first**: confirmed by inspecting the served worker.

This is the deliberate honesty choice, not a performance oversight. Cache-first
HTML would let a superseded release claim be served to a reader who is online.

### Manifest install criteria

- `name`: `Sophia's Imagination`
- `start_url`: `/?source=pwa`
- `display`: `standalone`
- Icons: 4 (192 and 512, each in `any` and `maskable`)
- `<link rel="manifest">` present in the served homepage: yes
- `theme-color`: `#0c1021`

All four manifest icon paths were also confirmed to exist on disk in the
repository, so the manifest does not reference a deleted file. This was worth
confirming because commit `4855423` removed root-level icon duplicates; it
removed only the unreferenced root copies, and the `/assets/` set the manifest
actually points at is intact.

### Public truth state on the live homepage is consistent

- Homepage still claims "no song has been released yet": **no** (correct — songs exist)
- Links marked `data-verifiable-release="true"`:
  - `https://suno.com/s/HPZe5bpsHi4LcZdr`
  - `https://suno.com/s/GlCA9sJAyLF1RlQN`

The stale-claim and verifiable-release markers are in the state the verifier
requires, so the live page is not understating or overstating the catalog.

## What this verification does NOT establish

- **It is not physical device validation.** No phone was used. Whether the
  install prompt appears on a specific Android or iOS version, how the icon
  renders on a given launcher, and how the app behaves in standalone mode are
  owner-side checks on real hardware.
- It does not prove rights, ownership, plan eligibility, or commercial-use
  clearance for any linked song.
- It does not verify Codex's unreleased service-worker hardening, which is not
  deployed. That work is on `codex/roadmap-sites-20260927` at `93bc54b`.

## Unreleased delta at time of check

`codex/roadmap-sites-20260927` @ `93bc54b` is 1 commit ahead of `origin/main`.
Independently re-verified on 2026-09-27 without modifying it:

- `scripts/verify_site.py`: passes
- `node --check sw.js`: valid
- `node tests/sw.test.cjs`: 7 passed, 0 failed

Its worker bumps the cache key to `sophai-20260927`. Releasing it is an owner
decision, not a cleanup step.

## Defect found and fixed separately

The shared working tree showed five modified files: `.pages-manifest`,
`ROADMAP-EXECUTION-2026-09-27.md`, `ROADMAP.md`, `sw.js`, `tests/sw.test.cjs`
— 307 insertions and 307 deletions.

`git diff --ignore-all-space` was empty: the entire diff was CRLF line-ending
churn with **zero content change**. A Windows tool had rewritten the endings.
This also contradicted the reported "checkout is clean" state.

Originals were backed up to `_to_delete/backups-2026-09-27-eol-churn/` and the
churn was reverted, leaving Codex's checkout clean at `93bc54b`.

Root cause: the repository had no `.gitattributes`. Four writers (Claude, Codex,
Cursor, and the owner's Windows editors) share this tree, so the churn recurs.
A `.gitattributes` normalizing text to LF is added on
`chore/eol-normalization-and-live-pwa-evidence`.

**Deliberately not done:** `git add --renormalize .` was not run. It would
rewrite many files at once and collide with Codex's pending branch. Run it once,
as its own commit, after that branch merges.
