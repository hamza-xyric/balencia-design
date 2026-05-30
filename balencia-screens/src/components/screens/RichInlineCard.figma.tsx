import figma from '@figma/code-connect'
import { RichInlineCard } from '@/components/screens/RichInlineCard'
import { missions } from '@/data/mock'

// Figma SET 320:153 — Type[Chart,Mission,Meal,Finance,Workout,Connection] maps to the React
// discriminated-union `type`. The per-type data (mission/meal/workout) makes a single
// parametrized example impossible to type, so a representative 'mission' card is shown.
figma.connect(RichInlineCard, 'BALENCIA_DS?node-id=320-153', {
  example: () => <RichInlineCard type="mission" mission={missions[0]} />,
})
