import type { ComponentType } from 'react'
import { S16LifeAreas } from './S16LifeAreas'
import { S20CiaMemory } from './S20CiaMemory'
import { S48Intelligence } from './S48Intelligence'
import { S72KnowledgeGraph } from './S72KnowledgeGraph'
import { S84DataSources } from './S84DataSources'
import { S90ProgressMeasurements } from './S90ProgressMeasurements'
import { S93MoodTrends } from './S93MoodTrends'
import { S96HealthDataView } from './S96HealthDataView'

export const intelligenceScreens = {
  '16': S16LifeAreas,
  '20': S20CiaMemory,
  '48': S48Intelligence,
  '72': S72KnowledgeGraph,
  '84': S84DataSources,
  '90': S90ProgressMeasurements,
  '93': S93MoodTrends,
  '96': S96HealthDataView,
} satisfies Record<string, ComponentType>
