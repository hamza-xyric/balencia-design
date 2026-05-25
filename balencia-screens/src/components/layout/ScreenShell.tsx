import { TabBar } from './TabBar'

interface ScreenShellProps {
  children: React.ReactNode
  header?: React.ReactNode
  tabBar?: React.ReactNode
  bottomAction?: React.ReactNode
  composer?: React.ReactNode
  showTabBar?: boolean
  activeTab?: 'today' | 'sia' | 'goals' | 'me'
}

export function ScreenShell({
  children,
  header,
  tabBar,
  bottomAction,
  composer,
  showTabBar = true,
  activeTab = 'today',
}: ScreenShellProps) {
  return (
    <div className="flex h-full flex-col bg-ink-900" data-testid="screen-shell">
      <div className="h-[54px] flex-shrink-0" data-testid="status-bar-space" />

      {header}

      <div className="flex-1 overflow-y-auto hide-scrollbar" data-testid="screen-content">
        {children}
      </div>

      {bottomAction && (
        <div
          className="shrink-0 bg-ink-900 px-4 pb-3 pt-2"
          data-testid="screen-bottom-action"
        >
          {bottomAction}
        </div>
      )}

      {composer && (
        <div className="shrink-0 bg-ink-900 px-4 pb-2 pt-2" data-testid="screen-composer">
          {composer}
        </div>
      )}

      {showTabBar && (tabBar || <TabBar active={activeTab} />)}

      <div className="h-[34px] flex-shrink-0 bg-ink-900" data-testid="home-indicator-clearance" />
    </div>
  )
}
