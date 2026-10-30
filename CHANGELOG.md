## 2026-10-29 — DEPLOYED — PROJECT STOCKTAKE, HANDOFF, AND PACKAGE/PRIVACY BOUNDARY

- Reconciled the canonical repository, live Pages state, related project records and associated task history. The October 26 release remains healthy: 11/11 tests pass, the artifact verifier assembles 54 allowlisted files (3,463,469 bytes), and all 52 HTTP-comparable files plus redirects and the branded 404 match live.
- Added `docs/DATA-BOUNDARIES.md` and release-checklist controls that define the PWA as the installable product and explicitly exclude Git history, maintenance tooling, backups, browser/device state, account records, private creative material and personal data.
- Corrected stale dated handoffs, PWA execution notes and device-capability wording. The Android phone audit found no Sophia install; the native APK/TWA lane remains not applicable unless separately approved.
- Preserved the existing 2026-10-29 Claude recovery-sweep correction in `STATUS-HANDOFF.md`. No public page/media content, provider account, social post, generated song or commerce setting was changed; no private source record entered the public repository or artifact.
- Published the two previously local documentation commits plus reconciliation commit `bd00ed3`. GitHub Pages run `41021352301` succeeded, and the post-deploy comparator confirmed all 52 HTTP-comparable files, redirects and branded 404 still match.

## 2026-10-26 — LOCAL — POST-RELEASE HANDOFF RECONCILIATION

- Confirmed the active owner account has the repository and workflow permissions required by the guarded release path. Both 2026-10-26 Pages runs completed successfully, and local/remote `main` matched at `1d51e9d` before this documentation-only correction.
- Corrected `STATUS-HANDOFF.md`, which still named `bda5ab7` as the local branch tip after the final documentation commit. No public artifact, push, deployment, account mutation, post, generation, purchase, or device installation was performed.

## 2026-10-26 — DEPLOYED — HARDENED PWA AND COMPLETE PUBLIC DISCLOSURE

- With explicit owner approval, pushed the accumulated verified `main` release through `bda5ab7`. GitHub Pages run `40379497894` passed the 11-test service-worker/deploy-coverage gate, public-artifact verification, upload, and deployment.
- The hardened `sophai-20260927` worker, CI test gate, LF-normalized public files, and the 404 page's fictional/AI-created character disclosure are now live.
- `python scripts/check_live.py` confirmed all 52 public files match HEAD; apex/www redirects and the branded 404 pass. No social post, provider-account change, generation, purchase, commerce activation, or device installation was performed.

## 2026-10-24 — CG-08 LOCAL SITE CHECKS

- 2026-10-24 — Codex CG-08: fixed the missing fictional/synthetic disclosure on the 404 page. Local Lighthouse homepage scores (performance/accessibility/best practices/SEO): 92/100/100/100; verifier and 11 tests pass, all 9 public HTML pages disclose. No push or deploy; existing owner changes preserved.

# Changelog — sophais-imagination.com

## 2026-10-20 — LOCAL, UNPUSHED — HANDOFF PROTOCOL AND LIVE-STATE CORRECTION

- Added `STATUS-HANDOFF.md` at the repository root: the single, public-safe source of current state, working rules, next actions and a work log for any model or agent. Its protocol requires every agent to record intended work under ACTIVE WORK **before** starting and to update the file **after** finishing, so interrupted work is never invisible.
- Added `AGENTS.md` and `CLAUDE.md` pointers so Codex, Cursor, Claude Code and other agent tools load the protocol automatically. All three files are repository-only; the verifier confirms none of them ship.
- **Corrected a false live-state claim.** `README.md` said the live release was `753de4d` (v0.3.1), and `ROADMAP.md` and `ROADMAP-EXECUTION-2026-09-27.md` called the PWA unreleased. Hashes of live `sw.js`, `manifest.webmanifest`, `index.html` and `sitemap.xml`, fetched on 2026-10-20, match `4855423` exactly; `753de4d` has no service worker at all. v0.3.2 is marked SHIPPED 2026-09-26. The hardened worker and everything after it remain unpushed.
- Tests 11/11; `verify_site.py --build .pages-artifact` passes; `git diff --check` clean. Touched files were backed up to `_to_delete/backups-2026-10-20-handoff/`. No push, deploy, account change, post, generation or purchase.

