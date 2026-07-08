import { Check, ChevronLeft, Mail } from 'lucide-react'
import {
  BtnGhost,
  BtnPrimary,
  ChargeMeter,
  GlassCard,
  GlassPillInput,
  HifiShell,
  IconButton,
  Provenance,
} from '@/components/hifi/kit'

// Sparse, account-enumeration-safe recovery gateway. Chosen state: valid
// email entered, "Send reset link" enabled — the dominant command surface.
// The confirmation state (masked destination, resend cooldown) is shown
// beneath as a clearly labeled preview using BtnGhost only, so the screen
// keeps a single BtnPrimary while still surfacing the MaskedDestinationLine
// and ChargeMeter honesty elements. TopBar composed locally (IconButton, no
// title) for the same reason as 04 — the spec wants chevron-only chrome.
export function S05ForgotPassword() {
  return (
    <HifiShell
      atmosphere="you"
      showTabBar={false}
      header={
        <div className="flex h-11 items-center px-2 pt-2">
          <IconButton label="Back to sign in">
            <ChevronLeft className="h-5 w-5" strokeWidth={1.9} />
          </IconButton>
        </div>
      }
    >
      <main className="flex flex-col px-5 pb-6">
        <div className="pt-2 text-center">
          <span className="text-[13px] font-medium uppercase tracking-[0.2em] text-white/45">Balencia</span>
        </div>

        <section className="space-y-2 pb-6 pt-6 text-center">
          <h1 className="text-[28px] font-semibold leading-tight tracking-[-0.02em] text-white">
            Reset your <span className="text-emphasis">password</span>
          </h1>
          <p className="mx-auto max-w-[280px] text-[14px] leading-snug text-white/50">
            Enter your email and we&rsquo;ll send reset instructions if it matches.
          </p>
        </section>

        <section className="space-y-3">
          <GlassPillInput icon={<Mail className="h-4 w-4" />} placeholder="Email address" value="amira@example.com" focused />
          <BtnPrimary>Send reset link</BtnPrimary>
          <p className="px-1 text-center text-[11px] leading-relaxed text-white/35">
            A failed request keeps your entry intact &mdash; nothing here clears on its own.
          </p>
        </section>

        <section className="mt-8">
          <div className="flex items-center gap-3">
            <div className="h-px flex-1 bg-white/10" />
            <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-white/30">After you send it</span>
            <div className="h-px flex-1 bg-white/10" />
          </div>

          <GlassCard tone="done" className="mt-4">
            <div className="flex flex-col items-center text-center">
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-forest-green/15">
                <Check className="h-6 w-6 text-forest-green" strokeWidth={2.6} />
              </span>
              <h2 className="mt-4 text-[18px] font-semibold text-white">Check your email</h2>
              <p className="mt-2 text-[13px] tabular-nums text-white/60">Sent to a***@example.com</p>
              <p className="mt-3 max-w-[260px] text-[12px] leading-relaxed text-white/50">
                If that email matches an account, reset instructions will arrive.
              </p>

              <div className="mt-5 w-full space-y-2">
                <BtnGhost quiet className="w-full">Back to sign in</BtnGhost>
                <BtnGhost quiet className="w-full">Didn&rsquo;t receive it? Send again</BtnGhost>
              </div>

              <div className="mt-5 w-full">
                <div className="flex items-center justify-between">
                  <span className="text-[12px] text-white/45">Resend available in</span>
                  <span className="text-[13px] tabular-nums text-white/65">0:47</span>
                </div>
                <div className="mt-2">
                  <ChargeMeter ticks={12} filled={6} label="0 minutes 47 seconds until resend" />
                </div>
              </div>
              <div className="mt-3">
                <Provenance items={['You entered', 'System cooldown']} />
              </div>
            </div>
          </GlassCard>
        </section>
      </main>
    </HifiShell>
  )
}
