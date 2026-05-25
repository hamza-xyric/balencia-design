import type { HTMLAttributes, ReactNode } from 'react'

type StatTileProps = HTMLAttributes<HTMLDivElement> & {
  value: ReactNode
  label: string
}

export function StatTile({ value, label, className = '', ...props }: StatTileProps) {
  return (
    <div
      className={[
        'flex min-w-0 flex-1 flex-col items-center justify-center text-center',
        className,
      ].filter(Boolean).join(' ')}
      {...props}
    >
      <div className="min-w-0 text-[24px] font-bold leading-[30px] text-white tabular-nums">
        {value}
      </div>
      <div className="mt-1 max-w-full text-[12px] leading-4 text-white/50">
        {label}
      </div>
    </div>
  )
}