## 2026-10-16 — DOCS — README CURRENT STATE

- README "Current state" still described the September truth-state patch as uncommitted and `753de4d` as the newest work. Replaced with the actual state: live is `753de4d`; local `main` holds the PWA, hardened worker, CI test gate, and renormalization, verified and unpushed; the owner push is the only remaining engineering step. No site file changed.

## 2026-10-16 — READ-ONLY AUDIT — STAGE CATALOG IS TWO MONTHS BEHIND

- Crawled the live site: 9 pages, 86 internal references followed, 18 unique targets, **0 broken**. Every page carries one `<main>`, one `<h1>`, a title, and image alternatives. `404.html` has no description or canonical, which is correct — it is an intentional `noindex` page the verifier exempts.
- Re-verified the whole pipeline after another agent's line-ending renormalization landed: verifier passes, `sw.js` valid, tests 11/11, CI build simulation produces the same 54-file artifact. The committed blobs contain no CRLF, so the renormalization was correct; CRLF remaining in some working-tree files is harmless because git normalizes it on read, which is what `.gitattributes` was for.
- **Found the one substantive gap.** A read-only check of the linked Suno account shows **four** public songs while the Stage lists **two**. The unlisted pair has been public since 2026-07-14 and 2026-08-20, and includes the account's pinned, most-liked track. This is not the August defect repeating: that was a false statement, and the Stage is evidence-scoped by design, listing only songs that passed owner story-boundary review. It is understatement by omission, and the review — not the policy — is what is overdue.
- One unlisted song needs a general-audience boundary decision from the owner; the other appears to need nothing but approval. A dated review packet with both options, a recommendation, and a disclosed bias (Claude co-wrote one of the two lyrics) is held in the owner's private working archive and deliberately **not** committed here, because the decision material quotes lyrics and this repository is strictly general-audience.
- Recorded a second owner-side gap: the Suno profile's public About discloses a fictional character but not an AI/synthetic origin, while two public voice profiles are visible. This is the same gap that keeps the profile cards withheld from Official Links.
- No site, repository content, provider account, post, or generation was changed by this audit. The nine queued commits remain unpushed and the live site still serves the older `sophai-v1.0.0` worker.

## 2026-10-16 — LOCAL, UNPUSHED — ONE-TIME LINE-ENDING RENORMALIZATION

- Ran the deferred `git add --renormalize .` as its own commit (`5d6c133`) now that no branch is pending (`chore/eol-…` and `codex/roadmap-sites-20260927` are fully contained in `main`; `cursor/pwa-install-cb61` stays unmerged by policy).
- Eight text files moved from CRLF to LF in the repository: `README.md`, `scripts/verify_site.py`, `sitemap.xml`, and five `docs/` files. `git diff --ignore-cr-at-eol` is empty, so there is no content change. `sitemap.xml` is the only deployed file affected; its served bytes change on the next deploy, which the health workflow will compare against the new commit.
- Re-verified on the renormalized tree: `node --test tests/*.test.cjs` 11/11; `python3 scripts/verify_site.py --build .pages-artifact` passes.
- Housekeeping: the commit left a `HEAD.lock` and ten `tmp_obj_*` files because file deletion is disabled in this session's mount. They were moved, not deleted, to `.git/stale-HEAD-lock-20261016` and `.git/stale-tmp-objs-20261016/`, so `_ops/push.ps1` will not trip on them. Delete those two paths at your convenience. A stray empty `.del-probe` left by another session was moved to the portfolio `_to_delete/`.
- `main` is now eight commits ahead of `origin/main`. No push, deploy, account change, post, generation, or purchase was performed.

## 2026-10-16 — LOCAL, UNPUSHED — DEPLOY GATED ON TESTS

