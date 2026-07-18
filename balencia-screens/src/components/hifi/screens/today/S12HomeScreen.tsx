'use client'

import { useState } from 'react'
import { Check } from 'lucide-react'
import {
  CIAInsightCard,
  Chip,
  FloatingQuickLog,
  GlassCard,
  HifiShell,
  LifePowerRadar,
  MissionIcon,
  MomentumBar,
  ProgressBar,
  Provenance,
  SectionTitle,
  SolidCard,
  TopBar,
  calculateLifePower,
  cx,
  type LifeDomainDatum,
} from '@/components/hifi/kit'

const lifeDomains = [
  { name: 'Fitness', shortLabel: 'Fit', value: 57, source: 'WHOOP' },
  { name: 'Sleep', shortLabel: 'Sleep', value: 51, source: 'Health' },
  { name: 'Career', shortLabel: 'Career', value: 49, source: 'Calendar' },
  { name: 'Nutrition', shortLabel: 'Nutr.', value: 44, source: 'You logged' },
  { name: 'Finance', shortLabel: 'Finance', value: 37, source: 'You logged' },
  { name: 'Faith', shortLabel: 'Faith', value: 36, source: 'You logged' },
  { name: 'Productivity', shortLabel: 'Focus', value: 43, source: 'Calendar' },
  { name: 'Relationships', shortLabel: 'People', value: 39, source: 'You logged' },
  { name: 'Wellbeing', shortLabel: 'Well.', value: 41, source: 'Mood check-ins' },
  { name: 'Meditation', shortLabel: 'Medit.', value: 35, source: 'Session log' },
] satisfies LifeDomainDatum[]

const moods = ['Steady', 'Low', 'Wired']

const quickActions = [
  { label: 'Breathe', href: '/screens/53' },
  { label: 'Water', href: '/screens/44' },
  { label: 'Journal', href: '/screens/37' },
  { label: 'Check-in', href: '/screens/89' },
]

const todayActions = [
  { title: 'Meditate 10 min', domain: 'Meditation', completed: true },
  { title: 'Morning run', domain: 'Fitness', completed: false },
  { title: 'Review budget', domain: 'Finance', completed: false },
]

const pinnedMissions = [
  { title: 'Run a half marathon', progress: 68 },
  { title: 'Save $5,000 by December', progress: 42 },
]

const lifePower = calculateLifePower(lifeDomains.map(domain => domain.value))
const strongestDomain = lifeDomains.reduce((strongest, domain) => domain.value > strongest.value ? domain : strongest)
const lowestDomain = lifeDomains.reduce((lowest, domain) => domain.value < lowest.value ? domain : lowest)

