import { Check, ChevronRight } from 'lucide-react'
import { BtnPrimary, GlassCard, HifiShell, SectionTitle, SolidCard, cx } from '@/components/hifi/kit'

// Pre-auth legal gate, rendered in its honest cold-start default — both
// required consents unchecked, optional marketing toggle off, CTA disabled
// until both boxes are ticked. Pre-checked legal consent is a dark pattern,
// so the canonical static frame never shows a pre-accepted gate. The
// gate-ready, offline (CTA relabeled, OfflineBanner), and document-sheet
// states reuse catalog pieces per the source spec and aren't re-rendered here.
export function S03cConsent() {
  return (
    <HifiShell showTabBar={false} bottomAction={<BtnPrimary disabled>Continue</BtnPrimary>}>
      <main className="flex flex-col items-center px-6 pb-4 pt-6 text-center">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/logos/Balencia white PNG.png" alt="Balencia." className="h-9 w-auto" />

        <div className="mt-6 space-y-2">
          <h1 className="text-[32px] font-semibold leading-[1.1] tracking-[-0.02em] text-white">
            Before we <span className="text-emphasis">begin</span>
          </h1>
          <p className="text-[15px] leading-snug text-white/55">Review and accept our policies to continue</p>
        </div>

        <div className="mt-8 w-full space-y-2 text-left">
          <SectionTitle title="Required" />
          <SolidCard>
            <ConsentRow label="I accept the Terms of Service" />
            <div className="-mx-4 my-1 h-px bg-white/[0.06]" />
            <ConsentRow label="I accept the Privacy Policy" />
          </SolidCard>
        </div>

        <div className="mt-5 w-full space-y-2 text-left">
          <SectionTitle title="Optional" />
          <GlassCard tone="you" className="flex items-center justify-between gap-3">
            <span className="text-[15px] text-white">Send me tips and updates</span>
            <Toggle />
          </GlassCard>
        </div>

        <p className="mt-6 text-[15px] tabular-nums text-white/45">0 of 2 required</p>
      </main>
    </HifiShell>
  )
}

// NEW: ConsentCheckbox, folded into ConsentRow — a checkbox reads as "I
// attest," distinct from Toggle's "I prefer," which matters on a legal gate.
function ConsentRow({ label, checked }: { label: string; checked?: boolean }) {
  return (
    <div role="checkbox" aria-checked={checked} aria-label={label} tabIndex={0} className="flex min-h-14 items-center gap-3 px-2">
      <span
        aria-hidden="true"
        className={cx(
          'flex h-6 w-6 shrink-0 items-center justify-center rounded-[6px]',
          checked ? 'bg-brand-orange shadow-[var(--glow-orange-sm)]' : 'border border-white/20',
        )}
      >
        {checked && <Check className="h-4 w-4 text-paper-50" strokeWidth={3} />}
      </span>
      <span className="min-w-0 flex-1 text-left text-[15px] text-white underline decoration-white/15 underline-offset-4">{label}</span>
      <ChevronRight className="h-5 w-5 shrink-0 text-white/35" aria-hidden="true" />
    </div>
  )
}

function Toggle({ on }: { on?: boolean }) {
  return (
    <span
      role="switch"
      aria-checked={on ?? false}
      aria-label="Marketing updates"
      tabIndex={0}
      className="flex min-h-11 w-[52px] shrink-0 items-center"
    >
      <span
        aria-hidden="true"
        className={cx(
          'relative flex h-8 w-[52px] items-center rounded-pill p-1',
          on ? 'bg-brand-orange shadow-[var(--glow-orange-sm)]' : 'bg-white/10',
        )}
      >
        <span className={cx('h-6 w-6 rounded-full bg-paper-50 transition-transform', on ? 'translate-x-5' : 'translate-x-0')} />
      </span>
    </span>
  )
}
