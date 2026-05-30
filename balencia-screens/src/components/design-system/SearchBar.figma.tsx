import figma from '@figma/code-connect'
import { SearchBar } from '@/components/design-system/SearchBar'

// Figma SET 51:20 — State[Default,Focused,Filled] (visual; dropped). Placeholder/Value TEXT,
// HasClearButton BOOLEAN->showClear.
figma.connect(SearchBar, 'BALENCIA_DS?node-id=51-20', {
  props: {
    placeholder: figma.string('Placeholder'),
    value: figma.string('Value'),
    showClear: figma.boolean('HasClearButton'),
  },
  example: (props) => (
    <SearchBar placeholder={props.placeholder} value={props.value} showClear={props.showClear} />
  ),
})
