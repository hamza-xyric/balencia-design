import figma from '@figma/code-connect'
import { ChainProgressBar } from '@/components/screens/ChainProgressBar'

// Figma 143:6 — Count TEXT is the current/total data (React takes numeric current + total).
figma.connect(ChainProgressBar, 'BALENCIA_DS?node-id=143-6', {
  example: () => <ChainProgressBar current={3} total={5} />,
})
