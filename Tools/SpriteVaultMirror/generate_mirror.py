#!/usr/bin/env python3
import argparse
import hashlib
import html
import json
import re
import sys
import shutil
from datetime import datetime, timezone
from pathlib import Path
from typing import Optional
from urllib.parse import urljoin
from urllib.request import Request, urlopen


SOURCE_URLS = {
    "en": "https://spritelocker.com/",
    "es": "https://spritelocker.com/es/",
}
SPRITE_BASE_URL = "https://spritelocker.com"
SCHEMA_VERSION = 1
CONTROL_SCHEMA_VERSION = 1

VARIANT_SLUGS = {
    "basic": "normal",
    "normal": "normal",
    "gold": "gold",
    "candy": "gummy",
    "gummy": "gummy",
    "galaxy": "galaxy",
    "gem": "gem",
    "jewel": "gem",
    "holo": "holofoil",
    "holofoil": "holofoil",
    "holographic": "holofoil",
    "cube": "cube",
    "quack": "quack",
    "duck": "quack",
}
VARIANT_ORDER = ["normal", "gold", "gummy", "galaxy", "gem", "holofoil", "cube", "quack"]


def fetch_text(url: str) -> str:
    request = Request(
        url,
        headers={
            "User-Agent": (
                "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) "
                "AppleWebKit/537.36 SpriteVaultTrackerMirror/1.0"
            )
        },
    )
    with urlopen(request, timeout=30) as response:
        return response.read().decode("utf-8", "replace")


def fetch_bytes(url: str) -> bytes:
    request = Request(url, headers={"User-Agent": "SpriteVaultTrackerMirror/1.0"})
    with urlopen(request, timeout=30) as response:
        return response.read()


def normalize_slug(slug: str) -> Optional[str]:
    return VARIANT_SLUGS.get(slug.lower())


def extract_discovered_catalog(locale: str, source_url: str) -> dict[str, dict]:
    source = fetch_text(source_url)
    discovered: dict[str, dict] = {}
    pattern = re.compile(
        r'<img\b(?=[^>]*(?:src|srcset)=["\'][^"\']*/sprites/([^/"\']+?)_([^/"\']+?)\.webp[^"\']*["\'])[^>]*>',
        re.IGNORECASE,
    )

    for match in pattern.finditer(source):
        tag = match.group(0)
        key = match.group(1).lower()
        variant = normalize_slug(match.group(2))
        if not variant:
            continue

        sprite = discovered.setdefault(
            key,
            {
                "localizedDisplayNames": {},
                "variants": set(),
                "imagePaths": set(),
            },
        )
        sprite["variants"].add(variant)
        sprite["imagePaths"].add(f"/sprites/{match.group(1)}_{match.group(2)}.webp")

        alt_match = re.search(r'\balt=["\']([^"\']+)["\']', tag)
        if alt_match:
            alt_text = html.unescape(alt_match.group(1)).strip()
            display = re.sub(r"\s*\([^)]*\)\s*$", "", alt_text).strip()
            if display:
                sprite["localizedDisplayNames"][locale] = display

    return discovered


def load_json(path: Path) -> Optional[dict]:
    if not path.exists():
        return None
    return json.loads(path.read_text())


def quality_score(catalog: dict) -> int:
    score = 0
    for sprite in catalog.get("sprites", []):
        score += len(sprite.get("variants", [])) * 10
        for field in (
            "localizedDisplayNames",
            "localizedAbilityDescriptions",
            "localizedWhereToFind",
        ):
            score += sum(1 for value in (sprite.get(field) or {}).values() if value)
    return score