export function S12HomeScreen() {
  const [selectedMood, setSelectedMood] = useState('Steady')
  const [actionStates, setActionStates] = useState(todayActions)
  const completedActionCount = actionStates.filter(action => action.completed).length
  const momentum = Math.round((completedActionCount / actionStates.length) * 100)

  return (
    <HifiShell
      header={<TopBar title="Good morning, Amira" eyebrow="Tuesday, Jul 7" back={false} right={<Chip>Lv 12 · profile</Chip>} />}
      activeTab="today"
      bottomAction={<FloatingQuickLog href="/screens/12?action=quick-log" />}
    >
      <main className="space-y-4 px-4 pb-4 pt-3">
        <CIAInsightCard
          eyebrow="CIA check-in"
          actions={moods.map(mood => (
            <Chip key={mood} interactive pressed={selectedMood === mood} onClick={() => setSelectedMood(mood)}>{mood}</Chip>
          ))}
        >
          What is <span className="text-emphasis">worth</span> your attention today?
        </CIAInsightCard>

        <GlassCard tone="you" className="overflow-hidden rounded-[40px] py-4">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-paper-100/70">Life Power</p>
              <p className="mt-1 text-[12px] leading-4 text-paper-100/60">Your current balance across 10 life domains</p>
            </div>
            <Chip>{lifeDomains.length} active domains</Chip>
          </div>

          <LifePowerRadar domains={lifeDomains} />

          <div className="rounded-lg border border-white/10 bg-white/[0.03] px-3 py-3">
            <p className="text-[13px] leading-[18px] text-paper-100/80">
              {strongestDomain.name} leads at {strongestDomain.value}; {lowestDomain.name} has the most room at {lowestDomain.value}.
            </p>
            <p className="mt-1 text-[11px] leading-4 text-paper-100/60">
              Balance bonus {lifePower.balanceMultiplier.toFixed(2)}× · based on all 10 domains
            </p>
          </div>

          <div className="mt-4">
            <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-paper-100/65">Domain metric sources</p>
            <div className="-mx-1 mt-2 flex gap-2 overflow-x-auto px-1 pb-1">
              {lifeDomains.map(domain => (
                <Chip key={domain.name} className="shrink-0">
                  {domain.shortLabel} {domain.value} · {domain.source}
                </Chip>
              ))}
            </div>
          </div>
        </GlassCard>

        <Provenance items={[
          'Heart 72 bpm · WHOOP · synced 2h ago',
          'Steps 8.2k · you logged · today',
          'Sleep 7.5h · Health · synced 2h ago',
        ]} />

        <div className="grid grid-cols-4 gap-2" role="group" aria-label="Quick actions">
          {quickActions.map(item => (
            <a
              key={item.label}
              href={item.href}
              className="focus-ring flex min-h-[54px] items-center justify-center rounded-lg border border-white/10 bg-white/[0.04] px-2 text-[12px] font-semibold text-paper-100/75"
              aria-label={`Quick action: ${item.label}`}
            >
              {item.label}
            </a>
          ))}
        </div>

        <SolidCard>
          <SectionTitle title="Today momentum" meta={`${completedActionCount} of ${todayActions.length} · Missions ledger`} />
          <div className="mt-3">
            <MomentumBar value={momentum} label={`${completedActionCount} of ${todayActions.length} actions complete, ${momentum} percent`} />
          </div>
          <div className="mt-4 space-y-2">
            {actionStates.map(action => (
              <button
                key={action.title}
                type="button"
                aria-pressed={action.completed}
                onClick={() => setActionStates(current => current.map(item => item.title === action.title ? { ...item, completed: !item.completed } : item))}
                className="focus-ring flex min-h-11 w-full items-center gap-3 rounded-lg bg-white/[0.03] px-3 text-left"
              >
                <span
                  aria-hidden="true"
                  className={cx(
                    'flex h-6 w-6 shrink-0 items-center justify-center rounded-full border',
                    action.completed ? 'border-forest-green text-forest-green' : 'border-white/25 text-paper-100/45',
                  )}
                >
                  {action.completed && <Check size={14} />}
                </span>
                <span className="min-w-0 flex-1 text-[14px] text-paper-100/80">{action.title}</span>
                <Chip>{action.domain}</Chip>
              </button>
            ))}
          </div>
          <p className="mt-3 text-[11px] leading-4 text-paper-100/60">Updated today · completion state from Missions ledger</p>
        </SolidCard>

        <SectionTitle title="Pinned missions" />
        {pinnedMissions.map(mission => (
          <SolidCard key={mission.title} className="py-3">
            <button
              type="button"
              className="focus-ring flex min-h-11 w-full items-center gap-3 rounded-lg text-left"
              aria-label={`Open mission: ${mission.title}, ${mission.progress} percent complete`}
            >
              <MissionIcon size={18} className="shrink-0 text-brand-orange" />
              <span className="min-w-0 flex-1 text-[14px] font-semibold text-paper-100">{mission.title}</span>
              <span className="text-[13px] text-paper-100/65 tabular-nums">{mission.progress}%</span>
            </button>
            <div className="mt-2"><ProgressBar value={mission.progress} /></div>
            <p className="mt-2 text-[11px] leading-4 text-paper-100/60">Progress · Missions ledger · updated today</p>
          </SolidCard>
        ))}
      </main>
    </HifiShell>
  )
}
