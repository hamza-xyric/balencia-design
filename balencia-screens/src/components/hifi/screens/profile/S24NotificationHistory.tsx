import { Check, MoreHorizontal } from 'lucide-react'
import {
  Chip,
  GlassCard,
  HifiShell,
  TopBar,
  SectionTitle,
  TrendChart,
  Provenance,
} from '@/components/hifi/kit'

export function S24NotificationHistory() {
  return (
    <HifiShell
      header={
        <TopBar
          title="Notifications"
          back
          right={
            <button type="button" className="flex h-11 min-h-11 items-center justify-center gap-1 px-2 text-[13px] font-medium text-brand-orange">
              <Check className="h-4 w-4" />
              <span>Mark all read</span>
            </button>
          }
        />
      }
      activeTab="me"
      atmosphere="you"
    >
      <main className="space-y-4 px-4 pb-4 pt-3">
        <div className="flex items-end justify-between">
          <div className="space-y-1">
            <SectionTitle title="Activity <span className='text-emphasis'>history</span>" meta="Last 7 days" />
          </div>
          <div className="w-24">
            <TrendChart past={[2, 5, 3, 8, 4, 6, 3]} height={32} />
          </div>
        </div>

        <div className="-mx-4 flex gap-2 overflow-x-auto px-4 hide-scrollbar">
          <Chip tone="cia">CIA 3</Chip>
          <Chip tone="you">Reminders 2</Chip>
          <Chip tone="muted">Check-ins 0</Chip>
          <Chip tone="done">Social 1</Chip>
        </div>

        <div className="sticky top-0 z-10 -mx-4 border-b border-white/10 bg-ink-900/80 px-4 py-3 backdrop-blur-md">
          <h2 className="text-xs font-medium uppercase tracking-[0.2em] text-white/60">Today</h2>
        </div>

        <div className="space-y-3">
          <GlassCard tone="you">
            <button type="button" className="flex min-h-11 w-full items-start gap-3 py-1 text-left">
              <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-brand-orange shadow-[var(--glow-orange-sm)]" />
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="rounded bg-domain-fitness/15 px-1.5 py-0.5 text-[10px] font-medium uppercase tracking-wide text-domain-fitness">Sleep</span>
                  <span className="text-[13px] font-semibold text-white">Sleep dipped to 6.2h</span>
                </div>
                <p className="mt-0.5 text-[13px] text-white/60">Sleep impacts spend.</p>
                <Provenance items={['Via WHOOP', '2m ago']} />
              </div>
              <MoreHorizontal className="h-4 w-4 text-white/40" />
            </button>
          </GlassCard>

          <GlassCard tone="muted">
            <button type="button" className="flex min-h-11 w-full items-start gap-3 py-1 text-left">
              <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-transparent" />
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="rounded bg-domain-nutrition/15 px-1.5 py-0.5 text-[10px] font-medium uppercase tracking-wide text-domain-nutrition">Reminder</span>
                  <span className="text-[13px] font-semibold text-white">Time to log your morning meal</span>
                </div>
                <p className="mt-0.5 text-[13px] text-white/60">Nutrition reminder.</p>
                <Provenance items={['You logged', '1h ago']} />
              </div>
              <MoreHorizontal className="h-4 w-4 text-white/40" />
            </button>
          </GlassCard>

          <GlassCard tone="muted">
            <button type="button" className="flex min-h-11 w-full items-start gap-3 py-1 text-left">
              <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-transparent" />
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="rounded bg-domain-social/15 px-1.5 py-0.5 text-[10px] font-medium uppercase tracking-wide text-domain-social">Social</span>
                  <span className="text-[13px] font-semibold text-white">Alex finished a 7-day streak</span>
                </div>
                <p className="mt-0.5 text-[13px] text-white/60">Community update.</p>
                <Provenance items={['Via Balencia', '6h ago']} />
              </div>
              <MoreHorizontal className="h-4 w-4 text-white/40" />
            </button>
          </GlassCard>
        </div>

        <div className="sticky top-0 z-10 -mx-4 border-b border-white/10 bg-ink-900/80 px-4 py-3 backdrop-blur-md">
          <h2 className="text-xs font-medium uppercase tracking-[0.2em] text-white/60">Yesterday</h2>
        </div>

        <div className="space-y-3">
          <GlassCard tone="muted">
            <button type="button" className="flex min-h-11 w-full items-start gap-3 py-1 text-left">
              <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-transparent" />
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="rounded bg-royal-purple/15 px-1.5 py-0.5 text-[10px] font-medium uppercase tracking-wide text-royal-purple">CIA</span>
                  <span className="text-[13px] font-semibold text-white">Stress levels are trending down</span>
                </div>
                <p className="mt-0.5 text-[13px] text-white/60">CIA Insight.</p>
                <Provenance items={['Via WHOOP', '1d']} />
              </div>
              <MoreHorizontal className="h-4 w-4 text-white/40" />
            </button>
          </GlassCard>

          <GlassCard tone="muted">
            <button type="button" className="flex min-h-11 w-full items-start gap-3 py-1 text-left">
              <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-transparent" />
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="rounded bg-domain-fitness/15 px-1.5 py-0.5 text-[10px] font-medium uppercase tracking-wide text-domain-fitness">Mission</span>
                  <span className="text-[13px] font-semibold text-white">Half marathon mission updated</span>
                </div>
                <p className="mt-0.5 text-[13px] text-white/60">You are at 68 percent.</p>
                <Provenance items={['You logged', '1d']} />
              </div>
              <MoreHorizontal className="h-4 w-4 text-white/40" />
            </button>
          </GlassCard>
        </div>
      </main>
    </HifiShell>
  )
}