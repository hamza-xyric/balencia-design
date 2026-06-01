export type DomainKey =
  | 'fitness' | 'sleep' | 'career' | 'nutrition' | 'finance'
  | 'faith' | 'productivity' | 'relationships' | 'wellbeing'
  | 'meditation' | 'creativity' | 'learning'

export interface Domain {
  key: DomainKey
  label: string
  color: string
  icon: string
}

export const domains: Record<DomainKey, Domain> = {
  fitness:       { key: 'fitness',       label: 'Fitness',       color: '#EF4444', icon: 'Dumbbell' },
  sleep:         { key: 'sleep',         label: 'Sleep',         color: '#818CF8', icon: 'Moon' },
  career:        { key: 'career',        label: 'Career',        color: '#6366F1', icon: 'Briefcase' },
  nutrition:     { key: 'nutrition',     label: 'Nutrition',     color: '#84CC16', icon: 'Apple' },
  finance:       { key: 'finance',       label: 'Finance',       color: '#10B981', icon: 'Wallet' },
  faith:         { key: 'faith',         label: 'Faith',         color: '#A855F7', icon: 'Heart' },
  productivity:  { key: 'productivity',  label: 'Productivity',  color: '#F97316', icon: 'Zap' },
  relationships: { key: 'relationships', label: 'Relationships', color: '#EC4899', icon: 'Users' },
  wellbeing:     { key: 'wellbeing',     label: 'Wellbeing',     color: '#14B8A6', icon: 'Smile' },
  meditation:    { key: 'meditation',    label: 'Meditation',    color: '#A78BFA', icon: 'Brain' },
  creativity:    { key: 'creativity',    label: 'Creativity',    color: '#F59E0B', icon: 'Palette' },
  learning:      { key: 'learning',      label: 'Learning',      color: '#06B6D4', icon: 'BookOpen' },
}

export const domainList = Object.values(domains)

export const domainDashboardRoutes: Record<DomainKey, string> = {
  fitness: '/domains/fitness',
  sleep: '/features/sleep',
  career: '/domains/career',
  nutrition: '/domains/nutrition',
  finance: '/domains/finance',
  faith: '/domains/spirituality',
  productivity: '/features/reminders',
  relationships: '/domains/relationships',
  wellbeing: '/features/stress',
  meditation: '/features/meditation',
  creativity: '/domains/creativity',
  learning: '/domains/learning',
}
