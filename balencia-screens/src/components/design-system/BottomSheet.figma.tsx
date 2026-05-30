import figma from '@figma/code-connect'
import { BottomSheet } from '@/components/design-system/BottomSheet'

// Figma SET 178:105 — Variant[Route,Modal]->variant, Title TEXT->title. ShowClose has no direct
// React prop (the close affordance is driven by closeHref/onClose); dropped.
figma.connect(BottomSheet, 'BALENCIA_DS?node-id=178-105', {
  props: {
    title: figma.string('Title'),
    variant: figma.enum('Variant', { Route: 'route', Modal: 'modal' }),
  },
  example: (props) => (
    <BottomSheet title={props.title} variant={props.variant}>
      <div className="px-4 py-3">{/* sheet content */}</div>
    </BottomSheet>
  ),
})
