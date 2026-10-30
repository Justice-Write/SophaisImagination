# Windows desktop PWA verification — 2026-10-30

## Result

With the owner's explicit approval for this target, the live PWA at <https://sophais-imagination.com/> was installed through Microsoft Edge on a Windows desktop. The browser's final dialog identified the app as **Sophia's Imagination** and the publisher as **sophais-imagination.com**. Installation completed and opened the site in its own focused app window without normal browser tab or address-bar chrome.

Windows Start registration was read back under the expected product name. Optional taskbar, Start, desktop-shortcut and login-autostart choices were dismissed; the acceptance action did not add those conveniences.

## Identity checked

- Manifest `name`: `Sophia's Imagination`
- Manifest `short_name`: `Sophia`
- Manifest `id`: `/`
- Manifest `start_url`: `/?source=pwa`
- Manifest `scope`: `/`
- Manifest `display`: `standalone`
- Install source and launched origin: `https://sophais-imagination.com/`
- `manifest.webmanifest` SHA-256: `87341c3805004f033152954bc8d79222de29386e496abf3f4a3e7ba7975d89b6`
- `sw.js` SHA-256: `22067f198565be382fc0e2257f46b405646483c044796e5fd4439609325cdcf4`

## Evidence boundaries

This is **desktop installation and standalone-launch acceptance**, not a new public-content release. The source contract still uses the `sophai-20260927` worker cache, and the repository's service-worker and deploy-coverage tests pass. A device-level offline launch was not independently exercised during this acceptance because no operating-system-wide network setting was changed. Do not describe offline device acceptance as complete from this record alone.

The Android target remains separately untested and uninstalled. No APK, TWA, native executable or sideload package was created; the live HTTPS PWA is the supported install source.

No browser profile, screenshot, device identifier, private creative record, account record or personal data is included in this repository evidence. See `DATA-BOUNDARIES.md` for the complete runtime/private-data split.
