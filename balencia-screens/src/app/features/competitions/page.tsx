'use client'

import { useState } from 'react'
import { Bell, Brain, ChevronRight, Dumbbell, Flag, Sparkles, Trophy, Users, Wallet } from 'lucide-react'
import { Card } from '@/components/design-system/Card'
import { Chip } from '@/components/design-system/Chip'
import { Header } from '@/components/layout/Header'
import { PhoneFrame } from '@/components/layout/PhoneFrame'
import { ScreenShell } from '@/components/layout/ScreenShell'
import { SectionHeader } from '@/components/screens/SectionHeader'
import { competitionRows, competitionSuggestions, featuredCompetition } from '@/data/mock'

// Screen 47 of 78: Competitions
// Spec: /Users/hamza/yHealth/app_design 3/47-competitions.md

const suggestionIcons = {
  meditation: Brain,
  fitness: Dumbbell,
  finance: Wallet,
}

function HeroBanner({ onJoin, onDetails }: { onJoin: () => void; onDetails: () => void }) {
  return (
    <Card variant="small" className="relative overflow-hidden rounded-xl border-brand-orange/25 p-5 animate-fade-up">
      <div className="absolute inset-0 bg-brand-orange/5" aria-hidden="true" />
      <div className="absolute -right-10 -top-10 h-28 w-28 rounded-full bg-brand-orange/10 blur-2xl" aria-hidden="true" />

      <div className="relative">
        <div className="text-small font-semibold uppercase leading-[14px] tracking-[0.12em] text-brand-orange">
          featured
        </div>

        <div className="mt-4 flex items-start gap-3">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-md bg-ink-900 text-white/80">
            <Flag size={28} strokeWidth={2.1} />
          </div>
          <div className="min-w-0 flex-1">
            <h1 className="text-h2 font-semibold leading-[26px] text-white">{featuredCompetition.name}</h1>
            <p className="mt-1 text-caption leading-[18px] text-white/50">{featuredCompetition.dateRange}</p>
            <div className="mt-1 inline-flex items-center gap-1.5 text-caption leading-[18px] text-white/50">
              <Users size={13} className="text-white/40" strokeWidth={2.2} />
              <span>{featuredCompetition.participants} participants</span>
            </div>
          </div>
        </div>

        <div className="mt-4 flex items-baseline gap-2">
          <span className="text-h2 font-bold leading-[26px] text-white tabular-nums">{featuredCompetition.countdown}</span>
          <span className="text-caption leading-[18px] text-white/40">Remaining</span>
        </div>

        <div className="mt-2 inline-flex items-center gap-2 text-caption font-semibold leading-[18px] text-white/70">
          <Trophy size={14} className="text-podium-gold" strokeWidth={2.2} />
          <span>{featuredCompetition.prizeXp} XP + {featuredCompetition.prizeBadge}</span>
        </div>

        <button
          type="button"
          onClick={onJoin}
          className="mt-4 flex h-12 w-full items-center justify-center rounded-pill bg-brand-orange text-body font-semibold leading-[22px] text-white transition-transform duration-[var(--dur-fast)] active:scale-[0.98]"
        >
          Join now
        </button>
        <button type="button" onClick={onDetails} className="mt-2 flex h-11 w-full items-center justify-center rounded-pill text-[15px] font-semibold leading-5 text-white/60">
          View details
        </button>
      </div>
    </Card>
  )
}

const competitionFilters = [
  { label: 'All', value: 'all' },
  { label: 'Active', value: 'active' },
  { label: 'Upcoming', value: 'upcoming' },
  { label: 'Past', value: 'past' },
  { label: 'My competitions', value: 'mine' },
]

function FilterRow({ active, counts, onChange }: { active: string; counts: Record<string, number>; onChange: (value: string) => void }) {

  return (
    <div className="-mx-4 mt-4 overflow-x-auto px-4 pb-1 hide-scrollbar animate-fade-up" style={{ animationDelay: '120ms' }}>
      <div className="flex gap-2">
        {competitionFilters.map((filter) => (
          <Chip key={filter.value} selected={active === filter.value} onClick={() => onChange(filter.value)} aria-pressed={active === filter.value} className="h-11 shrink-0">
            {filter.label} ({counts[filter.value]})
          </Chip>
        ))}
      </div>
    </div>
  )
}

function InvitationCard({ onOpen }: { onOpen: () => void }) {
  return (
    <button type="button" onClick={onOpen} className="mt-4 block w-full rounded-md border border-white/[0.06] border-l-4 border-l-brand-orange bg-ink-brown-800 p-4 text-left shadow-1 animate-fade-up" style={{ animationDelay: '200ms' }}>
      <div className="flex items-center gap-3">
        <div className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-orange/15 text-brand-orange">
          <Bell size={17} strokeWidth={2.2} />
          <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-brand-orange" aria-hidden="true" />
        </div>
        <div className="min-w-0 flex-1">
          <h2 className="truncate text-[15px] font-semibold leading-5 text-white">2 competition invitations</h2>
          <p className="mt-0.5 truncate text-caption leading-[18px] text-white/50">From Sarah, Ahmed</p>
        </div>
        <ChevronRight size={16} className="shrink-0 text-white/30" strokeWidth={2.2} />
      </div>
    </button>
  )
}

function SuggestionsSection({ onOpen }: { onOpen: (name: string) => void }) {
  return (
    <section className="mt-5 animate-fade-up" style={{ animationDelay: '280ms' }}>
      <SectionHeader title="Suggested for you" className="px-1" />
      <div className="-mx-4 overflow-x-auto px-4 pb-1 hide-scrollbar">
        <div className="flex gap-3">
          {competitionSuggestions.map((suggestion) => {
            const Icon = suggestionIcons[suggestion.icon as keyof typeof suggestionIcons]

            return (
              <button key={suggestion.id} type="button" onClick={() => onOpen(suggestion.name)} className="h-[118px] w-[144px] shrink-0 rounded-md border border-white/[0.06] bg-ink-brown-800 p-3 text-left shadow-1">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/[0.08] text-white/70">
                    <Icon size={17} strokeWidth={2.2} />
                  </div>
                  <span className="inline-flex items-center gap-1 rounded-pill bg-royal-purple/15 px-2 py-1 text-[10px] font-semibold leading-3 text-royal-purple">
                    <Sparkles size={10} strokeWidth={2.2} />
                    AI
                  </span>
                </div>
                <h2 className="mt-3 line-clamp-2 text-[14px] font-semibold leading-[18px] text-white">{suggestion.name}</h2>
                <p className="mt-1 text-small leading-[14px] text-white/40">{suggestion.duration}</p>
              </button>
            )
          })}
        </div>
      </div>
    </section>
  )
}

function statusDot(status: string) {
  if (status === 'active') return 'bg-forest-green'
  if (status === 'upcoming') return 'bg-brand-orange'
  return 'bg-white/25'
}

function CompetitionRow({
  competition,
  withDivider,
  joined,
  reminded,
  onAction,
}: {
  competition: (typeof competitionRows)[number]
  withDivider?: boolean
  joined?: boolean
  reminded?: boolean
  onAction: (label: string) => void
}) {
  const isAi = competition.type === 'AI'

  return (
    <article
      className={[
        'min-h-[88px] px-4 py-4',
        withDivider ? 'border-t border-white/[0.05]' : '',
      ].filter(Boolean).join(' ')}
    >
      <div className="flex items-start justify-between gap-3">
        <h2 className="min-w-0 flex-1 truncate text-body font-semibold leading-[22px] text-white">{competition.name}</h2>
        <span
          className={[
            'shrink-0 rounded-pill px-2 py-1 text-[10px] font-semibold uppercase leading-3',
            isAi ? 'bg-royal-purple/15 text-royal-purple' : 'bg-white/10 text-white/60',
          ].join(' ')}
        >
          {competition.type}
        </span>
      </div>

      <div className="mt-1 flex items-center gap-2 text-caption leading-[18px] text-white/50">
        <span>{competition.dateRange}</span>
        <span className={`h-1.5 w-1.5 rounded-full ${statusDot(competition.status)}`} aria-hidden="true" />
      </div>

      <div className="mt-2 flex items-center gap-3">
        <span className="inline-flex min-w-0 items-center gap-1.5 text-caption leading-[18px] text-white/40">
          <Users size={13} strokeWidth={2.2} />
          {competition.participants} participants
        </span>
        {competition.rank && (
          <span className="shrink-0 text-caption font-semibold leading-[18px] text-brand-orange">
            your rank: #{competition.rank}
          </span>
        )}
        {joined && (
          <span className="shrink-0 rounded-pill bg-forest-green/15 px-2 py-1 text-[10px] font-semibold leading-3 text-forest-green">
            joined
          </span>
        )}
        {reminded && !joined && (
          <span className="shrink-0 rounded-pill bg-brand-orange/15 px-2 py-1 text-[10px] font-semibold leading-3 text-brand-orange">
            reminder
          </span>
        )}
        <button
          type="button"
          onClick={() => onAction(competition.cta === 'View results' ? `${competition.name} results` : competition.name)}
          className={[
            'ml-auto min-h-11 shrink-0 rounded-pill px-3 text-caption leading-[18px]',
            competition.cta === 'Join' ? 'font-semibold text-brand-orange' : 'text-white/55',
          ].join(' ')}
        >
          {competition.cta}
        </button>
      </div>
    </article>
  )
}

function CompetitionList({
  rows,
  filterLabel,
  joinedNames,
  reminderNames,
  onAction,
}: {
  rows: typeof competitionRows
  filterLabel: string
  joinedNames: string[]
  reminderNames: string[]
  onAction: (label: string) => void
}) {
  return (
    <section className="mt-6 animate-fade-up" style={{ animationDelay: '360ms' }}>
      <SectionHeader title={`${filterLabel} (${rows.length})`} className="px-1" />
      <Card variant="small" className="rounded-md p-0">
        {rows.map((competition, index) => (
          <CompetitionRow
            key={competition.id}
            competition={competition}
            withDivider={index > 0}
            joined={joinedNames.includes(competition.name)}
            reminded={reminderNames.includes(competition.name)}
            onAction={onAction}
          />
        ))}
        {rows.length === 0 && (
          <div className="p-4 text-[13px] leading-[18px] text-white/55">
            No competitions in this filter. Try All or create a private self-only challenge from a detail sheet.
          </div>
        )}
      </Card>
    </section>
  )
}

export default function CompetitionsScreen() {
  const [filter, setFilter] = useState('all')
  const [dialog, setDialog] = useState('')
  const [dialogResult, setDialogResult] = useState('')
  const [joinedNames, setJoinedNames] = useState<string[]>([])
  const [reminderNames, setReminderNames] = useState<string[]>([])
  const myCompetitionNames = new Set([
    ...competitionRows.filter((competition) => competition.rank).map((competition) => competition.name),
    ...joinedNames,
  ])
  const filteredRows = competitionRows.filter((competition) => {
    if (filter === 'active') return competition.status === 'active'
    if (filter === 'upcoming') return competition.status === 'upcoming'
    if (filter === 'past') return competition.status === 'past'
    if (filter === 'mine') return myCompetitionNames.has(competition.name)
    return true
  })
  const counts = {
    all: competitionRows.length,
    active: competitionRows.filter((competition) => competition.status === 'active').length,
    upcoming: competitionRows.filter((competition) => competition.status === 'upcoming').length,
    past: competitionRows.filter((competition) => competition.status === 'past').length,
    mine: competitionRows.filter((competition) => myCompetitionNames.has(competition.name)).length,
  }
  const filterLabel = competitionFilters.find((item) => item.value === filter)?.label ?? 'All'
  const openDialog = (name: string) => {
    setDialog(name)
    setDialogResult('')
  }
  const markJoined = (mode: 'private' | 'self-only') => {
    setJoinedNames((names) => names.includes(dialog) ? names : [...names, dialog])
    setDialogResult(mode === 'private'
      ? `${dialog} joined privately. Only opted-in friends can see your participation.`
      : `${dialog} started as self-only. You get motivation without public ranking exposure.`
    )
  }
  const markReminder = () => {
    setReminderNames((names) => names.includes(dialog) ? names : [...names, dialog])
    setDialogResult(`Reminder set for ${dialog}. You will be nudged before it starts.`)
  }

  return (
    <PhoneFrame>
      <ScreenShell header={<Header title="Competitions" showBack />} activeTab="me">
        <main className="px-4 pb-20 pt-4">
          <HeroBanner onJoin={() => openDialog(featuredCompetition.name)} onDetails={() => openDialog(featuredCompetition.name)} />
          <FilterRow active={filter} counts={counts} onChange={setFilter} />
          <p className="mt-2 px-1 text-caption leading-[18px] text-white/45" aria-live="polite">{filterLabel} shows {filteredRows.length} competitions.</p>
          <InvitationCard onOpen={() => openDialog('Competition invitations')} />
          <SuggestionsSection onOpen={openDialog} />
          <CompetitionList rows={filteredRows} filterLabel={filterLabel} joinedNames={joinedNames} reminderNames={reminderNames} onAction={openDialog} />
        </main>

        {dialog && (
          <div className="absolute inset-0 z-40 flex items-end bg-ink-900/70 px-4 pb-4" role="dialog" aria-modal="true" aria-label="Competition detail">
            <div className="w-full rounded-xl border border-white/[0.08] bg-ink-brown-800 p-5 shadow-3">
              <h2 className="text-h3 font-semibold leading-[22px] text-white">{dialog}</h2>
              <p className="mt-2 text-caption leading-[18px] text-white/55">Competition detail with private/self-only participation, consent checks, leaderboard visibility, reminders, and results.</p>
              <div className="mt-4 grid gap-2">
                <div className="grid grid-cols-2 gap-2">
                  <button type="button" onClick={() => markJoined('private')} className="h-11 rounded-pill bg-brand-orange text-[15px] font-semibold leading-5 text-white">Join private</button>
                  <button type="button" onClick={() => markJoined('self-only')} className="h-11 rounded-pill border border-white/10 text-[15px] font-semibold leading-5 text-white/70">Self-only</button>
                </div>
                <button type="button" onClick={markReminder} className="h-11 rounded-pill border border-white/10 text-[15px] font-semibold leading-5 text-white/70">Remind me</button>
              </div>
              {dialogResult && (
                <p className="mt-3 rounded-md bg-forest-green/10 p-3 text-caption font-semibold leading-[18px] text-forest-green" role="status">
                  {dialogResult}
                </p>
              )}
              <button type="button" onClick={() => setDialog('')} className="mt-3 h-11 w-full rounded-pill text-[15px] font-semibold leading-5 text-white/60">Close</button>
            </div>
          </div>
        )}
      </ScreenShell>
    </PhoneFrame>
  )
}
