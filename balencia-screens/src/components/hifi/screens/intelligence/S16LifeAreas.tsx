import { Chip, GlassCard, HifiShell, MetricPill, MiniRadar, ProgressBar, Provenance, SectionTitle, SolidCard, Sparkline, TopBar, cx } from '@/components/hifi/kit'

export function S16LifeAreas() {
  const rows = [
    ['Fitness', '82', '+4', 82],
    ['Nutrition', '76', '+2', 76],
    ['Wellbeing', '81', '+2', 81],
    ['Career', '61', '-3', 61],
    ['Finance', '68', '+1', 68],
  ] as const

  return (
    <HifiShell header={<TopBar title="Life areas" right={<Chip>Data sources</Chip>} />} activeTab="me">
        <main className="space-y-4 px-4 pb-4 pt-3">
          <GlassCard>
            <div className="flex items-center justify-between">
              <p className="text-[12px] font-semibold uppercase text-white/45">Life Power</p>
              <Chip>Calculated</Chip>
            </div>
            <MiniRadar labels />
            <div className="grid grid-cols-2 gap-2">
              <MetricPill label="Average" value="78" />
              <MetricPill label="Reporting" value="8/9" tone="done" />
            </div>
          </GlassCard>
          <SolidCard>
            <SectionTitle title="Last 7 weeks" meta="+4" />
            <Sparkline />
            <Provenance items={['9 domains', 'Updated 2h ago']} />
          </SolidCard>
          <GlassCard tone="cia">
            <p className="text-[15px] leading-5 text-white">CIA sees fitness and wellbeing as your anchors this month. Career dipped this week.</p>
            <div className="mt-3 flex gap-2"><Chip>Fitness</Chip><Chip>Wellbeing</Chip></div>
          </GlassCard>
          <div className="flex gap-2"><Chip tone="you">Current</Chip><Chip>Vs week</Chip><Chip>Vs month</Chip></div>
          <SolidCard>
            <SectionTitle title="Domain stats" />
            <div className="mt-3 space-y-3">
              {rows.map(([name, value, delta, progress]) => (
                <div key={name} className="grid grid-cols-[86px_1fr_50px] items-center gap-3">
                  <span className="text-[13px] font-semibold text-white/75">{name}</span>
                  <ProgressBar value={progress} tone={progress > 80 ? 'done' : 'you'} />
                  <span className={cx('text-right text-[13px] font-semibold', delta.startsWith('+') ? 'text-forest-green' : 'text-brand-orange')}>{value} {delta}</span>
                </div>
              ))}
            </div>
          </SolidCard>
        </main>
      </HifiShell>
  )
}
