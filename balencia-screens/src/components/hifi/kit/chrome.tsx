import { Calendar, Check, ChevronLeft, Flag, MessageCircle, Plus, User } from 'lucide-react'
import { cx } from './core'

// Horizontal onboarding progress rail: completed = orange filled + check,
// current = orange ring, future = dim.
export function StepperRail({ steps, current }: { steps: string[]; current: number }) {
  return (
    <div className="flex items-start justify-between px-1" role="img" aria-label={`Step ${current + 1} of ${steps.length}: ${steps[current]}`}>
      {steps.map((step, index) => {
        const state = index < current ? 'done' : index === current ? 'current' : 'future'
        return (
          <div key={step} className="flex min-w-0 flex-1 flex-col items-center gap-1.5">
            <span
              className={cx(
                'flex h-6 w-6 items-center justify-center rounded-full text-[10px] font-semibold',
                state === 'done' && 'bg-brand-orange text-white',
                state === 'current' && 'border-2 border-brand-orange text-brand-orange',
                state === 'future' && 'border border-white/20 text-white/35',
              )}
            >
              {state === 'done' ? <Check size={12} strokeWidth={3} /> : index + 1}
            </span>
            <span className={cx('truncate text-[10px] leading-3', state === 'current' ? 'font-semibold text-brand-orange' : state === 'done' ? 'text-white/70' : 'text-white/35')}>
              {step}
            </span>
          </div>
        )
      })}
    </div>
  )
}

export function TopBar({
  title,
  eyebrow,
  right,
  back = true,
}: {
  title: React.ReactNode
  eyebrow?: string
  right?: React.ReactNode
  back?: boolean
}) {
  return (
    <header className="z-30 flex min-h-[58px] shrink-0 items-center gap-3 bg-ink-900/40 px-4 backdrop-blur-md">
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

export function IconButton({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <span className="flex h-11 w-11 items-center justify-center rounded-full text-white/60" aria-label={label}>
      {children}
    </span>
  )
}

export function SectionTitle({ title, meta }: { title: string; meta?: string }) {
  return (
    <div className="flex items-end justify-between px-1 pt-1">
      <h2 className="text-[12px] font-semibold uppercase leading-4 text-white/45">{title}</h2>
      {meta && <span className="text-[12px] leading-4 text-white/35">{meta}</span>}
    </div>
  )
}

const navTabs = [
  { key: 'today', label: 'Today', Icon: Calendar },
  { key: 'cia', label: 'CIA', Icon: MessageCircle },
  { key: 'goals', label: 'Missions', Icon: Flag },
  { key: 'me', label: 'Me', Icon: User },
] as const

export type HifiTab = (typeof navTabs)[number]['key']

// Floating glass pill bottom nav (COMPACT-CANON §6). Active tab reads orange
// with a heavier stroke — the lucide outline set has no filled variants.
export function GlassNavBar({ active = 'today' }: { active?: HifiTab }) {
  return (
    <nav className="shrink-0 px-5 pb-1" aria-label="Primary">
      <div className="glass-pill flex h-[60px] items-center justify-around px-2 shadow-2">
        {navTabs.map(({ key, label, Icon }) => {
          const isActive = key === active
          return (
            <div key={key} className="flex h-11 min-w-[64px] flex-col items-center justify-center gap-[2px]">
              <Icon
                size={22}
                strokeWidth={isActive ? 2.4 : 1.6}
                className={isActive ? 'text-brand-orange' : 'text-white/60'}
              />
              <span className={cx('text-[11px] leading-3', isActive ? 'font-semibold text-brand-orange' : 'text-white/60')}>
                {label}
              </span>
            </div>
          )
        })}
      </div>
    </nav>
  )
}

export function FloatingQuickLog({ label = 'Quick log' }: { label?: string }) {
  return (
    <div className="flex items-center justify-between rounded-pill border border-brand-orange/20 bg-ink-brown-800 px-3 py-2 shadow-[var(--glow-orange-sm)]">
      <span className="text-[13px] font-semibold text-white/70">{label}</span>
      <span className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-orange text-white">
        <Plus size={18} strokeWidth={2.4} />
      </span>
    </div>
  )
}
