import { Plus, ChevronRight, CloudOff, Download, Info, Loader2, Plug, Trash2, Zap } from 'lucide-react'
import { BtnGhost, BtnPrimary, Chip, CIAInsightCard, GlassCard, HifiShell, IconButton, Provenance, SectionTitle, SolidCard, TopBar } from '@/components/hifi/kit'

export function S22ConnectedServices() {
  return (
    <HifiShell
      header={
        <TopBar
          title="Connected services"
          eyebrow="Me · Amira · Lv 12"
          back
          right={<IconButton label="Info"><Plus size={18} /></IconButton>}
        />
      }
      activeTab="me"
      atmosphere="you"
    >
      <main className="space-y-5 px-4 pb-6 pt-2">
        <div className="px-1 pt-2">
          <h2 className="text-[22px] leading-tight font-semibold text-white/90 tracking-[-0.01em]">
            Manage your external <span className="text-emphasis">services</span>
          </h2>
        </div>

        <CIAInsightCard
          eyebrow="Coach Note"
          provenance={['Via CIA · read-only']}
        >
          <p className="text-[13px] leading-[1.5] text-white/65">
            Connecting sources like WHOOP unlocks deeper correlations across recovery and effort, supporting your mission pace.
          </p>
          <div className="mt-3">
            <BtnGhost>View privacy controls</BtnGhost>
          </div>
        </CIAInsightCard>

        <section className="space-y-3 pt-1">
          <SectionTitle title="Wearables & fitness" meta="4 services" />
          <div className="space-y-3">
            <div className="space-y-2">
              <SolidCard>
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="h-10 w-10 rounded-xl bg-domain-fitness/15 text-domain-fitness flex items-center justify-center shrink-0">
                      <Zap size={18} strokeWidth={2.2} />
                    </div>
                    <div className="min-w-0">
                      <p className="text-[14px] font-medium text-white/90 truncate">WHOOP</p>
                      <p className="text-[11px] text-white/45 mt-0.5">Syncing: sleep, HRV, recovery</p>
                    </div>
                  </div>
                  <div className="shrink-0">
                    <Chip tone="you">Connected</Chip>
                  </div>
                </div>
                <div className="mt-3 pt-3 border-t border-white/[0.06] flex items-center justify-between gap-3 flex-wrap">
                  <div className="flex items-center gap-2">
                    <Provenance items={['Via WHOOP']} />
                    <span className="text-[11px] text-white/45 tabular-nums">2m ago</span>
                  </div>
                  <button type="button" className="text-[12px] font-medium text-white/60 hover:text-white/90 transition-colors h-9 px-2 -mr-2 inline-flex items-center gap-1">
                    <Plug size={12} strokeWidth={2.5} />
                    Force sync
                  </button>
                </div>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  <Chip tone="muted">Source</Chip>
                  <Chip tone="muted">Scope</Chip>
                  <Chip tone="muted">Freshness</Chip>
                  <Chip tone="muted">Retention</Chip>
                  <Chip tone="muted">Export</Chip>
                  <Chip tone="muted">Revoke</Chip>
                  <Chip tone="muted">Delete</Chip>
                </div>
              </SolidCard>
              <div className="flex items-center gap-2 pl-1">
                <Loader2 size={11} className="text-white/40 animate-spin" />
                <span className="text-[11px] text-white/40">Auto-retrying in background</span>
              </div>
            </div>

            <SolidCard>
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="h-10 w-10 rounded-xl bg-white/[0.04] text-white/70 flex items-center justify-center shrink-0">
                    <Zap size={18} strokeWidth={2.2} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[14px] font-medium text-white/90 truncate">Apple Health</p>
                    <p className="text-[11px] text-white/45 mt-0.5">Will sync: steps, workouts</p>
                  </div>
                </div>
                <div className="shrink-0">
                  <Chip tone="muted">Not connected</Chip>
                </div>
              </div>
              <div className="mt-3 pt-3 border-t border-white/[0.06] flex items-center justify-between gap-3 flex-wrap">
                <div className="flex items-center gap-2">
                  <CloudOff size={12} className="text-white/40" />
                  <span className="text-[11px] text-white/45">Awaiting first sync</span>
                </div>
                <button type="button" className="inline-flex items-center justify-center text-[13px] font-medium text-ink-900 bg-brand-orange h-11 px-4 rounded-full shadow-[var(--glow-orange-sm)] hover:opacity-90 transition-opacity">
                  Connect
                </button>
              </div>
            </SolidCard>

            <SolidCard>
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="h-10 w-10 rounded-xl bg-white/[0.04] text-white/70 flex items-center justify-center shrink-0">
                    <Zap size={18} strokeWidth={2.2} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[14px] font-medium text-white/90 truncate">Fitbit</p>
                    <p className="text-[11px] text-white/45 mt-0.5">Will sync: steps, heart rate</p>
                  </div>
                </div>
                <div className="shrink-0">
                  <Chip tone="muted">Sync pending</Chip>
                </div>
              </div>
            </SolidCard>

            <SolidCard>
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="h-10 w-10 rounded-xl bg-white/[0.04] text-white/70 flex items-center justify-center shrink-0">
                    <Zap size={18} strokeWidth={2.2} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[14px] font-medium text-white/90 truncate">Garmin</p>
                    <p className="text-[11px] text-white/45 mt-0.5">Will sync: workouts, VO2 max</p>
                  </div>
                </div>
                <div className="shrink-0">
                  <Chip tone="muted">Not connected</Chip>
                </div>
              </div>
              <div className="mt-3 pt-3 border-t border-white/[0.06]">
                <button type="button" className="w-full inline-flex items-center justify-center text-[13px] font-medium text-white/80 bg-white/[0.04] h-11 px-4 rounded-full hover:bg-white/[0.06] transition-colors opacity-40 cursor-not-allowed">
                  Notify me when available
                </button>
              </div>
            </SolidCard>
          </div>
        </section>

        <section className="space-y-3 pt-1">
          <SectionTitle title="Nutrition" meta="3 services" />
          <div className="space-y-3">
            <SolidCard>
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="h-10 w-10 rounded-xl bg-white/[0.04] text-white/70 flex items-center justify-center shrink-0">
                    <Info size={18} strokeWidth={2.2} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[14px] font-medium text-white/90 truncate">MyFitnessPal</p>
                    <p className="text-[11px] text-white/45 mt-0.5">Will sync: calories, macros</p>
                  </div>
                </div>
                <div className="shrink-0">
                  <Chip tone="muted">Not connected</Chip>
                </div>
              </div>
            </SolidCard>

            <SolidCard>
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="h-10 w-10 rounded-xl bg-white/[0.04] text-white/70 flex items-center justify-center shrink-0">
                    <Info size={18} strokeWidth={2.2} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[14px] font-medium text-white/90 truncate">Cronometer</p>
                    <p className="text-[11px] text-white/45 mt-0.5">Will sync: micronutrients</p>
                  </div>
                </div>
                <div className="shrink-0">
                  <Chip tone="muted">Not connected</Chip>
                </div>
              </div>
            </SolidCard>

            <SolidCard>
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="h-10 w-10 rounded-xl bg-white/[0.04] text-white/70 flex items-center justify-center shrink-0">
                    <Info size={18} strokeWidth={2.2} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[14px] font-medium text-white/90 truncate">Lumen</p>
                    <p className="text-[11px] text-white/45 mt-0.5">Will sync: metabolic rate</p>
                  </div>
                </div>
                <div className="shrink-0">
                  <Chip tone="muted">Not connected</Chip>
                </div>
              </div>
            </SolidCard>
          </div>
        </section>

        <section className="space-y-3 pt-1">
          <SectionTitle title="Productivity" meta="1 service" />
          <div className="space-y-3">
            <SolidCard>
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="h-10 w-10 rounded-xl bg-white/[0.04] text-white/70 flex items-center justify-center shrink-0">
                    <Info size={18} strokeWidth={2.2} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[14px] font-medium text-white/90 truncate">Google Calendar</p>
                    <p className="text-[11px] text-white/45 mt-0.5">Will sync: events, meetings</p>
                  </div>
                </div>
                <div className="shrink-0">
                  <Chip tone="muted">Not connected</Chip>
                </div>
              </div>
              <div className="mt-3 pt-3 border-t border-white/[0.06] flex items-center justify-between gap-3 flex-wrap">
                <button type="button" className="text-[11px] text-white/45 hover:text-white/70 transition-colors h-9 px-2 -ml-2 inline-flex items-center gap-1">
                  <Info size={11} strokeWidth={2.5} />
                  Route: /calendar/connected
                </button>
                <button type="button" className="inline-flex items-center justify-center text-[13px] font-medium text-ink-900 bg-brand-orange h-11 px-4 rounded-full shadow-[var(--glow-orange-sm)] hover:opacity-90 transition-opacity">
                  Connect
                </button>
              </div>
            </SolidCard>
          </div>
        </section>

        <section className="space-y-3 pt-1">
          <SectionTitle title="Lifestyle" meta="1 service" />
          <div className="space-y-3">
            <SolidCard>
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="h-10 w-10 rounded-xl bg-white/[0.04] text-white/70 flex items-center justify-center shrink-0">
                    <Info size={18} strokeWidth={2.2} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[14px] font-medium text-white/90 truncate">Spotify</p>
                    <p className="text-[11px] text-white/45 mt-0.5">Will sync: listening history</p>
                  </div>
                </div>
                <div className="shrink-0">
                  <Chip tone="muted">Not connected</Chip>
                </div>
              </div>
            </SolidCard>
          </div>
        </section>

        <section className="space-y-3 pt-1">
          <SectionTitle title="Consent controls" meta="Per provider" />
          <GlassCard tone="muted">
            <p className="text-[13px] leading-[1.5] text-white/65">
              All providers honor your per-consent choices for source, retention, export, revoke, and delete. CIA handles correlations only.
            </p>
            <div className="mt-4 space-y-2">
              <button type="button" className="w-full h-11 inline-flex items-center justify-between gap-3 px-4 rounded-2xl bg-white/[0.03] border border-white/[0.06] hover:bg-white/[0.05] transition-colors text-left">
                <span className="text-[13px] text-white/85 inline-flex items-center gap-2">
                  <Download size={14} className="text-white/50" />
                  Export all connected data
                </span>
                <ChevronRight size={16} className="text-white/40" />
              </button>
              <button type="button" className="w-full h-11 inline-flex items-center justify-between gap-3 px-4 rounded-2xl bg-white/[0.03] border border-white/[0.06] hover:bg-white/[0.05] transition-colors text-left">
                <span className="text-[13px] text-white/85 inline-flex items-center gap-2">
                  <Trash2 size={14} className="text-white/50" />
                  Delete provider history
                </span>
                <ChevronRight size={16} className="text-white/40" />
              </button>
            </div>
          </GlassCard>
        </section>

        <div className="pt-2">
          <BtnPrimary>Save preferences</BtnPrimary>
        </div>
      </main>
    </HifiShell>
  )
}