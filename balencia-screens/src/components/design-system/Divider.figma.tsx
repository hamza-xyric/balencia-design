import figma from '@figma/code-connect'
import { Divider } from '@/components/design-system/Divider'

// Figma SET 74:10 — Orientation[Horizontal,Vertical] + Weight[Thin,Base,Bold,Poster] are
// Figma-only axes; the React Divider is a fixed horizontal hairline with no props.
figma.connect(Divider, 'BALENCIA_DS?node-id=74-10', {
  example: () => <Divider />,
})
