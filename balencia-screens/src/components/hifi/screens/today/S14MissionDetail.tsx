'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Award, Check, ChevronDown, ChevronRight, Clock, Compass, LineChart, ListChecks, Pencil, Pin, Sparkles, WifiOff } from 'lucide-react'
import {
  ConsentRail,
  GlassCard,
  HifiShell,
  IconButton,
  ProgressRing,
  Provenance,
  SolidCard,
  TopBar,
  TrendChart,
  cx,
} from '@/components/hifi/kit'

type MissionDetailState = 'default' | 'empty' | 'low-confidence' | 'offline' | 'stalled' | 'success'
type SectionKey = 'actions' | 'milestones' | 'reasoning' | 'links' | 'progress'
type MissionIdentity = 'half-marathon' | 'sunlight' | 'q3-report' | 'run-5k' | 'hydrate'
type MissionDomain = 'Fitness' | 'Wellbeing' | 'Career' | 'Nutrition'

type MissionDetailFixture = {
  id: MissionIdentity
  title: string
  progress: number
  progressSource: string
  sourceSummary: string
  lowConfidenceDetail: string
  domains: MissionDomain[]
  actionsLogged: number
  streakDays: number
  xp: number
  nextAction: string
  nextActionTiming: string
  nextActionXp: number
  nextChain: string
  coaching: { before: string; emphasis: string; after: string }
  emptyCoaching: string
  coachingProvenance: string[]
  loggedActions: Array<{ name: string; note: string }>
  milestones: Array<{ name: string; note: string }>
  reasoning: string[]
  trendPast: number[]
  trendProjected: number[]
  trendMilestones: number[]
  consentCopy: string
}

const MISSION_DETAIL_STATES: MissionDetailState[] = ['default', 'empty', 'low-confidence', 'offline', 'stalled', 'success']
const DEFAULT_MISSION_ID: MissionIdentity = 'half-marathon'

// RPG_SYSTEM_DESIGN.md Appendix A: streak multiplier is 1.0 at <7 days,
// 1.5 at 7-29 days, 2.0 at 30+ days. Copy below is derived, never a literal
// that contradicts the rule.
function getStreakMultiplier(days: number) {
  return days >= 30 ? '2.0×' : days >= 7 ? '1.5×' : '1.0×'
}

function getStreakNote(days: number) {
  const multiplier = getStreakMultiplier(days)
  return days < 7
    ? `${multiplier} XP · 7-day tier in ${7 - days} day${7 - days === 1 ? '' : 's'}`
    : `${multiplier} XP multiplier`
}

const DOMAIN_DETAILS: Record<MissionDomain, { href: string; destination: string; className: string }> = {
  Fitness: {
    href: '/screens/26',
    destination: 'Workouts dashboard',
    className: 'border border-domain-fitness/30 bg-domain-fitness/15 text-paper-100',
  },
  Wellbeing: {
    href: '/screens/16',
    destination: 'Life Areas overview',
    className: 'border border-domain-wellbeing/30 bg-domain-wellbeing/15 text-paper-100',
  },
  Career: {
    href: '/screens/32',
    destination: 'Career work dashboard',
    className: 'border border-domain-career/30 bg-domain-career/15 text-paper-100',
  },
  Nutrition: {
    href: '/screens/28',
    destination: 'Nutrition dashboard',
    className: 'border border-domain-nutrition/30 bg-domain-nutrition/15 text-paper-100',
  },
}

