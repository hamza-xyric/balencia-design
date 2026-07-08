import { Bell, Check, Clock, Flame, Settings } from 'lucide-react'
import {
  HifiShell,
  TopBar,
  GlassCard,
  SolidCard,
  Chip,
  SectionTitle,
  ProgressBar,
  Provenance,
  CIAInsightCard,
  FloatingQuickLog,
  BtnGhost,
  HeatGrid,
  IconButton,
} from '@/components/hifi/kit'

export function S38Habits() {
  return (
    <HifiShell
      header={
        <TopBar
          title="Habits"
          back
          right={
            <div className="flex items-center gap-1">
              <IconButton label="Notifications">
                <Bell className="h-5 w-5" />
              </IconButton>
              <IconButton label="Settings">
                <Settings className="h-5 w-5" />
              </IconButton>
            </div>
          }
        />
      }
      activeTab="today"
      bottomAction={<FloatingQuickLog label="Log habit" />}
    >
      <main className="space-y-5 px-4 pb-6 pt-3">
        <GlassCard tone="you">
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <p className="text-[13px] font-medium uppercase tracking-[0.18em] text-white/60">
                Momentum today
              </p>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-semibold tabular-nums text-white">5</span>
                <span className="text-sm text-white/60">Of 8 <span className="text-emphasis">habits</span></span>
              </div>
            </div>
            <div className="flex flex-col items-end gap-2">
              <div className="flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1">
                <Flame className="h-3.5 w-3.5 text-brand-orange" />
                <span className="text-xs font-medium tabular-nums text-white/80">21 Days</span>
              </div>
              <Provenance items={['You logged']} />
            </div>
          </div>
          <div className="mt-4">
            <ProgressBar value={62} tone="you" />
            <div className="mt-1.5 flex justify-between text-[11px] text-white/45">
              <span>62% Complete</span>
              <span>Sync pending</span>
            </div>
          </div>
        </GlassCard>

        <div className="flex gap-2">
          <button
            type="button"
            className="flex h-11 flex-1 items-center justify-center rounded-xl border border-white/10 bg-white/[0.06] text-sm font-medium text-white"
          >
            Today
          </button>
          <button
            type="button"
            className="flex h-11 flex-1 items-center justify-center rounded-xl border border-white/10 bg-transparent text-sm font-medium text-white/55"
          >
            Week
          </button>
          <button
            type="button"
            className="flex h-11 flex-1 items-center justify-center rounded-xl border border-white/10 bg-transparent text-sm font-medium text-white/55"
          >
            Month
          </button>
        </div>

        <SolidCard>
          <div className="space-y-3 p-4">
            <div className="flex items-center gap-2">
              <div className="h-1.5 w-1.5 rounded-full bg-amber-400/80" />
              <h3 className="text-xs font-medium uppercase tracking-[0.18em] text-white/60">Morning</h3>
            </div>
            <div className="space-y-2">
              <button
                type="button"
                className="flex w-full min-h-11 items-center gap-3 rounded-lg border border-white/[0.06] bg-white/[0.02] px-3 py-2.5 text-left"
              >
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-forest-green/20 text-forest-green">
                  <Check className="h-3.5 w-3.5" strokeWidth={3} />
                </span>
                <div className="flex flex-1 items-center justify-between">
                  <span className="text-sm font-medium text-white/40 line-through">Drink water</span>
                  <div className="flex items-center gap-1.5">
                    <Clock className="h-3 w-3 text-white/30" />
                    <span className="text-[11px] tabular-nums text-white/40">07:30</span>
                    <Chip tone="muted">Health</Chip>
                  </div>
                </div>
              </button>
              <button
                type="button"
                className="flex w-full min-h-11 items-center gap-3 rounded-lg border border-white/[0.06] bg-white/[0.02] px-3 py-2.5 text-left"
              >
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-forest-green/20 text-forest-green">
                  <Check className="h-3.5 w-3.5" strokeWidth={3} />
                </span>
                <div className="flex flex-1 items-center justify-between">
                  <span className="text-sm font-medium text-white/40 line-through">Stretch</span>
                  <div className="flex items-center gap-1.5">
                    <Clock className="h-3 w-3 text-white/30" />
                    <span className="text-[11px] tabular-nums text-white/40">08:00</span>
                    <Chip tone="muted">Fitness</Chip>
                  </div>
                </div>
              </button>
            </div>
          </div>
        </SolidCard>

        <SolidCard>
          <div className="space-y-3 p-4">
            <div className="flex items-center gap-2">
              <div className="h-1.5 w-1.5 rounded-full bg-orange-400/80" />
              <h3 className="text-xs font-medium uppercase tracking-[0.18em] text-white/60">Afternoon</h3>
            </div>
            <div className="space-y-2">
              <button
                type="button"
                className="flex w-full min-h-11 items-center gap-3 rounded-lg border border-white/10 bg-white/[0.04] px-3 py-2.5 text-left shadow-[var(--glow-orange-sm)]"
              >
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-brand-orange/60 bg-brand-orange/10 text-brand-orange">
                  <span className="h-2 w-2 rounded-sm bg-brand-orange/80" />
                </span>
                <div className="flex flex-1 items-center justify-between">
                  <span className="text-sm font-medium text-white">Walk 10 min</span>
                  <div className="flex items-center gap-1.5">
                    <span className="rounded-full bg-brand-orange/15 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-brand-orange">
                      Due now
                    </span>
                  </div>
                </div>
              </button>
              <button
                type="button"
                className="flex w-full min-h-11 items-center gap-3 rounded-lg border border-white/[0.06] bg-white/[0.02] px-3 py-2.5 text-left"
              >
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-white/20 bg-white/[0.02]" />
                <div className="flex flex-1 items-center justify-between">
                  <span className="text-sm font-medium text-white">Deep work block</span>
                  <div className="flex items-center gap-1.5">
                    <Clock className="h-3 w-3 text-white/40" />
                    <span className="text-[11px] tabular-nums text-white/50">14:00</span>
                    <Chip tone="muted">Career</Chip>
                  </div>
                </div>
              </button>
            </div>
          </div>
        </SolidCard>

        <SolidCard>
          <div className="space-y-4 p-4">
            <SectionTitle title="Consistency" meta="4 weeks" />
            <HeatGrid values={[2, 3, 1, 3, 2, 3, 3, 3, 2, 1, 3, 2, 3, 3, 2, 3, 3, 3, 2, 3, 1, 2, 3, 3, 2, 3, 3, 2]} columns={7} />
            <Provenance items={['Local completions']} />
          </div>
        </SolidCard>

        <CIAInsightCard
          eyebrow="Pattern read"
          provenance={['Sleep correlation', 'Habit history']}
          actions={<BtnGhost>Ask CIA why</BtnGhost>}
        >
          <p className="text-sm leading-relaxed text-white/85">
            Sleep is strongest on days you complete your morning stretch habit.
          </p>
        </CIAInsightCard>
      </main>
    </HifiShell>
  )
}