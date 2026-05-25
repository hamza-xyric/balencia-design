import type { DomainKey } from './domains'
import { xpRewards } from './xp'

export interface User {
  name: string
  firstName: string
  level: number
  title: string
  titleRarity: 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary'
  lifePower: number
  totalXP: number
  currentLevelXP: number
  nextLevelXP: number
  daysActive: number
  currentStreak: number
  longestStreak: number
  streakMultiplier: number
  avatar: string
}

export interface DomainStat {
  domain: DomainKey
  stat: number
  level: number
  currentXP: number
  nextLevelXP: number
}

export type MissionType = 'life' | 'main' | 'side' | 'weekly' | 'daily' | 'group'
export type MissionDifficulty = 'easy' | 'moderate' | 'hard'
export type MissionStatus = 'active' | 'completed' | 'paused'

export interface Mission {
  id: string
  name: string
  domain: DomainKey
  domains?: DomainKey[]
  type: MissionType
  progress: number
  xp: number
  streak: number
  pinned: boolean
  difficulty?: MissionDifficulty
  status?: MissionStatus
  actionsCompleted?: number
  totalActions?: number
  lifeAreas?: number
  daysSinceLastAction?: number
  chainPosition: { current: number; total: number } | null
  nextAction: string
  siaNote: string
}

export interface MissionSuggestion {
  id: string
  name: string
  type: MissionType
  domains: DomainKey[]
  reason: string
}

export interface MissionAction {
  id: string
  name: string
  domain: DomainKey
  completed: boolean
  timeEstimate?: string
  xp?: number
}

export interface MissionMilestone {
  id: string
  name: string
  date: string
  status: 'completed' | 'upcoming' | 'future'
}

export interface MissionChainStep {
  id: string
  name: string
  type: MissionType
  domain: DomainKey
  status: 'completed' | 'current' | 'upcoming'
  xp?: number
  progress?: number
}

export interface TodayAction {
  id: string
  name: string
  domain: DomainKey
  timeEstimate: string
  completed: boolean
  xp: number
}

export interface HealthMetric {
  id: 'heart-rate' | 'steps' | 'sleep'
  value: string
  unit: string
}

export interface QuickAction {
  id: 'breathe' | 'water' | 'journal' | 'check-in' | 'quick-note'
  label: string
  isSIASuggested?: boolean
}

export interface MoodChip {
  emoji: string
  label: string
}

export interface HomeInsight {
  eyebrow: string
  text: string
  domains: DomainKey[]
}

export interface RecentActivity {
  id: string
  xp: number
  description: string
  timestamp: string
}

export interface Habit {
  id: string
  name: string
  domain: DomainKey
  streak: number
  completed: boolean
  time: string
}

export interface ScheduleEvent {
  id: string
  time: string
  endTime?: string
  name: string
  domain: DomainKey
  isSIASuggested: boolean
  source?: 'synced' | 'sia' | 'manual'
  startHour?: number
  startMinute?: number
  durationMinutes?: number
  xp?: number
}

export interface ChatMessage {
  id: string
  sender: 'user' | 'sia'
  text: string
  timestamp: string
  type?: 'text' | 'chart' | 'goal-progress' | 'connection-spotted'
}

export type ConversationKind = 'sia' | 'direct' | 'group' | 'room'

export interface ConversationPreview {
  id: string
  name: string
  subtitle: string
  route: string
  kind: ConversationKind
  timestamp: string
  unread: number
  initials: string
  domain: DomainKey
  active: boolean
  pinned?: boolean
  aiAssisted?: boolean
  muted?: boolean
}

export interface ConversationReaction {
  label: string
  count: number
}

export interface ConversationAttachment {
  kind: 'mission' | 'image' | 'voice' | 'plan'
  title: string
  meta: string
  domain: DomainKey
}

export interface ConversationThreadMessage {
  id: string
  sender: 'user' | 'member' | 'sia'
  author: string
  avatar: string
  text: string
  timestamp: string
  domain?: DomainKey
  status?: 'sent' | 'delivered' | 'read'
  reactions?: ConversationReaction[]
  attachment?: ConversationAttachment
  highlighted?: boolean
}

export interface Workout {
  id: string
  name: string
  duration: string
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  exercises: { name: string; sets: number; reps: string; rest: string }[]
}

export interface Meal {
  id: string
  name: string
  mealType: 'breakfast' | 'lunch' | 'dinner' | 'snack'
  calories: number
  protein: number
  carbs: number
  fat: number
  time: string
}

export interface WorkoutPlanExercise {
  name: string
  sets: number
  reps: string
  rest: string
  note?: string
  lastSet?: string
}

export interface FitnessDashboardData {
  siaNote: string
  workout: {
    name: string
    type: string
    duration: string
    exercises: string[]
    overflowCount: number
  }
  whoop: {
    sleep: number
    hrv: number
    recovery: number
  }
  activeMissions: {
    name: string
    progress: number
    domain: DomainKey
  }[]
  week: {
    days: { label: string; state: 'complete' | 'planned' | 'today' | 'rest' | 'future' }[]
    stats: { value: string; label: string }[]
  }
}

export interface WorkoutDetailData {
  name: string
  type: string
  duration: string
  siaNote: string
  exercises: WorkoutPlanExercise[]
  activeSession: {
    elapsed: string
    exerciseIndex: number
    totalExercises: number
    currentExercise: string
    setIndex: number
    totalSets: number
    weight: string
    reps: string
    lastSet: string
    restRemaining: string
    nextExercise: string
    nextDetails: string
    siaNote: string
  }
  summary: {
    duration: string
    exercises: string
    calories: string
    xpEarned: number
    xpProgress: number
  }
}

export interface NutritionDashboardData {
  siaNote: string
  meals: Meal[]
  macros: {
    label: string
    current: number
    target: number
    unit: string
    tone: 'primary' | 'muted'
  }[]
  water: {
    current: number
    target: number
  }
  activeMissions: {
    name: string
    progress: number
    domain: DomainKey
  }[]
  recentFoodLog: {
    name: string
    calories: number
  }[]
}

export interface FoodItem {
  name: string
  calories: number
  protein?: number
  carbs?: number
  fat?: number
}

export interface MealDetailData {
  meal: Meal
  date: string
  siaInsight: string
  ingredients: FoodItem[]
  recentFoods: FoodItem[]
  frequentFoods: FoodItem[]
  searchResults: FoodItem[]
}

export interface Transaction {
  id: string
  merchant: string
  amount: number
  category: string
  date: string
  isIncome: boolean
}

export interface LeaderboardEntry {
  rank: number
  name: string
  avatar: string
  level: number
  xp: number
  topDomain: DomainKey
}

export interface LearningDashboardData {
  siaNote: string
  currentItem: {
    title: string
    author: string
    progress: number
    dailyTarget: string
    streak: number
  }
  suggestions: {
    id: string
    name: string
    completed: boolean
    xp: number
  }[]
  activeMissions: {
    id: string
    name: string
    progress: number
  }[]
  streak: {
    current: number
    best: number
    days: { label: string; state: 'complete' | 'missed' | 'today' }[]
  }
  library: {
    id: string
    title: string
    status: string
    progress: number
    completed?: boolean
  }[]
  activity: {
    id: string
    date: string
    description: string
    xp?: number
  }[]
  prompt: string
}

export interface CreativityDashboardData {
  siaNote: string
  projects: {
    id: string
    name: string
    milestone: string
    progress: number
    due?: string
  }[]
  prompt: string
  practiceWeek: {
    cells: { id: string; intensity: 0 | 1 | 2 | 3 | 4; ariaLabel: string }[]
    total: string
    trend: string
  }
  activeMissions: {
    id: string
    name: string
    progress: number
  }[]
  streak: {
    current: number
    best: number
    days: { label: string; state: 'complete' | 'missed' | 'today' }[]
  }
  timeline: {
    id: string
    date: string
    label: string
  }[]
  activity: {
    id: string
    date: string
    description: string
    xp?: number
  }[]
}

export interface JournalEntry {
  id: string
  date: string
  preview: string
  domains: DomainKey[]
  mood?: string
  voice?: boolean
}

export interface HabitSection {
  id: string
  title: string
  habits: Habit[]
}

export interface Notification {
  id: string
  title: string
  body: string
  category: string
  timestamp: string
  read: boolean
}

export interface DomainProgress {
  domain: DomainKey
  activeMissions: number
  weekDelta: number
  monthDelta: number
}

export interface CompletedMission {
  id: string
  name: string
  type: MissionType
  domains: DomainKey[]
  completedAt: string
  xpEarned: number
}

export interface ExploreModule {
  id: string
  name: string
  description: string
  route: string
  icon: string
  domain?: DomainKey
  badge?: 'suggested' | 'new' | 'popular' | 'start here'
  lockedTier?: 'Plus' | 'Pro'
}

export interface ExploreDomainSection {
  id: string
  title: string
  domain: DomainKey
  modules: ExploreModule[]
}

export interface WikiChapter {
  id: string
  label: string
  count: number
}

export interface WikiEntry {
  id: string
  chapter: string
  title: string
  content: string
  source: 'conversation' | 'data' | 'edited'
  date: string
  confidence?: 'high' | 'medium' | 'low'
}

// --- Mock Data ---

export const user: User = {
  name: 'Amira',
  firstName: 'Amira',
  level: 14,
  title: 'Dedicated explorer',
  titleRarity: 'common',
  lifePower: 487,
  totalXP: 8450,
  currentLevelXP: 2450,
  nextLevelXP: 5809,
  daysActive: 142,
  currentStreak: 42,
  longestStreak: 67,
  streakMultiplier: 1.5,
  avatar: 'A',
}

export const domainStats: DomainStat[] = [
  { domain: 'fitness',       stat: 72, level: 12, currentXP: 3200, nextLevelXP: 5000 },
  { domain: 'sleep',         stat: 65, level: 8,  currentXP: 1800, nextLevelXP: 3300 },
  { domain: 'career',        stat: 31, level: 5,  currentXP: 900,  nextLevelXP: 1300 },
  { domain: 'nutrition',     stat: 58, level: 9,  currentXP: 2100, nextLevelXP: 3500 },
  { domain: 'finance',       stat: 44, level: 8,  currentXP: 1500, nextLevelXP: 3300 },
  { domain: 'faith',         stat: 52, level: 4,  currentXP: 600,  nextLevelXP: 850 },
  { domain: 'productivity',  stat: 48, level: 6,  currentXP: 1100, nextLevelXP: 1850 },
  { domain: 'relationships', stat: 55, level: 7,  currentXP: 1400, nextLevelXP: 2500 },
  { domain: 'wellbeing',     stat: 61, level: 11, currentXP: 2800, nextLevelXP: 4200 },
  { domain: 'meditation',    stat: 39, level: 3,  currentXP: 350,  nextLevelXP: 500 },
]

export const domainProgress: DomainProgress[] = [
  { domain: 'fitness',       activeMissions: 3, weekDelta: 4,  monthDelta: 11 },
  { domain: 'sleep',         activeMissions: 2, weekDelta: 2,  monthDelta: 6 },
  { domain: 'career',        activeMissions: 1, weekDelta: -1, monthDelta: -4 },
  { domain: 'nutrition',     activeMissions: 2, weekDelta: 3,  monthDelta: 8 },
  { domain: 'finance',       activeMissions: 1, weekDelta: 1,  monthDelta: 5 },
  { domain: 'faith',         activeMissions: 4, weekDelta: 2,  monthDelta: 7 },
  { domain: 'productivity',  activeMissions: 1, weekDelta: 0,  monthDelta: 2 },
  { domain: 'relationships', activeMissions: 2, weekDelta: 2,  monthDelta: 3 },
  { domain: 'wellbeing',     activeMissions: 3, weekDelta: 3,  monthDelta: 9 },
  { domain: 'meditation',    activeMissions: 1, weekDelta: 1,  monthDelta: 4 },
]

export const missions: Mission[] = [
  {
    id: '1', name: 'Run a half marathon', domain: 'fitness', domains: ['fitness', 'nutrition'], type: 'main',
    progress: 0.68, xp: 340, streak: 12, pinned: true, difficulty: 'moderate', status: 'active',
    actionsCompleted: 5, totalActions: 7, lifeAreas: 3, daysSinceLastAction: 1,
    chainPosition: { current: 2, total: 4 },
    nextAction: '5K tempo run',
    siaNote: 'Strong momentum this week. Your tempo runs are paying off.',
  },
  {
    id: '2', name: 'Save $5,000 by December', domain: 'finance', domains: ['finance'], type: 'side',
    progress: 0.42, xp: 120, streak: 5, pinned: true, difficulty: 'moderate', status: 'active',
    actionsCompleted: 3, totalActions: 8, lifeAreas: 1, daysSinceLastAction: 2,
    chainPosition: null,
    nextAction: 'Review subscriptions',
    siaNote: 'Spending is down 12% since you started weekly reviews.',
  },
  {
    id: '3', name: 'Meditate daily for 30 days', domain: 'meditation', domains: ['meditation', 'wellbeing'], type: 'daily',
    progress: 0.25, xp: 10, streak: 7, pinned: false, difficulty: 'easy', status: 'active',
    actionsCompleted: 7, totalActions: 30, lifeAreas: 2, daysSinceLastAction: 0,
    chainPosition: null,
    nextAction: '10-minute morning session',
    siaNote: 'A short session keeps the chain alive without adding pressure.',
  },
  {
    id: '4', name: 'Read 2 books this month', domain: 'learning', domains: ['learning', 'career'], type: 'weekly',
    progress: 0.35, xp: 75, streak: 0, pinned: false, difficulty: 'easy', status: 'active',
    actionsCompleted: 2, totalActions: 6, lifeAreas: 2, daysSinceLastAction: 3,
    chainPosition: { current: 1, total: 2 },
    nextAction: 'Read 30 pages tonight',
    siaNote: 'Your evening window is the most reliable reading slot.',
  },
]

