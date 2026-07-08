import { BellRing } from 'lucide-react'
import { PhoneFrame } from '@/components/layout/PhoneFrame'
import { ScreenShell } from '@/components/layout/ScreenShell'
import { GlassCard } from '@/components/hifi/kit'

export function S66NotificationPermission() {
  return (
    <PhoneFrame>
      <ScreenShell showTabBar={false}>
        <main className="flex min-h-full flex-col px-6 pb-6 pt-14 text-center">
          <GlassCard tone="cia" className="px-6 py-8">
            <div className="relative mx-auto flex h-28 w-28 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04]">
              <BellRing size={48} className="text-white" strokeWidth={1.6} />
              <span className="absolute right-4 top-4 h-3 w-3 rounded-full bg-brand-orange" />
            </div>
            <h1 className="mt-8 text-[28px] font-bold leading-8 text-white">Stay on track.</h1>
            <p className="mx-auto mt-3 max-w-[270px] text-[15px] leading-[22px] text-white/60">CIA uses notifications for coaching nudges, streak protection, and partner updates.</p>
            <div className="mt-7 space-y-4 text-left">
              {[
                ['CIA coaching nudges', 'Advice when context matters.'],
                ['Streak protection', 'Avoid missing a day by accident.'],
                ['Partner updates', 'Know when partners check in.'],
              ].map(([title, body]) => (
                <div key={title} className="flex gap-3">
                  <span className="mt-1 flex h-8 w-8 items-center justify-center rounded-lg bg-white/[0.05] text-white/60"><BellRing size={15} /></span>
                  <span><strong className="block text-[14px] text-white">{title}</strong><span className="text-[13px] text-white/50">{body}</span></span>
                </div>
              ))}
            </div>
          </GlassCard>
          <div className="flex-1" />
          <div className="h-13 rounded-pill bg-brand-orange px-6 py-4 text-[16px] font-semibold text-white shadow-[var(--glow-orange-sm)]">Enable notifications</div>
          <div className="mt-3 flex h-11 items-center justify-center text-[15px] text-white/50">Not now</div>
        </main>
      </ScreenShell>
    </PhoneFrame>
  )
}
