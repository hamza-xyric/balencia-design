import figma from '@figma/code-connect'
import { BrandWordmark } from '@/components/design-system/BrandWordmark'

// Figma SET 78:38 — Size[Sm,Md,Lg] maps to the numeric React `width` (px).
figma.connect(BrandWordmark, 'BALENCIA_DS?node-id=78-38', {
  props: {
    width: figma.enum('Size', { Sm: 96, Md: 128, Lg: 160 }),
  },
  example: (props) => <BrandWordmark width={props.width} />,
})
