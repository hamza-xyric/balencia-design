import figma from '@figma/code-connect'
import { QuickActionsRow } from '@/components/screens/QuickActionsRow'
import { quickActions } from '@/data/mock'

// Figma 248:90 — data-driven (actions array). Shown with the real mock quickActions.
figma.connect(QuickActionsRow, 'BALENCIA_DS?node-id=248-90', {
  example: () => <QuickActionsRow actions={quickActions} />,
})
