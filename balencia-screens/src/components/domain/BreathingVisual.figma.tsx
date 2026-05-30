import figma from '@figma/code-connect'
import { BreathingVisual } from '@/components/domain/BreathingVisual'

// Figma SET 358:165 — Phase[Inhale,Hold,Exhale]->phase, Seconds TEXT->seconds.
figma.connect(BreathingVisual, 'BALENCIA_DS?node-id=358-165', {
  props: {
    phase: figma.enum('Phase', { Inhale: 'inhale', Hold: 'hold', Exhale: 'exhale' }),
    seconds: figma.string('Seconds'),
  },
  example: (props) => <BreathingVisual phase={props.phase} seconds={props.seconds} />,
})
