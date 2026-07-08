import { Lock, BarChart3, Check } from 'lucide-react'
import {
  BtnPrimary,
  Chip,
  GlassCard,
  HifiShell,
  Provenance,
  SolidCard,
  TopBar,
  ConsentRail
} from '@/components/hifi/kit'

export function S43Paywall() {
  return (
    <HifiShell
      header={
        <TopBar
          title="Upgrade"
          eyebrow="Balencia Plus"
          back
          right={<button type="button" aria-label="Close" className="grid h-11 w-11 place-items-center rounded-full text-white/60 transition-colors hover:text-white/90"><Lock className="h-5 w-5" /></button>}
        />
      }
      atmosphere="cia"
      showTabBar={false}
    >
      <main className="space-y-4 px-4 pb-4 pt-3">
        <section className="space-y-2 pt-2 text-center">
          <p className="text-[13px] uppercase tracking-[0.18em] text-white/45">Balencia Plus</p>
          <h1 className="text-2xl leading-tight text-white">
            Unlock CIA&apos;s <span className="text-emphasis">intelligence</span>
          </h1>
          <p className="mx-auto max-w-[320px] text-[15px] leading-snug text-white/60">
            Projected reads, weekly mission models, and deeper trends across your Amira persona.
          </p>
        </section>

        <GlassCard tone="cia" className="overflow-hidden">
          <div
            aria-hidden="true"
            className="relative h-[180px] scale-[1.02] select-none overflow-hidden rounded-2xl opacity-80 blur-[20px]"
          >
            <div className="absolute inset-0 flex flex-col justify-between p-4">
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <div className="h-3 w-24 rounded-full bg-white/30" />
                  <div className="h-5 w-40 rounded-full bg-white/20" />
                  <div className="h-3 w-32 rounded-full bg-white/10" />
                </div>
                <div className="h-12 w-12 rounded-full bg-white/15" />
              </div>
              <div className="flex items-end gap-2">
                <div className="h-12 flex-1 rounded-t-lg bg-white/10" />
                <div className="h-20 flex-1 rounded-t-lg bg-white/20" />
                <div className="h-16 flex-1 rounded-t-lg bg-white/10" />
                <div className="h-24 flex-1 rounded-t-lg bg-white/20" />
              </div>
            </div>
          </div>
          <div className="pointer-events-none absolute inset-0 grid place-items-center">
            <div className="flex flex-col items-center gap-2 text-center">
              <div className="grid h-11 w-11 place-items-center rounded-full border border-white/10 bg-ink-900 text-royal-purple">
                <Lock className="h-5 w-5" />
              </div>
              <p className="text-[15px] font-medium text-white">Premium preview</p>
              <p className="text-[13px] text-white/45">Upgrade to reveal the full mission read</p>
            </div>
          </div>
        </GlassCard>

        <SolidCard className="space-y-3 p-4">
          <div className="grid grid-cols-3 items-center gap-3">
            <div className="text-[13px] font-medium uppercase tracking-wide text-white/45">Free</div>
            <div className="text-[13px] font-medium uppercase tracking-wide text-royal-purple">
              <span className="flex items-center gap-1.5"><BarChart3 className="h-4 w-4" /> Plus</span>
            </div>
            <div className="text-[13px] font-medium uppercase tracking-wide text-white/45">Pro</div>
          </div>
          <div className="h-px w-full bg-white/10" />
          {[
            { label: 'Active missions', values: ['2', 'Unlimited', 'Unlimited'] },
            { label: 'Weekly insight', values: ['Basic', 'Projected', 'Projected+'] },
            { label: 'Mission models', values: [null, 'Included', 'Included'] }
          ].map((row) => (
            <div key={row.label} className="grid grid-cols-3 items-center gap-3">
              <div className="text-[14px] text-white/70">{row.label}</div>
              <div className="flex justify-start">
                {row.values[1] ? (
                  <Check className="h-4 w-4 text-forest-green" />
                ) : (
                  <span className="text-[14px] text-white/30">—</span>
                )}
              </div>
              <div className="flex justify-start">
                {row.values[2] ? (
                  <Check className="h-4 w-4 text-forest-green" />
                ) : (
                  <span className="text-[14px] text-white/30">—</span>
                )}
              </div>
            </div>
          ))}
        </SolidCard>

        <div className="space-y-3 pt-1">
          <BtnPrimary>Unlock with premium</BtnPrimary>
          <div className="flex flex-col items-center gap-1.5">
            <div className="flex items-center justify-center gap-2">
              <p className="text-[14px] font-medium tabular-nums text-white">$20/mo</p>
              <Provenance items={['Via app store']} />
            </div>
            <p className="text-[13px] text-white/45">Cancel anytime. Manage from your account settings.</p>
          </div>
        </div>

        <div className="flex flex-col items-center gap-2 pt-2">
          <button type="button" className="text-[14px] font-medium text-white/70 transition-colors hover:text-white">
            Compare All Plans
          </button>
          <button type="button" className="text-[14px] font-medium text-white/45 transition-colors hover:text-white/70">
            Maybe Later
          </button>
        </div>

        <div className="space-y-3 pt-2">
          <div className="flex flex-wrap items-center justify-center gap-1.5">
            <Chip tone="muted">Category · billing</Chip>
            <Chip tone="muted">Scope · this device</Chip>
          </div>
          <ConsentRail compact />
        </div>
      </main>
    </HifiShell>
  )
}