import figma from '@figma/code-connect'
import { ActionCard } from '@/components/screens/ActionCard'
import { todayActions } from '@/data/mock'

// Figma SET 201:31 — Variant[Default,Accent,Domain] is derived from the `action` object's tone
// (no React `variant` prop; dropped). React API is <ActionCard action={obj} expanded? />.
figma.connect(ActionCard, 'BALENCIA_DS?node-id=201-31', {
  example: () => <ActionCard action={todayActions[0]} />,
})
