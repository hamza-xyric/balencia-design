import { AlertTriangle, FileText, Lock, Plus, ShieldCheck, Trash2 } from 'lucide-react'
import {
  BtnGhost,
  ConsentRail,
  GlassCard,
  HifiShell,
  IconButton,
  Provenance,
  SafetyCard,
  SectionTitle,
  SolidCard,
  TopBar,
  TrendChart,
} from '@/components/hifi/kit'
import { persona } from '@/data/hifi/persona'

// Voice call history — temporary coaching turned into a reviewable record.
// Default composition renders the History tab; Action items stays a visible
// segmented option but is not the active default view.
export function S51VoiceCallHistory() {
  return (
    <HifiShell
      atmosphere="cia"
      activeTab="cia"
      header={
        <TopBar
          title="Voice sessions"
          right={<IconButton label="Schedule a call"><Plus size={20} strokeWidth={2} /></IconButton>}
        />
      }
    >
      <main className="space-y-5 px-4 pb-4 pt-2">
        <p className="text-[12px] leading-4 text-white/55">
          Your voice <span className="text-emphasis">history</span> is private, kept for you and CIA only.
        </p>

        <div role="tablist" className="flex h-11 items-center gap-1 rounded-pill border border-white/10 bg-white/[0.03] p-1">
          <button role="tab" aria-selected={true} type="button" className="flex h-full flex-1 items-center justify-center rounded-pill bg-white/10 text-[13px] font-semibold text-white">History</button>
          <button role="tab" aria-selected={false} type="button" className="flex h-full flex-1 items-center justify-center rounded-pill text-[13px] font-medium text-white/45">Action items</button>
        </div>

        <SolidCard>
          <div className="flex items-center justify-between">
            <p className="text-[11px] font-semibold uppercase tracking-wide text-white/45">Calls per week</p>
            <span className="text-[11px] text-white/35">Last 6 weeks</span>
          </div>
          <div className="mt-3">
            <TrendChart past={[3, 5, 4, 7, 6, 5]} label="Calls per week over the last six weeks" />
          </div>
        </SolidCard>

        <section className="space-y-3">
          <SectionTitle title="Upcoming" meta="1 scheduled" />
          <GlassCard tone="you">
            <div className="flex items-center justify-between gap-3">
              <div className="min-w-0">
                <p className="text-[12px] font-semibold uppercase tracking-wide text-white/50">Thu, May 22 &middot; 3:00 pm</p>
                <h3 className="mt-1 text-[16px] font-semibold text-white">Weekly mission check-in</h3>
                <p className="mt-1 text-[13px] text-white/55">{persona.buddy.name} joins this session</p>
              </div>
            </div>
            <div className="mt-4">
              <BtnGhost quiet className="w-full justify-center border border-white/10">
                Schedule a call
              </BtnGhost>
            </div>
          </GlassCard>
        </section>

        <section className="space-y-3">
          <SectionTitle title="Today" meta="2 calls" />

          <SolidCard className="space-y-3">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <p className="text-[14px] font-semibold tabular-nums text-white">10:32 am &middot; 18 min</p>
                <p className="text-[13px] text-white/60">Morning check-in</p>
              </div>
              <button aria-label="Delete morning check-in call" className="flex h-11 w-11 shrink-0 items-center justify-center text-white/40">
                <Trash2 size={16} strokeWidth={1.8} />
              </button>
            </div>
            <p className="text-[12px] italic leading-4 text-white/45">Felt grounded and focused</p>
            <p className="text-[13px] leading-5 text-white/70">
              Reframed pre-run anxiety as excitement and set a lighter warm-up pace.
            </p>
            <Provenance items={['Summary by CIA']} />
            <div className="flex flex-wrap items-center gap-2">
              <span className="flex h-6 items-center gap-1 rounded-pill bg-forest-green/15 px-2.5 text-[11px] font-semibold text-forest-green">
                <Lock size={11} strokeWidth={2} />
                Recording retained
              </span>
              <span className="flex h-6 items-center gap-1 rounded-pill bg-royal-purple/15 px-2.5 text-[11px] font-semibold text-royal-purple">
                <FileText size={11} strokeWidth={2} />
                Transcript generated
              </span>
            </div>
          </SolidCard>

          <SolidCard className="space-y-3">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <p className="text-[14px] font-semibold tabular-nums text-white">8:15 am &middot; 7 min</p>
                <p className="text-[13px] text-white/60">Quick question</p>
              </div>
              <button aria-label="Delete quick question call" className="flex h-11 w-11 shrink-0 items-center justify-center text-white/40">
                <Trash2 size={16} strokeWidth={1.8} />
              </button>
            </div>
            <p className="text-[13px] italic leading-5 text-white/40">Transcript not available.</p>
            <div className="flex flex-wrap items-center gap-2">
              <span className="flex h-6 items-center gap-1 rounded-pill bg-brand-orange/15 px-2.5 text-[11px] font-semibold text-brand-orange">
                <Trash2 size={11} strokeWidth={2} />
                You deleted
              </span>
            </div>
          </SolidCard>
        </section>

        <section className="space-y-3">
          <SectionTitle title="Yesterday" meta="1 call" />
          <SolidCard className="space-y-3">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <p className="text-[14px] font-semibold tabular-nums text-white">6:45 pm &middot; 24 min</p>
                <p className="text-[13px] text-white/60">Evening reflection</p>
              </div>
              <button aria-label="Delete evening reflection call" className="flex h-11 w-11 shrink-0 items-center justify-center text-white/40">
                <Trash2 size={16} strokeWidth={1.8} />
              </button>
            </div>
            <p className="text-[12px] italic leading-4 text-white/45">Some tension around a deadline</p>
            <div className="flex items-start gap-2 rounded-lg border border-brand-orange/25 bg-brand-orange/10 p-2.5">
              <AlertTriangle size={14} className="mt-0.5 shrink-0 text-brand-orange" strokeWidth={2} />
              <p className="text-[12px] leading-4 text-brand-orange">Keywords like anxiety were noticed. Support is available now.</p>
            </div>
            <Provenance items={['Recording retained', 'Summary by CIA']} />
          </SolidCard>
        </section>

        <GlassCard tone="muted">
          <div className="flex items-center gap-2">
            <ShieldCheck size={15} className="text-white/50" strokeWidth={2} />
            <h2 className="text-[12px] font-semibold uppercase tracking-wide text-white/50">Voice data controls</h2>
          </div>
          <div className="mt-3 space-y-2 text-[13px] text-white/60">
            <p>Recording retained with expiry &middot; manage in settings</p>
            <div className="flex items-center justify-between">
              <span>Transcript use</span>
              <span className="text-white/85">CIA only</span>
            </div>
          </div>
          <div className="mt-3">
            <ConsentRail compact />
          </div>
        </GlassCard>

        <SafetyCard />
      </main>
    </HifiShell>
  )
}
