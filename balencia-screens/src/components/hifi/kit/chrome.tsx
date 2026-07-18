import { Calendar, Check, Plus, User } from 'lucide-react'
import Link from 'next/link'
import { cx } from './core'
import { CiaIntelligenceIcon, MissionIcon } from './signature-icons'
import { BackControl } from './back-control'

export function StepperRail({ steps, current }: { steps: string[]; current: number }) {
  return (
    <ol className="flex items-start justify-between px-1" aria-label={`Step ${current + 1} of ${steps.length}: ${steps[current]}`}>
      {steps.map((step, index) => {
        const state = index < current ? 'done' : index === current ? 'current' : 'future'
        return (
          <li key={step} aria-current={state === 'current' ? 'step' : undefined} className="flex min-w-0 flex-1 flex-col items-center gap-1.5">
            <span
              aria-hidden="true"
              className={cx(
                'flex h-6 w-6 items-center justify-center rounded-full text-[10px] font-semibold',
                state === 'done' && 'bg-cta-ember text-paper-100',
                state === 'current' && 'border-2 border-brand-orange text-brand-orange',
                state === 'future' && 'border border-white/25 text-paper-100/60',
              )}
            >
              {state === 'done' ? <Check size={12} strokeWidth={3} /> : index + 1}
            </span>
            <span className={cx('truncate text-[11px] leading-3', state === 'current' ? 'font-semibold text-brand-orange' : 'text-paper-100/65')}>
              {step}
            </span>
          </li>
        )
      })}
    </ol>
  )
}

export function TopBar({
  title,
  eyebrow,
  right,
  back = true,
  backHref = '/screens/12',
  titleLevel = 'h1',
}: {
  title: React.ReactNode
  eyebrow?: string
  right?: React.ReactNode
  back?: boolean
  backHref?: string
  titleLevel?: 'h1' | 'div'
}) {
  const titleClass = 'truncate text-[17px] font-semibold leading-6 text-paper-100'
  return (
    <header className="z-30 flex min-h-[58px] shrink-0 items-center gap-3 bg-ink-900/40 px-4 backdrop-blur-md">
      {back && (
        <BackControl fallbackHref={backHref} />
      )}
      <div className="min-w-0 flex-1">
        {titleLevel === 'h1' ? <h1 className={titleClass}>{title}</h1> : <div className={titleClass}>{title}</div>}
        {eyebrow && <p className="text-[12px] leading-4 text-paper-100/65">{eyebrow}</p>}
      </div>
      {right}
    </header>
  )
}

export function IconButton({ label, children, className, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement> & { label: string; children: React.ReactNode }) {
  return (
    <button
      type="button"
      className={cx('focus-ring flex h-11 w-11 items-center justify-center rounded-full text-paper-100/70 transition-colors hover:text-paper-100', className)}
      aria-label={label}
      {...props}
    >
      {children}
    </button>
  )
}

export function SectionTitle({ title, meta, action }: { title: string; meta?: string; action?: React.ReactNode }) {
  return (
    <div className="flex min-h-11 items-center justify-between gap-3 px-1 pt-1">
      <h2 className="text-[12px] font-semibold uppercase leading-4 tracking-[0.08em] text-paper-100/70">{title}</h2>
      {action ?? (meta && <span className="text-[12px] leading-4 text-paper-100/60">{meta}</span>)}
    </div>
  )
}

const navTabs = [
  { key: 'today', label: 'Today', kind: 'calendar', href: '/screens/12' },
  { key: 'cia', label: 'CIA', kind: 'cia', href: '/screens/09' },
  { key: 'goals', label: 'Missions', kind: 'mission', href: '/screens/13' },
  { key: 'me', label: 'Me', kind: 'profile', href: '/screens/17' },
] as const

export type HifiTab = (typeof navTabs)[number]['key']

export function GlassNavBar({ active = 'today' }: { active?: HifiTab }) {
  return (
    <nav className="shrink-0 px-5 pb-1" aria-label="Primary">
      <div className="glass-pill flex h-[60px] items-center justify-around px-2 shadow-2">
        {navTabs.map(({ key, label, kind, href }) => {
          const isActive = key === active
          const iconClassName = isActive ? 'text-brand-orange' : 'text-paper-100/65'
          return (
            <a
              key={key}
              href={href}
              aria-current={isActive ? 'page' : undefined}
              className="focus-ring flex h-11 min-w-[64px] flex-col items-center justify-center gap-[2px] rounded-md"
            >
              {kind === 'cia' && <CiaIntelligenceIcon active={isActive} size={22} strokeWidth={isActive ? 2.4 : 1.8} className={iconClassName} />}
              {kind === 'mission' && <MissionIcon active={isActive} size={22} strokeWidth={isActive ? 2.4 : 1.8} className={iconClassName} />}
              {kind === 'calendar' && <Calendar size={22} strokeWidth={isActive ? 2.4 : 1.8} className={iconClassName} />}
              {kind === 'profile' && <User size={22} strokeWidth={isActive ? 2.4 : 1.8} className={iconClassName} />}
              <span className={cx('text-[11px] leading-3', isActive ? 'font-semibold text-brand-orange' : 'text-paper-100/65')}>
                {label}
              </span>
            </a>
          )
        })}
      </div>
    </nav>
  )
}

export function FloatingQuickLog({ label = 'Quick log', href }: { label?: string; href: string }) {
  return (
    <Link
      href={href}
      className="hifi-action focus-ring flex min-h-[52px] w-full items-center justify-between rounded-pill border border-brand-orange/35 bg-ink-brown-800 px-3 py-2 text-left"
      aria-label={label}
    >
      <span className="text-[13px] font-semibold text-paper-100/80">{label}</span>
      <span aria-hidden="true" className="flex h-10 w-10 items-center justify-center rounded-full bg-cta-ember text-paper-100">
        <Plus size={18} strokeWidth={2.4} />
      </span>
    </Link>
  )
}
