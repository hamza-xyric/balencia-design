import { Activity, ArrowRight, ChevronRight, Music, Plus, ShieldCheck } from 'lucide-react'
import {
  BtnPrimary,
  Chip,
  ConsentRail,
  GlassCard,
  HifiShell,
  Provenance,
  SectionTitle,
  SolidCard,
  TopBar,
  cx,
} from '@/components/hifi/kit'

// Data sources, chosen state: default — two live sources (one healthy, one
// needing reconnection) and two synthesized correlations, one real and one
// early-signal. Skeleton (shimmering rows matching this geometry), cold
// start (dashed ghost hero, no purple glow, "connect your first source"),
// failed-sync error copy, and the disabled Connect-source state (no OAuth
// providers left to add) are documented in the source spec rather than
// duplicated here — static prototype, no handlers. No live route: this
// is opened from Connected Services, Intelligence, Knowledge Graph, or
// Me settings.

export function S84DataSources() {
  return (
    <HifiShell header={<TopBar title="Data sources" />} atmosphere="you" showTabBar={false}>
      <main className="space-y-5 px-4 pb-6 pt-2">
        <GlassCard tone="cia">
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-royal-purple">Correlation engine</p>
          <h2 className="mt-2 text-[19px] leading-6 text-white">
            Every <span className="text-emphasis">source</span> becomes a signal, not clutter.
          </h2>
          <div className="mt-4 grid grid-cols-2 gap-2">
            <div className="rounded-xl border border-white/10 bg-white/[0.04] p-3">
              <p className="text-[22px] font-semibold text-white tabular-nums">2</p>
              <p className="mt-1 text-[11px] font-semibold uppercase text-white/45">Live sources</p>
            </div>
            <div className="rounded-xl border border-white/10 bg-white/[0.04] p-3">
              <p className="text-[22px] font-semibold text-white tabular-nums">2</p>
              <p className="mt-1 text-[11px] font-semibold uppercase text-white/45">Patterns detected</p>
            </div>
          </div>
          <div className="mt-3"><Provenance items={['Integrations layer']} /></div>
        </GlassCard>

        <section className="space-y-2.5">
          <SectionTitle title="Connected sources" meta="2 active" />

          <SolidCard className="p-0">
            <div className="flex min-h-[68px] items-center gap-3 p-4">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.05] text-white/70">
                <Activity size={19} strokeWidth={1.9} />
              </span>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between">
                  <p className="text-[15px] font-semibold text-white">WHOOP</p>
                  <span className="flex items-center gap-1.5 text-[11px] font-semibold uppercase text-forest-green">
                    <span className="h-1.5 w-1.5 rounded-full bg-forest-green" aria-hidden="true" />
                    Healthy
                  </span>
                </div>
                <div className="mt-0.5 flex items-center justify-between">
                  <p className="text-[12px] text-white/50">Recovery, Strain</p>
                  <p className="text-[11px] text-white/40 tabular-nums">8m ago</p>
                </div>
              </div>
            </div>
            <div className="flex flex-wrap gap-2 border-t border-white/[0.06] px-4 py-3">
              <Chip>Wearable</Chip>
              <Chip>90d rolling</Chip>
            </div>
            <div className="border-t border-white/[0.06] px-4 pb-3 pt-2.5"><ConsentRail compact /></div>
          </SolidCard>

          <SolidCard className="p-0">
            <button type="button" aria-label="Reconnect Spotify. Connection needs attention." className="flex min-h-[68px] w-full items-center gap-3 p-4 text-left">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.05] text-white/40">
                <Music size={19} strokeWidth={1.9} />
              </span>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between">
                  <p className="text-[15px] font-semibold text-white">Spotify</p>
                  <span className="text-[11px] font-semibold uppercase text-white/50">Needs attention</span>
                </div>
                <div className="mt-0.5 flex items-center justify-between">
                  <p className="text-[12px] text-white/50">Music context &middot; sync failed</p>
                  <span className="flex items-center gap-1 text-[12px] font-semibold text-royal-purple">
                    Reconnect <ChevronRight size={13} strokeWidth={2} />
                  </span>
                </div>
              </div>
            </button>
            <div className="flex flex-wrap gap-2 border-t border-white/[0.06] px-4 py-3">
              <Chip>Streaming</Chip>
            </div>
            <div className="border-t border-white/[0.06] px-4 pb-3 pt-2.5"><ConsentRail compact /></div>
          </SolidCard>
        </section>

        <section className="space-y-2.5">
          <SectionTitle title="Detected correlations" meta="Synthesized by CIA" />

          <SolidCard>
            <div className="flex items-center gap-2">
              <span className="rounded-pill bg-domain-sleep/15 px-3 py-1 text-[11px] font-semibold text-domain-sleep">Sleep</span>
              <ArrowRight size={13} strokeWidth={2} className="text-white/30" aria-hidden="true" />
              <span className="rounded-pill bg-white/[0.06] px-3 py-1 text-[11px] font-semibold text-white/60">Music</span>
            </div>
            <p className="mt-3 text-[14px] font-medium text-white">Sleep affects tempo pace</p>
            <div className="mt-2">
              <span className="text-[11px] font-semibold uppercase tracking-wide text-white/45">Reinforcing</span>
              <StrengthMeter filled={4} />
            </div>
            <p className="mt-2 text-[11px] text-white/40">Based on 14 synced days &middot; via WHOOP</p>
          </SolidCard>

          <SolidCard>
            <div className="flex items-center gap-2">
              <span className="rounded-pill bg-domain-career/15 px-3 py-1 text-[11px] font-semibold text-domain-career">Work</span>
              <ArrowRight size={13} strokeWidth={2} className="text-white/30" aria-hidden="true" />
              <span className="rounded-pill bg-domain-wellbeing/15 px-3 py-1 text-[11px] font-semibold text-domain-wellbeing">Wellbeing</span>
            </div>
            <p className="mt-3 text-[14px] font-medium text-white">Calendar density and stress</p>
            <div className="mt-2">
              <span className="text-[11px] font-semibold uppercase tracking-wide text-white/45">Competing &middot; early signal</span>
              <StrengthMeter filled={2} />
            </div>
            <p className="mt-2 text-[11px] text-white/40">Based on 5 days</p>
          </SolidCard>
        </section>

        <GlassCard tone="muted">
          <div className="flex items-start gap-3">
            <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/[0.05] text-forest-green">
              <ShieldCheck size={16} strokeWidth={1.9} />
            </span>
            <div>
              <p className="text-[13px] font-semibold text-white">Unhealthy sources are checked daily</p>
              <p className="mt-1 text-[12px] leading-4 text-white/55">Connection health is monitored continuously; nothing syncs without your consent.</p>
            </div>
          </div>
        </GlassCard>

        <BtnPrimary>
          <Plus size={17} strokeWidth={2.2} className="mr-1.5" />
          Connect source
        </BtnPrimary>
      </main>
    </HifiShell>
  )
}

// Qualitative strength ticks — correlation rows show a reinforcing/competing
// read and a synced-days provenance line, never a fabricated percentage.
function StrengthMeter({ filled, total = 8 }: { filled: number; total?: number }) {
  return (
    <div className="mt-1.5 flex h-1.5 gap-1" role="img" aria-label={`${filled} of ${total} strength bars filled`}>
      {Array.from({ length: total }).map((_, index) => (
        <span key={index} className={cx('h-full flex-1 rounded-pill', index < filled ? 'bg-royal-purple' : 'bg-white/10')} />
      ))}
    </div>
  )
}