export const missionSuggestions: MissionSuggestion[] = [
  {
    id: 'strength-support',
    name: 'Add two strength sessions',
    type: 'side',
    domains: ['fitness'],
    reason: 'Your running load is climbing. Strength work will protect recovery and pace.',
  },
  {
    id: 'meal-prep',
    name: 'Prep race-week meals',
    type: 'weekly',
    domains: ['nutrition'],
    reason: 'Fueling is the main support domain for your half marathon chain.',
  },
]

export const missionActions: MissionAction[] = [
  { id: 'a1', name: 'Start with 5K runs', domain: 'fitness', completed: true, xp: 75 },
  { id: 'a2', name: 'Build to 10K distance', domain: 'fitness', completed: true, xp: 75 },
  { id: 'a3', name: 'Practice tempo intervals', domain: 'fitness', completed: true, xp: 75 },
  { id: 'a4', name: 'Log post-run meals', domain: 'nutrition', completed: true, xp: 25 },
  { id: 'a5', name: 'Join a weekend running group', domain: 'relationships', completed: true, xp: 15 },
  { id: 'a6', name: '5K tempo run', domain: 'fitness', completed: false, timeEstimate: '30 min', xp: 75 },
  { id: 'a7', name: 'Complete a 16K long run', domain: 'fitness', completed: false, xp: 75 },
]

export const missionMilestones: MissionMilestone[] = [
  { id: 'm1', name: '5K under 30 min', date: 'May 15', status: 'completed' },
  { id: 'm2', name: '10K completed', date: 'Jun 30', status: 'upcoming' },
  { id: 'm3', name: 'Half marathon ready', date: 'Nov 1', status: 'future' },
]

export const missionChain: MissionChainStep[] = [
  { id: 'c1', name: 'Run a consistent 5K', type: 'side', domain: 'fitness', status: 'completed', xp: 150 },
  { id: 'c2', name: 'Run a half marathon', type: 'main', domain: 'fitness', status: 'current', progress: 0.68 },
  { id: 'c3', name: 'Enter a 10K race', type: 'side', domain: 'fitness', status: 'upcoming' },
  { id: 'c4', name: 'Complete a marathon', type: 'life', domain: 'fitness', status: 'upcoming' },
]

export const missionConnections = [
  {
    id: 'nutrition-link',
    name: 'Protein consistency',
    domains: ['nutrition'] as DomainKey[],
    text: 'Fueling supports endurance training and protects recovery after longer runs.',
  },
  {
    id: 'sleep-link',
    name: 'Earlier bedtime',
    domains: ['sleep'] as DomainKey[],
    text: 'Your runs feel easier after 7 hours of sleep, especially on interval days.',
  },
]

export const completedMissions: CompletedMission[] = [
  {
    id: 'cm1',
    name: 'Save $2,000 emergency fund',
    type: 'side',
    domains: ['finance'],
    completedAt: 'May 2026',
    xpEarned: 350,
  },
  {
    id: 'cm2',
    name: 'Run a consistent 5K',
    type: 'side',
    domains: ['fitness'],
    completedAt: 'Apr 2026',
    xpEarned: 150,
  },
  {
    id: 'cm3',
    name: 'Read 5 books',
    type: 'weekly',
    domains: ['career', 'learning'],
    completedAt: 'Mar 2026',
    xpEarned: 200,
  },
  {
    id: 'cm4',
    name: 'Build a morning prayer rhythm',
    type: 'daily',
    domains: ['faith'],
    completedAt: 'Mar 2026',
    xpEarned: 120,
  },
]

export const createMissionPlan = {
  input: 'Run a half marathon',
  type: 'main' as MissionType,
  domains: ['fitness'] as DomainKey[],
  actions: [
    'Start with 5K runs',
    'Build to 10K',
    'Join a running club',
    'Follow training plan',
    'Complete half marathon',
  ],
  milestones: [
    { name: '5K under 30 min', date: 'Jun 15' },
    { name: '10K completed', date: 'Aug 1' },
    { name: 'Half marathon done', date: 'Nov 1' },
  ],
  tracking: ['Weekly distance', 'Pace', 'Rest days per week'],
  connections: ['nutrition'] as DomainKey[],
  chainSuggestions: [
    { name: 'Enter a 10K race', type: 'side' as MissionType, domains: ['fitness'] as DomainKey[] },
    { name: 'Complete a marathon', type: 'life' as MissionType, domains: ['fitness'] as DomainKey[] },
  ],
}

export const todayActions: TodayAction[] = [
  { id: '1', name: 'Meditate 10 min',       domain: 'meditation',    timeEstimate: '10 min', completed: false, xp: 50 },
  { id: '2', name: 'Morning run',           domain: 'fitness',       timeEstimate: '45 min', completed: false, xp: 75 },
  { id: '3', name: 'Review weekly budget',  domain: 'finance',       timeEstimate: '15 min', completed: false, xp: 15 },
  { id: '4', name: 'Log breakfast',         domain: 'nutrition',     timeEstimate: '2 min',  completed: true,  xp: 25 },
  { id: '5', name: 'Journal reflection',    domain: 'wellbeing',     timeEstimate: '5 min',  completed: false, xp: 25 },
  { id: '6', name: 'Read for 30 minutes',   domain: 'career',        timeEstimate: '30 min', completed: false, xp: 10 },
]

export const homeMoodChips: MoodChip[] = [
  { emoji: '😊', label: 'Good' },
  { emoji: '😐', label: 'Okay' },
  { emoji: '😔', label: 'Low' },
  { emoji: '⚡', label: 'Ready' },
]

export const healthMetrics: HealthMetric[] = [
  { id: 'heart-rate', value: '72', unit: 'bpm' },
  { id: 'steps', value: '1,204', unit: 'steps' },
  { id: 'sleep', value: '7.2', unit: 'hrs' },
]

export const quickActions: QuickAction[] = [
  { id: 'breathe', label: 'Breathe' },
  { id: 'water', label: 'Water' },
  { id: 'journal', label: 'Journal' },
  { id: 'check-in', label: 'Check-in' },
  { id: 'quick-note', label: 'Quick note', isSIASuggested: true },
]

export const homeInsight: HomeInsight = {
  eyebrow: 'Connection spotted',
  text: 'Sleep quality drops 30% on days you skip exercise.',
  domains: ['sleep', 'fitness'],
}

export const recentActivity: RecentActivity[] = [
  { id: '1', xp: 45, description: 'Completed yoga', timestamp: '1h ago' },
  { id: '2', xp: 25, description: 'Logged breakfast', timestamp: '2h ago' },
  { id: '3', xp: 5, description: 'Checked finances', timestamp: '3h ago' },
]

export const habits: Habit[] = [
  { id: '1', name: 'Drink 2.5L water',    domain: 'wellbeing',    streak: 14, completed: true,  time: 'all day' },
  { id: '2', name: 'Morning prayer',       domain: 'faith',        streak: 42, completed: true,  time: '6:00 AM' },
  { id: '3', name: 'Walk 10,000 steps',   domain: 'fitness',      streak: 8,  completed: false, time: 'all day' },
  { id: '4', name: 'No social media before noon', domain: 'productivity', streak: 5, completed: true, time: 'morning' },
  { id: '5', name: 'Read 20 pages',       domain: 'career',       streak: 3,  completed: false, time: 'evening' },
  { id: '6', name: 'Gratitude journaling', domain: 'wellbeing',   streak: 21, completed: false, time: '9:00 PM' },
  { id: '7', name: 'Stretch routine',     domain: 'fitness',      streak: 7,  completed: false, time: '7:00 AM' },
  { id: '8', name: 'Track spending',      domain: 'finance',      streak: 12, completed: true,  time: 'evening' },
]

export const schedule: ScheduleEvent[] = [
  { id: '1', time: '7:00 AM',  endTime: '7:45 AM',  name: 'Morning run',           domain: 'fitness',      isSIASuggested: false, source: 'manual', startHour: 7,  startMinute: 0,  durationMinutes: 45, xp: xpRewards.workout },
  { id: '2', time: '9:00 AM',  endTime: '9:15 AM',  name: 'Meditate 15m',          domain: 'meditation',   isSIASuggested: true,  source: 'sia',    startHour: 9,  startMinute: 0,  durationMinutes: 45, xp: xpRewards.meditation },
  { id: '3', time: '11:00 AM', endTime: '11:30 AM', name: 'Team standup',           domain: 'career',       isSIASuggested: false, source: 'synced', startHour: 11, startMinute: 0,  durationMinutes: 45, xp: xpRewards.scheduleFollowed },
  { id: '4', time: '2:00 PM',  endTime: '2:45 PM',  name: 'Meal prep',              domain: 'nutrition',    isSIASuggested: false, source: 'manual', startHour: 14, startMinute: 0,  durationMinutes: 45, xp: xpRewards.meal },
  { id: '5', time: '6:00 PM',  endTime: '6:50 PM',  name: 'Gym session',            domain: 'fitness',      isSIASuggested: false, source: 'manual', startHour: 18, startMinute: 0,  durationMinutes: 50, xp: xpRewards.workout },
]

export const scheduleUnscheduled = [
  { id: 'read', name: 'Read 20 min', domain: 'learning' as DomainKey, xp: xpRewards.reading },
  { id: 'expenses', name: 'Log expenses', domain: 'finance' as DomainKey, xp: xpRewards.financialLog },
]

export const scheduleTemplates = [
  { id: 'morning', name: 'Morning routine', count: 5 },
  { id: 'work', name: 'Work day', count: 6 },
  { id: 'evening', name: 'Evening wind-down', count: 4 },
]

export const communityDiscoverRooms = [
  { id: 'fitness-lovers', name: 'Fitness lovers', members: 234, domain: 'fitness' as DomainKey, icon: 'fitness' },
  { id: 'book-club', name: 'Book club', members: 89, domain: 'learning' as DomainKey, icon: 'learning' },
  { id: 'mindfulness', name: 'Mindfulness', members: 156, domain: 'meditation' as DomainKey, icon: 'meditation' },
  { id: 'money-reset', name: 'Money reset', members: 72, domain: 'finance' as DomainKey, icon: 'finance' },
]

export const communityRooms = [
  {
    id: 'morning-crew',
    name: 'Morning crew',
    members: 5,
    lastMessage: 'Sarah: See you at 7 tomorrow',
    timestamp: '10:32 am',
    unread: 3,
    initials: 'M',
    domain: 'fitness' as DomainKey,
    active: true,
  },
  {
    id: 'study-group',
    name: 'Study group',
    members: 3,
    lastMessage: 'Ahmed: Finished chapter 4',
    timestamp: 'yesterday',
    unread: 0,
    initials: 'S',
    domain: 'learning' as DomainKey,
    active: false,
  },
  {
    id: 'accountability-pod',
    name: 'Accountability pod',
    members: 4,
    lastMessage: 'Omar: Hit my mission today',
    timestamp: 'May 18',
    unread: 1,
    initials: 'A',
    domain: 'wellbeing' as DomainKey,
    active: true,
  },
]

export const conversationFilters = ['All', 'SIA', 'People', 'Groups', 'Rooms']

export const conversationPreviews: ConversationPreview[] = [
  {
    id: 'sia-coach',
    name: 'SIA coach',
    subtitle: 'Recovery and meal timing are connected today',
    route: '/tabs/sia',
    kind: 'sia',
    timestamp: 'now',
    unread: 1,
    initials: 'S',
    domain: 'meditation',
    active: true,
    pinned: true,
    aiAssisted: true,
  },
  {
    id: 'aisha-khan',
    name: 'Aisha Khan',
    subtitle: 'Shared her long-run pace and asked for your route',
    route: '/tabs/sia/direct',
    kind: 'direct',
    timestamp: '7 min',
    unread: 2,
    initials: 'AK',
    domain: 'fitness',
    active: true,
    aiAssisted: true,
  },
  {
    id: 'morning-crew',
    name: 'Morning crew',
    subtitle: 'Sarah pinned tomorrow\'s 7 AM meetup',
    route: '/tabs/sia/group',
    kind: 'group',
    timestamp: '18 min',
    unread: 5,
    initials: 'MC',
    domain: 'fitness',
    active: true,
    pinned: true,
    aiAssisted: true,
  },
  {
    id: 'finance-focus',
    name: 'Finance focus',
    subtitle: 'Budget sprint room reached 68% completion',
    route: '/features/community',
    kind: 'room',
    timestamp: '1h',
    unread: 0,
    initials: 'FF',
    domain: 'finance',
    active: false,
    aiAssisted: true,
  },
  {
    id: 'study-group',
    name: 'Study group',
    subtitle: 'Ahmed finished chapter 4 and shared notes',
    route: '/features/community',
    kind: 'group',
    timestamp: 'yesterday',
    unread: 0,
    initials: 'SG',
    domain: 'learning',
    active: false,
  },
]

export const directConversationMessages: ConversationThreadMessage[] = [
  {
    id: 'direct-1',
    sender: 'member',
    author: 'Aisha',
    avatar: 'AK',
    text: 'I am thinking of switching tomorrow to the river route. Same pace target?',
    timestamp: '8:12 AM',
    domain: 'fitness',
  },
  {
    id: 'direct-2',
    sender: 'sia',
    author: 'SIA',
    avatar: 'S',
    text: 'Your recovery supports the river route if you keep the first kilometer easy.',
    timestamp: '8:13 AM',
    domain: 'meditation',
    highlighted: true,
    attachment: {
      kind: 'plan',
      title: 'Suggested pacing',
      meta: '6:20/km warm-up, then steady 5:55/km',
      domain: 'fitness',
    },
  },
  {
    id: 'direct-3',
    sender: 'user',
    author: 'You',
    avatar: 'A',
    text: 'That works. I will bring the route map and keep it easy early.',
    timestamp: '8:15 AM',
    status: 'read',
  },
  {
    id: 'direct-4',
    sender: 'member',
    author: 'Aisha',
    avatar: 'AK',
    text: 'Perfect. I added the hill segment photo so we can decide before we start.',
    timestamp: '8:17 AM',
    domain: 'fitness',
    attachment: {
      kind: 'image',
      title: 'Hill segment',
      meta: 'View-once route photo',
      domain: 'fitness',
    },
    reactions: [
      { label: 'Useful', count: 2 },
    ],
  },
]

