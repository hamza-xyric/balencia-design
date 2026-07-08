import type { ComponentType } from 'react'
import { S12HomeScreen } from './S12HomeScreen'
import { S13MissionBoard } from './S13MissionBoard'

export const todayScreens = {
  '12': S12HomeScreen,
  '13': S13MissionBoard,
} satisfies Record<string, ComponentType>
