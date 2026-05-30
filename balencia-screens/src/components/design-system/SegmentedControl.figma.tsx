import figma from '@figma/code-connect'
import { SegmentedControl } from '@/components/design-system/SegmentedControl'

// Figma SET 49:69 — SegmentCount[2,3,4] + ActiveIndex[0-3] are data-derived (from `options` +
// `activeValue`; dropped). Size[Sm,Md]->size. Options shown representatively.
figma.connect(SegmentedControl, 'BALENCIA_DS?node-id=49-69', {
  props: {
    size: figma.enum('Size', { Sm: 'sm', Md: 'md' }),
  },
  example: (props) => (
    <SegmentedControl
      size={props.size}
      activeValue="day"
      options={[
        { label: 'Day', value: 'day' },
        { label: 'Week', value: 'week' },
        { label: 'Month', value: 'month' },
      ]}
    />
  ),
})
