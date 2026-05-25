# Design System Setup & Migration

Use this skill when establishing or updating the Balencia design tokens, migrating `globals.css`, configuring Tailwind theme, or setting up fonts. This is the infrastructure layer — run it before building components.

## Font Migration

Replace the current multi-font setup in `client/app/layout.tsx`:

**Remove:** Inter, Poppins, Cinzel, Nunito, Instrument_Serif imports and the Google Fonts `<link>` tags for Bricolage Grotesque and DM Sans.

**Add:**
```tsx
import { Sora } from "next/font/google";

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});
```

Apply: `className={`${sora.variable} font-sans antialiased`}` on the `<body>`.

Set in `globals.css`: `font-family: var(--font-sora), system-ui, sans-serif;` on `body`.

## CSS Token Definitions

Replace the current `@theme inline` color tokens and `.dark` class variables in `client/app/globals.css` with the Balencia palette. The current emerald/cyan/teal tokens (`--color-primary-500: #00BCD4`, `--color-emerald-*`, `--color-cyan-*`) must be removed or remapped.

### Root tokens (`:root`)

```css
:root {
  --font-sora: "Sora", system-ui, sans-serif;
  --font-logo: "Chillax", system-ui, sans-serif;

  /* Brand colors */
  --bal-orange: #FF5E00;
  --bal-orange-light: #FF7A2E;
  --bal-orange-muted: rgba(255, 94, 0, 0.12);
  --bal-green: #34A853;
  --bal-green-light: #4ECB71;
  --bal-green-muted: rgba(52, 168, 83, 0.10);
  --bal-purple: #7F24FF;
  --bal-purple-light: #9B51FF;
  --bal-purple-muted: rgba(127, 36, 255, 0.08);

  /* Neutrals */
  --ink-900: #0A0A0F;
  --ink-warm-900: #0C0603;
  --ink-brown-900: #140A05;
  --ink-brown-800: #211008;
  --ink-700: #171717;
  --paper-50: #FDFDFB;
  --paper-100: #FEFAF3;
  --paper-150: #FDFBF0;
  --paper-200: #F9F3E6;
  --paper-300: #F2ECD8;

  /* Spacing (8pt grid) */
  --s-1: 4px; --s-2: 8px; --s-3: 12px; --s-4: 16px; --s-5: 24px;
  --s-6: 32px; --s-7: 48px; --s-8: 64px; --s-9: 96px; --s-10: 128px;

  /* Radius */
  --r-xs: 6px; --r-sm: 10px; --r-md: 14px; --r-lg: 20px;
  --r-xl: 28px; --r-2xl: 40px; --r-pill: 999px;

  /* Strokes */
  --stroke-thin: 2px; --stroke-base: 4px; --stroke-bold: 8px; --stroke-poster: 12px;

  /* Motion */
  --ease-flow: cubic-bezier(.65,.05,.36,1);
  --ease-out-soft: cubic-bezier(.22,.61,.36,1);
  --ease-in-out: cubic-bezier(.65,0,.35,1);
  --dur-fast: 160ms; --dur-base: 280ms; --dur-slow: 520ms; --dur-flow: 1.2s;

  /* Shadows (warm brown-tinted) */
  --shadow-1: 0 8px 24px rgba(33, 16, 8, .18);
  --shadow-2: 0 18px 48px rgba(33, 16, 8, .22);
  --shadow-3: 0 32px 80px rgba(33, 16, 8, .28);
  --glow-orange: 0 0 32px rgba(255, 94, 0, .45);
  --glow-green: 0 0 32px rgba(52, 168, 83, .40);
  --glow-purple: 0 0 32px rgba(127, 36, 255, .40);

  /* Gradients */
  --grad-progress: linear-gradient(90deg, #19C9D2 0%, #FFB13D 100%);
  --grad-growth: linear-gradient(90deg, #FFB33F 0%, #FF5E00 100%);
  --grad-status: linear-gradient(90deg, #4EDB8C 0%, #FFB33F 100%);
  --grad-hero-glow: radial-gradient(circle, rgba(255, 94, 0, .42) 0%, rgba(255, 94, 0, 0) 70%);
}
```

### shadcn/ui Mapping

Map shadcn CSS variables to Balencia tokens:
- `--primary` → `--bal-orange` (HSL: `24 100% 50%`)
- `--primary-foreground` → white
- `--secondary` → `--ink-700` for dark, `--paper-200` for light
- `--accent` → `--bal-green`
- `--destructive` → `#EF4444`
- `--background` → `--ink-900` (dark) / `--paper-50` (light)
- `--card` → `--ink-brown-800` (dark) / `white` (light)
- `--border` → `rgba(255, 255, 255, 0.07)` (dark) / `rgba(0, 0, 0, 0.06)` (light)

### Tailwind Theme Extension

In the `@theme inline` block:
```css
@theme inline {
  --color-bal-orange: #FF5E00;
  --color-bal-green: #34A853;
  --color-bal-purple: #7F24FF;
  --color-ink-900: #0A0A0F;
  --color-ink-800: #211008;
  --color-ink-700: #171717;
  --color-paper-50: #FDFDFB;
  --color-paper-100: #FEFAF3;
}
```

## Utility Classes to Define

Replace existing `bal-*` utilities with brand-correct versions:

```css
.bal-card {
  background: var(--ink-brown-800);
  border: 1px solid rgba(255, 255, 255, 0.07);
  border-radius: var(--r-xl);
  box-shadow: var(--shadow-1);
  padding: var(--s-5);
}
.bal-card:hover {
  box-shadow: var(--shadow-2);
  transform: translateY(-2px);
  transition: all var(--dur-base) var(--ease-flow);
}
.bal-glass {
  background: rgba(255, 94, 0, 0.03);
  backdrop-filter: blur(24px);
  border: 1px solid rgba(255, 255, 255, 0.07);
}
.bal-surface { background: var(--ink-brown-800); }
.bal-surface-light { background: var(--paper-100); }
```

## Chart Color Tokens

For Recharts and data visualization:
```css
:root {
  --chart-primary: #FF5E00;
  --chart-secondary: #34A853;
  --chart-accent: #7F24FF;
  --chart-muted: #5C5750;
  --chart-grid: rgba(255, 255, 255, 0.06);
  --chart-fitness: #FF5E00;
  --chart-nutrition: #34A853;
  --chart-wellbeing: #7F24FF;
}
```

## Migration Checklist

1. [ ] Replace font imports in `client/app/layout.tsx` (remove 7 fonts, add Sora)
2. [ ] Remove Google Fonts `<link>` tags from layout head
3. [ ] Update `globals.css` `:root` with Balencia tokens
4. [ ] Update `globals.css` `.dark` class with correct dark theme values
5. [ ] Update `@theme inline` block with Tailwind color tokens
6. [ ] Replace `bal-*` utility classes with brand-correct versions
7. [ ] Verify shadcn `--primary` / `--secondary` / `--accent` mappings
8. [ ] Remove old emerald/cyan/teal token definitions
9. [ ] Add chart color tokens
10. [ ] Test that existing components still render (may show wrong colors until migrated)
