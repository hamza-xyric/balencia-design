import { PhoneFrame } from '@/components/layout/PhoneFrame'
import { ScreenShell } from '@/components/layout/ScreenShell'
import { CelebrationOverlay } from '@/components/screens/CelebrationOverlay'
import { celebrationMilestone } from '@/data/mock'

// Screen 42 of 78: Celebration / achievement overlay
// Spec: /Users/hamza/yHealth/app_design 3/42-celebration-achievement-overlay.md

export default function CelebrationScreen() {
  return (
    <PhoneFrame>
      <ScreenShell showTabBar={false}>
        <CelebrationOverlay {...celebrationMilestone} />
      </ScreenShell>
    </PhoneFrame>
  )
}
