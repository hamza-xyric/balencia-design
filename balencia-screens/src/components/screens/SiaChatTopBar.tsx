import Link from 'next/link'
import { AudioLines, MessageCircle, Search } from 'lucide-react'

type SiaChatTopBarProps = {
  voiceActive?: boolean
  title?: string
  subtitle?: string
}

export function SiaChatTopBar({
  voiceActive = false,
  title = 'SIA',
  subtitle = 'Coach online',
}: SiaChatTopBarProps) {
  return (
    <header className="z-30 flex h-[56px] shrink-0 items-center justify-between border-b border-alpha-white-05 bg-ink-900/85 px-4 backdrop-blur-[20px]">
      <div>
        <h1 className="text-h3 font-semibold leading-[22px] text-white">{title}</h1>
        <p className="mt-0.5 text-[11px] leading-[14px] text-white/35">{subtitle}</p>
      </div>
      <div className="flex items-center gap-1">
        <Link
          href="/tabs/sia/conversations"
          className="flex h-11 w-11 items-center justify-center text-white/50"
          aria-label="Open conversations"
        >
          <MessageCircle size={20} strokeWidth={1.8} />
        </Link>
        <button
          type="button"
          disabled
          className="flex h-11 w-11 items-center justify-center text-white/25"
          aria-label="Search conversations unavailable in this prototype"
          title="Search conversations unavailable in this prototype"
        >
          <Search size={20} strokeWidth={1.8} />
        </button>
        <Link
          href="/tabs/sia/voice-fullscreen"
          className={[
            'flex h-11 w-11 items-center justify-center transition-colors duration-[var(--dur-fast)]',
            voiceActive ? 'text-royal-purple' : 'text-white/50',
          ].join(' ')}
          aria-label="Open full-screen voice mode"
        >
          <AudioLines size={22} strokeWidth={1.9} />
        </Link>
      </div>
    </header>
  )
}
