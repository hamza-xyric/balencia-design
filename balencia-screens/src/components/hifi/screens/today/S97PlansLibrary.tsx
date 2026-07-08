import { ArrowRight, Check, Clock, Dumbbell, Filter, Lock, Moon, PiggyBank } from 'lucide-react'
import {
  BtnGhost,
  BtnPrimary,
  BtnSecondary,
  CIAInsightCard,
  ConsentRail,
  GlassCard,
  HifiShell,
  ProgressBar,
  SectionTitle,
  SolidCard,
  TopBar,
} from '@/components/hifi/kit'

// Live at /plans, placed under Missions/Growth rather than claimed as a
// primary tab route. Chosen state: default, one active plan mid-week, one
// CIA adjustment pending, three shelved plans of mixed provenance. Skeleton
// (hero timeline, tabs, and three rows keep geometry), empty (no active
// plan, mission-based starter and CIA draft option in its place), error
// (cached plans stay visible, failed sync names the source), and the
// draft/start/unlock disabled states when entitlement, consent, or
// connectivity block them are documented in the source spec rather than
// duplicated here — static prototype, no handlers.
export function S97PlansLibrary() {
  return (
    <HifiShell
      header={
        <TopBar
          title="Plans"
          right={
            <button
              type="button"
              aria-label="Draft filter toggle"
              aria-pressed={false}
              className="flex h-11 w-11 items-center justify-center rounded-full text-white/60"
            >
              <Filter className="h-5 w-5" strokeWidth={1.9} />
            </button>
          }
        />
      }
      activeTab="goals"
    >
      <main className="space-y-5 px-4 pb-8 pt-3">
        <GlassCard tone="you">
          <p className="text-[12px] font-semibold uppercase tracking-wide text-white/45">Active mission</p>
          <h2 className="mt-1 text-[19px] font-semibold leading-6 text-white">Run a half marathon</h2>
          <p className="mt-1 text-[13px] tabular-nums text-white/55">Week 3 of 8</p>

          <ActivePlanPath />

          <div className="mt-4 flex items-center gap-2 text-[13px] text-white/75">
            <Clock className="h-4 w-4 text-brand-orange" strokeWidth={1.9} />
            <span className="tabular-nums">Tomorrow &middot; 6:30 am</span>
            <span className="text-white/30">&middot;</span>
            <span className="text-white/55">Hard run</span>
          </div>

          <div className="mt-4 flex gap-2">
            <BtnPrimary className="flex-1">Resume plan</BtnPrimary>
            <BtnSecondary className="flex-1">Adjust with CIA</BtnSecondary>
          </div>
        </GlassCard>

        <CIAInsightCard
          eyebrow="CIA suggests"
          provenance={['Via sleep + training plan']}
          actions={
            <>
              <BtnSecondary>Dismiss</BtnSecondary>
              <BtnGhost>Accept</BtnGhost>
            </>
          }
        >
          Sleep suggests moving the hard run one day later for better recovery.
        </CIAInsightCard>

        <div role="tablist" aria-label="Filter missions" className="flex h-11 items-center gap-1 rounded-pill border border-white/10 bg-white/[0.03] p-1">
          <button type="button" role="tab" aria-selected={true} className="flex h-full flex-1 items-center justify-center rounded-pill bg-white/10 text-[13px] font-semibold text-white">
            All
          </button>
          <button type="button" role="tab" aria-selected={false} className="flex h-full flex-1 items-center justify-center rounded-pill text-[13px] font-medium text-white/45">
            Active
          </button>
          <button type="button" role="tab" aria-selected={false} className="flex h-full flex-1 items-center justify-center rounded-pill text-[13px] font-medium text-white/45">
            Completed
          </button>
          <button type="button" role="tab" aria-selected={false} className="flex h-full flex-1 items-center justify-center rounded-pill text-[13px] font-medium text-white/45">
            Paused
          </button>
        </div>

        <section className="space-y-3">
          <SolidCard>
            <div className="flex items-start gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-domain-fitness/15">
                <Dumbbell className="h-5 w-5 text-domain-fitness" strokeWidth={1.9} />
              </span>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="text-[15px] font-semibold text-white">Strength reset</h3>
                  <span className="rounded-pill border border-royal-purple/25 bg-royal-purple/15 px-2 py-0.5 text-[10px] font-semibold text-royal-purple">Via CIA</span>
                </div>
                <p className="mt-0.5 text-[12px] tabular-nums text-white/45">4 weeks &middot; beginner</p>
                <div className="mt-2"><ProgressBar value={12} tone="you" /></div>
              </div>
            </div>
          </SolidCard>

          <SolidCard className="relative overflow-hidden p-0">
            <div className="flex items-start gap-3 p-4 opacity-50 blur-[2px]" aria-hidden="true">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-domain-finance/15">
                <PiggyBank className="h-5 w-5 text-domain-finance" strokeWidth={1.9} />
              </span>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="text-[15px] font-semibold text-white">Savings mission template</h3>
                  <span className="rounded-pill border border-white/15 bg-white/10 px-2 py-0.5 text-[10px] font-semibold text-white/55">Locked template</span>
                </div>
                <p className="mt-0.5 text-[12px] text-white/45">12-week structure &middot; generic preview</p>
              </div>
            </div>
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-ink-900/75 px-6 text-center">
              <span className="flex h-9 w-9 items-center justify-center rounded-full border border-royal-purple/35 bg-royal-purple/15">
                <Lock className="h-4 w-4 text-royal-purple" strokeWidth={1.9} />
              </span>
              <p className="text-[11px] font-semibold uppercase tracking-wide text-royal-purple">Premium mission</p>
              <p className="max-w-[220px] text-[12px] leading-4 text-white/60">Personalized previews need consent and entitlement.</p>
              <BtnSecondary className="h-9 text-[13px]">
                <Lock className="mr-1.5 h-3.5 w-3.5" strokeWidth={1.9} />
                Unlock with premium
              </BtnSecondary>
            </div>
          </SolidCard>

          <SolidCard>
            <div className="flex items-start gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-domain-sleep/15">
                <Moon className="h-5 w-5 text-domain-sleep" strokeWidth={1.9} />
              </span>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="text-[15px] font-semibold text-white">Evening wind-down</h3>
                  <span className="rounded-pill border border-white/15 bg-white/10 px-2 py-0.5 text-[10px] font-semibold text-white/55">Saved</span>
                </div>
                <p className="mt-0.5 text-[12px] text-white/45">Daily ritual &middot; 15 minutes</p>
              </div>
            </div>
          </SolidCard>
        </section>

        <div className="rounded-2xl border border-dashed border-white/15 bg-white/[0.02] p-5 text-center">
          <span className="mx-auto flex h-11 w-11 items-center justify-center rounded-full border border-royal-purple/30 bg-royal-purple/10">
            <ArrowRight className="h-5 w-5 text-royal-purple" strokeWidth={1.9} />
          </span>
          <p className="mt-3 text-[14px] font-semibold text-white">Ask CIA to draft your next mission</p>
          <p className="mx-auto mt-1 max-w-[240px] text-[12px] leading-4 text-white/45">Describe an outcome and CIA will propose an honest starting point.</p>
          <div className="mt-4 flex justify-center">
            <BtnGhost>Draft with CIA</BtnGhost>
          </div>
        </div>

        <section className="space-y-2">
          <SectionTitle title="Controls" meta="Edit &middot; pause &middot; archive" />
          <SolidCard className="space-y-1 p-0">
            <button type="button" className="flex min-h-11 w-full items-center justify-between px-4 py-3 text-left text-[14px] text-white/80">
              <span>Pause active mission</span>
              <span className="text-[11px] italic text-white/40">Honest recovery, never failure</span>
            </button>
            <button type="button" className="flex min-h-11 w-full items-center justify-between px-4 py-3 text-left text-[14px] text-white/80">
              <span>Export mission data</span>
              <ArrowRight className="h-4 w-4 text-white/30" strokeWidth={1.9} />
            </button>
            <button type="button" className="flex min-h-11 w-full items-center justify-between px-4 py-3 text-left text-[14px] text-white/80">
              <span>Revoke CIA memory</span>
              <ArrowRight className="h-4 w-4 text-white/30" strokeWidth={1.9} />
            </button>
          </SolidCard>
        </section>

        <div className="flex justify-center">
          <ConsentRail compact />
        </div>
      </main>
    </HifiShell>
  )
}

