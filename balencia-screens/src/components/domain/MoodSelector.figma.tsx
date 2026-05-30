import figma from '@figma/code-connect'
import { MoodSelector } from '@/components/domain/MoodSelector'

// Figma 155:5 — no variant axes; data-driven (options + selectedLabel). Shown representatively.
// (The Figma MoodOption node 404:31 has no standalone React component — see commit b68711e.)
figma.connect(MoodSelector, 'BALENCIA_DS?node-id=155-5', {
  example: () => (
    <MoodSelector
      selectedLabel="Good"
      options={[
        { emoji: '😣', label: 'Rough' },
        { emoji: '😐', label: 'Meh' },
        { emoji: '🙂', label: 'Good' },
        { emoji: '😄', label: 'Great' },
        { emoji: '🤩', label: 'Amazing' },
      ]}
    />
  ),
})
