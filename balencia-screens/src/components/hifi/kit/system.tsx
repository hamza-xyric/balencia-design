import { Shield } from 'lucide-react'
import { SolidCard } from './surfaces'

export function SafetyCard() {
  return (
    <SolidCard className="border-white/10">
      <div className="flex items-center gap-3">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white/[0.04] text-white/70">
          <Shield size={19} strokeWidth={1.9} />
        </span>
        <div className="min-w-0 flex-1">
          <h2 className="text-[15px] font-semibold leading-5 text-white">Crisis resources</h2>
          <p className="mt-1 text-[12px] leading-4 text-white/50">Call, text, or view local support. This stays available offline.</p>
        </div>
      </div>
    </SolidCard>
  )
}