export const groupConversationMessages: ConversationThreadMessage[] = [
  {
    id: 'group-1',
    sender: 'member',
    author: 'Sarah',
    avatar: 'S',
    text: 'Tomorrow is tempo day. Who is joining the 7 AM start?',
    timestamp: '10:24 AM',
    domain: 'fitness',
    reactions: [
      { label: 'In', count: 4 },
    ],
  },
  {
    id: 'group-2',
    sender: 'sia',
    author: 'SIA',
    avatar: 'S',
    text: 'Three members have high recovery and one has elevated strain. I suggest two pace groups.',
    timestamp: '10:26 AM',
    domain: 'meditation',
    highlighted: true,
    attachment: {
      kind: 'mission',
      title: 'Group tempo mission',
      meta: 'Complete 5K tempo, earn 120 group XP',
      domain: 'fitness',
    },
  },
  {
    id: 'group-3',
    sender: 'user',
    author: 'You',
    avatar: 'A',
    text: 'I can lead the easy group and keep the route simple.',
    timestamp: '10:27 AM',
    status: 'delivered',
  },
  {
    id: 'group-4',
    sender: 'member',
    author: 'Omar',
    avatar: 'O',
    text: 'That helps. I am still sore from yesterday.',
    timestamp: '10:29 AM',
    domain: 'wellbeing',
  },
]

export const messageActionPreview = {
  message: directConversationMessages[3],
  quickReactions: ['Useful', 'Support', 'Done', 'Insight'],
  actions: [
    { label: 'Pin message', detail: 'Keep this route photo visible in chat', tone: 'orange' },
    { label: 'Star for mission', detail: 'Attach it to Run a half marathon', tone: 'purple' },
    { label: 'Forward', detail: 'Send to Morning crew or SIA coach', tone: 'green' },
    { label: 'Open view-once media', detail: 'Private media can only be viewed once', tone: 'muted' },
  ],
  media: [
    { title: 'Hill segment', meta: 'Route photo - view once', domain: 'fitness' as DomainKey },
    { title: 'Pace note', meta: 'Voice note - 0:18', domain: 'fitness' as DomainKey },
    { title: 'SIA pacing plan', meta: 'Shared plan card', domain: 'meditation' as DomainKey },
  ],
}

export const communityAchievement = {
  name: 'Sarah',
  milestone: 'fitness milestone',
  xp: xpRewards.communityAchievement,
}

export const celebrationMilestone = {
  xp: xpRewards.missionComplete,
  title: 'Mission completed.',
  description: 'Run 5km three times a week',
  message: 'Three weeks strong. Your recovery is up 15% since you started.',
  attribution: 'SIA',
  domain: 'fitness' as DomainKey,
  badgeLabel: '5K',
}

export const paywallPrompt = {
  headline: "unlock SIA's full coaching.",
  previewLabel: 'Cross-domain insight',
  highlights: [
    'Unlimited SIA messages',
    'Cross-domain insights',
    'Voice coaching mode',
    'Advanced mission planning',
  ],
  tier: 'Plus',
  price: '$20/mo',
  description: 'Full SIA coaching, all 9 domains',
  cta: 'Start free trial',
}

export const featuredCompetition = {
  name: 'Step Challenge',
  dateRange: 'May 25 - Jun 8',
  participants: 234,
  countdown: '02d : 14h : 32m',
  prizeXp: xpRewards.competitionPrize,
  prizeBadge: 'Gold badge',
  joined: false,
}

export const competitionSuggestions = [
  { id: 'mindful-7', name: '7-day mindful streak', duration: '7 days', difficulty: 'medium', icon: 'meditation' },
  { id: 'fitness-reset', name: 'Fitness reset', duration: '2 weeks', difficulty: 'hard', icon: 'fitness' },
  { id: 'budget-sprint', name: 'Budget sprint', duration: '10 days', difficulty: 'easy', icon: 'finance' },
]

export const competitionRows = [
  {
    id: 'step',
    name: 'Step Challenge',
    type: 'Admin',
    dateRange: 'May 25 - Jun 8',
    status: 'active',
    participants: 234,
    rank: 12,
    cta: 'View details',
  },
  {
    id: 'meditation',
    name: 'Meditation Marathon',
    type: 'AI',
    dateRange: 'Jun 1 - Jun 14',
    status: 'upcoming',
    participants: 89,
    cta: 'Join',
  },
  {
    id: 'nutrition',
    name: 'Nutrition Challenge',
    type: 'Admin',
    dateRange: 'May 10 - May 24',
    status: 'past',
    participants: 156,
    rank: 5,
    cta: 'View results',
  },
]

export const chatMessages: ChatMessage[] = [
  { id: '1',  sender: 'sia',  text: 'Good morning, Amira. You\'re on a 42-day streak — that\'s incredible discipline.', timestamp: '9:01 AM' },
  { id: '2',  sender: 'sia',  text: 'I noticed something interesting: your sleep quality improves by 23% on days you exercise before noon.', timestamp: '9:01 AM', type: 'connection-spotted' },
  { id: '3',  sender: 'user', text: 'That makes sense, I do feel more tired in the evenings after morning runs', timestamp: '9:03 AM' },
  { id: '4',  sender: 'sia',  text: 'Exactly. Want me to shift your training runs to mornings this week?', timestamp: '9:03 AM' },
  { id: '5',  sender: 'user', text: 'Yes, let\'s try that', timestamp: '9:04 AM' },
  { id: '6',  sender: 'sia',  text: 'Done. I\'ve moved your runs to 7:30 AM on Mon, Wed, Fri. Your nutrition plan stays the same — just make sure to eat within 30 minutes post-run.', timestamp: '9:04 AM' },
  { id: '7',  sender: 'sia',  text: 'By the way, you\'re 68% through your half marathon mission. At this pace, you\'ll finish 2 weeks early.', timestamp: '9:05 AM', type: 'goal-progress' },
  { id: '8',  sender: 'user', text: 'That\'s motivating. What should I focus on today?', timestamp: '9:06 AM' },
  { id: '9',  sender: 'sia',  text: 'Three things: complete your 8km training run (+75 XP), log meals to hit your protein target (+25 XP each), and do your evening meditation to keep that streak alive (+50 XP).', timestamp: '9:06 AM' },
  { id: '10', sender: 'user', text: 'Perfect, I\'ll start with the run', timestamp: '9:07 AM' },
]

export const workouts: Workout[] = [
  {
    id: '1', name: 'Half marathon training — Week 6', duration: '45 min', difficulty: 'intermediate',
    exercises: [
      { name: 'Warm-up jog', sets: 1, reps: '5 min', rest: '—' },
      { name: 'Tempo run', sets: 1, reps: '25 min', rest: '—' },
      { name: 'Cool-down walk', sets: 1, reps: '10 min', rest: '—' },
      { name: 'Stretching', sets: 1, reps: '5 min', rest: '—' },
    ],
  },
  {
    id: '2', name: 'Upper body strength', duration: '35 min', difficulty: 'intermediate',
    exercises: [
      { name: 'Push-ups', sets: 3, reps: '15', rest: '60s' },
      { name: 'Dumbbell rows', sets: 3, reps: '12', rest: '60s' },
      { name: 'Shoulder press', sets: 3, reps: '10', rest: '90s' },
      { name: 'Plank', sets: 3, reps: '45s', rest: '30s' },
    ],
  },
]

export const meals: Meal[] = [
  { id: '1', name: 'Oatmeal with berries',    mealType: 'breakfast', calories: 380, protein: 12, carbs: 62, fat: 8,  time: '7:30 AM' },
  { id: '2', name: 'Grilled chicken salad',   mealType: 'lunch',     calories: 520, protein: 42, carbs: 28, fat: 22, time: '12:45 PM' },
  { id: '3', name: 'Salmon with quinoa',      mealType: 'dinner',    calories: 640, protein: 38, carbs: 45, fat: 28, time: '7:00 PM' },
  { id: '4', name: 'Greek yogurt with nuts',  mealType: 'snack',     calories: 220, protein: 18, carbs: 14, fat: 10, time: '3:30 PM' },
]

export const fitnessDashboard: FitnessDashboardData = {
  siaNote: 'Your recovery is high today. Good day for intensity.',
  workout: {
    name: 'Upper body strength',
    type: 'Strength',
    duration: '45 min',
    exercises: ['Bench', 'OHP', 'Rows'],
    overflowCount: 2,
  },
  whoop: {
    sleep: 85,
    hrv: 68,
    recovery: 78,
  },
  activeMissions: [
    { name: 'Run a half marathon', progress: 0.68, domain: 'fitness' },
    { name: 'Build strength base', progress: 0.4, domain: 'fitness' },
  ],
  week: {
    days: [
      { label: 'M', state: 'complete' },
      { label: 'T', state: 'complete' },
      { label: 'W', state: 'planned' },
      { label: 'T', state: 'complete' },
      { label: 'F', state: 'today' },
      { label: 'S', state: 'planned' },
      { label: 'S', state: 'rest' },
    ],
    stats: [
      { value: '3', label: 'Workouts' },
      { value: '135', label: 'Min' },
      { value: '850', label: 'Cal' },
    ],
  },
}

export const workoutDetail: WorkoutDetailData = {
  name: 'Upper body strength',
  type: 'Strength',
  duration: '45 min',
  siaNote: 'Good pairing with yesterday cardio.',
  exercises: [
    { name: 'Bench press', sets: 4, reps: '8 reps', rest: '90s', note: 'Focus on controlled negatives', lastSet: '85 lbs x 8' },
    { name: 'Overhead press', sets: 3, reps: '10 reps', rest: '60s', lastSet: '45 lbs x 10' },
    { name: 'Barbell rows', sets: 4, reps: '8 reps', rest: '90s', lastSet: '85 lbs x 8' },
    { name: 'Lateral raises', sets: 3, reps: '15 reps', rest: '45s' },
    { name: 'Face pulls', sets: 3, reps: '15 reps', rest: '45s' },
  ],
  activeSession: {
    elapsed: '23:45',
    exerciseIndex: 3,
    totalExercises: 5,
    currentExercise: 'Barbell rows',
    setIndex: 2,
    totalSets: 4,
    weight: '85 lbs',
    reps: '8',
    lastSet: '85 lbs x 8',
    restRemaining: '1:23',
    nextExercise: 'Lateral raises',
    nextDetails: '3 x 15 reps',
    siaNote: 'Last set. Push through.',
  },
  summary: {
    duration: '42',
    exercises: '5',
    calories: '380',
    xpEarned: 75,
    xpProgress: 0.89,
  },
}

export const nutritionDashboard: NutritionDashboardData = {
  siaNote: 'You are 30g short on protein today. Chicken or lentils for dinner?',
  meals: [
    { id: 'breakfast-plan', name: 'Oatmeal with berries', mealType: 'breakfast', calories: 350, protein: 12, carbs: 55, fat: 8, time: '7:30 AM' },
    { id: 'lunch-plan', name: 'Chicken salad wrap', mealType: 'lunch', calories: 520, protein: 35, carbs: 40, fat: 15, time: '12:30 PM' },
    { id: 'dinner-plan', name: 'Grilled salmon and vegetables', mealType: 'dinner', calories: 480, protein: 42, carbs: 20, fat: 22, time: '7:00 PM' },
    { id: 'snacks-plan', name: 'Greek yogurt, almonds', mealType: 'snack', calories: 250, protein: 18, carbs: 15, fat: 11, time: '3:30 PM' },
  ],
  macros: [
    { label: 'Calories', current: 1600, target: 2200, unit: '', tone: 'primary' },
    { label: 'Protein', current: 77, target: 120, unit: 'g', tone: 'muted' },
    { label: 'Carbs', current: 130, target: 180, unit: 'g', tone: 'muted' },
    { label: 'Fat', current: 53, target: 70, unit: 'g', tone: 'muted' },
  ],
  water: {
    current: 5,
    target: 8,
  },
  activeMissions: [
    { name: 'Hit protein target 5 days', progress: 0.7, domain: 'nutrition' },
  ],
  recentFoodLog: [
    { name: 'Chicken salad wrap', calories: 520 },
    { name: 'Oatmeal with berries', calories: 350 },
  ],
}

export const mealDetail: MealDetailData = {
  meal: {
    id: 'lunch-detail',
    name: 'Chicken salad wrap',
    mealType: 'lunch',
    calories: 520,
    protein: 35,
    carbs: 40,
    fat: 15,
    time: '12:30 PM',
  },
  date: 'Tuesday, May 20',
  siaInsight: 'Good protein balance. This meal hits 29% of your daily target.',
  ingredients: [
    { name: 'Chicken breast (150g)', calories: 230, protein: 35, carbs: 0, fat: 8 },
    { name: 'Whole wheat wrap (1)', calories: 180, protein: 6, carbs: 30, fat: 4 },
    { name: 'Mixed greens (50g)', calories: 15, protein: 1, carbs: 2, fat: 0 },
    { name: 'Caesar dressing (1 tbsp)', calories: 95, protein: 0, carbs: 1, fat: 10 },
  ],
  recentFoods: [
    { name: 'Chicken salad wrap', calories: 520, protein: 35 },
    { name: 'Oatmeal with berries', calories: 350, protein: 12 },
    { name: 'Greek yogurt', calories: 150, protein: 18 },
  ],
  frequentFoods: [
    { name: 'Coffee with milk', calories: 45, protein: 3 },
    { name: 'Banana', calories: 105, protein: 1 },
  ],
  searchResults: [
    { name: 'Chicken breast (100g)', calories: 165, protein: 31, carbs: 0, fat: 4 },
    { name: 'Chicken thigh (100g)', calories: 209, protein: 26, carbs: 0, fat: 11 },
    { name: 'Chicken salad wrap', calories: 520, protein: 35, carbs: 40, fat: 15 },
    { name: 'Chicken tikka (serving)', calories: 280, protein: 25, carbs: 9, fat: 14 },
  ],
}

