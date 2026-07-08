import {
  Activity,
  BatteryCharging,
  BellRing,
  BookOpen,
  Check,
  ChevronLeft,
  Flag,
  HeartPulse,
  Info,
  Lock,
  Mic,
  MoreHorizontal,
  Phone,
  Plus,
  Search,
  Send,
  Shield,
  Smile,
  Sparkles,
  Zap,
} from 'lucide-react'
import type { ScreenInfo } from '@/data/screens'
import { PhoneFrame } from '@/components/layout/PhoneFrame'
import { ScreenShell } from '@/components/layout/ScreenShell'

type Tone = 'you' | 'done' | 'cia' | 'muted'

const toneClass: Record<Tone, string> = {
  you: 'border-brand-orange/25 bg-brand-orange/10 text-brand-orange',
  done: 'border-forest-green/25 bg-forest-green/10 text-forest-green',
  cia: 'border-royal-purple/25 bg-royal-purple/10 text-royal-purple',
  muted: 'border-white/10 bg-white/[0.04] text-white/55',
}

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(' ')
}

function TopBar({
  title,
  eyebrow,
  right,
  back = true,
}: {
  title: string
  eyebrow?: string
  right?: React.ReactNode
  back?: boolean
}) {
  return (
    <header className="z-30 flex min-h-[58px] shrink-0 items-center gap-3 bg-ink-900/90 px-4 backdrop-blur-md">
      {back && (
        <span className="flex h-11 w-11 items-center justify-center rounded-full text-white/70" aria-hidden="true">
          <ChevronLeft size={20} strokeWidth={1.9} />
        </span>
      )}
      <div className="min-w-0 flex-1">
        <h1 className="truncate text-[17px] font-semibold leading-6 text-white">{title}</h1>
        {eyebrow && <p className="text-[12px] leading-4 text-white/45">{eyebrow}</p>}
      </div>
      {right}
    </header>
  )
}

function IconButton({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <span className="flex h-11 w-11 items-center justify-center rounded-full text-white/60" aria-label={label}>
      {children}
    </span>
  )
}

function Chip({ children, tone = 'muted' }: { children: React.ReactNode; tone?: Tone }) {
  return (
    <span className={cx('inline-flex min-h-8 items-center rounded-pill border px-3 text-[11px] font-semibold leading-4', toneClass[tone])}>
      {children}
    </span>
  )
}

function Provenance({ items }: { items: string[] }) {
  return (
    <div className="flex flex-wrap gap-2">
      {items.map(item => <Chip key={item}>{item}</Chip>)}
    </div>
  )
}

function GlassCard({
  children,
  className,
  tone = 'you',
}: {
  children: React.ReactNode
  className?: string
  tone?: Tone
}) {
  const shadow = tone === 'cia'
    ? 'shadow-[var(--glow-purple-sm)]'
    : tone === 'done'
      ? 'shadow-[var(--glow-green-sm)]'
      : 'shadow-[var(--glow-orange-sm)]'

  return (
    <section className={cx('surface-hero rounded-2xl p-5', shadow, className)}>
      {children}
    </section>
  )
}

function SolidCard({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <section className={cx('surface-warm rounded-xl p-4', className)}>
      {children}
    </section>
  )
}

function SectionTitle({ title, meta }: { title: string; meta?: string }) {
  return (
    <div className="flex items-end justify-between px-1 pt-1">
      <h2 className="text-[12px] font-semibold uppercase leading-4 text-white/45">{title}</h2>
      {meta && <span className="text-[12px] leading-4 text-white/35">{meta}</span>}
    </div>
  )
}

function ProgressBar({ value, tone = 'you' }: { value: number; tone?: Tone }) {
  const color = tone === 'done' ? 'bg-forest-green' : tone === 'cia' ? 'bg-royal-purple' : 'bg-brand-orange'
  return (
    <div className="h-2 overflow-hidden rounded-pill bg-white/[0.08]">
      <div className={cx('h-full rounded-pill', color)} style={{ width: `${value}%` }} />
    </div>
  )
}

function MetricPill({ label, value, tone = 'muted' }: { label: string; value: string; tone?: Tone }) {
  return (
    <div className={cx('rounded-lg border p-3', toneClass[tone])}>
      <p className="text-[11px] font-semibold uppercase leading-3 opacity-80">{label}</p>
      <p className="mt-2 text-[20px] font-bold leading-6 text-white">{value}</p>
    </div>
  )
}

