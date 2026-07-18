import type { ComponentType } from 'react'
import { S12HomeScreen } from './S12HomeScreen'
import { S13MissionBoard } from './S13MissionBoard'
import { S14MissionDetail } from './S14MissionDetail'
import { S15CreateEditMission } from './S15CreateEditMission'
import { S41ScheduleCalendar } from './S41ScheduleCalendar'
import { S44WaterIntake } from './S44WaterIntake'
import { S45DailyCheckin } from './S45DailyCheckin'
import { S59StreakDetails } from './S59StreakDetails'
import { S61RemindersTasks } from './S61RemindersTasks'
import { S73MissionJournal } from './S73MissionJournal'
import { S97PlansLibrary } from './S97PlansLibrary'

export const todayScreens = {
  '12': S12HomeScreen,
  '13': S13MissionBoard,
  '14': S14MissionDetail,
  '15': S15CreateEditMission,
  '41': S41ScheduleCalendar,
  '44': S44WaterIntake,
  '45': S45DailyCheckin,
  '59': S59StreakDetails,
  '61': S61RemindersTasks,
  '73': S73MissionJournal,
  '97': S97PlansLibrary,
} satisfies Record<string, ComponentType>
