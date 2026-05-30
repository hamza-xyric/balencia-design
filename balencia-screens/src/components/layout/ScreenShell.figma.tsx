import figma from '@figma/code-connect'
import { ScreenShell } from '@/components/layout/ScreenShell'
import { Header } from '@/components/layout/Header'

// Figma node 37:2 (ScreenShell-Template) — vertical shell with Header / Content / optional
// BottomAction / Composer / TabBar slots. BOOLEAN prop "Show TabBar" maps to React `showTabBar`.
// The Header / Content / TabBar regions are layout slots filled per-screen; shown representatively.
figma.connect(ScreenShell, 'BALENCIA_DS?node-id=37-2', {
  props: {
    showTabBar: figma.boolean('Show TabBar'),
  },
  example: (props) => (
    <ScreenShell showTabBar={props.showTabBar} header={<Header title="Screen" />}>
      <div className="px-4 py-3">{/* screen content */}</div>
    </ScreenShell>
  ),
})
