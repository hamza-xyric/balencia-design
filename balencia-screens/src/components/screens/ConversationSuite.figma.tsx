import figma from '@figma/code-connect'
import {
  ConversationAvatar,
  SignalPill,
  ConversationRow,
  ThreadMessage,
  TypingIndicator,
  MembersRail,
  PrivacyPill,
} from '@/components/screens/ConversationSuite'
import { conversationPreviews, directConversationMessages } from '@/data/mock'

// One colocated file for the 7 ConversationSuite exports (Decision #3). The meta-entry
// ConversationSuite (null node) gets no connect; each export maps to its own Figma node.

// 475:346 — Size[Default,Large]->size, IsSia[False,True]->isSia, Active BOOLEAN->active.
figma.connect(ConversationAvatar, 'BALENCIA_DS?node-id=475-346', {
  props: {
    size: figma.enum('Size', { Default: 'default', Large: 'large' }),
    isSia: figma.boolean('IsSia'),
    active: figma.boolean('Active'),
  },
  example: (props) => (
    <ConversationAvatar initials="JL" domain="fitness" size={props.size} isSia={props.isSia} active={props.active} />
  ),
})

// 477:371 — Tone[Orange,Purple,Green,Muted]->tone.
figma.connect(SignalPill, 'BALENCIA_DS?node-id=477-371', {
  props: {
    tone: figma.enum('Tone', { Orange: 'orange', Purple: 'purple', Green: 'green', Muted: 'muted' }),
  },
  example: (props) => <SignalPill tone={props.tone}>Active now</SignalPill>,
})

// 479:362 — data-driven (conversation object).
figma.connect(ConversationRow, 'BALENCIA_DS?node-id=479-362', {
  example: () => <ConversationRow conversation={conversationPreviews[0]} />,
})

// 485:385 — Sender[User,Sia,Other] derives from the `message` object.
figma.connect(ThreadMessage, 'BALENCIA_DS?node-id=485-385', {
  example: () => <ThreadMessage message={directConversationMessages[0]} />,
})

// 487:385 — optional label only.
figma.connect(TypingIndicator, 'BALENCIA_DS?node-id=487-385', {
  example: () => <TypingIndicator />,
})

// 488:388 — data-driven (members array).
figma.connect(MembersRail, 'BALENCIA_DS?node-id=488-388', {
  example: () => (
    <MembersRail
      members={[
        { initials: 'JL', domain: 'fitness', active: true },
        { initials: 'MR', domain: 'finance' },
      ]}
    />
  ),
})

// 487:393 — no props.
figma.connect(PrivacyPill, 'BALENCIA_DS?node-id=487-393', {
  example: () => <PrivacyPill />,
})
