import { Flame, AlertTriangle, BookOpen, Users, Lock, Check } from 'lucide-react'
import {
  HifiShell,
  TopBar,
  GlassCard,
  SolidCard,
  SectionTitle,
  Chip,
  Provenance,
  ProgressRing,
  ProgressBar,
  TrendChart,
  BtnPrimary,
  CIAInsightCard,
  FloatingQuickLog
} from '@/components/hifi/kit'

export function S32CareerDashboard() {
  return (
    <HifiShell
      header={<TopBar title="Career & Work" eyebrow="Lv 12 · Amira" right={<Chip tone="you">Lv 12</Chip>} back />}
      activeTab="today"
      bottomAction={<FloatingQuickLog label="Log Action" />}
    >
      <main className="space-y-4 px-4 pb-4 pt-3">
        <p className="text-xs text-white/45">
          Your career <span className="text-emphasis">dashboard</span>.
        </p>

        <CIAInsightCard
          eyebrow="CIA Synthesis"
          provenance={['Derived · CIA Engine']}
          actions={<BtnPrimary className="w-full">Plan deep work block</BtnPrimary>}
        >
          <p className="text-sm text-white/80">
            Productivity peaks after morning workouts. Schedule deep work for 10am?
          </p>
        </CIAInsightCard>

        <div>
          <SectionTitle title="Active Missions" meta="3 Total" />

          <GlassCard tone="you">
            <div className="flex items-center gap-4 p-4">
              <ProgressRing percent={64} value="64%" size={96} tone="you" label="Progress" />
              <div className="flex-1 space-y-1.5">
                <h3 className="text-base text-white">Get Promoted To Senior</h3>
                <p className="text-xs text-white/55">Next: Refresh Portfolio</p>
                <div className="pt-1">
                  <Provenance items={['Via Goals API']} />
                </div>
              </div>
            </div>
          </GlassCard>

          <div className="mt-3 grid grid-cols-2 gap-3">
            <SolidCard>
              <div className="flex flex-col items-start gap-3 p-4">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-white/[0.04] text-brand-orange">
                  <BookOpen size={20} />
                </div>
                <div className="space-y-1">
                  <h4 className="text-sm text-white">Learn Python</h4>
                  <p className="text-xs text-white/45">Beginner Track</p>
                </div>
                <ProgressBar value={32} tone="you" />
              </div>
            </SolidCard>
            <SolidCard>
              <div className="flex flex-col items-start gap-3 p-4">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-white/[0.04] text-brand-orange">
                  <Users size={20} />
                </div>
                <div className="space-y-1">
                  <h4 className="text-sm text-white">Reach Mentor</h4>
                  <p className="text-xs text-white/45">Network Growth</p>
                  <ProgressBar value={50} tone="you" />
                </div>
              </div>
            </SolidCard>
          </div>
        </div>

        <div>
          <SectionTitle title="Today's Actions" meta="2 Remaining" />
          <SolidCard>
            <div>
              <button type="button" className="flex w-full min-h-14 items-center gap-3 p-4 text-left">
                <div className="flex h-6 w-6 items-center justify-center rounded-md bg-forest-green text-ink-900">
                  <Check size={16} strokeWidth={3} />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-white/50 line-through">Review Quarterly Missions</p>
                </div>
                <span className="text-xs font-medium text-white/40 tabular-nums">+10 XP</span>
              </button>
              <div className="mx-4 border-t border-white/10" />
              <button type="button" className="flex w-full min-h-14 items-center gap-3 p-4 text-left">
                <div className="h-6 w-6 rounded-md border border-white/20" />
                <div className="flex-1">
                  <p className="text-sm text-white">Read 1 Chapter Of Deep Work</p>
                </div>
                <span className="text-xs font-medium text-brand-orange tabular-nums">+15 XP</span>
              </button>
            </div>
          </SolidCard>
        </div>

        <div>
          <SectionTitle title="Growth Trajectory" />
          <SolidCard>
            <div className="space-y-4 p-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-white/80">Communication</span>
                  <span className="text-sm text-white tabular-nums">
                    <span className="font-semibold">8</span>
                    <span className="text-white/40"> / 10</span>
                  </span>
                </div>
                <div className="relative h-2 w-full rounded-full bg-white/[0.06]">
                  <div className="h-full w-[80%] rounded-full bg-brand-orange" />
                  <div className="absolute right-[20%] top-1/2 h-3 w-0.5 -translate-y-1/2 bg-white/40" />
                </div>
                <div className="flex justify-end">
                  <Provenance items={['You Logged']} />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-white/80">System Design</span>
                  <span className="text-sm text-white tabular-nums">
                    <span className="font-semibold">6</span>
                    <span className="text-white/40"> / 10</span>
                  </span>
                </div>
                <div className="relative h-2 w-full rounded-full bg-white/[0.06]">
                  <div className="h-full w-[60%] rounded-full bg-brand-orange" />
                  <div className="absolute right-[20%] top-1/2 h-3 w-0.5 -translate-y-1/2 bg-white/40" />
                </div>
              </div>

              <div className="pt-2">
                <div className="mb-3 flex items-center justify-between">
                  <span className="text-xs text-white/60">6-Week Momentum</span>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold text-brand-orange tabular-nums">+14 pts</span>
                    <Provenance items={['Derived · CIA Engine']} />
                  </div>
                </div>
                <TrendChart past={[4, 6, 5, 8, 7, 9]} projected={[10, 12]} milestones={[3, 5]} label="Momentum Trend" />
              </div>
            </div>
          </SolidCard>
        </div>

        <div>
          <SectionTitle title="Upcoming" />
          <div className="grid grid-cols-2 gap-3">
            <SolidCard>
              <div className="flex min-h-11 flex-col gap-2 p-4">
                <div className="flex items-center gap-2">
                  <span className="text-lg font-semibold text-white tabular-nums">26</span>
                  <span className="text-xs text-white/45">Days</span>
                </div>
                <span className="text-sm text-white/80">Review</span>
                <Chip tone="muted">Scope · Work</Chip>
              </div>
            </SolidCard>
            <SolidCard>
              <div className="flex min-h-11 flex-col gap-2 p-4">
                <div className="flex items-center gap-2">
                  <span className="text-lg font-semibold text-brand-orange tabular-nums">2</span>
                  <span className="text-xs text-white/45">Days</span>
                  <AlertTriangle size={14} className="text-brand-orange" />
                </div>
                <span className="text-sm text-white/80">Project Deadline</span>
                <Chip tone="you">Approaching</Chip>
              </div>
            </SolidCard>
          </div>
        </div>

        <div>
          <SectionTitle title="High Motivation" />
          <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] p-4">
            <div className="relative z-10 flex items-center justify-between">
              <div className="flex items-center gap-2 text-white/80">
                <Flame size={16} className="text-brand-orange" />
                <span className="text-sm">Consistency Heatmap</span>
              </div>
              <div className="flex items-center gap-1.5 text-brand-orange">
                <Lock size={14} />
                <span className="text-xs">Premium</span>
              </div>
            </div>
            <div className="relative z-10 mt-3 text-xs text-white/40">
              <p>Unlock detailed pattern analysis.</p>
            </div>
            <div className="absolute inset-0 z-0 backdrop-blur-md" />
          </div>
        </div>

      </main>
    </HifiShell>
  )
}