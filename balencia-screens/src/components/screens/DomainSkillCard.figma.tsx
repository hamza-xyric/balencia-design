import figma from '@figma/code-connect'
import { DomainSkillCard } from '@/components/screens/DomainSkillCard'
import { domainStats } from '@/data/mock'

// Figma SET 373:176 — State[Default,Pressed] is a visual state (dropped). Label/Stat/Level TEXT
// all derive from the `stat` (DomainStat) object. References real mock data.
figma.connect(DomainSkillCard, 'BALENCIA_DS?node-id=373-176', {
  example: () => <DomainSkillCard stat={domainStats[0]} />,
})