- Simulated the GitHub Actions build job end to end locally before any push: `node --test tests/*.test.cjs` 11/11, then the exact CI command `python3 scripts/verify_site.py --build .pages-artifact`, producing a 54-file artifact that carries the hardened worker and leaks no repository-only file. The September PWA push failed the Pages verifier silently and sat dead for a day; this is the check that would have caught it.
- **Closed the failure mode the hardening created.** Removing `.catch(() => self.skipWaiting())` turned a soft failure into a hard one: `cache.addAll()` now rejects on a single 404, install fails, and no service worker registers at all, with nothing in the UI saying so. Added `tests/precache-deploy-coverage.test.cjs`, which checks *deploy* coverage rather than repository existence — `sw.test.cjs` only verified that PRECACHE files exist in the repo, but `.pages-manifest` decides what ships, so a file could exist, pass, and still 404 in production.
- The new test also enforces Android's installability bar (192 and 512 plus a maskable icon) and that exactly **one** service worker ships — which fails loudly if `cursor/pwa-install-cb61` is ever merged.
- **The tests were never run in CI** (no `package.json`, no test step). `pages.yml` now runs them before assembling the artifact, so a broken worker blocks the deploy instead of shipping. The glob `tests/*.test.cjs` is deliberate: bare `node --test` also scans `_to_delete/` and fails on stale backup copies.
- Each new assertion was verified by mutation rather than assumed. Adding an undeployed PRECACHE url, removing `offline.html` from `.pages-manifest`, dropping the maskable icon, and simulating the second-service-worker merge each fail the suite; all four guards fire, and the restored state passes 11/11.
- Still unpushed. `main` is six commits ahead of `origin/main`; the live site continues to serve the older `sophai-v1.0.0` worker, confirmed by inspecting the served script.

## 2026-10-14 — LOCAL, UNPUSHED — BRANCH RECONCILIATION

Four agents had left four divergent branches and `main` had not moved since
2026-09-26. Reconciled to a single verified `main`, still unpushed.

- Merged `codex/roadmap-sites-20260927` (service-worker hardening). Re-verified before merging rather than taken on report: `verify_site.py` passes, `node --check` valid, `tests/sw.test.cjs` 7/7. The substantive change is that `.catch(() => self.skipWaiting())` is gone from the install handler, so a worker whose precache failed can no longer replace a working one; cache deletion is now scoped to the `sophai-` prefix; non-200 navigations are no longer cached; and failed fetches return `Response.error()` instead of `undefined`.
- Merged `chore/eol-normalization-and-live-pwa-evidence` (`.gitattributes` plus the dated live verification record).
- **Did not merge `cursor/pwa-install-cb61`.** It is a competing PWA implementation written before the shipped one and is superseded. Merging it would have regressed the site: it adds a *second* service worker (`service-worker.js` beside `sw.js`) on one origin, its manifest offers only 180×180 and 32×32 icons with no maskable variant — below the 192/512 Android needs, so installability would likely fail — and its `start_url` is `/install.html`, which would launch the installed app onto an instructions page instead of the site. Its two new pages also carry no AI-created/synthetic disclosure and are absent from `.pages-manifest`. Retained unmerged as history; nothing in it is unique.
- Only one file in this merge actually deploys: `sw.js`. `.gitattributes`, `ROADMAP.md`, `ROADMAP-EXECUTION-2026-09-27.md`, `tests/sw.test.cjs` and `docs/LIVE-PWA-VERIFICATION-2026-09-27.md` are repository-only.
- Verified on the exact merged tree: site verifier passes, `sw.js` valid, SW suite 7/7, manifest valid with all four icons present on disk, all 9 HTML files parse, exactly one service worker in the repository.
- Pre-flighted the `_ops/push.ps1` gates so the push does not fail late: all four unpushed commits use `@users.noreply.github.com` for author and committer, `git diff --check` is clean, the working tree is clean, and the checkout was moved to `main` (the helper refuses any other branch). Codex's branch was confirmed fully contained in `main` first, so nothing was lost.
- No push, deployment, account change, post, generation, purchase, or device installation was performed.

## 2026-09-26 — FIX: PWA DEPLOY WAS FAILING

- The 2026-09-25 PWA push never went live: the Pages workflow's verifier failed with "Root public files missing from .pages-manifest: icon-192.png, icon-512.png". Those two root-level icons were unreferenced duplicates (the manifest, pages and service worker all use `/assets/icon-*.png`), so they were removed from the repository rather than published. `scripts/verify_site.py` passes.

## 2026-09-25 — LOCAL, UNRELEASED — INSTALLABLE PROGRESSIVE WEB APP

