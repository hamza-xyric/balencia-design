import type { ComponentType } from 'react'
import { S17MeMain } from './S17MeMain'
import { S19RpgCharacter } from './S19RpgCharacter'
import { S50ProfileEdit } from './S50ProfileEdit'
import { S68UniversalSearch } from './S68UniversalSearch'
import { S83BuddyProfile } from './S83BuddyProfile'
import { S92Reputation } from './S92Reputation'

export const profileScreens = {
  '17': S17MeMain,
  '19': S19RpgCharacter,
  '50': S50ProfileEdit,
  '68': S68UniversalSearch,
  '83': S83BuddyProfile,
  '92': S92Reputation,
} satisfies Record<string, ComponentType>
