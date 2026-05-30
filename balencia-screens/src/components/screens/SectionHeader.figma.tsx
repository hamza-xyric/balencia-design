import figma from '@figma/code-connect'
import { SectionHeader } from '@/components/screens/SectionHeader'

// Figma SET 125:10 — WithAction[False,True] toggles the `action` slot; Title TEXT->title,
// ActionLabel TEXT is the action's label.
figma.connect(SectionHeader, 'BALENCIA_DS?node-id=125-10', {
  props: {
    title: figma.string('Title'),
    actionLabel: figma.string('ActionLabel'),
    withAction: figma.boolean('WithAction'),
  },
  example: (props) => (
    <SectionHeader
      title={props.title}
      action={props.withAction ? <button>{props.actionLabel}</button> : undefined}
    />
  ),
})
