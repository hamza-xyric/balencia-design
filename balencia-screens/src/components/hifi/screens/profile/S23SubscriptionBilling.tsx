import { CreditCard, Download, FileText, Minus, Plus, ShieldCheck, Sparkles } from 'lucide-react'
import {
  BtnSecondary,
  ChargeMeter,
  Chip,
  ComplianceFooter,
  ConsentRail,
  GlassCard,
  HifiShell,
  Provenance,
  SectionTitle,
  SolidCard,
  TopBar,
} from '@/components/hifi/kit'

export function S23SubscriptionBilling() {
  return (
    <HifiShell
      header={<TopBar title="Subscription & billing" back />}
      activeTab="me"
    >
      <main className="space-y-5 px-4 pb-6 pt-3">
        {/* Payment warning — visible grace, no false urgency */}
        <div className="flex min-h-11 items-center gap-3 rounded-2xl border border-brand-orange/40 bg-brand-orange/10 px-4 py-3 shadow-[var(--glow-orange-sm)]">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-orange/20 text-brand-orange">
            <ShieldCheck size={18} />
          </div>
          <div className="flex-1">
            <p className="text-[15px] font-medium leading-tight text-white">Payment failed — 3 days to update</p>
            <p className="text-[12px] leading-tight text-white/55">Update your payment method to keep your plan active.</p>
          </div>
          <button
            type="button"
            className="flex h-9 shrink-0 items-center rounded-full bg-brand-orange px-3 text-[12px] font-semibold text-ink-900"
          >
            Update
          </button>
        </div>

        {/* Focal plan card */}
        <GlassCard tone="you">
          <div className="p-5">
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-[22px] font-semibold tracking-tight text-white">Pro</h2>
                  <Chip tone="you">Current</Chip>
                </div>
                <p className="mt-1 text-[13px] text-white/60">
                  <span className="text-[22px] font-semibold tabular-nums text-white">$60</span>/mo · renews Jun 15, 2026
                </p>
              </div>
              <Sparkles size={22} className="text-brand-orange" />
            </div>

            <div className="mt-5">
              <div className="mb-2 flex items-end justify-between">
                <p className="text-[12px] font-medium uppercase tracking-wide text-white/55">CIA message use</p>
                <p className="text-[13px] tabular-nums text-white/70">
                  800 <span className="text-white/45">Of 1,000</span>
                </p>
              </div>
              <ChargeMeter filled={80} ticks={10} label="Renews Jun 15, 2026" />
              <div className="mt-3">
                <Provenance items={['Via usage API']} />
              </div>
            </div>

            <div className="mt-5 flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3">
              <div>
                <p className="text-[12px] uppercase tracking-wide text-white/50">Credits balance</p>
                <p className="text-[24px] font-semibold tabular-nums text-white">420</p>
              </div>
              <div className="flex gap-2">
                <button
                  type="button"
                  aria-label="Buy credits"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-white/[0.05] text-white/80"
                >
                  <Plus size={16} />
                </button>
                <button
                  type="button"
                  aria-label="Credits ledger"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-white/[0.05] text-white/80"
                >
                  <FileText size={16} />
                </button>
              </div>
            </div>
          </div>
        </GlassCard>

        {/* Plan tier rail */}
        <div>
          <SectionTitle title="Plans" meta="Swipe to compare" />
          <div className="-mx-4 flex gap-3 overflow-x-auto px-4 pb-1 hide-scrollbar">
            {[
              { name: 'Free', price: '$0', active: false, tone: 'muted' as const },
              { name: 'Plus', price: '$25', active: false, tone: 'muted' as const },
              { name: 'Pro', price: '$60', active: true, tone: 'you' as const },
              { name: 'Max', price: '$120', active: false, tone: 'cia' as const },
            ].map((plan) => (
              <SolidCard key={plan.name} className="min-w-[110px] flex-1 px-4 py-3">
                <div className="mb-2 flex items-center justify-between">
                  <p className="text-[13px] font-semibold text-white">{plan.name}</p>
                  {plan.active && <span className="h-2 w-2 rounded-full bg-brand-orange" />}
                </div>
                <p className="text-[18px] font-semibold tabular-nums text-white/90">{plan.price}</p>
                <p className="text-[11px] text-white/45">Per month</p>
                <div className="mt-3">
                  <Chip tone={plan.tone}>{plan.active ? 'Current' : 'View'}</Chip>
                </div>
              </SolidCard>
            ))}
          </div>
        </div>

        {/* Compare plans grid */}
        <div>
          <SectionTitle title="Compare plans" meta="Included entitlements" />
          <SolidCard className="overflow-hidden">
            <div className="grid grid-cols-[1.4fr_1fr_1fr] items-center gap-2 border-b border-white/10 px-4 py-3">
              <p className="text-[11px] uppercase tracking-wide text-white/45">Feature</p>
              <p className="text-center text-[11px] uppercase tracking-wide text-white/45">Current</p>
              <p className="text-center text-[11px] uppercase tracking-wide text-royal-purple">Recommended</p>
            </div>
            {[
              { f: 'CIA coaching', cur: true, rec: true },
              { f: 'Voice calls', cur: false, rec: true },
              { f: 'Mission builder', cur: true, rec: true },
              { f: 'Unlimited journals', cur: true, rec: true },
            ].map((row, i) => (
              <div
                key={row.f}
                className={`grid grid-cols-[1.4fr_1fr_1fr] items-center gap-2 px-4 py-3 ${
                  i % 2 === 0 ? 'bg-white/[0.02]' : ''
                }`}
              >
                <p className="text-[13px] text-white/85">{row.f}</p>
                <div className="flex justify-center">
                  {row.cur ? (
                    <Plus size={14} className="text-forest-green" />
                  ) : (
                    <Minus size={14} className="text-white/30" />
                  )}
                </div>
                <div className="flex justify-center">
                  {row.rec ? (
                    <Plus size={14} className="text-forest-green" />
                  ) : (
                    <Minus size={14} className="text-white/30" />
                  )}
                </div>
              </div>
            ))}
            <div className="px-4 py-3">
              <Provenance items={['Via tier matrix']} />
            </div>
          </SolidCard>
        </div>

        {/* Credits ledger */}
        <div>
          <SectionTitle title="Credits ledger" meta="Grants and usage" />
          <SolidCard className="divide-y divide-white/5">
            <div className="flex min-h-11 items-center justify-between px-4 py-3">
              <div>
                <p className="text-[13px] text-white/90">Monthly grant</p>
                <p className="text-[11px] text-white/45">Expires Aug 1, 2026</p>
              </div>
              <p className="text-[14px] font-semibold tabular-nums text-forest-green">+500</p>
            </div>
            <div className="flex min-h-11 items-center justify-between px-4 py-3">
              <div>
                <p className="text-[13px] text-white/90">Voice call</p>
                <p className="text-[11px] text-white/45">Via usage</p>
              </div>
              <p className="text-[14px] font-semibold tabular-nums text-brand-orange">-80</p>
            </div>
            <div className="flex min-h-11 items-center justify-between px-4 py-3">
              <div>
                <p className="text-[13px] text-white/90">CIA synthesis query</p>
                <p className="text-[11px] text-white/45">Via usage</p>
              </div>
              <p className="text-[14px] font-semibold tabular-nums text-brand-orange">-12</p>
            </div>
          </SolidCard>
        </div>

        {/* Payment method and history */}
        <div>
          <SectionTitle title="Billing" />
          <SolidCard className="divide-y divide-white/5">
            <button type="button" className="flex min-h-11 w-full items-center justify-between px-4 py-3 text-left">
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-12 items-center justify-center rounded-md border border-white/10 bg-white/[0.04]">
                  <CreditCard size={16} className="text-white/70" />
                </div>
                <div>
                  <p className="text-[13px] text-white/90">Visa ending 4242</p>
                  <p className="text-[11px] text-white/45">Default payment method</p>
                </div>
              </div>
              <span className="text-[12px] text-white/50">Edit</span>
            </button>
            <button type="button" className="flex min-h-11 w-full items-center justify-between px-4 py-3 text-left">
              <div className="flex items-center gap-3">
                <Download size={16} className="text-white/60" />
                <p className="text-[13px] text-white/90">Billing history</p>
              </div>
              <span className="text-[12px] text-white/50">Receipts</span>
            </button>
          </SolidCard>
        </div>

        {/* Plan controls — no dark patterns */}
        <div className="space-y-3">
          <BtnSecondary>Downgrade plan</BtnSecondary>
          <div className="flex justify-center">
            <button
              type="button"
              className="min-h-11 px-4 text-[13px] font-medium text-white/45 underline decoration-white/20 underline-offset-4 hover:text-white/70"
            >
              Cancel subscription
            </button>
          </div>
        </div>

        {/* Consent and footer */}
        <div className="space-y-3 pt-1">
          <ConsentRail />
          <ComplianceFooter />
        </div>
      </main>
    </HifiShell>
  )
}