import { ChevronLeft } from 'lucide-react'
import { BtnGhost, BtnPrimary, ChargeMeter, HifiShell, IconButton, cx } from '@/components/hifi/kit'

// Cold-start default: first cell focused, keyboard raised, nothing entered
// yet, resend cooldown just started. Rate-limited/expired/invalid/offline
// branches reuse the catalog OfflineBanner low-banner treatment and swap
// the cell border to solid 2px orange (no glow — glow is reserved for
// active/positive states) — not rendered here since this file is the one
// canonical frame, not a state machine. Emphasis word follows the source's
// own composition mockup ("email"); the Visual System line's "verification"
// note doesn't appear naturally in this screen's copy.
export function S03bOtpVerification() {
  return (
    <HifiShell
      showTabBar={false}
      header={
        <div className="flex min-h-[58px] shrink-0 items-center px-2">
          <IconButton label="Back">
            <ChevronLeft className="h-5 w-5" strokeWidth={1.9} />
          </IconButton>
        </div>
      }
      bottomAction={<BtnPrimary disabled>Verify.</BtnPrimary>}
    >
      <main className="flex flex-1 flex-col items-center px-6 pb-4 pt-2 text-center">
        <div className="pt-2">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logos/Balencia white PNG.png" alt="Balencia." className="h-8 w-auto" />
        </div>

        <div className="mt-8 space-y-2">
          <h1 className="text-[26px] font-semibold leading-tight text-white">
            Verify your <span className="text-emphasis">email</span>
          </h1>
          <p className="mx-auto max-w-[280px] text-[15px] leading-snug text-white/50">
            We sent a 4-digit code to a***@email.com
          </p>
        </div>

        <div
          className="mt-9 flex items-center justify-center gap-3"
          role="img"
          aria-label="4-digit verification code, digit 1 active, empty"
        >
          <OTPDigitCell focused />
          <OTPDigitCell />
          <OTPDigitCell />
          <OTPDigitCell />
        </div>

        <div className="mt-8 flex flex-col items-center gap-3">
          <BtnGhost quiet>Resend code</BtnGhost>
          <div className="flex w-full max-w-[240px] items-center gap-2">
            <ChargeMeter ticks={12} filled={11} label="Resend available in 59 seconds" />
            <span className="shrink-0 text-[12px] tabular-nums text-white/45">0:59</span>
          </div>
        </div>
      </main>
    </HifiShell>
  )
}

// NEW: OTPDigitCell — borrows .glass-pill's dark-glass material but sets
// radius 14 (canon input radius) instead of the pill's radius 999, since
// this is an input, not a pill. Focus = 1.5px orange + glow; error (not
// rendered in this default frame) drops the glow per the honesty rule that
// a breathing glow on a wrong code would read as "good, keep going."
function OTPDigitCell({ focused }: { focused?: boolean }) {
  return (
    <div
      className={cx(
        'flex h-16 w-14 items-center justify-center rounded-[14px] border bg-ink-900/55 backdrop-blur-2xl',
        focused ? 'border-[1.5px] border-brand-orange shadow-[var(--glow-orange-sm)]' : 'border-white/10',
      )}
    >
      {focused && <span aria-hidden="true" className="h-5 w-px quiet-pulse bg-brand-orange" />}
    </div>
  )
}
