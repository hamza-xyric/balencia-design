# Balencia Higgsfield prompt style guide

Append this context to every generation prompt unless the brief explicitly overrides.

**Status:** reviewed and approved for CP-01+ (2026-05-26). Source: `Balencia/Balencia-Creatives-Reference/CREATIVE-REFERENCE.md`.

## Source hierarchy

- `Balencia/Balencia-Creatives-Reference/CREATIVE-REFERENCE.md` is the canonical creative authority.
- `Balencia/Balencia-Creatives-Reference/logos/` contains locked official Balencia logo assets. Do not ask an image/video model to create, redraw, reinterpret, or approximate them.
- Current `balencia-screens` tokens/components are the app implementation truth.
- Other design-system/reference docs are supplemental only. Ignore older teal-primary or three-pillar health guidance when it conflicts with the current warm ink, burnt-orange, forest-green, and royal-purple system.

## Brand tokens (always)

- Product: Balencia — mobile life-coach app, dark-first UI
- Personality: grounded, warm, curious, quietly confident; coach in your corner
- Background context: warm ink browns `#211008`, `#140A05`, near-black `#0A0A0F` — never pure black `#000` or pure white `#fff`
- Light surfaces (when shown): warm paper `#FDFDFB`, `#FEFAF3`, `#F2ECD8` for muted text
- Color ratio: **one hero color per surface** — burnt orange `#FF5E00` (~60% energy), forest green `#34A853` (~30% success), royal purple `#7F24FF` (~10% coach/SIA only); do not saturate all three at once
- Accent: orange for user/action; green for progress/success; purple **only** for SIA/coach moments
- Shape language: generous rounded corners (pill-friendly), soft warm-tinted shadows, continuous stroke motifs (round caps, one motif per surface)
- Typography feel: geometric sans like **Sora** — calm hierarchy, sentence case, no exclamation marks; describe mood if text appears in scene (never fake UI gibberish)
- Line motifs (motion/illustration): expressive continuous strokes — growth, loop, wave, or tight-to-open flow; orange = user, green = progress, purple = coach
- Logo rule: official Balencia logo files are composited or coded, never generated. Continuous strokes may support a brand reveal, but must not wrap around the logo mark.

## Photography

- Best asset wins: use real/licensed/owned photos for sensitive people, body, identity, and trust surfaces; generated or licensed imagery is allowed for food, posters, abstract demos, and non-personal content only when it feels credible and non-generic
- Warm, candid, natural light
- Real people ages 25–45 when people appear
- Slight film grain acceptable
- No cold clinical look, no gym-bro, no wellness-influencer aesthetic
- No black overlays on photos — warm overlays only

## Illustration

- Custom, supportive, adult tone — never childish or cartoonish
- Empty states and permissions: friendly but restrained

## Motion / video

- Purpose-driven: onboarding hook, breathing rhythm, celebration burst
- Not wallpaper motion; readable on mobile 9:16

## Product constraints (when applicable)

- **Progress photos / viewer:** private, secure, no share UI in V1
- **Social surfaces:** friends/private-first; no global leaderboard aesthetic
- **Knowledge Graph:** guided insight-map with clear paths — not a dense force-directed graph wallpaper
- **Guest preview:** honest labeled demo/preview — not a fake full app shell
- **Spotify/YouTube/Data sources:** demo or no-live-sync labeling where integration is not live
- **Balencia logo:** official source asset only; generate no logo marks, wordmarks, or fake brand text

## Negative prompt block (append)

```
Avoid: stock photo clichés, gym bro, clinical hospital, influencer posing, 
neon cyberpunk, childish cartoon, black photo overlays, watermarks, 
text gibberish, generated logos, fake Balencia marks, extra logos, cold blue grading.
```

## Aspect ratio defaults

| Use | Ratio |
| --- | --- |
| Thumbnails, avatars | 1:1 |
| Mobile hero, carousel panel | 9:16 |
| Wide carousel / desktop preview | 16:9 |

## Example skeleton

```
Balencia mobile app creative: [subject]. Warm dark UI context, burnt orange 
accent sparingly. [Specific scene]. Candid natural light, ages 25-45, 
grounded premium wellness-coach aesthetic. [Technical: 9:16, sharp focus on subject].
Avoid: stock clichés, gym bro, clinical, cartoon, black overlays.
```
