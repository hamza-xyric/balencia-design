import Link from 'next/link'
import type { CSSProperties } from 'react'
import {
  ArrowDown,
  ArrowUp,
  AlertTriangle,
  Check,
  ChevronLeft,
  ChevronRight,
  GitBranch,
  MoreHorizontal,
  ThumbsDown,
  ThumbsUp,
} from 'lucide-react'
import { Card } from '@/components/design-system/Card'
import { PhoneFrame } from '@/components/layout/PhoneFrame'
import { ScreenShell } from '@/components/layout/ScreenShell'
import { intelligenceDashboard } from '@/data/mock'

// Screen 48 of 78: Intelligence
// Spec: /Users/hamza/yHealth/app_design 3/48-intelligence-dashboard.md

function pointsFor(values: number[], width: number, height: number, padding = 2) {
  const min = Math.min(...values)
  const max = Math.max(...values)
  const span = Math.max(1, max - min)

  return values.map((value, index) => {
    const x = values.length === 1 ? width / 2 : (index / (values.length - 1)) * width
    const y = height - padding - ((value - min) / span) * (height - padding * 2)
    return `${x.toFixed(1)},${y.toFixed(1)}`
  }).join(' ')
}

function IntelligenceHeader() {
  return (
    <header className="z-30 h-[88px] shrink-0 bg-ink-900/95 backdrop-blur-md">
      <div className="flex h-11 items-center px-4">
        <Link href="/tabs/me/explore" className="-ml-2 flex h-11 w-11 items-center justify-center rounded-full text-white" aria-label="Back">
          <ChevronLeft size={20} strokeWidth={2.1} />
        </Link>
        <h1 className="min-w-0 flex-1 truncate text-h2 font-semibold leading-[26px] text-white">Intelligence</h1>
        <button type="button" className="flex h-11 w-11 items-center justify-center rounded-full text-white/60" aria-label="More intelligence options">
          <MoreHorizontal size={20} strokeWidth={2.1} />
        </button>
      </div>
      <div className="h-[3px] w-full bg-royal-purple/80" aria-hidden="true" />
      <div className="flex h-[41px] items-center px-6">
        <span className="text-small font-semibold uppercase leading-[14px] tracking-[0.12em] text-royal-purple">
          SIA intelligence briefing
        </span>
      </div>
    </header>
  )
}

function ScoreRing() {
  const size = 120
  const radius = 52
  const circumference = 2 * Math.PI * radius
  const offset = circumference * (1 - intelligenceDashboard.score / 100)

  return (
    <div className="relative mx-auto flex h-[120px] w-[120px] items-center justify-center">
      <div className="absolute inset-0 rounded-full bg-royal-purple/10 blur-2xl" aria-hidden="true" />
      <svg className="relative -rotate-90" width={size} height={size} viewBox={`0 0 ${size} ${size}`} aria-hidden="true">
        <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="currentColor" strokeWidth={8} className="text-white/10" />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth={8}
          strokeLinecap="round"
          strokeDasharray={circumference}
          className="ring-animate text-royal-purple"
          style={{
            '--ring-circumference': circumference,
            '--ring-target': offset,
          } as CSSProperties}
        />
      </svg>
      <div className="absolute inset-0 flex items-baseline justify-center pt-[39px]">
        <span className="text-[36px] font-bold leading-[44px] text-white tabular-nums">{intelligenceDashboard.score}</span>
        <span className="ml-1 text-[14px] leading-5 text-white/40">/100</span>
      </div>
    </div>
  )
}

function Sparkline({ points, trend }: { points: number[]; trend: string }) {
  const TrendIcon = trend === 'up' ? ArrowUp : trend === 'down' ? ArrowDown : null
  const tone = trend === 'up' ? 'text-forest-green' : trend === 'down' ? 'text-brand-orange' : 'text-white/40'

  return (
    <div className="flex items-center justify-center gap-1">
      <svg className="h-6 w-16 text-royal-purple/70" viewBox="0 0 64 24" aria-hidden="true">
        <polyline points={pointsFor(points, 64, 24, 3)} fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      {TrendIcon ? <TrendIcon size={10} className={tone} strokeWidth={2.4} /> : <span className={`text-[10px] leading-none ${tone}`}>-</span>}
    </div>
  )
}

