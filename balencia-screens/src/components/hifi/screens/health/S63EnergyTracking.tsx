import { Lock, MoreHorizontal } from 'lucide-react'
import { ArcGauge, Chip, ConsentRail, FloatingQuickLog, GlassCard, HifiShell, IconButton, ProgressBar, Provenance, SectionTitle, SolidCard, Sparkline, TopBar } from '@/components/hifi/kit'

export function S63EnergyTracking() {
  return (
    <HifiShell header={<TopBar title="Energy tracking" right={<IconButton label="Options"><MoreHorizontal size={18} /></IconButton>} />} activeTab="me" bottomAction={<FloatingQuickLog label="Log energy" />}>
        <main className="space-y-4 px-4 pb-4 pt-3">
          <GlassCard>
            <p className="text-[12px] font-semibold uppercase text-white/45">Current energy</p>
            <ArcGauge value="7.5" label="You logged" />
            <Provenance items={['You logged', 'Fresh now']} />
          </GlassCard>
          <SolidCard>
            <SectionTitle title="Quick log" />
            <div className="mt-4"><ProgressBar value={75} /></div>
            <div className="mt-4 flex gap-2"><Chip>Morning</Chip><Chip tone="you">Post-workout</Chip><Chip>Post-meal</Chip></div>
            <div className="mt-4 rounded-pill border border-white/10 bg-ink-900 px-4 py-3 text-[14px] text-white/35">How are you feeling. Optional.</div>
            <div className="mt-4 flex h-12 items-center justify-center rounded-pill bg-brand-orange text-[15px] font-semibold text-white">Log energy</div>
          </SolidCard>
          <SectionTitle title="Today energy" meta="Avg 6.2" />
          <SolidCard><Sparkline /><p className="mt-3 text-[13px] text-white/55">5 logs today. Peak window is holding at 9-11am.</p></SolidCard>
          <SolidCard className="border-white/10 opacity-80">
            <div className="flex items-center gap-3">
              <Lock size={18} className="text-white/45" />
              <div>
                <h2 className="text-[15px] font-semibold text-white">Peak hours locked</h2>
                <p className="mt-1 text-[12px] text-white/45">Chronotype and correlations unlock with premium.</p>
              </div>
            </div>
          </SolidCard>
          <GlassCard tone="cia">
            <p className="text-[15px] leading-5 text-white">CIA sees a golden window for deep work after movement and breakfast.</p>
            <ConsentRail compact />
          </GlassCard>
        </main>
      </HifiShell>
  )
}
