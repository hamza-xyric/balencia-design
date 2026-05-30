import figma from '@figma/code-connect'
import { SuggestionChip } from '@/components/screens/SuggestionChip'

// Figma SET 87:6 — State[Default,Pressed] is a visual state (:active; dropped). Label->children.
figma.connect(SuggestionChip, 'BALENCIA_DS?node-id=87-6', {
  props: {
    children: figma.string('Label'),
  },
  example: (props) => <SuggestionChip>{props.children}</SuggestionChip>,
})
