import { Award, ChevronDown, Circle, Clock, Compass, LineChart, ListChecks, Pencil, Pin, Sparkles } from 'lucide-react'
import {
  BtnGhost,
  ConsentRail,
  GlassCard,
  HifiShell,
  IconButton,
  ProgressRing,
  Provenance,
  SolidCard,
  TopBar,
} from '@/components/hifi/kit'

// Mission detail, chosen state: default — hero ring mid-arc (68%, real, via
// Strava), all five accordions collapsed, next action open and interactive.
// Empty (0%, ghosted ring, honest-null KPIs), low-confidence (64% opacity
// ring + confidence meter), offline (queued next action), stalled (CIA
// recovery copy), and success (100%, green celebration) are the other states
// this same layout carries — not rendered in parallel here, per catalog.

const expandableSections = [
  { label: 'All actions', Icon: ListChecks, tone: 'text-brand-orange' },
  { label: 'Milestones', Icon: Award, tone: 'text-forest-green' },
  { label: 'CIA reasoning', Icon: Sparkles, tone: 'text-royal-purple' },
  { label: 'Cross-domain links', Icon: Compass, tone: 'text-brand-orange' },
  { label: 'Progress over time', Icon: LineChart, tone: 'text-royal-purple' },
] as const

export function S14MissionDetail() {
  return (
    <HifiShell
      header={
        <TopBar
          title="Run a half marathon"
          right={
            <div className="flex items-center gap-1">
              <IconButton label="Pin to home screen"><Pin size={18} strokeWidth={1.9} /></IconButton>
              <IconButton label="Edit mission"><Pencil size={17} strokeWidth={1.9} /></IconButton>
            </div>
          }
        />
      }
      atmosphere="you"
      showTabBar={false}
    >
      <main className="space-y-4 px-4 pb-6 pt-2">
        <div className="flex flex-col items-center gap-3 py-2">
          <ProgressRing percent={68} value="68%" label="Complete" size={208} tone="you" />
          <Provenance items={['Via Strava']} />
        </div>

        <div className="space-y-3 text-center">
          <h2 className="text-[32px] font-semibold leading-9 tracking-[-0.01em] text-white">Run a half marathon</h2>
          <div className="flex flex-wrap items-center justify-center gap-2">
            <button type="button" aria-label="Filter by Fitness" className="inline-flex min-h-11 items-center gap-1.5 rounded-pill bg-domain-fitness/15 px-4 text-[13px] font-semibold text-domain-fitness">
              Fitness
            </button>
            <button type="button" aria-label="Filter by Health" className="inline-flex min-h-11 items-center gap-1.5 rounded-pill bg-domain-wellbeing/15 px-4 text-[13px] font-semibold text-domain-wellbeing">
              Health
            </button>
          </div>
        </div>

        <SolidCard className="shadow-[var(--glow-orange-sm)]">
          <div className="grid grid-cols-3 divide-x divide-white/10">
            <div className="flex flex-col items-center gap-0.5 px-1 text-center">
              <span className="text-[22px] font-semibold leading-7 text-white tabular-nums">9</span>
              <span className="text-[10px] font-semibold uppercase leading-3 text-white/45">Actions</span>
              <span className="text-[10px] leading-3 text-white/40">You logged</span>
            </div>
            <div className="flex flex-col items-center gap-0.5 px-1 text-center">
              <span className="text-[22px] font-semibold leading-7 text-white tabular-nums">6</span>
              <span className="text-[10px] font-semibold uppercase leading-3 text-white/45">Streak</span>
              <span className="text-[10px] leading-3 text-white/40">System</span>
            </div>
            <div className="flex flex-col items-center gap-0.5 px-1 text-center">
              <span className="text-[22px] font-semibold leading-7 text-white tabular-nums">320</span>
              <span className="text-[10px] font-semibold uppercase leading-3 text-white/45">XP</span>
              <span className="text-[10px] leading-3 text-white/40">System</span>
            </div>
          </div>
        </SolidCard>

        <GlassCard tone="cia" className="rounded-[28px]">
          <div className="flex items-start gap-3">
            <Sparkles size={18} className="mt-0.5 shrink-0 text-royal-purple" />
            <div className="min-w-0 flex-1">
              <p className="text-[15px] leading-[21px] text-white">
                Consistency is <span className="text-emphasis">momentum</span>. Your last three runs improved pace.
              </p>
              <div className="mt-3"><Provenance items={['Via Strava', 'Pace']} /></div>
              <div className="mt-2">
                <BtnGhost quiet={false} className="px-0">Ask CIA &rarr;</BtnGhost>
              </div>
            </div>
          </div>
        </GlassCard>

        <SolidCard className="shadow-[var(--glow-orange-sm)]">
          <div className="flex items-center gap-3">
            <button type="button" aria-label="Mark 3-mile easy run as complete" className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/20 text-white/30">
              <Circle size={22} strokeWidth={1.6} />
            </button>
            <div className="min-w-0 flex-1">
              <p className="text-[15px] font-medium leading-5 text-white">3-mile easy run</p>
              <p className="mt-0.5 flex items-center gap-1 text-[12px] leading-4 text-white/45">
                <Clock size={12} strokeWidth={1.9} /> Tomorrow
              </p>
            </div>
          </div>
        </SolidCard>

        <div className="space-y-2.5">
          {expandableSections.map(({ label, Icon, tone }) => (
            <button
              key={label}
              type="button"
              aria-expanded={false}
              className="flex min-h-14 w-full items-center justify-between rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3.5 text-left"
            >
              <span className="flex items-center gap-2.5">
                <Icon size={16} className={tone} strokeWidth={1.9} />
                <span className="text-[13px] font-semibold uppercase tracking-wide text-white/85">{label}</span>
              </span>
              <ChevronDown size={18} className="text-white/40" strokeWidth={1.9} />
            </button>
          ))}
        </div>

        <GlassCard tone="muted">
          <p className="text-[12px] font-semibold uppercase leading-4 text-white/45">Data & consent</p>
          <p className="mt-1 text-[12px] leading-4 text-white/55">
            Mission progress reads from Strava and your logged actions. Coaching support, not medical advice.
          </p>
          <ConsentRail compact />
        </GlassCard>
      </main>
    </HifiShell>
  )
}
