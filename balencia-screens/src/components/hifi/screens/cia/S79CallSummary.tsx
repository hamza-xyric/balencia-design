import { Clock, ListChecks, ShieldCheck, TrendingUp } from 'lucide-react'
import {
  ChatBubble,
  Chip,
  CIAInsightCard,
  GlassCard,
  HifiShell,
  IconButton,
  Provenance,
  BtnSecondary,
  SolidCard,
  TopBar,
} from '@/components/hifi/kit'

// Post-call debrief opened from Voice mode / Voice call history. Chosen
// state: default, fully parsed — duration, tone, composition, CIA insight,
// key moments, and action items all resolved. Skeleton (ghosted ToneGauge
// ring, sweeping composition bars), partial (duration and tone render
// first, transcript and CIA insight stay ghosted), error ("CIA couldn't
// summarize this call", hero swaps to a retry action), offline (cached
// summary + offline banner, follow-up scheduling disabled) are documented
// in the source spec rather than duplicated here — static prototype, no
// handlers. ToneGauge and CallArcTimeline are new primitives composed
// locally (not in the shared kit): ToneGauge never flips green, since a
// synthesized tone read is interpretive, not a completion metric;
// CallArcTimeline maps a finished call's real elapsed time, not a live
// processing trace. One Tiempos emphasis word: "summary" — the spec's own
// visual-system line names only this one, so "pacing" in the CIA insight
// below renders plain, deliberate type.
function ToneGauge({ value, label }: { value: number; label: string }) {
  const radius = 46
  const circumference = 2 * Math.PI * radius
  return (
    <div className="relative mx-auto flex h-40 w-40 items-center justify-center" role="img" aria-label={`Tone ${value}, ${label}`}>
      <svg viewBox="0 0 108 108" className="h-full w-full -rotate-90">
        <circle cx="54" cy="54" r={radius} fill="none" strokeWidth="7" className="stroke-white/[0.08]" />
        <circle
          cx="54"
          cy="54"
          r={radius}
          fill="none"
          strokeWidth="7"
          strokeLinecap="round"
          className="stroke-brand-orange"
          strokeDasharray={`${(value / 100) * circumference} ${circumference}`}
        />
      </svg>
      <div className="absolute flex flex-col items-center">
        <span className="text-[44px] font-semibold leading-none tabular-nums text-white">{value}</span>
        <span className="mt-1 text-[12px] font-semibold uppercase tracking-wider text-brand-orange">{label}</span>
      </div>
    </div>
  )
}

const keyMoments = [
  { label: '2m' },
  { label: '5m' },
  { label: '8m' },
  { label: '10m' },
]

function CallArcTimeline() {
  return (
    <div role="img" aria-label="Key moments at 2, 5, 8, and 10 minutes">
      <div className="relative h-3">
        <div className="absolute inset-x-0 top-1/2 h-[2px] -translate-y-1/2 bg-brand-orange" />
        <div className="relative flex items-center justify-between">
          {keyMoments.map(moment => (
            <span key={moment.label} className="h-3 w-3 rounded-full border-2 border-forest-green bg-ink-900" />
          ))}
        </div>
      </div>
      <div className="mt-2 flex justify-between text-[10px] font-medium tabular-nums text-white/40">
        {keyMoments.map(moment => (
          <span key={moment.label}>{moment.label}</span>
        ))}
      </div>
    </div>
  )
}