def merge_catalog(reference: dict, discovered_by_locale: dict[str, dict], previous: Optional[dict]) -> dict:
    reference_by_key = {sprite["key"]: sprite for sprite in reference.get("sprites", [])}
    previous_by_key = {sprite["key"]: sprite for sprite in (previous or {}).get("sprites", [])}

    ordered_keys: list[str] = []
    for source in (reference_by_key, previous_by_key):
        for key in source:
            if key not in ordered_keys:
                ordered_keys.append(key)
    for locale in ("en", "es"):
        for key in discovered_by_locale.get(locale, {}):
            if key not in ordered_keys:
                ordered_keys.append(key)

    sprites = []
    for key in ordered_keys:
        reference_sprite = previous_by_key.get(key) or reference_by_key.get(key) or {}
        localized_names = dict(reference_sprite.get("localizedDisplayNames") or {})
        discovered_variants: set[str] = set()
        image_paths: set[str] = set()

        for locale, discovered in discovered_by_locale.items():
            sprite = discovered.get(key)
            if not sprite:
                continue
            localized_names.update(sprite.get("localizedDisplayNames") or {})
            discovered_variants.update(sprite.get("variants") or set())
            image_paths.update(sprite.get("imagePaths") or set())

        reference_variants = {
            variant.get("variant"): variant.get("defaultStatus", "missing")
            for variant in reference_sprite.get("variants", [])
        }
        variant_names = set(reference_variants) | discovered_variants
        variants = [
            {
                "variant": variant,
                "defaultStatus": reference_variants.get(variant, "missing"),
            }
            for variant in VARIANT_ORDER
            if variant in variant_names
        ]

        display_name = localized_names.get("en") or localized_names.get("es") or reference_sprite.get("displayName")
        sprite = {
            "key": key,
            "displayNameKey": reference_sprite.get("displayNameKey", f"sprite.{key}.name"),
            "displayName": display_name,
            "localizedDisplayNames": localized_names or None,
            "rarity": reference_sprite.get("rarity", "rare"),
            "abilityDescriptionKey": reference_sprite.get("abilityDescriptionKey", f"sprite.{key}.ability"),
            "abilityDescription": reference_sprite.get("abilityDescription"),
            "localizedAbilityDescriptions": reference_sprite.get("localizedAbilityDescriptions"),
            "whereToFindKey": reference_sprite.get("whereToFindKey", f"sprite.{key}.location"),
            "whereToFind": reference_sprite.get("whereToFind"),
            "localizedWhereToFind": reference_sprite.get("localizedWhereToFind"),
            "variants": variants,
        }
        sprites.append({k: v for k, v in sprite.items() if v is not None})

    previous_version = int((previous or reference).get("version", 1))
    provisional = {
        "version": previous_version,
        "lastUpdated": datetime.now(timezone.utc).isoformat().replace("+00:00", "Z"),
        "sprites": sprites,
    }
    if previous and comparable_catalog(previous) != comparable_catalog(provisional):
        provisional["version"] = previous_version + 1
    elif not previous:
        provisional["version"] = max(previous_version, int(reference.get("version", 1)))

    return provisional


def comparable_catalog(catalog: dict) -> dict:
    copy = dict(catalog)
    copy.pop("lastUpdated", None)
    copy.pop("version", None)
    return copy


def localized_catalog(catalog: dict, locale: str) -> dict:
    localized = json.loads(json.dumps(catalog))
    for sprite in localized.get("sprites", []):
        names = sprite.get("localizedDisplayNames") or {}
        abilities = sprite.get("localizedAbilityDescriptions") or {}
        locations = sprite.get("localizedWhereToFind") or {}
        if names.get(locale):
            sprite["displayName"] = names[locale]
        if abilities.get(locale):
            sprite["abilityDescription"] = abilities[locale]
        if locations.get(locale):
            sprite["whereToFind"] = locations[locale]
    return localized


def write_json(path: Path, value: dict) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(json.dumps(value, ensure_ascii=False, indent=2, sort_keys=True) + "\n")


def sha256_file(path: Path) -> str:
    return hashlib.sha256(path.read_bytes()).hexdigest()


def download_images(catalog: dict, output_dir: Path) -> None:
    image_dir = output_dir / "images"
    image_dir.mkdir(parents=True, exist_ok=True)
    for sprite in catalog.get("sprites", []):
        key = sprite["key"]
        for variant in sprite.get("variants", []):
            slug = {
                "normal": "basic",
                "gummy": "candy",
            }.get(variant["variant"], variant["variant"])
            candidates = [f"/sprites/{key}_{slug}.webp"]
            if variant["variant"] == "holofoil":
                candidates.append(f"/sprites/{key}_holo.webp")
            filename = f"{key}_{slug}.webp"
            destination = image_dir / filename
            if destination.exists() and destination.stat().st_size > 0:
                continue
            for candidate in candidates:
                try:
                    destination.write_bytes(fetch_bytes(urljoin(SPRITE_BASE_URL, candidate)))
                    break
                except Exception:
                    continue


def build_manifest(output_dir: Path, base_url: Optional[str]) -> dict:
    base = (base_url or "").rstrip("/")
    sprites_path = output_dir / "sprites.json"
    manifest = {
        "schemaVersion": SCHEMA_VERSION,
        "version": json.loads(sprites_path.read_text())["version"],
        "updatedAt": datetime.now(timezone.utc).isoformat().replace("+00:00", "Z"),
        "spritesURL": f"{base}/sprites.json" if base else "sprites.json",
        "spritesENURL": f"{base}/sprites.en.json" if base else "sprites.en.json",
        "spritesESURL": f"{base}/sprites.es.json" if base else "sprites.es.json",
        "imageBaseURL": f"{base}/images/" if base else "images/",
        "checksum": sha256_file(sprites_path),
    }
    return manifest


