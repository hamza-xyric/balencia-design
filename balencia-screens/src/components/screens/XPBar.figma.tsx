import figma from '@figma/code-connect'
import { XPBar } from '@/components/screens/XPBar'

// Figma SET 142:5 — Variant[Default,Compact] has no React prop (dropped). Label TEXT->label;
// Amount TEXT is the current/total data.
figma.connect(XPBar, 'BALENCIA_DS?node-id=142-5', {
  props: {
    label: figma.string('Label'),
  },
  example: (props) => <XPBar label={props.label} current={320} total={500} />,
})
