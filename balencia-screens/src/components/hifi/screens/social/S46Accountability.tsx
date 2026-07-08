import { Shield, Users, FileText, BellRing, Plus, ChevronRight, Heart } from 'lucide-react'
import {
  HifiShell,
  TopBar,
  GlassCard,
  SolidCard,
  SectionTitle,
  Chip,
  BtnPrimary,
  BtnGhost,
  BtnSuccess,
  ProgressRing,
  ProgressBar,
  ConsentRail,
  CIAInsightCard,
} from '@/components/hifi/kit'

export function S46Accountability() {
  return (
    <HifiShell
      header={<TopBar title="Accountability" eyebrow="Partners" back />}
      activeTab="me"
      atmosphere="cia"
    >
      <main className="space-y-4 px-4 pb-6 pt-3">
        <p className="text-[15px] leading-snug text-white/70">
          Manage your <span className="text-emphasis">accountability</span> circle and shared missions.
        </p>

        <GlassCard tone="cia" className="p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/[0.06] text-brand-orange">
              <Shield className="h-5 w-5" />
            </div>
            <div className="flex-1">
              <p className="text-[15px] font-medium text-white">Consent active</p>
              <p className="text-xs text-white/55">Aisha Khan sees active missions and progress</p>
            </div>
          </div>
          <div className="mt-4 flex flex-wrap gap-1.5">
            <Chip tone="muted">Category: Social</Chip>
            <Chip tone="muted">Scope: Limited</Chip>
            <Chip tone="muted">Source: Health</Chip>
            <Chip tone="muted">Freshness: Today</Chip>
          </div>
          <div className="mt-3">
            <ConsentRail compact />
          </div>
        </GlassCard>

        <div className="grid grid-cols-3 gap-2">
          <button type="button" className="flex h-11 flex-col items-center justify-center rounded-xl bg-white/[0.08] text-white">
            <Users className="h-4 w-4" />
            <span className="mt-0.5 text-[11px]">Partners</span>
          </button>
          <button type="button" className="flex h-11 flex-col items-center justify-center rounded-xl bg-white/[0.03] text-white/55">
            <FileText className="h-4 w-4" />
            <span className="mt-0.5 text-[11px]">Contracts</span>
          </button>
          <button type="button" className="flex h-11 flex-col items-center justify-center rounded-xl bg-white/[0.03] text-white/55">
            <BellRing className="h-4 w-4" />
            <span className="mt-0.5 text-[11px]">Triggers</span>
          </button>
        </div>

        <div>
          <SectionTitle title="Active partners" meta="2 connected" />
          <div className="space-y-2">
            <button type="button" className="flex h-14 w-full items-center gap-3 rounded-2xl bg-white/[0.04] px-3 text-left">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-brand-orange/40 to-brand-orange/10 text-sm font-semibold text-white">A</div>
              <div className="flex-1">
                <p className="text-sm font-medium text-white">Aisha Khan</p>
                <p className="text-xs text-white/50">Buddy · Lv 12 cohort</p>
              </div>
              <div className="flex items-center gap-2">
                <Chip tone="you">Motivation</Chip>
                <ChevronRight className="h-4 w-4 text-white/40" />
              </div>
            </button>

            <button type="button" className="flex h-14 w-full items-center gap-3 rounded-2xl bg-white/[0.04] px-3 text-left">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-royal-purple/40 to-royal-purple/10 text-sm font-semibold text-white">M</div>
              <div className="flex-1">
                <p className="text-sm font-medium text-white">Marcus Lee</p>
                <p className="text-xs text-white/50">Mentor · Weekly review</p>
              </div>
              <div className="flex items-center gap-2">
                <Chip tone="muted">Guidance</Chip>
                <ChevronRight className="h-4 w-4 text-white/40" />
              </div>
            </button>

            <button type="button" className="flex h-14 w-full items-center gap-3 rounded-2xl border border-dashed border-white/15 px-3 text-left text-white/70">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/[0.04]">
                <Plus className="h-5 w-5" />
              </div>
              <span className="flex-1 text-sm">Add partner</span>
            </button>
          </div>
        </div>

        <div>
          <SectionTitle title="Shared missions" meta="2 visible" />
          <SolidCard className="space-y-4 p-4">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-sm text-white">Run a half marathon</p>
                <p className="mt-1 flex items-center gap-1.5 text-xs text-white/45">
                  <span className="h-1.5 w-1.5 rounded-full bg-forest-green" />
                  Visible to Aisha Khan
                </p>
              </div>
              <ProgressRing percent={68} value="68%" size={56} tone="you" />
            </div>
            <ProgressBar value={68} tone="you" />

            <div className="flex items-center justify-between gap-3 border-t border-white/[0.06] pt-3">
              <div>
                <p className="text-sm text-white">Save $5,000 by December</p>
                <p className="mt-1 flex items-center gap-1.5 text-xs text-white/45">
                  <span className="h-1.5 w-1.5 rounded-full bg-forest-green" />
                  Visible to Aisha Khan
                </p>
              </div>
              <ProgressRing percent={42} value="42%" size={56} tone="you" />
            </div>
            <ProgressBar value={42} tone="you" />
          </SolidCard>
        </div>

        <CIAInsightCard
          eyebrow="CIA Synthesis"
          provenance={["Aisha Khan · 2 days", "Run mission"]}
        >
          <p className="text-[15px] leading-relaxed text-white/80">
            Aisha Khan completed her run today. A short check-in could reinforce your shared mission.
          </p>
        </CIAInsightCard>

        <div>
          <SectionTitle title="Triggers" meta="1 active rule" />
          <SolidCard className="p-4">
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/[0.04] text-brand-orange">
                <BellRing className="h-4 w-4" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-white">Missed check-in</p>
                <p className="mt-0.5 text-xs text-white/50">If 2 days pass without activity, notify Aisha Khan</p>
                <div className="mt-2">
                  <Chip tone="you">Source: You</Chip>
                </div>
              </div>
              <BtnSuccess>On</BtnSuccess>
            </div>
          </SolidCard>
        </div>

        <GlassCard tone="muted" className="flex items-center gap-3 p-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/[0.04] text-red-400/80">
            <Heart className="h-4 w-4" />
          </div>
          <div className="flex-1">
            <p className="text-sm text-white">Emergency contact</p>
            <p className="text-xs text-white/50">Marcus Lee · Mentor</p>
          </div>
          <Chip tone="muted">Safety</Chip>
        </GlassCard>

        <div className="space-y-3 pt-2">
          <BtnPrimary>Review shared data</BtnPrimary>
          <BtnGhost quiet>Revoke partner access</BtnGhost>
        </div>
      </main>
    </HifiShell>
  )
}