// NEW: ActivePlanPath — a horizontal milestone spine with the current week,
// the next honest step, and its source. A layout primitive, not a chart.
function ActivePlanPath() {
  return (
    <div className="relative mt-4 px-1 pb-1" role="img" aria-label="Plan path: start done, week 3 current, 5K tempo next, week 8 upcoming">
      <div className="absolute left-4 right-4 top-[15px] h-[2px] rounded-pill bg-white/10" />
      <div className="absolute left-4 top-[15px] h-[2px] w-[40%] rounded-pill bg-brand-orange shadow-[var(--glow-orange-sm)]" />
      <div className="relative flex items-start justify-between">
        <div className="flex w-12 flex-col items-center gap-1.5">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-forest-green shadow-[var(--glow-green-sm)]">
            <Check className="h-4 w-4 text-ink-900" strokeWidth={3} />
          </span>
          <span className="text-[10px] font-semibold uppercase tracking-wide text-white/45">Start</span>
        </div>
        <div className="flex w-14 flex-col items-center gap-1.5">
          <span className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-brand-orange bg-ink-900 shadow-[var(--glow-orange-sm)]" />
          <span className="text-[11px] font-semibold tabular-nums text-brand-orange">Week 3</span>
        </div>
        <div className="flex w-20 flex-col items-center gap-1.5 text-center">
          <span className="flex h-8 w-8 items-center justify-center rounded-full border border-brand-orange/60 bg-white/[0.04]">
            <span className="h-2 w-2 rounded-full bg-brand-orange" />
          </span>
          <span className="text-[11px] font-semibold leading-4 text-white">5K tempo</span>
          <span className="text-[10px] leading-3 text-white/45">Next <span className="text-emphasis text-brand-orange">right</span> step</span>
        </div>
        <div className="flex w-12 flex-col items-center gap-1.5">
          <span className="flex h-8 w-8 items-center justify-center rounded-full border border-white/15 bg-white/[0.03]" />
          <span className="text-[10px] font-semibold uppercase tracking-wide text-white/45">Week 8</span>
        </div>
      </div>
    </div>
  )
}
