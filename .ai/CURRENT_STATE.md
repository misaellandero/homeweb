# homeweb Current State

Last updated: 2026-08-01

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

## Known Issues
- Public GitHub Pages must publish `sprite-vault/control.json` and `Apps/SpriteVaultControl/Index.html` before the app can use the control panel in production.

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
