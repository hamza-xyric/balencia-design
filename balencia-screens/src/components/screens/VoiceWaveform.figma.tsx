import figma from '@figma/code-connect'
import { VoiceWaveform } from '@/components/screens/VoiceWaveform'

// Figma SET 351:165 — State[Idle,Listening,Speaking] maps onto the React `tone`
// (Idle->idle, Listening->purple, Speaking->orange).
figma.connect(VoiceWaveform, 'BALENCIA_DS?node-id=351-165', {
  props: {
    tone: figma.enum('State', { Idle: 'idle', Listening: 'purple', Speaking: 'orange' }),
  },
  example: (props) => <VoiceWaveform tone={props.tone} />,
})
