import figma from '@figma/code-connect'
import { MoreHorizontal } from 'lucide-react'
import { Header } from '@/components/layout/Header'

// Figma SET node 501:44 — variant axes HasBack[True,False] x HasRightAction[True,False]
// + Title TEXT prop. Figma right-action default = MoreHorizontal (per DS build note).
figma.connect(Header, 'BALENCIA_DS?node-id=501-44', {
  props: {
    title: figma.string('Title'),
    showBack: figma.boolean('HasBack'),
    rightAction: figma.boolean('HasRightAction', {
      true: <MoreHorizontal size={20} className="text-white" />,
      false: undefined,
    }),
  },
  example: (props) => (
    <Header title={props.title} showBack={props.showBack} rightAction={props.rightAction} />
  ),
})
