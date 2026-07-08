import type { ComponentType } from 'react'
import {
  AppWindow,
  Award,
  BookOpen,
  BrainCircuit,
  Camera,
  ChevronRight,
  Flame,
  Gauge,
  HeartPulse,
  Image as ImageIcon,
  Search,
  Settings,
  ShieldCheck,
  Star,
  Trophy,
} from 'lucide-react'
import {
  BtnGhost,
  CIAInsightCard,
  ConsentRail,
  GlassCard,
  HifiShell,
  IconButton,
  ProgressBar,
  Provenance,
  SolidCard,
  TopBar,
} from '@/components/hifi/kit'
import { persona } from '@/data/hifi/persona'

function AvatarUploader() {
  return (
    <button
      type="button"
      aria-label="Profile photo, double tap to change. Amira's current photo."
      className="relative flex h-20 w-20 shrink-0 items-center justify-center rounded-full"
    >
      <span className="flex h-full w-full items-center justify-center rounded-full border border-white/15 bg-white/[0.06] text-[22px] font-semibold text-white/85">
        AM
      </span>
      <span className="absolute -bottom-1 -right-1 flex h-8 w-8 items-center justify-center rounded-full border-2 border-ink-900 bg-white/10">
        <Camera className="h-4 w-4 text-white/85" strokeWidth={2} />
      </span>
    </button>
  )
}

function QuickLinkCard({
  icon: Icon,
  title,
  subtitle,
}: {
  icon: ComponentType<{ className?: string; strokeWidth?: number }>
  title: string
  subtitle: string
}) {
  return (
    <button type="button" aria-label={`${title}, ${subtitle}`} className="text-left">
      <GlassCard tone="muted" className="flex h-full flex-col justify-between gap-3 p-3.5">
        <div className="flex items-center justify-between">
          <Icon className="h-4 w-4 text-white/70" strokeWidth={1.9} />
          <ChevronRight className="h-4 w-4 text-white/30" strokeWidth={1.9} />
        </div>
        <div>
          <p className="text-[14px] font-medium leading-tight text-white">{title}</p>
          <p className="mt-0.5 text-[12px] leading-tight text-white/50 tabular-nums">{subtitle}</p>
        </div>
      </GlassCard>
    </button>
  )
}

function DataRow({
  icon: Icon,
  title,
  meta,
}: {
  icon: ComponentType<{ className?: string; strokeWidth?: number }>
  title: string
  meta: string
}) {
  return (
    <button
      type="button"
      aria-label={`${title}, ${meta}`}
      className="flex min-h-11 w-full items-center justify-between gap-3 rounded-xl px-1 py-2 text-left"
    >
      <span className="flex items-center gap-2.5">
        <Icon className="h-4 w-4 shrink-0 text-white/50" strokeWidth={1.8} />
        <span className="text-[14px] font-medium text-white/85">{title}</span>
      </span>
      <span className="flex items-center gap-1.5 text-white/45">
        <span className="text-[12px] tabular-nums">{meta}</span>
        <ChevronRight className="h-4 w-4 text-white/30" strokeWidth={1.8} />
      </span>
    </button>
  )
}

