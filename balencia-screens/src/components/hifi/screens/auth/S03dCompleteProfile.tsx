import { Calendar, ChevronRight, Users } from 'lucide-react'
import {
  BtnGhost,
  BtnPrimary,
  Chip,
  CIAInsightCard,
  ConsentRail,
  GlassPillInput,
  HifiShell,
  ProgressBar,
} from '@/components/hifi/kit'

// Social-auth data-gap step (no live route). Chosen state: Default — date of
// birth and gender are honest-null (no picker selection made yet, never a
// guessed value), first name arrives prefilled from the Google callback
// (provenance chip), last name stays an empty optional field with no
// fabricated provenance, and save is enabled at 1-of-2 readiness. Skeleton /
// offline / error / success are transient in-flight states, not this static
// frame's chosen moment. No TopBar by design — the mark stays quiet and
// card-free above the command surface.
export function S03dCompleteProfile() {
  return (
    <HifiShell atmosphere="cia" showTabBar={false}>
      <main className="flex flex-col px-5 pb-6 pt-4">
        <div className="text-center">
          <span className="text-[13px] font-medium uppercase tracking-[0.2em] text-white/45">Balencia</span>
        </div>

        <section className="space-y-2 pb-6 pt-6 text-center">
          <h1 className="text-[28px] font-semibold leading-tight tracking-[-0.02em] text-white">
            A few more details
          </h1>
          <p className="text-[14px] leading-snug text-white/50">These help CIA personalize safely.</p>
        </section>

        <CIAInsightCard provenance={['Profile data', 'You entered']}>
          <p>
            CIA will use these only for age-aware and <span className="text-emphasis">profile</span>-aware care.
          </p>
        </CIAInsightCard>

        <section className="mt-5 space-y-3">
          <div className="flex min-h-14 items-center justify-between rounded-2xl border border-white/10 bg-white/[0.04] px-4">
            <div className="flex items-center gap-3">
              <Calendar className="h-4 w-4 shrink-0 text-white/40" strokeWidth={1.8} />
              <div className="flex flex-col">
                <span className="text-[11px] font-medium uppercase tracking-wide text-white/40">Date of birth</span>
                <span className="text-[15px] text-white/45">Not provided yet</span>
              </div>
            </div>
            <ChevronRight className="h-4 w-4 shrink-0 text-white/30" />
          </div>

          <div className="flex min-h-14 items-center justify-between rounded-2xl border border-white/10 bg-white/[0.04] px-4">
            <div className="flex items-center gap-3">
              <Users className="h-4 w-4 shrink-0 text-white/40" strokeWidth={1.8} />
              <div className="flex flex-col">
                <span className="text-[11px] font-medium uppercase tracking-wide text-white/40">Gender</span>
                <span className="text-[15px] text-white/45">Prefer not to say</span>
              </div>
            </div>
            <ChevronRight className="h-4 w-4 shrink-0 text-white/30" />
          </div>

          <div className="flex gap-3">
            <div className="flex-1">
              <GlassPillInput placeholder="First name" value="Amira" />
              <div className="mt-1.5 pl-1">
                <Chip>From Google</Chip>
              </div>
            </div>
            <div className="flex-1">
              <GlassPillInput placeholder="Last name" />
              <p className="mt-1.5 pl-1 text-[11px] text-white/35">Optional</p>
            </div>
          </div>
        </section>

        <section className="mt-6 space-y-2">
          <div className="flex items-center justify-between text-[11px] font-semibold uppercase tracking-wide text-white/45">
            <span>Profile readiness</span>
            <span className="tabular-nums text-white/70">1 of 2</span>
          </div>
          <ProgressBar value={50} />
        </section>

        <section className="mt-6 rounded-2xl border border-white/10 bg-white/[0.03] p-4">
          <div className="flex items-start gap-3">
            <span aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 rounded-[4px] border border-white/25" />
            <p className="text-[12px] leading-relaxed text-white/60">
              I consent to Balencia processing my profile data for personalization and identity.
            </p>
          </div>
          <div className="pl-7">
            <ConsentRail compact />
          </div>
        </section>

        <div className="mt-6 space-y-3">
          <BtnPrimary>Save details</BtnPrimary>
          <div className="flex justify-center">
            <BtnGhost quiet>Skip for now</BtnGhost>
          </div>
        </div>
      </main>
    </HifiShell>
  )
}
