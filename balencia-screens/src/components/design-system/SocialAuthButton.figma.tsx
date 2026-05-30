import figma from '@figma/code-connect'
import { SocialAuthButton } from '@/components/design-system/SocialAuthButton'

// Figma SET 88:12 — Provider[Google,Apple]->label (the React component derives its icon from
// `label`). `mark` is only a fallback initial, unused for Google/Apple.
figma.connect(SocialAuthButton, 'BALENCIA_DS?node-id=88-12', {
  props: {
    label: figma.enum('Provider', { Google: 'Google', Apple: 'Apple' }),
  },
  example: (props) => <SocialAuthButton mark="G" label={props.label} />,
})
