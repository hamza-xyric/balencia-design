import figma from '@figma/code-connect'
import { StatTile } from '@/components/screens/StatTile'

// Figma 145:5 — Value/Label TEXT -> value/label.
figma.connect(StatTile, 'BALENCIA_DS?node-id=145-5', {
  props: {
    value: figma.string('Value'),
    label: figma.string('Label'),
  },
  example: (props) => <StatTile value={props.value} label={props.label} />,
})
