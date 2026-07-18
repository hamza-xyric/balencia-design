import type { ComponentType } from 'react'
import { S17MeMain } from './S17MeMain'
import { S18Explore } from './S18Explore'
import { S19RpgCharacter } from './S19RpgCharacter'
import { S21Settings } from './S21Settings'
import { S22ConnectedServices } from './S22ConnectedServices'
import { S23SubscriptionBilling } from './S23SubscriptionBilling'
import { S24NotificationHistory } from './S24NotificationHistory'
import { S25HelpCenter } from './S25HelpCenter'
import { S42CelebrationOverlay } from './S42CelebrationOverlay'
import { S43Paywall } from './S43Paywall'
import { S50ProfileEdit } from './S50ProfileEdit'
import { S68UniversalSearch } from './S68UniversalSearch'
import { S71AchievementGallery } from './S71AchievementGallery'
import { S83BuddyProfile } from './S83BuddyProfile'
import { S92Reputation } from './S92Reputation'

export const profileScreens = {
  '17': S17MeMain,
  '18': S18Explore,
  '19': S19RpgCharacter,
  '21': S21Settings,
  '22': S22ConnectedServices,
  '23': S23SubscriptionBilling,
  '24': S24NotificationHistory,
  '25': S25HelpCenter,
  '42': S42CelebrationOverlay,
  '43': S43Paywall,
  '50': S50ProfileEdit,
  '68': S68UniversalSearch,
  '71': S71AchievementGallery,
  '83': S83BuddyProfile,
  '92': S92Reputation,
} satisfies Record<string, ComponentType>
