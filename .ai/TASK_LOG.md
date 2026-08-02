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

## Template
- Date:
- Request:
- Files changed:
- Decisions:
- Verification:
- Follow-ups:
