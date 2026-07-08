import type { ComponentType } from 'react'
import { S39Leaderboard } from './S39Leaderboard'
import { S40CommunityRooms } from './S40CommunityRooms'
import { S46Accountability } from './S46Accountability'
import { S47Competitions } from './S47Competitions'
import { S82AccountabilityContract } from './S82AccountabilityContract'
import { S91SocialFeed } from './S91SocialFeed'
import { S94Webinars } from './S94Webinars'
import { S95PodsHub } from './S95PodsHub'

export const socialScreens = {
  '39': S39Leaderboard,
  '40': S40CommunityRooms,
  '46': S46Accountability,
  '47': S47Competitions,
  '82': S82AccountabilityContract,
  '91': S91SocialFeed,
  '94': S94Webinars,
  '95': S95PodsHub,
} satisfies Record<string, ComponentType>
