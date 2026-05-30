import figma from '@figma/code-connect'
import { HabitRow } from '@/components/domain/HabitRow'

// Figma SET 196:17 — Completed[False,True]->completed boolean. HasStreak BOOLEAN + streak count
// are data; shown representatively.
figma.connect(HabitRow, 'BALENCIA_DS?node-id=196-17', {
  props: {
    completed: figma.enum('Completed', { True: true, False: false }),
  },
  example: (props) => (
    <HabitRow name="Morning meditation" domain="meditation" streak={12} completed={props.completed} />
  ),
})
