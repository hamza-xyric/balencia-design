import { cx, toneClass, type Tone } from './core'

export function ProgressBar({ value, tone = 'you' }: { value: number; tone?: Tone }) {
  const color = tone === 'done' ? 'bg-forest-green' : tone === 'cia' ? 'bg-royal-purple' : 'bg-brand-orange'
  return (
    <div className="h-2 overflow-hidden rounded-pill bg-white/[0.08]">
      <div className={cx('h-full rounded-pill', color)} style={{ width: `${value}%` }} />
    </div>
  )
}

export function MetricPill({ label, value, tone = 'muted' }: { label: string; value: string; tone?: Tone }) {
  return (
    <div className={cx('rounded-lg border p-3', toneClass[tone])}>
      <p className="text-[11px] font-semibold uppercase leading-3 opacity-80">{label}</p>
      <p className="mt-2 text-[20px] font-bold leading-6 text-white">{value}</p>
    </div>
  )
}

export function MiniRadar({ labels = false }: { labels?: boolean }) {
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

export function ArcGauge({ value, label }: { value: string; label: string }) {
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

export function Sparkline({ tone = 'you' }: { tone?: Tone }) {
  const stroke = tone === 'cia' ? 'stroke-royal-purple' : tone === 'done' ? 'stroke-forest-green' : 'stroke-brand-orange'
  return (
    <svg viewBox="0 0 240 70" className="h-[70px] w-full" aria-hidden="true">
      <path d="M4 52 C32 38 40 18 66 22 C98 28 94 58 126 48 C160 38 166 16 198 24 C218 29 226 24 236 18" fill="none" className={stroke} strokeWidth="3" strokeLinecap="round" />
      <path d="M4 70 L4 52 C32 38 40 18 66 22 C98 28 94 58 126 48 C160 38 166 16 198 24 C218 29 226 24 236 18 L236 70 Z" className="fill-brand-orange/10" />
    </svg>
  )
}
