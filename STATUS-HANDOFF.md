# STATUS-HANDOFF — sophais-imagination.com

> **Any model or agent (Claude, ChatGPT/Codex, Cursor, Copilot, Gemini, local models): read this whole file before you touch the repository.** It's the single source of truth for where the project stands and how to work here. It's written so you can get up to speed with no other context.

**Last updated:** 2026-10-30 by Codex (Windows desktop PWA installed and verified; Android remains separate)

---

## ACTIVE WORK

*Add an entry here **before** you start. Remove it **after** you finish and log the result in the Work Log. If you find an entry here, someone is mid-task or was interrupted; see the protocol, step 4.*

- None. (The owner-authorized Windows desktop installation is complete. New device targets still require their own approval and acceptance record.)

---

## 1. Handoff protocol (mandatory for every model, every session)

1. **Read first.** Read this file top to bottom, then the newest entry of `CHANGELOG.md`. Run `git status -sb` and `git log --oneline -5` to confirm that what's on disk matches this file. If it doesn't, the repo is the truth: fix this file before you do anything else.
2. **Before you start work:** add an entry under **ACTIVE WORK** with the date, your model/agent name, what you're about to do, and the files you expect to touch. Save it **before your first edit**. If you're interrupted, this is how the next agent knows what was half-done.
3. **After you finish (or when you stop for any reason):**
   - remove your ACTIVE WORK entry;
   - update **Current state** and **Next actions** if they changed;
   - add one dated line to the **Work log** (newest first) saying what you did, what you verified, and what you left unfinished;
   - add a `CHANGELOG.md` entry for any repository change, per the existing convention;
   - change "Last updated" at the top.
4. **If ACTIVE WORK already holds someone else's entry:** check `git log -3 --date=iso` and `git status`. If the repo changed in the last hour, another agent is probably still working: don't edit the same files, and don't switch branches in the shared checkout. Wait, or work in a separate `git worktree`. If the entry is stale, record it in the Work log, then finish that work or remove the entry.
5. **One agent per checkout at a time.** Several agents have collided here before. Use `git worktree add` for isolated work. Never switch the shared checkout's branch while another agent might be active.
6. **Separate the states.** *Built → committed → pushed → deployed → live-verified* are different facts. Never say a change is live unless you checked the live site (compare bytes or hashes, see §4). Always cite commit hashes and dates.
7. **Keep this file public-safe.** This repository is **public**. Never write private paths, personal emails, account IDs, credentials, prompts, lyrics, unpublished lore, private brand links, billing details, or any non-general-audience material, here or anywhere in the repo.
8. **Keep it short.** This file should take about two minutes to read. Move detail into `CHANGELOG.md` and keep only current truth here.

---

## 2. What this project is

The official **general-audience** website for **Sophia**, a fictional, AI-created pop icon and muse, at <https://sophais-imagination.com>. The site's whole premise is honesty: every page discloses that Sophia is synthetic, and the site claims no fake releases, votes, audiences, collaborations, or endorsements.

- **Stack:** hand-written static HTML/CSS/JS. No framework, package manager, analytics, cookies, or database. Fonts and media are self-hosted.
- **Hosting:** GitHub Pages, deployed by GitHub Actions on every push to `main`. Custom domain via `CNAME`. HTTPS is enforced.
- **Installable PWA:** `manifest.webmanifest`, `sw.js` (navigations network-first, so a stale claim is never served to an online reader), and `offline.html`.
- **Deploy allowlist:** `.pages-manifest` decides exactly which files ship. Files not listed there (all `.md` files, `docs/`, `tests/`, `scripts/`, `_ops/`) are repository-only.
- Associated ventures and any non-general-audience work are tracked **privately, outside this repository**, and must never be referenced here.

---

## 3. Current state (verified 2026-10-30)

| Item | State |
| --- | --- |
| **Live release** | Pages run `41087015436` for the desktop-acceptance record `c22b74c` succeeded 2026-10-30. It carries the same 52 HTTP-comparable files introduced through `bda5ab7`; all match live, redirects and branded 404 pass, and the worker cache is `sophai-20260927`. |
| **Local `main`** | Fully pushed to `origin/main`; working tree clean after the final handoff commit. Use `git rev-parse HEAD` for the current repo-only documentation tip. |
| **Deployed hardening** | Hardened `sw.js`, LF-normalized public files, the CI test gate, and the fictional/synthetic disclosure on `404.html` are live. |
| **Tests/package** | `node --test tests/*.test.cjs` → 11/11 pass. The verifier assembles 54 allowlisted files (3,463,469 bytes); 52 are HTTP-comparable. |
| **Installation** | **Windows accepted 2026-10-30:** Edge installed the live PWA, launched it in a standalone app window at the expected origin, and Windows Start registration has the expected product name. Optional pin/autostart choices were dismissed. Device-level offline launch was not independently exercised. Android remains uninstalled and requires on-device Chrome interaction. |
| **Roadmap** | Every remaining item is **owner-gated** (see §6). No agent-only engineering work is open. |

