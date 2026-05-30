import figma from '@figma/code-connect'
import { CelebrationOverlay } from '@/components/screens/CelebrationOverlay'

// Figma 458:338 — celebration overlay; required content shown representatively.
figma.connect(CelebrationOverlay, 'BALENCIA_DS?node-id=458-338', {
  example: () => (
    <CelebrationOverlay
      xp={120}
      title="Mission Complete!"
      description="You finished your morning workout."
      message="Consistency compounds — keep the chain alive."
      domain="fitness"
    />
  ),
})
