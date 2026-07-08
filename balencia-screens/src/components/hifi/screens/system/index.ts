import type { ComponentType } from 'react'
import { S67ImageViewer } from './S67ImageViewer'
import { S69AppRating } from './S69AppRating'
import { S80MusicCoach } from './S80MusicCoach'
import { S81VideoLibrary } from './S81VideoLibrary'
import { S85ObstacleCoach } from './S85ObstacleCoach'
import { S98SystemStates } from './S98SystemStates'

export const systemScreens = {
  '67': S67ImageViewer,
  '69': S69AppRating,
  '80': S80MusicCoach,
  '81': S81VideoLibrary,
  '85': S85ObstacleCoach,
  '98': S98SystemStates,
} satisfies Record<string, ComponentType>
