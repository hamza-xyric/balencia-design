'use client'

import {
  Bar,
  BarChart as RechartsBarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'

type BarChartProps = {
  data: Record<string, string | number>[]
  xKey: string
  yKey: string
  height?: number
}

export function BarChart({ data, xKey, yKey, height = 160 }: BarChartProps) {
  return (
    <div style={{ height }}>
      <ResponsiveContainer width="100%" height="100%">
        <RechartsBarChart data={data} margin={{ top: 8, right: 0, bottom: 0, left: -28 }}>
          <XAxis dataKey={xKey} tickLine={false} axisLine={false} tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 11 }} />
          <YAxis hide />
          <Tooltip
            cursor={{ fill: 'rgba(255,255,255,0.04)' }}
            contentStyle={{
              background: 'var(--color-ink-brown-800)',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: 14,
              color: 'var(--color-rarity-common)',
            }}
          />
          <Bar dataKey={yKey} fill="var(--color-brand-orange)" radius={[8, 8, 8, 8]} />
        </RechartsBarChart>
      </ResponsiveContainer>
    </div>
  )
}