export const transactions: Transaction[] = [
  { id: '1', merchant: 'Whole Foods',     amount: 82.50,   category: 'Food',          date: 'Today',     isIncome: false },
  { id: '2', merchant: 'Salary deposit',  amount: 4200.00, category: 'Income',         date: 'May 15',    isIncome: true },
  { id: '3', merchant: 'Uber',            amount: 18.75,   category: 'Transport',      date: 'Yesterday', isIncome: false },
  { id: '4', merchant: 'Netflix',         amount: 15.99,   category: 'Entertainment',  date: 'May 18',    isIncome: false },
  { id: '5', merchant: 'WHOOP membership', amount: 30.00,  category: 'Healthcare',     date: 'May 12',    isIncome: false },
  { id: '6', merchant: 'Freelance project', amount: 800.00, category: 'Income',        date: 'May 10',    isIncome: true },
]

export const financeDashboard = {
  siaNote: 'Your dining spending is up 20% this week. It tends to rise after high-stress workdays.',
  kpis: [
    { label: 'Income', amount: '$4,200', delta: '+3.2%', positive: true },
    { label: 'Spent', amount: '$2,870', delta: '-8.1%', positive: false },
    { label: 'Saved', amount: '$1,330', delta: '+12%', positive: true },
  ],
  netSummary: 'Net: +$1,330 vs last month',
  budgets: [
    { id: 'dining', name: 'Dining', spent: 420, allocated: 500, progress: 0.84 },
    { id: 'housing', name: 'Housing', spent: 1200, allocated: 1200, progress: 1 },
    { id: 'transport', name: 'Transport', spent: 180, allocated: 300, progress: 0.6 },
    { id: 'groceries', name: 'Groceries', spent: 370, allocated: 450, progress: 0.82 },
  ],
  recentTransactions: [
    { id: 'uber-eats', merchant: 'Uber Eats', amount: 32.5, category: 'dining', date: 'Today, 12:34 PM', isIncome: false },
    { id: 'salary', merchant: 'Salary', amount: 4200, category: 'income', date: 'Yesterday', isIncome: true },
    { id: 'whole-foods', merchant: 'Whole Foods', amount: 87.2, category: 'groceries', date: 'May 18', isIncome: false },
    { id: 'whoop', merchant: 'WHOOP membership', amount: 30, category: 'health', date: 'May 12', isIncome: false },
  ],
  savingsTargets: [
    { name: 'Emergency fund', current: 3400, target: 10000, progress: 0.34 },
  ],
  trend: [
    { label: 'Mon', spend: 210 },
    { label: 'Tue', spend: 180 },
    { label: 'Wed', spend: 260 },
    { label: 'Thu', spend: 240 },
    { label: 'Fri', spend: 330 },
    { label: 'Sat', spend: 390 },
    { label: 'Sun', spend: 360 },
  ],
}

export const budgetDetail = {
  category: 'Dining',
  allocated: 500,
  spent: 420,
  remaining: 80,
  progress: 0.84,
  daysRemaining: 12,
  siaNote: 'You tend to overspend on dining during stressful work weeks.',
  transactions: [
    { id: 'dining-1', merchant: 'Uber Eats', amount: 32.5, category: 'dining', date: 'Today, 12:34 PM', isIncome: false },
    { id: 'dining-2', merchant: 'Nandos', amount: 45, category: 'dining', date: 'May 19', isIncome: false },
    { id: 'dining-3', merchant: 'Starbucks', amount: 6.8, category: 'dining', date: 'May 18', isIncome: false },
    { id: 'dining-4', merchant: 'Sweetgreen', amount: 18.4, category: 'dining', date: 'May 17', isIncome: false },
  ],
}

export const careerDashboard = {
  siaNote: 'Your productivity peaks after morning workouts. Schedule deep work for 10am?',
  missions: [
    { name: 'Get promoted to senior', progress: 0.38, completed: 3, total: 8, nextAction: 'Update portfolio' },
    { name: 'Learn Python basics', progress: 0.6, completed: 12, total: 20, nextAction: 'Complete chapter 5' },
  ],
  actions: [
    { name: 'Reach out to mentor', type: 'networking', xp: 15 },
    { name: 'Review quarterly priorities', type: 'planning', xp: 20 },
    { name: 'Read 1 chapter of Deep Work', type: 'skill-building', xp: 10 },
  ],
  skills: [
    { name: 'Lead', level: 7 },
    { name: 'Tech', level: 5 },
    { name: 'Comm', level: 8 },
    { name: 'Strategy', level: 6 },
  ],
  assessment: 'Communication is your strongest area.',
  deadlines: [
    { name: 'Performance review', date: 'Jun 15', countdown: '26 days away', urgency: 'neutral' },
    { name: 'Project deadline', date: 'May 28', countdown: '8 days away', urgency: 'neutral' },
  ],
}

export const relationshipsDashboard = {
  siaNote: 'You feel more energized after time with close friends. You have not seen anyone socially in 10 days.',
  reminders: [
    'It has been 2 weeks since you connected with Ahmed',
    "Mom's birthday is in 3 days",
  ],
  people: [
    { name: 'Sarah', initials: 'S', relationship: 'wife', lastInteraction: '2 days ago', fading: false },
    { name: 'Ahmed', initials: 'A', relationship: 'friend', lastInteraction: '14 days ago', fading: true },
    { name: 'Mom', initials: 'M', relationship: 'family', lastInteraction: '5 days ago', fading: false },
    { name: 'Ali', initials: 'AL', relationship: 'colleague', lastInteraction: '1 day ago', fading: false },
  ],
  qualityTime: [
    { activity: 'Coffee with Ahmed', date: 'May 6', duration: '45 min' },
    { activity: 'Dinner with Sarah', date: 'May 18', duration: '1.5 hrs' },
  ],
  suggestion: 'Call Ahmed this week. You always feel better after catching up.',
  dates: [
    { name: "Mom's birthday", date: 'May 23', countdown: '3 days away', urgency: 'soon' },
    { name: 'Anniversary with Sarah', date: 'Jun 12', countdown: '23 days away', urgency: 'neutral' },
  ],
}

export const spiritualityDashboard = {
  siaNote: 'Your consistency with prayer has improved your overall calm this week.',
  practices: [
    { name: 'Fajr', time: '5:12 AM', completed: false },
    { name: 'Dhuhr', time: '12:30 PM', completed: true },
    { name: 'Asr', time: '3:45 PM', completed: true },
    { name: 'Maghrib', time: '6:50 PM', completed: true },
    { name: 'Isha', time: '8:15 PM', completed: false },
  ],
  reading: {
    title: 'Quran',
    position: 'Surah Al-Baqarah',
    page: 'page 42 of 604',
    progress: 0.07,
    dailyTarget: '5 pages',
  },
  fasting: {
    title: 'Ramadan fast',
    started: '5:12 AM',
    ends: '6:50 PM',
    progress: 0.78,
    remaining: '3h 12m remaining',
  },
  reflection: 'What are you grateful for today? How has your faith shaped your perspective this week?',
  prayerSchedule: {
    location: 'Dubai, UAE',
    next: 'Dhuhr in 2h 15m',
    rows: [
      { name: 'Fajr', time: '5:12 AM' },
      { name: 'Dhuhr', time: '12:30 PM' },
      { name: 'Asr', time: '3:45 PM' },
    ],
  },
  timers: [
    { label: 'Meditate', duration: '10 min' },
    { label: 'Dhikr', duration: '5 min' },
  ],
  streak: 12,
}

export const learningDashboard: LearningDashboardData = {
  siaNote: "You've read 45 pages this week across 2 books. At this pace, you'll finish 'Thinking, Fast and Slow' by June 3.",
  currentItem: {
    title: 'Thinking, Fast and Slow',
    author: 'Daniel Kahneman',
    progress: 0.62,
    dailyTarget: '15 pages / day',
    streak: 4,
  },
  suggestions: [
    { id: 'chapter-7', name: 'Read chapter 7', completed: false, xp: xpRewards.reading },
    { id: 'review-notes', name: "Review yesterday's notes", completed: true, xp: xpRewards.reading },
    { id: 'module-3', name: 'Start module 3 of course', completed: false, xp: xpRewards.reading },
  ],
  activeMissions: [
    { id: 'books-month', name: 'Read 2 books this month', progress: 0.68 },
    { id: 'course-data', name: 'Finish data science course', progress: 0.42 },
    { id: 'notes', name: 'Write weekly notes', progress: 0.91 },
  ],
  streak: {
    current: 12,
    best: 34,
    days: [
      { label: 'M', state: 'complete' },
      { label: 'T', state: 'complete' },
      { label: 'W', state: 'complete' },
      { label: 'T', state: 'missed' },
      { label: 'F', state: 'complete' },
      { label: 'S', state: 'complete' },
      { label: 'S', state: 'today' },
    ],
  },
  library: [
    { id: 'tfas', title: 'Thinking, Fast and Slow', status: 'in progress', progress: 0.62 },
    { id: 'coursera-data', title: 'Data Science', status: 'Coursera', progress: 0.3 },
    { id: 'atomic-habits', title: 'Atomic Habits', status: 'completed', progress: 1, completed: true },
  ],
  activity: [
    { id: 'learn-today', date: 'today', description: '45 min reading', xp: xpRewards.reading },
    { id: 'learn-yesterday', date: 'yesterday', description: '30 min course module', xp: xpRewards.reading },
    { id: 'learn-may-18', date: 'May 18', description: '60 min reading', xp: xpRewards.reading },
  ],
  prompt: 'What was the most counterintuitive idea from your reading today?',
}

export const creativityDashboard: CreativityDashboardData = {
  siaNote: 'Three creative sessions this week. Your best work happens in the morning, especially after a short walk.',
  projects: [
    {
      id: 'film-script',
      name: 'Short film script',
      milestone: 'Recording demo tracks',
      progress: 0.45,
      due: 'Jun 8',
    },
    {
      id: 'photo-portfolio',
      name: 'Photography portfolio',
      milestone: 'Editing final selections',
      progress: 0.72,
      due: 'May 30',
    },
  ],
  prompt: "Try creating something using only materials within arm's reach right now.",
  practiceWeek: {
    cells: [
      { id: 'creative-m', intensity: 1, ariaLabel: 'Monday, 20 minutes creative session' },
      { id: 'creative-t', intensity: 3, ariaLabel: 'Tuesday, 45 minutes creative session' },
      { id: 'creative-w', intensity: 4, ariaLabel: 'Wednesday, 90 minutes creative session' },
      { id: 'creative-th', intensity: 1, ariaLabel: 'Thursday, 20 minutes creative session' },
      { id: 'creative-f', intensity: 3, ariaLabel: 'Friday, 55 minutes creative session' },
      { id: 'creative-sa', intensity: 0, ariaLabel: 'Saturday, no creative session' },
      { id: 'creative-su', intensity: 0, ariaLabel: 'Sunday, no creative session yet' },
    ],
    total: '4.5 hrs total',
    trend: 'up 20%',
  },
  activeMissions: [
    { id: 'film', name: 'Finish short film', progress: 0.55 },
    { id: 'photo', name: 'Build photo set', progress: 0.8 },
    { id: 'write', name: 'Write daily pages', progress: 0.3 },
  ],
  streak: {
    current: 8,
    best: 21,
    days: [
      { label: 'M', state: 'complete' },
      { label: 'T', state: 'complete' },
      { label: 'W', state: 'missed' },
      { label: 'T', state: 'complete' },
      { label: 'F', state: 'complete' },
      { label: 'S', state: 'complete' },
      { label: 'S', state: 'today' },
    ],
  },
  timeline: [
    { id: 'jan-draft', date: 'Jan', label: 'First draft' },
    { id: 'feb-demo', date: 'Feb', label: 'Demo recorded' },
    { id: 'apr-portfolio', date: 'Apr', label: 'Portfolio edit' },
    { id: 'may-short-film', date: 'May', label: 'Short film' },
  ],
  activity: [
    { id: 'creative-today', date: 'today', description: '90 min writing', xp: xpRewards.creativePractice },
    { id: 'creative-yesterday', date: 'yesterday', description: '45 min sketching', xp: xpRewards.creativePractice },
    { id: 'creative-may-18', date: 'May 18', description: '120 min recording', xp: xpRewards.creativePractice },
  ],
}

export const journalPrompt = 'What made today different from yesterday?'

export const journalEntries: JournalEntry[] = [
  {
    id: 'journal-1',
    date: 'May 20, 2026',
    mood: '😌',
    preview: 'Had a breakthrough with the project today. The quiet morning block made it easier to see what needed to change.',
    domains: ['creativity', 'career'],
  },
  {
    id: 'journal-2',
    date: 'May 19, 2026',
    mood: '😐',
    preview: 'Tough conversation with a friend about boundaries. I felt uncomfortable, but I was more direct than usual.',
    domains: ['relationships'],
    voice: true,
  },
  {
    id: 'journal-3',
    date: 'May 18, 2026',
    mood: '😊',
    preview: 'Great workout morning, feel energized and clear. I noticed work felt less scattered afterward.',
    domains: ['fitness', 'wellbeing'],
  },
  {
    id: 'journal-4',
    date: 'May 17, 2026',
    preview: 'Started the new book SIA recommended. The first chapter made me rethink how I plan deep work.',
    domains: ['learning'],
  },
]

