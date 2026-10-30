# Sophia's Imagination — sophais-imagination.com

Official general-audience site for Sophia, a fictional AI-created pop icon and muse. The site is intentionally transparent: the imagination and human art direction are real; the character biography and depicted worlds are fiction.

## Current state

- Live at <https://sophais-imagination.com> with HTTPS enforced.
- GitHub Pages deploys from `main` through GitHub Actions.
- Latest verified Pages deployment: `bd00ed3`, run `41021352301`, on 2026-10-29. It carries the same 52 HTTP-comparable public files introduced through the hardened PWA release at `bda5ab7`; all match live, redirects and the branded 404 pass, and the site serves the `sophai-20260927` worker.
- The release includes service-worker hardening, CI test gating, LF-normalized public files, and synthetic-character disclosure on every public HTML page. Local, committed, pushed, deployed, and verified-live remain intentionally separate states.
- Two songs completed the site's current owner-editor story-boundary review and remain in its public-safe record. Two additional public Suno songs and owner-published YouTube/social references still require identity, disclosure, ownership, and general-audience review; external profile cards are withheld in the next local artifact during that reconciliation.
- The owner confirms the correct eligible plan was active when the reviewed songs were created. Dated plan and applicable-terms corroboration remains private commercial-release evidence; no billing details belong in this repository.
- X has two owner-published music shares. C01 remains the next proposed identity/campaign post, not the account's first-ever post; API write authority and account health remain unverified.
- The proposed Instagram spelling is unavailable, while a differently spelled owner-controlled account exists. Its exact official status and profile disclosure remain owner decisions.

## Stack

Hand-written static HTML, CSS, and JavaScript; no framework, package manager,
analytics, cookies, database, or build dependency. Fonts and media are served from
the same site. A small standard-library verification
script checks source and deployment artifacts.

## Deployment

The repository is already configured. Normal release flow:

1. Run the local verifier documented in `docs/RELEASE-CHECKLIST.md`.
2. Commit with the repository-local GitHub noreply identity.
3. Run `.\_ops\push.ps1` from the repository root.
4. Confirm the Pages workflow succeeds, then verify the live site, redirects, and representative assets.

The Pages artifact is controlled by `.pages-manifest`. Any new public root file must be added there. Public assets must remain under the explicitly allowed `assets/` directories and pass the verifier.

## Package and data boundary

This product is the live static PWA; it is not an APK, desktop executable, server, account system, or copy of the whole repository. The generated `.pages-artifact` contains only the files permitted by `.pages-manifest`. Git history, workflows, tests, scripts, Markdown documentation, backups, private source masters, prompts, account records, device/browser state, and personal data are not part of the installed app.

See `docs/DATA-BOUNDARIES.md` for the runtime inventory, excluded private/personal data classes, and the verification required before a desktop or phone installation is accepted.

## Content rules

- Always disclose Sophia as a fictional AI-created character. Never imply humanity, consciousness, physical presence, travel, events, product use, or real-world relationships.
- Make music and release claims only from verified destinations and evidence. A public account catalog does not make every upload part of this general-audience project, and no public release page by itself proves commercial rights, source ownership, or authorization for additional distribution.
- Keep the site and this public repository strictly general-audience.
- Do not publish private operator details, private source paths, unpublished lore, prompts, rejected assets, or personal email addresses.
- No real-person likeness or voice without written consent; no imitation of a named living artist.
- Never invent votes, audience counts, collaborations, endorsements, testimonials, or provenance evidence.

## Structure

- `index.html` — home, disclosure, gallery, evidence-limited music record, collaboration prompt, and verified official links
- `process.html` — art-direction notes for the ten concepts
- `diary.html` — clearly labeled fictional character diary
- `polls.html` — collaboration archive with an honest zero-state
- `provenance.html` — public-safe media provenance explanation and hash record
- `404.html`, `privacy.html`, `terms.html`, `robots.txt`, `sitemap.xml`
- `assets/img/` — web derivatives; `assets/fonts/` — self-hosted OFL-licensed font subsets
- `assets/provenance.json` — machine-readable hashes and dimensions for public media
- `docs/AUDIO-PROVENANCE-RECORD.md` — public-safe release index and private-record requirements
- `docs/PARTICIPATION-LOOP-PROTOCOL.md` — evidence rules for the first real audience choice
- `docs/COMMERCE-READINESS.md` — print, music, collaboration, provider, and money gates
- `docs/DELEGATION-BRIEFS.md` — owner-gated catalog-growth briefs
- `docs/DATA-BOUNDARIES.md` — PWA/runtime inventory and private/personal-data separation rules
- `REVENUE-MODEL.md` — proposed six-year commercial sequence and evidence thresholds; not an activation plan
- `ROADMAP-PROGRESS-2026-09-24.md` — dated local/live reconciliation and smallest next owner action
- `.pages-manifest` and `.github/workflows/` — verified Pages artifact definition, deployment, and read-only live-health monitoring
- `scripts/verify_site.py`, `scripts/check_live.py`, and `_ops/push.ps1` — local verification, live comparison, and guarded push helpers

Start with `STATUS-HANDOFF.md` (current state, working protocol, next actions). See `ROADMAP.md` for status and `CHANGELOG.md` for release history.