- Added `manifest.webmanifest`, `sw.js`, and `offline.html`, plus a maskable and standard icon set at 192 and 512, and listed all three new files in `.pages-manifest`.
- Wired manifest, theme-color, apple/mobile web-app meta, touch icon, and service-worker registration into all eight public HTML pages. Registration failure is caught, so a browser without service-worker support degrades to the plain site.
- Chose network-first for navigations deliberately: the site's whole thesis is not claiming things that are not true, and a cache-first HTML strategy would let a superseded release claim be served to an online reader. Immutable same-origin assets stay cache-first. Caches are versioned and pruned on activate.
- `offline.html` repeats the AI-created/synthetic disclosure, states plainly that cached pages may be out of date, and is intentionally `noindex` and absent from the sitemap; `INTENTIONALLY_NOINDEX_HTML` in the verifier was extended to match.
- Repaired files a concurrent process had written with unrendered `{{`/`}}` template braces. `sw.js` failed `node --check`, so the worker would never have installed and the PWA would have appeared to work while doing nothing. Removed a duplicate `assets/img/icon-*.png` set in favour of the `/assets/` set the manifest references.
- `scripts/verify_site.py` passes clean from `.pages-manifest`; `sw.js` is valid JavaScript and `manifest.webmanifest` is valid JSON.
- No push, deployment, account change, post, generation, purchase, or device installation was performed. Installing the app on a phone is an owner action taken in the device browser after the next deploy.

## 2026-09-24 — LOCAL, UNRELEASED ROADMAP RECONCILIATION

- Safely fast-forwarded local `main` to deployed source commit `753de4d` before continuing the existing truth-state patch; the September privacy/terms metadata and all prior local work are both preserved.
- Reverified the live release at `753de4d`: Pages run `35925135241` succeeded, all 45 HTTP-comparable public files matched, internal references passed, apex/www redirects and the branded 404 were healthy, and the two song destinations remained reachable. Reachability is not ownership or rights proof.
- Added an evidence-gated six-year revenue model. Internal audience and financial targets are not reproduced in the public repository, and no revenue engine is represented as active.
- Added commerce-readiness gates for source masters, rights, print proofing, seller/tax/payment/fulfillment decisions, privacy, refunds, test orders, commercial music, and collaborations. The ten 800 × 1067 gallery images are recorded as web derivatives, not print-ready inventory.
- Added a dated roadmap-progress record with completed evidence, remaining backlog, exact owner blockers, and the smallest next action.
- Rebuilt the deployment artifact and completed rendered QA at 320 × 800 and 1440 × 900: no horizontal overflow or console warning/error; mobile menu, skip link, image-viewer focus containment/Escape/return, updated diary truth state, and generic privacy wording passed.
- Hardened the local verifier for unique release counts, stale singular release wording, duplicate identifiers, image alternatives, indexable-page descriptions and canonicals, intentional `noindex` pages, and exact sitemap coverage.
- Removed the hover cue from the static website card and capped its desktop width so only future interactive cards advertise motion.
- No commit, push, deployment, account/profile change, post, generation, store, payment setup, purchase, distribution submission, or outreach was performed.

## 2026-09-23 — SUPPORTING-PAGE METADATA — DEPLOYED

- Added descriptions and self-canonical URLs to the privacy and terms pages while preserving their `noindex` state.
- Source commit `753de4d`; GitHub Pages run `35925135241` succeeded. A 2026-09-24 read-only check matched all 45 HTTP-comparable public files to that commit and passed internal links, redirects, key assets, and the branded 404.

## 2026-08-26 — LOCAL, UNRELEASED TRUTH-STATE RECONCILIATION

- Corrected the next local site artifact so it no longer claims the songs exist only on Suno or that the currently listed destinations are the only places Sophia exists. The owner-published X account now links YouTube, while an owner-controlled Instagram with a different spelling also exists; neither destination is added to Official Links until the owner approves its public-safe identity and disclosure.
- Withheld the Suno and X profile cards from the next local artifact after the linked Suno profile exposed two additional public songs and unresolved account-level identity material. No live provider content was changed.
- Retained both original owner-published songs in the next local general-audience Stage after owner-editor story-boundary review. The two additional account-level songs remain outside the site record pending their own review.
- Reframed creation and no-sampling statements as owner-editor representations and stated that the public page does not independently prove source ownership or commercial rights.
- Refreshed README, handoff, release checklist, roadmap, and future-work briefs for the four-song Suno catalog, two X posts, controlled Instagram, and YouTube channel. C01 is now described as the next identity/campaign post, not the first-ever account post.
- Added a public-safe audio provenance record and an evidence-first participation-loop protocol. Private prompts, source identifiers, billing evidence, and master files remain in the owner's private archive.
- Reconciled the diary and Stage to the same two-song reviewed record, refreshed the Terms revision date, and recorded the owner's correct-plan-at-creation attestation without publishing private billing details.
- Extended the local verifier so active release markers cannot coexist with stale no-music copy or singular/plural release claims, and so held profile destinations are detected by generic URL shape without embedding private account handles in verifier code.
- No account, post, profile, queue, schedule, push, deployment, or public archive entry was changed by this local reconciliation.

