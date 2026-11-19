# Klenny direct downloads

`Distribution/Direct/release.sh` (KeyClean repo) writes `Klenny-<version>.dmg` and `appcast.xml`
into `Distribution/Direct/updates/`. To publish a release:

1. Copy `Klenny-<version>.dmg` into this folder (`Apps/Klenny/downloads/`). Keep older DMGs only
   if the appcast still points to them.
2. Copy `appcast.xml` to `Apps/Klenny/appcast.xml` (the URL in `KLENNY_SPARKLE_FEED_URL`).
3. Point the website at the new DMG. The download URL appears **once** in the HTML, in the
   `href` of `#dmg-link` in `Apps/KeyClean/index.html`:

   ```html
   <a class="btn primary" id="dmg-link" href="../Klenny/downloads/Klenny-1.0.dmg" download>
   ```

   `Apps/KeyClean/assets/js/klenny.js` reads that `href` to fill in the file name, the version
   label, the "Download again" link in the install guide and the other Download buttons. One
   replacement is enough (run from the homeweb repo root, with `VERSION` set, e.g. `1.1`):

   ```sh
   sed -i '' -E "s#(downloads/Klenny-)[^\"]+(\.dmg)#\1${VERSION}\2#" Apps/KeyClean/index.html
   grep -n 'id="dmg-link"' Apps/KeyClean/index.html   # check
   ```

   Visible text that shows `Klenny-1.0.dmg` / `1.0` before JavaScript runs is a fallback; it is
   replaced at load time, so it does not need to be edited.
