import figma from '@figma/code-connect'
import { ChatInputBar } from '@/components/screens/ChatInputBar'

// Figma SET 166:12 — State[Empty,Typing,Mic] maps onto the React `action` ('send'/'mic'):
// Mic->mic, Empty/Typing->send (typing = the composer has a value).
figma.connect(ChatInputBar, 'BALENCIA_DS?node-id=166-12', {
  props: {
    action: figma.enum('State', { Empty: 'send', Typing: 'send', Mic: 'mic' }),
  },
  example: (props) => <ChatInputBar action={props.action} placeholder="Message SIA…" />,
})
