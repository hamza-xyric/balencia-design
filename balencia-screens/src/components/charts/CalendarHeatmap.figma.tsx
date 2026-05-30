import figma from '@figma/code-connect'
import { CalendarHeatmap } from '@/components/charts/CalendarHeatmap'

// Figma SET node 519:2 — variant axis Tone[Brand, Creativity, Learning] maps 1:1 to the React
// `tone` prop. The Figma cells are a baked snapshot; dayLabels/rows are supplied at runtime.
figma.connect(CalendarHeatmap, 'BALENCIA_DS?node-id=519-2', {
  props: {
    tone: figma.enum('Tone', {
      Brand: 'brand',
      Creativity: 'creativity',
      Learning: 'learning',
    }),
  },
  example: (props) => (
    <CalendarHeatmap
      tone={props.tone}
      dayLabels={['M', 'T', 'W', 'T', 'F', 'S', 'S']}
      rows={[
        [
          { id: 'r0c0', intensity: 1 },
          { id: 'r0c1', intensity: 3 },
          { id: 'r0c2', intensity: 0 },
          { id: 'r0c3', intensity: 4 },
          { id: 'r0c4', intensity: 2 },
          { id: 'r0c5', intensity: 3 },
          { id: 'r0c6', intensity: 'future' },
        ],
      ]}
      monthLabel="May"
      summaryLeft="18 active days"
      summaryRight="+340 XP"
    />
  ),
})
