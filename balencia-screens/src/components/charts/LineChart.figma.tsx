import figma from '@figma/code-connect'
import { LineChart } from '@/components/charts/LineChart'

// Figma node 510:2 is a STATIC visual snapshot; Code Connect references the live recharts
// implementation. No Figma variant/text props — data is supplied by the consumer at runtime.
figma.connect(LineChart, 'BALENCIA_DS?node-id=510-2', {
  example: () => (
    <LineChart
      data={[
        { day: 'Mon', value: 42 },
        { day: 'Tue', value: 58 },
        { day: 'Wed', value: 51 },
        { day: 'Thu', value: 67 },
        { day: 'Fri', value: 73 },
        { day: 'Sat', value: 64 },
        { day: 'Sun', value: 80 },
      ]}
      xKey="day"
      yKey="value"
    />
  ),
})
