import Link from 'next/link'
import type { CSSProperties } from 'react'
import { ArrowUp, Brain, Flower2, Plus, Wind } from 'lucide-react'
import { Card } from '@/components/design-system/Card'
import { FAB } from '@/components/design-system/FAB'
import { DomainDashboardHeader } from '@/components/domain/DomainDashboardHeader'
import { PhoneFrame } from '@/components/layout/PhoneFrame'
import { ScreenShell } from '@/components/layout/ScreenShell'
import { stressManagement } from '@/data/mock'

// Screen 52 of 78: Stress management
// Spec: /Users/hamza/yHealth/app_design 3/52-stress-management.md

const triggerTone: Record<string, string> = {
  red: 'bg-domain-fitness',
  teal: 'bg-domain-wellbeing',
  amber: 'bg-stalled-amber',
  orange: 'bg-brand-orange',
  muted: 'bg-white/30',
}

function SectionEyebrow({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-3 px-1 text-eyebrow font-semibold uppercase leading-4 tracking-[0.12em] text-domain-wellbeing">
      {children}
    </div>
  )
}

function StressGaugeCard() {
  return (
    <section className="animate-fade-up">
      <SectionEyebrow>Current stress level</SectionEyebrow>
      <Card>
        <div className="relative mx-auto h-[128px] w-[220px]">
          <svg className="h-full w-full overflow-visible" viewBox="0 0 220 128" aria-hidden="true">
            <path d="M30 104 A80 80 0 0 1 190 104" fill="none" stroke="currentColor" strokeWidth="10" strokeLinecap="round" className="text-white/10" />
            <path d="M30 104 A80 80 0 0 1 118 25" fill="none" stroke="currentColor" strokeWidth="10" strokeLinecap="round" className="text-forest-green ring-animate" style={{ '--ring-circumference': 250, '--ring-target': 112 } as CSSProperties} />
            <path d="M118 25 A80 80 0 0 1 154 42" fill="none" stroke="currentColor" strokeWidth="10" strokeLinecap="round" className="text-domain-wellbeing ring-animate" style={{ '--ring-circumference': 250, '--ring-target': 164 } as CSSProperties} />
            <line x1="110" y1="104" x2="144" y2="48" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="text-white/80" />
            <circle cx="110" cy="104" r="5" className="fill-white" />
          </svg>
          <div className="absolute inset-x-0 bottom-0 text-center">
            <div className="text-display-l font-bold leading-10 text-white tabular-nums">{stressManagement.score}</div>
            <div className="text-[14px] leading-5 text-white/60">{stressManagement.severity}</div>
          </div>
        </div>
        <div className="mt-5 grid grid-cols-3 gap-3">
          {stressManagement.subScores.map((score) => (
            <div key={score.label} className="text-center">
              <div className="text-small leading-[14px] text-white/40">{score.label}</div>
              <div className="mt-1 text-[15px] font-semibold leading-5 text-white tabular-nums">{score.score}</div>
              <span className={['mx-auto mt-1 block h-1.5 w-1.5 rounded-full', score.tone === 'green' ? 'bg-forest-green' : 'bg-domain-wellbeing'].join(' ')} />
            </div>
          ))}
        </div>
        <p className="mt-4 text-center text-small leading-[14px] text-white/30">{stressManagement.updated}</p>
      </Card>
    </section>
  )
}

function QuickLogCard() {
  return (
    <section className="mt-5 animate-fade-up" style={{ animationDelay: '80ms' }}>
      <SectionEyebrow>Quick log</SectionEyebrow>
      <Card>
        <h2 className="text-h3 font-semibold leading-[22px] text-white">How stressed are you?</h2>
        <div className="mt-4">
          <div className="flex justify-between text-caption leading-[18px] text-white/40">
            <span>1</span>
            <span>10</span>
          </div>
          <div className="relative mt-3 h-3 rounded-pill bg-white/10">
            <div className="h-full w-[60%] rounded-pill bg-gradient-to-r from-forest-green via-brand-orange to-error-red" />
            <div className="absolute left-[58%] top-1/2 h-7 w-7 -translate-y-1/2 rounded-full bg-white shadow-1" />
          </div>
          <div className="mt-3 text-center text-h2 font-bold leading-[26px] text-white tabular-nums">{stressManagement.quickLog.value}</div>
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          {stressManagement.quickLog.triggers.map((trigger) => (
            <span
              key={trigger.label}
              className={[
                'rounded-pill border px-3 py-2 text-caption font-semibold leading-[18px]',
                trigger.selected ? 'border-domain-wellbeing/30 bg-domain-wellbeing/15 text-domain-wellbeing' : 'border-white/10 bg-ink-900 text-white/60',
              ].join(' ')}
            >
              {trigger.label}
            </span>
          ))}
        </div>
        <button type="button" className="mt-5 h-12 w-full rounded-pill bg-brand-orange text-body font-semibold leading-[22px] text-white">
          Log stress
        </button>
      </Card>
    </section>
  )
}

