import figma from '@figma/code-connect'
import { PhoneFrame } from '@/components/layout/PhoneFrame'

// Figma node 38:8 — iPhone chrome wrapping a 375x812 "Content" INSTANCE_SWAP slot
// (the per-screen content, swapped in Phase 4–5). Maps to the React `children` prop.
figma.connect(PhoneFrame, 'BALENCIA_DS?node-id=38-8', {
  props: {
    content: figma.instance('Content'),
  },
  example: (props) => <PhoneFrame>{props.content}</PhoneFrame>,
})
