import { PhoneFrame } from '@/components/layout/PhoneFrame'
import { ScreenShell } from '@/components/layout/ScreenShell'
import { TabBar } from '@/components/layout/TabBar'
import { SiaChatTopBar } from '@/components/screens/SiaChatTopBar'
import { SiaConversation } from '@/components/screens/SiaConversation'
import { VoiceInterfacePanel } from '@/components/screens/VoiceInterfacePanel'

// Screen 10 of 78: Voice mode inline
// Spec: /Users/hamza/yHealth/app_design 3/10-sia-voice-in-chat.md

export default function VoiceModeInlineScreen() {
  return (
    <PhoneFrame>
      <ScreenShell
        header={<SiaChatTopBar voiceActive />}
        tabBar={<div className="opacity-40"><TabBar active="sia" /></div>}
      >
        <div className="flex h-full flex-col overflow-hidden bg-ink-900">
          <main className="flex-1 overflow-y-auto px-4 py-3 hide-scrollbar">
            <SiaConversation showDraft showSuggestions={false} />
          </main>
          <VoiceInterfacePanel />
        </div>
      </ScreenShell>
    </PhoneFrame>
  )
}
