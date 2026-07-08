import { PhoneFrame } from '@/components/layout/PhoneFrame'
import { ScreenShell } from '@/components/layout/ScreenShell'
import { cx } from './core'
import { GlassNavBar, type HifiTab } from './chrome'

// The one hi-fi screen wrapper: phone frame + warm atmosphere + grain film +
// shell slots + floating glass nav. Screens never compose PhoneFrame directly.
export function HifiShell({
  children,
  header,
  activeTab = 'today',
  composer,
  bottomAction,
  showTabBar = true,
  atmosphere = 'you',
}: {
  children: React.ReactNode
  header?: React.ReactNode
  activeTab?: HifiTab
  composer?: React.ReactNode
  bottomAction?: React.ReactNode
  showTabBar?: boolean
  atmosphere?: 'you' | 'cia'
}) {
  return (
    <PhoneFrame>
      <div className={cx('grain h-full', atmosphere === 'cia' ? 'screen-atmosphere-cia' : 'screen-atmosphere')}>
        <ScreenShell
          header={header}
          composer={composer}
          bottomAction={bottomAction}
          showTabBar={showTabBar}
          tabBar={<GlassNavBar active={activeTab} />}
        >
          {children}
        </ScreenShell>
      </div>
    </PhoneFrame>
  )
}
