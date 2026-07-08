import { Eye, Lock, Mail } from 'lucide-react'
import {
  BtnGhost,
  BtnPrimary,
  BtnSecondary,
  ComplianceFooter,
  GlassPillInput,
  HifiShell,
  MomentumBar,
  Provenance,
  TopBar,
} from '@/components/hifi/kit'

// Pre-auth sign-up. Smallest source form (email + password) rendered in the
// TYPED state per founder directive: full momentum bar, enabled CTA. The
// connects promise stays a single future-tense caption line — no pill row,
// no provenance — because no domain history exists yet to synthesize.
export function S03WelcomeSignUp() {
  return (
    <HifiShell header={<TopBar title="Balencia" back={false} />} showTabBar={false} atmosphere="cia">
      <main className="flex flex-col px-5 pb-6 pt-6">
        <section className="space-y-3 pb-7 pt-4 text-center">
          <h1 className="text-[34px] font-semibold leading-[1.1] tracking-[-0.02em] text-white">
            Create your account with <span className="text-emphasis">CIA</span>.
          </h1>
          <p className="text-pretty text-[15px] leading-snug text-white/50">
            CIA connects your life once there is enough history.
          </p>
        </section>

        <section className="space-y-3">
          <GlassPillInput icon={<Mail className="h-4 w-4" />} placeholder="Email address" value="amira@example.com" />

          <div className="space-y-2">
            <GlassPillInput
              icon={<Lock className="h-4 w-4" />}
              placeholder="Password"
              value="••••••••••••"
              trailing={
                <span
                  aria-label="Show password"
                  className="flex h-11 min-h-11 min-w-11 items-center justify-center gap-1 px-1 text-[13px] font-medium text-white/55"
                >
                  <Eye className="h-4 w-4" strokeWidth={1.9} />
                  <span aria-hidden="true">Show</span>
                </span>
              }
            />
            <div className="flex items-center justify-between gap-3 pt-1">
              <div className="flex-1">
                <MomentumBar value={100} label="Meets 4 of 4 rules" />
              </div>
              <Provenance items={['Typed live']} />
            </div>
          </div>

          <div className="pt-2">
            <BtnPrimary>Sign up</BtnPrimary>
          </div>
        </section>

        <div className="flex items-center gap-4 py-7">
          <div className="h-px flex-1 bg-white/10" />
          <span className="text-[11px] font-medium uppercase tracking-[0.14em] text-white/40">Or continue with</span>
          <div className="h-px flex-1 bg-white/10" />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <BtnSecondary>Google</BtnSecondary>
          <BtnSecondary>Apple</BtnSecondary>
        </div>

        <div className="flex flex-col items-center gap-1 pt-7">
          <p className="text-[13px] text-white/50">Already have an account?</p>
          <BtnGhost>Sign in</BtnGhost>
          <BtnGhost quiet>Try without an account</BtnGhost>
        </div>

        <ComplianceFooter />
      </main>
    </HifiShell>
  )
}
