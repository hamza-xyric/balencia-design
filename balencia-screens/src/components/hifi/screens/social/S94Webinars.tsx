import { Search, Calendar, Share2, PlayCircle, Clock, Video, ChevronRight, Sparkles } from 'lucide-react'
import {
  HifiShell,
  TopBar,
  IconButton,
  GlassCard,
  SolidCard,
  SectionTitle,
  Chip,
  BtnPrimary,
  BtnSecondary,
  BtnGhost,
  CIAInsightCard,
  ProgressBar,
  ConsentRail,
  ComplianceFooter,
} from '@/components/hifi/kit'

export function S94Webinars() {
  return (
    <HifiShell
      header={
        <TopBar
          title="Webinars"
          right={<IconButton label="Search"><Search className="h-5 w-5" /></IconButton>}
        />
      }
      activeTab="me"
    >
      <main className="space-y-5 px-4 pb-4 pt-3">
        <p className="text-[15px] leading-snug text-white/70">
          Join live expert <span className="text-emphasis">sessions</span> and watch recorded workshops on your schedule.
        </p>

        <GlassCard tone="cia">
          <div className="flex items-center gap-2">
            <span className="inline-flex h-2 w-2 animate-pulse rounded-full bg-rose-400" />
            <span className="text-overline-mini text-rose-300/90 uppercase tracking-[0.2em]">Live Tomorrow</span>
            <span className="ml-auto text-xs text-white/40">Via Balencia events</span>
          </div>
          <h2 className="mt-3 text-2xl font-semibold tracking-tight text-white">
            Live Reset For Sleep
          </h2>
          <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-white/60">
            <span className="tabular-nums">Thu 7:00 PM EST</span>
            <span className="text-white/20">|</span>
            <span>Speaker: Dr. Anya Rana</span>
          </div>
          <div className="mt-1 text-sm text-white/50">
            Host: Balencia Wellbeing
          </div>
          <div className="mt-4 flex items-center justify-between border-t border-white/5 pt-3">
            <div className="text-xs text-white/40">
              <span className="font-medium text-white/70">Seats open</span> · Source /webinars
            </div>
            <button
              type="button"
              className="inline-flex h-11 items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 text-sm text-white/70 transition hover:bg-white/[0.07]"
              aria-label="Add live reset for sleep to calendar"
            >
              <Calendar className="h-4 w-4" />
              Add to calendar
            </button>
          </div>
          <div className="mt-3">
            <BtnPrimary>
              Register for session
            </BtnPrimary>
          </div>
        </GlassCard>

        <div role="tablist" aria-label="Webinar filters" className="grid grid-cols-3 gap-2">
          {['Upcoming', 'Registered', 'Recordings'].map((tab, i) => (
            <button
              key={tab}
              type="button"
              role="tab"
              aria-selected={i === 0}
              className={`h-11 rounded-2xl border text-sm transition ${
                i === 0
                  ? 'border-white/10 bg-white/[0.06] text-white'
                  : 'border-white/5 bg-white/[0.02] text-white/50 hover:bg-white/[0.04]'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="space-y-3">
          <SectionTitle title="Continue watching" meta="2 recordings" />

          <SolidCard>
            <div className="flex gap-4">
              <div
                role="img"
                aria-label="Abstract warm dark gradient artwork for stress reset workshop"
                className="relative h-[88px] w-[88px] shrink-0 overflow-hidden rounded-2xl border border-white/5 bg-white/[0.03]"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-amber-500/20 via-rose-500/10 to-transparent" />
                <Video className="absolute bottom-2 left-2 h-5 w-5 text-white/40" />
              </div>
              <div className="flex flex-1 flex-col justify-center">
                <span className="text-overline-mini text-royal-purple/90 uppercase tracking-[0.18em]">CIA matched</span>
                <h3 className="mt-1 text-base font-medium text-white">Stress Reset Workshop</h3>
                <p className="mt-1 text-sm text-white/50">
                  Speaker Maya · <span className="tabular-nums">42 min</span> recording
                </p>
              </div>
            </div>
            <div className="mt-4 space-y-2">
              <div className="flex justify-between text-xs text-white/40">
                <span className="tabular-nums">Watch progress 38%</span>
                <span>Via Balencia library</span>
              </div>
              <ProgressBar value={38} tone="you" />
            </div>
            <div className="mt-3 grid grid-cols-2 gap-2">
              <BtnGhost>
                <Share2 className="h-4 w-4" />
                Share
              </BtnGhost>
              <BtnSecondary>
                <PlayCircle className="h-4 w-4" />
                Watch
              </BtnSecondary>
            </div>
          </SolidCard>

          <CIAInsightCard
            eyebrow="Personalized for Amira"
            provenance={['Active missions: Run a half marathon', 'Buddy: Aisha Khan', 'Lv 12 member']}
            actions={
              <div className="mt-2 flex items-center gap-2 text-xs text-royal-purple/80">
                <Sparkles className="h-3.5 w-3.5" />
                Topic match · low confidence
              </div>
            }
          >
            <p className="text-sm leading-relaxed text-white/80">
              This session supports your active sleep and stress mission. Adding it to your weekly plan may help sustain recovery alongside your half marathon training.
            </p>
          </CIAInsightCard>
        </div>

        <div className="space-y-3">
          <SectionTitle title="Upcoming this month" />
          <SolidCard>
            <div className="flex items-center justify-between">
              <div className="flex items-start gap-3">
                <div className="flex h-11 w-11 shrink-0 flex-col items-center justify-center rounded-xl border border-white/5 bg-white/[0.03] text-center">
                  <span className="text-[10px] font-medium uppercase tracking-wider text-white/40">Nov</span>
                  <span className="text-base font-semibold tabular-nums text-white/90">14</span>
                </div>
                <div>
                  <h4 className="text-base font-medium text-white">Building Resilience Daily</h4>
                  <p className="mt-0.5 text-sm text-white/50">Speaker: Dr. Jordan Lee</p>
                </div>
              </div>
              <ChevronRight className="h-5 w-5 text-white/30" />
            </div>
            <div className="mt-4 flex flex-wrap items-center gap-2">
              <Chip><Clock className="h-3 w-3" /> 6:00 PM EST</Chip>
              <Chip>Source /webinars</Chip>
              <Chip tone="muted">Date pending confirmation</Chip>
            </div>
          </SolidCard>
        </div>

        <div className="space-y-2 pt-2">
          <ConsentRail compact />
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 px-1 text-xs text-white/40">
            <button type="button" className="hover:text-white/70">Speaker bio</button>
            <span className="text-white/10">·</span>
            <button type="button" className="hover:text-white/70">Privacy</button>
            <span className="text-white/10">·</span>
            <button type="button" className="hover:text-white/70">Support</button>
          </div>
        </div>

        <ComplianceFooter />
      </main>
    </HifiShell>
  )
}