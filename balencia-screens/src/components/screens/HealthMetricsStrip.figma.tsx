import figma from '@figma/code-connect'
import { HealthMetricsStrip } from '@/components/screens/HealthMetricsStrip'
import { healthMetrics } from '@/data/mock'

// Figma SET 345:165 — Default/Pressed is a visual state (:active; dropped). Data-driven (metrics).
figma.connect(HealthMetricsStrip, 'BALENCIA_DS?node-id=345-165', {
  example: () => <HealthMetricsStrip metrics={healthMetrics} />,
})