const MISSION_DETAILS: Record<MissionIdentity, MissionDetailFixture> = {
  'half-marathon': {
    id: 'half-marathon',
    title: 'Run a half marathon',
    progress: 68,
    progressSource: 'Via Strava',
    sourceSummary: 'bundled Strava fixture',
    lowConfidenceDetail: 'today’s Strava sync is still processing',
    domains: ['Fitness', 'Wellbeing'],
    actionsLogged: 9,
    streakDays: 6,
    xp: 320,
    nextAction: '3-mile easy run',
    nextActionTiming: 'Tomorrow',
    nextActionXp: 25,
    nextChain: '10-mile progression run',
    coaching: {
      before: 'Consistency is ',
      emphasis: 'momentum',
      after: '. Your last three runs improved pace.',
    },
    emptyCoaching: 'Day one. Log your first run and this card starts reading your real momentum — no invented numbers before then.',
    coachingProvenance: ['Via Strava', 'Pace'],
    loggedActions: [
      { name: 'Run 3x weekly', note: 'Logged Mon · Wed · Sat' },
      { name: 'Strength train 2x', note: 'Logged Tue · Thu' },
      { name: 'Long run build-up', note: 'Logged Sun' },
    ],
    milestones: [
      { name: '5K pace check', note: 'Reached Aug 15' },
      { name: '10K long run', note: 'Upcoming · Sep 12' },
    ],
    reasoning: [
      'Checked your training log',
      'Compared pace to last month',
      'Weighted milestone progress into the completion read',
    ],
    trendPast: [42, 48, 55, 61, 68],
    trendProjected: [74, 82],
    trendMilestones: [2],
    consentCopy: 'Mission progress reads from Strava and your logged actions. Coaching support, not medical advice.',
  },
  sunlight: {
    id: 'sunlight',
    title: 'Morning sunlight',
    progress: 72,
    progressSource: 'Via missions ledger',
    sourceSummary: 'bundled missions-ledger fixture',
    lowConfidenceDetail: 'one morning check-in is still pending',
    domains: ['Wellbeing'],
    actionsLogged: 5,
    streakDays: 5,
    xp: 180,
    nextAction: '10 minutes outside after waking',
    nextActionTiming: 'Tomorrow morning',
    nextActionXp: 15,
    nextChain: 'Keep a seven-day morning rhythm',
    coaching: {
      before: 'Five morning sunlight check-ins are building a ',
      emphasis: 'steadier start',
      after: '. The pattern is based only on the times you logged.',
    },
    emptyCoaching: 'Day one. Log your first morning sunlight check-in and this card will start reading your real pattern.',
    coachingProvenance: ['You logged', 'Check-in times'],
    loggedActions: [
      { name: 'Morning sunlight · 12 min', note: 'Logged Mon · Wed' },
      { name: 'Outside after waking', note: 'Logged Thu · Fri' },
      { name: 'Morning walk', note: 'Logged Sat' },
    ],
    milestones: [
      { name: 'Three morning check-ins', note: 'Reached this week' },
      { name: 'Seven-day rhythm', note: '2 days remaining' },
    ],
    reasoning: [
      'Checked your morning check-ins',
      'Compared logged start times this week',
      'Weighted completed mornings into the progress read',
    ],
    trendPast: [36, 44, 53, 64, 72],
    trendProjected: [79, 86],
    trendMilestones: [2],
    consentCopy: 'Mission progress reads from the morning check-ins you logged. Coaching support, not medical advice.',
  },
  'q3-report': {
    id: 'q3-report',
    title: 'Finalize Q3 report',
    progress: 46,
    progressSource: 'Via Calendar',
    sourceSummary: 'bundled Calendar and missions fixture',
    lowConfidenceDetail: 'one scheduled focus block has not been marked complete',
    domains: ['Career'],
    actionsLogged: 4,
    streakDays: 3,
    xp: 260,
    nextAction: 'Draft the executive summary',
    nextActionTiming: 'Today · 45-minute focus block',
    nextActionXp: 30,
    nextChain: 'Share the first review draft',
    coaching: {
      before: 'Two focused report blocks created ',
      emphasis: 'momentum',
      after: '. Protecting one review block next keeps the deadline moving.',
    },
    emptyCoaching: 'Start with one report action. This card will read only the work blocks and completions you log.',
    coachingProvenance: ['Via Calendar', 'You logged'],
    loggedActions: [
      { name: 'Draft report outline', note: 'Logged Monday' },
      { name: 'Verify Q3 metrics', note: 'Logged Wednesday' },
      { name: 'Build chart narrative', note: 'Logged Friday' },
    ],
    milestones: [
      { name: 'Outline approved', note: 'Reached Jul 8' },
      { name: 'Review draft', note: 'Upcoming · Jul 15' },
    ],
    reasoning: [
      'Checked your scheduled focus blocks',
      'Compared completed report sections',
      'Weighted review milestones into the progress read',
    ],
    trendPast: [18, 27, 36, 41, 46],
    trendProjected: [64, 82],
    trendMilestones: [2],
    consentCopy: 'Mission progress reads from Calendar focus blocks and the report actions you logged. Coaching support, not professional advice.',
  },
  'run-5k': {
    id: 'run-5k',
    title: 'Run 5K',
    progress: 61,
    progressSource: 'Via workout log',
    sourceSummary: 'bundled workout-log fixture',
    lowConfidenceDetail: 'today’s workout import is still processing',
    domains: ['Fitness'],
    actionsLogged: 7,
    streakDays: 4,
    xp: 240,
    nextAction: '2-mile easy run',
    nextActionTiming: 'Tomorrow · conversational pace',
    nextActionXp: 20,
    nextChain: 'Complete a steady 10K',
    coaching: {
      before: 'Three steady runs are building ',
      emphasis: 'capacity',
      after: '. Your most recent 5K split was the strongest in this bundled log.',
    },
    emptyCoaching: 'Day one. Log your first 5K action and this card starts reading the workout progress you actually record.',
    coachingProvenance: ['Via workout log', 'Pace'],
    loggedActions: [
      { name: 'Easy run · 2 miles', note: 'Logged Tuesday' },
      { name: 'Tempo intervals', note: 'Logged Thursday' },
      { name: 'Steady 5K attempt', note: 'Logged Sunday' },
    ],
    milestones: [
      { name: 'Continuous 3K', note: 'Reached this week' },
      { name: 'Steady 5K', note: 'Upcoming · next attempt' },
    ],
    reasoning: [
      'Checked your workout log',
      'Compared recent 5K splits',
      'Weighted distance milestones into the progress read',
    ],
    trendPast: [30, 38, 47, 54, 61],
    trendProjected: [69, 78],
    trendMilestones: [2],
    consentCopy: 'Mission progress reads from your bundled workout log and logged actions. Coaching support, not medical advice.',
  },
  hydrate: {
    id: 'hydrate',
    title: 'Hydrate',
    progress: 100,
    progressSource: 'You logged',
    sourceSummary: 'bundled hydration-log fixture',
    lowConfidenceDetail: 'one offline glass entry is still pending',
    domains: ['Wellbeing', 'Nutrition'],
    actionsLogged: 8,
    streakDays: 7,
    xp: 200,
    nextAction: 'Start tomorrow’s hydration log',
    nextActionTiming: 'Tomorrow · first glass',
    nextActionXp: 10,
    nextChain: 'Keep a seven-day hydration rhythm',
    coaching: {
      before: 'Today’s target is complete. Eight logged glasses make the ',
      emphasis: 'pattern',
      after: ' visible without guessing beyond your entries.',
    },
    emptyCoaching: 'Log your first glass and this card will start reading only the hydration entries you add.',
    coachingProvenance: ['You logged', 'Hydration log'],
    loggedActions: [
      { name: 'Morning water', note: 'Logged 8:10 AM' },
      { name: 'Midday bottle', note: 'Logged 1:10 PM' },
      { name: 'Evening glass', note: 'Logged 8:30 PM' },
    ],
    milestones: [
      { name: 'Half-day target', note: 'Reached 1:10 PM' },
      { name: 'Daily target', note: 'Reached 8:30 PM' },
    ],
    reasoning: [
      'Counted your logged glasses',
      'Compared entries with today’s target',
      'Marked the target complete from your entries',
    ],
    trendPast: [45, 58, 70, 86, 100],
    trendProjected: [100, 100],
    trendMilestones: [2, 4],
    consentCopy: 'Mission progress reads from the hydration entries you logged. Coaching support, not medical advice.',
  },
}

