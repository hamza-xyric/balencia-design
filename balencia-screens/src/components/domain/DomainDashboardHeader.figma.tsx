import figma from '@figma/code-connect'
import { MoreHorizontal } from 'lucide-react'
import { DomainDashboardHeader } from '@/components/domain/DomainDashboardHeader'

// Figma SET 329:158 — Variant[Compact,Expanded]->variant, Title TEXT->title, Level TEXT->level
// (HasLevel is presence-based), RightAction INSTANCE_SWAP->rightAction (default MoreHorizontal).
figma.connect(DomainDashboardHeader, 'BALENCIA_DS?node-id=329-158', {
  props: {
    title: figma.string('Title'),
    variant: figma.enum('Variant', { Compact: 'compact', Expanded: 'expanded' }),
    rightAction: figma.instance('RightAction'),
  },
  example: (props) => (
    <DomainDashboardHeader
      title={props.title}
      domain="fitness"
      level={5}
      variant={props.variant}
      rightAction={props.rightAction}
    />
  ),
})
