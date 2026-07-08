import type { ComponentType } from 'react'
import { S26FitnessDashboard } from './S26FitnessDashboard'
import { S28NutritionDashboard } from './S28NutritionDashboard'
import { S63EnergyTracking } from './S63EnergyTracking'
import { S89Wellbeing } from './S89Wellbeing'

export const healthScreens = {
  '26': S26FitnessDashboard,
  '28': S28NutritionDashboard,
  '63': S63EnergyTracking,
  '89': S89Wellbeing,
} satisfies Record<string, ComponentType>
