import figma from '@figma/code-connect'
import { BarChart } from '@/components/charts/BarChart'

// Figma node 508:2 is a STATIC visual snapshot; Code Connect references the live recharts
// implementation. No Figma variant/text props — data is supplied by the consumer at runtime.
figma.connect(BarChart, 'BALENCIA_DS?node-id=508-2', {
  example: () => (
    <BarChart
      data={[
        { day: 'Mon', value: 30 },
        { day: 'Tue', value: 45 },
        { day: 'Wed', value: 38 },
        { day: 'Thu', value: 52 },
        { day: 'Fri', value: 61 },
        { day: 'Sat', value: 48 },
        { day: 'Sun', value: 70 },
      ]}
      xKey="day"
      yKey="value"
    />
  ),
})
