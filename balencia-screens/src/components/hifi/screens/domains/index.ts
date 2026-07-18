import type { ComponentType } from 'react'
import { S30FinanceMoneyMap } from './S30FinanceMoneyMap'
import { S31BudgetDetail } from './S31BudgetDetail'
import { S32CareerDashboard } from './S32CareerDashboard'
import { S33RelationshipsDashboard } from './S33RelationshipsDashboard'
import { S34SpiritualityDashboard } from './S34SpiritualityDashboard'
import { S35LearningDashboard } from './S35LearningDashboard'
import { S36CreativityDashboard } from './S36CreativityDashboard'
import { S37Journal } from './S37Journal'
import { S38Habits } from './S38Habits'

export const domainScreens = {
  '30': S30FinanceMoneyMap,
  '31': S31BudgetDetail,
  '32': S32CareerDashboard,
  '33': S33RelationshipsDashboard,
  '34': S34SpiritualityDashboard,
  '35': S35LearningDashboard,
  '36': S36CreativityDashboard,
  '37': S37Journal,
  '38': S38Habits,
} satisfies Record<string, ComponentType>