// Me Main — identity hub. Chosen state: default, populated, all sources
// reporting. Honest-null (level 1, ghosted domain bars, starter quick-link
// subtitles), low-confidence (cached stats muted, "estimated · low
// confidence"), offline/disabled (pull-to-refresh and avatar upload at 40%),
// skeleton, error (scoped ErrorState per module), and success ("Stats
// refreshed" toast) are documented in the source spec — static prototype,
// no handlers.
export function S17MeMain() {
  return (
    <HifiShell
      header={
        <TopBar
          title="Profile"
          back={false}
          right={
            <div className="flex items-center gap-1">
              <IconButton label="Search profile">
                <Search className="h-5 w-5" strokeWidth={1.9} />
              </IconButton>
              <IconButton label="Settings">
                <Settings className="h-5 w-5" strokeWidth={1.9} />
              </IconButton>
            </div>
          }
        />
      }
      activeTab="me"
      showTabBar
      atmosphere="you"
    >
      <main className="space-y-4 px-4 pb-6 pt-3">
        {/* Capture frame — dominant focal moment */}
        <GlassCard tone="you">
          <div className="flex flex-col items-center gap-4 text-center">
            <AvatarUploader />
            <div>
              <h2 className="text-[22px] font-semibold leading-7 text-white">{persona.firstName}</h2>
              <p className="mt-1 text-[13px] font-medium text-white/55">Level {persona.level} &middot; dedicated explorer</p>
            </div>
            <div className="w-full space-y-2">
              <div className="flex items-baseline justify-between text-[11px] uppercase tracking-wide text-white/40">
                <span>Experience</span>
                <span className="text-[13px] font-medium normal-case tabular-nums text-white/75">2,450 / 5,809 XP</span>
              </div>
              <ProgressBar value={42} tone="you" />
            </div>
            <p className="text-[12px] text-white/40">Member since May 2026</p>
            <p className="max-w-[260px] text-[13px] leading-5 text-white/55">
              Your <span className="text-emphasis">main</span> hub for progress, missions, and what CIA has learned.
            </p>
            <Provenance items={['Via profile']} />
          </div>
        </GlassCard>

        {/* KPI row — glass, no glow */}
        <div className="grid grid-cols-2 gap-2.5">
          <GlassCard tone="muted" className="p-3.5">
            <div className="flex items-center gap-2 text-white/55">
              <Flame className="h-4 w-4 text-brand-orange" strokeWidth={1.9} />
              <span className="text-[11px] font-semibold uppercase tracking-wide">Streak</span>
            </div>
            <p className="mt-2 text-[20px] font-semibold leading-6 text-white tabular-nums">42 days</p>
            <div className="mt-2"><Provenance items={['You logged']} /></div>
          </GlassCard>
          <GlassCard tone="muted" className="p-3.5">
            <div className="flex items-center gap-2 text-white/55">
              <Trophy className="h-4 w-4 text-brand-orange" strokeWidth={1.9} />
              <span className="text-[11px] font-semibold uppercase tracking-wide">Completed</span>
            </div>
            <p className="mt-2 text-[20px] font-semibold leading-6 text-white tabular-nums">12 missions</p>
            <div className="mt-2"><Provenance items={['Via profile']} /></div>
          </GlassCard>
          <GlassCard tone="muted" className="p-3.5">
            <div className="flex items-center gap-2 text-white/55">
              <Gauge className="h-4 w-4 text-brand-orange" strokeWidth={1.9} />
              <span className="text-[11px] font-semibold uppercase tracking-wide">Life power</span>
            </div>
            <p className="mt-2 text-[20px] font-semibold leading-6 text-white tabular-nums">{persona.lifePower} points</p>
            <div className="mt-2"><Provenance items={['Calculated']} /></div>
          </GlassCard>
          <GlassCard tone="muted" className="p-3.5">
            <div className="flex items-center gap-2 text-white/55">
              <Star className="h-4 w-4 text-brand-orange" strokeWidth={1.9} />
              <span className="text-[11px] font-semibold uppercase tracking-wide">Total XP</span>
            </div>
            <p className="mt-2 text-[20px] font-semibold leading-6 text-white tabular-nums">8,450 XP</p>
            <div className="mt-2"><Provenance items={['Via profile']} /></div>
          </GlassCard>
        </div>

        {/* Life Power composition — dense, solid */}
        <SolidCard className="space-y-4 p-4">
          <div className="flex items-center justify-between">
            <p className="text-[12px] font-semibold uppercase tracking-wide text-white/45">Composed of</p>
            <BtnGhost quiet className="px-0">
              <span className="flex items-center gap-1 text-[12px]">
                See all 10 <ChevronRight className="h-3 w-3" strokeWidth={1.9} />
              </span>
            </BtnGhost>
          </div>

          <div className="space-y-3">
            <div>
              <div className="mb-1.5 flex items-center justify-between">
                <span className="text-[13px] font-medium text-white/80">Fitness</span>
                <span className="text-[13px] font-semibold tabular-nums text-white/70">74</span>
              </div>
              <ProgressBar value={74} tone="you" />
              <div className="mt-1.5"><Provenance items={['Via WHOOP']} /></div>
            </div>
            <div>
              <div className="mb-1.5 flex items-center justify-between">
                <span className="text-[13px] font-medium text-white/80">Wellbeing</span>
                <span className="text-[13px] font-semibold tabular-nums text-white/70">62</span>
              </div>
              <ProgressBar value={62} tone="you" />
              <div className="mt-1.5"><Provenance items={['Via Health']} /></div>
            </div>
            <div>
              <div className="mb-1.5 flex items-center justify-between">
                <span className="text-[13px] font-medium text-white/80">Career</span>
                <span className="text-[13px] font-semibold tabular-nums text-white/70">55</span>
              </div>
              <ProgressBar value={55} tone="you" />
              <div className="mt-1.5"><Provenance items={['You logged']} /></div>
            </div>
          </div>
        </SolidCard>

        {/* Quick links grid */}
        <div className="grid grid-cols-2 gap-2.5">
          <QuickLinkCard icon={BookOpen} title="Mission journal" subtitle="18 entries" />
          <QuickLinkCard icon={ShieldCheck} title="Book of life" subtitle="What CIA knows" />
          <QuickLinkCard icon={AppWindow} title="Connected apps" subtitle="3 connected" />
          <QuickLinkCard icon={ImageIcon} title="Progress photos" subtitle="24 photos" />
          <QuickLinkCard icon={Award} title="Achievements" subtitle="31 earned" />
        </div>

        {/* Data sources & consent — the hub */}
        <SolidCard className="space-y-1 p-4">
          <div className="flex items-center justify-between pb-1">
            <p className="text-[12px] font-semibold uppercase tracking-wide text-white/45">Data &amp; consent</p>
          </div>
          <div className="divide-y divide-white/[0.06]">
            <DataRow icon={BrainCircuit} title="CIA memory" meta="20 facts" />
            <DataRow icon={ShieldCheck} title="Data sources" meta="84 connected" />
            <DataRow icon={HeartPulse} title="Health view" meta="96 items" />
          </div>
          <p className="pt-1 text-[12px] leading-4 text-white/55">
            Coaching support, not medical advice. Mood trends carry no XP or streak.
          </p>
          <ConsentRail compact />
        </SolidCard>

        {/* Discovery */}
        <section className="space-y-2">
          <p className="px-1 text-[11px] font-semibold uppercase tracking-wide text-white/40">Suggested for you</p>
          <CIAInsightCard
            eyebrow="Grow your practice"
            provenance={['Via recent activity']}
            actions={
              <BtnGhost quiet={false} className="px-0">
                <span className="flex items-center gap-1">
                  Grow your meditation <ChevronRight className="h-4 w-4" strokeWidth={1.9} />
                </span>
              </BtnGhost>
            }
          >
            <p>You have logged three sessions this month. A few more minutes daily could deepen your calm baseline.</p>
          </CIAInsightCard>
        </section>
      </main>
    </HifiShell>
  )
}
