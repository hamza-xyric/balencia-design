'use client'

import { useState } from 'react'
import { AlertCircle, CreditCard, RotateCcw } from 'lucide-react'
import { Button } from '@/components/design-system/Button'
import { Eyebrow } from '@/components/design-system/Eyebrow'
import { SegmentedControl } from '@/components/design-system/SegmentedControl'
import { Header } from '@/components/layout/Header'
import { PhoneFrame } from '@/components/layout/PhoneFrame'
import { ScreenShell } from '@/components/layout/ScreenShell'
import { SettingsGroup, SettingsRow } from '@/components/screens/SettingsRow'
import { TierCard } from '@/components/screens/TierCard'

// Screen 23 of 78: Subscription & billing
// Spec: /Users/hamza/yHealth/app_design 3/23-subscription-billing.md

const plans = [
  {
    name: 'Free',
    price: '$0',
    annualPrice: '$0',
    cadence: '/mo',
    ctaLabel: 'Downgrade',
    actionVariant: 'downgrade' as const,
    features: [
      { label: 'Journaling' },
      { label: 'Finance module' },
      { label: 'Habit tracking' },
      { label: 'Limited SIA messages' },
      { label: 'All domains unlocked', included: false },
    ],
  },
  {
    name: 'Plus',
    price: '$20',
    annualPrice: '$192',
    cadence: '/mo',
    current: true,
    ctaLabel: 'Current plan',
    features: [
      { label: 'Everything in Free' },
      { label: 'Full SIA coaching' },
      { label: 'All domains unlocked' },
      { label: 'Cross-domain insights' },
      { label: 'RPG gamification' },
    ],
  },
  {
    name: 'Pro',
    price: '$60',
    annualPrice: '$576',
    cadence: '/mo',
    recommended: true,
    ctaLabel: 'Upgrade to Pro',
    features: [
      { label: 'Everything in Plus' },
      { label: 'Advanced analytics' },
      { label: 'Higher AI limits' },
      { label: 'Real-time usage meter' },
      { label: 'Predictive insights' },
    ],
  },
  {
    name: 'Max',
    price: '$120',
    annualPrice: '$1,152',
    cadence: '/mo',
    ctaLabel: 'Upgrade to Max',
    features: [
      { label: 'Everything in Pro' },
      { label: 'Unlimited SIA' },
      { label: 'Priority processing' },
      { label: 'Family features' },
      { label: 'Team features' },
    ],
  },
]

function CurrentPlanCard() {
  return (
    <section className="rounded-xl border-2 border-brand-orange bg-ink-brown-800 p-6 shadow-1 animate-fade-up">
      <div className="flex items-start justify-between gap-4">
        <div>
          <Eyebrow className="text-white/40">Your plan</Eyebrow>
          <h1 className="mt-2 text-h2 font-semibold leading-[26px] text-white">Plus</h1>
        </div>
        <div className="text-right">
          <p className="text-[15px] leading-5 text-white/50">$20/mo</p>
          <p className="mt-1 text-[12px] leading-4 text-white/40">Renews Jun 15, 2026</p>
        </div>
      </div>

      <div className="mt-5">
        <div className="mb-2 flex items-center justify-between text-[12px] leading-4 text-white/50">
          <span>AI usage</span>
          <span>80% used</span>
        </div>
        <div className="h-1.5 overflow-hidden rounded-pill bg-white/[0.08]">
          <div className="h-full rounded-pill bg-stalled-amber" style={{ width: '80%' }} />
        </div>
      </div>
    </section>
  )
}