function MiniRadar({ labels = false }: { labels?: boolean }) {
  return (
    <div className="relative mx-auto h-[172px] w-[172px]" aria-label="Life balance shape">
      <svg viewBox="0 0 172 172" className="h-full w-full text-brand-orange" aria-hidden="true">
        <circle cx="86" cy="86" r="68" fill="none" stroke="currentColor" strokeOpacity="0.18" strokeWidth="1" />
        <circle cx="86" cy="86" r="42" fill="none" stroke="currentColor" strokeOpacity="0.14" strokeWidth="1" />
        <path d="M86 16 L86 156 M16 86 L156 86 M37 37 L135 135 M135 37 L37 135" stroke="currentColor" strokeOpacity="0.12" strokeWidth="1" />
        <path className="area-in fill-brand-orange/15 stroke-brand-orange" d="M86 24 L132 48 L140 94 L106 136 L61 128 L36 88 L50 46 Z" strokeWidth="2" />
        <circle cx="86" cy="86" r="21" className="fill-ink-900 stroke-brand-orange" strokeWidth="2" />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
        <span className="text-[28px] font-bold leading-8 text-white tabular-nums">487</span>
        <span className="text-[11px] text-white/45">Life Power</span>
      </div>
      {labels && (
        <div className="absolute inset-x-0 bottom-0 flex justify-between text-[10px] text-white/35">
          <span>Fitness</span>
          <span>Wellbeing</span>
        </div>
      )}
    </div>
  )
}

function ArcGauge({ value, label }: { value: string; label: string }) {
  return (
    <div className="relative mx-auto h-[160px] w-[160px]" aria-label={`${label} ${value}`}>
      <svg viewBox="0 0 160 160" className="h-full w-full -rotate-90 text-brand-orange" aria-hidden="true">
        <circle cx="80" cy="80" r="62" fill="none" stroke="currentColor" strokeOpacity="0.12" strokeWidth="14" strokeLinecap="round" />
        <circle cx="80" cy="80" r="62" fill="none" stroke="currentColor" strokeWidth="14" strokeDasharray="300 390" strokeLinecap="round" />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
        <span className="text-[38px] font-bold leading-10 text-white tabular-nums">{value}</span>
        <span className="mt-1 text-[12px] text-white/45">{label}</span>
      </div>
    </div>
  )
}

function Sparkline({ tone = 'you' }: { tone?: Tone }) {
  const stroke = tone === 'cia' ? 'stroke-royal-purple' : tone === 'done' ? 'stroke-forest-green' : 'stroke-brand-orange'
  return (
    <svg viewBox="0 0 240 70" className="h-[70px] w-full" aria-hidden="true">
      <path d="M4 52 C32 38 40 18 66 22 C98 28 94 58 126 48 C160 38 166 16 198 24 C218 29 226 24 236 18" fill="none" className={stroke} strokeWidth="3" strokeLinecap="round" />
      <path d="M4 70 L4 52 C32 38 40 18 66 22 C98 28 94 58 126 48 C160 38 166 16 198 24 C218 29 226 24 236 18 L236 70 Z" className="fill-brand-orange/10" />
    </svg>
  )
}

function ConsentRail({ compact = false }: { compact?: boolean }) {
  const controls = ['Source', 'Retention', 'Export', 'Revoke', 'Delete']
  return (
    <div className={cx('flex flex-wrap gap-2', compact ? 'mt-3' : 'mt-4')}>
      {controls.map(item => <Chip key={item}>{item}</Chip>)}
    </div>
  )
}

function SafetyCard() {
  return (
    <SolidCard className="border-white/10">
      <div className="flex items-center gap-3">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white/[0.04] text-white/70">
          <Shield size={19} strokeWidth={1.9} />
        </span>
        <div className="min-w-0 flex-1">
          <h2 className="text-[15px] font-semibold leading-5 text-white">Crisis resources</h2>
          <p className="mt-1 text-[12px] leading-4 text-white/50">Call, text, or view local support. This stays available offline.</p>
        </div>
      </div>
    </SolidCard>
  )
}

function Composer({ placeholder = 'Message CIA' }: { placeholder?: string }) {
  return (
    <div className="flex h-[54px] items-center gap-2 rounded-pill border border-white/10 bg-ink-brown-800 p-1">
      <span className="flex h-11 w-11 items-center justify-center rounded-full text-white/45">
        <Plus size={18} strokeWidth={2} />
      </span>
      <span className="min-w-0 flex-1 text-[14px] leading-5 text-white/45">{placeholder}</span>
      <span className="flex h-11 w-11 items-center justify-center rounded-full bg-brand-orange text-white shadow-[var(--glow-orange-sm)]">
        <Send size={16} strokeWidth={2.2} />
      </span>
    </div>
  )
}

