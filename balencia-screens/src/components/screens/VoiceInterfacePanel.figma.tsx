import figma from '@figma/code-connect'
import { VoiceInterfacePanel } from '@/components/screens/VoiceInterfacePanel'

// Figma SET 403:215 — ReadyToSend[False,True]->readyToSend, Transcript TEXT->transcript
// (HasTranscript is presence-based; dropped).
figma.connect(VoiceInterfacePanel, 'BALENCIA_DS?node-id=403-215', {
  props: {
    readyToSend: figma.boolean('ReadyToSend'),
    transcript: figma.string('Transcript'),
  },
  example: (props) => (
    <VoiceInterfacePanel readyToSend={props.readyToSend} transcript={props.transcript} />
  ),
})
