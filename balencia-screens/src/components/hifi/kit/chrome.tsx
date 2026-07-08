import { ChevronLeft, Plus } from 'lucide-react'

export function TopBar({
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
