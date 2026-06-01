import type { LucideIcon } from 'lucide-react'

type IntegrationStatus = 'connected' | 'not-connected' | 'coming-soon'

type IntegrationCardProps = {
  name: string
  iconLabel: string
  Icon?: LucideIcon
  status: IntegrationStatus
  description: string
  lastSync?: string
  className?: string
}

const statusCopy: Record<IntegrationStatus, string> = {
  connected: 'Connected',
  'not-connected': 'Not connected',
  'coming-soon': 'Coming soon',
}

const statusClasses: Record<IntegrationStatus, string> = {
  connected: 'bg-forest-green/15 text-forest-green',
  'not-connected': 'bg-white/10 text-white/50',
  'coming-soon': 'bg-alpha-white-05 text-white/30',
}

export function IntegrationCard({
  name,
  iconLabel,
  Icon,
  status,
  description,
  lastSync,
  className = '',
}: IntegrationCardProps) {
  const isConnected = status === 'connected'
  const isComingSoon = status === 'coming-soon'

  return (
    <article
      className={[
        'rounded-xl border border-alpha-white-06 bg-ink-brown-800 p-4 shadow-1',
        isComingSoon ? 'opacity-60' : '',
        className,
      ].filter(Boolean).join(' ')}
    >
      <div className="flex items-start gap-3">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-white/10 bg-ink-900 text-[12px] font-bold text-white/70">
          {Icon ? <Icon size={18} strokeWidth={1.8} /> : iconLabel}
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-2">
            <h2 className="truncate text-[16px] font-semibold leading-[22px] text-white">{name}</h2>
            <span className={`shrink-0 rounded-pill px-2.5 py-1 text-small font-semibold leading-[14px] ${statusClasses[status]}`}>
              {statusCopy[status]}
            </span>
          </div>
          <p className="mt-2 text-[13px] leading-[18px] text-white/50">
            {isConnected ? `Syncing: ${description}` : description}
          </p>
          {lastSync && (
            <p className="mt-1 text-[13px] leading-[18px] text-white/40">
              Last sync: {lastSync}
            </p>
          )}
        </div>
      </div>

      <div className={isConnected ? 'mt-4 grid grid-cols-2 gap-3' : 'mt-4 flex justify-end'}>
        {isConnected ? (
          <>
            <button className="h-9 rounded-pill border border-white/10 px-3 text-[14px] font-semibold leading-[18px] text-white/80">
              Force sync
            </button>
            <button className="h-9 rounded-pill border border-white/10 px-3 text-[14px] font-semibold leading-[18px] text-error-red">
              Disconnect
            </button>
          </>
        ) : (
          <button
            className={[
              'h-9 min-w-[112px] rounded-pill px-4 text-[14px] font-semibold leading-[18px]',
              isComingSoon ? 'border border-white/10 text-white/30' : 'bg-brand-orange text-white',
            ].join(' ')}
          >
            {isComingSoon ? 'Notify me' : 'Connect'}
          </button>
        )}
      </div>
    </article>
  )
}
