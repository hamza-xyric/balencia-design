import figma from '@figma/code-connect'
import { DomainTag } from '@/components/design-system/DomainTag'

// Figma SET 52:39 — Domain[12]->domain (DomainKey, lowercased), ShowDot BOOLEAN->showDot.
figma.connect(DomainTag, 'BALENCIA_DS?node-id=52-39', {
  props: {
    domain: figma.enum('Domain', {
      Fitness: 'fitness',
      Sleep: 'sleep',
      Career: 'career',
      Nutrition: 'nutrition',
      Finance: 'finance',
      Faith: 'faith',
      Productivity: 'productivity',
      Relationships: 'relationships',
      Wellbeing: 'wellbeing',
      Meditation: 'meditation',
      Creativity: 'creativity',
      Learning: 'learning',
    }),
    showDot: figma.boolean('ShowDot'),
  },
  example: (props) => <DomainTag domain={props.domain} showDot={props.showDot} />,
})
