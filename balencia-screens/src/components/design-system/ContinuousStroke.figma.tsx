import figma from '@figma/code-connect'
import { ContinuousStroke } from '@/components/design-system/ContinuousStroke'

// Figma SET 80:14 — Weight[Thin,Base,Bold,Poster] is a Figma-only axis; the React component
// has no weight prop (it takes `animated` + className only).
figma.connect(ContinuousStroke, 'BALENCIA_DS?node-id=80-14', {
  example: () => <ContinuousStroke />,
})