export default function SubscriptionScreen() {
  const [period, setPeriod] = useState('monthly')
  const [modal, setModal] = useState<string | null>(null)
  const [status, setStatus] = useState('Plus plan active. Renews Jun 15, 2026.')
  const pricedPlans = plans.map((plan) => ({
    ...plan,
    price: period === 'annual' ? plan.annualPrice : plan.price,
    cadence: period === 'annual' && plan.price !== '$0' ? '/yr' : '/mo',
    savingsLabel: period === 'annual' && plan.price !== '$0' ? 'Save 20%' : undefined,
  }))
  const finishFlow = (message: string) => {
    setStatus(message)
    setModal(null)
  }
  const selectedPlan = pricedPlans.find((plan) => plan.name === modal)
  const isPlanModal = Boolean(selectedPlan)
  const planCadence = period === 'annual' ? 'annual' : 'monthly'
  const renewalDate = period === 'annual' ? 'Jun 15, 2027' : 'Jun 15, 2026'
  const selectedPrice = selectedPlan ? `${selectedPlan.price}${selectedPlan.cadence}` : '$20/mo'
  const storeCopy = 'The App Store or Google Play sheet opens next with localized tax and proration before you approve. Balencia activates only after the store receipt syncs.'
  const chargeToday = selectedPlan?.name === 'Free'
    ? '$0.00 today. Plus stays active until Jun 15, 2026.'
    : selectedPlan
      ? `${selectedPlan.price}${selectedPlan.cadence} before taxes, with any unused Plus credit shown by the store before authorization.`
      : ''

  return (
    <PhoneFrame>
      <ScreenShell header={<Header title="Subscription & billing" showBack fallbackHref="/tabs/me" />} activeTab="me">
        <main className="px-4 pb-16 pt-2">
          <CurrentPlanCard />

          <section className="mt-8 animate-fade-up" style={{ animationDelay: '120ms' }}>
            <Eyebrow className="mb-3 px-1 text-white/50">All plans</Eyebrow>
            <SegmentedControl
              size="md"
              activeValue={period}
              options={[
                { label: 'Monthly', value: 'monthly' },
                { label: 'Annual', value: 'annual' },
              ]}
              className="min-h-11"
              onValueChange={setPeriod}
            />

            <div className="-mx-4 mt-3 overflow-x-auto px-4 pb-2 hide-scrollbar">
              <div className="flex gap-3">
                {pricedPlans.map((plan) => (
                  <TierCard key={plan.name} {...plan} onCtaClick={() => setModal(plan.name)} />
                ))}
              </div>
            </div>
          </section>

          <section className="mt-8 animate-fade-up" style={{ animationDelay: '220ms' }}>
            <Eyebrow className="mb-3 px-1 text-white/50">Billing</Eyebrow>
            <SettingsGroup>
              <SettingsRow label="Payment method" value="Visa ****4242" onClick={() => setModal('Payment method')} icon={<CreditCard size={17} />} />
              <SettingsRow label="Billing history" onClick={() => setModal('Billing history')} />
              <SettingsRow label="Restore purchases" onClick={() => setModal('Restore purchases')} icon={<RotateCcw size={17} />} />
              <SettingsRow label="Payment issue" value="Needs attention" onClick={() => setModal('Payment issue')} icon={<AlertCircle size={17} />} />
            </SettingsGroup>
          </section>

          <section className="mt-8 space-y-4 animate-fade-up" style={{ animationDelay: '320ms' }}>
            <SettingsRow label="Downgrade plan" variant="destructive" onClick={() => setModal('Free')} />
            <SettingsRow label="Cancel subscription" variant="destructive" onClick={() => setModal('Cancel subscription')} />
          </section>
          <p className="mt-4 px-1 text-[12px] leading-4 text-white/40" aria-live="polite">{status}</p>
        </main>
        {modal && (
          <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/60 px-4 pb-4" role="dialog" aria-modal="true" aria-label={modal}>
            <div className="w-full max-w-[390px] rounded-t-xl border border-white/10 bg-ink-900 p-5 shadow-2">
              <h2 className="text-[18px] font-semibold leading-6 text-white">{modal}</h2>
              {isPlanModal ? (
                <div className="mt-3 space-y-3">
                  <dl className="grid gap-2 rounded-md bg-white/[0.04] p-3 text-[13px] leading-[18px] text-white/60">
                    <div className="flex justify-between gap-3">
                      <dt>Plan</dt>
                      <dd className="text-right font-semibold text-white">{selectedPlan?.name} {planCadence}</dd>
                    </div>
                    <div className="flex justify-between gap-3">
                      <dt>Displayed price</dt>
                      <dd className="text-right font-semibold text-white">{selectedPrice}</dd>
                    </div>
                    <div className="flex justify-between gap-3">
                      <dt>Charge today</dt>
                      <dd className="max-w-[190px] text-right font-semibold text-white">{chargeToday}</dd>
                    </div>
                    <div className="flex justify-between gap-3">
                      <dt>Next renewal</dt>
                      <dd className="text-right font-semibold text-white">{selectedPlan?.name === 'Free' ? 'Off after Jun 15, 2026' : renewalDate}</dd>
                    </div>
                  </dl>
                  <p className="text-[13px] leading-[18px] text-white/55">{storeCopy}</p>
                </div>
              ) : (
                <div className="mt-3 space-y-3">
                  <p className="text-[14px] leading-5 text-white/60">
                    {modal === 'Payment method'
                      ? 'Update Visa ****4242 through the mobile store, then return here to refresh Plus monthly entitlement at $20/mo.'
                      : modal === 'Billing history'
                        ? 'Receipts are provided by the mobile store. Latest receipt: Plus monthly, $20/mo, renewed May 15, 2026, next renewal Jun 15, 2026.'
                        : modal === 'Restore purchases'
                          ? 'Restore checks the store receipt for Balencia Plus monthly at $20/mo and syncs entitlement without charging again.'
                          : modal === 'Cancel subscription'
                            ? 'Cancel Plus monthly at $20/mo through the mobile store. Access remains active until Jun 15, 2026, then renewal turns off.'
                            : 'The store could not authorize Plus monthly at $20/mo. No plan change was made, and current Plus access remains active until Jun 15, 2026.'}
                  </p>
                  {modal === 'Payment issue' && (
                    <p className="rounded-md bg-error-red/15 p-3 text-[12px] font-semibold leading-4 text-error-red" role="alert">
                      Payment failed. Update the store payment method or try restore after the receipt is available.
                    </p>
                  )}
                </div>
              )}
              <div className="mt-5 grid grid-cols-2 gap-3">
                <Button variant="ghost" onClick={() => setModal(null)}>Close</Button>
                <Button
                  variant={modal === 'Cancel subscription' || modal === 'Free' || modal === 'Payment issue' ? 'skip' : 'primary'}
                  className={modal === 'Cancel subscription' || modal === 'Free' || modal === 'Payment issue' ? 'text-error-red' : ''}
                  onClick={() => finishFlow(
                    modal === 'Restore purchases'
                      ? 'Purchases restored. Plus monthly $20/mo is active and renews Jun 15, 2026.'
                      : modal === 'Cancel subscription'
                        ? 'Cancellation handoff opened. Plus monthly remains active until Jun 15, 2026; renewal will turn off in the store.'
                        : modal === 'Free'
                          ? 'Downgrade scheduled. Free starts after Jun 15, 2026; no charge today.'
                          : modal === 'Payment issue'
                            ? 'Payment issue acknowledged. Plus monthly remains active; no new charge was made.'
                            : selectedPlan
                              ? `${selectedPlan.name} ${planCadence} selected at ${selectedPrice}. Store handoff opens before entitlement changes.`
                              : `${modal} flow completed. Entitlement refresh remains tied to the mobile store receipt.`
                  )}
                >
                  {modal === 'Cancel subscription' ? 'Continue' : modal === 'Free' ? 'Schedule' : modal === 'Payment issue' ? 'Done' : 'Confirm'}
                </Button>
              </div>
            </div>
          </div>
        )}
      </ScreenShell>
    </PhoneFrame>
  )
}
