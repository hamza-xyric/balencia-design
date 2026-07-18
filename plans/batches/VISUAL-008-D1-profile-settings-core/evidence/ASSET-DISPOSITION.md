# VISUAL-008 D1 asset disposition

- Decision owner: Sol
- Date: 2026-07-11
- Image Model use: **not required for D1**

| Screen | Slot | Disposition | Evidence / reason |
|---|---|---|---|
| 17 | none | No raster | Current spec declares no image slot; initials avatar is code-native and honest. |
| 18 | none | No raster | Radar, module previews, and locks are code-native UI; rasterizing them is forbidden. |
| 21 | none | No raster | Settings utility surface has no image slot. |
| 22 | none | No raster | Provider identities use neutral Lucide/code-native symbols; no provider or brand logo is fabricated. |
| 23 | none | No raster | Billing, meter, and comparison table are code-native UI. |
| 24 | none | No raster | Notification history and chart are code-native UI. |
| 25 | none | No raster | Help/search/article surfaces have no image slot. |
| 50 | `HIFI-50-01` | **Privacy-first honest-null disposition** | The current spec explicitly defines an empty avatar ring + “Tap to add photo” as an honest-null state. No privacy-safe, screen-specific member bitmap exists; generating a synthetic identity would weaken trust and is unnecessary. The consent-first picker preview remains code-native and invokes no media capability. |

No official logo, provider logo, UI screenshot, or synthetic person image is generated or approximated. `HIFI-50-01` is closed for this prototype family by the explicit honest-null disposition; it may be revisited only if the founder later supplies an approved privacy-safe member asset.
