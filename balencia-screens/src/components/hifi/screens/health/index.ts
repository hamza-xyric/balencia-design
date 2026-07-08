import type { ComponentType } from 'react'
import { S63EnergyTracking } from './S63EnergyTracking'
import { S89Wellbeing } from './S89Wellbeing'

export const healthScreens = {
  '63': S63EnergyTracking,
  '89': S89Wellbeing,
} satisfies Record<string, ComponentType>
