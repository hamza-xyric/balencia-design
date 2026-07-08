import type { ComponentType } from 'react'
import { S91SocialFeed } from './S91SocialFeed'

export const socialScreens = {
  '91': S91SocialFeed,
} satisfies Record<string, ComponentType>
