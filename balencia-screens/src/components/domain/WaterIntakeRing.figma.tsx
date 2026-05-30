import figma from '@figma/code-connect'
import { WaterIntakeRing } from '@/components/domain/WaterIntakeRing'

// Figma SET 149:5 — State[InProgress,Achieved] is derived from consumed/target (dropped).
// Data props shown representatively.
figma.connect(WaterIntakeRing, 'BALENCIA_DS?node-id=149-5', {
  example: () => (
    <WaterIntakeRing consumedGlasses={6} targetGlasses={8} milliliters={1500} xpReward={20} />
  ),
})
