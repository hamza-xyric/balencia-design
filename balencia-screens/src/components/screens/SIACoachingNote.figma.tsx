import figma from '@figma/code-connect'
import { SIACoachingNote } from '@/components/screens/SIACoachingNote'

// Figma 208:47 — no variant axes. `message` is the primary content.
figma.connect(SIACoachingNote, 'BALENCIA_DS?node-id=208-47', {
  example: () => (
    <SIACoachingNote message="You've hit your hydration goal 5 days running — nice momentum." />
  ),
})