function SiaStressNote() {
  return (
    <Card className="mt-5 border-l-[3px] border-l-royal-purple/40 p-5 animate-fade-up" style={{ animationDelay: '160ms' }}>
      <div className="flex items-start gap-3">
        <span className="mt-1 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-royal-purple text-small font-semibold text-white">S</span>
        <div className="min-w-0">
          <p className="text-[15px] leading-[22px] text-white/80">{stressManagement.siaNote}</p>
          <div className="mt-2 text-right text-caption font-semibold leading-[18px] text-royal-purple/70">Ask SIA</div>
        </div>
      </div>
    </Card>
  )
}

function TriggerAnalysisCard() {
  return (
    <section className="mt-6 animate-fade-up" style={{ animationDelay: '240ms' }}>
      <SectionEyebrow>Trigger analysis</SectionEyebrow>
      <Card>
        <div className="flex items-center gap-5">
          <div className="relative flex h-[118px] w-[118px] shrink-0 items-center justify-center rounded-full border-[12px] border-domain-wellbeing/40 bg-ink-900">
            <div className="absolute inset-3 rounded-full border-[10px] border-brand-orange/35" aria-hidden="true" />
            <div className="text-center">
              <div className="text-[16px] font-semibold leading-[22px] text-white">28</div>
              <div className="text-small leading-[14px] text-white/40">Logs</div>
            </div>
          </div>
          <div className="min-w-0 flex-1 space-y-2">
            {stressManagement.triggers.map((trigger) => (
              <div key={trigger.label} className="flex items-center gap-2">
                <span className={['h-2 w-2 shrink-0 rounded-full', triggerTone[trigger.tone]].join(' ')} />
                <span className="min-w-0 flex-1 text-caption leading-[18px] text-white/70">{trigger.label}</span>
                <span className="text-caption font-semibold leading-[18px] text-white">{trigger.value}%</span>
              </div>
            ))}
          </div>
        </div>
        <p className="mt-3 text-center text-small leading-[14px] text-white/30">Last 30 days</p>
      </Card>
    </section>
  )
}

function TrendChartCard() {
  const width = 280
  const height = 132
  const points = stressManagement.trend.map((point, index) => {
    const x = (index / (stressManagement.trend.length - 1)) * width
    const y = height - 10 - (point.score / 10) * (height - 20)
    return `${x.toFixed(1)},${y.toFixed(1)}`
  }).join(' ')

  return (
    <section className="mt-6 animate-fade-up" style={{ animationDelay: '320ms' }}>
      <SectionEyebrow>Stress trend</SectionEyebrow>
      <Card>
        <div className="flex gap-2">
          {['7d', '14d', '30d'].map((range, index) => (
            <span key={range} className={['rounded-pill border px-3 py-1.5 text-caption font-semibold leading-[18px]', index === 0 ? 'border-domain-wellbeing/40 bg-domain-wellbeing/15 text-domain-wellbeing' : 'border-white/10 text-white/60'].join(' ')}>
              {range}
            </span>
          ))}
        </div>
        <svg className="mt-4 h-[132px] w-full overflow-visible text-brand-orange" viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="none" aria-hidden="true">
          {[32, 64, 96].map((y) => (
            <line key={y} x1="0" x2={width} y1={y} y2={y} stroke="currentColor" strokeWidth="1" className="text-white/[0.04]" />
          ))}
          <polyline points={points} fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M240 78 L280 70" fill="none" stroke="currentColor" strokeWidth="3" strokeDasharray="5 5" strokeLinecap="round" className="text-royal-purple/70" />
        </svg>
        <div className="mt-2 flex justify-between text-caption leading-[18px]">
          <span className="font-semibold text-white">Avg: 4.8</span>
          <span className="font-semibold text-forest-green">Down 12% vs last wk</span>
        </div>
      </Card>
    </section>
  )
}