function ChatBubble({ speaker, children, tone = 'muted' }: { speaker: string; children: React.ReactNode; tone?: Tone }) {
  const isUser = speaker === 'You'
  return (
    <div className={cx('flex', isUser ? 'justify-end' : 'justify-start')}>
      <div className={cx('max-w-[280px] rounded-xl border px-4 py-3', isUser ? toneClass.you : toneClass[tone])}>
        <p className="mb-1 text-[11px] font-semibold uppercase leading-3 opacity-75">{speaker}</p>
        <div className="text-[14px] leading-5 text-white/85">{children}</div>
      </div>
    </div>
  )
}

function InlineArtifact() {
  return (
    <SolidCard className="border-royal-purple/20">
      <div className="flex items-center justify-between">
        <h3 className="text-[14px] font-semibold text-white">Connection spotted</h3>
        <Sparkles size={16} className="text-royal-purple" strokeWidth={2} />
      </div>
      <div className="mt-3 grid grid-cols-2 gap-2">
        <MetricPill label="Sleep" value="6h 12m" />
        <MetricPill label="Load" value="8/10" />
      </div>
      <Provenance items={['Via Health', 'You logged']} />
    </SolidCard>
  )
}

function HomeScreen() {
  return (
    <PhoneFrame>
      <ScreenShell
        header={<TopBar title="Good morning, Amira" eyebrow="Tuesday, Jul 7" back={false} right={<Chip tone="you">Lv 12</Chip>} />}
        activeTab="today"
        bottomAction={<FloatingQuickLog />}
      >
        <main className="space-y-4 px-4 pb-4 pt-3">
          <SolidCard className="border-royal-purple/20">
            <div className="flex items-start gap-3">
              <Sparkles size={18} className="mt-1 shrink-0 text-royal-purple" />
              <div>
                <p className="text-[15px] leading-5 text-white">What is worth your attention today?</p>
                <div className="mt-3 flex gap-2">
                  <Chip>Steady</Chip><Chip>Low</Chip><Chip>Wired</Chip>
                </div>
              </div>
            </div>
          </SolidCard>
          <GlassCard tone="you">
            <div className="flex items-center justify-between">
              <p className="text-[12px] font-semibold uppercase text-white/45">Life balance</p>
              <Chip>12 areas</Chip>
            </div>
            <MiniRadar labels />
            <ProgressBar value={70} />
            <p className="mt-3 text-[13px] leading-[18px] text-white/65">CIA sees fitness carrying the week. Keep recovery visible.</p>
          </GlassCard>
          <Provenance items={['72 bpm via WHOOP', '8.2k steps', '7.5h sleep via Health']} />
          <div className="grid grid-cols-4 gap-2">
            {['Breathe', 'Water', 'Journal', 'Check-in'].map(item => (
              <div key={item} className="flex min-h-[54px] items-center justify-center rounded-lg border border-white/10 bg-white/[0.04] text-[12px] font-semibold text-white/70">{item}</div>
            ))}
          </div>
          <SolidCard>
            <SectionTitle title="Today momentum" meta="3 of 6 - +90 XP" />
            <div className="mt-3"><ProgressBar value={52} /></div>
            <div className="mt-4 space-y-2">
              {['Meditate 10 min', 'Morning run', 'Review budget'].map((item, index) => (
                <div key={item} className="flex min-h-11 items-center gap-3 rounded-lg bg-white/[0.03] px-3">
                  <span className={cx('flex h-6 w-6 items-center justify-center rounded-full border', index === 0 ? 'border-forest-green text-forest-green' : 'border-white/20 text-white/35')}>
                    {index === 0 && <Check size={14} />}
                  </span>
                  <span className="min-w-0 flex-1 text-[14px] text-white/75">{item}</span>
                  <Chip>{index === 2 ? 'Finance' : index === 1 ? 'Fitness' : 'Wellbeing'}</Chip>
                </div>
              ))}
            </div>
          </SolidCard>
          <SectionTitle title="Pinned missions" />
          {['Run a half marathon', 'Save $5,000 by December'].map((item, index) => (
            <SolidCard key={item} className="py-3">
              <div className="flex items-center gap-3">
                <Flag size={17} className="text-brand-orange" />
                <span className="min-w-0 flex-1 text-[14px] font-semibold text-white">{item}</span>
                <span className="text-[13px] text-white/45">{index === 0 ? '68%' : '42%'}</span>
              </div>
              <div className="mt-3"><ProgressBar value={index === 0 ? 68 : 42} /></div>
            </SolidCard>
          ))}
        </main>
      </ScreenShell>
    </PhoneFrame>
  )
}

