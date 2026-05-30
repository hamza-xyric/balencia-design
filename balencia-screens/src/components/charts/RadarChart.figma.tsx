import figma from '@figma/code-connect'
import { RadarChart } from '@/components/charts/RadarChart'
import { domainStats } from '@/data/mock'

// Figma node 520:2 is a STATIC visual snapshot of the bespoke (non-recharts) 280x280 radar;
// Code Connect references the live React implementation. `stats` (DomainStat[]) is supplied by
// the consumer — mirrors the real life-areas screen usage (<RadarChart stats={domainStats} />).
figma.connect(RadarChart, 'BALENCIA_DS?node-id=520-2', {
  example: () => <RadarChart stats={domainStats} />,
})
