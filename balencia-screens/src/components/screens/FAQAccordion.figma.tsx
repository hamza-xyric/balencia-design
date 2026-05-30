import figma from '@figma/code-connect'
import { FAQAccordion } from '@/components/screens/FAQAccordion'

// Figma SET 260:108 — State[Collapsed,Expanded]->expanded, Question/Answer TEXT map 1:1.
figma.connect(FAQAccordion, 'BALENCIA_DS?node-id=260-108', {
  props: {
    question: figma.string('Question'),
    answer: figma.string('Answer'),
    expanded: figma.enum('State', { Collapsed: false, Expanded: true }),
  },
  example: (props) => (
    <FAQAccordion question={props.question} answer={props.answer} expanded={props.expanded} />
  ),
})