export const habitSections: HabitSection[] = [
  {
    id: 'morning',
    title: 'Morning',
    habits: [
      { id: 'water-habit', name: 'Drink water', domain: 'wellbeing', streak: 21, completed: true, time: 'morning' },
      { id: 'meditation-habit', name: '10 min meditation', domain: 'meditation', streak: 14, completed: true, time: 'morning' },
      { id: 'journal-habit', name: 'Morning journal', domain: 'wellbeing', streak: 7, completed: false, time: 'morning' },
    ],
  },
  {
    id: 'afternoon',
    title: 'Afternoon',
    habits: [
      { id: 'reading-habit', name: '30 min reading', domain: 'productivity', streak: 12, completed: true, time: 'afternoon' },
      { id: 'finance-habit', name: 'Review finances', domain: 'finance', streak: 3, completed: false, time: 'afternoon' },
    ],
  },
  {
    id: 'evening',
    title: 'Evening',
    habits: [
      { id: 'meals-habit', name: 'Log meals', domain: 'nutrition', streak: 9, completed: true, time: 'evening' },
      { id: 'gratitude-habit', name: 'Gratitude list', domain: 'faith', streak: 5, completed: true, time: 'evening' },
      { id: 'screen-habit', name: 'Screen off by 10pm', domain: 'wellbeing', streak: 2, completed: false, time: 'evening' },
    ],
  },
]

export const habitSummary = {
  completed: 5,
  total: 8,
  progress: 0.62,
  xpToday: 5 * xpRewards.habit + xpRewards.routineComplete,
  remaining: 3,
}

export const habitHeatmap = {
  dayLabels: ['M', 'T', 'W', 'T', 'F', 'S', 'S'],
  monthLabel: 'May 2026',
  rows: [
    [
      { id: 'habit-1', intensity: 4, ariaLabel: 'Monday May 4, all habits completed' },
      { id: 'habit-2', intensity: 3, ariaLabel: 'Tuesday May 5, 6 of 8 habits completed' },
      { id: 'habit-3', intensity: 4, ariaLabel: 'Wednesday May 6, all habits completed' },
      { id: 'habit-4', intensity: 1, ariaLabel: 'Thursday May 7, 2 of 8 habits completed' },
      { id: 'habit-5', intensity: 3, ariaLabel: 'Friday May 8, 6 of 8 habits completed' },
      { id: 'habit-6', intensity: 3, ariaLabel: 'Saturday May 9, 5 of 8 habits completed' },
      { id: 'habit-7', intensity: 0, ariaLabel: 'Sunday May 10, no habits completed' },
    ],
    [
      { id: 'habit-8', intensity: 4, ariaLabel: 'Monday May 11, all habits completed' },
      { id: 'habit-9', intensity: 1, ariaLabel: 'Tuesday May 12, 2 of 8 habits completed' },
      { id: 'habit-10', intensity: 3, ariaLabel: 'Wednesday May 13, 6 of 8 habits completed' },
      { id: 'habit-11', intensity: 4, ariaLabel: 'Thursday May 14, all habits completed' },
      { id: 'habit-12', intensity: 4, ariaLabel: 'Friday May 15, all habits completed' },
      { id: 'habit-13', intensity: 1, ariaLabel: 'Saturday May 16, 2 of 8 habits completed' },
      { id: 'habit-14', intensity: 3, ariaLabel: 'Sunday May 17, 5 of 8 habits completed' },
    ],
    [
      { id: 'habit-15', intensity: 4, ariaLabel: 'Monday May 18, all habits completed' },
      { id: 'habit-16', intensity: 3, ariaLabel: 'Tuesday May 19, 6 of 8 habits completed' },
      { id: 'habit-17', intensity: 4, ariaLabel: 'Wednesday May 20, all habits completed' },
      { id: 'habit-18', intensity: 4, ariaLabel: 'Thursday May 21, all habits completed' },
      { id: 'habit-19', intensity: 1, ariaLabel: 'Friday May 22, 2 of 8 habits completed' },
      { id: 'habit-20', intensity: 3, ariaLabel: 'Saturday May 23, 6 of 8 habits completed' },
      { id: 'habit-21', intensity: 3, ariaLabel: 'Sunday May 24, 5 of 8 habits completed', isToday: true },
    ],
    [
      { id: 'habit-22', intensity: 'future', ariaLabel: 'Monday May 25, future day' },
      { id: 'habit-23', intensity: 'future', ariaLabel: 'Tuesday May 26, future day' },
      { id: 'habit-24', intensity: 'future', ariaLabel: 'Wednesday May 27, future day' },
      { id: 'habit-25', intensity: 'future', ariaLabel: 'Thursday May 28, future day' },
      { id: 'habit-26', intensity: 'future', ariaLabel: 'Friday May 29, future day' },
      { id: 'habit-27', intensity: 'future', ariaLabel: 'Saturday May 30, future day' },
      { id: 'habit-28', intensity: 'future', ariaLabel: 'Sunday May 31, future day' },
    ],
  ],
}

export const leaderboardOwnRank = {
  rank: 12,
  rankChange: 'up 3 this week',
  name: user.name,
  avatar: user.avatar,
  level: user.level,
  xp: 2340,
  streak: 21,
  topDomain: 'learning' as DomainKey,
}

export const leaderboard: LeaderboardEntry[] = [
  { rank: 1,  name: 'Sarah K.',  avatar: 'S', level: 23, xp: 4120, topDomain: 'fitness' },
  { rank: 2,  name: 'Ahmed R.',  avatar: 'A', level: 21, xp: 3890, topDomain: 'faith' },
  { rank: 3,  name: 'Lisa M.',   avatar: 'L', level: 20, xp: 3650, topDomain: 'career' },
  { rank: 4,  name: 'Omar B.',   avatar: 'O', level: 19, xp: 3410, topDomain: 'finance' },
  { rank: 5,  name: 'Priya S.',  avatar: 'P', level: 18, xp: 3200, topDomain: 'wellbeing' },
  { rank: 6,  name: 'Nina A.',   avatar: 'N', level: 17, xp: 3010, topDomain: 'meditation' },
  { rank: 7,  name: 'Marcus T.', avatar: 'M', level: 16, xp: 2890, topDomain: 'productivity' },
  { rank: 8,  name: 'Layla H.',  avatar: 'L', level: 16, xp: 2760, topDomain: 'relationships' },
  { rank: 9,  name: 'Chris R.',  avatar: 'C', level: 15, xp: 2590, topDomain: 'nutrition' },
  { rank: 10, name: 'Jordan P.', avatar: 'J', level: 15, xp: 2440, topDomain: 'creativity' },
]

export const notifications: Notification[] = [
  { id: '1', title: 'Streak milestone',            body: 'You\'ve hit a 42-day streak. Keep going.',   category: 'celebration', timestamp: '2 hours ago', read: false },
  { id: '2', title: 'SIA insight',                  body: 'Your sleep patterns suggest trying an earlier bedtime.', category: 'insight', timestamp: '5 hours ago', read: false },
  { id: '3', title: 'Mission progress',             body: 'You\'re 68% through your half marathon mission.', category: 'progress', timestamp: 'Yesterday', read: true },
  { id: '4', title: 'Daily check-in reminder',      body: 'Take a moment to reflect on your day.',    category: 'reminder', timestamp: 'Yesterday', read: true },
  { id: '5', title: 'New achievement unlocked',     body: 'Earned "Early riser" badge — 7 consecutive morning workouts.', category: 'celebration', timestamp: '2 days ago', read: true },
  { id: '6', title: 'Weekly report ready',          body: 'Your weekly progress report is available.',  category: 'report', timestamp: '3 days ago', read: true },
]

export const suggestedModules: ExploreModule[] = [
  {
    id: 'strength-basics',
    name: 'Strength basics',
    description: 'Support your running chain with simple lifts.',
    route: '/domains/fitness',
    icon: 'Dumbbell',
    domain: 'fitness',
    badge: 'suggested',
  },
  {
    id: 'sleep-reset',
    name: 'Sleep reset',
    description: 'Protect recovery before training days.',
    route: '/features/sleep',
    icon: 'Moon',
    domain: 'sleep',
    badge: 'new',
    lockedTier: 'Plus',
  },
  {
    id: 'finance-review',
    name: 'Weekly money review',
    description: 'Keep December savings on pace.',
    route: '/domains/finance',
    icon: 'Wallet',
    domain: 'finance',
    badge: 'suggested',
  },
]

export const exploreDomainSections: ExploreDomainSection[] = [
  {
    id: 'fitness',
    title: 'Fitness and movement',
    domain: 'fitness',
    modules: [
      { id: 'fitness-dashboard', name: 'Workouts dashboard', description: 'Plans and progress', route: '/domains/fitness', icon: 'Dumbbell', domain: 'fitness' },
      { id: 'active-workout', name: 'Active workout', description: 'Sets, reps, rest', route: '/domains/workout', icon: 'Timer', domain: 'fitness' },
      { id: 'progress-photos', name: 'Progress photos', description: 'Photos and measures', route: '/tabs/me/progress-photos', icon: 'Images', domain: 'fitness' },
    ],
  },
  {
    id: 'nutrition',
    title: 'Nutrition and diet',
    domain: 'nutrition',
    modules: [
      { id: 'nutrition-dashboard', name: 'Nutrition dashboard', description: 'Macros and meals', route: '/domains/nutrition', icon: 'Apple', domain: 'nutrition' },
      { id: 'food-logger', name: 'Food logger', description: 'Meals and calories', route: '/domains/meal', icon: 'Utensils', domain: 'nutrition' },
      { id: 'recipes', name: 'Recipes', description: 'Ideas that fit', route: '/features/recipes', icon: 'ChefHat', domain: 'nutrition', lockedTier: 'Plus' },
      { id: 'shopping-list', name: 'Shopping list', description: 'Grouped groceries', route: '/features/shopping-list', icon: 'ShoppingCart', domain: 'nutrition', lockedTier: 'Plus' },
    ],
  },
  {
    id: 'finance',
    title: 'Finance and money',
    domain: 'finance',
    modules: [
      { id: 'money-map', name: 'Money map', description: 'Budget and savings', route: '/domains/finance', icon: 'Wallet', domain: 'finance' },
      { id: 'budget-detail', name: 'Budget detail', description: 'Transactions', route: '/domains/budget', icon: 'ReceiptText', domain: 'finance' },
    ],
  },
  {
    id: 'career',
    title: 'Career and work',
    domain: 'career',
    modules: [
      { id: 'career-dashboard', name: 'Career dashboard', description: 'Work and growth', route: '/domains/career', icon: 'Briefcase', domain: 'career' },
    ],
  },
  {
    id: 'relationships',
    title: 'Relationships',
    domain: 'relationships',
    modules: [
      { id: 'relationships-dashboard', name: 'Relationships dashboard', description: 'People and care', route: '/domains/relationships', icon: 'Users', domain: 'relationships' },
    ],
  },
  {
    id: 'faith',
    title: 'Spirituality',
    domain: 'faith',
    modules: [
      { id: 'spirituality-dashboard', name: 'Spirituality dashboard', description: 'Practice and values', route: '/domains/spirituality', icon: 'Heart', domain: 'faith' },
    ],
  },
  {
    id: 'learning',
    title: 'Learning and growth',
    domain: 'learning',
    modules: [
      { id: 'learning-dashboard', name: 'Learning dashboard', description: 'Reading and study', route: '/domains/learning', icon: 'BookOpen', domain: 'learning' },
    ],
  },
  {
    id: 'creativity',
    title: 'Creativity',
    domain: 'creativity',
    modules: [
      { id: 'creativity-dashboard', name: 'Creativity dashboard', description: 'Projects and flow', route: '/domains/creativity', icon: 'Palette', domain: 'creativity' },
    ],
  },
  {
    id: 'wellbeing',
    title: 'Wellbeing',
    domain: 'wellbeing',
    modules: [
      { id: 'water-intake', name: 'Water intake', description: 'Hydration rhythm', route: '/tabs/today/water-intake', icon: 'Droplets', domain: 'wellbeing' },
      { id: 'stress-management', name: 'Stress management', description: 'Triggers and relief', route: '/features/stress', icon: 'Activity', domain: 'wellbeing', lockedTier: 'Plus' },
      { id: 'breathing', name: 'Breathing exercises', description: 'Reset in minutes', route: '/features/breathing', icon: 'Wind', domain: 'wellbeing' },
      { id: 'meditation', name: 'Meditation', description: 'Practice library', route: '/features/meditation', icon: 'Brain', domain: 'meditation', lockedTier: 'Plus' },
      { id: 'yoga', name: 'Yoga sessions', description: 'Mobility and calm', route: '/features/yoga', icon: 'Flower2', domain: 'fitness', lockedTier: 'Plus' },
      { id: 'sleep', name: 'Sleep tracking', description: 'Last night and trends', route: '/features/sleep', icon: 'Moon', domain: 'sleep', lockedTier: 'Plus' },
      { id: 'energy', name: 'Energy tracking', description: 'Daily energy signals', route: '/features/energy', icon: 'BatteryMedium', domain: 'wellbeing', lockedTier: 'Plus' },
      { id: 'medication', name: 'Medication tracking', description: 'Checklist and adherence', route: '/features/medication', icon: 'Pill', domain: 'wellbeing', lockedTier: 'Plus' },
    ],
  },
]

