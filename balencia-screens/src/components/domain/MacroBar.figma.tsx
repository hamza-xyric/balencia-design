import figma from '@figma/code-connect'
import { MacroBar } from '@/components/domain/MacroBar'

// Figma SET 152:5 — Tone[Primary,Muted,Soft]->tone, Label TEXT->label, Value TEXT->value.
// TargetLabel/HasTarget are the optional `target` data (shown representatively).
figma.connect(MacroBar, 'BALENCIA_DS?node-id=152-5', {
  props: {
    label: figma.string('Label'),
    tone: figma.enum('Tone', { Primary: 'primary', Muted: 'muted', Soft: 'soft' }),
  },
  example: (props) => (
    <MacroBar label={props.label} tone={props.tone} current={42} target={60} unit="g" />
  ),
})
