import { ChevronLeft, Eye, Fingerprint, Lock, Mail, ShieldCheck } from 'lucide-react'
import {
  BtnGhost,
  BtnPrimary,
  BtnSecondary,
  Chip,
  GlassCard,
  GlassPillInput,
  HifiShell,
  IconButton,
} from '@/components/hifi/kit'

// Returning-user sign-in. Chosen state: filled/valid email + password, "Sign
// in" enabled with its glow-you halo (the ready-to-submit moment). Biometric
// quick-auth is separately rate-limited (429) — its own honest-null numeric
// invariant on an otherwise metric-free screen — while password sign-in
// stays fully available. TopBar is composed locally (IconButton, no title)
// because the spec calls for a chevron with no title text, which the shared
// TopBar's required title prop can't express without an empty heading.
export function S04SignIn() {
  return (
    <HifiShell
      atmosphere="you"
      showTabBar={false}
      header={
        <div className="flex h-11 items-center px-2 pt-2">
          <IconButton label="Return to welcome screen">
            <ChevronLeft className="h-5 w-5" strokeWidth={1.9} />
          </IconButton>
        </div>
      }
    >
      <main className="flex min-h-full flex-col px-5 pb-6">
        <div className="flex justify-center pb-3">
          <div className="glass-pill flex items-center gap-2 px-4 py-2">
            <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-white/35" />
            <span className="text-[12px] text-white/55">You&rsquo;re offline &mdash; we&rsquo;ll sync when back.</span>
          </div>
        </div>

        <div className="text-center">
          <span className="text-[13px] font-medium uppercase tracking-[0.2em] text-white/45">Balencia</span>
        </div>

        <section className="pb-6 pt-6 text-center">
          <h1 className="text-[24px] leading-[1.3] text-white/90">
            Welcome back. Let&rsquo;s pick up your <span className="text-emphasis">momentum</span>.
          </h1>
        </section>

        <GlassCard tone="you">
          <div className="space-y-3">
            <GlassPillInput icon={<Mail className="h-4 w-4" />} placeholder="Email address" value="amira@example.com" />
            <GlassPillInput
              icon={<Lock className="h-4 w-4" />}
              placeholder="Password"
              value="&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;"
              trailing={
                <span
                  aria-label="Show password"
                  className="flex h-11 min-h-11 w-11 min-w-11 items-center justify-center text-white/45"
                >
                  <Eye className="h-4 w-4" strokeWidth={1.9} />
                </span>
              }
            />
          </div>

          <div className="mt-4 flex items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <span
                role="switch"
                aria-checked={false}
                aria-label="Remember me"
                className="relative flex h-6 w-11 shrink-0 items-center rounded-pill border border-white/15 bg-white/[0.06] px-[3px]"
              >
                <span aria-hidden="true" className="h-4 w-4 rounded-full bg-white/40" />
              </span>
              <span className="text-[14px] text-white/80">Remember me</span>
            </div>
            <BtnGhost>Forgot password?</BtnGhost>
          </div>

          <p className="mt-3 text-[11px] leading-relaxed text-white/55">
            Keeps you signed in for 30 days. Revoke anytime in settings.
          </p>

          <div className="mt-5">
            <BtnPrimary>Sign in</BtnPrimary>
          </div>
        </GlassCard>

        <div className="flex items-center gap-4 py-6">
          <div className="h-px flex-1 bg-white/10" />
          <span className="text-[11px] font-medium uppercase tracking-[0.14em] text-white/40">Or continue with</span>
          <div className="h-px flex-1 bg-white/10" />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <BtnSecondary>Google</BtnSecondary>
          <BtnSecondary>Apple</BtnSecondary>
        </div>

        <div className="mt-6 flex flex-col items-center gap-2">
          <span
            aria-label="Sign in with Face ID, unavailable during cooldown"
            className="glass-pill flex h-14 w-14 items-center justify-center text-white/30 opacity-40"
          >
            <Fingerprint className="h-5 w-5" strokeWidth={1.8} />
          </span>
          <div className="glass-pill flex items-center gap-2 px-3 py-1.5">
            <span className="text-[12px] tabular-nums text-white/60">Retry in 4:32</span>
            <Chip>System rate-limit</Chip>
          </div>
        </div>

        <div className="mt-7 flex justify-center">
          <span className="inline-flex min-h-11 items-center gap-1.5 px-2 text-[12px] text-white/55">
            <ShieldCheck className="h-3.5 w-3.5" strokeWidth={1.8} />
            Support and safety resources
          </span>
        </div>

        <div className="mt-auto pt-6 text-center text-[13px] text-white/55">
          Don&rsquo;t have an account? <span className="font-semibold text-brand-orange">Sign up</span>
        </div>
      </main>
    </HifiShell>
  )
}
