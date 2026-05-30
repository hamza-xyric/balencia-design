import figma from '@figma/code-connect'
import { MissionTypeBadge } from '@/components/screens/MissionTypeBadge'

// Figma SET 82:14 — Type[Life,Main,Side,Weekly,Daily,Group]->type (MissionType, lowercased).
figma.connect(MissionTypeBadge, 'BALENCIA_DS?node-id=82-14', {
  props: {
    type: figma.enum('Type', {
      Life: 'life',
      Main: 'main',
      Side: 'side',
      Weekly: 'weekly',
      Daily: 'daily',
      Group: 'group',
    }),
  },
  example: (props) => <MissionTypeBadge type={props.type} />,
})
