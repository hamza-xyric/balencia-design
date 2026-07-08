import { Flame, Plus } from 'lucide-react'
import {
  BtnPrimary,
  BtnSecondary,
  CIAInsightCard,
  CIAPresenceOrb,
  GlassCard,
  GlassPillInput,
  HifiShell,
  Provenance,
  SafetyCard,
  SolidCard,
} from '@/components/hifi/kit'

const moodCells = [
  { emoji: '😞', sentiment: 'Down' },
  { emoji: '😕', sentiment: 'Low' },
  { emoji: '😐', sentiment: 'Okay' },
  { emoji: '🙂', sentiment: 'Good' },
  { emoji: '😄', sentiment: 'Great' },
]
const selectedMoodIndex = 3

const domainTagClass = {
  career: 'border-domain-career/25 bg-domain-career/15 text-domain-career',
  fitness: 'border-domain-fitness/25 bg-domain-fitness/15 text-domain-fitness',
  wellbeing: 'border-domain-wellbeing/25 bg-domain-wellbeing/15 text-domain-wellbeing',
} as const

function DomainTag({
  domain,
  label,
  selected,
}: {
  domain: keyof typeof domainTagClass
  label: string
  selected?: boolean
}) {
  return (
    <button
      type="button"
      aria-pressed={Boolean(selected)}
      aria-label={`${label} domain, ${selected ? 'selected' : 'not selected'}`}
      className={`inline-flex min-h-8 items-center rounded-pill border px-3 text-[11px] font-semibold ${domainTagClass[domain]}`}
    >
      {label}
    </button>
  )
}

function FeelingSlider({
  title,
  minLabel,
  maxLabel,
  value,
  ariaLabel,
}: {
  title: string
  minLabel: string
  maxLabel: string
  value: number
  ariaLabel: string
}) {
  return (
    <div>
      <p className="mb-2 text-[13px] font-medium text-white/80">{title}</p>
      <div className="flex items-center justify-between text-[11px] text-white/45">
        <span>{minLabel}</span>
        <span className="text-[13px] font-medium text-white/90 tabular-nums">{value}</span>
        <span>{maxLabel}</span>
      </div>
      <div
        role="slider"
        tabIndex={0}
        aria-label={ariaLabel}
        aria-valuenow={value}
        aria-valuemin={1}
        aria-valuemax={10}
        className="relative mt-2 h-2 rounded-pill bg-white/[0.08]"
      >
        <div className="absolute inset-y-0 left-0 rounded-pill bg-brand-orange" style={{ width: `${(value / 10) * 100}%` }} />
        <div
          className="absolute top-1/2 h-5 w-5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white shadow-[var(--glow-orange-sm)]"
          style={{ left: `${(value / 10) * 100}%` }}
        />
      </div>
    </div>
  )
}

