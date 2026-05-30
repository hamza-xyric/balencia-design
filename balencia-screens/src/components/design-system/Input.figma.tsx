import figma from '@figma/code-connect'
import { Input } from '@/components/design-system/Input'

// Figma SET 45:30 — State[Default,Focused,Disabled,Error] (visual states; dropped, React
// expresses them via :focus / native disabled / the `error` prop) + Label/Value/Helper TEXT.
figma.connect(Input, 'BALENCIA_DS?node-id=45-30', {
  props: {
    label: figma.string('Label'),
    defaultValue: figma.string('Value'),
    helperText: figma.string('Helper'),
  },
  example: (props) => (
    <Input label={props.label} defaultValue={props.defaultValue} helperText={props.helperText} />
  ),
})