## 2026-08-19 — v0.3.0 THE STAGE OPENS — DEPLOYED

- **Corrected a now-false claim.** The Stage section stated "No song has been released yet" and "nothing streamed." Two songs were published on Suno on 2026-08-16, making that copy inaccurate in the understating direction. Replaced with the two releases, their dates, and links.
- Releases listed: "Sophia's Fall" and "The Ancestors Are Us", both published 2026-08-16 on Suno.
- **Closed an impersonation gap.** Suno profile `@sophia_imagines` added to Official Links. The site tells readers "if it isn't listed here, it isn't Sophia" while the only channel carrying her music was unlisted.
- Release copy recorded the owner-editor's originality, lyric, synthetic-voice, and no-sampling representations. Its "Suno only" statement later became stale when the official X account linked YouTube uploads; the 2026-08-26 local reconciliation removes that overclaim.
- Hero subtitle and meta description updated to reflect that music now exists.
- Sitemap homepage `lastmod` updated; other pages unchanged.
- Source commit `bb76480`; Pages run #14 succeeded on 2026-08-19 Alaska time. On 2026-08-26, all 45 HTTP-comparable public files matched that commit; redirects and the branded 404 passed. Scheduled health run #2 passed on 2026-08-24.

## 2026-08-13 — v0.2.2 DEPLOYED

- Privacy/resilience: replaced Google Fonts requests with three self-hosted Latin WOFF2 subsets (125,156 bytes total), preserved exact weight/style matching, and included both SIL OFL 1.1 license texts plus source hashes.
- Provenance: added a public-safe explanation page and machine-readable record of filename, format, dimensions, byte size, and SHA-256 for every public media derivative in the release. The copy explicitly distinguishes byte identity from private source records, rights, and content credentials.
- Correctness/accessibility: corrected the diary's premature vote wording; added factual concept-specific image descriptions; expanded visible-focus and reduced-motion support; tightened dialog/footer semantics; added async image decoding where safe.
- Metadata/privacy: completed Open Graph/Twitter image metadata, added a no-referrer policy, and added a practical same-origin meta CSP compatible with current inline styles/scripts.
- Deployment safety: introduced one public artifact manifest and zero-dependency source/live verifiers; split build/deploy permissions; pinned official GitHub actions to immutable release SHAs; preserved `.nojekyll`; added timeouts and a main-only weekly/manual live-health check.
- Repository privacy: set the local author to GitHub noreply, added future-author/privacy checks, stopped automatic Git-lock deletion, and sanitized current public documentation. Older public commits still require a separately approved history rewrite if they are to be removed.
- Operations: added a release checklist and empty evidence-first collaboration record template. Prepared a separate local social decision sheet without altering approval, queue, pause, account, or publishing state.
- Release verification: source commit `42513b4`; GitHub Pages run #12 succeeded at 2026-08-14 05:11 UTC (2026-08-13 Alaska time). All 45 HTTP-comparable committed content files matched live byte-for-byte; apex/www redirects, the branded 404, local fonts, WebP selection, mobile layout, and browser console checks passed.

## 2026-08-13 — v0.2.1 DEPLOYED

