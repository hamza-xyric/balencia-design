import { Brain, Flame, Footprints, Lock, MessageCircle, Moon, Play, Plus, Sparkles, Wind } from 'lucide-react'
import {
  HifiShell,
  TopBar,
  SolidCard,
  Chip,
  Provenance,
  ConsentRail,
  BtnSecondary,
  BtnGhost,
  CIAInsightCard,
  TrendChart,
  HeatGrid,
  SafetyCard
} from '@/components/hifi/kit'

export function S54Meditation() {
  return (
    <HifiShell
      header={
        <TopBar
          title={<>Meditation & <span className="text-emphasis">mindfulness</span></>}
          right={
            <div className="flex items-center gap-1.5 px-3 h-9 rounded-full border border-white/10 bg-white/[0.04]">
              <Sparkles className="w-3.5 h-3.5 text-royal-purple" />
              <span className="text-[13px] font-medium tracking-tight text-white/85">Mental 4</span>
            </div>
          }
        />
      }
      activeTab="today"
      atmosphere="you"
      bottomAction={
        <div className="flex justify-end">
          <button type="button" aria-label="Log a practice" className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-orange text-white shadow-[var(--glow-orange-sm)]">
            <Plus className="h-5 w-5" />
          </button>
        </div>
      }
    >
      <main className="space-y-4 px-4 pb-10 pt-3">
        {/* Focal: CIA Synthesis */}
        <div>
          <CIAInsightCard
            provenance={['WHOOP 72bpm', 'App log']}
            actions={
              <div className="flex items-center gap-2">
                <BtnSecondary><Play className="w-3.5 h-3.5" /> Start 5-min body scan</BtnSecondary>
                <BtnGhost quiet={true}><MessageCircle className="w-3.5 h-3.5" /> Ask CIA</BtnGhost>
              </div>
            }
          >
            <div className="space-y-2">
              <p className="text-[15px] leading-snug text-white/90">
                Your stress is elevated. A 5-minute body scan can shift your baseline.
              </p>
              <div className="flex flex-wrap items-center gap-1.5 pt-1">
                <Chip tone="cia">Heart rate elevated</Chip>
                <Chip tone="muted">Sleep 7.5h via Health</Chip>
                <Chip tone="muted">3 skips this week</Chip>
              </div>
            </div>
          </CIAInsightCard>
        </div>

        {/* Safety Resource */}
        <SafetyCard />

        {/* Filter Tabs */}
        <div role="tablist" aria-label="Practice filters" className="hide-scrollbar -mx-4 flex items-center gap-2 overflow-x-auto px-4">
          <button type="button" role="tab" aria-selected className="min-h-11 whitespace-nowrap rounded-full bg-white px-3.5 text-[13px] font-medium text-ink-900">All</button>
          <button type="button" role="tab" aria-selected={false} className="min-h-11 whitespace-nowrap rounded-full border border-white/10 bg-white/[0.04] px-3.5 text-[13px] font-medium text-white/85">Meditation</button>
          <button type="button" role="tab" aria-selected={false} className="min-h-11 whitespace-nowrap rounded-full border border-white/10 bg-white/[0.04] px-3.5 text-[13px] font-medium text-white/85">Quick</button>
          <button type="button" role="tab" aria-selected={false} className="min-h-11 whitespace-nowrap rounded-full border border-white/10 bg-white/[0.04] px-3.5 text-[13px] font-medium text-white/85">Move</button>
          <button type="button" role="tab" aria-selected={false} className="flex min-h-11 items-center gap-1.5 whitespace-nowrap rounded-full border border-white/10 bg-white/[0.04] px-3.5 text-[13px] font-medium text-white/85">
            <Lock className="h-3 w-3" aria-hidden="true" /> Advanced
          </button>
        </div>

        {/* Practices List */}
        <div className="space-y-2.5">
          <PracticeListCard
            icon={<Moon className="w-5 h-5 text-royal-purple" />}
            title="Body scan"
            duration="10 min"
            benefit="Reduces tension"
            context="Before sleep"
          />
          <PracticeListCard
            icon={<Wind className="w-5 h-5 text-royal-purple" />}
            title="Deep breathing"
            duration="3 min"
            benefit="Anchors focus"
            context="Anytime"
          />
          <PracticeListCard
            icon={<Footprints className="w-5 h-5 text-royal-purple" />}
            title="Walking meditation"
            duration="8 min"
            benefit="Grounds awareness"
            context="Outdoor"
          />
        </div>

        {/* Streak Card (Solid) */}
        <SolidCard className="p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Flame className="w-4 h-4 text-brand-orange" />
              <h3 className="text-[15px] font-medium tracking-tight text-white/90">Mindfulness streak</h3>
            </div>
            <span className="text-[22px] font-semibold tabular-nums text-white/90">12 days</span>
          </div>
          
          <div className="flex justify-between mb-1">
            {[...Array(7)].map((_, i) => (
              <div key={i} className="w-7 h-7 rounded-full bg-brand-orange/80 flex items-center justify-center text-[10px] font-medium text-ink-900 shadow-[var(--glow-orange-sm)]">
                <Brain className="w-3.5 h-3.5" />
              </div>
            ))}
          </div>

          <div className="mt-3 pt-3 border-t border-white/10">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[13px] font-medium text-white/70">Last 4 weeks</span>
              <Provenance items={['App log']} />
            </div>
            <HeatGrid values={[2, 3, 0, 1, 2, 3, 2, 1, 0, 1, 2, 3, 2, 1]} columns={14} />
          </div>
        </SolidCard>

        {/* Practice Minutes Trend (Solid) */}
        <SolidCard className="p-4">
          <div className="flex items-center justify-between mb-1">
            <h3 className="text-[15px] font-medium tracking-tight text-white/90">Practice minutes</h3>
            <Provenance items={['App log']} />
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-[22px] font-semibold tabular-nums text-white/90">145 min</span>
            <span className="text-[13px] text-white/45">This week</span>
          </div>
          
          <div className="mt-4">
            <TrendChart past={[20, 45, 15, 60, 35, 25, 45]} projected={[35]} label="Practice minutes" />
            <div className="flex items-center gap-2 mt-2 border-t border-dashed border-white/15 pt-2">
              <div className="h-1 w-8 rounded-full bg-brand-orange/40 border border-dashed border-brand-orange"></div>
              <span className="text-[11px] text-white/45">Projected</span>
              <Chip tone="muted">Estimated - low confidence</Chip>
            </div>
          </div>
        </SolidCard>

        {/* KPI Row (Solid) */}
        <div className="grid grid-cols-3 gap-2">
          <SolidCard className="p-3 flex flex-col justify-center">
            <span className="text-[18px] font-semibold tabular-nums text-white/90">24</span>
            <span className="text-[11px] text-white/45">Sessions</span>
          </SolidCard>
          <SolidCard className="p-3 flex flex-col justify-center">
            <span className="text-[18px] font-semibold tabular-nums text-white/90">145</span>
            <span className="text-[11px] text-white/45">Total min</span>
          </SolidCard>
          <SolidCard className="p-3 flex flex-col justify-center">
            <span className="text-[18px] font-semibold tabular-nums text-white/90">12 days</span>
            <span className="text-[11px] text-white/45">Longest</span>
          </SolidCard>
        </div>

        <ConsentRail compact={true} />
      </main>
    </HifiShell>
  )
}

interface PracticeListCardProps {
  icon: React.ReactNode
  title: string
  duration: string
  benefit: string
  context: string
}

function PracticeListCard({ icon, title, duration, benefit, context }: PracticeListCardProps) {
  return (
    <button type="button" className="flex min-h-[72px] w-full items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.04] p-3.5 text-left transition-transform active:scale-[0.98]">
      <div className="h-10 w-10 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-center shrink-0 text-royal-purple">
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-baseline justify-between gap-2">
          <h4 className="text-[14px] font-medium text-white/90 truncate">{title}</h4>
          <span className="text-[12px] font-medium text-white/70 shrink-0 tabular-nums">{duration}</span>
        </div>
        <div className="flex items-center justify-between gap-2 mt-0.5">
          <p className="text-[12px] text-white/45 truncate">{benefit}</p>
          <span className="text-[11px] px-1.5 py-0.5 rounded bg-white/[0.04] border border-white/10 text-white/60 shrink-0">
            {context}
          </span>
        </div>
      </div>
    </button>
  )
}