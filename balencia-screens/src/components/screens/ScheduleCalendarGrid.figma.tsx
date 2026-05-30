import figma from '@figma/code-connect'
import { ScheduleCalendarGrid } from '@/components/screens/ScheduleCalendarGrid'
import { schedule } from '@/data/mock'

// Figma 429:215 — data-driven (events array). Shown with the real mock schedule.
figma.connect(ScheduleCalendarGrid, 'BALENCIA_DS?node-id=429-215', {
  example: () => <ScheduleCalendarGrid events={schedule} />,
})
