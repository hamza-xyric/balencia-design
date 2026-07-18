import { cx, toneClass, type Tone } from './core'

// `interactive` marks a chip that acts as a button/selector: 44px hit area.
// The 32px badge default is for status/provenance display only. `pressed`
// only renders aria-pressed on interactive chips that are actual toggles —
// leave it undefined for chips that merely trigger an action (e.g. "show more").
type ChipCommon = {
  children: React.ReactNode
  tone?: Tone
  className?: string
}

type DisplayChipProps = ChipCommon & {
  interactive?: false
  pressed?: never
  href?: never
} & Omit<React.HTMLAttributes<HTMLSpanElement>, 'children' | 'className'>

type ButtonChipProps = ChipCommon & {
  interactive: true
  pressed?: boolean
  href?: never
} & Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'children' | 'className'>

type LinkChipProps = ChipCommon & {
  interactive: true
  pressed?: never
  href: string
} & Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'children' | 'className' | 'href'>

type ChipProps = DisplayChipProps | ButtonChipProps | LinkChipProps

function LinkChip({
  children,
  tone = 'muted',
  className,
  interactive,
  ...anchorProps
}: LinkChipProps) {
  return (
    <a
      {...anchorProps}
      data-chip-interactive={interactive}
      className={cx('focus-ring inline-flex min-h-11 items-center justify-center rounded-pill border px-4 text-[11px] font-semibold leading-4', toneClass[tone], className)}
    >
      {children}
    </a>
  )
}

function ButtonChip({ children, tone = 'muted', className, interactive, pressed, type = 'button', ...buttonProps }: ButtonChipProps) {
  return (
    <button
      {...buttonProps}
      type={type}
      data-chip-interactive={interactive}
      className={cx('focus-ring inline-flex min-h-11 items-center justify-center rounded-pill border px-4 text-[11px] font-semibold leading-4', toneClass[tone], className)}
      aria-pressed={pressed}
    >
      {children}
    </button>
  )
}

function DisplayChip({ children, tone = 'muted', className, interactive, ...spanProps }: DisplayChipProps) {
  return (
    <span
      {...spanProps}
      data-chip-interactive={interactive}
      className={cx('inline-flex min-h-8 items-center justify-center rounded-pill border px-3 text-[11px] font-semibold leading-4', toneClass[tone], className)}
    >
      {children}
    </span>
  )
}

export function Chip(props: ChipProps) {
  if (!props.interactive) return <DisplayChip {...(props as DisplayChipProps)} />
  if ('href' in props && props.href) return <LinkChip {...(props as LinkChipProps)} />
  return <ButtonChip {...(props as ButtonChipProps)} />
}

export function Provenance({ items }: { items: string[] }) {
  return (
    <div className="flex flex-wrap gap-2">
      {items.map(item => <Chip key={item}>{item}</Chip>)}
    </div>
  )
}

const BASE_DATA_CONTROLS = ['Category', 'Source', 'Scope', 'Freshness', 'Confidence'] as const
export const PRIVACY_DATA_CONTROLS = ['Source', 'Retention', 'Export', 'Revoke', 'Delete'] as const
export const FULL_DATA_CONTROLS = [...BASE_DATA_CONTROLS, 'Retention', 'Export', 'Revoke', 'Delete'] as const

export function ConsentRail({
  compact = false,
  controls = PRIVACY_DATA_CONTROLS,
}: {
  compact?: boolean
  controls?: readonly string[]
}) {
  return (
    <div className={cx('flex flex-wrap gap-2', compact ? 'mt-2' : 'mt-4')} role="group" aria-label="Data controls">
      {controls.map(item => (
        <Chip
          key={item}
          interactive
          href={`/screens/84?control=${encodeURIComponent(item.toLowerCase())}`}
          className="text-[11px]"
        >
          {item}
        </Chip>
      ))}
    </div>
  )
}