export const standaloneFeatures: ExploreModule[] = [
  { id: 'journal', name: 'Journal', description: 'Guided reflections', route: '/features/journal', icon: 'PenLine', domain: 'wellbeing' },
  { id: 'habits', name: 'Habits', description: 'Daily habit tracking', route: '/features/habits', icon: 'CircleCheck', domain: 'productivity' },
  { id: 'calendar', name: 'Calendar', description: 'Schedule and planning', route: '/tabs/today/schedule', icon: 'Calendar', domain: 'productivity' },
  { id: 'leaderboard', name: 'Leaderboard', description: 'Community rankings', route: '/features/leaderboard', icon: 'Trophy', domain: 'fitness' },
  { id: 'community', name: 'Community', description: 'Rooms and groups', route: '/features/community', icon: 'MessagesSquare', domain: 'relationships', lockedTier: 'Plus' },
  { id: 'daily-check-in', name: 'Daily check-in', description: 'Mood and intentions', route: '/tabs/today/daily-checkin', icon: 'SunMedium', domain: 'wellbeing' },
  { id: 'accountability', name: 'Accountability', description: 'Partners and contracts', route: '/features/accountability', icon: 'Handshake', domain: 'relationships', lockedTier: 'Plus' },
  { id: 'competitions', name: 'Competitions', description: 'Challenges and ranks', route: '/features/competitions', icon: 'Flag', domain: 'fitness', lockedTier: 'Plus' },
  { id: 'intelligence', name: 'Intelligence dashboard', description: 'AI patterns', route: '/features/intelligence', icon: 'Sparkles', domain: 'wellbeing', lockedTier: 'Pro' },
  { id: 'streaks', name: 'Streaks', description: 'Rewards and freezes', route: '/tabs/goals/streaks', icon: 'Flame', domain: 'productivity', lockedTier: 'Plus' },
  { id: 'reminders', name: 'Reminders', description: 'Tasks and nudges', route: '/features/reminders', icon: 'Bell', domain: 'productivity', lockedTier: 'Plus' },
  { id: 'quick-notes', name: 'Quick notes', description: 'Capture thoughts', route: '/features/quick-notes', icon: 'StickyNote', domain: 'wellbeing', lockedTier: 'Plus' },
]

export const wikiChapters: WikiChapter[] = [
  { id: 'about', label: 'About you', count: 23 },
  { id: 'preferences', label: 'Preferences', count: 16 },
  { id: 'patterns', label: 'Patterns', count: 7 },
  { id: 'correlations', label: 'Correlations', count: 5 },
  { id: 'mission-history', label: 'Mission history', count: 14 },
  { id: 'life-events', label: 'Life events', count: 6 },
]

export const wikiEntries: WikiEntry[] = [
  {
    id: 'wiki-1',
    chapter: 'patterns',
    title: 'Morning person',
    content: 'You tend to be most productive between 6-10 AM, especially when workouts happen before work.',
    source: 'conversation',
    date: 'May 3, 2026',
  },
  {
    id: 'wiki-2',
    chapter: 'patterns',
    title: 'Prefers strength over cardio',
    content: 'SIA detected that you complete strength sessions more consistently when they support a running mission.',
    source: 'data',
    date: 'Apr 28, 2026',
  },
  {
    id: 'wiki-3',
    chapter: 'correlations',
    title: 'Sleep affects spending',
    content: 'On nights below 6 hours of sleep, next-day impulse spending trends higher than your weekly baseline.',
    source: 'data',
    date: 'Apr 21, 2026',
    confidence: 'high',
  },
]

export const subscriptionTiers = [
  { name: 'Free', price: '$0', period: 'forever', features: ['Journaling', 'Finance module', 'Habit tracking', 'Basic dashboards', 'Limited AI (5 messages/day)'], recommended: false },
  { name: 'Plus', price: '$20', period: '/month', features: ['Full SIA coaching', 'All domains', 'Cross-domain insights', 'RPG gamification', 'Unlimited logging'], recommended: true },
  { name: 'Pro', price: '$60', period: '/month', features: ['Everything in Plus', 'Advanced analytics', 'Higher AI limits', 'Usage meter', 'Priority support'], recommended: false },
  { name: 'Max', price: '$100', period: '/month', features: ['Everything in Pro', 'Unlimited SIA', 'Priority processing', 'Family features', 'Early access'], recommended: false },
]

export const waterIntake = {
  consumedGlasses: 5,
  targetGlasses: 8,
  milliliters: 1250,
  xpReward: xpRewards.waterGoal,
  entries: [
    { id: 'water-1', time: '8:30 AM', amount: '1 glass', secondary: '(250 ml)', emphasized: false },
    { id: 'water-2', time: '10:15 AM', amount: '500 ml', secondary: '(2 glasses)', emphasized: true },
    { id: 'water-3', time: '12:45 PM', amount: '1 glass', secondary: '(250 ml)', emphasized: false },
    { id: 'water-4', time: '2:00 PM', amount: '250 ml', secondary: '(1 glass)', emphasized: false },
  ],
  week: [
    { day: 'M', glasses: 7, target: 8, met: false },
    { day: 'T', glasses: 8, target: 8, met: true },
    { day: 'W', glasses: 6, target: 8, met: false },
    { day: 'T', glasses: 9, target: 8, met: true },
    { day: 'F', glasses: 5, target: 8, met: false, today: true },
    { day: 'S', glasses: 0, target: 8, future: true },
    { day: 'S', glasses: 0, target: 8, future: true },
  ],
  stats: {
    streak: 12,
    average: '6.5',
    bestDay: 9,
  },
}

export const dailyCheckin = {
  greeting: 'Good morning, Amira.',
  subtext: 'How are you starting today?',
  streakNote: 'Day 14 of checking in',
  selectedMood: 'happy',
  energy: 7,
  stress: 5,
  intention: 'Deep work before meetings',
  xpReward: 10,
  moods: [
    { emoji: '😊', label: 'Happy' },
    { emoji: '😐', label: 'Meh' },
    { emoji: '😔', label: 'Sad' },
    { emoji: '😠', label: 'Angry' },
    { emoji: '😟', label: 'Anxious' },
    { emoji: '😴', label: 'Tired' },
  ],
  emotionTags: [
    { label: 'Grateful', selected: true },
    { label: 'Excited', selected: false },
    { label: 'Anxious', selected: false },
    { label: 'Calm', selected: true },
    { label: 'Hopeful', selected: true },
    { label: 'Restless', selected: false },
    { label: 'Focused', selected: true },
    { label: 'Overwhelmed', selected: false },
    { label: 'Content', selected: false },
  ],
}

export const accountability = {
  consentConfigured: false,
  partners: [
    { id: 'sarah', name: 'Sarah K.', initials: 'S', role: 'coach', permissions: ['motivation', 'failure', 'SOS'], emergency: false },
    { id: 'ahmed', name: 'Ahmed M.', initials: 'A', role: 'buddy', permissions: ['motivation', 'failure'], emergency: false },
    { id: 'lisa', name: 'Lisa R.', initials: 'L', role: 'mentor', permissions: ['motivation'], emergency: true },
  ],
  groups: [
    { id: 'morning', name: 'Morning crew', count: 3, members: ['Sarah', 'Ahmed', 'You'], expanded: true },
    { id: 'fitness', name: 'Fitness pod', count: 4, members: [], expanded: false },
  ],
  emergencyContacts: [
    { id: 'lisa-sos', name: 'Lisa R.', rule: 'SOS after 5 days inactive', message: 'Checks in when the streak drops.' },
  ],
  contracts: [
    { id: 'runs', title: 'Run 3x/week', condition: 'if fewer than 3 runs in 7 days', penalty: '$10 to charity', success: 8, violations: 2, ends: 'Jun 15' },
    { id: 'sugar', title: 'No sugar weekdays', condition: 'if sugar is logged Monday-Friday', penalty: '50 push-ups', success: 5, violations: 4, ends: 'Jul 1' },
  ],
  triggers: [
    { id: 'missed-workouts', name: 'Missed workouts', condition: 'if <3 workouts in 7 days', target: 'notify Sarah (coach)', aiFirst: true, cooldown: '24h cool' },
    { id: 'sleep-streak', name: 'Sleep streak broken', condition: 'if sleep <6h for 3 days', target: 'notify Morning crew', aiFirst: false, cooldown: '12h cool' },
    { id: 'budget', name: 'Budget overspend', condition: 'if spending >budget 2x', target: 'notify Ahmed (buddy)', aiFirst: true, cooldown: '48h cool' },
  ],
  logs: [
    { id: 'log-1', date: 'May 20', trigger: 'Missed workouts', outcome: 'SIA intervened first' },
    { id: 'log-2', date: 'May 18', trigger: 'Sleep streak', outcome: 'Morning crew notified' },
    { id: 'log-3', date: 'May 15', trigger: 'Budget overspend', outcome: 'Suppressed during cooldown' },
  ],
}

export const intelligenceDashboard = {
  score: 82,
  trend: '+3 from yesterday',
  updated: 'updated 2 hours ago',
  pillars: [
    { id: 'fitness', label: 'Fitness', value: 78, trend: 'up', points: [64, 70, 68, 72, 76, 74, 78] },
    { id: 'nutrition', label: 'Nutrition', value: 85, trend: 'flat', points: [78, 81, 80, 83, 84, 85, 85] },
    { id: 'wellbeing', label: 'Wellbeing', value: 80, trend: 'down', points: [76, 82, 84, 83, 81, 82, 80] },
  ],
  contradictions: [
    { id: 'sleep', text: 'You report sleeping 8 hours but WHOOP shows 5.5 hours of actual sleep.', source: 'Sleep log vs. WHOOP data' },
    { id: 'stress', text: 'Stress rating is low, but HRV trend is declining this week.', source: 'Check-in vs. recovery trend' },
  ],
  trendPoints: [
    { label: 'May 14', score: 68 },
    { label: 'May 15', score: 74 },
    { label: 'May 16', score: 77 },
    { label: 'May 17', score: 72 },
    { label: 'May 18', score: 79 },
    { label: 'May 19', score: 80 },
    { label: 'May 20', score: 82 },
  ],
  correlations: [
    { id: 'meditation-stress', text: 'On days you meditate, your stress score is 40% lower', strength: 85, label: 'Strong' },
    { id: 'workout-energy', text: 'Morning workouts correlate with 12% higher energy', strength: 72, label: 'Moderate' },
  ],
  bestDay: {
    matched: 3,
    total: 5,
    factors: [
      { id: 'sleep', label: '7+ hours sleep', status: 'done', matched: true },
      { id: 'workout', label: 'Morning workout', status: 'done', matched: true },
      { id: 'coffee', label: '< 2 coffees', status: '3/2', matched: false },
      { id: 'meditation', label: '10 min meditation', status: 'done', matched: true },
      { id: 'screens', label: 'No screens after 10pm', status: 'open', matched: false },
    ],
  },
  weeklyReport: {
    week: 'Week of May 12-18',
    summary: 'Your best domain was nutrition at 88. Fitness dropped due to 2 missed workouts.',
  },
  prediction: {
    score: 75,
    basis: 'Based on your Wednesday patterns',
    accuracy: '87% accurate',
  },
  insights: [
    { id: 'magnesium', text: 'Your sleep quality improved 15% since adding magnesium.', time: '2 days ago', feedback: 'up' },
    { id: 'monday-stress', text: 'Stress peaks on Mondays. A morning routine may help.', time: '4 days ago', feedback: 'none' },
  ],
}

export const progressPhotos = {
  siaNote: 'Your weight dropped 1.2kg this month. Sleep improvement may be driving it.',
  weightTrend: [
    { month: 'Jan', weight: 75.4 },
    { month: 'Feb', weight: 74.6 },
    { month: 'Mar', weight: 74.1 },
    { month: 'Apr', weight: 73.0 },
    { month: 'May', weight: 72.4 },
  ],
  currentStats: [
    { id: 'weight', value: '72.4', label: 'kg', trend: '-1.2', positive: true },
    { id: 'bmi', value: '23.1', label: 'BMI', trend: '—', positive: null },
    { id: 'body-fat', value: '18%', label: 'Body fat', trend: '-2%', positive: true },
  ],
  measurements: [
    { id: 'chest', label: 'Chest', value: '96 cm', trend: '-2', positive: true },
    { id: 'waist', label: 'Waist', value: '82 cm', trend: '-3', positive: true },
    { id: 'hips', label: 'Hips', value: '98 cm', trend: '0', positive: null },
    { id: 'arms', label: 'Arms', value: '34 cm', trend: '+1', positive: true },
    { id: 'thighs', label: 'Thighs', value: '56 cm', trend: '-1', positive: true },
  ],
  photos: [
    { id: 'may-21', date: 'May 21', view: 'front', selected: true },
    { id: 'apr-15', date: 'Apr 15', view: 'front', selected: false },
    { id: 'mar-01', date: 'Mar 01', view: 'front', selected: false },
  ],
  aiAnalysis: {
    title: 'AI analysis: 18% BF',
    body: 'Muscle gain detected',
  },
}

export const voiceCallHistory = {
  upcoming: {
    date: 'Thu, May 22 - 3:00 PM',
    type: 'Weekly check-in',
  },
  calls: [
    {
      label: 'Today',
      items: [
        {
          id: 'morning-check-in',
          time: '10:32 AM',
          duration: '18min',
          type: 'Morning check-in',
          emotion: ':)',
          summary: "Feeling energized after yesterday's workout and clearer about the next step.",
        },
        {
          id: 'quick-question',
          time: '8:15 AM',
          duration: '7min',
          type: 'Quick question',
          emotion: ':|',
          summary: 'Asked about meal timing for a high-focus work block and a lighter lunch.',
        },
      ],
    },
    {
      label: 'Yesterday',
      items: [
        {
          id: 'evening-reflection',
          time: '6:45 PM',
          duration: '24min',
          type: 'Evening reflection',
          emotion: ':)',
          summary: 'Great progress on fitness missions, with a budget review moved to Friday.',
        },
      ],
    },
    {
      label: 'This week',
      items: [
        {
          id: 'mission-review',
          time: 'Mon',
          duration: '12min',
          type: 'Mission review',
          emotion: ':|',
          summary: 'Reviewed career milestones and adjusted your sleep plan around deadlines.',
        },
      ],
    },
  ],
  actionItems: [
    { id: 'meditate', task: 'Meditate for 10min', source: 'Morning check-in', due: 'May 23', priority: 'high', completed: false },
    { id: 'budget', task: 'Review weekly budget', source: 'Evening reflection', due: 'May 24', priority: 'medium', completed: false },
    { id: 'walk', task: '30-min morning walk', source: 'Mission review', due: 'completed May 20', priority: 'low', completed: true },
  ],
}

