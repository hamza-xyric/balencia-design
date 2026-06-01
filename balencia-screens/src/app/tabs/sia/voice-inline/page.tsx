'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { PhoneFrame } from '@/components/layout/PhoneFrame'
import { ScreenShell } from '@/components/layout/ScreenShell'
import { TabBar } from '@/components/layout/TabBar'
import { SiaChatTopBar } from '@/components/screens/SiaChatTopBar'
import { SiaConversation } from '@/components/screens/SiaConversation'
import { VoiceInterfacePanel } from '@/components/screens/VoiceInterfacePanel'

// Screen 10 of 78: Voice mode inline
// Spec: /Users/hamza/yHealth/app_design 3/10-sia-voice-in-chat.md

export default function VoiceModeInlineScreen() {
  const router = useRouter()
  const [permission, setPermission] = useState(false)
  const [ready, setReady] = useState(false)
  const transcript = 'I just did thirty minutes of yoga and my energy feels steadier'

  return (
    <PhoneFrame>
      <ScreenShell
        header={<SiaChatTopBar voiceActive />}
        tabBar={<div className="opacity-40"><TabBar active="sia" /></div>}
      >
        <div className="flex h-full flex-col overflow-hidden bg-ink-900">
          <main className="flex-1 overflow-y-auto px-4 py-3 hide-scrollbar">
            <SiaConversation showDraft={permission && ready} showSuggestions={false} />
          </main>
          {!permission ? (
            <section className="shrink-0 rounded-t-xl border-t border-white/[0.08] bg-ink-brown-800 px-6 py-5 shadow-3">
              <p className="text-[15px] font-semibold text-white">Microphone permission</p>
              <p className="mt-2 text-caption leading-[18px] text-white/50">
                Voice input starts only after you allow it. Transcript is editable or deletable in chat; raw audio is discarded and never used for model training or human review.
              </p>
              <div className="mt-4 grid grid-cols-2 gap-3">
                <button type="button" onClick={() => router.push('/tabs/sia')} className="h-12 rounded-pill border border-white/[0.08] text-[15px] font-semibold text-white/60">Cancel</button>
                <button type="button" onClick={() => { setPermission(true); window.setTimeout(() => setReady(true), 650) }} className="h-12 rounded-pill bg-brand-orange text-[15px] font-semibold text-white">Allow mic</button>
              </div>
            </section>
          ) : (
            <VoiceInterfacePanel
              readyToSend={ready}
              status={ready ? 'transcript ready' : 'listening...'}
              transcript={ready ? transcript : ''}
              onCancel={() => router.push('/tabs/sia')}
              onPrimary={() => router.push('/tabs/sia')}
            />
          )}
        </div>
      </ScreenShell>
    </PhoneFrame>
  )
}
