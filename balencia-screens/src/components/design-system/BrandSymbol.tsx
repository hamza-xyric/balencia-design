type BrandSymbolProps = {
  size?: number
  glow?: boolean
  className?: string
}

export function BrandSymbol({ size = 48, glow = false, className = '' }: BrandSymbolProps) {
  return (
    <div
      className={[
        'relative flex items-center justify-center rounded-xl',
        glow ? 'bg-brand-orange/15 shadow-[var(--glow-orange)]' : '',
        className,
      ].filter(Boolean).join(' ')}
      style={{ width: size, height: size }}
      aria-label="Balencia symbol"
      role="img"
    >
      <span
        className="block h-full w-full bg-brand-orange"
        style={{
          WebkitMask: 'url("/logos/Logo%20Mark.svg") center / contain no-repeat',
          mask: 'url("/logos/Logo%20Mark.svg") center / contain no-repeat',
        }}
        aria-hidden="true"
      />
    </div>
  )
}