**Branches**

- `main`: public content was introduced through `bda5ab7`; release-state, package-boundary and Windows desktop-acceptance documentation are fully pushed through `c22b74c`. Later handoff-only commits do not change `.pages-manifest`.
- `codex/roadmap-sites-20260927`, `chore/eol-normalization-and-live-pwa-evidence`: fully merged into `main`. Safe to delete.
- `codex/sophai-meta-20260923`: old (`753de4d`), contained in `main`. Safe to delete.
- `cursor/pwa-install-cb61` (remote only): **DO NOT MERGE.** It's a superseded parallel PWA attempt: it would add a second service worker, its icons don't meet Android's installability requirements, and its `start_url` points to an instructions page. A test fails if it's ever merged.

**Housekeeping (owner, optional):** `.git/stale-*` entries are git lock and temp files that an earlier session moved aside because it had no delete permission. They're safe to delete.

---

## 4. How to work here

- **Verify before committing:**
  - `node --test tests/*.test.cjs`: use this glob; a bare `node --test` also picks up stale backup copies in `_to_delete/` and fails.
  - `python3 scripts/verify_site.py --build .pages-artifact`: the output directory must be exactly `.pages-artifact` inside the repo, and the script deletes and rebuilds it.
  - `node --check sw.js`
- **Release checklist:** `docs/RELEASE-CHECKLIST.md`. Back up every existing file you touch to `_to_delete/backups-YYYY-MM-DD-<scope>/` (gitignored) before you edit it.
- **New public file?** Add it to `.pages-manifest`, or the deploy verifier fails. A file in a `PRECACHE` list that isn't deployed breaks service-worker install, and `tests/precache-deploy-coverage.test.cjs` guards against that.
- **Commit identity:** the GitHub noreply address only. `_ops/push.ps1` refuses any other.
- **Line endings:** LF in the repo (`.gitattributes`). A diff with equal insertions and deletions across many files is CRLF churn, so check `git diff --ignore-cr-at-eol` before you commit it.
- **Push/deploy (OWNER ONLY):** from the repo root on `main`, run `.\_ops\push.ps1` in PowerShell. The Pages workflow runs the tests, then the verifier, then deploys.
- **Live verification after a deploy:** `python3 scripts/check_live.py`. Then compare live hashes of the changed files with the commit (`git show <sha>:<file> | sha256sum`). After the next push, live `sw.js` should contain `sophai-20260927`.
- **Portfolio installation hold:** a hold set outside this repo covers push, deploy and device installs. **No agent pushes, deploys, or installs without the owner's explicit go-ahead in that session.**

---

## 5. Non-negotiable content rules

- Always disclose Sophia as a fictional, AI-created character. Never imply she's human or conscious, appears physically, travels, attends events, uses products, or has real-world relationships.
- Make music and release claims only from verified destinations and evidence. A public account catalog doesn't automatically put every upload in scope.
- No real person's likeness or voice without written consent. No imitation of a named living artist.
- Never invent votes, audience counts, collaborations, endorsements, testimonials, or provenance evidence.
- No posting, generating, purchasing, provider/account changes, outreach, or distribution without the owner's explicit approval for that exact action.
- Don't add a framework without a demonstrated need.

---

## 6. Next actions

**Owner**

1. **Optional Android installation:** Windows desktop acceptance is complete. The Android target remains separate; it requires opening the site in Chrome and choosing *Add to Home Screen* or *Install*, then verifying standalone and offline behavior on that device.
2. **Stage catalog decision:** the linked music account shows four public songs and the Stage lists two. The two unlisted songs need an owner story-boundary/general-audience decision. The review packet is in the owner's private archive.
3. **Identity and campaign gates (v0.3):** approve the public name/hashtag, visual identity, the C01 post and caption, X write authority, Instagram spelling and status, YouTube positioning, and the music profile's synthetic disclosure. Full list: `ROADMAP.md` → v0.3.
4. **Catalog, commerce, distribution (v0.4 and later):** each item needs its own written approval. See `ROADMAP.md`, `REVENUE-MODEL.md`, `docs/COMMERCE-READINESS.md`.

**Any agent, now:** no unblocked code or release work. A new device-install session may proceed only with the owner's confirmation for that target and must record standalone/offline acceptance without exposing local device identifiers. Do not call Windows offline acceptance complete from the 2026-10-30 receipt.

---

## 7. Key files

