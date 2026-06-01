'use client'

import { useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Eyebrow } from '@/components/design-system/Eyebrow'
import { Header } from '@/components/layout/Header'
import { PhoneFrame } from '@/components/layout/PhoneFrame'
import { ScreenShell } from '@/components/layout/ScreenShell'
import { NotificationRow } from '@/components/screens/NotificationRow'
import { SettingsGroup } from '@/components/screens/SettingsRow'

// Screen 24 of 78: Notification history
// Spec: /Users/hamza/yHealth/app_design 3/24-notification-history.md

type NotificationItem = {
  category: 'sia' | 'reminder' | 'check-in' | 'social'
  title: string
  preview: string
  timestamp: string
  href: string
  unread?: boolean
}

const notificationGroups: Array<{ title: string; items: NotificationItem[] }> = [
  {
    title: 'Today',
    items: [
      {
        category: 'sia' as const,
        title: 'SIA insight',
        preview: 'Your sleep and spending have been moving together this week.',
        timestamp: '2h ago',
        unread: true,
        href: '/tabs/me/knowledge-graph',
      },
      {
        category: 'reminder' as const,
        title: 'Reminder',
        preview: "Don't forget your morning walk.",
        timestamp: '6h ago',
        href: '/tabs/today/schedule',
      },
      {
        category: 'check-in' as const,
        title: 'Check-in',
        preview: 'How are you feeling this morning?',
        timestamp: '8h ago',
        unread: true,
        href: '/tabs/today/daily-checkin',
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
        href: '/domains/fitness',
      },
      {
        category: 'social' as const,
        title: 'Social',
        preview: 'Alex completed a fitness mission in your squad.',
        timestamp: '1d',
        href: '/features/social-buddy',
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
        href: '/domains/finance',
      },
      {
        category: 'check-in' as const,
        title: 'Check-in',
        preview: 'You skipped two evening check-ins. Want to move the time?',
        timestamp: 'May 20',
        href: '/tabs/today/schedule',
      },
    ],
  },
]

export default function NotificationsScreen() {
  const router = useRouter()
  const [readIds, setReadIds] = useState<Set<string>>(new Set())
  const [toast, setToast] = useState('')
  const allItems = useMemo(
    () => notificationGroups.flatMap((group) => group.items.map((item) => ({ ...item, id: `${group.title}-${item.title}-${item.timestamp}` }))),
    [],
  )
  const unreadCount = allItems.filter((item) => item.unread && !readIds.has(item.id)).length

  function markAllRead() {
    setReadIds(new Set(allItems.map((item) => item.id)))
    setToast('All notifications marked read. Undo')
  }

  function openNotification(id: string, href: string) {
    setReadIds((current) => new Set(current).add(id))
    setToast('Opening linked screen')
    router.push(href)
  }

  return (
    <PhoneFrame>
      <ScreenShell
        header={
          <Header
            title="Notifications"
            showBack
            rightAction={
              <button
                type="button"
                onClick={markAllRead}
                disabled={unreadCount === 0}
                className="h-11 rounded-full px-2 text-[13px] font-semibold leading-[18px] text-brand-orange disabled:text-white/30"
              >
                Mark all read
              </button>
            }
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
                  {group.items.map((notification) => {
                    const id = `${group.title}-${notification.title}-${notification.timestamp}`
                    const unread = Boolean(notification.unread && !readIds.has(id))
                    return (
                      <NotificationRow
                        key={id}
                        {...notification}
                        unread={unread}
                        onClick={() => openNotification(id, notification.href)}
                        aria-label={`${unread ? 'Unread' : 'Read'} ${notification.title}. ${notification.preview}. ${notification.timestamp}`}
                      />
                    )
                  })}
                </SettingsGroup>
              </section>
            ))}
          </div>
          {toast && (
            <button
              type="button"
              onClick={() => {
                setReadIds(new Set())
                setToast('Unread state restored')
              }}
              className="fixed bottom-[116px] left-1/2 z-50 min-h-11 w-[300px] -translate-x-1/2 rounded-md border border-white/10 bg-ink-brown-800 px-4 text-[13px] font-semibold leading-[18px] text-white shadow-3"
              aria-live="polite"
            >
              {toast}
            </button>
          )}
        </main>
      </ScreenShell>
    </PhoneFrame>
  )
}
