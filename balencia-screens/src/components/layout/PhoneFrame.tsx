export function PhoneFrame({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="relative h-[812px] w-[375px] flex-shrink-0 overflow-hidden rounded-2xl border border-white/10 bg-ink-900 shadow-3 [transform:translateZ(0)]"
      data-testid="phone-frame"
    >
      <div
        className="absolute left-1/2 top-[10px] z-50 h-[36px] w-[126px] -translate-x-1/2 rounded-full bg-ink-700"
        data-testid="dynamic-island"
      />

      <div className="h-full w-full overflow-y-auto hide-scrollbar">
        {children}
      </div>

      <div
        className="absolute bottom-[8px] left-1/2 z-50 h-[5px] w-[134px] -translate-x-1/2 rounded-full bg-white/20"
        data-testid="home-indicator"
      />
    </div>
  )
}
