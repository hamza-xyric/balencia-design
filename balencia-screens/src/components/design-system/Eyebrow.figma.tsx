import figma from '@figma/code-connect'
import { Eyebrow } from '@/components/design-system/Eyebrow'

// Figma SET 68:6 — Color[Default,Accent] has no React prop (accent is applied via className by
// consumers; dropped). Text TEXT->children.
figma.connect(Eyebrow, 'BALENCIA_DS?node-id=68-6', {
  props: {
    children: figma.string('Text'),
  },
  example: (props) => <Eyebrow>{props.children}</Eyebrow>,
})
