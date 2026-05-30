import figma from '@figma/code-connect'
import { LevelBadge } from '@/components/design-system/LevelBadge'

// Figma SET 63:47 — Rarity[5] + Size[3] are visual-only (React LevelBadge has a single fixed
// style; dropped). Level TEXT is the only data — React `level` is a number, shown representatively.
figma.connect(LevelBadge, 'BALENCIA_DS?node-id=63-47', {
  example: () => <LevelBadge level={5} />,
})
