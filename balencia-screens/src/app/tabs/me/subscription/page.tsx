import { CreditCard, RotateCcw } from 'lucide-react'
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
  return (
    <PhoneFrame>
      <ScreenShell header={<Header title="Subscription & billing" showBack />} activeTab="me">
        <main className="px-4 pb-16 pt-2">
          <CurrentPlanCard />

          <section className="mt-8 animate-fade-up" style={{ animationDelay: '120ms' }}>
            <Eyebrow className="mb-3 px-1 text-white/50">All plans</Eyebrow>
            <SegmentedControl
              size="md"
              activeValue="monthly"
              options={[
                { label: 'Monthly', value: 'monthly' },
                { label: 'Annual', value: 'annual' },
              ]}
              className="h-10"
            />

            <div className="-mx-4 mt-3 overflow-x-auto px-4 pb-2 hide-scrollbar">
              <div className="flex gap-3">
                {plans.map((plan) => (
                  <TierCard key={plan.name} {...plan} />
                ))}
              </div>
            </div>
          </section>

          <section className="mt-8 animate-fade-up" style={{ animationDelay: '220ms' }}>
            <Eyebrow className="mb-3 px-1 text-white/50">Billing</Eyebrow>
            <SettingsGroup>
              <SettingsRow label="Payment method" value="Visa ****4242" icon={<CreditCard size={17} />} />
              <SettingsRow label="Billing history" />
              <SettingsRow label="Restore purchases" icon={<RotateCcw size={17} />} />
            </SettingsGroup>
          </section>

          <section className="mt-8 space-y-4 animate-fade-up" style={{ animationDelay: '320ms' }}>
            <SettingsRow label="Downgrade plan" variant="destructive" />
            <SettingsRow label="Cancel subscription" variant="destructive" />
          </section>
        </main>
      </ScreenShell>
    </PhoneFrame>
  )
}