function CiaChatScreen() {
  return (
    <PhoneFrame>
      <ScreenShell
        header={<TopBar title="CIA" eyebrow="Today" back={false} right={<><IconButton label="Search"><Search size={18} /></IconButton><IconButton label="Voice"><Mic size={18} /></IconButton></>} />}
        activeTab="cia"
        composer={<Composer />}
      >
        <main className="space-y-4 px-4 pb-4 pt-3">
          <ChatBubble speaker="CIA" tone="cia">
            <p>Good morning, Amira. Your sleep and workout load are connected.</p>
          </ChatBubble>
          <InlineArtifact />
          <ChatBubble speaker="You">What should I change today?</ChatBubble>
          <div className="flex items-center gap-2 text-[13px] text-white/45">
            <span className="flex gap-1">
              <i className="voice-status-pulse h-1.5 w-1.5 rounded-full bg-royal-purple" />
              <i className="voice-status-pulse h-1.5 w-1.5 rounded-full bg-royal-purple [animation-delay:120ms]" />
              <i className="voice-status-pulse h-1.5 w-1.5 rounded-full bg-royal-purple [animation-delay:240ms]" />
            </span>
            CIA is thinking
          </div>
          <div className="flex flex-wrap gap-2">
            <Chip tone="you">Tell me more</Chip><Chip>Show missions</Chip><Chip>Log meal</Chip>
          </div>
          <ConsentRail />
        </main>
      </ScreenShell>
    </PhoneFrame>
  )
}

function MissionBoardScreen() {
  const missions = [
    ['Morning sunlight', 72, 'Wellbeing'],
    ['Finalize Q3 report', 46, 'Career'],
    ['Run 5K', 61, 'Fitness'],
    ['Hydrate', 100, 'Daily'],
  ] as const

  return (
    <PhoneFrame>
      <ScreenShell
        header={<TopBar title="Mission Board" eyebrow="Synced 2h ago" back={false} right={<IconButton label="Filter"><MoreHorizontal size={19} /></IconButton>} />}
        activeTab="goals"
        bottomAction={<FloatingQuickLog label="New mission" />}
      >
        <main className="space-y-4 px-4 pb-4 pt-3">
          <div className="grid grid-cols-3 gap-2">
            <MetricPill label="Active" value="04" tone="you" />
            <MetricPill label="Done" value="12" tone="done" />
            <MetricPill label="Streak" value="07d" />
          </div>
          <GlassCard>
            <div className="grid grid-cols-[1fr_120px] gap-4">
              <div>
                <p className="text-[12px] font-semibold uppercase text-white/45">Whole-life map</p>
                <h2 className="mt-2 text-[20px] font-semibold leading-6 text-white">Missions across every domain.</h2>
                <p className="mt-2 text-[13px] leading-[18px] text-white/55">The board favors effort in progress, then completion.</p>
              </div>
              <MiniRadar />
            </div>
          </GlassCard>
          <div className="flex gap-2">
            <Chip tone="you">Active</Chip><Chip>Done</Chip><Chip>All</Chip><Chip>Life</Chip><Chip>Main</Chip>
          </div>
          <SectionTitle title="Pinned" />
          <div className="space-y-3">
            {missions.map(([name, value, domain]) => (
              <SolidCard key={name} className="py-3">
                <div className="flex items-center gap-3">
                  <span className={cx('flex h-8 w-8 items-center justify-center rounded-full', value === 100 ? 'bg-forest-green text-white' : 'bg-brand-orange/15 text-brand-orange')}>
                    {value === 100 ? <Check size={16} /> : <Flag size={15} />}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-[14px] font-semibold text-white">{name}</p>
                    <p className="mt-0.5 text-[12px] text-white/40">{domain}</p>
                  </div>
                  <span className="text-[13px] text-white/45">{value}%</span>
                </div>
                <div className="mt-3"><ProgressBar value={value} tone={value === 100 ? 'done' : 'you'} /></div>
              </SolidCard>
            ))}
          </div>
        </main>
      </ScreenShell>
    </PhoneFrame>
  )
}

