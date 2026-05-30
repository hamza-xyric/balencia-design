import figma from '@figma/code-connect'
import { IntegrationCard } from '@/components/screens/IntegrationCard'

// Figma SET 198:26 — Status[Connected,NotConnected,ComingSoon]->status ('connected'/'not-connected'/'coming-soon').
figma.connect(IntegrationCard, 'BALENCIA_DS?node-id=198-26', {
  props: {
    status: figma.enum('Status', {
      Connected: 'connected',
      NotConnected: 'not-connected',
      ComingSoon: 'coming-soon',
    }),
  },
  example: (props) => (
    <IntegrationCard
      name="Apple Health"
      iconLabel="AH"
      status={props.status}
      description="Sync workouts, steps, and sleep automatically."
    />
  ),
})
