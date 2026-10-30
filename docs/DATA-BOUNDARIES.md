# Package and data boundaries

This document defines what belongs in the public Sophia's Imagination web app and what must remain outside it. It is intentionally public-safe.

## Installable product

Sophia's Imagination is a static GitHub Pages progressive web app (PWA). It has no native Windows or Android package, server, database, account system, analytics, cookies, or form intake.

The only deployable source of truth is `.pages-manifest`. Running:

```powershell
python scripts/verify_site.py --build .pages-artifact
```

creates the generated deployment artifact. As of 2026-10-29 it contains 54 allowlisted files; 52 are HTTP-comparable because `CNAME` and `.nojekyll` are Pages controls. The generated directory is ignored and is not committed.

The runtime payload is limited to:

- public HTML, `manifest.webmanifest`, `sw.js`, `offline.html`, sitemap, robots, domain and Pages controls;
- self-hosted fonts and their license files;
- PWA icons and public web-image derivatives;
- `assets/provenance.json`, which contains public derivative hashes and dimensions only.

The browser installation is sourced from the live HTTPS origin. Do not copy the whole repository into an installer, and do not manufacture or sideload an APK. A Play Store TWA would be a separate project requiring its own approval, signing, Digital Asset Links and acceptance tests.

## Repository-only maintenance data

These files are needed to maintain and verify the product but are not shipped by `.pages-manifest`:

- Markdown documentation and handoffs;
- tests, verification scripts and the guarded push helper;
- GitHub Actions workflows, Git history and branch metadata;
- ignored backups, generated artifacts and local review evidence.

Repository-only does not mean private: this is a public repository. Every committed file still has to be safe for public view.

## Data that must stay outside the package and public repository

- credentials, tokens, cookies, browser profiles, MFA or recovery records;
- personal email, billing, account, device or recovery identifiers;
- private source paths, prompts, seeds, generation settings and rejected work;
- private source masters, stems, voice records and commercial-rights evidence;
- unpublished lyrics, story/canon material and associated-venture records;
- private review bundles, provider screenshots, analytics and account-access evidence;
- device inventories, browser engagement/preferences and local installation state.

Those records may support editorial, provenance, rights or recovery work, but the installed PWA does not need them. Keep them in the owner's private archive and pass only an approved, redacted derivative into the public artifact.

## Current privacy checks

The 2026-10-29 audit found no client storage API, analytics, tracking script, cookie setter, account data store, or submission endpoint in the public source. The public image derivatives exposed no EXIF, XMP, GPS, prompt, account, or source-workflow metadata in the audit. Re-run these checks whenever public media or JavaScript changes.

Release verification remains:

```powershell
node --test tests/*.test.cjs
node --check sw.js
python scripts/verify_site.py --build .pages-artifact
git diff --check
```

After deployment, run `python scripts/check_live.py` and separately verify any device installation. A passing build or live comparison does not prove a desktop or phone installation.
