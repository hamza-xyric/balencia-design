import { Lock, Plus } from 'lucide-react'
import {
  BtnPrimary,
  Chip,
  GlassCard,
  HifiShell,
  Provenance,
  ProgressRing,
  ProgressBar,
  SectionTitle,
  TopBar,
} from '@/components/hifi/kit'

export function S71AchievementGallery() {
  return (
    <HifiShell header={<TopBar title="Achievements" />} activeTab="me">
      <main className="space-y-4 px-4 pb-4 pt-3">
        <GlassCard tone="you">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <ProgressRing
                percent={39}
                value="39%"
                label="Complete"
                size={48}
                tone="you"
              />
              <div>
                <p className="text-xs text-white/45">Total earned</p>
                <p className="text-2xl font-semibold tabular-nums text-white">
                  47 / 120
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-xs text-white/45">This month</p>
              <p className="text-2xl font-semibold tabular-nums text-white">12</p>
              <p className="text-xs text-brand-orange tabular-nums">+3 earned</p>
            </div>
          </div>

          <div className="mt-4 border-t border-white/10 pt-3">
            <p className="text-xs text-white/45">Your <span className="text-emphasis">streak</span> starts today</p>
            <ProgressBar value={0} tone="you" />
          </div>

          <div className="mt-3">
            <Provenance items={['Balencia summary', 'Synced today']} />
          </div>
        </GlassCard>

        <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-3">
          <p className="mb-2 text-xs uppercase tracking-wide text-white/45">Domain coverage</p>
          <div className="flex gap-2 overflow-x-auto hide-scrollbar">
            <div className="flex h-11 min-h-11 w-20 shrink-0 flex-col justify-center rounded-lg border border-white/10 bg-white/[0.03] px-2">
              <span className="text-[10px] text-white/45">Fitness</span>
              <span className="text-sm font-semibold text-white tabular-nums">12</span>
            </div>
            <div className="flex h-11 min-h-11 w-20 shrink-0 flex-col justify-center rounded-lg border border-white/10 bg-white/[0.03] px-2">
              <span className="text-[10px] text-white/45">Nutrition</span>
              <span className="text-sm font-semibold text-white tabular-nums">8</span>
            </div>
            <div className="flex h-11 min-h-11 w-20 shrink-0 flex-col justify-center rounded-lg border border-white/10 bg-white/[0.03] px-2">
              <span className="text-[10px] text-white/45">Finance</span>
              <span className="text-sm font-semibold text-white tabular-nums">5</span>
            </div>
            <div className="flex h-11 min-h-11 w-20 shrink-0 flex-col justify-center rounded-lg border border-white/10 bg-white/[0.03] px-2">
              <span className="text-[10px] text-white/45">Sleep</span>
              <span className="text-sm font-semibold text-white tabular-nums">7</span>
            </div>
            <div className="flex h-11 min-h-11 w-20 shrink-0 items-center justify-center gap-1 rounded-lg border border-white/10 bg-white/[0.03] px-2 text-white/45">
              <Plus className="h-3 w-3" />
              <span className="text-xs">More</span>
            </div>
          </div>
        </div>

        <div className="flex gap-2 overflow-x-auto hide-scrollbar">
          <Chip tone="you">All</Chip>
          <Chip>Fitness</Chip>
          <Chip>Nutrition</Chip>
          <Chip>Finance</Chip>
        </div>

        <SectionTitle title="Earned missions" meta="Sorted by date" />

        <div className="grid grid-cols-2 gap-3">
          <GlassCard tone="done">
            <div className="mb-3 flex h-20 w-20 items-center justify-center rounded-full bg-white/[0.06]">
              <span className="text-2xl">🏆</span>
            </div>
            <p className="text-sm font-semibold text-white">First 5k Run</p>
            <p className="text-xs text-white/45">Earned Oct 12</p>
          </GlassCard>

          <GlassCard tone="done">
            <div className="mb-3 flex h-20 w-20 items-center justify-center rounded-full bg-white/[0.06]">
              <span className="text-2xl">🥗</span>
            </div>
            <p className="text-sm font-semibold text-white">Greens Week</p>
            <p className="text-xs text-white/45">Earned Oct 08</p>
          </GlassCard>
        </div>

        <SectionTitle title="Locked missions" meta="In progress" />

        <div className="grid grid-cols-2 gap-3">
          <GlassCard tone="muted">
            <div className="relative mb-3 flex h-20 w-20 items-center justify-center rounded-full bg-white/[0.03]">
              <Lock className="h-6 w-6 text-white/45" />
              <svg className="absolute inset-0 h-full w-full -rotate-90" viewBox="0 0 36 36">
                <circle cx="18" cy="18" r="16" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="2" />
                <circle cx="18" cy="18" r="16" fill="none" stroke="rgb(255, 122, 0)" strokeWidth="2" strokeDasharray="24 100" strokeLinecap="round" />
              </svg>
            </div>
            <p className="text-sm font-semibold text-white">Half Marathon</p>
            <p className="text-xs text-white/45">24% complete</p>
          </GlassCard>

          <GlassCard tone="muted">
            <div className="relative mb-3 flex h-20 w-20 items-center justify-center rounded-full bg-white/[0.03]">
              <Lock className="h-6 w-6 text-white/45" />
              <svg className="absolute inset-0 h-full w-full -rotate-90" viewBox="0 0 36 36">
                <circle cx="18" cy="18" r="16" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="2" />
                <circle cx="18" cy="18" r="16" fill="none" stroke="rgb(255, 122, 0)" strokeWidth="2" strokeDasharray="42 100" strokeLinecap="round" />
              </svg>
            </div>
            <p className="text-sm font-semibold text-white">Save $5,000</p>
            <p className="text-xs text-white/45">42% complete</p>
          </GlassCard>
        </div>

        <BtnPrimary className="w-full">View all missions</BtnPrimary>
      </main>
    </HifiShell>
  )
}