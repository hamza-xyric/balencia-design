import figma from '@figma/code-connect'
import { LeaderboardRow } from '@/components/domain/LeaderboardRow'

// Figma SET 206:47 — Rank[1,2,3,Other] is the numeric `rank`; Self[True,False]->isOwn.
figma.connect(LeaderboardRow, 'BALENCIA_DS?node-id=206-47', {
  props: {
    isOwn: figma.boolean('Self'),
  },
  example: (props) => (
    <LeaderboardRow
      rank={1}
      name="Jordan Lee"
      avatar="JL"
      level={14}
      xp={3820}
      topDomain="fitness"
      isOwn={props.isOwn}
    />
  ),
})
