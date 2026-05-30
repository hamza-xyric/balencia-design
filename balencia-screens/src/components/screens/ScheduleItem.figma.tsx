import figma from '@figma/code-connect'
import { ScheduleItem } from '@/components/screens/ScheduleItem'
import { schedule } from '@/data/mock'

// Figma SET 180:2 — State[Upcoming,Active,Completed,Missed] derives from the `event` object
// (no flat state prop). React API is <ScheduleItem event={obj} />.
figma.connect(ScheduleItem, 'BALENCIA_DS?node-id=180-2', {
  example: () => <ScheduleItem event={schedule[0]} />,
})