export function S79CallSummary() {
  return (
    <HifiShell
      atmosphere="cia"
      showTabBar={false}
      header={
        <TopBar
          title="Call summary"
          right={
            <IconButton label="Voice privacy controls">
              <ShieldCheck className="h-5 w-5" strokeWidth={1.9} />
            </IconButton>
          }
        />
      }
      bottomAction={<BtnSecondary>Schedule follow-up call</BtnSecondary>}
    >
      <main className="space-y-4 px-4 pb-4 pt-3">
        <GlassCard tone="cia" className="animate-fade-up px-6 pb-6 pt-6 text-center">
          <span className="text-[12px] font-semibold uppercase tracking-[0.16em] text-white/40">Morning coaching call</span>

          <div className="mt-4">
            <ToneGauge value={72} label="Warm" />
          </div>

          <p className="mt-1 text-[19px] leading-snug text-white/90">
            Your <span className="text-emphasis">summary</span> is clear for a tempo day.
          </p>

          <div className="mt-3 flex justify-center">
            <Chip tone="cia">Vocal pacing analyzed</Chip>
          </div>
        </GlassCard>

        <GlassCard tone="done" className="animate-fade-up p-4">
          <div className="grid grid-cols-3 divide-x divide-white/10">
            <div className="pr-2">
              <div className="flex items-center gap-1.5 text-white/40">
                <Clock className="h-3 w-3" strokeWidth={1.7} />
                <span className="text-[10px] font-semibold uppercase tracking-wider">Duration</span>
              </div>
              <div className="mt-1 text-[19px] font-semibold tabular-nums text-white">12m 04s</div>
              <div className="mt-1.5">
                <Chip tone="done">Auto-logged</Chip>
              </div>
            </div>
            <div className="px-2">
              <div className="flex items-center gap-1.5 text-white/40">
                <ListChecks className="h-3 w-3" strokeWidth={1.7} />
                <span className="text-[10px] font-semibold uppercase tracking-wider">Actions</span>
              </div>
              <div className="mt-1 text-[19px] font-semibold tabular-nums text-white">3 items</div>
              <div className="mt-1.5">
                <Chip tone="cia">CIA-detected</Chip>
              </div>
            </div>
            <div className="pl-2">
              <div className="flex items-center gap-1.5 text-white/40">
                <TrendingUp className="h-3 w-3" strokeWidth={1.7} />
                <span className="text-[10px] font-semibold uppercase tracking-wider">Shift</span>
              </div>
              <div className="mt-1 text-[19px] font-semibold tabular-nums text-white">15%</div>
              <div className="mt-1.5">
                <Chip tone="muted">Transcript parsed</Chip>
              </div>
            </div>
          </div>
        </GlassCard>

        <SolidCard className="glow-inner-you animate-fade-up p-4">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-white/50">Call composition</span>
            <span className="text-[12px] font-medium tabular-nums text-white/40">12m total</span>
          </div>

          {/* Segmented bar stays orange-only — domain color lives on the legend
              dots below, per canon's "never chrome" rule for domain tags. */}
          <div className="mt-3 flex h-2.5 gap-0.5 overflow-hidden rounded-pill bg-white/[0.06]">
            <div className="h-full rounded-l-pill bg-brand-orange" style={{ width: '41.6%' }} />
            <div className="h-full bg-brand-orange/70" style={{ width: '25%' }} />
            <div className="h-full rounded-r-pill bg-brand-orange/40" style={{ width: '33.4%' }} />
          </div>

          <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1.5">
            <div className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-domain-fitness" />
              <span className="text-[12px] text-white/70">Recovery</span>
              <span className="text-[12px] font-medium tabular-nums text-white/40">5m</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-domain-fitness/60" />
              <span className="text-[12px] text-white/70">Pace</span>
              <span className="text-[12px] font-medium tabular-nums text-white/40">3m</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-domain-nutrition" />
              <span className="text-[12px] text-white/70">Fueling</span>
              <span className="text-[12px] font-medium tabular-nums text-white/40">4m</span>
            </div>
          </div>
        </SolidCard>

        <CIAInsightCard eyebrow="CIA insight" provenance={['Via transcript', 'Via meal log']}>
          <p>Your pacing held because fueling happened early.</p>
          <div className="mt-3 flex gap-1.5">
            <span className="inline-flex items-center rounded-pill border border-domain-fitness/25 bg-domain-fitness/15 px-3 py-1 text-[11px] font-semibold text-domain-fitness">
              Fitness
            </span>
            <span className="inline-flex items-center rounded-pill border border-domain-nutrition/25 bg-domain-nutrition/15 px-3 py-1 text-[11px] font-semibold text-domain-nutrition">
              Nutrition
            </span>
          </div>
        </CIAInsightCard>

        <SolidCard className="glow-inner-done animate-fade-up p-4">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-white/50">Key moments</span>
          <div className="mt-6">
            <CallArcTimeline />
          </div>
        </SolidCard>

        <div className="space-y-2">
          <div className="flex items-center justify-between px-1">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-white/50">Action items</span>
            <span className="text-[12px] tabular-nums text-white/40">3 of 3</span>
          </div>

          <div className="flex min-h-11 items-center gap-3 rounded-xl border border-white/10 bg-white/[0.03] p-3">
            <span className="h-5 w-5 shrink-0 rounded-full border border-white/20" />
            <span className="flex-1 text-[14px] text-white/80">Check resting HRV tomorrow</span>
            <span className="inline-flex items-center rounded-pill border border-domain-fitness/25 bg-domain-fitness/15 px-2.5 py-1 text-[11px] font-semibold text-domain-fitness">
              Fitness
            </span>
          </div>

          <div className="flex min-h-11 items-center gap-3 rounded-xl border border-white/10 bg-white/[0.03] p-3">
            <span className="h-5 w-5 shrink-0 rounded-full border border-white/20" />
            <span className="flex-1 text-[14px] text-white/80">Adjust pre-workout nutrition</span>
            <span className="inline-flex items-center rounded-pill border border-domain-nutrition/25 bg-domain-nutrition/15 px-2.5 py-1 text-[11px] font-semibold text-domain-nutrition">
              Nutrition
            </span>
          </div>

          <div className="flex min-h-11 items-center gap-3 rounded-xl border border-white/10 bg-white/[0.03] p-3">
            <span className="h-5 w-5 shrink-0 rounded-full border border-white/20" />
            <span className="flex-1 text-[14px] text-white/80">Log wind-down time before 10 pm</span>
            <span className="inline-flex items-center rounded-pill border border-domain-sleep/25 bg-domain-sleep/15 px-2.5 py-1 text-[11px] font-semibold text-domain-sleep">
              Sleep
            </span>
          </div>
        </div>

        <div className="space-y-2">
          <span className="block px-1 text-[11px] font-semibold uppercase tracking-wider text-white/50">Transcript highlights</span>
          <ChatBubble speaker="CIA" tone="cia">
            Let&rsquo;s lock in that pacing rule.
          </ChatBubble>
        </div>

        <div className="flex justify-center">
          <Provenance items={['Transcript parsed']} />
        </div>
      </main>
    </HifiShell>
  )
}
