import figma from '@figma/code-connect'
import { RecipeCard } from '@/components/domain/RecipeCard'

// Figma SET 226:67 — Compact[False,True]->compact. Required recipe data shown representatively.
figma.connect(RecipeCard, 'BALENCIA_DS?node-id=226-67', {
  props: {
    compact: figma.boolean('Compact'),
  },
  example: (props) => (
    <RecipeCard
      recipe={{ id: 'r1', name: 'Grilled Salmon Bowl', calories: 520, protein: 38, time: '25 min', difficulty: 'easy' }}
      compact={props.compact}
    />
  ),
})
