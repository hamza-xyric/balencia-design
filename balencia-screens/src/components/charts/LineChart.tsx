'use client'

import {
  Line,
  LineChart as RechartsLineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'

type LineChartProps = {
  data: Record<string, string | number>[]
  xKey: string
  yKey: string
  height?: number
}

export function LineChart({ data, xKey, yKey, height = 160 }: LineChartProps) {
  return (
    <div style={{ height }}>
      <ResponsiveContainer width="100%" height="100%">
        <RechartsLineChart data={data} margin={{ top: 8, right: 8, bottom: 0, left: -28 }}>
          <XAxis dataKey={xKey} tickLine={false} axisLine={false} tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 11 }} />
          <YAxis hide />
          <Tooltip
            cursor={{ stroke: 'rgba(255,255,255,0.08)' }}
            contentStyle={{
              background: 'var(--color-ink-brown-800)',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: 14,
              color: 'var(--color-rarity-common)',
            }}
          />
          <Line
            type="monotone"
            dataKey={yKey}
            stroke="var(--color-brand-orange)"
            strokeWidth={3}
            dot={false}
            activeDot={{ r: 4, fill: 'var(--color-brand-orange)' }}
          />
        </RechartsLineChart>
      </ResponsiveContainer>
    </div>
  )
}
