import figma from '@figma/code-connect'
import { LifePowerDisplay } from '@/components/screens/LifePowerDisplay'

// Figma SET 243:83 — Layout[Stacked,Inline]->layout, Label TEXT->label. Value TEXT is the
// numeric `value` (shown representatively).
figma.connect(LifePowerDisplay, 'BALENCIA_DS?node-id=243-83', {
  props: {
    layout: figma.enum('Layout', { Stacked: 'stacked', Inline: 'inline' }),
    label: figma.string('Label'),
  },
  example: (props) => <LifePowerDisplay value={742} layout={props.layout} label={props.label} />,
})
