# STATUS-HANDOFF — sophais-imagination.com

> **Any model or agent (Claude, ChatGPT/Codex, Cursor, Copilot, Gemini, local models): read this whole file before you touch the repository.** It's the single source of truth for where the project stands and how to work here. It's written so you can get up to speed with no other context.

**Last updated:** 2026-10-20 by Claude (Cowork session)

---

## ACTIVE WORK

*Add an entry here **before** you start. Remove it **after** you finish and log the result in the Work Log. If you find an entry here, someone is mid-task or was interrupted; see the protocol, step 4.*

- None. (Last cleared 2026-10-20 by Claude, Cowork session, after the handoff/correction commit.)

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

## 3. Current state (verified 2026-10-20)

| Item | State |
| --- | --- |
| **Live release** | `4855423` (v0.3.2, installable PWA), deployed 2026-09-26. Byte-verified 2026-10-20: live `sw.js`, `manifest.webmanifest`, `index.html` and `sitemap.xml` match this commit. Live worker cache is `sophai-v1.0.0`. |
| **Local `main`** | 12 commits ahead of `origin/main` (11 unpushed commits plus this handoff commit). **Not pushed or deployed.** |
| **What a push would deploy** | Hardened `sw.js` (cache `sophai-20260927`: a failed precache no longer replaces a working worker, cache cleanup is scoped to `sophai-*`, non-200 navigations aren't cached), LF `sitemap.xml`, and a CI test gate in `.github/workflows/pages.yml`. |
| **Tests** | `node --test tests/*.test.cjs` → 11/11 pass. `python3 scripts/verify_site.py --build .pages-artifact` → passes. |
| **Roadmap** | Every remaining item is **owner-gated** (see §6). No agent-only engineering work is open. |

**Branches**

- `main`: current work, unpushed (see above).
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

1. **Push `main`** with `.\_ops\push.ps1` when the installation hold allows it. This deploys the hardened worker and CI gate.
2. **Install the PWA on your phone:** open the site and choose *Add to Home Screen* or *Install*. It's available now, subject to the hold.
3. **Stage catalog decision:** the linked music account shows four public songs and the Stage lists two. The two unlisted songs need an owner story-boundary/general-audience decision. The review packet is in the owner's private archive.
4. **Identity and campaign gates (v0.3):** approve the public name/hashtag, visual identity, the C01 post and caption, X write authority, Instagram spelling and status, YouTube positioning, and the music profile's synthetic disclosure. Full list: `ROADMAP.md` → v0.3.
5. **Catalog, commerce, distribution (v0.4 and later):** each item needs its own written approval. See `ROADMAP.md`, `REVENUE-MODEL.md`, `docs/COMMERCE-READINESS.md`.

**Any agent, once the owner has pushed:** live-verify per §4, record the result here and in `CHANGELOG.md`, then mark the release shipped in `ROADMAP.md`.

**Any agent, now:** nothing beyond keeping this file accurate.

---

## 7. Key files

| File | Purpose |
| --- | --- |
| `ROADMAP.md` | Release status and every owner gate |
| `CHANGELOG.md` | Full dated history: put detail there, not here |
| `README.md` | Overview, stack, deploy flow, content rules |
| `docs/RELEASE-CHECKLIST.md` | Step-by-step release and live-verification checklist |
| `docs/LIVE-PWA-VERIFICATION-2026-09-27.md` | Live PWA evidence record |
| `.pages-manifest` | Deploy allowlist |
| `sw.js` / `manifest.webmanifest` / `offline.html` | PWA |
| `scripts/verify_site.py` / `scripts/check_live.py` | Artifact verifier / live comparison |
| `tests/*.test.cjs` | Service-worker and deploy-coverage tests (run in CI) |
| `_ops/push.ps1` | Owner's guarded push helper (Windows PowerShell) |
| `AGENTS.md` / `CLAUDE.md` | Point every agent tool to this file |

---

## 8. Work log (newest first)

- **2026-10-20 — Claude (Cowork):** created this handoff and the agent pointer files. Byte-verified that the live release is `4855423`, and corrected `README.md`, `ROADMAP.md` (v0.3.2 → SHIPPED) and `ROADMAP-EXECUTION-2026-09-27.md`, which had misreported it as `753de4d` or unreleased. Tests 11/11, verifier passes. Local commit only.
- **2026-10-16 — Claude (separate session):** gated deploys on the tests in CI, added the precache deploy-coverage test, renormalized line endings to LF, audited the live site (0 broken links), found the Stage two songs behind the public catalog, and synced the README.
- **2026-10-14 — Claude (separate session):** merged the Codex worker hardening and the EOL/evidence branch into `main`; decided not to merge `cursor/pwa-install-cb61`. Same day, a live check confirmed every PWA resource returns 200 and the worker is activated.
- **2026-09-27 — Codex / Claude:** hardened `sw.js` and added `tests/sw.test.cjs`; added `.gitattributes` and the live PWA verification record.
- **2026-09-26:** fixed the failing Pages deploy. The installable PWA went live at `4855423`.
- Earlier history: see `CHANGELOG.md` (v0.1 launched 2026-08-08).
