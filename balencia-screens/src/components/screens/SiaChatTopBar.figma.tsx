import figma from '@figma/code-connect'
import { SiaChatTopBar } from '@/components/screens/SiaChatTopBar'

// Figma SET 290:134 — VoiceActive[False,True]->voiceActive, Title/Subtitle TEXT->title/subtitle.
figma.connect(SiaChatTopBar, 'BALENCIA_DS?node-id=290-134', {
  props: {
    voiceActive: figma.boolean('VoiceActive'),
    title: figma.string('Title'),
    subtitle: figma.string('Subtitle'),
  },
  example: (props) => (
    <SiaChatTopBar voiceActive={props.voiceActive} title={props.title} subtitle={props.subtitle} />
  ),
})