function DailyScoreHero() {
  return (
    <Card className="animate-fade-up">
      <div className="text-eyebrow font-semibold uppercase leading-4 tracking-[0.12em] text-royal-purple">
        Daily score
      </div>
      <div className="mt-4">
        <ScoreRing />
        <div className="mt-3 flex items-center justify-center gap-1 text-caption leading-[18px] text-forest-green">
          <ArrowUp size={14} strokeWidth={2.3} />
          <span>{intelligenceDashboard.trend}</span>
        </div>
      </div>

      <div className="mt-5 grid grid-cols-3 gap-3">
        {intelligenceDashboard.pillars.map((pillar) => (
          <div key={pillar.id} className="min-w-0 text-center">
            <Sparkline points={pillar.points} trend={pillar.trend} />
            <div className="mt-1 text-small leading-[14px] text-white/50">{pillar.label}</div>
            <div className="mt-0.5 text-caption font-semibold leading-[18px] text-white tabular-nums">{pillar.value}</div>
          </div>
        ))}
      </div>

      <p className="mt-5 text-small leading-[14px] text-white/30">{intelligenceDashboard.updated}</p>
    </Card>
  )
}

function Contradictions() {
  return (
    <section className="mt-4 animate-fade-up" style={{ animationDelay: '80ms' }}>
      <div className="mb-3 flex items-center gap-1 px-1">
        <span className="text-eyebrow font-semibold uppercase leading-4 tracking-[0.12em] text-white/40">Contradictions</span>
        <span className="text-eyebrow font-semibold leading-4 text-brand-orange">({intelligenceDashboard.contradictions.length})</span>
      </div>
      <div className="space-y-2">
        {intelligenceDashboard.contradictions.map((item) => (
          <Card key={item.id} className="p-5">
            <div className="flex items-start gap-3">
              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-orange text-white">
                <AlertTriangle size={12} strokeWidth={2.3} />
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-[15px] leading-5 text-white/85">{item.text}</p>
                <p className="mt-1 text-small leading-[14px] text-white/40">{item.source}</p>
                <div className="mt-3 flex justify-end gap-2">
                  <button type="button" className="h-8 rounded-pill border border-white/10 bg-ink-brown-800 px-4 text-caption font-semibold leading-[18px] text-white/50">
                    Dismiss
                  </button>
                  <button type="button" className="h-8 rounded-pill bg-royal-purple/15 px-4 text-caption font-semibold leading-[18px] text-royal-purple">
                    Resolve
                  </button>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </section>
  )
}

function ScoreTrendChart() {
  const width = 280
  const height = 132
  const values = intelligenceDashboard.trendPoints.map((point) => point.score)
  const coords = values.map((score, index) => {
    const x = (index / (values.length - 1)) * width
    const y = height - 14 - (score / 100) * (height - 24)
    return { x, y, score }
  })
  const pointString = coords.map((point) => `${point.x.toFixed(1)},${point.y.toFixed(1)}`).join(' ')
  const areaString = `0,${height} ${pointString} ${width},${height}`

  return (
    <section className="mt-6 animate-fade-up" style={{ animationDelay: '160ms' }}>
      <Card>
        <div className="text-eyebrow font-semibold uppercase leading-4 tracking-[0.12em] text-white/40">Score trend</div>
        <div className="mt-3 flex gap-2">
          {['7d', '14d', '30d'].map((range, index) => (
            <button
              key={range}
              type="button"
              className={[
                'h-8 rounded-pill px-3 text-caption font-semibold leading-[18px]',
                index === 0 ? 'bg-royal-purple text-white' : 'border border-white/10 bg-ink-900 text-white/50',
              ].join(' ')}
            >
              {range}
            </button>
          ))}
        </div>
        <svg className="mt-4 h-[132px] w-full overflow-visible text-royal-purple" viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="none" aria-hidden="true">
          {[34, 66, 98].map((y) => (
            <line key={y} x1="0" x2={width} y1={y} y2={y} className="text-white/[0.03]" stroke="currentColor" strokeWidth="1" />
          ))}
          <polygon points={areaString} className="fill-royal-purple/5" />
          <polyline points={pointString} fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
          {coords.map((point) => (
            <circle key={`${point.x}-${point.score}`} cx={point.x} cy={point.y} r="4" fill="currentColor" />
          ))}
        </svg>
        <div className="mt-2 flex justify-between text-small leading-[14px] text-white/30">
          <span>{intelligenceDashboard.trendPoints[0].label}</span>
          <span>{intelligenceDashboard.trendPoints[intelligenceDashboard.trendPoints.length - 1].label}</span>
        </div>
      </Card>
    </section>
  )
}

function Correlations() {
  return (
    <section className="mt-6 animate-fade-up" style={{ animationDelay: '240ms' }}>
      <div className="mb-3 px-1 text-eyebrow font-semibold uppercase leading-4 tracking-[0.12em] text-royal-purple">Correlations</div>
      <Card className="p-0">
        {intelligenceDashboard.correlations.map((item, index) => (
          <article key={item.id} className={['p-5', index > 0 ? 'border-t border-white/[0.05]' : ''].join(' ')}>
            <p className="text-[15px] leading-5 text-white/85">{item.text}</p>
            <div className="mt-3 flex items-center gap-3">
              <div className="h-1 flex-1 overflow-hidden rounded-pill bg-white/[0.08]">
                <div className="h-full rounded-pill bg-royal-purple" style={{ width: `${item.strength}%` }} />
              </div>
              <span className="text-[12px] leading-4 text-white/70">{item.strength}% {item.label}</span>
            </div>
          </article>
        ))}
        <button type="button" className="flex h-11 w-full items-center justify-center text-caption leading-[18px] text-brand-orange">
          See all
        </button>
      </Card>
    </section>
  )
}

function BestDayFormula() {
  const progress = intelligenceDashboard.bestDay.matched / intelligenceDashboard.bestDay.total

  return (
    <Card className="mt-6 animate-fade-up" style={{ animationDelay: '320ms' }}>
      <div className="text-eyebrow font-semibold uppercase leading-4 tracking-[0.12em] text-white/40">Your best day</div>
      <p className="mt-3 text-body font-semibold leading-[22px] text-white">Your best days include:</p>
      <div className="mt-3 space-y-2">
        {intelligenceDashboard.bestDay.factors.map((factor) => (
          <div key={factor.id} className="flex h-9 items-center gap-2">
            <span
              className={[
                'flex h-5 w-5 shrink-0 items-center justify-center rounded-xs border',
                factor.matched ? 'border-royal-purple bg-royal-purple text-white' : 'border-white/20 bg-white/[0.08] text-transparent',
              ].join(' ')}
            >
              <Check size={12} strokeWidth={2.6} />
            </span>
            <span className="min-w-0 flex-1 truncate text-[15px] leading-5 text-white/80">{factor.label}</span>
            <span className={['text-[12px] font-semibold leading-4', factor.matched ? 'text-forest-green' : 'text-brand-orange'].join(' ')}>
              {factor.status}
            </span>
          </div>
        ))}
      </div>
      <div className="mt-4 flex items-center justify-between text-[14px] font-semibold leading-5 text-white">
        <span>Today: {intelligenceDashboard.bestDay.matched}/{intelligenceDashboard.bestDay.total} factors matched</span>
        <span className="text-royal-purple">{Math.round(progress * 100)}%</span>
      </div>
      <div className="mt-2 h-1.5 overflow-hidden rounded-pill bg-white/[0.08]">
        <div className="h-full rounded-pill bg-royal-purple" style={{ width: `${progress * 100}%` }} />
      </div>
    </Card>
  )
}

function WeeklyReport() {
  return (
    <Card className="mt-6 animate-fade-up" style={{ animationDelay: '400ms' }}>
      <div className="text-eyebrow font-semibold uppercase leading-4 tracking-[0.12em] text-white/40">Weekly report</div>
      <div className="mt-3 flex items-center justify-between gap-3">
        <h2 className="text-body font-semibold leading-[22px] text-white">{intelligenceDashboard.weeklyReport.week}</h2>
        <ChevronRight size={16} className="rotate-90 text-white/40" strokeWidth={2.2} />
      </div>
      <p className="mt-3 text-[15px] leading-5 text-white/70">{intelligenceDashboard.weeklyReport.summary}</p>
      <button type="button" className="mt-3 flex h-8 w-full items-center justify-end text-caption font-semibold leading-[18px] text-brand-orange">
        See full report
      </button>
    </Card>
  )
}

function Predictions() {
  return (
    <Card className="mt-6 text-center animate-fade-up" style={{ animationDelay: '480ms' }}>
      <div className="text-left text-eyebrow font-semibold uppercase leading-4 tracking-[0.12em] text-royal-purple">Predictions</div>
      <p className="mt-3 text-[14px] leading-5 text-white/60">Tomorrow&apos;s predicted score:</p>
      <div className="mt-2 text-[32px] font-bold leading-10 text-white tabular-nums">
        <span className="text-white/40">~</span>{intelligenceDashboard.prediction.score}
      </div>
      <p className="mt-2 text-caption leading-[18px] text-white/50">{intelligenceDashboard.prediction.basis}</p>
      <div className="mt-4 flex items-center justify-between">
        <span className="rounded-pill bg-forest-green/15 px-3 py-1.5 text-[12px] font-semibold leading-4 text-forest-green">
          {intelligenceDashboard.prediction.accuracy}
        </span>
        <span className="flex items-center gap-3 text-white/30">
          <ThumbsUp size={16} className="text-forest-green" strokeWidth={2.2} />
          <ThumbsDown size={16} strokeWidth={2.2} />
        </span>
      </div>
    </Card>
  )
}

function RecentInsights() {
  return (
    <section className="mt-6 animate-fade-up" style={{ animationDelay: '560ms' }}>
      <div className="mb-3 px-1 text-eyebrow font-semibold uppercase leading-4 tracking-[0.12em] text-royal-purple">Recent insights</div>
      <Card className="p-0">
        {intelligenceDashboard.insights.map((insight, index) => (
          <article key={insight.id} className={['flex gap-3 p-5', index > 0 ? 'border-t border-white/[0.05]' : ''].join(' ')}>
            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-royal-purple" aria-hidden="true" />
            <div className="min-w-0 flex-1">
              <p className="text-[14px] leading-5 text-white/80">{insight.text}</p>
              <p className="mt-1 text-small leading-[14px] text-white/30">{insight.time}</p>
            </div>
            <div className="flex shrink-0 gap-2 text-white/25">
              <ThumbsUp size={14} className={insight.feedback === 'up' ? 'text-forest-green' : ''} strokeWidth={2.2} />
              <ThumbsDown size={14} strokeWidth={2.2} />
            </div>
          </article>
        ))}
      </Card>
    </section>
  )
}

function KnowledgeGraphLink() {
  return (
    <Link
      href="/tabs/me/knowledge-graph"
      className="mt-6 flex min-h-16 items-center gap-3 rounded-md border border-white/[0.06] border-l-4 border-l-royal-purple/20 bg-ink-brown-800 p-4 shadow-1 transition-transform duration-[var(--dur-fast)] active:scale-[0.98] animate-fade-up"
      style={{ animationDelay: '640ms' }}
    >
      <GitBranch size={20} className="shrink-0 text-royal-purple" strokeWidth={2.2} />
      <span className="min-w-0 flex-1 text-[15px] font-semibold leading-5 text-white">Explore your health knowledge graph</span>
      <ChevronRight size={16} className="shrink-0 text-white/40" strokeWidth={2.2} />
    </Link>
  )
}

export default function IntelligenceScreen() {
  return (
    <PhoneFrame>
      <ScreenShell header={<IntelligenceHeader />} activeTab="me">
        <main className="px-4 pb-20 pt-4">
          <DailyScoreHero />
          <Contradictions />
          <ScoreTrendChart />
          <Correlations />
          <BestDayFormula />
          <WeeklyReport />
          <Predictions />
          <RecentInsights />
          <KnowledgeGraphLink />
        </main>
      </ScreenShell>
    </PhoneFrame>
  )
}