function RecoveryCard() {
  const circumference = 2 * Math.PI * 42
  const offset = circumference * (1 - stressManagement.recovery.score / 100)

  return (
    <section className="mt-6 animate-fade-up" style={{ animationDelay: '400ms' }}>
      <SectionEyebrow>Mental recovery</SectionEyebrow>
      <Card>
        <div className="flex items-center justify-center gap-6">
          <div className="relative flex h-24 w-24 items-center justify-center">
            <svg className="-rotate-90" width="96" height="96" viewBox="0 0 96 96" aria-hidden="true">
              <circle cx="48" cy="48" r="42" fill="none" stroke="currentColor" strokeWidth="7" className="text-white/10" />
              <circle cx="48" cy="48" r="42" fill="none" stroke="currentColor" strokeWidth="7" strokeLinecap="round" strokeDasharray={circumference} className="text-domain-wellbeing ring-animate" style={{ '--ring-circumference': circumference, '--ring-target': offset } as CSSProperties} />
            </svg>
            <div className="absolute text-center">
              <div className="text-h1 font-bold leading-[34px] text-white tabular-nums">{stressManagement.recovery.score}</div>
              <div className="text-small leading-[14px] text-white/40">Of 100</div>
            </div>
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-1 text-forest-green">
              <ArrowUp size={16} strokeWidth={2.2} />
              <span className="text-[14px] font-semibold leading-5">Improving</span>
            </div>
            <div className="mt-1 text-caption leading-[18px] text-white/50">prev: {stressManagement.recovery.previous} (+7)</div>
          </div>
        </div>
        <div className="mt-5 grid grid-cols-2 gap-3">
          {stressManagement.recovery.components.map((item) => (
            <div key={item.label} className="rounded-md bg-ink-900/70 p-3">
              <div className="text-small leading-[14px] text-white/40">{item.label}</div>
              <div className="mt-1 text-[15px] font-semibold leading-5 text-white tabular-nums">{item.value}</div>
            </div>
          ))}
        </div>
      </Card>
    </section>
  )
}

function ReliefTools() {
  const iconMap = {
    wind: Wind,
    brain: Brain,
    flower: Flower2,
  }

  return (
    <section className="mt-6 animate-fade-up" style={{ animationDelay: '480ms' }}>
      <SectionEyebrow>Relief tools</SectionEyebrow>
      <div className="-mx-4 flex gap-3 overflow-x-auto px-4 pb-1 hide-scrollbar">
        {stressManagement.reliefTools.map((tool) => {
          const Icon = iconMap[tool.icon as keyof typeof iconMap]

          return (
            <Link key={tool.label} href={tool.href} className="relative flex h-[104px] w-[120px] shrink-0 flex-col items-center justify-center rounded-lg border border-white/[0.06] bg-ink-brown-800 shadow-1">
              {tool.recommended && <span className="absolute right-2 top-2 rounded-pill bg-royal-purple/15 px-2 py-1 text-small font-semibold leading-3 text-royal-purple">SIA pick</span>}
              <Icon size={28} className="text-white/80" strokeWidth={1.9} />
              <span className="mt-2 text-[14px] font-semibold leading-5 text-white">{tool.label}</span>
              <span className="absolute inset-x-4 bottom-0 h-0.5 rounded-pill bg-domain-wellbeing/40" />
            </Link>
          )
        })}
      </div>
    </section>
  )
}

function BiometricCard() {
  return (
    <section className="mt-6 animate-fade-up" style={{ animationDelay: '560ms' }}>
      <SectionEyebrow>Biometric stress</SectionEyebrow>
      <Card>
        <div className="flex items-start justify-between gap-3">
          <div>
            <h2 className="text-[15px] font-semibold leading-5 text-white">{stressManagement.biometric.title}</h2>
            <div className="mt-2 flex items-center gap-2">
              <span className="text-body font-semibold leading-[22px] text-white">{stressManagement.biometric.hrv}</span>
              <span className="inline-flex items-center gap-1 text-caption leading-[18px] text-forest-green">
                <ArrowUp size={13} strokeWidth={2.2} />
                {stressManagement.biometric.trend}
              </span>
            </div>
            <p className="mt-1 text-caption leading-[18px] text-white/50">{stressManagement.biometric.status}</p>
          </div>
          <span className="mt-1 h-2 w-2 rounded-full bg-forest-green" />
        </div>
      </Card>
    </section>
  )
}

export default function StressManagementScreen() {
  return (
    <PhoneFrame>
      <ScreenShell
        header={<DomainDashboardHeader title="Stress management" domain="wellbeing" level={5} />}
        activeTab="me"
        bottomAction={<FAB label="Log" icon={<Plus size={16} strokeWidth={2.4} />} display="pill" />}
      >
        <main className="px-4 pb-6 pt-4">
          <StressGaugeCard />
          <QuickLogCard />
          <SiaStressNote />
          <TriggerAnalysisCard />
          <TrendChartCard />
          <RecoveryCard />
          <ReliefTools />
          <BiometricCard />
        </main>
      </ScreenShell>
    </PhoneFrame>
  )
}
