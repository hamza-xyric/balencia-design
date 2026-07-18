import { Shield } from 'lucide-react'
import { SolidCard } from './surfaces'

export function SafetyCard({
  href = '/screens/25?support=crisis',
  title = 'Crisis resources',
  description = 'View local support guidance and emergency options. This prototype does not place calls or send texts.',
}: {
  href?: string
  title?: string
  description?: string
}) {
  return (
    <SolidCard className="border-white/10">
      <a
        href={href}
        aria-label={`Open ${title.toLowerCase()} in Help Center`}
        className="focus-ring -m-2 flex min-h-14 items-center gap-3 rounded-lg p-2"
      >
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white/[0.04] text-white/70">
          <Shield size={19} strokeWidth={1.9} />
        </span>
        <div className="min-w-0 flex-1">
          <h2 className="text-[15px] font-semibold leading-5 text-white">{title}</h2>
          <p className="mt-1 text-[12px] leading-4 text-white/70">{description}</p>
        </div>
      </a>
    </SolidCard>
  )
}
