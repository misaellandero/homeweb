# homeweb Current State

Last updated: 2026-09-20

## Status
Unknown. This file was generated as a migration aid for Claude/context continuity.

## What Works
- `sprite-vault/` hosts the static Sprite Vault Tracker catalog mirror for `https://misaellandero.com/sprite-vault/manifest.json`.
- `sprite-vault/control.json` lets Sprite Vault Tracker switch between automatic, SpriteLocker-only, and HomeWeb-only catalog sources.
- `Apps/SpriteVaultControl/Index.html` is a static manual control panel for editing `control.json`, dispatching mirror refreshes, viewing backups, and previewing the iPhone catalog data.
- `.github/workflows/update-sprite-vault-mirror.yml` regenerates the mirror every 12 hours and can be run manually.
- `Tools/SpriteVaultMirror/generate_mirror.py` creates backups in `sprite-vault/backups/` before replacing a changed catalog.
- `Tools/SpriteVaultMirror/generate_mirror.py` validates with `py_compile` and generates valid JSON files.
- Public GitHub Pages links should use explicit file paths with exact casing, for example `/Apps/PetPal/index.html` rather than `/Apps/PetPal`.
- `Apps/Cota/` is a Firebase-backed wish list ("Cota Waitlist") for a separate pet-care app (iOS/Web/Android), not to be confused with `Apps/PetPal/` (a static landing page with no signup form). Signups write to Firestore `cotaWaitlist` (per-email doc) in the `misaellanderoweb` Firebase project via `Apps/Cota/assets/js/waitlist.js`.
- `Apps/Cota/index.html` now also shows a public live counter (total signups + per-platform breakdown, including the new "iOS beta (TestFlight)" option) backed by a PII-free `cotaWaitlistStats/summary` Firestore doc, kept in sync via an atomic transaction in `waitlist.js`.
- `Apps/Cota/admin.html` + `Apps/Cota/assets/js/admin.js` is a Firebase Auth-gated admin dashboard that lists every wish list entry and recomputes counts live from the raw `cotaWaitlist` collection.
- `Apps/Revisits/index.html` now has a "Usar en la Web" button (`assets/js/web-install.js`) next to the App Store CTA: on Apple devices (iOS/iPadOS/macOS) it redirects straight to the App Store listing; on Windows/Android/other it opens a Bootstrap modal with platform-specific PWA install steps linking to `Apps/Revisits/web/index.html`.
- `Apps/Revisits/web/` is now a functional local-first PWA port of the native Revisits app (vanilla JS ES modules, no framework/build step, IndexedDB storage, no server/CloudKit sync). Domain model mirrors the native Core Data schema (`territories`, `revisits`, `visits`, `services`, `dayGoals`, `reports`, `medals` — see `js/db.js`). Features: **Revisitas** tab (`js/views/revisits.js`) — list with search + Todos/Estudio/Revisita/Vencidas filters, full add/edit form (persona type + emoji, territorio with inline creation, Estudio/Revisita toggle, teléfono, referencias de casa, próxima visita, recordatorios), optional initial-visit section, detail view with visit-history log and "Nueva visita" (Biblia/Video/Publicación source picker with dynamic reference label, próxima visita, "Contar como revisita"). **Informes** tab (`js/views/reports.js`) — Día/Semana/Mes/Año period stats vs. goal, a resilient-across-reloads timer (duration presets, live Estudios/Publicaciones/Videos/Revisitas counters, Registrar writes a report and awards medals), manual report form, and a Historial list with delete. **Metas** tab (`js/views/goals.js`) — service types with a monthly goal + per-weekday goals, Mes/Año progress (Año calendario vs. Año de servicio Sept–Aug), a month calendar heatmap (goal-met/goal-missed per day) reusing the ported `medal_day/week/month/year.png` art, and auto-awarded medals (day→week→month→year priority, deduped per period) in `js/store.js`'s `computeAndAwardMedals`. **Ajustes** tab (`js/views/settingsView.js`) — toggle which counters show (pubs/videos/returnVisits), Notification API permission for due-reminder/timer-goal alerts (`js/notifications.js`), and JSON export/import/reset backup (since there's no cloud sync). Art ported from the native app (downscaled): `assets/art/medals/*.png` (128×128, from 1024×1024 originals) and `assets/art/houses/casa_{estudio,revisita}_1-6.png` (house illustrations used as revisit list avatars, matching the native app's random 1–6 `houseIcon`). The SF Symbol export SVGs for "Estudio"/"Revisita" were NOT portable (Illustrator template artboards with guide layers, not clean standalone glyphs) — Font Awesome icons are used instead. `sw.js` now precaches the full local app shell (bumped to `revisits-web-v2`).

## Known Issues
- `Apps/Revisits/web/` intentionally does not replicate everything the native app has: no map/geolocation picker (no maps API wired up), no hand-drawing/PencilKit notes, no CloudKit sync or multi-device backup (JSON export/import only), single-locale Spanish UI (native app has ~16 languages via a String Catalog), and no real push notifications when the app/tab is closed (Notification API only fires while the page or its service worker is alive). The medal-award math (day/week/month/year goals derived from `Service.timeGoal` + `DayGoal`) mirrors the native logic but skips its legacy 70-hour `@AppStorage` fallback for when zero services are defined — in the web port, at least one service must be created before medals can be earned.
- Public GitHub Pages must publish `sprite-vault/control.json` and `Apps/SpriteVaultControl/Index.html` before the app can use the control panel in production.
- Cota's Firestore security rules (managed in the Firebase console, not in this repo) still need updating for the new stats/admin features — see the 2026-09-16 (2) hotfix entry in `.ai/TASK_LOG.md` for the exact rules needed (confirmed against the user's actual live rules). Until applied, waitlist signups themselves now work fine (fixed in the hotfix), but the public counter stays at 0 and the admin dashboard (`Apps/Cota/admin.html`) can't load any data.

## In Progress
- Sprite Vault mirror and source-control panel are staged in `homeweb`; Gustambo should consume the public control URL and manifest URL.

## Next Steps
- After review, commit the `sprite-vault/`, `Apps/SpriteVaultControl/`, `Tools/SpriteVaultMirror/`, and workflow additions.
- Confirm GitHub Pages or deployment serves `sprite-vault/control.json`, `sprite-vault/manifest.json`, and `Apps/SpriteVaultControl/Index.html` from `misaellandero.com`.

## Verification Notes
- 2026-07-30: `python3 Tools/SpriteVaultMirror/generate_mirror.py --output sprite-vault --base-url https://misaellandero.com/sprite-vault --download-images`
- 2026-07-30: `python3 -m json.tool` passed for `manifest.json`, `sprites.json`, `sprites.en.json`, and `sprites.es.json`.
- 2026-07-30: `python3 -m py_compile Tools/SpriteVaultMirror/generate_mirror.py` passed.
- 2026-08-01: `python3 -m py_compile Tools/SpriteVaultMirror/generate_mirror.py` passed.
- 2026-08-01: `python3 -m json.tool` passed for `control.json`, `manifest.json`, `sprites.json`, and `backups/index.json`.
