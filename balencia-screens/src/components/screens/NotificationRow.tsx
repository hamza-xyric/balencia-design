import { BarChart3, Bell, Brain, Users } from 'lucide-react'

type NotificationCategory = 'sia' | 'reminder' | 'check-in' | 'social'

type NotificationRowProps = {
  category: NotificationCategory
  title: string
  preview: string
  timestamp: string
  unread?: boolean
  className?: string
}

const categoryMeta = {
  sia: { Icon: Brain, className: 'text-royal-purple' },
  reminder: { Icon: Bell, className: 'text-brand-orange' },
  'check-in': { Icon: BarChart3, className: 'text-forest-green' },
  social: { Icon: Users, className: 'text-white/60' },
} as const

export function NotificationRow({
  category,
  title,
  preview,
  timestamp,
  unread = false,
  className = '',
}: NotificationRowProps) {
  const { Icon, className: iconClassName } = categoryMeta[category]

  return (
    <button
      type="button"
      className={[
        'flex min-h-20 w-full items-start gap-3 border-b border-white/[0.05] bg-ink-brown-800 px-4 py-3 text-left transition-transform duration-[var(--dur-fast)] last:border-b-0 active:scale-[0.99]',
        className,
      ].filter(Boolean).join(' ')}
    >
      <span
        className={['mt-[18px] h-2 w-2 shrink-0 rounded-full bg-brand-orange', unread ? 'opacity-100' : 'opacity-0'].join(' ')}
        aria-hidden={!unread}
      />
      <Icon size={24} className={`mt-2 shrink-0 ${iconClassName}`} strokeWidth={1.8} />
      <span className="min-w-0 flex-1">
        <span className="flex items-start justify-between gap-3">
          <span className={unread ? 'truncate text-[15px] font-semibold leading-5 text-white' : 'truncate text-[15px] leading-5 text-white/80'}>
            {title}
          </span>
          <span className="shrink-0 text-[12px] leading-4 text-white/40">{timestamp}</span>
        </span>
        <span className="mt-1 line-clamp-2 text-[13px] leading-[18px] text-white/50">
          {preview}
        </span>
      </span>
    </button>
  )
}