export const stressManagement = {
  score: '4.2',
  severity: 'moderate',
  updated: 'last updated: 2 hrs ago',
  subScores: [
    { label: 'Biometric', score: '3.8', tone: 'green' },
    { label: 'Sentiment', score: '4.5', tone: 'teal' },
    { label: 'Behavioral', score: '4.1', tone: 'teal' },
  ],
  quickLog: {
    value: 6,
    triggers: [
      { label: 'Work', selected: true },
      { label: 'Relationships', selected: false },
      { label: 'Finances', selected: false },
      { label: 'Health', selected: true },
      { label: 'Family', selected: false },
      { label: 'Uncertainty', selected: false },
      { label: 'Time pressure', selected: true },
      { label: 'Conflict', selected: false },
      { label: 'Other', selected: false },
    ],
  },
  siaNote: 'Work stress has been your top trigger this week. A 5-min breathing exercise after lunch could help break the pattern.',
  triggers: [
    { label: 'Work', value: 35, tone: 'red' },
    { label: 'Health', value: 20, tone: 'teal' },
    { label: 'Family', value: 15, tone: 'amber' },
    { label: 'Time', value: 12, tone: 'orange' },
    { label: 'Other', value: 18, tone: 'muted' },
  ],
  trend: [
    { day: 'M', score: 5.2 },
    { day: 'T', score: 6.1 },
    { day: 'W', score: 4.4 },
    { day: 'T', score: 4.8 },
    { day: 'F', score: 4.2 },
    { day: 'S', score: 3.9 },
    { day: 'S', score: 4.1 },
  ],
  recovery: {
    score: 72,
    previous: 65,
    components: [
      { label: 'Emotion', value: 68 },
      { label: 'Sleep', value: 78 },
      { label: 'Activity', value: 71 },
      { label: 'Social', value: 74 },
    ],
  },
  reliefTools: [
    { label: 'Breathing', href: '/features/breathing', icon: 'wind', recommended: true },
    { label: 'Meditation', href: '/features/meditation', icon: 'brain', recommended: false },
    { label: 'Yoga', href: '/features/yoga', icon: 'flower', recommended: false },
  ],
  biometric: {
    title: 'WHOOP HRV stress',
    hrv: '68ms',
    trend: 'up from 55ms',
    status: 'Low physiological stress',
  },
}

export const breathingExercises = {
  stats: [
    { value: '42', label: 'Sessions' },
    { value: '210', label: 'Minutes' },
    { value: '8', label: 'Day streak' },
    { value: 'box br.', label: 'Most used' },
  ],
  filters: ['All', 'Before sleep', 'During stress', 'Morning energy', 'Focus', 'Anxiety relief'],
  exercises: [
    {
      id: 'box',
      name: 'Box breathing',
      pattern: 'inhale 4s - hold 4s - exhale 4s - hold 4s',
      description: 'Equal rhythm for calm and focus',
      tags: ['During stress', 'Focus'],
      durations: '1 / 3 / 5 / 10 min',
      recommended: true,
    },
    {
      id: 'relaxation',
      name: '4-7-8 relaxation',
      pattern: 'inhale 4s - hold 7s - exhale 8s',
      description: 'Deep relaxation before sleep',
      tags: ['Before sleep', 'Anxiety relief'],
      durations: '1 / 3 / 5 min',
      recommended: false,
    },
    {
      id: 'belly',
      name: 'Deep belly breathing',
      pattern: 'inhale 6s - exhale 6s',
      description: 'Slow, grounding diaphragmatic breath',
      tags: ['During stress', 'Morning energy'],
      durations: '3 / 5 / 10 min',
      recommended: false,
    },
    {
      id: 'wim-hof',
      name: 'Wim Hof method',
      pattern: '30 power breaths - hold - recovery breath',
      description: 'Energizing breathwork for resilience',
      tags: ['Morning energy', 'Focus'],
      durations: '5 / 10 min',
      recommended: false,
    },
    {
      id: 'coherence',
      name: 'Coherence breathing',
      pattern: 'inhale 5.5s - exhale 5.5s',
      description: 'Heart rate variability optimization',
      tags: ['Anxiety relief', 'Before sleep'],
      durations: '3 / 5 / 10 min',
      recommended: false,
    },
  ],
}

export const meditationLibrary = {
  filters: ['All', 'Meditation', 'Quick reset', 'Movement', 'Evening'],
  siaNote: "SIA thinks you'd benefit from a 5-min body scan right now. Your stress has been elevated since this morning.",
  practices: [
    {
      id: 'body-scan',
      name: 'Body scan meditation',
      category: 'Meditation',
      duration: '10 min',
      why: 'Reduces tension and improves body awareness',
      when: 'before sleep . after exercise',
      recommended: true,
    },
    {
      id: 'breathing',
      name: '4-7-8 breathing',
      category: 'Quick reset',
      duration: '3 min',
      why: 'Activates the calming nervous system response',
      when: 'during stress . before meeting',
      recommended: false,
    },
    {
      id: 'walking',
      name: 'Walking mindfulness',
      category: 'Movement',
      duration: '15 min',
      why: 'Combines gentle movement with present-moment focus',
      when: 'morning . lunch break',
      recommended: false,
    },
    {
      id: 'evening',
      name: 'Evening wind-down',
      category: 'Evening',
      duration: '12 min',
      why: 'Progressive relaxation to prepare for restful sleep',
      when: 'before bed . after screen time',
      recommended: false,
    },
  ],
  streakDays: [
    { day: 'M', done: true },
    { day: 'T', done: true },
    { day: 'W', done: true },
    { day: 'T', done: true },
    { day: 'F', done: true },
    { day: 'S', done: false },
    { day: 'S', done: false },
  ],
  stats: [
    { value: '47', label: 'Sessions' },
    { value: '312', label: 'Minutes' },
    { value: '14', label: 'Day streak' },
  ],
  favorite: 'meditation',
  favoriteShare: '52%',
}

export const yogaSessions = {
  streak: {
    current: '12-day streak',
    longest: 'your longest streak: 18',
  },
  siaNote: "Your body needs a stretch after yesterday's workout. Try a gentle flow.",
  filters: ['All', 'Beginner', 'Intermediate', 'Advanced'],
  sessions: [
    { id: 'morning-flow', name: 'Morning flow', duration: '30 min', difficulty: 'beginner', poses: 12, completed: false },
    { id: 'power-vinyasa', name: 'Power vinyasa', duration: '45 min', difficulty: 'advanced', poses: 18, completed: false },
    { id: 'evening-stretch', name: 'Evening stretch', duration: '15 min', difficulty: 'beginner', poses: 8, completed: true },
  ],
  poses: [
    { id: 'tree', name: 'Tree', difficulty: 'beginner' },
    { id: 'warrior', name: 'Warrior II', difficulty: 'beginner' },
    { id: 'cobra', name: 'Cobra', difficulty: 'beginner' },
    { id: 'bridge', name: 'Bridge', difficulty: 'intermediate' },
    { id: 'pigeon', name: 'Pigeon', difficulty: 'intermediate' },
    { id: 'lotus', name: 'Lotus', difficulty: 'advanced' },
  ],
  stats: [
    { value: '24', label: 'Sessions' },
    { value: '8.5', label: 'Hours' },
    { value: '42', label: 'Poses' },
    { value: '12', label: 'Streak' },
    { value: '18', label: 'Longest streak' },
  ],
}

export const recipesLibrary = {
  categoryFilters: ['Breakfast', 'Lunch', 'Dinner', 'Snack'],
  attributeFilters: ['Vegan', 'Keto', 'Gluten-free', 'High protein', 'Low carb', 'Easy'],
  siaNote: "You're short on protein this week. Try these high-protein recipes.",
  aiPicks: [
    { id: 'greek-bowl', name: 'Greek protein bowl', calories: 480, protein: 35, carbs: 40, fat: 18, time: '25 min', difficulty: 'easy', favorite: true, siaPick: true },
    { id: 'stir-fry', name: 'Chicken stir-fry', calories: 520, protein: 42, carbs: 38, fat: 20, time: '30 min', difficulty: 'medium', favorite: false, siaPick: true },
    { id: 'lentil-soup', name: 'Lentil soup', calories: 350, protein: 22, carbs: 44, fat: 9, time: '35 min', difficulty: 'easy', favorite: false, siaPick: true },
  ],
  favorites: [
    { id: 'oatmeal', name: 'Oatmeal berries', calories: 350, protein: 18, carbs: 52, fat: 9, time: '10 min', difficulty: 'easy', favorite: true },
    { id: 'salmon', name: 'Salmon veggies', calories: 480, protein: 38, carbs: 18, fat: 26, time: '28 min', difficulty: 'medium', favorite: true },
    { id: 'wrap', name: 'Chicken salad wrap', calories: 520, protein: 40, carbs: 46, fat: 17, time: '15 min', difficulty: 'easy', favorite: true },
  ],
  dietPlan: [
    { id: 'wrap-plan', name: 'Chicken salad wrap', calories: 480 },
    { id: 'yogurt-plan', name: 'Greek yogurt bowl', calories: 350 },
  ],
  all: [
    { id: 'turkey-chili', name: 'Turkey chili', calories: 430, protein: 36, carbs: 32, fat: 16, time: '45 min', difficulty: 'medium', favorite: false, dietPlan: true },
    { id: 'tofu-bowl', name: 'Tofu rice bowl', calories: 410, protein: 24, carbs: 48, fat: 14, time: '25 min', difficulty: 'easy', favorite: false },
    { id: 'egg-muffins', name: 'Egg white muffins', calories: 290, protein: 28, carbs: 12, fat: 12, time: '20 min', difficulty: 'easy', favorite: true },
    { id: 'shrimp-tacos', name: 'Shrimp tacos', calories: 470, protein: 31, carbs: 44, fat: 18, time: '30 min', difficulty: 'medium', favorite: false },
  ],
}

export const shoppingList = {
  summary: '12 items . 3 purchased',
  sections: [
    {
      id: 'produce',
      title: 'Produce',
      count: 4,
      expanded: true,
      items: [
        { id: 'spinach', name: 'Spinach', quantity: '200g', source: 'From diet plan', priority: false },
        { id: 'bananas', name: 'Bananas', quantity: '6', source: 'From recipe: Smoothie', priority: false },
        { id: 'avocados', name: 'Avocados', quantity: '3', source: 'Manual', priority: true },
        { id: 'berries', name: 'Mixed berries', quantity: '250g', source: 'From diet plan', priority: false },
      ],
    },
    {
      id: 'protein',
      title: 'Protein',
      count: 2,
      expanded: true,
      items: [
        { id: 'chicken', name: 'Chicken breast', quantity: '500g', source: 'From diet plan', priority: true },
        { id: 'salmon', name: 'Salmon fillets', quantity: '2', source: 'From diet plan', priority: false },
      ],
    },
    { id: 'dairy', title: 'Dairy', count: 3, expanded: false, items: [] },
    { id: 'grains', title: 'Grains', count: 2, expanded: false, items: [] },
  ],
  purchased: [
    { id: 'yogurt', name: 'Greek yogurt', quantity: '500g', source: 'From diet plan' },
    { id: 'oats', name: 'Oats', quantity: '1kg', source: 'From recipe: Overnight oats' },
    { id: 'almond-milk', name: 'Almond milk', quantity: '1L', source: 'Manual' },
  ],
}

export const sleepTracking = {
  siaNote: 'You sleep 45 min longer on weekends. A steadier bedtime would protect your recovery.',
  lastNight: {
    hours: '7.2',
    quality: 4,
    bedtime: '11:15 PM',
    wake: '6:28 AM',
    recovery: 78,
    syncedFrom: 'WHOOP',
    xp: xpRewards.sleepGoal,
  },
  durationTrend: [
    { day: 'M', hours: 6.8 },
    { day: 'T', hours: 7.1 },
    { day: 'W', hours: 7.6 },
    { day: 'T', hours: 6.5 },
    { day: 'F', hours: 7.2 },
    { day: 'S', hours: 8.1 },
    { day: 'S', hours: 7.4 },
  ],
  qualityTrend: [3, 4, 4, 5, 3, 4, 4],
  consistency: {
    bedtimeRange: '10:45 PM - 11:30 PM',
    wakeRange: '6:00 AM - 6:45 AM',
    bedtimeDots: [22, 44, 61, 37, 72, 56, 30],
    wakeDots: [34, 50, 28, 68, 45, 62, 39],
  },
  tips: [
    'Move screens off the last 20 minutes before bed.',
    'Keep weekend wake time within 45 minutes of weekdays.',
    'Pair the evening walk with your wind-down routine.',
  ],
}

