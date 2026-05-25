import { Check, Circle, ShieldAlert } from 'lucide-react'
import { Button } from '@/components/design-system/Button'
import { ToggleSwitch } from '@/components/design-system/ToggleSwitch'
import { PhoneFrame } from '@/components/layout/PhoneFrame'
import { ScreenShell } from '@/components/layout/ScreenShell'
import { reportBlock } from '@/data/mock'

// Screen 64 of 78: Report / block
// Spec: /Users/hamza/yHealth/app_design 3/64-report-block.md

function ReasonRow({ reason, selected, divider }: { reason: string; selected: boolean; divider?: boolean }) {
  return (
    <div className={['flex h-12 items-center gap-3 px-4', divider ? 'border-t border-white/[0.05]' : ''].join(' ')}>
      <span className={['flex h-5 w-5 items-center justify-center rounded-full border', selected ? 'border-brand-orange bg-brand-orange text-white' : 'border-white/20 text-transparent'].join(' ')}>
        {selected ? <Check size={12} strokeWidth={2.6} /> : <Circle size={10} strokeWidth={2.2} />}
      </span>
      <span className="text-[15px] leading-5 text-white/80">{reason}</span>
    </div>
  )
}

export default function ReportBlockScreen() {
  return (
    <PhoneFrame>
      <ScreenShell showTabBar={false}>
        <main className="relative min-h-full overflow-hidden bg-ink-900">
          <div className="absolute inset-0 opacity-40">
            <div className="mx-4 mt-8 h-24 rounded-xl border border-white/[0.06] bg-ink-brown-800" />
            <div className="mx-4 mt-4 h-40 rounded-xl border border-white/[0.06] bg-ink-brown-800" />
            <div className="mx-4 mt-4 h-28 rounded-xl border border-white/[0.06] bg-ink-brown-800" />
          </div>
          <div className="absolute inset-0 bg-ink-900/60" />

          <section className="absolute inset-x-0 bottom-0 z-40 rounded-t-2xl border border-white/[0.06] bg-ink-brown-800 px-4 pb-6 pt-3 shadow-3 animate-fade-up">
            <div className="mx-auto h-1 w-10 rounded-pill bg-white/20" />
            <div className="relative mt-4 flex h-10 items-center">
              <button type="button" className="text-caption font-semibold leading-[18px] text-white/50">Cancel</button>
              <h1 className="absolute left-1/2 -translate-x-1/2 text-h3 font-semibold leading-[22px] text-white">Report</h1>
            </div>

            <div className="mt-4 rounded-lg border border-white/[0.06] bg-ink-900/70 p-4">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-orange text-small font-semibold text-white">
                  {reportBlock.entity.avatar}
                </span>
                <div className="min-w-0">
                  <div className="truncate text-[15px] font-semibold leading-5 text-white">{reportBlock.entity.username}</div>
                  <div className="mt-1 truncate text-caption leading-[18px] text-white/45">{reportBlock.entity.preview}</div>
                </div>
              </div>
            </div>

            <div className="mt-5 text-eyebrow font-semibold uppercase leading-4 tracking-[0.12em] text-white/40">
              why are you reporting this?
            </div>
            <div className="mt-3 overflow-hidden rounded-xl border border-white/[0.06] bg-ink-900/70">
              {reportBlock.reasons.map((reason, index) => (
                <ReasonRow key={reason} reason={reason} selected={reason === reportBlock.selectedReason} divider={index > 0} />
              ))}
            </div>

            <div className="mt-4 h-[92px] rounded-md border border-brand-orange/25 bg-ink-900 p-4 text-[15px] leading-5 text-white/35">
              {reportBlock.description}
            </div>

            <div className="mt-4 flex h-12 items-center justify-between rounded-lg border border-white/[0.06] bg-ink-900/70 px-4">
              <div className="flex items-center gap-2 text-[15px] font-semibold leading-5 text-white">
                <ShieldAlert size={16} className="text-white/50" strokeWidth={2.1} />
                Also block this user
              </div>
              <ToggleSwitch checked={reportBlock.blockUser} aria-label="Also block this user" />
            </div>

            <Button fullWidth className="mt-5">Submit report</Button>
          </section>
        </main>
      </ScreenShell>
    </PhoneFrame>
  )
}