- Accessibility: added visible-on-focus skip links to Home, Process, Diary, and Collaboration Archive; added/cleaned main, page-navigation, and footer-navigation landmarks across all seven public pages; corrected the Archive rules heading level.
- Gallery/lightbox: replaced mouse-only card activation with native image buttons; added initial focus, Tab/Shift+Tab containment, inert background content, Escape handling, and exact-trigger focus restoration on every close path.
- Contrast: verified `--muted` at 6.85:1 or better on the site's solid backgrounds; replaced the failing ~3.47:1 copyright color with `--muted`.
- Responsive: fixed footer-link horizontal overflow on Home, Process, Diary, and Collaboration Archive at 320 CSS pixels; tablet (768) and desktop (1440) layouts remained clean.
- Performance: added 12 WebP alternatives (hero, stage, 10 concepts) at unchanged dimensions with JPEG fallbacks. Representative hero/gallery pairs were visually compared and all 12 passed dimension/format checks. They total 1,197,134 bytes as WebP versus 1,744,505 bytes as JPEG, a 547,371-byte / 31.4% reduction for supporting browsers. OG, avatar, favicon, and touch icon formats are unchanged.
- Semantics: gallery series labels now render as block-displayed `<span>` elements before each preserved H3; Process images also use `<picture>` without changing public copy.
- Deploy boundary: `.github/workflows/pages.yml` included `assets/***`, so the new WebPs required no allowlist change.
- Live state rechecked 2026-08-13: HTTPS redirects and all seven public pages are healthy; Instagram `@sophais.imagination` remains unavailable publicly; X `@Sophai_imagines` remains at 0 posts and 0 followers.
- Verification: source commit `dbb2af8`; GitHub Pages run #11 succeeded. All seven then-public HTML files and sampled WebPs matched live. Browser DOM/console checks covered skip target activation, lightbox focus containment/return, Escape/close behavior, mobile menu state, overflow at 320/768/1440, WebP selection, workflow YAML, sitemap XML, local references, JavaScript syntax, and `git diff --check`.

## 2026-08-09 — v0.2.0 DEPLOYED (overnight, owner-approved autonomy)

- All 7 deploy files committed to origin via GitHub web UI (base64 → synthetic clipboard paste into the web editor; select-all via synthetic ctrl+a keydown). Each file verified byte-identical vs local using `git show origin/main:<file> | cmp`.
- Local git reconciled: `git reset origin/main`; only repo docs remain as a local commit for the next owner push.

## 2026-08-09 — v0.2.0 (built overnight, pending owner push)

- New pages: `process.html` (art-direction notes ×10), `diary.html` (3 labeled-fiction entries), `polls.html` (collaboration archive, honest zero-state), `404.html`.
- Gallery: series tags added (Couture / Imagined Places / Character Studies / Collaborations / Process) + "deeper" links row; footer links expanded.
- Official Links: Instagram card removed — public check shows @sophais.imagination does not exist; X @Sophai_imagines verified live. Anti-impersonation note reworded.
- Infra: sitemap includes new pages; Pages deploy allowlist includes new pages + 404.
- Docs: `docs/DELEGATION-BRIEFS.md` (music/voice/video/image briefs for other AI models — all execution owner-blocked).
- Tests: 7 pages parse clean; jsdom render checks (10 cards + series tags, 10 process entries, 3 diary entries, 4 poll steps, IG link absent, X link present); all pages HTTP 200 on local serve; sitemap XML + workflow YAML validated. Backups in `_to_delete/backups-2026-08-08/`.

## 2026-08-08 — v0.1.0 deployed (LIVE)

- Repo `castleism/SophaisImagination` created; Pages Source = GitHub Actions; custom domain saved; DNS check passed.
- Cloudflare DNS: 4 apex A records (185.199.108–111.153) + www CNAME → castleism.github.io, all DNS-only.
- Owner pushed via `_ops/push.ps1`; deploy #1 green; Enforce HTTPS enabled; https://sophais-imagination.com verified in browser.

## 2026-08-08 — v0.1.0 (initial build)

- Built complete single-page SFW pop-icon site: hero (Meet Sophia 16:9), always-visible synthetic-media disclosure strip, "What is real / What is fiction" promise cards, 10-concept gallery (selected review-package captions) with lightbox, honest no-releases-yet Music section, three-word collaboration ritual, official-links section with anti-impersonation note, privacy and terms pages.
- Name stylization locked for this site: **Sophia's Imagination** (owner choice, 2026-08-08).
- Owner choices: new repo + GitHub Pages; concept-era honest music framing; general-audience public scope.
- Assets: 16 initial web derivatives from the owner-provided review set (gallery 800×1067, hero 1600×900, OG 1200×630, favicon/touch icons from avatar). This historical site selection does not imply social-package or rights approval; source records remain in the owner's private archive.
- Infra: GitHub Actions Pages workflow with an allowlisted artifact, CNAME, robots.txt, sitemap.xml, `.nojekyll`, and `.gitignore`.
