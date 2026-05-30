import figma from '@figma/code-connect'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '@/components/design-system/Button'

// Figma SET 43:92 — Variant[Primary,Secondary,Ghost,Green,Destructive] x Size[Sm,Md,Lg]
// + Label TEXT, HasLeftIcon/HasRightIcon BOOLEAN. Reconciled to React props:
//   Variant: Primary->primary, Secondary->skip (grey secondary), Ghost->ghost, Green->completion.
//            Destructive has no React variant — omitted (falls back to React default 'primary').
//   Size:    Sm->compact, Md->card, Lg->auth.
figma.connect(Button, 'BALENCIA_DS?node-id=43-92', {
  props: {
    children: figma.string('Label'),
    variant: figma.enum('Variant', {
      Primary: 'primary',
      Secondary: 'skip',
      Ghost: 'ghost',
      Green: 'completion',
    }),
    size: figma.enum('Size', {
      Sm: 'compact',
      Md: 'card',
      Lg: 'auth',
    }),
    leftIcon: figma.boolean('HasLeftIcon', {
      true: <ChevronLeft size={18} />,
      false: undefined,
    }),
    rightIcon: figma.boolean('HasRightIcon', {
      true: <ChevronRight size={18} />,
      false: undefined,
    }),
  },
  example: (props) => (
    <Button variant={props.variant} size={props.size} leftIcon={props.leftIcon} rightIcon={props.rightIcon}>
      {props.children}
    </Button>
  ),
})
