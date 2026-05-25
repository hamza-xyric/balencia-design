export function SocialAuthButton({ mark, label }: { mark: string; label: string }) {
  return (
    <button className="flex h-[52px] flex-1 items-center justify-center gap-2 rounded-lg border border-white/10 bg-ink-brown-800 text-[15px] font-semibold text-white transition-transform duration-[var(--dur-fast)] active:scale-[0.97]">
      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white/10 text-small font-bold text-white">
        {mark}
      </span>
      {label}
    </button>
  )
}
