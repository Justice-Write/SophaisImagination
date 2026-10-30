# Release checklist

Use this for every public site change. Built, approved, pushed, deployed, and live-verified are separate states.

## Before the commit

- [ ] Confirm the active repository and current branch.
- [ ] Back up every touched existing file under `_to_delete/backups-YYYY-MM-DD-<scope>/`.
- [ ] Confirm the change contains no private email, absolute local path, credentials, prompts, rejected assets, private lore, or non-general-audience material.
- [ ] Reconcile the package/data boundary in `docs/DATA-BOUNDARIES.md`; never package the repository, browser profile, device inventory, private source archive, or account evidence.
- [ ] Add every new public root file to `.pages-manifest`; keep public assets within its allowed directories.
- [ ] Update page metadata, sitemap dates, `assets/provenance.json`, `ROADMAP.md`, and `CHANGELOG.md` when affected.
- [ ] Run `python scripts/verify_site.py`.
- [ ] Inspect `git diff --check`, the complete staged diff, and the intended author email.

## Publish

- [ ] Commit with a focused message and the repository-local GitHub noreply identity.
- [ ] Record the rollback SHA (`git rev-parse HEAD^`).
- [ ] Push with `.\_ops\push.ps1`; clear a lock only after confirming no Git process is active and using its explicit safety switch.
- [ ] Confirm the source branch contains the intended commit.
- [ ] Confirm the GitHub Pages run succeeds with no unexpected warning.

## Live verification

- [ ] Confirm apex HTTP redirects to apex HTTPS.
- [ ] Confirm `www` resolves to the apex HTTPS site.
- [ ] Check every public HTML route plus one real 404 path.
- [ ] Confirm title, H1, synthetic disclosure, and that the Stage release/zero-state matches current evidence.
- [ ] Open every listed release and Official Link; confirm the destination, title/handle, disclosure, and public availability.
- [ ] Confirm the collaboration archive remains at zero unless a real source URL, close record, and verified counts exist.
- [ ] Confirm representative WebP, JPEG fallback, font, and provenance JSON requests.
- [ ] Compare live bytes or hashes with the release artifact for changed files.
- [ ] Run `python scripts/check_live.py` after Pages reports success; it compares every HTTP-comparable committed content file except `.nojekyll` and `CNAME`, plus redirects and the branded 404.
- [ ] Confirm the main-only live-health workflow remains enabled; its weekly check is read-only and does not replace release verification.
- [ ] Perform keyboard and responsive smoke checks for any affected interaction.
- [ ] Mark the release shipped in `ROADMAP.md` and `CHANGELOG.md` only after these checks pass.

## Device installation (separate acceptance)

- [ ] Treat the live HTTPS PWA as the install source. Do not create or sideload an APK from this static repository.
- [ ] Record the target separately: Windows desktop, Android phone, or both. A passing Pages deployment does not prove installation.
- [ ] Before install, confirm the live manifest, worker and 192/512 icons return successfully and the browser offers the expected app identity.
- [ ] After install, launch it in a standalone app window, confirm its origin is `https://sophais-imagination.com`, and verify the expected icon/name.
- [ ] Confirm the hardened worker activates and the offline fallback works without clearing unrelated browser/app data.
- [ ] Verify the operating system/browser registration or Android WebAPK/shortcut identity; do not infer it from a home-screen icon alone.
- [ ] Keep browser preferences, cookies, device serials, package inventories and other personal local state out of repository evidence.

## External-state reminder

Site deployment never proves social-account ownership, provider write access, post publication, analytics, music rights, or search-engine indexing. Verify each separately.

The owner confirms the correct eligible plan was active when the current songs were generated. Preserve dated private plan evidence and applicable terms when available as audit corroboration; do not treat their absence as unknown owner knowledge. A new commercial action still needs exact owner approval and substantive source/rights review.
