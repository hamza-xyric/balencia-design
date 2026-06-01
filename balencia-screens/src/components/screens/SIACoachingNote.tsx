import Link from 'next/link'
import type { HTMLAttributes } from 'react'

type SIACoachingNoteProps = HTMLAttributes<HTMLDivElement> & {
  message: string
  moodChips?: { emoji: string; label: string }[]
  selectedMood?: string | null
  onMoodSelect?: (label: string) => void
  actionLabel?: string
  actionHref?: string
}

export function SiaAvatarMark({ size = 'sm' }: { size?: 'sm' | 'md' }) {
  const dimensions = size === 'md' ? 'h-8 w-8 text-[13px]' : 'h-6 w-6 text-small'

  return (
    <div
      className={[
        'flex shrink-0 items-center justify-center rounded-full border-2 border-royal-purple bg-ink-brown-800 font-semibold text-white shadow-[var(--glow-purple)]',
        dimensions,
      ].join(' ')}
      aria-hidden="true"
    >
      S
    </div>
  )
}

export function SIACoachingNote({
  message,
  moodChips = [],
  selectedMood,
  onMoodSelect,
  actionLabel,
  actionHref = '/tabs/sia',
  className = '',
  ...props
}: SIACoachingNoteProps) {
  return (
    <section
      className={[
        'rounded-xl border border-alpha-white-06 border-l-[3px] border-l-royal-purple/60 bg-ink-brown-800 p-6 shadow-1',
        className,
      ].filter(Boolean).join(' ')}
      aria-label={`SIA says: ${message}`}
      {...props}
    >
      <div className="flex items-center gap-2">
        <SiaAvatarMark />
        <span className="text-eyebrow font-semibold leading-4 text-white/50">SIA</span>
      </div>
      <p className="mt-3 text-[15px] leading-5 text-white/90">{message}</p>
      {actionLabel && (
        <div className="mt-3 flex justify-end">
          <Link
            href={actionHref}
            className="flex min-h-8 items-center text-caption leading-[18px] text-white/50 transition-colors duration-[var(--dur-fast)] hover:text-white/70"
          >
            {actionLabel}
          </Link>
        </div>
      )}
      {moodChips.length > 0 && (
        <div className="mt-4 flex gap-1.5 overflow-x-auto pb-1 hide-scrollbar">
          {moodChips.map((chip) => (
            <button
              key={chip.label}
              type="button"
              onClick={() => onMoodSelect?.(chip.label)}
              aria-pressed={selectedMood === chip.label}
              className={[
                'inline-flex min-h-11 shrink-0 items-center gap-1 rounded-pill border px-3 text-small leading-[14px] transition-transform duration-[var(--dur-fast)] active:scale-95',
                selectedMood === chip.label
                  ? 'border-brand-orange/35 bg-brand-orange/15 text-white'
                  : 'border-white/10 bg-ink-brown-800 text-white/60',
              ].join(' ')}
              aria-label={`Select mood: ${chip.label}`}
            >
              <span aria-hidden="true">{chip.emoji}</span>
              <span>{chip.label}</span>
            </button>
          ))}
        </div>
      )}
    </section>
  )
}
