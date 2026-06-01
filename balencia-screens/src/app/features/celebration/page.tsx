'use client'

import { useState } from 'react'
import { PhoneFrame } from '@/components/layout/PhoneFrame'
import { ScreenShell } from '@/components/layout/ScreenShell'
import { CelebrationOverlay } from '@/components/screens/CelebrationOverlay'
import { celebrationMilestone } from '@/data/mock'

// Screen 42 of 78: Celebration / achievement overlay
// Spec: /Users/hamza/yHealth/app_design 3/42-celebration-achievement-overlay.md

export default function CelebrationScreen() {
  const [visible, setVisible] = useState(true)
  const [shared, setShared] = useState(false)

  return (
    <PhoneFrame>
      <ScreenShell showTabBar={false}>
        {visible ? (
          <CelebrationOverlay
            {...celebrationMilestone}
            shared={shared}
            onShare={() => setShared(true)}
            onDismiss={() => setVisible(false)}
          />
        ) : (
          <main className="flex min-h-full flex-col items-center justify-center bg-ink-900 px-6 text-center">
            <h1 className="text-h2 font-semibold leading-[26px] text-white">Celebration complete</h1>
            <p className="mt-2 text-caption leading-[18px] text-white/55">Returned to the triggering achievement queue.</p>
            <button type="button" onClick={() => setVisible(true)} className="mt-5 h-11 rounded-pill bg-brand-orange px-5 text-[15px] font-semibold leading-5 text-white">Replay overlay</button>
          </main>
        )}
      </ScreenShell>
    </PhoneFrame>
  )
}
