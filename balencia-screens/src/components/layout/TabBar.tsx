'use client'

import { Calendar, MessageCircle, Flag, User } from 'lucide-react'

const tabs = [
  { key: 'today', label: 'Today', Icon: Calendar },
  { key: 'cia',   label: 'CIA',   Icon: MessageCircle },
  { key: 'goals', label: 'Missions', Icon: Flag },
  { key: 'me',    label: 'Me',    Icon: User },
] as const

type TabKey = (typeof tabs)[number]['key'] | 'sia'

export function TabBar({ active = 'today' }: { active?: TabKey }) {
  return (
    <div
      className="flex h-[56px] items-center justify-around border-t-0 bg-ink-900 px-2"
      data-testid="tab-bar"
    >
      {tabs.map(({ key, label, Icon }) => {
        const isActive = key === active || (key === 'cia' && active === 'sia')
        return (
          <div key={key} className="flex flex-col items-center gap-[2px] w-[64px]">
            <Icon
              size={24}
              className={isActive ? 'text-brand-orange' : 'text-white/60'}
              strokeWidth={isActive ? 2.5 : 1.5}
            />
            <span
              className={`text-[11px] font-normal ${
                isActive ? 'text-brand-orange' : 'text-white/60'
              }`}
            >
              {label}
            </span>
          </div>
        )
      })}
    </div>
  )
}
