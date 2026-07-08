import { ChevronRight, FileText, Lock, MoreHorizontal, ShieldCheck } from 'lucide-react'
import {
  BtnPrimary,
  BtnSecondary,
  ConsentRail,
  GlassCard,
  HifiShell,
  IconButton,
  Provenance,
  ProgressBar,
  SectionTitle,
  SolidCard,
  TopBar,
} from '@/components/hifi/kit'

export function S82AccountabilityContract() {
  return (
    <HifiShell
      header={
        <TopBar
          title="Accountability Contract"
          back
          right={
            <IconButton label="View Terms And History">
              <MoreHorizontal className="h-5 w-5" />
            </IconButton>
          }
        />
      }
      showTabBar={false}
      atmosphere="you"
    >
      <main className="space-y-4 px-4 pb-32 pt-3">
        <GlassCard tone="you">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-medium uppercase tracking-[0.18em] text-brand-orange">
              Active Contract
            </span>
            <ShieldCheck className="h-4 w-4 text-brand-orange" />
          </div>
          <p className="mt-3 text-[22px] font-semibold leading-tight text-white">
            Half marathon consistency <span className="text-emphasis">contract</span>
          </p>
          <p className="mt-1 text-[13px] text-white/55">
            Bound to mission: Run a half marathon
          </p>

          <div className="mt-4 flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-brand-orange/30 bg-brand-orange/10 px-2.5 py-1 text-[11px] font-medium text-brand-orange">
              <span className="h-1.5 w-1.5 rounded-full bg-brand-orange" /> Signed
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 text-[11px] font-medium text-white/70">
              4 Weeks Left
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 text-[11px] font-medium text-white/70">
              2 Partners
            </span>
          </div>

          <div className="mt-4">
            <Provenance items={['Signed by Amira · Lv 12', 'Signed by Aisha Khan']} />
          </div>
        </GlassCard>

        <section>
          <SectionTitle title="Verification Checks" meta="5 Of 6" />
          <div className="mt-2">
            <ProgressBar value={83} tone="you" />
            <div className="mt-2 flex justify-between text-[11px] text-white/45">
              <span>Proof progress</span>
              <span className="tabular-nums">83%</span>
            </div>
          </div>

          <div className="mt-3 space-y-2">
            <SolidCard>
              <div className="flex min-h-11 items-center gap-3">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-forest-green/15 text-forest-green">
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </span>
                <div className="flex-1">
                  <p className="text-[14px] font-medium text-white">Morning run proof</p>
                  <p className="mt-0.5 text-[11px] text-white/45">Photo confirmed via check-in</p>
                </div>
                <span className="text-[11px] font-medium text-forest-green">Done</span>
              </div>
              <div className="mt-2 border-t border-white/5 pt-2">
                <Provenance items={['Source: Photo check-in', 'Confirmed by Aisha Khan']} />
              </div>
            </SolidCard>

            <SolidCard>
              <div className="flex min-h-11 items-center gap-3">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand-orange/15 text-brand-orange">
                  <span className="h-2 w-2 rounded-full bg-brand-orange" />
                </span>
                <div className="flex-1">
                  <p className="text-[14px] font-medium text-white">Weekly review</p>
                  <p className="mt-0.5 text-[11px] text-white/45">Due Sunday evening</p>
                </div>
                <span className="text-[11px] font-medium text-brand-orange">Due</span>
              </div>
            </SolidCard>
          </div>
        </section>

        <SolidCard>
          <div className="flex min-h-11 items-center gap-3">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-royal-purple/15 text-royal-purple">
              <Lock className="h-4 w-4" />
            </span>
            <div className="flex-1">
              <p className="text-[14px] font-medium text-white">Partners And Witnesses</p>
              <p className="mt-0.5 text-[12px] leading-snug text-white/55">
                Aisha Khan can see proof status. Private journal notes stay off.
              </p>
            </div>
          </div>
          <div className="mt-3 border-t border-white/5 pt-3">
            <div className="flex items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-[12px] font-semibold text-white/80">
                AK
              </span>
              <div className="flex-1">
                <p className="text-[13px] font-medium text-white">Aisha Khan</p>
                <p className="text-[11px] text-white/45">Partner · Consent given</p>
              </div>
              <span className="rounded-full border border-forest-green/30 bg-forest-green/10 px-2 py-0.5 text-[10px] font-medium text-forest-green">
                Verified
              </span>
            </div>
            <div className="mt-3">
              <span className="text-[11px] font-medium uppercase tracking-[0.18em] text-white/40">
                Both parties consent state
              </span>
              <div className="mt-2 flex flex-wrap gap-2">
                <span className="rounded-md border border-white/10 bg-white/[0.03] px-2 py-1 text-[11px] text-white/70">
                  Amira · Consented
                </span>
                <span className="rounded-md border border-white/10 bg-white/[0.03] px-2 py-1 text-[11px] text-white/70">
                  Aisha · Consented
                </span>
              </div>
            </div>
          </div>
        </SolidCard>

        <section>
          <SectionTitle title="Consent Controls" />
          <div className="mt-2">
            <ConsentRail />
          </div>
        </section>

        <SolidCard>
          <div className="flex min-h-11 items-center gap-3">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/[0.06] text-white/60">
              <FileText className="h-4 w-4" />
            </span>
            <div className="flex-1">
              <p className="text-[14px] font-medium text-white">Terms Visible</p>
              <p className="mt-0.5 text-[11px] text-white/45">Shared commitment and proof scope</p>
            </div>
            <ChevronRight className="h-4 w-4 text-white/40" />
          </div>
        </SolidCard>

        <section className="space-y-2">
          <BtnSecondary>Pause contract</BtnSecondary>
          <BtnSecondary>Revoke sharing</BtnSecondary>
          <BtnSecondary>Exit contract</BtnSecondary>
        </section>
      </main>

      <div className="fixed inset-x-0 bottom-0 z-20 border-t border-white/10 bg-ink-900/80 px-4 pb-5 pt-3 backdrop-blur-xl">
        <BtnPrimary>Sign update</BtnPrimary>
      </div>
    </HifiShell>
  )
}