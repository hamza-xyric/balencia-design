import type { ComponentType } from 'react'
import { S16LifeAreas } from './S16LifeAreas'
import { S48Intelligence } from './S48Intelligence'

export const intelligenceScreens = {
  '16': S16LifeAreas,
  '48': S48Intelligence,
} satisfies Record<string, ComponentType>
