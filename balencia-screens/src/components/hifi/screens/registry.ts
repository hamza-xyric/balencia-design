import type { ComponentType } from 'react'
import { authScreens } from './auth'
import { ciaScreens } from './cia'
import { todayScreens } from './today'
import { intelligenceScreens } from './intelligence'
import { healthScreens } from './health'
import { socialScreens } from './social'

export const hifiScreenRegistry: Record<string, ComponentType> = {
  ...authScreens,
  ...ciaScreens,
  ...todayScreens,
  ...intelligenceScreens,
  ...healthScreens,
  ...socialScreens,
}
