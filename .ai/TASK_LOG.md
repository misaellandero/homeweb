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

## 2026-09-16
- Request: On Cota's wish list, show how many people signed up for app news, and a breakdown by selected platform (iOS, Android, iOS beta, etc.). User asked for both a public counter on the wish list page and an admin panel.
- Files changed: `Apps/Cota/index.html` — added an "iOS Beta (TestFlight)" checkbox to the platform choice fieldset, and a public `.waitlist-stats` block (total + per-platform pill counts) under the form note; `Apps/Cota/assets/js/waitlist.js` — added `iOS Beta` to `PLATFORM_STAT_KEYS`, translations for the new checkbox label and stats total label, `renderStats`/`loadStats` to read and display `cotaWaitlistStats/summary`, and replaced the plain `setDoc` write with a `runTransaction` (`submitToWaitlist`) that diffs previously selected platforms against the new selection so the aggregate counters (`total`, `ios`, `web`, `android`, `iosBeta`) stay accurate across repeat submissions, preserves the original `submittedAt`, and refreshes the public counter after a successful signup; `Apps/Cota/assets/css/styles.css` — switched `.platform-choice` to an `auto-fit` grid (now 5 options) and added `.waitlist-stats`/`.stats-*` styling matching the existing dark glass theme; added `Apps/Cota/admin.html` + `Apps/Cota/assets/js/admin.js` — a Firebase Auth (email/password) gated dashboard that reads the full `cotaWaitlist` collection, recomputes total and per-platform counts live (self-healing, not dependent on the stats doc), and lists every entry (email, platforms, language, submitted date) in a table, with HTML-escaping on all rendered user-submitted fields.
- Decisions: kept the aggregate counts in a separate `cotaWaitlistStats/summary` document (no PII) instead of exposing the raw `cotaWaitlist` collection to public reads, so the public counter never needs "list" access to documents containing emails; admin panel re-derives counts directly from the raw collection (not the summary doc) so it self-corrects if the summary ever drifts; used Firebase Authentication for the admin gate (this project has no existing password/token-admin pattern for Firestore-backed data, unlike SpriteVaultControl's pasted-GitHub-token pattern, which doesn't apply to Firestore security rules).
- Verification: `node --check` passed on both new/changed JS files; HTML parses cleanly (Python `html.parser`) for `index.html` and `admin.html`; rendered both pages with Playwright/Chromium over a local `http.server` and screenshotted — layout, new "iOS beta" option, stats pills, and the admin login form all render correctly. Could NOT verify the actual Firebase read/write/transaction behavior or the admin dashboard's post-login data load — this sandbox has no outbound network access to `firestore.googleapis.com` / `identitytoolkit.googleapis.com` (Playwright showed `ERR_TUNNEL_CONNECTION_FAILED` loading the Firebase SDK), and there is no local Firebase emulator in this repo.
- Follow-ups: Firestore security rules for the `misaellanderoweb` project must be updated in the Firebase console (not managed as code in this repo) to support this feature: (1) `cotaWaitlist/{emailId}`: allow `get` (read by exact doc ID) in addition to the existing write, so the client can diff previous platform selections — but keep `list` denied so emails can't be enumerated; (2) `cotaWaitlistStats/summary`: allow public `get`/`read`, and allow `update`/`create` limited to numeric increments on the known fields (`total`, `ios`, `web`, `android`, `iosBeta`); (3) for `admin.html`/`admin.js` to work, an admin user must be created under Firebase Authentication → Email/Password, and `cotaWaitlist` must allow `list`/`get` when `request.auth != null` (ideally scoped further to that admin's UID or email). None of this could be applied or tested from this repo/sandbox.
- Pushed directly to `main` (fast-forward, user explicitly requested it to validate on the live site) at the user's request, without a PR.

## 2026-09-16 (2) — Hotfix
- Incident: user shared their live Firestore rules — `cotaWaitlist` had `allow read, delete: if false;` and there was no rule at all for `cotaWaitlistStats` (default-denied). The 2026-09-16 change wrapped the waitlist write in a `runTransaction` that reads the entry doc first; under `read: if false` that read was denied, which failed the *entire* transaction — breaking real Cota waitlist signups on `main`/production, not just the new stats feature (it silently fell back to the existing `localStorage` copy, so the UI still showed success).
- Files changed: `Apps/Cota/assets/js/waitlist.js` — replaced the single `runTransaction` in `submitToWaitlist` with: (1) `readPreviousEntry` — a best-effort `getDoc` wrapped in try/catch that returns `null` (not a thrown error) if the read is denied; (2) the core `setDoc` write to `cotaWaitlist`, which no longer depends on that read succeeding at all; (3) `updateStats` — a separate, fire-and-forget `setDoc(..., {merge:true})` with `increment()` deltas, only attempted when `readPreviousEntry` succeeded, with its own `.catch` so a permissions failure there can never block or fail the signup. Removed the now-unused `runTransaction` import (increment() is already an atomic server-side field transform without needing a transaction).
- Decisions: prioritized "signups always work" over "stats are always perfectly accurate" — if Firestore rules still deny reads, submissions succeed and stats simply stay unset until rules are updated (with a `console.warn`, not a user-facing error). This is the correct dependency direction for a primary-feature/secondary-feature split.
- Verification: `node --check` passed; re-read the full file to confirm control flow (write always attempted; stats update only on the non-blocking path). Same sandbox network limitation as before — could not exercise this against live Firestore.
- Follow-ups: same rule changes as the entry above are still needed for the public counter and admin panel to actually populate; gave the user the exact rules to paste (merged with their existing `cotaWaitlist` rule) — `allow get: if true`, `allow list: if request.auth != null`, plus a new `cotaWaitlistStats/summary` match block with public read/write. Pushed this fix directly to `main` (fast-forward) given the live regression and the user's earlier explicit direct-to-main request.

