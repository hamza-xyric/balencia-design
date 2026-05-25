import type { HTMLAttributes } from 'react'
import type { DomainKey } from '@/data/domains'
import type { DomainStat } from '@/data/mock'

type RadarChartProps = HTMLAttributes<HTMLDivElement> & {
  stats: DomainStat[]
}

const radarOrder: { domain: DomainKey; label: string }[] = [
  { domain: 'fitness', label: 'FIT' },
  { domain: 'sleep', label: 'SLP' },
  { domain: 'career', label: 'CAR' },
  { domain: 'nutrition', label: 'NUT' },
  { domain: 'finance', label: 'FIN' },
  { domain: 'faith', label: 'FAI' },
  { domain: 'productivity', label: 'PRO' },
  { domain: 'relationships', label: 'REL' },
  { domain: 'wellbeing', label: 'WEL' },
  { domain: 'meditation', label: 'MED' },
]

const center = 140
const radius = 96
const labelRadius = 124

function pointFor(index: number, value: number, maxRadius = radius) {
  const angle = (Math.PI * 2 * index) / radarOrder.length - Math.PI / 2
  const scaledRadius = maxRadius * (value / 99)

  return {
    x: center + Math.cos(angle) * scaledRadius,
    y: center + Math.sin(angle) * scaledRadius,
  }
}

function cssDomainColor(domain: DomainKey) {
  return `var(--color-domain-${domain})`
}

export function RadarChart({ stats, className = '', ...props }: RadarChartProps) {
  const statMap = new Map(stats.map((stat) => [stat.domain, stat.stat]))
  const dataPoints = radarOrder.map((item, index) => pointFor(index, statMap.get(item.domain) ?? 0))
  const polygonPoints = dataPoints.map((point) => `${point.x},${point.y}`).join(' ')

  return (
    <div
      className={['flex justify-center', className].filter(Boolean).join(' ')}
      aria-label="Life areas radar chart"
      {...props}
    >
      <svg width="280" height="280" viewBox="0 0 280 280" role="img">
        <title>Life areas radar chart</title>

        {[20, 40, 60, 80, 99].map((ring) => (
          <polygon
            key={ring}
            points={radarOrder.map((_, index) => {
              const point = pointFor(index, ring)
              return `${point.x},${point.y}`
            }).join(' ')}
            fill="none"
            stroke="currentColor"
            className="text-white/5"
            strokeWidth="1"
          />
        ))}

        {radarOrder.map((item, index) => {
          const axisEnd = pointFor(index, 99)
          const labelPoint = pointFor(index, 99, labelRadius)
          const textAnchor = Math.abs(labelPoint.x - center) < 8 ? 'middle' : labelPoint.x > center ? 'start' : 'end'

          return (
            <g key={item.domain}>
              <line
                x1={center}
                y1={center}
                x2={axisEnd.x}
                y2={axisEnd.y}
                stroke="currentColor"
                className="text-white/10"
                strokeWidth="1"
              />
              <text
                x={labelPoint.x}
                y={labelPoint.y + 4}
                textAnchor={textAnchor}
                className="fill-white/70 text-[11px] font-semibold"
              >
                {item.label}
              </text>
            </g>
          )
        })}

        <g className="radar-grow">
          <polygon
            points={polygonPoints}
            fill="var(--color-brand-orange)"
            fillOpacity="0.15"
            stroke="var(--color-brand-orange)"
            strokeOpacity="0.8"
            strokeWidth="2"
          />
          {radarOrder.map((item, index) => {
            const point = dataPoints[index]
            return (
              <circle
                key={item.domain}
                cx={point.x}
                cy={point.y}
                r="4"
                fill={cssDomainColor(item.domain)}
                className="radar-dot"
                style={{ animationDelay: `${420 + index * 40}ms` }}
              />
            )
          })}
        </g>
      </svg>
    </div>
  )
}
