import { Eyebrow } from '@/components/design-system/Eyebrow'
import { Header } from '@/components/layout/Header'
import { PhoneFrame } from '@/components/layout/PhoneFrame'
import { ScreenShell } from '@/components/layout/ScreenShell'
import { NotificationRow } from '@/components/screens/NotificationRow'
import { SettingsGroup } from '@/components/screens/SettingsRow'

// Screen 24 of 78: Notification history
// Spec: /Users/hamza/yHealth/app_design 3/24-notification-history.md

const notificationGroups = [
  {
    title: 'Today',
    items: [
      {
        category: 'sia' as const,
        title: 'SIA insight',
        preview: 'Your sleep and spending have been moving together this week.',
        timestamp: '2h ago',
        unread: true,
      },
      {
        category: 'reminder' as const,
        title: 'Reminder',
        preview: "Don't forget your morning walk.",
        timestamp: '6h ago',
      },
      {
        category: 'check-in' as const,
        title: 'Check-in',
        preview: 'How are you feeling this morning?',
        timestamp: '8h ago',
        unread: true,
      },
    ],
  },
  {
    title: 'Yesterday',
    items: [
      {
        category: 'sia' as const,
        title: 'SIA insight',
        preview: 'Great workout consistency this week. The easy sessions are adding up.',
        timestamp: '1d',
      },
      {
        category: 'social' as const,
        title: 'Social',
        preview: 'Alex completed a fitness mission in your squad.',
        timestamp: '1d',
      },
    ],
  },
  {
    title: 'This week',
    items: [
      {
        category: 'reminder' as const,
        title: 'Reminder',
        preview: 'Your budget review is due.',
        timestamp: '3d',
      },
      {
        category: 'check-in' as const,
        title: 'Check-in',
        preview: 'You skipped two evening check-ins. Want to move the time?',
        timestamp: 'May 20',
      },
    ],
  },
]

export default function NotificationsScreen() {
  return (
    <PhoneFrame>
      <ScreenShell
        header={
          <Header
            title="Notifications"
            showBack
            rightAction={<button className="h-11 text-[13px] font-semibold leading-[18px] text-brand-orange">Mark all read</button>}
          />
        }
        activeTab="me"
      >
        <main className="px-4 pb-16 pt-2">
          <div className="space-y-8">
            {notificationGroups.map((group, groupIndex) => (
              <section
                key={group.title}
                className="animate-fade-up"
                style={{ animationDelay: `${groupIndex * 80}ms` }}
              >
                <Eyebrow className="mb-3 px-1 text-white/50">{group.title}</Eyebrow>
                <SettingsGroup>
                  {group.items.map((notification) => (
                    <NotificationRow key={`${group.title}-${notification.title}-${notification.timestamp}`} {...notification} />
                  ))}
                </SettingsGroup>
              </section>
            ))}
          </div>
        </main>
      </ScreenShell>
    </PhoneFrame>
  )
}