export function S45DailyCheckin() {
  return (
    <HifiShell
      atmosphere="you"
      activeTab="today"
      bottomAction={<BtnPrimary className="w-full">Save check-in</BtnPrimary>}
      header={
        <header className="z-30 flex min-h-[58px] shrink-0 items-center gap-3 bg-ink-900/40 px-4 backdrop-blur-md">
          <button type="button" className="flex min-h-11 items-center text-[15px] text-white/60">Cancel</button>
          <h1 className="min-w-0 flex-1 truncate text-center text-[17px] font-semibold leading-6 text-white">
            Evening check-in
          </h1>
          <div className="flex h-11 w-11 shrink-0 items-center justify-center">
            <CIAPresenceOrb state="idle" size={32} />
          </div>
        </header>
      }
    >
      <main className="space-y-4 px-4 pb-4 pt-3">
        <GlassCard tone="cia" className="relative overflow-hidden">
          <div className="pointer-events-none absolute -top-12 left-1/2 h-40 w-40 -translate-x-1/2 rounded-full bg-royal-purple/20 blur-3xl" />
          <div className="relative flex items-start gap-4">
            <CIAPresenceOrb state="idle" size={48} />
            <div className="min-w-0 flex-1">
              <p className="text-[19px] font-medium leading-6 text-white">
                Good evening. Let&apos;s close out your day. Two minutes. How did it go.
              </p>
              <div className="mt-3 inline-flex items-center gap-1.5 rounded-pill border border-brand-orange/25 bg-brand-orange/10 px-3 py-1 text-[11px] font-semibold text-brand-orange">
                <Flame size={12} strokeWidth={2.2} />
                Day 14 checking in
              </div>
            </div>
          </div>
        </GlassCard>

        <SolidCard>
          <div className="flex items-center justify-between">
            <h2 className="text-[15px] font-medium text-white/90">How you&apos;re feeling</h2>
            <Provenance items={['You logged']} />
          </div>
          <div className="mt-4 grid grid-cols-5 gap-2">
            {moodCells.map((cell, index) => {
              const isSelected = index === selectedMoodIndex
              return (
                <button
                  key={cell.sentiment}
                  type="button"
                  aria-label={`Mood: ${cell.sentiment.toLowerCase()}${isSelected ? ', selected' : ''}`}
                  className={`flex aspect-square min-h-11 w-full items-center justify-center rounded-full text-[21px] ${
                    isSelected
                      ? 'bg-brand-orange/15 ring-2 ring-brand-orange shadow-[var(--glow-orange-sm)]'
                      : 'bg-white/[0.04] ring-1 ring-inset ring-white/10'
                  }`}
                >
                  <span aria-hidden="true">{cell.emoji}</span>
                </button>
              )
            })}
          </div>
          <div className="mt-4 flex items-center gap-2">
            <Plus size={13} className="shrink-0 text-white/40" strokeWidth={2.2} />
            <span className="text-[12px] text-white/45">Add context</span>
            <DomainTag domain="career" label="Career" selected />
            <DomainTag domain="fitness" label="Fitness" />
          </div>
        </SolidCard>

        <SolidCard className="space-y-5">
          <div className="flex items-center justify-between -mb-1">
            <h2 className="text-[15px] font-medium text-white/90">Energy and stress</h2>
            <Provenance items={['You logged']} />
          </div>
          <FeelingSlider title="Energy" minLabel="Low" maxLabel="High" value={7} ariaLabel="Energy, 7 out of 10" />
          <FeelingSlider title="Stress" minLabel="Calm" maxLabel="High" value={4} ariaLabel="Stress, 4 out of 10" />
        </SolidCard>

        <GlassCard tone="you">
          <h2 className="mb-3 text-[15px] font-medium text-white/90">How today went</h2>
          <GlassPillInput
            placeholder="Optional reflection"
            value="Closed the deck. Slept badly the night before."
          />
        </GlassCard>

        <CIAInsightCard
          eyebrow="Tomorrow"
          provenance={['Cross-pillar pattern']}
          actions={
            <>
              <BtnSecondary>See the pattern</BtnSecondary>
              <span className="flex min-h-11 items-center px-3 text-[13px] font-medium text-white/50">Not now</span>
            </>
          }
        >
          <div className="space-y-3">
            <p className="text-[14px] leading-[20px] text-white/90">
              You tend to feel <span className="text-emphasis">calmer</span> on days you train in the morning.
            </p>
            <div className="flex gap-2">
              <DomainTag domain="wellbeing" label="Wellbeing" />
              <DomainTag domain="fitness" label="Fitness" />
            </div>
            <div className="flex items-center gap-2 text-[11px] text-white/40">
              <span className="flex items-center gap-1" role="img" aria-label="Pattern confidence: moderate, estimated">
                <span className="h-1.5 w-1.5 rounded-full bg-royal-purple" />
                <span className="h-1.5 w-1.5 rounded-full bg-royal-purple" />
                <span className="h-1.5 w-1.5 rounded-full bg-royal-purple/25" />
              </span>
              Estimated pattern confidence
            </div>
          </div>
        </CIAInsightCard>

        <SafetyCard />
      </main>
    </HifiShell>
  )
}
