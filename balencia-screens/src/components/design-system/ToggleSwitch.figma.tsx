import figma from '@figma/code-connect'
import { ToggleSwitch } from '@/components/design-system/ToggleSwitch'

// Figma SET 48:10 — On[True,False]->checked, Disabled[True,False]->disabled (clean booleans).
figma.connect(ToggleSwitch, 'BALENCIA_DS?node-id=48-10', {
  props: {
    checked: figma.boolean('On'),
    disabled: figma.boolean('Disabled'),
  },
  example: (props) => <ToggleSwitch checked={props.checked} disabled={props.disabled} />,
})
