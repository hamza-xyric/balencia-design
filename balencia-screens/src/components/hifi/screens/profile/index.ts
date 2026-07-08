import type { ComponentType } from 'react'
import { S17MeMain } from './S17MeMain'
import { S18Explore } from './S18Explore'
import { S19RpgCharacter } from './S19RpgCharacter'
import { S42CelebrationOverlay } from './S42CelebrationOverlay'
import { S50ProfileEdit } from './S50ProfileEdit'
import { S68UniversalSearch } from './S68UniversalSearch'
import { S71AchievementGallery } from './S71AchievementGallery'
import { S83BuddyProfile } from './S83BuddyProfile'
import { S92Reputation } from './S92Reputation'

export const profileScreens = {
  '17': S17MeMain,
  '18': S18Explore,
  '19': S19RpgCharacter,
  '42': S42CelebrationOverlay,
  '50': S50ProfileEdit,
  '68': S68UniversalSearch,
  '71': S71AchievementGallery,
  '83': S83BuddyProfile,
  '92': S92Reputation,
} satisfies Record<string, ComponentType>