export const streakDetails = {
  current: user.currentStreak,
  longest: user.longestStreak,
  multiplier: user.streakMultiplier,
  freezeCount: 2,
  calendar: [
    ['active', 'active', 'active', 'active', 'active', 'freeze', 'active'],
    ['active', 'active', 'active', 'active', 'active', 'active', 'active'],
    ['active', 'active', 'missed', 'active', 'active', 'active', 'active'],
    ['active', 'active', 'active', 'active', 'future', 'future', 'future'],
  ],
  milestones: [
    { days: 7, xp: 50, state: 'earned' },
    { days: 14, xp: 100, state: 'earned' },
    { days: 30, xp: 250, state: 'earned' },
    { days: 60, xp: 500, state: 'next' },
    { days: 90, xp: 1000, state: 'locked' },
    { days: 180, xp: 2500, state: 'locked' },
    { days: 365, xp: 5000, state: 'locked' },
  ],
  leaderboard: [
    { rank: 1, name: 'Sarah', days: 98, avatar: 'S' },
    { rank: 2, name: 'Ahmed', days: 84, avatar: 'A' },
    { rank: 3, name: 'Lisa', days: 72, avatar: 'L' },
    { rank: 12, name: 'You', days: user.currentStreak, avatar: user.avatar },
  ],
  history: [
    { length: 42, label: 'Active', dates: 'Apr 10 - present', note: 'Current streak' },
    { length: 67, label: 'Personal best', dates: 'Jan 2 - Mar 9, 2026', note: 'Ended: travel' },
    { length: 23, label: 'Past streak', dates: 'Nov 8 - Nov 30, 2025', note: 'Ended: illness' },
  ],
}

export const medicationTracking = {
  siaNote: "3 medications on schedule today. You're staying consistent.",
  summary: { taken: 3, total: 4, percent: 75 },
  groups: [
    {
      label: 'Morning',
      items: [
        { name: 'Metformin', dosage: '500mg', schedule: 'daily - 8:00 AM', taken: true },
        { name: 'Vitamin D', dosage: '1000 IU', schedule: 'daily - 8:00 AM', taken: true },
      ],
    },
    {
      label: 'Evening',
      items: [
        { name: 'Lisinopril', dosage: '10mg', schedule: 'daily - 8:00 PM', taken: false },
        { name: 'Magnesium', dosage: '400mg', schedule: 'daily - 9:00 PM', taken: true },
      ],
    },
  ],
  medications: [
    { name: 'Metformin', details: '500mg - daily', since: 'since Jan 15, 2026', reminder: '8:00 AM' },
    { name: 'Lisinopril', details: '10mg - daily', since: 'since Mar 3, 2026', reminder: '8:00 PM' },
    { name: 'Magnesium', details: '400mg - daily', since: 'since Apr 8, 2026', reminder: '9:00 PM' },
  ],
  adherenceRows: [
    [4, 4, 4, 2, 4, 3, 0],
    [4, 2, 4, 4, 4, 2, 4],
    [4, 4, 4, 4, 2, 4, 4],
    [4, 4, 2, 4, 4, 0, 0],
  ],
}

export const remindersTasks = {
  today: [
    { title: 'Take vitamin D', domain: 'wellbeing' as DomainKey, time: '8:00 AM', meta: 'Due in 30m', done: false, priority: 'high' },
    { title: 'Call Dr. Patel', domain: 'wellbeing' as DomainKey, time: '10:00 AM', meta: 'Scheduled', done: false },
    { title: 'Review meal plan', domain: 'nutrition' as DomainKey, time: '12:00 PM', meta: 'Recurring', done: false },
    { title: 'Morning supplements', domain: 'wellbeing' as DomainKey, time: '7:00 AM', meta: 'Done', done: true },
  ],
  tomorrow: [
    { title: 'Book lab appointment', domain: 'wellbeing' as DomainKey, time: '9:00 AM', meta: 'Scheduled', done: false },
    { title: 'Grocery run - meal prep', domain: 'nutrition' as DomainKey, time: 'No time set', meta: 'Prep', done: false },
  ],
  week: [
    { title: 'Dentist appointment', domain: 'wellbeing' as DomainKey, time: 'Thu 2:00 PM', meta: 'Calendar', done: false },
  ],
  reminders: [
    { title: 'Water intake', cadence: 'every 2h', next: 'next: 11:30 AM', on: true },
    { title: 'Evening stretch', cadence: 'daily 8:00 PM', next: 'push + email', on: true },
    { title: 'Medication', cadence: 'daily 9:00 PM', next: 'paused', on: false },
  ],
  completed: ['Morning supplements', 'Log weight', 'Meditate 10 min', 'Drink 2L water'],
  suggestion: 'Based on your fitness mission, try scheduling a stretching session before your Thursday dentist appointment.',
}

export const quickNotes = {
  filters: ['All', 'Health', 'Workout', 'Nutrition', 'Mood', 'Idea', 'Reminder'],
  notes: [
    { text: 'Felt dizzy after skipping breakfast today. Need to eat before morning workout.', tags: ['Nutrition', 'Workout'], time: '2 min ago' },
    { text: 'Left knee felt tight during squats, maybe from sitting all day.', tags: ['Health', 'Workout'], time: '45 min ago' },
    { text: 'Slept well after the evening walk. Try again tomorrow.', tags: ['Health', 'Mood'], time: '3h ago' },
    { text: 'Ask SIA to connect budget reviews with Sunday planning.', tags: ['Idea'], time: 'Yesterday' },
  ],
}

export const energyTracking = {
  siaNote: 'Your energy peaks at 9-11am. Schedule deep work there.',
  current: { value: 7, context: 'Afternoon', note: 'Feeling good' },
  tags: ['Morning', 'Afternoon', 'Evening', 'Post-workout', 'Post-meal'],
  timeline: [
    { label: '6am', value: 5 },
    { label: '9am', value: 8 },
    { label: '12pm', value: 6 },
    { label: '3pm', value: 7 },
    { label: 'Now', value: 7 },
  ],
  peakHours: [
    { label: 'Morning', time: '9:00-11:00', strength: 4 },
    { label: 'Afternoon', time: '3:00-4:00', strength: 3 },
  ],
  correlations: [
    { label: 'Sleep', impact: '+1.8', width: 90, positive: true },
    { label: 'Meals', impact: '+1.2', width: 72, positive: true },
    { label: 'Workout', impact: '+0.9', width: 62, positive: true },
    { label: 'Stress', impact: '-1.4', width: 78, positive: false },
  ],
  insight: 'Your post-workout energy is 30% higher than average. Morning workouts give the biggest boost.',
}

export const reportBlock = {
  entity: { username: 'username123', preview: 'Message preview from community chat', avatar: 'U' },
  reasons: ['Spam', 'Harassment', 'Inappropriate content', 'Misinformation', 'Impersonation', 'Other'],
  selectedReason: 'Other',
  description: 'Tell us more (optional)',
  blockUser: true,
}

export const forceUpdate = {
  currentVersion: 'v2.1.0',
  requiredVersion: 'v3.0.0',
  title: 'A new version is available',
  subtitle: "We've made Balencia better. Update to continue your journey.",
  whatsNew: ['Faster SIA coaching', 'New workout plans', 'Reliability fixes'],
}

export const notificationPermission = {
  title: 'Stay on track',
  subtitle: 'SIA uses notifications to help you build lasting habits.',
  benefits: [
    { tone: 'purple', title: 'SIA sends timely coaching nudges', detail: 'Gentle prompts when context matters.' },
    { tone: 'orange', title: 'Never miss a day accidentally', detail: 'Protect streaks before the day slips by.' },
    { tone: 'green', title: 'Know when partners check in', detail: 'Accountability updates arrive in time.' },
  ],
}

export const imageViewer = {
  index: 2,
  total: 7,
  date: 'May 21',
  caption: 'Progress photo',
  comparison: [
    { date: 'Mar 01', label: 'Before' },
    { date: 'May 21', label: 'After' },
  ],
}

export const universalSearch = {
  query: 'protein',
  recent: ['morning routine', 'budget review', 'protein shake recipe', 'sleep settings', 'meditation'],
  filters: ['All', 'Missions', 'Habits', 'Recipes', 'Notes', 'Journal', 'Settings'],
  siaSuggestion: 'Try the high-protein meal plan',
  sections: [
    {
      title: 'Recipes',
      count: 3,
      items: [
        { title: 'Protein pancakes', meta: '320 cal - 15 min', domain: 'nutrition' as DomainKey },
        { title: 'Protein smoothie', meta: '280 cal - 5 min', domain: 'nutrition' as DomainKey },
        { title: 'High-protein bowl', meta: '450 cal - 25 min', domain: 'nutrition' as DomainKey },
      ],
    },
    {
      title: 'Missions',
      count: 1,
      items: [
        { title: 'Hit protein target', meta: '58% complete', domain: 'nutrition' as DomainKey },
      ],
    },
    {
      title: 'Quick notes',
      count: 2,
      items: [
        { title: 'Need more protein in breakfast', meta: 'May 18', domain: 'nutrition' as DomainKey },
        { title: 'Protein shake made me too full', meta: 'May 15', domain: 'wellbeing' as DomainKey },
      ],
    },
    {
      title: 'Settings',
      count: 1,
      items: [
        { title: 'Protein target', meta: 'Currently: 120g/day', domain: 'nutrition' as DomainKey },
      ],
    },
  ],
}

export const appRating = {
  prompt: 'Enjoying Balencia?',
  subtitle: "We'd love to hear how you feel.",
  selectedStars: 4,
  positiveTitle: 'Thank you',
  positiveBody: 'A quick review helps others find Balencia too.',
}

export const exerciseLibrary = {
  muscleFilters: ['All', 'Upper body', 'Lower body', 'Core', 'Cardio', 'Full body'],
  equipmentFilters: ['Any equipment', 'No equipment', 'Dumbbells', 'Barbell', 'Kettlebell', 'Machine'],
  count: 532,
  exercises: [
    { name: 'Bench press', muscle: 'Chest', difficulty: 3, equipment: 'Barbell' },
    { name: 'Squat', muscle: 'Legs', difficulty: 2, equipment: 'Barbell' },
    { name: 'Deadlift', muscle: 'Back', difficulty: 3, equipment: 'Barbell' },
    { name: 'Lunge', muscle: 'Legs', difficulty: 2, equipment: 'Dumbbells' },
    { name: 'Plank', muscle: 'Core', difficulty: 1, equipment: 'No equipment' },
    { name: 'Row', muscle: 'Back', difficulty: 2, equipment: 'Dumbbells' },
  ],
}

export const achievementsGallery = {
  summary: { earned: 47, total: 120, percent: 39, streak: user.currentStreak },
  filters: ['All', 'Fitness', 'Nutrition', 'Finance', 'Career', 'Relationships', 'Learning', 'Wellbeing', 'General'],
  achievements: [
    { name: 'First workout', domain: 'fitness' as DomainKey, state: 'earned', progress: 'earned', date: 'May 15, 2026' },
    { name: '7-day streak', domain: 'wellbeing' as DomainKey, state: 'earned', progress: 'earned', date: 'May 12, 2026' },
    { name: '30-day streak', domain: 'wellbeing' as DomainKey, state: 'progress', progress: '18/30 days' },
    { name: 'Meal master', domain: 'nutrition' as DomainKey, state: 'progress', progress: '8/20 meals' },
    { name: 'Budget keeper', domain: 'finance' as DomainKey, state: 'locked', progress: 'locked' },
    { name: 'Deep work week', domain: 'career' as DomainKey, state: 'locked', progress: 'locked' },
  ],
}

export const knowledgeGraph = {
  selected: 'Sleep quality',
  nodes: [
    { id: 'sleep', label: 'Sleep quality', domain: 'sleep' as DomainKey, x: 52, y: 32, size: 48 },
    { id: 'workout', label: 'Workout performance', domain: 'fitness' as DomainKey, x: 28, y: 54, size: 38 },
    { id: 'stress', label: 'Stress level', domain: 'wellbeing' as DomainKey, x: 72, y: 58, size: 36 },
    { id: 'energy', label: 'Morning energy', domain: 'productivity' as DomainKey, x: 44, y: 74, size: 34 },
    { id: 'meditation', label: 'Meditation', domain: 'meditation' as DomainKey, x: 78, y: 26, size: 30 },
    { id: 'nutrition', label: 'Protein target', domain: 'nutrition' as DomainKey, x: 18, y: 28, size: 30 },
    { id: 'finance', label: 'Budget stress', domain: 'finance' as DomainKey, x: 86, y: 76, size: 26 },
  ],
  edges: [
    { from: 'sleep', to: 'workout', strength: 85 },
    { from: 'sleep', to: 'stress', strength: 72 },
    { from: 'sleep', to: 'energy', strength: 68 },
    { from: 'stress', to: 'meditation', strength: 61 },
    { from: 'workout', to: 'nutrition', strength: 54 },
    { from: 'stress', to: 'finance', strength: 44 },
  ],
  connections: [
    { name: 'Workout performance', domain: 'fitness' as DomainKey, strength: 85 },
    { name: 'Stress level', domain: 'wellbeing' as DomainKey, strength: 72 },
    { name: 'Morning energy', domain: 'productivity' as DomainKey, strength: 68 },
    { name: 'Meditation', domain: 'meditation' as DomainKey, strength: 61 },
  ],
  insight: 'Better sleep strongly correlates with higher workout performance in your data.',
}

export const missionJournal = {
  filters: ['All', 'By domain', 'By type'],
  months: [
    {
      label: 'May 2026',
      entries: [
        {
          status: 'completed',
          name: 'Run a half marathon',
          type: 'main' as MissionType,
          domain: 'fitness' as DomainKey,
          meta: 'May 18 - 14 weeks',
          xp: 450,
          summary: 'You trained through rain and doubt. Forty-seven runs, one finish line, and a stronger body of evidence.',
          photos: 3,
        },
        {
          status: 'archived',
          name: 'Learn to cook',
          type: 'side' as MissionType,
          domain: 'nutrition' as DomainKey,
          meta: 'Archived May 12',
          xp: 63,
          partial: true,
          summary: 'You explored 8 new recipes before life shifted your focus.',
          note: 'Got too busy with the new job.',
        },
      ],
    },
    {
      label: 'April 2026',
      entries: [
        {
          status: 'completed',
          name: 'Save $2,000',
          type: 'side' as MissionType,
          domain: 'finance' as DomainKey,
          meta: 'Apr 28 - 6 weeks',
          xp: 120,
          summary: 'Six weeks of discipline made your emergency fund real.',
        },
      ],
    },
  ],
}