function LifeAreasScreen() {
  const rows = [
    ['Fitness', '82', '+4', 82],
    ['Nutrition', '76', '+2', 76],
    ['Wellbeing', '81', '+2', 81],
    ['Career', '61', '-3', 61],
    ['Finance', '68', '+1', 68],
  ] as const

  return (
    <PhoneFrame>
      <ScreenShell header={<TopBar title="Life areas" right={<Chip>Data sources</Chip>} />} activeTab="me">
        <main className="space-y-4 px-4 pb-4 pt-3">
          <GlassCard>
            <div className="flex items-center justify-between">
              <p className="text-[12px] font-semibold uppercase text-white/45">Life Power</p>
              <Chip>Calculated</Chip>
            </div>
            <MiniRadar labels />
            <div className="grid grid-cols-2 gap-2">
              <MetricPill label="Average" value="78" />
              <MetricPill label="Reporting" value="8/9" tone="done" />
            </div>
          </GlassCard>
          <SolidCard>
            <SectionTitle title="Last 7 weeks" meta="+4" />
            <Sparkline />
            <Provenance items={['9 domains', 'Updated 2h ago']} />
          </SolidCard>
          <GlassCard tone="cia">
            <p className="text-[15px] leading-5 text-white">CIA sees fitness and wellbeing as your anchors this month. Career dipped this week.</p>
            <div className="mt-3 flex gap-2"><Chip>Fitness</Chip><Chip>Wellbeing</Chip></div>
          </GlassCard>
          <div className="flex gap-2"><Chip tone="you">Current</Chip><Chip>Vs week</Chip><Chip>Vs month</Chip></div>
          <SolidCard>
            <SectionTitle title="Domain stats" />
            <div className="mt-3 space-y-3">
              {rows.map(([name, value, delta, progress]) => (
                <div key={name} className="grid grid-cols-[86px_1fr_50px] items-center gap-3">
                  <span className="text-[13px] font-semibold text-white/75">{name}</span>
                  <ProgressBar value={progress} tone={progress > 80 ? 'done' : 'you'} />
                  <span className={cx('text-right text-[13px] font-semibold', delta.startsWith('+') ? 'text-forest-green' : 'text-brand-orange')}>{value} {delta}</span>
                </div>
              ))}
            </div>
          </SolidCard>
        </main>
      </ScreenShell>
    </PhoneFrame>
  )
}

function IntelligenceScreen() {
  return (
    <PhoneFrame>
      <ScreenShell header={<TopBar title="Intelligence" right={<Chip>Manage data</Chip>} />} activeTab="me">
        <main className="space-y-4 px-4 pb-4 pt-3">
          <GlassCard>
            <p className="text-[12px] font-semibold uppercase text-white/45">Your daily intelligence</p>
            <div className="mt-4 grid grid-cols-[110px_1fr] items-center gap-4">
              <ArcGauge value="87" label="Score" />
              <div>
                <p className="text-[15px] font-semibold text-white">+3 from yesterday</p>
                <p className="mt-2 text-[13px] leading-[18px] text-white/50">Updated 2h ago from wearable, logs, and mission activity.</p>
              </div>
            </div>
          </GlassCard>
          <SectionTitle title="Active contradictions" />
          <GlassCard tone="cia">
            <p className="text-[15px] leading-5 text-white">You reported 8h sleep, but WHOOP shows 5.5h. Resolve the source before CIA uses it.</p>
            <div className="mt-3 flex gap-2"><Chip>Sleep log</Chip><Chip>WHOOP data</Chip></div>
          </GlassCard>
          <SectionTitle title="Cross-domain patterns" meta="Legend" />
          <SolidCard>
            <div className="grid grid-cols-5 gap-1">
              {Array.from({ length: 25 }).map((_, index) => (
                <span key={index} className={cx('h-7 rounded-sm', index % 6 === 0 ? 'bg-white/[0.05]' : index % 4 === 0 ? 'bg-forest-green/45' : 'bg-brand-orange/30')} />
              ))}
            </div>
            <p className="mt-4 text-[13px] leading-[18px] text-white/60">On days you meditate, stress is often lower. Evidence is medium confidence.</p>
          </SolidCard>
          <SectionTitle title="Trend" meta="7d / 14d / 30d" />
          <SolidCard><Sparkline tone="cia" /><Provenance items={['Projected by CIA', 'Low confidence']} /></SolidCard>
          <SolidCard>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[12px] font-semibold uppercase text-white/45">Best day formula</p>
                <p className="mt-2 text-[15px] text-white">7h sleep, meditation, one workout, early meal.</p>
              </div>
              <Chip tone="done">4/5</Chip>
            </div>
            <div className="mt-4"><ProgressBar value={80} tone="done" /></div>
          </SolidCard>
        </main>
      </ScreenShell>
    </PhoneFrame>
  )
}

