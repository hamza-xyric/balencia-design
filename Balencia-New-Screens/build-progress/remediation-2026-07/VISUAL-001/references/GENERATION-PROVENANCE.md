# VISUAL-001 supplemental reference exploration provenance

Date: 2026-07-10 PKT
Purpose: supplemental exploration and factual-baseline construction only. The accepted pilot authority is `../REFERENCE-DIRECTION.md`, `PROMPTS.md`, DVF-08/09, `image-1-cia-orb-direction.png` and `image-2-cta-icon-direction.png`. Nothing in this file supersedes that contract; no generated pixels are authorized as production UI or logo assets.

## Tool provenance

- Mode: built-in `image_gen` tool, explicitly authorized by the user as the ChatGPT image model.
- Model slug: not exposed by the built-in tool; no unsupported slug is inferred.
- Input images: none for Image 1 generation. The v2 images are targeted edits of their corresponding v1 generated boards.
- Output size: 1672×941 PNG for each generated board.
- Official logo: not supplied, requested or generated.

## File ledger

| File | SHA-256 | Disposition |
|---|---|---|
| `reference-image-1a-cia-precision-v1.png` | `39af3ab2950b86f2622f37e44393e3328a3d4c19c5449b58c9ceb96c8d33dc15` | rejected: excessive HUD/concentric-ring language |
| `reference-image-1a-cia-precision-v2.png` | `ecfb6ae7ee6089cd91b886727f6601648bd4f977f237196a45fc6b82e5e12f08` | accepted with constraints |
| `reference-image-1b-controls-icons-v1.png` | `0fbf54f8b283416332c0d5535a067792edd71192e6b026eebb7ee1b0abf0aeac` | rejected: glow and density too high; generic icon wall |
| `reference-image-1b-controls-icons-v2.png` | `7afc829229e0a0801515b64080482d6a0f9be74cd8279ba70a70b161ac5d1c34` | accepted with constraints |
| `reference-image-2-current-prototype-baseline.png` | `abcc455b2b5b8c8d0a36ae4e56741d1d6da4bf638da83b844fd8e674d182fcbd` | factual baseline sheet, not generated art direction |

## Image 1A initial prompt

```text
Use case: ui-mockup
Asset type: 16:9 landscape visual-direction board for a premium mobile product; conceptual reference only, never a shippable UI asset

Create a restrained, editorial material-and-state study for Balencia's warm-dark whole-life coaching interface. Use near-black ink #0A0A0F, warm-brown planes #140A05/#211008/#2A1510, a faint top ember atmosphere, fine grain and generous negative space. Show one dominant CIA presence study as the same object in idle, listening and thinking states plus compact and hero specimens. Use an engineered aperture/orbital-lens anatomy with a crisp contour, thin rounded rings, controlled translucent depth, a defined royal-purple #7F24FF core and short-falloff light. Encode state through geometry rather than color alone. Include quiet unlabeled ember/copper capsule-action states, a small abstract rounded 2px continuous-stroke grammar panel, and paired selective-glass/solid-surface studies. Calm, grounded, editorial and funded-product quality. No words, labels, logos, marks, watermarks, app screens, production icons, generic neon ball, muddy bloom, cyan/teal chrome, HUD, holograms, starfields, glossy plastic, rainbow gradients or purple ordinary actions.
```

## Image 1A accepted revision prompt

```text
Preserve the 16:9 modular layout, warm-dark palette, three-state sequence, compact/hero studies, controls, path grammar and paired surfaces. Remove the sci-fi HUD feeling: eliminate crosshairs, coordinates, dotted targeting lines, instrument cues, lens chrome and most concentric rings. Simplify each CIA state to one precise core, one controlled translucent membrane and at most two thin rounded asymmetric arcs. Idle is settled; listening uses one measured breathing wave; thinking uses two offset orbit fragments. Reduce purple bloom about 70%, keep short-falloff light and crisp edges, and make the anatomy tactile/editorial rather than aerospace. Reduce orange glow about 55%. Keep path studies sparse. No text, logos, marks, watermarks, screens, production icons, cyan/teal, rainbow, glossy plastic, neon ball, starfield, hologram or logo approximation.
```

## Image 1B initial prompt

```text
Use case: ui-mockup
Asset type: 16:9 landscape control-and-glyph art-direction board for a premium mobile product; conceptual reference only, never a shippable UI asset

Create a refined Balencia control-system and signature-shape study on #0A0A0F with warm-brown planes, subtle ember atmosphere, restrained grain and negative space. Show a systematic 52px pill-button family—primary, secondary glass, ghost, CIA, completion, destructive and circular icon controls—with paired default, hover, pressed, focus-visible, loading and disabled states. Explore #FF5E00 with ink text and a deep #C44700→#A63200 ember/copper candidate with paper text, using controlled highlights, fine borders, darker lower edges and short glows. Add a conceptual rounded 2px signature-glyph family for missions, Life Power, correlations, progression, RPG states and domain nodes plus a quiet familiar utility row. No words, logos, marks, watermarks, screens, production raster icons, chrome, cyan/teal, rainbow, HUD, gamer UI, swords/shields, emoji, lotus/leaf motifs or logo approximation.
```

## Image 1B accepted revision prompt

```text
Preserve the 16:9 specimen-grid purpose and warm-dark palette. Reduce all glow about 75%; controls should read through precise edges, restrained depth, top highlight and pressed lower edge. Make orange deeper and premium: retain one #FF5E00/ink candidate and one #C44700→#A63200/paper candidate. Keep precise focus rings, width-stable loading and identifiable disabled states. Reduce grid density one third. Purple appears only in one CIA row, green only in completion and red only in destructive. Replace the busy generic icon collection with a small abstract continuous rounded-path study for missions, Life Power, correlations, progression and domain nodes; keep a separate quiet utility row for back, close, search, delete and overflow. No words, logos, marks, watermarks, screens, production icons, glossy plastic, chrome, cyan/teal, HUD, gamer UI, emoji, lotus imagery or logo approximation.
```

## Image 2 construction

`build-baseline-contact-sheet.py` composes the local strict-baseline screenshots for screens 03, 07, 11, 12, 26, 43 and 80. It performs uniform Lanczos scaling and adds neutral labels/frame furniture fully outside the pasted crops. It does not use an image model or alter screen content. A 2026-07-10 crop comparison found `changed_pixels=0` for all seven resized screenshots.
