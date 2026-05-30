import figma from '@figma/code-connect'
import { TierCard } from '@/components/screens/TierCard'

// Figma SET 233:83 — State[Current,Upgrade,Downgrade] splits across React `current` (bool) and
// `actionVariant` ('upgrade'/'downgrade'); shown representatively with literal tier data.
figma.connect(TierCard, 'BALENCIA_DS?node-id=233-83', {
  example: () => (
    <TierCard
      name="Premium"
      price="$12"
      cadence="/mo"
      ctaLabel="Upgrade"
      actionVariant="upgrade"
      features={[
        { label: 'Unlimited missions', included: true },
        { label: 'SIA voice coaching', included: true },
        { label: 'Advanced analytics', included: false },
      ]}
    />
  ),
})
