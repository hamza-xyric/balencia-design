import figma from '@figma/code-connect'
import { Chip } from '@/components/design-system/Chip'

// Figma SET 46:26 — Variant[Neutral,Filled,Outline] (no React prop — Chip styling is domain +
// selected driven; dropped) x Active[False,True]->selected. Label->children. HasIcon dropped.
figma.connect(Chip, 'BALENCIA_DS?node-id=46-26', {
  props: {
    children: figma.string('Label'),
    selected: figma.boolean('Active'),
  },
  example: (props) => (
    <Chip domain="fitness" selected={props.selected}>
      {props.children}
    </Chip>
  ),
})