## 2026-09-16 (3)
- Request: after applying the Firestore rules and creating the admin user, the user reported the public counter on the landing page still didn't reflect entries that already existed in `cotaWaitlist` from before this feature shipped.
- Root cause: expected, not a bug — `cotaWaitlistStats/summary` is only ever updated incrementally by new submissions (see the 2026-09-16 hotfix); pre-existing `cotaWaitlist` documents were never counted into it, so the public counter started from whatever it was (0, or only post-fix signups) instead of the true total.
- Files changed: `Apps/Cota/assets/js/admin.js` — `loadEntries()` now also stores the counts it already computes from the full collection scan as `lastComputedStats` (`{total, ios, web, android, iosBeta}`); added `syncPublicStats()`, which overwrites `cotaWaitlistStats/summary` with those exact numbers (a full `setDoc`, not an increment, so it always matches the raw collection exactly); wired a new "Sincronizar contador público" button to it. `Apps/Cota/admin.html` — added that button next to "Actualizar"/"Cerrar sesión".
- Decisions: kept this as an authenticated-admin-only action (not automatic) since a full collection scan + overwrite is heavier than the per-signup increment and doesn't need to run on every page load; reused the counts already computed for the dashboard table instead of a second query.
- Verification: `node --check` passed; rendered `admin.html` with Playwright (forced the dashboard section visible without auth, since Firebase itself is unreachable from this sandbox) and confirmed the new button renders correctly alongside the existing ones.
- Follow-ups: user needs to log into `Apps/Cota/admin.html` and click "Sincronizar contador público" once to backfill the counter with all pre-existing signups; from then on new signups keep it accurate automatically.

## 2026-09-20
- Request: On the Revisits landing page, add a "web version" button; on Windows/Android show PWA install instructions, on Apple devices redirect to the existing App Store link.
- Files changed: `Apps/Revisits/index.html` — added a "Usar en la Web" button next to the App Store CTA, plus a Bootstrap 4 modal (`#webInstallModal`) for install instructions and a script include; `Apps/Revisits/assets/js/web-install.js` — new file, detects Apple (iOS/iPadOS/macOS) vs. Android vs. Windows vs. other via `navigator.userAgent`/`navigator.platform`, redirects Apple users straight to the App Store link, and otherwise fills the modal with platform-specific install steps and a link to `web/index.html`; `Apps/Revisits/web/` — new minimal PWA scaffold: `index.html` (branded "coming soon" shell, registers the service worker), `manifest.json` (name, icons, `standalone` display, brand theme color `#235ee7`), `sw.js` (basic cache-first app-shell service worker), `icons/icon-192.png` and `icons/icon-512.png` (generated from the existing `assets/images/iconiOS26.png` via Pillow, installed as a one-off local tool, not a repo dependency).
- Decisions: kept `Apps/Revisits/web/` as a placeholder shell (no real revisits/local-storage functionality yet, per user's explicit choice) so the new button has a real, installable destination instead of a dead link; iPadOS detection uses the `navigator.platform === 'MacIntel' && maxTouchPoints > 1` heuristic since modern iPadOS reports as Mac in the UA string.
- Verification: `python3 -m json.tool` passed for `manifest.json`; both HTML files parse cleanly with Python's `html.parser`; `node -c` passed for `web-install.js` and `sw.js`. Not verified: actual browser install prompts (`beforeinstallprompt`) and real device behavior on iOS/Android/Windows, since this sandbox has no way to launch those OSes/browsers — the user should manually confirm the modal text and the Apple redirect on a real device.
- Follow-ups: when the real Revisits Web app (with the IndexedDB-backed local storage discussed earlier) is built, replace the placeholder content in `Apps/Revisits/web/index.html` and expand `sw.js`'s cached asset list accordingly.

## Template
- Date:
- Request:
- Files changed:
- Decisions:
- Verification:
- Follow-ups:
