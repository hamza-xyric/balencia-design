import type { ComponentType } from 'react'
import { S09CiaChat } from './S09CiaChat'
import { S10CiaVoiceInChat } from './S10CiaVoiceInChat'
import { S11CiaVoiceFullScreen } from './S11CiaVoiceFullScreen'
import { S51VoiceCallHistory } from './S51VoiceCallHistory'
import { S74ConversationsHub } from './S74ConversationsHub'
import { S75DirectChat } from './S75DirectChat'
import { S76GroupChat } from './S76GroupChat'
import { S77MessageActions } from './S77MessageActions'
import { S79CallSummary } from './S79CallSummary'
import { S99WhatsappInbox } from './S99WhatsappInbox'

export const ciaScreens = {
  '09': S09CiaChat,
  '10': S10CiaVoiceInChat,
  '11': S11CiaVoiceFullScreen,
  '51': S51VoiceCallHistory,
  '74': S74ConversationsHub,
  '75': S75DirectChat,
  '76': S76GroupChat,
  '77': S77MessageActions,
  '79': S79CallSummary,
  '99': S99WhatsappInbox,
} satisfies Record<string, ComponentType>