function EnergyScreen() {
  return (
    <PhoneFrame>
      <ScreenShell header={<TopBar title="Energy tracking" right={<IconButton label="Options"><MoreHorizontal size={18} /></IconButton>} />} activeTab="me" bottomAction={<FloatingQuickLog label="Log energy" />}>
        <main className="space-y-4 px-4 pb-4 pt-3">
          <GlassCard>
            <p className="text-[12px] font-semibold uppercase text-white/45">Current energy</p>
            <ArcGauge value="7.5" label="You logged" />
            <Provenance items={['You logged', 'Fresh now']} />
          </GlassCard>
          <SolidCard>
            <SectionTitle title="Quick log" />
            <div className="mt-4"><ProgressBar value={75} /></div>
            <div className="mt-4 flex gap-2"><Chip>Morning</Chip><Chip tone="you">Post-workout</Chip><Chip>Post-meal</Chip></div>
            <div className="mt-4 rounded-pill border border-white/10 bg-ink-900 px-4 py-3 text-[14px] text-white/35">How are you feeling. Optional.</div>
            <div className="mt-4 flex h-12 items-center justify-center rounded-pill bg-brand-orange text-[15px] font-semibold text-white">Log energy</div>
          </SolidCard>
          <SectionTitle title="Today energy" meta="Avg 6.2" />
          <SolidCard><Sparkline /><p className="mt-3 text-[13px] text-white/55">5 logs today. Peak window is holding at 9-11am.</p></SolidCard>
          <SolidCard className="border-white/10 opacity-80">
            <div className="flex items-center gap-3">
              <Lock size={18} className="text-white/45" />
              <div>
                <h2 className="text-[15px] font-semibold text-white">Peak hours locked</h2>
                <p className="mt-1 text-[12px] text-white/45">Chronotype and correlations unlock with premium.</p>
              </div>
            </div>
          </SolidCard>
          <GlassCard tone="cia">
            <p className="text-[15px] leading-5 text-white">CIA sees a golden window for deep work after movement and breakfast.</p>
            <ConsentRail compact />
          </GlassCard>
        </main>
      </ScreenShell>
    </PhoneFrame>
  )
}

function NotificationPermissionScreen() {
  return (
    <PhoneFrame>
      <ScreenShell showTabBar={false}>
        <main className="flex min-h-full flex-col px-6 pb-6 pt-14 text-center">
          <GlassCard tone="cia" className="px-6 py-8">
            <div className="relative mx-auto flex h-28 w-28 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04]">
              <BellRing size={48} className="text-white" strokeWidth={1.6} />
              <span className="absolute right-4 top-4 h-3 w-3 rounded-full bg-brand-orange" />
            </div>
            <h1 className="mt-8 text-[28px] font-bold leading-8 text-white">Stay on track.</h1>
            <p className="mx-auto mt-3 max-w-[270px] text-[15px] leading-[22px] text-white/60">CIA uses notifications for coaching nudges, streak protection, and partner updates.</p>
            <div className="mt-7 space-y-4 text-left">
              {[
                ['CIA coaching nudges', 'Advice when context matters.'],
                ['Streak protection', 'Avoid missing a day by accident.'],
                ['Partner updates', 'Know when partners check in.'],
              ].map(([title, body]) => (
                <div key={title} className="flex gap-3">
                  <span className="mt-1 flex h-8 w-8 items-center justify-center rounded-lg bg-white/[0.05] text-white/60"><BellRing size={15} /></span>
                  <span><strong className="block text-[14px] text-white">{title}</strong><span className="text-[13px] text-white/50">{body}</span></span>
                </div>
              ))}
            </div>
          </GlassCard>
          <div className="flex-1" />
          <div className="h-13 rounded-pill bg-brand-orange px-6 py-4 text-[16px] font-semibold text-white shadow-[var(--glow-orange-sm)]">Enable notifications</div>
          <div className="mt-3 flex h-11 items-center justify-center text-[15px] text-white/50">Not now</div>
        </main>
      </ScreenShell>
    </PhoneFrame>
  )
}

function DirectChatScreen() {
  return (
    <PhoneFrame>
      <ScreenShell
        header={<TopBar title="Aisha Khan" right={<><IconButton label="Call"><Phone size={18} /></IconButton><IconButton label="Info"><Info size={18} /></IconButton></>} />}
        activeTab="cia"
        composer={<Composer placeholder="Message Aisha" />}
      >
        <main className="space-y-4 px-4 pb-4 pt-3">
          <SolidCard>
            <div className="flex items-center gap-3">
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-orange/15 text-[14px] font-bold text-brand-orange">AK</span>
              <div className="min-w-0 flex-1">
                <h2 className="text-[15px] font-semibold text-white">Aisha is training with you</h2>
                <p className="mt-1 text-[12px] text-white/45">Shared mission: Run 30 min</p>
                <div className="mt-2"><ProgressBar value={62} /></div>
              </div>
            </div>
          </SolidCard>
          <GlassCard tone="cia">
            <div className="flex items-start gap-3">
              <Sparkles size={18} className="mt-1 text-royal-purple" />
              <div>
                <p className="text-[12px] font-semibold uppercase text-royal-purple">CIA assist</p>
                <p className="mt-2 text-[13px] leading-[18px] text-white/65">Suggest pacing, summarize, or save to mission. You control access.</p>
                <div className="mt-3 flex gap-2"><Chip>Pace</Chip><Chip>Shared</Chip><Chip>Private</Chip></div>
              </div>
            </div>
          </GlassCard>
          <div className="flex items-center gap-3 py-1 text-[12px] text-white/30"><span className="h-px flex-1 bg-white/[0.06]" />Today<span className="h-px flex-1 bg-white/[0.06]" /></div>
          <ChatBubble speaker="Aisha">I am thinking of the river route this Sunday.</ChatBubble>
          <ChatBubble speaker="CIA" tone="cia">Private draft, visible only to you: recovery supports the river route.</ChatBubble>
          <div className="flex gap-2"><Chip tone="you">Insert draft</Chip><Chip>Share health source</Chip></div>
          <ChatBubble speaker="You">Works.</ChatBubble>
          <ChatBubble speaker="Aisha">Hill segment photo attached.</ChatBubble>
          <SolidCard className="overflow-hidden p-0">
            <div className="flex h-[118px] items-center justify-center bg-brand-orange/10 text-brand-orange">
              <Activity size={34} />
            </div>
            <div className="p-3"><Provenance items={['Hill segment', 'Useful 1', 'Media retention']} /></div>
          </SolidCard>
          <p className="text-[13px] text-white/40">Aisha is typing</p>
        </main>
      </ScreenShell>
    </PhoneFrame>
  )
}

