# VISUAL-006 B1 asset disposition

| Slot | Final disposition | Evidence |
|---|---|---|
| `HIFI-09-01` | Code-native/no raster. S09’s source composition is a private CIA thread with orb/avatar glyphs and no required attachment in the default or evidence states. | Current spec labels this a non-blocking generic avatar/message slot; official CIA signature icon and metadata bubbles carry the intended hierarchy without invented social proof. |
| `HIFI-10-01` | Code/SVG-native waveform and CIA state only. No photo/avatar is used because the screen must not imply a person, real microphone feed or diagnostic capture. | State-labelled waveform, consent and transcript truth are required; raster media would add no source evidence. |
| `HIFI-75-01` | Fulfilled with `public/hifi-assets/HIFI-75-01-hill-segment.png`. | ChatGPT ImageGen; 1200×675 PNG; warm-dusk anonymous uphill trail; no people/faces/logos/text/identifiable location; visually inspected; SHA-256 `2e3f7674fe6100ec75ee77a02e9beff87c55870af8c6e44462625311f7590b39`. Alt: `Dusk trail rising along a quiet ridge`. |
| `HIFI-76-01` | Code-native initials/avatar stack and attachment fallback. No generated people. | The source slot explicitly allows avatar or message attachment; privacy-safe initials preserve group/member truth without invented identities. |
| `HIFI-77-01` | Fulfilled by byte-identical reuse of `HIFI-75-01-hill-segment.png`. No duplicate asset. | S77 is the action sheet for the exact selected S75 hill-segment message, so continuity requires the same bytes, source and retention metadata. |
| `HIFI-99-01` | Provider-neutral code-native status/icon composition; no generated provider art or WhatsApp logo. | The operational dependency is unavailable, so provider imagery would overstate connection/authenticity and conflict with the required visual-fixture disclosure. |

The generated file is a non-blocking fixture. S75/S77 must keep a code-native `Media preview unavailable` fallback and must not show the image in empty/deleted states.

## HIFI-75-01 generation provenance

- Tool/model: ChatGPT ImageGen, used under the user's explicit image-generation authorization.
- Canonical reproduction prompt (normalized from the generation request, not claimed as a verbatim provider transcript): `Create a realistic 16:9 phone-photo attachment of a quiet uphill trail at warm dusk, with a burnished-orange horizon, dark natural ridges, restrained cinematic contrast, and an anonymous non-specific location. No people, faces, logos, text, signage, UI, landmarks, medical content, or identifiable location metadata. The image should feel like a plausible private chat attachment rather than campaign art.`
- Accepted output: `public/hifi-assets/HIFI-75-01-hill-segment.png`, normalized to 1200×675 PNG without adding semantic content.
- Privacy/source review: no person, face, account identity, logo, text, landmark, precise geolocation, or live/provider provenance is represented. The UI labels it as a bundled visual fixture, preview-only, with retention not connected.
- Continuity: S75 and S77 reference the exact same file bytes; no duplicate derivative was created.
- SHA-256: `2e3f7674fe6100ec75ee77a02e9beff87c55870af8c6e44462625311f7590b39`.
