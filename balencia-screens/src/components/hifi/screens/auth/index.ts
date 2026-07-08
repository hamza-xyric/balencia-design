import type { ComponentType } from 'react'
import { S66NotificationPermission } from './S66NotificationPermission'

export const authScreens = {
  '66': S66NotificationPermission,
} satisfies Record<string, ComponentType>
