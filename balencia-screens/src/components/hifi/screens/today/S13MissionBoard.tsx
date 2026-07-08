import { Check, Flag, MoreHorizontal } from 'lucide-react'
import { PhoneFrame } from '@/components/layout/PhoneFrame'
import { ScreenShell } from '@/components/layout/ScreenShell'
import { Chip, FloatingQuickLog, GlassCard, IconButton, MetricPill, MiniRadar, ProgressBar, SectionTitle, SolidCard, TopBar, cx } from '@/components/hifi/kit'

export function S13MissionBoard() {
  const missions = [
    ['Morning sunlight', 72, 'Wellbeing'],
    ['Finalize Q3 report', 46, 'Career'],
    ['Run 5K', 61, 'Fitness'],
    ['Hydrate', 100, 'Daily'],
  ] as const

  return (
    <PhoneFrame>
      <ScreenShell
        header={<TopBar title="Mission Board" eyebrow="Synced 2h ago" back={false} right={<IconButton label="Filter"><MoreHorizontal size={19} /></IconButton>} />}
        activeTab="goals"
        bottomAction={<FloatingQuickLog label="New mission" />}
      >
        <main className="space-y-4 px-4 pb-4 pt-3">
          <div className="grid grid-cols-3 gap-2">
            <MetricPill label="Active" value="04" tone="you" />
            <MetricPill label="Done" value="12" tone="done" />
            <MetricPill label="Streak" value="07d" />
          </div>
          <GlassCard>
            <div className="grid grid-cols-[1fr_120px] gap-4">
              <div>
                <p className="text-[12px] font-semibold uppercase text-white/45">Whole-life map</p>
                <h2 className="mt-2 text-[20px] font-semibold leading-6 text-white">Missions across every domain.</h2>
                <p className="mt-2 text-[13px] leading-[18px] text-white/55">The board favors effort in progress, then completion.</p>
              </div>
              <MiniRadar />
            </div>
          </GlassCard>
          <div className="flex gap-2">
            <Chip tone="you">Active</Chip><Chip>Done</Chip><Chip>All</Chip><Chip>Life</Chip><Chip>Main</Chip>
          </div>
          <SectionTitle title="Pinned" />
          <div className="space-y-3">
            {missions.map(([name, value, domain]) => (
              <SolidCard key={name} className="py-3">
                <div className="flex items-center gap-3">
                  <span className={cx('flex h-8 w-8 items-center justify-center rounded-full', value === 100 ? 'bg-forest-green text-white' : 'bg-brand-orange/15 text-brand-orange')}>
                    {value === 100 ? <Check size={16} /> : <Flag size={15} />}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-[14px] font-semibold text-white">{name}</p>
                    <p className="mt-0.5 text-[12px] text-white/40">{domain}</p>
                  </div>
                  <span className="text-[13px] text-white/45">{value}%</span>
                </div>
                <div className="mt-3"><ProgressBar value={value} tone={value === 100 ? 'done' : 'you'} /></div>
              </SolidCard>
            ))}
          </div>
        </main>
      </ScreenShell>
    </PhoneFrame>
  )
}
