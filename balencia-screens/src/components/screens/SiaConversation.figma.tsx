import figma from '@figma/code-connect'
import { SiaConversation } from '@/components/screens/SiaConversation'

// Figma 442:224 — ShowDraft/ShowThinking/ShowSuggestions BOOLEAN -> the matching React booleans.
figma.connect(SiaConversation, 'BALENCIA_DS?node-id=442-224', {
  props: {
    showDraft: figma.boolean('ShowDraft'),
    showThinking: figma.boolean('ShowThinking'),
    showSuggestions: figma.boolean('ShowSuggestions'),
  },
  example: (props) => (
    <SiaConversation
      showDraft={props.showDraft}
      showThinking={props.showThinking}
      showSuggestions={props.showSuggestions}
    />
  ),
})
