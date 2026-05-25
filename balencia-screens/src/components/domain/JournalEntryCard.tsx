import type { HTMLAttributes } from 'react'
import { Mic } from 'lucide-react'
import { DomainTag } from '@/components/design-system/DomainTag'
import type { DomainKey } from '@/data/domains'

type JournalEntryCardProps = HTMLAttributes<HTMLDivElement> & {
  date: string
  preview: string
  domains: DomainKey[]
  mood?: string
  voice?: boolean
  withDivider?: boolean
}

export function JournalEntryCard({
  date,
  preview,
  domains,
  mood,
  voice = false,
  withDivider = false,
  className = '',
  ...props
}: JournalEntryCardProps) {
  return (
    <article
      className={[
        'px-4 py-4 transition-colors duration-[var(--dur-fast)] active:bg-white/[0.05]',
        withDivider ? 'border-t border-white/[0.05]' : '',
        className,
      ].filter(Boolean).join(' ')}
      {...props}
    >
      <div className="flex items-center justify-between gap-3">
        <div className="flex min-w-0 items-center gap-2">
          <h2 className="truncate text-[15px] font-semibold leading-5 text-white">{date}</h2>
          {voice && (
            <span className="inline-flex h-5 shrink-0 items-center gap-1 rounded-sm bg-white/[0.05] px-1.5 text-[11px] leading-4 text-white/40">
              <Mic size={11} strokeWidth={2.1} />
              voice
            </span>
          )}
        </div>
        {mood && <span className="text-[20px] leading-5">{mood}</span>}
      </div>

      <p className="mt-2 line-clamp-2 text-[14px] leading-5 text-white/60">
        {preview}
      </p>

      <div className="mt-3 flex flex-wrap gap-2">
        {domains.map((domain) => (
          <DomainTag key={domain} domain={domain} showDot={false} />
        ))}
      </div>
    </article>
  )
}