function isMissionIdentity(value: string | null): value is MissionIdentity {
  return value !== null && Object.prototype.hasOwnProperty.call(MISSION_DETAILS, value)
}

const expandableSections: Array<{ key: SectionKey; label: string; Icon: typeof ListChecks; tone: string }> = [
  { key: 'actions', label: 'All actions', Icon: ListChecks, tone: 'text-brand-orange' },
  { key: 'milestones', label: 'Milestones', Icon: Award, tone: 'text-forest-green' },
  { key: 'reasoning', label: 'CIA reasoning', Icon: Sparkles, tone: 'text-royal-purple' },
  { key: 'links', label: 'Cross-domain links', Icon: Compass, tone: 'text-brand-orange' },
  { key: 'progress', label: 'Progress over time', Icon: LineChart, tone: 'text-royal-purple' },
]

export function S14MissionDetail() {
  const [screenState, setScreenState] = useState<MissionDetailState>('default')
  const [selectedMissionId, setSelectedMissionId] = useState<MissionIdentity | null>(null)
  const [openSections, setOpenSections] = useState<Record<SectionKey, boolean>>({ actions: false, milestones: false, reasoning: false, links: false, progress: false })
  const [nextActionDone, setNextActionDone] = useState(false)
  const [pinned, setPinned] = useState(false)
  const [showStallOptions, setShowStallOptions] = useState(false)
  const [status, setStatus] = useState('Mission detail visual fixture ready. Progress reads from a bundled local fixture — nothing was fetched.')

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search)
    const fixture = searchParams.get('state') as MissionDetailState | null
    const requestedMissionId = searchParams.get('mission')
    const resolvedMissionId = isMissionIdentity(requestedMissionId) ? requestedMissionId : DEFAULT_MISSION_ID
    const resolvedMission = MISSION_DETAILS[resolvedMissionId]
    const timer = window.setTimeout(() => {
      setSelectedMissionId(resolvedMissionId)
      if (!fixture || !MISSION_DETAIL_STATES.includes(fixture)) {
        setStatus(`${resolvedMission.title} detail fixture ready. Progress reads from the ${resolvedMission.sourceSummary} — nothing was fetched.`)
        return
      }
      setScreenState(fixture)
      setNextActionDone(fixture === 'success')
      setStatus(
        fixture === 'empty'
          ? 'Cold-start fixture — no actions logged yet, so the ring, KPIs, and XP show honest nulls.'
          : fixture === 'low-confidence'
            ? `Estimated, low confidence — ${resolvedMission.lowConfidenceDetail}, so the completion read is partial.`
            : fixture === 'offline'
              ? `Offline — showing the last synced ${resolvedMission.title} fixture, 2 hours ago. Completions queue locally.`
              : fixture === 'stalled'
                ? 'No actions logged in 9 days. CIA switched to recovery coaching — see options for the next step.'
                : fixture === 'success'
                  ? `${resolvedMission.title} is complete in this local preview — the ring flipped green and the next chain step is previewed.`
                  : `${fixture} mission detail fixture loaded.`,
      )
    }, 0)
    return () => window.clearTimeout(timer)
  }, [])

  // Static HTML and the first client paint stay identity-neutral. The query is
  // resolved before any mission-specific claims render, so a row navigation
  // never flashes the unrelated canonical half-marathon fixture. Missing or
  // invalid identities still resolve to that canonical default in the effect.
  if (!selectedMissionId) {
    return (
      <HifiShell
        header={<TopBar title="Mission detail" />}
        atmosphere="you"
        showTabBar={false}
      >
        <main className="space-y-4 px-4 pb-6 pt-2" aria-busy="true" aria-label="Resolving mission detail">
          <div className="skeleton-block h-11 rounded-pill" />
          <div className="skeleton-block h-36 rounded-[22px]" />
          <div className="grid grid-cols-3 gap-2">
            <div className="skeleton-block h-20 rounded-xl" />
            <div className="skeleton-block h-20 rounded-xl" />
            <div className="skeleton-block h-20 rounded-xl" />
          </div>
          <div className="skeleton-block h-40 rounded-[22px]" />
        </main>
      </HifiShell>
    )
  }

  const isEmpty = screenState === 'empty'
  const isLowConfidence = screenState === 'low-confidence'
  const isSuccess = screenState === 'success'
  const isStalled = screenState === 'stalled'
  const mission = MISSION_DETAILS[selectedMissionId]
  const streakMultiplier = getStreakMultiplier(mission.streakDays)
  const streakNote = getStreakNote(mission.streakDays)
  const ringPercent = isEmpty ? 0 : isSuccess ? 100 : mission.progress
  const ringValue = `${ringPercent}%`
  const ringComplete = isSuccess || ringPercent >= 100

  const toggleSection = (key: SectionKey, label: string) => {
    setOpenSections(current => {
      const nowOpen = !current[key]
      setStatus(`${label} ${nowOpen ? 'expanded' : 'collapsed'}.`)
      return { ...current, [key]: nowOpen }
    })
  }

  const toggleNextAction = () => {
    const nowDone = !nextActionDone
    setNextActionDone(nowDone)
    const queued = screenState === 'offline' ? ' Queued locally — will sync when back online.' : ''
    setStatus(
      nowDone
        ? `“${mission.nextAction}” completed in this local preview · +${mission.nextActionXp} XP preview at the ${streakMultiplier} streak multiplier. Undo by unchecking.${queued}`
        : `“${mission.nextAction}” reopened locally — the +${mission.nextActionXp} XP preview was removed.${queued}`,
    )
  }

  return (
    <HifiShell
      header={
        <TopBar
          title={mission.title}
          right={
            <div className="flex items-center gap-1">
              <IconButton
                label="Pin to home screen"
                aria-pressed={pinned}
                onClick={() => {
                  setPinned(current => {
                    setStatus(current ? 'Unpinned from home in this preview.' : 'Pinned to home in this preview — no account state changed.')
                    return !current
                  })
                }}
              >
                <Pin size={18} strokeWidth={1.9} className={pinned ? 'text-brand-orange' : undefined} />
              </IconButton>
              <Link
                href="/screens/15"
                aria-label={`Edit ${mission.title}`}
                className="focus-ring flex h-11 w-11 items-center justify-center rounded-full text-paper-100/70 transition-colors hover:text-paper-100"
              >
                <Pencil size={17} strokeWidth={1.9} />
              </Link>
            </div>
          }
        />
      }
      atmosphere="you"
      showTabBar={false}
    >
      <main
        className="space-y-4 px-4 pb-6 pt-2 [&_[data-chip-interactive]]:!text-[12px] [&_span.min-h-8]:!text-[12px]"
        data-mission-detail-state={screenState}
        data-mission-id={mission.id}
      >
        {screenState === 'offline' && (
          <div className="flex items-start gap-2 rounded-xl border border-white/10 bg-surface-2 px-3 py-2 text-[12px] leading-4 text-paper-100/70">
            <WifiOff aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0" />
            Offline — showing your last synced mission, 2h ago. The next action queues locally.
          </div>
        )}

        <div className="flex flex-col items-center gap-3 py-2">
          {/* Keep the kit ring label at the frozen 12px semantic floor and AA after low-confidence opacity. */}
          <div className={cx('[&_[role=img]_span:last-child]:text-[12px] [&_[role=img]_span:last-child]:text-paper-100', isLowConfidence && 'opacity-[0.64]')}>
            <ProgressRing percent={ringPercent} value={ringValue} label="Complete" size={208} tone={ringComplete ? 'done' : 'you'} ghost={isEmpty} />
          </div>
          {isEmpty ? (
            <p className="text-[12px] leading-4 text-paper-100/65">Not enough data yet — 3 more days to calibrate.</p>
          ) : isLowConfidence ? (
            <div className="flex flex-col items-center gap-1.5">
              <Provenance items={['Estimated · low confidence']} />
              <div role="img" aria-label="Confidence meter: estimated, low confidence" className="h-1.5 w-32 overflow-hidden rounded-pill bg-white/10">
                <div className="h-full w-1/3 rounded-pill bg-royal-purple" />
              </div>
            </div>
          ) : (
            <Provenance items={[mission.progressSource]} />
          )}
        </div>

        <div className="space-y-3 text-center">
          <h2 className="text-[32px] font-semibold leading-9 tracking-[-0.01em] text-white">{mission.title}</h2>
          <div className="flex flex-wrap items-center justify-center gap-2">
            {mission.domains.map(domain => {
              const detail = DOMAIN_DETAILS[domain]
              return (
                <Link
                  key={domain}
                  href={detail.href}
                  aria-label={`Open ${domain} domain`}
                  className={cx('focus-ring inline-flex min-h-11 items-center gap-1.5 rounded-pill px-4 text-[13px] font-semibold', detail.className)}
                >
                  {domain}
                </Link>
              )
            })}
          </div>
        </div>

        <SolidCard className="shadow-[var(--glow-orange-sm)]">
          <div className="grid grid-cols-3 divide-x divide-white/10">
            <div className="flex flex-col items-center gap-0.5 px-1 text-center">
              <span className="text-[22px] font-semibold leading-7 text-white tabular-nums">{isEmpty ? '—' : mission.actionsLogged}</span>
              <span className="text-[12px] font-semibold uppercase leading-4 text-paper-100/65">Actions</span>
              <span className="text-[12px] leading-4 text-paper-100/60">{isEmpty ? 'No actions logged yet' : 'You logged'}</span>
            </div>
            <div className="flex flex-col items-center gap-0.5 px-1 text-center">
              <span className="text-[22px] font-semibold leading-7 text-white tabular-nums">{isEmpty ? '—' : mission.streakDays}</span>
              <span className="text-[12px] font-semibold uppercase leading-4 text-paper-100/65">Streak</span>
              <span className="text-[12px] leading-4 text-paper-100/60">{isEmpty ? 'Starts with day one' : streakNote}</span>
              {!isEmpty && <span className="text-[12px] leading-4 text-paper-100/60">Via missions ledger</span>}
            </div>
            <div className="flex flex-col items-center gap-0.5 px-1 text-center">
              <span className="text-[22px] font-semibold leading-7 text-white tabular-nums">{isEmpty ? '—' : mission.xp}</span>
              <span className="text-[12px] font-semibold uppercase leading-4 text-paper-100/65">XP</span>
              <span className="text-[12px] leading-4 text-paper-100/60">{isEmpty ? 'Appears after your first action' : 'Via rewards ledger'}</span>
            </div>
          </div>
        </SolidCard>

        <GlassCard tone="cia" className="rounded-[28px]">
          <div className="flex items-start gap-3">
            <Sparkles size={18} className="mt-0.5 shrink-0 text-royal-purple" />
            <div className="min-w-0 flex-1">
              {isStalled ? (
                <>
                  <p className="text-[15px] leading-[21px] text-white">
                    No actions in 9 days. That’s <span className="text-emphasis">information</span>, not failure — let’s shrink the next step until it fits your week.
                  </p>
                  <div className="mt-3"><Provenance items={['Via missions ledger']} /></div>
                  <button
                    type="button"
                    aria-expanded={showStallOptions}
                    className="focus-ring mt-2 inline-flex min-h-11 items-center rounded-pill px-0 text-[15px] font-medium text-brand-orange"
                    onClick={() => setShowStallOptions(open => !open)}
                  >
                    See options
                  </button>
                  {showStallOptions && (
                    <div className="mt-2 space-y-1" role="group" aria-label="Stalled mission options">
                      {['Shrink the next action', 'Reschedule this week', 'Pause this mission'].map(option => (
                        <button
                          key={option}
                          type="button"
                          className="focus-ring flex min-h-11 w-full items-center justify-between rounded-lg border border-white/10 bg-white/[0.03] px-3 text-left text-[13px] text-paper-100/85"
                          onClick={() => setStatus(`“${option}” preview selected. Nothing changed in this preview.`)}
                        >
                          {option}
                          <ChevronRight size={14} aria-hidden="true" className="text-paper-100/50" />
                        </button>
                      ))}
                      <Link
                        href="/screens/09"
                        className="focus-ring flex min-h-11 w-full items-center justify-between rounded-lg border border-white/10 bg-white/[0.03] px-3 text-left text-[13px] text-paper-100/85"
                      >
                        Talk it through with CIA
                        <ChevronRight size={14} aria-hidden="true" className="text-paper-100/50" />
                      </Link>
                    </div>
                  )}
                </>
              ) : (
                <>
                  <p className="text-[15px] leading-[21px] text-white">
                    {isEmpty
                      ? mission.emptyCoaching
                      : isSuccess
                        ? <>Mission complete. Your logged consistency is <span className="text-emphasis">momentum</span> you can chain forward.</>
                        : <>{mission.coaching.before}<span className="text-emphasis">{mission.coaching.emphasis}</span>{mission.coaching.after}</>}
                  </p>
                  <div className="mt-3"><Provenance items={isEmpty ? ['No data yet'] : mission.coachingProvenance} /></div>
                  <div className="mt-2">
                    <Link href="/screens/09" className="focus-ring inline-flex min-h-11 items-center rounded-pill text-[15px] font-medium text-brand-orange">
                      Ask CIA &rarr;
                    </Link>
                  </div>
                </>
              )}
            </div>
          </div>
        </GlassCard>

        {isSuccess && (
          <SolidCard className="border border-forest-green/25">
            <div className="flex items-center gap-3">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-forest-green text-white"><Check size={20} strokeWidth={2.2} /></span>
              <div className="min-w-0 flex-1">
                <p className="text-[15px] font-medium leading-5 text-white">Next in this chain: {mission.nextChain}</p>
                <p className="mt-0.5 text-[12px] leading-4 text-paper-100/60">Chain-extension preview — nothing is committed yet.</p>
              </div>
            </div>
          </SolidCard>
        )}
        <SolidCard className={isSuccess ? undefined : 'shadow-[var(--glow-orange-sm)]'}>
          <label className="flex cursor-pointer items-center gap-3 focus-within:shadow-[var(--focus-ring)]">
            <input
              type="checkbox"
              aria-label={`Mark ${mission.nextAction} as complete`}
              checked={nextActionDone}
              onChange={toggleNextAction}
              className="h-6 w-6 shrink-0 cursor-pointer accent-forest-green"
            />
            <div className="min-w-0 flex-1 py-2.5">
              <p className="text-[15px] font-medium leading-5 text-white">{mission.nextAction}</p>
              <p className="mt-0.5 flex items-center gap-1 text-[12px] leading-4 text-paper-100/60">
                <Clock size={12} strokeWidth={1.9} aria-hidden="true" />
                {nextActionDone ? 'Logged in this preview · uncheck to undo' : `${mission.nextActionTiming} · tap the circle to mark done`}
              </p>
            </div>
          </label>
          {nextActionDone && (
            <p className="mt-2 rounded-xl border border-forest-green/25 bg-forest-green/10 px-3 py-2 text-[12px] font-medium text-paper-100">
              <Check aria-hidden="true" className="mr-2 inline h-4 w-4 text-forest-green" />
              +{mission.nextActionXp} XP preview · {streakMultiplier} streak multiplier · undo by unchecking
            </p>
          )}
        </SolidCard>

        <div className="space-y-2.5">
          {expandableSections.map(({ key, label, Icon, tone }) => (
            <div key={key} className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04]">
              <button
                type="button"
                aria-expanded={openSections[key]}
                aria-controls={`mission-section-${key}`}
                onClick={() => toggleSection(key, label)}
                className="focus-ring flex min-h-14 w-full items-center justify-between px-4 py-3.5 text-left"
              >
                <span className="flex items-center gap-2.5">
                  <Icon size={16} className={tone} strokeWidth={1.9} aria-hidden="true" />
                  <span className="text-[13px] font-semibold uppercase tracking-wide text-white/85">{label}</span>
                </span>
                <ChevronDown size={18} aria-hidden="true" className={cx('text-white/40 transition-transform motion-reduce:transition-none', openSections[key] && 'rotate-180')} strokeWidth={1.9} />
              </button>
              {openSections[key] && (
                <div id={`mission-section-${key}`} className="border-t border-white/[0.06] px-4 py-3">
                  {key === 'actions' && (
                    isEmpty ? (
                      <p className="text-[12px] leading-4 text-paper-100/65">No actions logged yet.</p>
                    ) : (
                      <ul className="space-y-2">
                        {mission.loggedActions.map(action => (
                          <li key={action.name} className="flex items-baseline justify-between gap-2">
                            <span className="text-[13px] leading-5 text-paper-100/85">{action.name}</span>
                            <span className="shrink-0 text-[12px] leading-4 text-paper-100/60">{action.note}</span>
                          </li>
                        ))}
                        <li className="pt-1 text-[12px] leading-4 text-paper-100/60">Via missions ledger</li>
                      </ul>
                    )
                  )}
                  {key === 'milestones' && (
                    <ul className="space-y-2">
                      {mission.milestones.map((milestone, index) => (
                        <li key={milestone.name} className="flex items-baseline justify-between gap-2">
                          <span className="text-[13px] leading-5 text-paper-100/85">{milestone.name}</span>
                          <span className={cx('shrink-0 text-[12px] leading-4', index === 0 && !isEmpty ? 'text-forest-green' : 'text-paper-100/60')}>
                            {isEmpty ? 'Planned' : milestone.note}
                          </span>
                        </li>
                      ))}
                      <li className="pt-1 text-[12px] leading-4 text-paper-100/60">Via missions ledger</li>
                    </ul>
                  )}
                  {key === 'reasoning' && (
                    <div className="space-y-2">
                      <ol className="space-y-1.5">
                        {mission.reasoning.map(step => (
                          <li key={step} className="text-[13px] leading-5 text-paper-100/85">{step}</li>
                        ))}
                      </ol>
                      <p className="text-[12px] leading-4 text-paper-100/60">Interpretive trace from the bundled fixture — coaching support, not a diagnosis.</p>
                    </div>
                  )}
                  {key === 'links' && (
                    <div className="space-y-1">
                      {mission.domains.map(domain => {
                        const detail = DOMAIN_DETAILS[domain]
                        return (
                          <Link key={domain} href={detail.href} className="focus-ring flex min-h-11 items-center justify-between rounded-lg px-1 text-[13px] text-paper-100/85">
                            {domain} — {detail.destination}
                            <ChevronRight size={14} aria-hidden="true" className="text-paper-100/50" />
                          </Link>
                        )
                      })}
                    </div>
                  )}
                  {key === 'progress' && (
                    isEmpty ? (
                      <p className="text-[12px] leading-4 text-paper-100/65">The trend chart appears after your first logged week.</p>
                    ) : (
                      <div className="space-y-2">
                        <TrendChart
                          past={mission.trendPast}
                          projected={mission.trendProjected}
                          milestones={mission.trendMilestones}
                          label="Completion percent by week: logged weeks solid, CIA projection dashed, milestone dot green"
                        />
                        <p className="text-[12px] leading-4 text-paper-100/60">Solid = logged · dashed = CIA projection · Via missions ledger</p>
                      </div>
                    )
                  )}
                </div>
              )}
            </div>
          ))}
        </div>

        <GlassCard tone="muted">
          <p className="text-[12px] font-semibold uppercase leading-4 text-paper-100/60">Data & consent</p>
          <p className="mt-1 text-[12px] leading-4 text-white/55">
            {mission.consentCopy}
          </p>
          <ConsentRail compact />
        </GlassCard>

        <p role="status" aria-live="polite" aria-atomic="true" className="min-h-5 text-[12px] leading-5 text-paper-100/70">{status}</p>
      </main>
    </HifiShell>
  )
}
