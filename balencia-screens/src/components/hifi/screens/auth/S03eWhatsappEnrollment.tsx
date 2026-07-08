import { Check, MessageCircle, Phone } from 'lucide-react'
import {
  BtnGhost,
  BtnPrimary,
  ChargeMeter,
  ConsentRail,
  GlassCard,
  GlassPillInput,
  HifiShell,
  Provenance,
  cx,
} from '@/components/hifi/kit'

// Phase 1 (phone entry) is the dominant, rendered focal moment — phase 2
// (six-digit verify) is shown beneath as a quiet, non-interactive "up next"
// preview so the OTPCluster6 pattern and its resend cooldown are legible
// without a second competing CTA. Chosen state: valid entered phone (real,
// "you entered"), send enabled; verify cells stay honest-null (no fake code).
export function S03eWhatsappEnrollment() {
  return (
    <HifiShell
      atmosphere="cia"
      showTabBar={false}
      header={
        <div className="flex h-11 items-center justify-end px-4 pt-2">
          <span className="flex min-h-11 items-center px-3 text-[13px] font-semibold uppercase tracking-wide text-white/45">
            Skip
          </span>
        </div>
      }
    >
      <main className="flex flex-col px-5 pb-6">
        <div className="flex flex-col items-center text-center">
          <span className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04]">
            <MessageCircle className="h-5 w-5 text-brand-orange" strokeWidth={1.7} />
          </span>
          <span className="mt-2 text-[13px] font-medium uppercase tracking-[0.2em] text-white/45">Balencia</span>
        </div>

        <section className="space-y-2 pb-6 pt-5 text-center">
          <h1 className="text-[26px] font-semibold leading-tight tracking-[-0.02em] text-white">
            Get CIA on WhatsApp
          </h1>
          <p className="text-[14px] leading-snug text-white/50">Reminders and check-ins in chat.</p>
        </section>

        <GlassCard tone="muted">
          <div className="flex items-start gap-3">
            <span className="mt-0.5 text-forest-green">
              <Check className="h-4 w-4" strokeWidth={2.2} />
            </span>
            <div className="min-w-0 flex-1">
              <h2 className="text-[14px] font-semibold text-white">Message consent</h2>
              <p className="mt-1 text-[13px] leading-relaxed text-white/55">
                Turn off WhatsApp <span className="text-emphasis">enrollment</span> anytime in settings, or reply STOP.
              </p>
            </div>
          </div>
          <div className="mt-3 border-t border-white/10 pt-3">
            <ConsentRail compact />
          </div>
        </GlassCard>

        <section className="mt-5">
          <div className="flex items-center justify-between px-1 pb-2">
            <span className="text-[11px] font-semibold uppercase tracking-wide text-white/45">Phone number</span>
            <Provenance items={['You entered']} />
          </div>
          <div className="flex items-center gap-2">
            <span
              aria-label="Country code, plus 1"
              className="flex h-[52px] w-16 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] text-[15px] font-semibold text-white"
            >
              +1
            </span>
            <div className="min-w-0 flex-1">
              <GlassPillInput icon={<Phone className="h-4 w-4" />} placeholder="Phone number" value="202 555 0143" focused />
            </div>
          </div>
          <div className="mt-3">
            <BtnPrimary>Send code</BtnPrimary>
          </div>
        </section>

        <ul className="mt-5 space-y-2.5">
          {['Daily reminders', 'Check-in prompts', 'CIA coaching tips'].map(item => (
            <li key={item} className="flex items-center gap-2.5 text-[14px] text-white/65">
              <Check className="h-4 w-4 shrink-0 text-brand-orange" strokeWidth={2.2} />
              {item}
            </li>
          ))}
        </ul>

        <section className="mt-7 space-y-2">
          <span className="px-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-white/40">
            Onboarding phase 2 of 6
          </span>
          <div className="flex items-center gap-1.5 px-1">
            {Array.from({ length: 6 }).map((_, index) => (
              <span key={index} className={cx('h-1.5 flex-1 rounded-pill', index === 1 ? 'bg-brand-orange' : 'bg-white/12')} />
            ))}
          </div>
        </section>

        <section className="mt-4 rounded-2xl border border-white/[0.06] bg-white/[0.02] p-4">
          <p className="text-[11px] font-semibold uppercase tracking-wide text-white/35">Up next: enter your code</p>
          <div className="mt-3 flex justify-between gap-1.5" role="img" aria-label="Six-digit verification code, empty">
            {Array.from({ length: 6 }).map((_, index) => (
              <span key={index} className="h-12 w-9 rounded-lg border border-white/10 bg-white/[0.03]" />
            ))}
          </div>
          <div className="mt-4 flex items-center justify-between">
            <span className="text-[12px] text-white/45">Resend available in</span>
            <span className="text-[13px] tabular-nums text-white/65">0:47</span>
          </div>
          <div className="mt-2">
            <ChargeMeter ticks={12} filled={6} label="0 minutes 47 seconds until resend" />
          </div>
          <div className="mt-3 flex items-center justify-between">
            <Provenance items={['System cooldown']} />
            <BtnGhost quiet>Resend code</BtnGhost>
          </div>
        </section>
      </main>
    </HifiShell>
  )
}
