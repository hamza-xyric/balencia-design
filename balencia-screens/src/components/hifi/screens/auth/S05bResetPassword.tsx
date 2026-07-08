import { Check, Eye, Lock, ShieldCheck } from 'lucide-react'
import {
  BtnGhost,
  BtnPrimary,
  cx,
  GlassPillInput,
  HifiShell,
  Provenance,
  SolidCard,
  TopBar,
} from '@/components/hifi/kit'

// Deep-linked reset with a verified token — the state that lets every module
// (requirement list, match check, CTA) render at full legibility, matching
// the S03 pattern of showing the "typed / valid" composition rather than the
// cold-start empty one. Invalid/expired/rate-limited/offline paths are
// documented here rather than duplicated as dead branches (no hooks/state in
// this static prototype): expired/invalid token → the quiet recovery link
// below the CTA becomes the primary action and the form locks at 40% opacity;
// rate-limited → CTA label swaps to a countdown, inputs stay enabled;
// offline → fields stay editable, submit disables, OfflineBanner sits under
// the header. Route: /auth/reset-password, /reset-password.
const requirements = [
  { label: '8+ characters', met: true },
  { label: 'Uppercase letter', met: true },
  { label: 'Lowercase letter', met: true },
  { label: 'Number', met: true },
  { label: 'Special character', met: true },
]

// NEW: five deterministic rule rows, icon + label + met state. Rows crossfade
// unmet → met in 160ms while typing (kit has no equivalent list primitive).
function PasswordRequirementList() {
  return (
    <div role="list" className="space-y-2.5">
      {requirements.map(rule => (
        <div key={rule.label} role="listitem" className="flex items-center justify-between transition-opacity duration-150">
          <span className={cx('text-[13px]', rule.met ? 'text-white/70' : 'text-white/40')}>{rule.label}</span>
          <Check
            size={14}
            strokeWidth={2.4}
            className={rule.met ? 'text-forest-green' : 'text-white/20'}
            aria-label={rule.met ? 'Requirement met' : 'Requirement not met'}
          />
        </div>
      ))}
    </div>
  )
}

// NEW: concise token/security micro-copy + privacy link. No catalog footer
// matches this legal/auth register — ComplianceFooter is a plain link row,
// this needs a leading security assurance line as well.
function PrivacyFooter() {
  return (
    <div className="flex flex-col items-center gap-2 pt-6 text-center">
      <div className="flex items-center gap-1.5 text-[11px] text-white/55">
        <ShieldCheck size={12} strokeWidth={1.9} />
        <span>Secured · this link expires after one use</span>
      </div>
      <span className="flex min-h-11 items-center text-[12px] text-white/40">Privacy</span>
    </div>
  )
}

export function S05bResetPassword() {
  return (
    <HifiShell header={<TopBar title="Balencia" back={false} />} showTabBar={false}>
      <main className="flex flex-col items-center px-5 pb-6 pt-4 text-center">
        <section className="space-y-2">
          <h1 className="text-[34px] font-semibold leading-[1.1] tracking-[-0.02em] text-white">
            Set a new <span className="text-emphasis">password</span>
          </h1>
          <p className="text-[15px] leading-snug text-white/50">Choose something strong and unique.</p>
          <div className="flex justify-center pt-1">
            <Provenance items={['Server token']} />
          </div>
        </section>

        <section className="mt-6 w-full space-y-3 text-left">
          <GlassPillInput
            icon={<Lock className="h-4 w-4" />}
            placeholder="New password"
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
          <GlassPillInput
            icon={<Lock className="h-4 w-4" />}
            placeholder="Confirm new password"
            value="••••••••••••"
            trailing={
              <span
                aria-label="Hide password"
                className="flex h-11 min-h-11 min-w-11 items-center justify-center gap-1 px-1 text-[13px] font-medium text-white/55"
              >
                <Eye className="h-4 w-4" strokeWidth={1.9} />
                <span aria-hidden="true">Hide</span>
              </span>
            }
          />
        </section>

        <SolidCard className="mt-4 w-full text-left">
          <div className="flex items-center justify-between border-b border-white/[0.06] pb-3">
            <span className="text-[13px] font-medium text-white/60">Passwords match</span>
            <span className="flex items-center gap-1.5 text-[13px] font-medium text-forest-green">
              <Check size={14} strokeWidth={2.4} aria-hidden="true" />
              Matched
            </span>
          </div>
          <div className="pt-3">
            <PasswordRequirementList />
          </div>
          <div className="mt-3 flex items-center justify-between border-t border-white/[0.06] pt-3">
            <span className="text-[11px] uppercase tracking-[0.12em] text-white/35">Strength</span>
            <div className="flex items-center gap-2">
              <span className="text-[12px] font-semibold text-forest-green">Strong</span>
              <Provenance items={['Typed live']} />
            </div>
          </div>
        </SolidCard>

        <div className="mt-6 w-full space-y-3">
          <BtnPrimary>Reset password</BtnPrimary>
          <BtnGhost quiet>Back to sign in</BtnGhost>
        </div>

        <p className="mt-5 text-[12px] text-white/40">
          Link expired? <span className="font-semibold text-brand-orange">Request a new one</span>
        </p>

        <PrivacyFooter />
      </main>
    </HifiShell>
  )
}
