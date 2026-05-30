import figma from '@figma/code-connect'
import { ModuleCard } from '@/components/screens/ModuleCard'
import { suggestedModules } from '@/data/mock'

// Figma SET 229:71 — Variant[Suggested,Grid]->variant. `module` is the object data.
figma.connect(ModuleCard, 'BALENCIA_DS?node-id=229-71', {
  props: {
    variant: figma.enum('Variant', { Suggested: 'suggested', Grid: 'grid' }),
  },
  example: (props) => <ModuleCard module={suggestedModules[0]} variant={props.variant} />,
})