def ensure_control_file(output_dir: Path, base_url: Optional[str]) -> None:
    control_path = output_dir / "control.json"
    if control_path.exists():
        return

    base = (base_url or "").rstrip("/")
    control = {
        "schemaVersion": CONTROL_SCHEMA_VERSION,
        "mode": "automatic",
        "updatedAt": datetime.now(timezone.utc).isoformat().replace("+00:00", "Z"),
        "updatedBy": "generator",
        "reason": "Default automatic mode. The app tries SpriteLocker first and falls back to HomeWeb.",
        "primary": {
            "name": "SpriteLocker",
            "englishURL": SOURCE_URLS["en"],
            "spanishURL": SOURCE_URLS["es"],
        },
        "mirror": {
            "name": "HomeWeb",
            "manifestURL": f"{base}/manifest.json" if base else "manifest.json",
            "spritesURL": f"{base}/sprites.json" if base else "sprites.json",
        },
    }
    write_json(control_path, control)


def backup_previous_catalog(output_dir: Path) -> None:
    previous_catalog_path = output_dir / "sprites.json"
    if not previous_catalog_path.exists():
        return

    previous = load_json(previous_catalog_path)
    if not previous:
        return

    timestamp = datetime.now(timezone.utc).strftime("%Y%m%dT%H%M%SZ")
    backup_dir = output_dir / "backups"
    backup_dir.mkdir(parents=True, exist_ok=True)
    backup_filename = f"sprites-v{previous.get('version', 'unknown')}-{timestamp}.json"
    backup_path = backup_dir / backup_filename
    shutil.copy2(previous_catalog_path, backup_path)

    index_path = backup_dir / "index.json"
    index = load_json(index_path) or {"schemaVersion": 1, "backups": []}
    backups = [
        backup
        for backup in index.get("backups", [])
        if backup.get("file") != backup_filename
    ]
    backups.insert(
        0,
        {
            "file": backup_filename,
            "version": previous.get("version"),
            "lastUpdated": previous.get("lastUpdated"),
            "createdAt": datetime.now(timezone.utc).isoformat().replace("+00:00", "Z"),
            "spriteCount": len(previous.get("sprites", [])),
            "variantCount": sum(len(sprite.get("variants", [])) for sprite in previous.get("sprites", [])),
            "checksum": hashlib.sha256(previous_catalog_path.read_bytes()).hexdigest(),
        },
    )
    index["backups"] = backups[:24]
    write_json(index_path, index)


def main() -> int:
    parser = argparse.ArgumentParser(description="Generate the Sprite Vault Tracker static catalog mirror.")
    parser.add_argument("--reference", default="Tools/SpriteVaultMirror/catalog_snapshot.json")
    parser.add_argument("--output", default="sprite-vault")
    parser.add_argument("--base-url", default=None, help="Public URL for the mirror directory.")
    parser.add_argument("--download-images", action="store_true")
    args = parser.parse_args()

    reference_path = Path(args.reference)
    output_dir = Path(args.output)
    reference = load_json(reference_path)
    if not reference:
        print(f"Missing reference catalog: {reference_path}", file=sys.stderr)
        return 2

    previous = load_json(output_dir / "sprites.json")
    discovered = {
        locale: extract_discovered_catalog(locale, url)
        for locale, url in SOURCE_URLS.items()
    }
    catalog = merge_catalog(reference, discovered, previous)
    if previous and quality_score(previous) > quality_score(catalog):
        catalog = previous
        catalog["lastUpdated"] = datetime.now(timezone.utc).isoformat().replace("+00:00", "Z")

    if previous and comparable_catalog(previous) != comparable_catalog(catalog):
        backup_previous_catalog(output_dir)

    write_json(output_dir / "sprites.json", catalog)
    write_json(output_dir / "sprites.en.json", localized_catalog(catalog, "en"))
    write_json(output_dir / "sprites.es.json", localized_catalog(catalog, "es"))
    if args.download_images:
        download_images(catalog, output_dir)
    write_json(output_dir / "manifest.json", build_manifest(output_dir, args.base_url))
    ensure_control_file(output_dir, args.base_url)

    print(
        f"Generated mirror v{catalog['version']} with "
        f"{len(catalog.get('sprites', []))} sprites at {output_dir}"
    )
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