| File | Purpose |
| --- | --- |
| `ROADMAP.md` | Release status and every owner gate |
| `CHANGELOG.md` | Full dated history: put detail there, not here |
| `README.md` | Overview, stack, deploy flow, content rules |
| `docs/RELEASE-CHECKLIST.md` | Step-by-step release and live-verification checklist |
| `docs/LIVE-PWA-VERIFICATION-2026-09-27.md` | Live PWA evidence record |
| `docs/DESKTOP-PWA-VERIFICATION-2026-10-30.md` | Windows installation and standalone-launch acceptance record |
| `docs/DATA-BOUNDARIES.md` | Runtime/package inventory and private/personal-data separation |
| `.pages-manifest` | Deploy allowlist |
| `sw.js` / `manifest.webmanifest` / `offline.html` | PWA |
| `scripts/verify_site.py` / `scripts/check_live.py` | Artifact verifier / live comparison |
| `tests/*.test.cjs` | Service-worker and deploy-coverage tests (run in CI) |
| `_ops/push.ps1` | Owner's guarded push helper (Windows PowerShell) |
| `AGENTS.md` / `CLAUDE.md` | Point every agent tool to this file |

---

## 8. Work log (newest first)

- **2026-10-30 — Codex:** with the owner's explicit approval, installed the live PWA through Microsoft Edge on Windows. The final dialog showed the expected app and publisher, the app launched in a standalone focused window at the expected HTTPS origin, and Windows Start registration read back the expected product name. Declined optional pin/shortcut/autostart conveniences. Added a public-safe acceptance receipt and reconciled roadmap/handoff records in `c22b74c`; 11/11 tests, worker syntax, Python compilation, artifact verification and `git diff --check` passed. Pages run `41087015436` succeeded and all 52 HTTP-comparable files, redirects and branded 404 matched live. No public page, package, account, provider, post, song, commerce setting or Android device changed; device-level offline launch remains unverified.

- **2026-10-29 — Codex:** audited the canonical repo, associated tasks/projects, live site, package contents, desktop/phone state and personal-data boundary. Preserved the existing Claude recovery edit; added the public-safe data-boundary and install checks; corrected stale handoffs/roadmap records; passed 11/11 tests, worker syntax, Python compilation, verifier and privacy scans; pushed `ab5d3b2` plus `bd00ed3`; Pages run `41021352301` succeeded; all 52 HTTP-comparable files, redirects and 404 matched live. No account/provider/content/commerce changes. Neither device target was installed at the baseline; installation remains separate.

- **2026-10-29 — Claude (Cowork recovery sweep after a ChatGPT history loss):** read-only audit. Working tree clean, no stashes, no uncommitted work; `main` is 1 commit ahead of `origin/main` (`ab5d3b2`, docs only) and needs the owner's push. Nothing else in this repo was at risk. Private project context (music, platform lanes, related ventures) is tracked outside this public repo.

- **2026-10-26 — Codex:** confirmed the active owner account has `repo` and `workflow` authorization, both Pages runs succeeded, and local/remote `main` matched at `1d51e9d`; corrected stale handoff commit references locally. No push or deployment.

- **2026-10-26 — Codex:** with explicit owner approval, committed and pushed the accumulated verified release through `bda5ab7`; GitHub Pages run `40379497894` passed its build, 11-test gate, artifact verification, and deployment. `scripts/check_live.py` confirmed all 52 public files match HEAD, with redirects and the branded 404 passing.

- 2026-10-24 — Codex CG-08: fixed the missing fictional/synthetic disclosure on the 404 page. Local Lighthouse homepage scores (performance/accessibility/best practices/SEO): 92/100/100/100; verifier and 11 tests pass, all 9 public HTML pages disclose. No push or deploy; existing owner changes preserved.

- **2026-10-20 — Claude (Cowork):** created this handoff and the agent pointer files. Byte-verified that the live release is `4855423`, and corrected `README.md`, `ROADMAP.md` (v0.3.2 → SHIPPED) and `ROADMAP-EXECUTION-2026-09-27.md`, which had misreported it as `753de4d` or unreleased. Tests 11/11, verifier passes. Local commit only.
- **2026-10-16 — Claude (separate session):** gated deploys on the tests in CI, added the precache deploy-coverage test, renormalized line endings to LF, audited the live site (0 broken links), found the Stage two songs behind the public catalog, and synced the README.
- **2026-10-14 — Claude (separate session):** merged the Codex worker hardening and the EOL/evidence branch into `main`; decided not to merge `cursor/pwa-install-cb61`. Same day, a live check confirmed every PWA resource returns 200 and the worker is activated.
- **2026-09-27 — Codex / Claude:** hardened `sw.js` and added `tests/sw.test.cjs`; added `.gitattributes` and the live PWA verification record.
- **2026-09-26:** fixed the failing Pages deploy. The installable PWA went live at `4855423`.
- Earlier history: see `CHANGELOG.md` (v0.1 launched 2026-08-08).
