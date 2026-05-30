import figma from '@figma/code-connect'
import { MissionCard } from '@/components/screens/MissionCard'
import { missions } from '@/data/mock'

// Figma SET 175:101 — State[Default,Completed,Stalled] + Title/Subtitle/HasChain/HasPin all
// derive from the single React `mission` object prop, NOT flat props. The figma axes have no
// direct 1:1 React prop (the API is <MissionCard mission={...} />); references real mock data.
figma.connect(MissionCard, 'BALENCIA_DS?node-id=175-101', {
  example: () => <MissionCard mission={missions[0]} />,
})
