import { Check, Flag, Sparkles } from 'lucide-react'
import { Chip, FloatingQuickLog, GlassCard, HifiShell, MiniRadar, ProgressBar, Provenance, SectionTitle, SolidCard, TopBar, cx } from '@/components/hifi/kit'

export function S12HomeScreen() {
  return (
    <HifiShell 
        header={<TopBar title="Good morning, Amira" eyebrow="Tuesday, Jul 7" back={false} right={<Chip tone="you">Lv 12</Chip>} />}
        activeTab="today"
        bottomAction={<FloatingQuickLog />}
      >
        <main className="space-y-4 px-4 pb-4 pt-3">
          <SolidCard className="border-royal-purple/20">
            <div className="flex items-start gap-3">
              <Sparkles size={18} className="mt-1 shrink-0 text-royal-purple" />
              <div>
                <p className="text-[15px] leading-5 text-white">What is worth your attention today?</p>
                <div className="mt-3 flex gap-2">
                  <Chip>Steady</Chip><Chip>Low</Chip><Chip>Wired</Chip>
                </div>
              </div>
            </div>
          </SolidCard>
          <GlassCard tone="you">
            <div className="flex items-center justify-between">
              <p className="text-[12px] font-semibold uppercase text-white/45">Life balance</p>
              <Chip>12 areas</Chip>
            </div>
            <MiniRadar labels />
            <ProgressBar value={70} />
            <p className="mt-3 text-[13px] leading-[18px] text-white/65">CIA sees fitness carrying the week. Keep recovery visible.</p>
          </GlassCard>
          <Provenance items={['72 bpm via WHOOP', '8.2k steps', '7.5h sleep via Health']} />
          <div className="grid grid-cols-4 gap-2">
            {['Breathe', 'Water', 'Journal', 'Check-in'].map(item => (
              <div key={item} className="flex min-h-[54px] items-center justify-center rounded-lg border border-white/10 bg-white/[0.04] text-[12px] font-semibold text-white/70">{item}</div>
            ))}
          </div>
          <SolidCard>
            <SectionTitle title="Today momentum" meta="3 of 6 - +90 XP" />
            <div className="mt-3"><ProgressBar value={52} /></div>
            <div className="mt-4 space-y-2">
              {['Meditate 10 min', 'Morning run', 'Review budget'].map((item, index) => (
                <div key={item} className="flex min-h-11 items-center gap-3 rounded-lg bg-white/[0.03] px-3">
                  <span className={cx('flex h-6 w-6 items-center justify-center rounded-full border', index === 0 ? 'border-forest-green text-forest-green' : 'border-white/20 text-white/35')}>
                    {index === 0 && <Check size={14} />}
                  </span>
                  <span className="min-w-0 flex-1 text-[14px] text-white/75">{item}</span>
                  <Chip>{index === 2 ? 'Finance' : index === 1 ? 'Fitness' : 'Wellbeing'}</Chip>
                </div>
              ))}
            </div>
          </SolidCard>
          <SectionTitle title="Pinned missions" />
          {['Run a half marathon', 'Save $5,000 by December'].map((item, index) => (
            <SolidCard key={item} className="py-3">
              <div className="flex items-center gap-3">
                <Flag size={17} className="text-brand-orange" />
                <span className="min-w-0 flex-1 text-[14px] font-semibold text-white">{item}</span>
                <span className="text-[13px] text-white/45">{index === 0 ? '68%' : '42%'}</span>
              </div>
              <div className="mt-3"><ProgressBar value={index === 0 ? 68 : 42} /></div>
            </SolidCard>
          ))}
        </main>
      </HifiShell>
  )
}
