import type { ComponentType } from 'react'
import { S26FitnessDashboard } from './S26FitnessDashboard'
import { S27WorkoutDetail } from './S27WorkoutDetail'
import { S28NutritionDashboard } from './S28NutritionDashboard'
import { S29MealDetail } from './S29MealDetail'
import { S49ProgressPhotos } from './S49ProgressPhotos'
import { S56Recipes } from './S56Recipes'
import { S57ShoppingList } from './S57ShoppingList'
import { S63EnergyTracking } from './S63EnergyTracking'
import { S70ExerciseLibrary } from './S70ExerciseLibrary'
import { S86VirtualTryon } from './S86VirtualTryon'
import { S87TryonHistory } from './S87TryonHistory'
import { S88VisionSuite } from './S88VisionSuite'
import { S89Wellbeing } from './S89Wellbeing'

export const healthScreens = {
  '26': S26FitnessDashboard,
  '27': S27WorkoutDetail,
  '28': S28NutritionDashboard,
  '29': S29MealDetail,
  '49': S49ProgressPhotos,
  '56': S56Recipes,
  '57': S57ShoppingList,
  '63': S63EnergyTracking,
  '70': S70ExerciseLibrary,
  '86': S86VirtualTryon,
  '87': S87TryonHistory,
  '88': S88VisionSuite,
  '89': S89Wellbeing,
} satisfies Record<string, ComponentType>
