# Sprite Vault Static Mirror

This generator creates the static fallback catalog used by Sprite Vault Tracker when the primary site cannot be scraped.

Generated output:

- `sprite-vault/manifest.json`
- `sprite-vault/control.json`
- `sprite-vault/sprites.json`
- `sprite-vault/sprites.en.json`
- `sprite-vault/sprites.es.json`
- `sprite-vault/images/*.webp`
- `sprite-vault/backups/index.json`
- `sprite-vault/backups/sprites-v*.json`
- public URLs should point to the exact generated file, for example `https://misaellandero.com/sprite-vault/manifest.json`

Run locally:

```bash
python3 Tools/SpriteVaultMirror/generate_mirror.py \
  --output sprite-vault \
  --base-url "https://misaellandero.com/sprite-vault" \
  --download-images
```

The app reads `SpriteVaultControlURL` and `SpriteVaultMirrorManifestURL` from `Gustambo/Info.plist`.
For this repository, the public manifest URL is:

```text
https://misaellandero.com/sprite-vault/manifest.json
```

The public source-control file is:

```text
https://misaellandero.com/sprite-vault/control.json
```

Control modes:

- `automatic`: app tries SpriteLocker first and falls back to HomeWeb.
- `spritelocker`: app uses only the primary SpriteLocker scrape.
- `homeweb`: app uses only the static HomeWeb mirror.

The manual control panel is a static page at:

```text
https://misaellandero.com/Apps/SpriteVaultControl/Index.html
```

The panel edits `sprite-vault/control.json` through the GitHub Contents API and can dispatch the mirror update workflow. It needs a GitHub token in the browser session with permission to update this repository and run workflows.

The GitHub Actions workflow `.github/workflows/update-sprite-vault-mirror.yml` regenerates the mirror every 12 hours and on manual dispatch.
When the generated catalog changes, the previous `sprites.json` is copied into `sprite-vault/backups/` and listed in `sprite-vault/backups/index.json`.

For GitHub Pages links, point to the exact file path. Do not link to folders like
`https://misaellandero.com/Apps/SpriteVaultTracker`; use a concrete file such as
`https://misaellandero.com/Apps/SpriteVaultTracker/index.html` when that file exists.
