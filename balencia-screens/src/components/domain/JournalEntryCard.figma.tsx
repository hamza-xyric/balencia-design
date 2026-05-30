import figma from '@figma/code-connect'
import { JournalEntryCard } from '@/components/domain/JournalEntryCard'

// Figma 253:99 — Date/Preview/Mood TEXT -> date/preview/mood; HasVoice->voice, WithDivider->
// withDivider. HasMood is presence-based (dropped). `domains` is data.
figma.connect(JournalEntryCard, 'BALENCIA_DS?node-id=253-99', {
  props: {
    date: figma.string('Date'),
    preview: figma.string('Preview'),
    mood: figma.string('Mood'),
    voice: figma.boolean('HasVoice'),
    withDivider: figma.boolean('WithDivider'),
  },
  example: (props) => (
    <JournalEntryCard
      date={props.date}
      preview={props.preview}
      mood={props.mood}
      voice={props.voice}
      withDivider={props.withDivider}
      domains={['wellbeing', 'fitness']}
    />
  ),
})
