import figma from '@figma/code-connect'
import { FAB } from '@/components/design-system/FAB'

// Figma SET 79:10 — Variant[Primary,Ghost]->tone (Primary->primary, Ghost->neutral).
// State[Default,Pressed] is a visual state (:active; dropped). Icon INSTANCE_SWAP->icon.
figma.connect(FAB, 'BALENCIA_DS?node-id=79-10', {
  props: {
    tone: figma.enum('Variant', { Primary: 'primary', Ghost: 'neutral' }),
    icon: figma.instance('Icon'),
  },
  example: (props) => <FAB tone={props.tone} icon={props.icon} />,
})
