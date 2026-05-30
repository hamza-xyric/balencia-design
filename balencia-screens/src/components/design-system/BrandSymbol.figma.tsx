import figma from '@figma/code-connect'
import { BrandSymbol } from '@/components/design-system/BrandSymbol'

// Figma SET 76:18 — Size[Sm,Md,Lg,Xl] maps to the numeric React `size` (px, from the live
// symbol dimensions). HasGlow BOOLEAN->glow.
figma.connect(BrandSymbol, 'BALENCIA_DS?node-id=76-18', {
  props: {
    size: figma.enum('Size', { Sm: 32, Md: 48, Lg: 64, Xl: 96 }),
    glow: figma.boolean('HasGlow'),
  },
  example: (props) => <BrandSymbol size={props.size} glow={props.glow} />,
})
