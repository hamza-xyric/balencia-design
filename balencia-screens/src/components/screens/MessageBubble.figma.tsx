import figma from '@figma/code-connect'
import { MessageBubble } from '@/components/screens/MessageBubble'

// Figma SET 162:5 — Sender[SIA,User]->sender ('sia'/'user'). Body TEXT->children.
figma.connect(MessageBubble, 'BALENCIA_DS?node-id=162-5', {
  props: {
    sender: figma.enum('Sender', { SIA: 'sia', User: 'user' }),
    body: figma.string('Body'),
  },
  example: (props) => <MessageBubble sender={props.sender}>{props.body}</MessageBubble>,
})