function WellbeingScreen() {
  const modules = [
    ['Journal', BookOpen],
    ['Mood', Smile],
    ['Breathing', HeartPulse],
    ['Stress', Activity],
    ['Habits', Check],
    ['Energy', BatteryCharging],
    ['Insights', Sparkles],
    ['Vision', Zap],
  ] as const

  return (
    <PhoneFrame>
      <ScreenShell header={<TopBar title="Wellbeing" eyebrow="Tuesday, Jul 7" back={false} right={<IconButton label="Help"><Info size={18} /></IconButton>} />} activeTab="today" bottomAction={<FloatingQuickLog />}>
        <main className="space-y-4 px-4 pb-4 pt-3">
          <p className="text-[22px] font-semibold leading-7 text-white">Your daily whole state</p>
          <GlassCard>
            <p className="text-[12px] font-semibold uppercase text-white/45">How your system feels</p>
            <div className="mt-4 flex items-center justify-center">
              <span className="rounded-pill border border-brand-orange/25 bg-brand-orange/10 px-6 py-3 text-[28px] font-bold text-white shadow-[var(--glow-orange-sm)]">Steady</span>
            </div>
            <div className="mt-5 grid grid-cols-4 gap-2">
              <MetricPill label="Mood" value="6" />
              <MetricPill label="Stress" value="4" />
              <MetricPill label="Sleep" value="7h" />
              <MetricPill label="Energy" value="5" />
            </div>
            <p className="mt-4 text-[13px] text-white/55">Via check-in and wearable. One breath session helped twice.</p>
          </GlassCard>
          <SafetyCard />
          <GlassCard tone="cia">
            <p className="text-[15px] leading-5 text-white">CIA noticed stress eased after two breathing sessions this week.</p>
            <div className="mt-3 flex gap-2"><Chip tone="you">Start breathing</Chip><Chip>View sources</Chip></div>
          </GlassCard>
          <div className="grid grid-cols-2 gap-3">
            {modules.map(([name, Icon]) => (
              <SolidCard key={name} className="min-h-[76px]">
                <Icon size={19} className="text-brand-orange" />
                <p className="mt-3 text-[14px] font-semibold text-white">{name}</p>
                <p className="mt-1 text-[11px] text-white/40">Fresh source</p>
              </SolidCard>
            ))}
          </div>
          <SolidCard className="py-3">
            <p className="text-[13px] text-white/55">Today: 5:30 walk, 1 quick note.</p>
          </SolidCard>
        </main>
      </ScreenShell>
    </PhoneFrame>
  )
}

function SocialFeedScreen() {
  return (
    <PhoneFrame>
      <ScreenShell header={<TopBar title="Feed" back={false} right={<><IconButton label="Post"><Plus size={18} /></IconButton><IconButton label="Filter"><MoreHorizontal size={18} /></IconButton></>} />} activeTab="me" bottomAction={<FloatingQuickLog label="Post" />}>
        <main className="space-y-4 px-4 pb-4 pt-3">
          <div className="flex gap-2 overflow-hidden"><Chip tone="you">All</Chip><Chip>My pods</Chip><Chip>Circles</Chip><Chip>Partners</Chip></div>
          <GlassCard>
            <h2 className="text-[20px] font-semibold leading-6 text-white">Share one proof update</h2>
            <p className="mt-2 text-[13px] text-white/50">Visible to buddies. Choose audience before attaching health proof.</p>
            <div className="mt-4 flex gap-2"><Chip>Discussion</Chip><Chip>Question</Chip><Chip tone="you">Win</Chip></div>
          </GlassCard>
          <GlassCard tone="cia">
            <p className="text-[15px] leading-5 text-white">CIA sees Aisha&apos;s run post matching your half-marathon mission.</p>
            <div className="mt-3 flex gap-2"><Chip tone="you">Encourage</Chip><Chip>Privacy settings</Chip></div>
          </GlassCard>
          <FeedPost
            author="Aisha Khan"
            time="12m"
            body="Finished tempo run with Amira."
            proof="5.2 mi via wearable"
            media
          />
          <FeedPost
            author="Malik R."
            time="1h"
            body="Budget streak reached 14 days."
            proof="Mission update - inspectable"
          />
        </main>
      </ScreenShell>
    </PhoneFrame>
  )
}

