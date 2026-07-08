import { Sparkles, BookOpen, PenLine, Wind, Brain, Sun, Check, ChevronRight } from 'lucide-react'
import {
  HifiShell,
  TopBar,
  GlassCard,
  SolidCard,
  Chip,
  SectionTitle,
  FloatingQuickLog,
  CIAInsightCard,
  HeatGrid,
  BtnPrimary,
  ConsentRail,
  SafetyCard,
  Provenance,
} from '@/components/hifi/kit'

export function S34SpiritualityDashboard() {
  return (
    <HifiShell
      header={
        <TopBar
          title="Spirituality"
          eyebrow="Lv 12"
          right={<button type="button" aria-label="Data sources" className="min-h-11 min-w-11" />}
        />
      }
      activeTab="today"
      bottomAction={<FloatingQuickLog label="Log practice" />}
      atmosphere="you"
    >
      <main className="space-y-4 px-4 pb-4 pt-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-royal-purple shadow-[var(--glow-purple-sm)]" />
            <p className="text-sm font-medium text-white/70 tracking-wide">Calm · Belief-adaptive</p>
          </div>
          <Chip tone="cia">CIA</Chip>
        </div>

        <CIAInsightCard
          eyebrow="CIA presence"
          provenance={['Synthesized from your week']}
          actions={
            <button type="button" className="text-sm text-royal-purple hover:text-royal-purple/80 transition-colors">
              Read more
            </button>
          }
        >
          <p className="text-[15px] leading-relaxed text-white/85">
            Your consistency with prayer has improved your overall <span className="text-emphasis">calm</span> this week.
          </p>
        </CIAInsightCard>

        <div>
          <SectionTitle title="Today's practice" meta="3 / 5" />
          <SolidCard>
            <ul className="divide-y divide-white/5">
              <li>
                <button type="button" className="flex w-full items-center gap-3 px-4 py-3 min-h-[52px] text-left">
                  <Sun className="h-4 w-4 text-white/50" />
                  <span className="flex-1 text-sm text-white/90">Fajr</span>
                  <span className="text-sm tabular-nums text-white/55">5:12 AM</span>
                  <Chip>Prayer API</Chip>
                </button>
              </li>
              <li>
                <button type="button" className="flex w-full items-center gap-3 px-4 py-3 min-h-[52px] text-left">
                  <Check className="h-4 w-4 text-forest-green" />
                  <span className="flex-1 text-sm text-white/90">Dhuhr</span>
                  <span className="text-xs text-forest-green">Completed</span>
                </button>
              </li>
              <li>
                <button type="button" className="flex w-full items-center gap-3 px-4 py-3 min-h-[52px] text-left">
                  <span className="h-4 w-4 rounded-full border border-white/20" aria-hidden="true" />
                  <span className="flex-1 text-sm text-white/90">Asr</span>
                  <ChevronRight className="h-4 w-4 text-white/30" />
                </button>
              </li>
              <li>
                <button type="button" className="flex w-full items-center gap-3 px-4 py-3 min-h-[52px] text-left">
                  <span className="h-4 w-4 rounded-full border border-white/20" aria-hidden="true" />
                  <span className="flex-1 text-sm text-white/90">Maghrib</span>
                  <ChevronRight className="h-4 w-4 text-white/30" />
                </button>
              </li>
              <li>
                <button type="button" className="flex w-full items-center gap-3 px-4 py-3 min-h-[52px] text-left">
                  <span className="h-4 w-4 rounded-full border border-white/20" aria-hidden="true" />
                  <span className="flex-1 text-sm text-white/90">Isha</span>
                  <ChevronRight className="h-4 w-4 text-white/30" />
                </button>
              </li>
            </ul>
          </SolidCard>
        </div>

        <div>
          <SectionTitle title="Consistency" meta="This week" />
          <SolidCard>
            <div className="p-4">
              <HeatGrid values={[1, 2, 0, 1, 3, 2, 0]} columns={7} />
              <p className="mt-3 text-xs text-white/55">Your practice history begins today.</p>
            </div>
          </SolidCard>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <GlassCard tone="you">
            <div className="flex flex-col gap-2 p-4 h-full">
              <div className="flex items-center gap-2 text-white/70">
                <BookOpen className="h-4 w-4 text-white/70" />
                <span className="text-[11px] uppercase tracking-wider">Reading</span>
              </div>
              <p className="text-sm text-white/90 leading-snug">Surah Al-Baqarah</p>
              <p className="mt-auto text-xs tabular-nums text-white/55">Page 42 / 604</p>
            </div>
          </GlassCard>

          <GlassCard tone="you">
            <div className="flex flex-col gap-2 p-4 h-full">
              <div className="flex items-center gap-2 text-white/70">
                <PenLine className="h-4 w-4 text-white/70" />
                <span className="text-[11px] uppercase tracking-wider">Reflection</span>
              </div>
              <p className="text-sm text-white/90 leading-snug">What are you grateful for today</p>
              <button type="button" className="mt-auto text-xs text-brand-orange text-left">Tap to write</button>
            </div>
          </GlassCard>
        </div>

        <div>
          <SectionTitle title="Rituals" />
          <div className="grid grid-cols-2 gap-3">
            <button type="button" className="text-left">
              <GlassCard tone="muted">
                <div className="flex flex-col gap-2 p-4 h-full min-h-11">
                  <Brain className="h-4 w-4 text-white/70" />
                  <p className="text-sm text-white/90">Contemplation</p>
                  <p className="text-xs text-white/55">5 minutes</p>
                </div>
              </GlassCard>
            </button>

            <button type="button" className="text-left">
              <GlassCard tone="muted">
                <div className="flex flex-col gap-2 p-4 h-full min-h-11">
                  <Wind className="h-4 w-4 text-white/70" />
                  <p className="text-sm text-white/90">Breathing</p>
                  <p className="text-xs text-white/55">4-7-8 method</p>
                </div>
              </GlassCard>
            </button>
          </div>
        </div>

        <div>
          <SectionTitle title="Today's mission" />
          <GlassCard tone="you">
            <div className="flex flex-col gap-3 p-4">
              <div className="flex items-start gap-3">
                <Sparkles className="h-4 w-4 text-brand-orange mt-1 flex-shrink-0" />
                <div className="flex-1">
                  <p className="text-sm text-white/90 leading-snug">Read two pages of Surah Al-Baqarah</p>
                  <p className="mt-1 text-xs text-white/55">Belief-adaptive practice</p>
                </div>
              </div>
              <BtnPrimary>Begin mission</BtnPrimary>
            </div>
          </GlassCard>
        </div>

        <div>
          <SectionTitle title="Data sources" />
          <ConsentRail compact />
          <Provenance items={['Prayer API · Source · Scope · Freshness · Retention · Export · Revoke · Delete']} />
        </div>

        <SafetyCard />

        <p className="text-xs text-white/45 px-1">Coaching support, not medical advice.</p>
      </main>
    </HifiShell>
  )
}