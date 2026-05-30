import figma from '@figma/code-connect'
import { HabitRow } from '@/components/domain/HabitRow'

// Figma SET 196:17 — State[Default,CheckedToday,Streak]->completed (CheckedToday->true). The
// streak count is data. Shown representatively.
figma.connect(HabitRow, 'BALENCIA_DS?node-id=196-17', {
  props: {
    completed: figma.enum('State', { Default: false, CheckedToday: true, Streak: true }),
  },
  example: (props) => (
    <HabitRow name="Morning meditation" domain="meditation" streak={12} completed={props.completed} />
  ),
})
