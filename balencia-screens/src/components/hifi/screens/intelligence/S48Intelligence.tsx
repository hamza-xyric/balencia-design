import { ArcGauge, Chip, GlassCard, HifiShell, ProgressBar, Provenance, SectionTitle, SolidCard, Sparkline, TopBar, cx } from '@/components/hifi/kit'

export function S48Intelligence() {
  return (
    <HifiShell header={<TopBar title="Intelligence" right={<Chip>Manage data</Chip>} />} activeTab="me">
        <main className="space-y-4 px-4 pb-4 pt-3">
          <GlassCard>
            <p className="text-[12px] font-semibold uppercase text-white/45">Your daily intelligence</p>
            <div className="mt-4 grid grid-cols-[110px_1fr] items-center gap-4">
              <ArcGauge value="87" label="Score" />
              <div>
                <p className="text-[15px] font-semibold text-white">+3 from yesterday</p>
                <p className="mt-2 text-[13px] leading-[18px] text-white/50">Updated 2h ago from wearable, logs, and mission activity.</p>
              </div>
            </div>
          </GlassCard>
          <SectionTitle title="Active contradictions" />
          <GlassCard tone="cia">
            <p className="text-[15px] leading-5 text-white">You reported 8h sleep, but WHOOP shows 5.5h. Resolve the source before CIA uses it.</p>
            <div className="mt-3 flex gap-2"><Chip>Sleep log</Chip><Chip>WHOOP data</Chip></div>
          </GlassCard>
          <SectionTitle title="Cross-domain patterns" meta="Legend" />
          <SolidCard>
            <div className="grid grid-cols-5 gap-1">
              {Array.from({ length: 25 }).map((_, index) => (
                <span key={index} className={cx('h-7 rounded-sm', index % 6 === 0 ? 'bg-white/[0.05]' : index % 4 === 0 ? 'bg-forest-green/45' : 'bg-brand-orange/30')} />
              ))}
            </div>
            <p className="mt-4 text-[13px] leading-[18px] text-white/60">On days you meditate, stress is often lower. Evidence is medium confidence.</p>
          </SolidCard>
          <SectionTitle title="Trend" meta="7d / 14d / 30d" />
          <SolidCard><Sparkline tone="cia" /><Provenance items={['Projected by CIA', 'Low confidence']} /></SolidCard>
          <SolidCard>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[12px] font-semibold uppercase text-white/45">Best day formula</p>
                <p className="mt-2 text-[15px] text-white">7h sleep, meditation, one workout, early meal.</p>
              </div>
              <Chip tone="done">4/5</Chip>
            </div>
            <div className="mt-4"><ProgressBar value={80} tone="done" /></div>
          </SolidCard>
        </main>
      </HifiShell>
  )
}
