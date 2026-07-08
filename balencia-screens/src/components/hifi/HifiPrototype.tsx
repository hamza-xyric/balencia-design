import type { ScreenInfo } from '@/data/screens'
import { hifiScreenRegistry } from './screens/registry'
import { QueuedScreen } from './QueuedScreen'

export function HifiPrototypeScreen({ screen }: { screen: ScreenInfo }) {
  const Screen = hifiScreenRegistry[screen.id]
  return (
    <div className="hifi contents">
      {Screen ? <Screen /> : <QueuedScreen screen={screen} />}
    </div>
  )
}
