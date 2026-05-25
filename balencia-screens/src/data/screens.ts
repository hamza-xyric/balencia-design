export interface ScreenInfo {
  id: string
  number: string
  name: string
  route: string
  section: string
  status: 'complete' | 'in-progress' | 'not-started'
}

export const sections = [
  'Auth & Onboarding',
  'Today Tab',
  'SIA Tab',
  'Goals Tab',
  'Me Tab',
  'Domain Dashboards',
  'Feature Screens',
] as const

export const screens: ScreenInfo[] = [
  // Auth & Onboarding
  { id: '01',  number: '01',  name: 'Splash screen',          route: '/auth/splash',             section: 'Auth & Onboarding', status: 'complete' },
  { id: '02',  number: '02',  name: 'Motion carousel',        route: '/auth/carousel',           section: 'Auth & Onboarding', status: 'complete' },
  { id: '03',  number: '03',  name: 'Sign up',                route: '/auth/sign-up',            section: 'Auth & Onboarding', status: 'complete' },
  { id: '03b', number: '03b', name: 'OTP verification',       route: '/auth/otp',                section: 'Auth & Onboarding', status: 'complete' },
  { id: '03c', number: '03c', name: 'Consent',                route: '/auth/consent',            section: 'Auth & Onboarding', status: 'complete' },
  { id: '03d', number: '03d', name: 'Complete profile',       route: '/auth/complete-profile',   section: 'Auth & Onboarding', status: 'complete' },
  { id: '03e', number: '03e', name: 'WhatsApp enrollment',    route: '/auth/whatsapp',           section: 'Auth & Onboarding', status: 'complete' },
  { id: '04',  number: '04',  name: 'Sign in',                route: '/auth/sign-in',            section: 'Auth & Onboarding', status: 'complete' },
  { id: '05',  number: '05',  name: 'Forgot password',        route: '/auth/forgot-password',    section: 'Auth & Onboarding', status: 'complete' },
  { id: '05b', number: '05b', name: 'Reset password',         route: '/auth/reset-password',     section: 'Auth & Onboarding', status: 'complete' },
  { id: '06',  number: '06',  name: 'Guest preview',          route: '/auth/guest-preview',      section: 'Auth & Onboarding', status: 'complete' },
  { id: '07',  number: '07',  name: 'SIA onboarding',         route: '/auth/sia-onboarding',     section: 'Auth & Onboarding', status: 'complete' },
  { id: '08',  number: '08',  name: 'Initial plan',           route: '/auth/initial-plan',       section: 'Auth & Onboarding', status: 'complete' },

  // Today Tab
  { id: '12',  number: '12',  name: 'Home screen',            route: '/tabs/today',              section: 'Today Tab', status: 'complete' },
  { id: '41',  number: '41',  name: 'Schedule / calendar',    route: '/tabs/today/schedule',     section: 'Today Tab', status: 'complete' },
  { id: '44',  number: '44',  name: 'Water intake',           route: '/tabs/today/water-intake', section: 'Today Tab', status: 'complete' },
  { id: '45',  number: '45',  name: 'Daily check-in',         route: '/tabs/today/daily-checkin', section: 'Today Tab', status: 'complete' },

  // SIA Tab
  { id: '09',  number: '09',  name: 'SIA chat',               route: '/tabs/sia',                section: 'SIA Tab', status: 'complete' },
  { id: '10',  number: '10',  name: 'Voice mode (in-chat)',   route: '/tabs/sia/voice-inline',   section: 'SIA Tab', status: 'complete' },
  { id: '11',  number: '11',  name: 'Voice mode (full)',      route: '/tabs/sia/voice-fullscreen', section: 'SIA Tab', status: 'complete' },
  { id: '51',  number: '51',  name: 'Voice call history',     route: '/tabs/sia/voice-history',  section: 'SIA Tab', status: 'complete' },
  { id: '74',  number: '74',  name: 'Conversations hub',      route: '/tabs/sia/conversations', section: 'SIA Tab', status: 'complete' },
  { id: '75',  number: '75',  name: 'Direct chat',            route: '/tabs/sia/direct',        section: 'SIA Tab', status: 'complete' },
  { id: '76',  number: '76',  name: 'Group chat',             route: '/tabs/sia/group',         section: 'SIA Tab', status: 'complete' },
  { id: '77',  number: '77',  name: 'Message actions',        route: '/tabs/sia/message-actions', section: 'SIA Tab', status: 'complete' },
  { id: '79',  number: '79',  name: 'Call summary',           route: '/tabs/sia/call-summary', section: 'SIA Tab', status: 'complete' },

  // Goals Tab
  { id: '13',  number: '13',  name: 'Mission board',          route: '/tabs/goals',              section: 'Goals Tab', status: 'complete' },
  { id: '14',  number: '14',  name: 'Mission detail',         route: '/tabs/goals/detail',       section: 'Goals Tab', status: 'complete' },
  { id: '15',  number: '15',  name: 'Create mission',         route: '/tabs/goals/create',       section: 'Goals Tab', status: 'complete' },
  { id: '59',  number: '59',  name: 'Streak details',         route: '/tabs/goals/streaks',      section: 'Goals Tab', status: 'complete' },
  { id: '73',  number: '73',  name: 'Mission journal',        route: '/tabs/goals/journal',      section: 'Goals Tab', status: 'complete' },
  { id: '85',  number: '85',  name: 'Obstacle coach',         route: '/tabs/goals/obstacles',   section: 'Goals Tab', status: 'complete' },

  // Me Tab
  { id: '16',  number: '16',  name: 'Life areas overview',    route: '/tabs/me/life-areas',      section: 'Me Tab', status: 'complete' },
  { id: '17',  number: '17',  name: 'Me main',                route: '/tabs/me',                 section: 'Me Tab', status: 'complete' },
  { id: '18',  number: '18',  name: 'Explore section',        route: '/tabs/me/explore',         section: 'Me Tab', status: 'complete' },
  { id: '19',  number: '19',  name: 'RPG character',          route: '/tabs/me/rpg',             section: 'Me Tab', status: 'complete' },
  { id: '20',  number: '20',  name: 'Personal wiki',          route: '/tabs/me/personal-wiki',   section: 'Me Tab', status: 'complete' },
  { id: '21',  number: '21',  name: 'Settings',               route: '/tabs/me/settings',        section: 'Me Tab', status: 'complete' },
  { id: '22',  number: '22',  name: 'Connected services',     route: '/tabs/me/connected-services', section: 'Me Tab', status: 'complete' },
  { id: '23',  number: '23',  name: 'Subscription & billing', route: '/tabs/me/subscription',    section: 'Me Tab', status: 'complete' },
  { id: '24',  number: '24',  name: 'Notification history',   route: '/tabs/me/notifications',   section: 'Me Tab', status: 'complete' },
  { id: '25',  number: '25',  name: 'Help center',            route: '/tabs/me/help',            section: 'Me Tab', status: 'complete' },
  { id: '49',  number: '49',  name: 'Progress photos',        route: '/tabs/me/progress-photos', section: 'Me Tab', status: 'complete' },
  { id: '50',  number: '50',  name: 'Profile edit',           route: '/tabs/me/profile-edit',    section: 'Me Tab', status: 'complete' },
  { id: '71',  number: '71',  name: 'Achievement gallery',    route: '/tabs/me/achievements',    section: 'Me Tab', status: 'complete' },
  { id: '72',  number: '72',  name: 'Knowledge graph',        route: '/tabs/me/knowledge-graph', section: 'Me Tab', status: 'complete' },
  { id: '84',  number: '84',  name: 'Data sources',           route: '/tabs/me/data-sources',   section: 'Me Tab', status: 'complete' },

  // Domain Dashboards
  { id: '26',  number: '26',  name: 'Fitness dashboard',      route: '/domains/fitness',         section: 'Domain Dashboards', status: 'complete' },
  { id: '27',  number: '27',  name: 'Workout detail',         route: '/domains/workout',         section: 'Domain Dashboards', status: 'complete' },
  { id: '28',  number: '28',  name: 'Nutrition dashboard',    route: '/domains/nutrition',       section: 'Domain Dashboards', status: 'complete' },
  { id: '29',  number: '29',  name: 'Meal detail',            route: '/domains/meal',            section: 'Domain Dashboards', status: 'complete' },
  { id: '30',  number: '30',  name: 'Finance dashboard',      route: '/domains/finance',         section: 'Domain Dashboards', status: 'complete' },
  { id: '31',  number: '31',  name: 'Budget detail',          route: '/domains/budget',          section: 'Domain Dashboards', status: 'complete' },
  { id: '32',  number: '32',  name: 'Career dashboard',       route: '/domains/career',          section: 'Domain Dashboards', status: 'complete' },
  { id: '33',  number: '33',  name: 'Relationships dashboard', route: '/domains/relationships',  section: 'Domain Dashboards', status: 'complete' },
  { id: '34',  number: '34',  name: 'Spirituality dashboard', route: '/domains/spirituality',    section: 'Domain Dashboards', status: 'complete' },
  { id: '35',  number: '35',  name: 'Learning dashboard',     route: '/domains/learning',        section: 'Domain Dashboards', status: 'complete' },
  { id: '36',  number: '36',  name: 'Creativity dashboard',   route: '/domains/creativity',      section: 'Domain Dashboards', status: 'complete' },
  { id: '70',  number: '70',  name: 'Exercise library',       route: '/domains/exercise-library', section: 'Domain Dashboards', status: 'complete' },

  // Feature Screens
  { id: '37',  number: '37',  name: 'Journal',                route: '/features/journal',        section: 'Feature Screens', status: 'complete' },
  { id: '38',  number: '38',  name: 'Habits',                 route: '/features/habits',         section: 'Feature Screens', status: 'complete' },
  { id: '39',  number: '39',  name: 'Leaderboard',            route: '/features/leaderboard',    section: 'Feature Screens', status: 'complete' },
  { id: '40',  number: '40',  name: 'Community',              route: '/features/community',      section: 'Feature Screens', status: 'complete' },
  { id: '42',  number: '42',  name: 'Celebration overlay',    route: '/features/celebration',    section: 'Feature Screens', status: 'complete' },
  { id: '43',  number: '43',  name: 'Paywall',                route: '/features/paywall',        section: 'Feature Screens', status: 'complete' },
  { id: '46',  number: '46',  name: 'Accountability',         route: '/features/accountability', section: 'Feature Screens', status: 'complete' },
  { id: '47',  number: '47',  name: 'Competitions',           route: '/features/competitions',   section: 'Feature Screens', status: 'complete' },
  { id: '48',  number: '48',  name: 'Intelligence dashboard', route: '/features/intelligence',   section: 'Feature Screens', status: 'complete' },
  { id: '52',  number: '52',  name: 'Stress management',      route: '/features/stress',         section: 'Feature Screens', status: 'complete' },
  { id: '53',  number: '53',  name: 'Breathing exercises',    route: '/features/breathing',      section: 'Feature Screens', status: 'complete' },
  { id: '54',  number: '54',  name: 'Meditation',             route: '/features/meditation',     section: 'Feature Screens', status: 'complete' },
  { id: '55',  number: '55',  name: 'Yoga sessions',          route: '/features/yoga',           section: 'Feature Screens', status: 'complete' },
  { id: '56',  number: '56',  name: 'Recipes',                route: '/features/recipes',        section: 'Feature Screens', status: 'complete' },
  { id: '57',  number: '57',  name: 'Shopping list',          route: '/features/shopping-list',  section: 'Feature Screens', status: 'complete' },
  { id: '58',  number: '58',  name: 'Sleep tracking',         route: '/features/sleep',          section: 'Feature Screens', status: 'complete' },
  { id: '60',  number: '60',  name: 'Medication tracking',    route: '/features/medication',     section: 'Feature Screens', status: 'complete' },
  { id: '61',  number: '61',  name: 'Reminders & tasks',      route: '/features/reminders',      section: 'Feature Screens', status: 'complete' },
  { id: '62',  number: '62',  name: 'Quick notes',            route: '/features/quick-notes',    section: 'Feature Screens', status: 'complete' },
  { id: '63',  number: '63',  name: 'Energy tracking',        route: '/features/energy',         section: 'Feature Screens', status: 'complete' },
  { id: '64',  number: '64',  name: 'Report / block',         route: '/features/report-block',   section: 'Feature Screens', status: 'complete' },
  { id: '65',  number: '65',  name: 'Force update',           route: '/features/force-update',   section: 'Feature Screens', status: 'complete' },
  { id: '66',  number: '66',  name: 'Notification permission', route: '/features/notification-permission', section: 'Feature Screens', status: 'complete' },
  { id: '67',  number: '67',  name: 'Image viewer',           route: '/features/image-viewer',   section: 'Feature Screens', status: 'complete' },
  { id: '68',  number: '68',  name: 'Universal search',       route: '/features/universal-search', section: 'Feature Screens', status: 'complete' },
  { id: '69',  number: '69',  name: 'App rating',             route: '/features/app-rating',     section: 'Feature Screens', status: 'complete' },
  { id: '78',  number: '78',  name: 'Reports center',         route: '/features/reports',        section: 'Feature Screens', status: 'complete' },
  { id: '80',  number: '80',  name: 'Music coach',            route: '/features/music',          section: 'Feature Screens', status: 'complete' },
  { id: '81',  number: '81',  name: 'Video library',          route: '/features/videos',         section: 'Feature Screens', status: 'complete' },
  { id: '82',  number: '82',  name: 'Accountability contract', route: '/features/accountability-contract', section: 'Feature Screens', status: 'complete' },
  { id: '83',  number: '83',  name: 'Social buddy profile',   route: '/features/social-buddy',   section: 'Feature Screens', status: 'complete' },
]

export function getScreensBySection() {
  const grouped: Record<string, ScreenInfo[]> = {}
  for (const screen of screens) {
    if (!grouped[screen.section]) grouped[screen.section] = []
    grouped[screen.section].push(screen)
  }
  return grouped
}

export function getScreenByRoute(route: string) {
  return screens.find(s => s.route === route)
}
