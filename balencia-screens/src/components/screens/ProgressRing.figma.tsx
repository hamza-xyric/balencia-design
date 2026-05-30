import figma from '@figma/code-connect'
import { ProgressRing } from '@/components/screens/ProgressRing'

// Figma SET 138:5 — Size[Sm,Md,Lg]->numeric size (36/48/96), Color[Brand,Success]->complete
// (Success = the green completed ring). Percent TEXT is the `progress` data prop.
figma.connect(ProgressRing, 'BALENCIA_DS?node-id=138-5', {
  props: {
    size: figma.enum('Size', { Sm: 36, Md: 48, Lg: 96 }),
    complete: figma.enum('Color', { Brand: false, Success: true }),
  },
  example: (props) => <ProgressRing size={props.size} complete={props.complete} progress={0.65} label="65%" />,
})
