import { Check, ChevronRight, GripVertical, Plus, X } from 'lucide-react'
import {
  BtnCoach,
  BtnPrimary,
  Chip,
  CIAInsightCard,
  ConsentRail,
  cx,
  GlassCard,
  GlassPillInput,
  HifiShell,
  IconButton,
  ProgressRing,
  SolidCard,
  TopBar,
} from '@/components/hifi/kit'

// Create/edit mission, chosen state: default create flow, prompt already
// entered — CIA synthesis resolved to a suggested type and domains, actions
// and a milestone drafted, XP forecast still settling (low-confidence). The
// empty (no prompt, examples only), processing (staged CIA captions),
// error (preserved text + retry), and offline (save blocked) states share
// this same layout and are not rendered in parallel here, per catalog.

const missionTypes = ['Daily', 'Weekly', 'Side', 'Main'] as const
const strictnessOptions = ['Lenient', 'Balanced', 'Strict'] as const

export function S15CreateEditMission() {
  return (
    <HifiShell
      header={<TopBar title="New mission" right={<IconButton label="Close"><X size={18} strokeWidth={1.9} /></IconButton>} />}
      atmosphere="you"
      showTabBar={false}
    >
      <main className="space-y-4 px-4 pb-6 pt-1">
        <div className="mx-auto h-1 w-10 rounded-full bg-white/15" aria-hidden="true" />

        <p className="text-[13px] leading-[18px] text-white/45">
          You are building a mission for yourself, and CIA is here to help structure it.
        </p>

        <GlassCard tone="you" className="space-y-3">
          <GlassPillInput placeholder="What do you want to achieve?" value="Run a half marathon by October" focused />
          <BtnCoach>Let CIA plan this</BtnCoach>
        </GlassCard>

        <div className="flex flex-wrap gap-2">
          {['Save $5,000', 'Meditate daily', '5K'].map(example => (
            <Chip key={example}>{example}</Chip>
          ))}
        </div>

        <GlassCard tone="cia">
          <CIAInsightCard eyebrow="Endurance chain" provenance={['Via prompt']}>
            <p className="text-[15px] leading-[21px] text-white">
              This looks like a <span className="text-emphasis">mission</span> that chains across endurance, needing steady weekly volume.
            </p>
          </CIAInsightCard>
        </GlassCard>

        <section className="space-y-2">
          <div className="flex items-center justify-between px-1">
            <h2 className="text-[12px] font-semibold uppercase leading-4 text-white/45">Mission type</h2>
            <span className="text-[11px] leading-4 text-white/45">Via prompt</span>
          </div>
          <div role="tablist" aria-label="Mission type" className="grid grid-cols-4 gap-1 rounded-xl bg-white/[0.04] p-1">
            {missionTypes.map(type => (
              <button
                key={type}
                type="button"
                role="tab"
                aria-selected={type === 'Main'}
                className={cx(
                  'flex h-10 items-center justify-center rounded-lg text-[12px] font-medium',
                  type === 'Main' ? 'bg-white/10 text-white' : 'text-white/45',
                )}
              >
                {type}
              </button>
            ))}
          </div>
        </section>

        <section className="space-y-2">
          <h2 className="px-1 text-[12px] font-semibold uppercase leading-4 text-white/45">Domains</h2>
          <SolidCard className="flex flex-wrap items-center gap-2">
            <Chip tone="you">
              <span className="flex items-center gap-1.5">Fitness<X size={12} aria-hidden="true" /></span>
            </Chip>
            <Chip tone="you">
              <span className="flex items-center gap-1.5">Nutrition<X size={12} aria-hidden="true" /></span>
            </Chip>
            <button type="button" className="flex h-9 items-center gap-1 rounded-pill border border-dashed border-white/15 px-3 text-[12px] text-white/45">
              <Plus size={12} strokeWidth={2} /> Add domain
            </button>
          </SolidCard>
        </section>

        <section className="space-y-2">
          <h2 className="px-1 text-[12px] font-semibold uppercase leading-4 text-white/45">Actions</h2>
          <SolidCard className="divide-y divide-white/[0.05] p-0">
            {['Run 3x weekly', 'Strength train 2x'].map(action => (
              <div key={action} className="flex min-h-14 items-center gap-3 px-4">
                <GripVertical size={16} className="shrink-0 text-white/25" aria-hidden="true" />
                <span className="min-w-0 flex-1 text-[14px] text-white/85">{action}</span>
                <button type="button" aria-label={`Edit ${action}`} className="flex h-11 w-11 items-center justify-center text-white/40">
                  <ChevronRight size={16} strokeWidth={1.9} />
                </button>
                <button type="button" aria-label={`Remove ${action}`} className="flex h-11 w-11 items-center justify-center text-white/40">
                  <X size={16} strokeWidth={1.9} />
                </button>
              </div>
            ))}
            <div className="flex min-h-14 items-center px-4">
              <button type="button" className="flex h-11 items-center gap-2 text-[13px] font-medium text-white/45">
                <Plus size={14} strokeWidth={2} /> Add action
              </button>
            </div>
          </SolidCard>
        </section>

        <section className="space-y-2">
          <h2 className="px-1 text-[12px] font-semibold uppercase leading-4 text-white/45">Milestones</h2>
          <SolidCard className="p-0">
            <div className="flex min-h-14 items-center gap-3 px-4">
              <span className="text-[12px] font-semibold text-brand-orange tabular-nums">1</span>
              <span className="min-w-0 flex-1 text-[14px] text-white/85">5K pace check</span>
              <span className="text-[12px] text-white/40">Aug 15</span>
            </div>
          </SolidCard>
        </section>

        <section className="space-y-2">
          <h2 className="px-1 text-[12px] font-semibold uppercase leading-4 text-white/45">Tracking signals</h2>
          <SolidCard className="space-y-3">
            <div className="flex min-h-11 items-center justify-between">
              <span className="text-[14px] text-white/85">Weekly distance</span>
              <span role="switch" aria-checked={true} aria-label="Track weekly distance" tabIndex={0} className="flex h-8 w-[52px] shrink-0 items-center rounded-pill bg-brand-orange p-1 shadow-[var(--glow-orange-sm)]">
                <span className="h-6 w-6 translate-x-5 rounded-full bg-paper-50" aria-hidden="true" />
              </span>
            </div>
            <div className="flex min-h-11 items-center justify-between">
              <span className="text-[14px] text-white/85">Unit</span>
              <div role="radiogroup" aria-label="Unit" className="flex items-center gap-4">
                <button type="button" role="radio" aria-checked={true} tabIndex={0} className="flex h-11 items-center gap-1.5 text-[13px] font-medium text-white">
                  <span className="flex h-4 w-4 items-center justify-center rounded-full border-2 border-brand-orange">
                    <span className="h-2 w-2 rounded-full bg-brand-orange" aria-hidden="true" />
                  </span>
                  Metric
                </button>
                <button type="button" role="radio" aria-checked={false} tabIndex={-1} className="flex h-11 items-center gap-1.5 text-[13px] font-medium text-white/40">
                  <span className="h-4 w-4 rounded-full border-2 border-white/20" aria-hidden="true" />
                  Imperial
                </button>
              </div>
            </div>
          </SolidCard>
        </section>

        <section className="space-y-2">
          <h2 className="px-1 text-[12px] font-semibold uppercase leading-4 text-white/45">Strictness</h2>
          <div role="tablist" aria-label="Strictness" className="grid grid-cols-3 gap-1 rounded-xl bg-white/[0.04] p-1">
            {strictnessOptions.map(option => (
              <button
                key={option}
                type="button"
                role="tab"
                aria-selected={option === 'Balanced'}
                className={cx(
                  'flex h-10 items-center justify-center rounded-lg text-[12px] font-medium',
                  option === 'Balanced' ? 'bg-white/10 text-white' : 'text-white/45',
                )}
              >
                {option}
              </button>
            ))}
          </div>
        </section>

        <GlassCard tone="you">
          <div className="flex items-center gap-4">
            <div className="opacity-70"><ProgressRing percent={42} value="~420" label="XP forecast" size={72} tone="cia" /></div>
            <div className="min-w-0 flex-1 space-y-1">
              <p className="text-[11px] font-semibold uppercase leading-4 text-white/45">Mission preview</p>
              <p className="text-[15px] font-semibold leading-5 text-white/70 tabular-nums">~420 XP</p>
              <p className="text-[11px] leading-4 text-white/45">Estimated &middot; low confidence</p>
            </div>
          </div>
        </GlassCard>

        <GlassCard tone="muted">
          <p className="text-[12px] leading-4 text-white/55">
            CIA suggestions here are drafted from your prompt, not saved until you create this mission.
          </p>
          <ConsentRail compact />
        </GlassCard>

        <BtnPrimary className="w-full">
          <span className="flex items-center gap-2"><Check size={16} strokeWidth={2.4} /> Create mission</span>
        </BtnPrimary>
      </main>
    </HifiShell>
  )
}
