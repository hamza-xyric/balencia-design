import { ShieldCheck, Sparkles, FileText, ClipboardPlus, Share2, ImageDown, RefreshCw } from 'lucide-react'
import {
  HifiShell,
  TopBar,
  GlassCard,
  SolidCard,
  Chip,
  SectionTitle,
  ProgressRing,
  Sparkline,
  Provenance,
  BtnPrimary,
  BtnGhost,
  CIAInsightCard
} from '@/components/hifi/kit'

export function S78ReportsCenter() {
  return (
    <HifiShell
      header={
        <TopBar
          title="Reports"
          back
          right={<ShieldCheck className="h-5 w-5 text-royal-purple" />}
        />
      }
      activeTab="me"
      atmosphere="cia"
    >
      <main className="hide-scrollbar space-y-6 px-4 pb-10 pt-3">

        {/* Hero */}
        <section className="space-y-4">
          <div className="space-y-2">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/45">
              Report Builder
            </p>
            <h1 className="text-[26px] font-semibold leading-tight text-white">
              Build reports <span className="text-emphasis">CIA</span> helps you understand.
            </h1>
            <p className="text-[13px] leading-relaxed text-white/60">
              Review your data with CIA, choose what to share.
            </p>
          </div>
          
          <div className="flex flex-wrap items-center gap-2">
            <Chip tone="cia">
              <span className="inline-flex items-center gap-1.5">
                <Sparkles className="h-3 w-3" /> CIA Summary
              </span>
            </Chip>
            <Chip tone="muted">Private By Default</Chip>
            <Chip tone="done">Ready</Chip>
          </div>
        </section>

        {/* Recent Reports */}
        <section className="space-y-3">
          <SectionTitle title="Recent Reports" meta="2 drafts" />

          <GlassCard tone="you" className="p-4">
            <div className="flex items-start justify-between gap-4">
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <FileText className="h-4 w-4 text-brand-orange" />
                  <h2 className="text-[15px] font-semibold text-white">Weekly Life Report</h2>
                </div>
                <div className="flex flex-wrap items-center gap-1.5">
                  <Chip tone="you">6 Of 7 Days Synced</Chip>
                  <Chip tone="done">Ready</Chip>
                </div>
              </div>
              <ProgressRing percent={86} value="86%" size={56} tone="you" />
            </div>
          </GlassCard>

          <GlassCard tone="muted" className="p-4">
            <div className="flex items-start justify-between gap-4">
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <ClipboardPlus className="h-4 w-4 text-white/50" />
                  <h2 className="text-[15px] font-semibold text-white/90">Doctor Summary</h2>
                </div>
                <div className="flex flex-wrap items-center gap-1.5">
                  <Chip tone="muted">3 Of 7 Days Synced</Chip>
                  <Chip tone="muted">Draft</Chip>
                </div>
              </div>
              <ProgressRing percent={43} value="43%" size={56} tone="muted" />
            </div>
          </GlassCard>
        </section>

        {/* This Week */}
        <section className="space-y-3">
          <SectionTitle title="This Week" meta="Nov 12 – Nov 18" />

          <div className="grid grid-cols-2 gap-3">
            <SolidCard className="space-y-2 p-4">
              <div className="flex items-baseline justify-between">
                <span className="text-[13px] font-semibold text-white">Sleep</span>
                <span className="tabular-nums text-20px font-bold text-white">82%</span>
              </div>
              <Sparkline tone="you" />
              <Provenance items={['Via Wearable']} />
            </SolidCard>

            <SolidCard className="space-y-2 p-4">
              <div className="flex items-baseline justify-between">
                <span className="text-[13px] font-semibold text-white">Work</span>
                <span className="tabular-nums text-20px font-bold text-white">64%</span>
              </div>
              <Sparkline tone="you" />
              <Provenance items={['You Logged']} />
            </SolidCard>
          </div>
        </section>

        {/* CIA Insight */}
        <CIAInsightCard
          eyebrow="CIA Synthesis"
          provenance={['Estimated · Low Confidence']}
          actions={
            <div className="mt-4 flex flex-wrap items-center gap-2">
              <BtnPrimary>
                <span className="inline-flex items-center gap-2">
                  <Share2 className="h-4 w-4" /> Share
                </span>
              </BtnPrimary>
              <BtnGhost quiet>
                <span className="inline-flex items-center gap-2">
                  <ImageDown className="h-4 w-4" /> Screenshot Guide
                </span>
              </BtnGhost>
            </div>
          }
        >
          <p className="text-[14px] leading-relaxed text-white/80">
            Sleep firmed up most this <span className="text-emphasis">week</span>.
          </p>
        </CIAInsightCard>

        {/* Error State Row */}
        <section className="space-y-2">
          <SectionTitle title="Data Sources" />
          <SolidCard className="flex items-center justify-between p-4">
            <div>
              <p className="text-[14px] font-semibold text-white/80">Fitness Sync</p>
              <p className="mt-1 text-[11px] text-white/45">Connection failed</p>
            </div>
            <button type="button" aria-label="Retry Sync" className="inline-flex h-11 items-center gap-2 rounded-xl border border-white/10 px-3 text-[12px] font-semibold text-brand-orange">
              <RefreshCw className="h-4 w-4" /> Retry
            </button>
          </SolidCard>
        </section>

      </main>
    </HifiShell>
  )
}