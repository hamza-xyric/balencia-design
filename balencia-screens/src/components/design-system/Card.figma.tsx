import figma from '@figma/code-connect'
import { Card } from '@/components/design-system/Card'

// Figma SET 124:11 — Variant[Default,Compact,Hero]->variant (Compact->React 'small').
figma.connect(Card, 'BALENCIA_DS?node-id=124-11', {
  props: {
    variant: figma.enum('Variant', { Default: 'default', Compact: 'small', Hero: 'hero' }),
  },
  example: (props) => <Card variant={props.variant}>{/* card content */}</Card>,
})
