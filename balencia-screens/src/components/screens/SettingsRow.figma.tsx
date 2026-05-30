import figma from '@figma/code-connect'
import { SettingsRow } from '@/components/screens/SettingsRow'

// Figma SET 128:32 — Trailing[Chevron,Toggle,Value,None,Destructive]->variant
// (Chevron->navigation, Toggle->toggle, Value/None->display, Destructive->destructive).
// Disabled->disabled, Title TEXT->label (React prop is `label`), Value TEXT->value,
// Icon INSTANCE_SWAP->icon.
figma.connect(SettingsRow, 'BALENCIA_DS?node-id=128-32', {
  props: {
    label: figma.string('Title'),
    value: figma.string('Value'),
    disabled: figma.boolean('Disabled'),
    variant: figma.enum('Trailing', {
      Chevron: 'navigation',
      Toggle: 'toggle',
      Value: 'display',
      None: 'display',
      Destructive: 'destructive',
    }),
    icon: figma.instance('Icon'),
  },
  example: (props) => (
    <SettingsRow
      label={props.label}
      value={props.value}
      variant={props.variant}
      disabled={props.disabled}
      icon={props.icon}
    />
  ),
})