function FeedPost({ author, time, body, proof, media = false }: { author: string; time: string; body: string; proof: string; media?: boolean }) {
  return (
    <SolidCard>
      <div className="flex items-center gap-3">
        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white/[0.05] text-[12px] font-bold text-white/70">{author.split(' ').map(part => part[0]).join('')}</span>
        <div className="min-w-0 flex-1">
          <h2 className="text-[14px] font-semibold text-white">{author}</h2>
          <p className="text-[12px] text-white/35">{time}</p>
        </div>
        <MoreHorizontal size={18} className="text-white/45" />
      </div>
      <p className="mt-4 text-[15px] leading-5 text-white/80">{body}</p>
      <div className="mt-3"><Chip>{proof}</Chip></div>
      {media && (
        <div className="mt-3 flex h-[132px] items-center justify-center rounded-lg border border-white/10 bg-brand-orange/10 text-brand-orange">
          <Activity size={30} />
        </div>
      )}
      <div className="mt-4 flex justify-between text-[12px] text-white/45">
        <span>Kudos 24</span><span>Comment 6</span><span>Views 83</span>
      </div>
    </SolidCard>
  )
}

function FloatingQuickLog({ label = 'Quick log' }: { label?: string }) {
  return (
    <div className="flex items-center justify-between rounded-pill border border-brand-orange/20 bg-ink-brown-800 px-3 py-2 shadow-[var(--glow-orange-sm)]">
      <span className="text-[13px] font-semibold text-white/70">{label}</span>
      <span className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-orange text-white">
        <Plus size={18} strokeWidth={2.4} />
      </span>
    </div>
  )
}

function QueuedScreen({ screen }: { screen: ScreenInfo }) {
  return (
    <PhoneFrame>
      <ScreenShell header={<TopBar title={screen.name} eyebrow={`Spec ${screen.id}`} />} showTabBar={false}>
        <main className="flex min-h-full flex-col px-4 pb-8 pt-4">
          <GlassCard tone="cia">
            <p className="text-[12px] font-semibold uppercase text-white/45">Source queued</p>
            <h1 className="mt-3 text-[27px] font-bold leading-8 text-white">{screen.name}</h1>
            <p className="mt-3 text-[14px] leading-5 text-white/60">This screen is registered from the new 104-screen hi-fi source and waits for its implementation batch.</p>
            <ConsentRail />
          </GlassCard>
          <div className="mt-4 space-y-3">
            <SolidCard>
              <SectionTitle title="Source route intent" />
              <p className="mt-3 text-[13px] leading-[18px] text-white/65">{screen.sourceRoutes || 'Source-only surface'}</p>
            </SolidCard>
            <SolidCard>
              <SectionTitle title="Implementation truth" />
              <div className="mt-3 flex flex-wrap gap-2">
                <Chip>{screen.specFile}</Chip>
                <Chip>{screen.conversionStatus}</Chip>
                <Chip>{screen.assetNeeds === 'none' ? 'No image slot' : screen.assetNeeds}</Chip>
              </div>
            </SolidCard>
            <SolidCard>
              <SectionTitle title="Required rendering passes" />
              <div className="mt-3 space-y-2 text-[13px] leading-[18px] text-white/60">
                <p>Read the hi-fi spec before composing UI.</p>
                <p>Preserve focal hierarchy, provenance chips, safety exits, honest-null states, and motion notes.</p>
                <p>Use CIA naming in visible UI.</p>
              </div>
            </SolidCard>
          </div>
          <div className="flex-1" />
        </main>
      </ScreenShell>
    </PhoneFrame>
  )
}

export function HifiPrototypeScreen({ screen }: { screen: ScreenInfo }) {
  switch (screen.id) {
    case '09':
      return <CiaChatScreen />
    case '12':
      return <HomeScreen />
    case '13':
      return <MissionBoardScreen />
    case '16':
      return <LifeAreasScreen />
    case '48':
      return <IntelligenceScreen />
    case '63':
      return <EnergyScreen />
    case '66':
      return <NotificationPermissionScreen />
    case '75':
      return <DirectChatScreen />
    case '89':
      return <WellbeingScreen />
    case '91':
      return <SocialFeedScreen />
    default:
      return <QueuedScreen screen={screen} />
  }
}
