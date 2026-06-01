import { Apple } from 'lucide-react'

function GoogleMark() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
      <path fill="rgb(66 133 244)" d="M22.6 12.2c0-.8-.1-1.6-.2-2.3H12v4.4h5.9a5 5 0 0 1-2.2 3.3v2.7h3.5c2-1.9 3.4-4.6 3.4-8.1Z" />
      <path fill="rgb(52 168 83)" d="M12 23c3 0 5.5-1 7.3-2.7l-3.5-2.7c-1 .6-2.2 1-3.7 1-2.9 0-5.4-2-6.3-4.6H2.1v2.8A11 11 0 0 0 12 23Z" />
      <path fill="rgb(251 188 5)" d="M5.7 14c-.2-.6-.3-1.3-.3-2s.1-1.4.3-2V7.2H2.1A11 11 0 0 0 1 12c0 1.7.4 3.3 1.1 4.8L5.7 14Z" />
      <path fill="rgb(234 67 53)" d="M12 5.4c1.6 0 3.1.6 4.2 1.7l3.1-3.1A10.5 10.5 0 0 0 12 1 11 11 0 0 0 2.1 7.2L5.7 10c.9-2.7 3.4-4.6 6.3-4.6Z" />
    </svg>
  )
}

function ProviderMark({ label, mark }: { label: string; mark: string }) {
  if (label.toLowerCase() === 'google') return <GoogleMark />
  if (label.toLowerCase() === 'apple') return <Apple size={20} fill="currentColor" strokeWidth={1.8} />

  return (
    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white/10 text-small font-bold text-white">
      {mark}
    </span>
  )
}

export function SocialAuthButton({ mark, label, onClick }: { mark: string; label: string; onClick?: () => void }) {
  return (
    <button
      aria-label={`Continue with ${label}`}
      onClick={onClick}
      className="flex h-[52px] flex-1 items-center justify-center gap-2 rounded-lg border border-white/10 bg-ink-brown-800 text-[15px] font-semibold text-white transition-transform duration-[var(--dur-fast)] hover:border-white/20 active:scale-[0.97]"
    >
      <ProviderMark label={label} mark={mark} />
      {label}
    </button>
  )
}
