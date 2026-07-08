import type { ComponentType } from 'react'
import { S03WelcomeSignUp } from './S03WelcomeSignUp'
import { S07CiaOnboarding } from './S07CiaOnboarding'
import { S66NotificationPermission } from './S66NotificationPermission'

export const authScreens = {
  '03': S03WelcomeSignUp,
  '07': S07CiaOnboarding,
  '66': S66NotificationPermission,
} satisfies Record<string, ComponentType>
