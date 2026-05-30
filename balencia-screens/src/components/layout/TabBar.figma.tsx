import figma from '@figma/code-connect'
import { TabBar } from '@/components/layout/TabBar'

// Figma SET node 498:36 — variant axis Active[Today, SIA, Goals, Me].
// Figma value "Goals" maps to React tab key 'goals' (the tab renders the "Missions" label).
figma.connect(TabBar, 'BALENCIA_DS?node-id=498-36', {
  props: {
    active: figma.enum('Active', {
      Today: 'today',
      SIA: 'sia',
      Goals: 'goals',
      Me: 'me',
    }),
  },
  example: (props) => <TabBar active={props.active} />,
})
