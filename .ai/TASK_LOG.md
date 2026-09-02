# homeweb Task Log

Keep this concise. Record outcomes and decisions, not full chat transcripts.

## 2026-06-26
- Generated Claude/context handoff files.
- Added `.ai/` documentation structure for project continuity.

## 2026-07-30
- Request: Move the Sprite Vault static backup site/mirror into the `homeweb` repo.
- Files changed: added `sprite-vault/`, `Tools/SpriteVaultMirror/`, and `.github/workflows/update-sprite-vault-mirror.yml`; updated `.ai/CURRENT_STATE.md`.
- Decisions: the public mirror URL is `https://misaellandero.com/sprite-vault/manifest.json`; the workflow regenerates data every 12 hours and commits only when the mirror changes.
- Verification: generated mirror locally, validated JSON files with `python3 -m json.tool`, and compiled the generator with `python3 -m py_compile`.
- Follow-ups: confirm the deployment serves `sprite-vault/manifest.json` publicly after commit/push.

## 2026-07-30
- Request: Document that GitHub Pages links must target concrete files, not folder routes.
- Files changed: updated `CLAUDE.md`, `.ai/CODING_RULES.md`, `.ai/CURRENT_STATE.md`, and `Tools/SpriteVaultMirror/README.md`.
- Decisions: public links should use exact file paths and casing, for example `/Apps/PetPal/index.html` or `/sprite-vault/manifest.json`.
- Verification: checked no current `Apps/Gustambo` folder links were present and removed stale `Mirror/sprite-vault` README paths.
- Follow-ups: use explicit file links when generating the pending board and App Store screenshot gallery.

## 2026-08-01
- Request: Add a manual HomeWeb control panel for Sprite Vault Tracker catalog source failover.
- Files changed: added `Apps/SpriteVaultControl/Index.html` and `sprite-vault/control.json`; updated `Tools/SpriteVaultMirror/generate_mirror.py`, `Tools/SpriteVaultMirror/README.md`, and `.ai/CURRENT_STATE.md`.
- Decisions: the control modes are `automatic`, `spritelocker`, and `homeweb`; the public panel URL is `https://misaellandero.com/Apps/SpriteVaultControl/Index.html`.
- Verification: validated generator with `python3 -m py_compile`; validated `control.json`, `manifest.json`, `sprites.json`, and `backups/index.json` with `python3 -m json.tool`; public GitHub Pages URLs still return 404 until published.
- Follow-ups: publish through GitHub Pages so `https://misaellandero.com/sprite-vault/control.json` is reachable.

## 2026-09-01
- Request: Reorder the main index page so the "Me" section/tab comes after "Portafolio".
- Files changed: `index.html` — swapped the order of the `#Portafolio` and `#SobreMi` sections, and reordered the nav bar links to match (Portafolio, Me, Instagram, Resume).
- Verification: confirmed `<section>`/`</section>` tag counts balanced (3/3), total line count unchanged (565), and nav `href` order matches new section order via grep.
- Follow-ups: none.

## 2026-09-01 (2)
- Request: Add floating app icons to the hero background (like the decorative squares in the "Get a cost proposal" section), and make all portfolio cards uniform — apps without an App Store link need a "Join the Waitlist"-style badge so every card keeps the same footer layout.
- Files changed: `index.html` — added a `<style>` block (`.hero-app-icons`/`.hero-app-icon` float animation, `.badge-store`/`.badge-store-pending` badge styles); added 6 floating app icons (Cota, DebtMe, Revisits, Loxi, Fox vs Hunters, Caffeinate Bar) absolutely positioned in `.page-header`, hidden below 992px; gave every portfolio card a two-row footer (store/status badge + "Go to the website"): added a "Join the Waitlist" badge to Cota and Fox vs Hunters, fixed Cota's link to use the explicit `index.html` file per the GitHub Pages linking rule, and fixed a stray duplicate quote in DebtMe's App Store `href`.
- Decisions: floating icons use low opacity (.14) and edge/corner positions to avoid overlapping the nav, hero text, and social buttons; status badges are styled as an outlined pill (not a fake store badge) to stay honest about release state while matching the visual weight of real App Store badges.
- Verification: rendered `index.html` locally with Playwright (Chromium) via `file://`, screenshotted the hero and portfolio sections, and visually confirmed icon placement/opacity and uniform card footers; pre-existing CORS console errors from `sistema/php/*` XHR calls are unrelated (no PHP backend under `file://`, present before this change too).
- Follow-ups: none.

## 2026-09-01 (3)
- Request: Portfolio cards still had uneven heights; the "Resume" nav link wasn't opening the resume page.
- Files changed: `index.html` — added `.section-coins .portfolio-grid > [class*="col-"] { display:flex; }` and `.section-coins .portfolio-grid .card.card-coin { width:100%; height:100%; }` (scoped to this page only) so each portfolio card stretches to match the tallest card in its row, keeping footers aligned regardless of description length; changed the Resume nav link from `href="resume/"` to `href="resume/index.html"`.
- Decisions: used Bootstrap's existing flex row/`.card-body{flex:1 1 auto}` machinery (equal-height-card pattern) rather than fixed min-heights, so it stays correct if copy changes later; the resume link needed the explicit file per the project's GitHub Pages linking rule, and directory-style links don't resolve under `file://` testing anyway.
- Verification: re-rendered locally with Playwright — confirmed all 3 cards in each portfolio row now share the same bottom edge, and that clicking the Resume link navigates to and correctly renders `resume/index.html`.
- Follow-ups: `resume/` is still untracked in git (`git status` shows `?? resume/`) — it must be added and pushed before the Resume link will work on the live `misaellandero.com` site, not just locally.

## Template
- Date:
- Request:
- Files changed:
- Decisions:
- Verification:
- Follow-ups:
