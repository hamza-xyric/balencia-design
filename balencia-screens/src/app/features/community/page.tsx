import { BookOpen, Brain, Dumbbell, Plus, Wallet } from 'lucide-react'
import { Card } from '@/components/design-system/Card'
import { domainToneClasses } from '@/components/design-system/Chip'
import { Header } from '@/components/layout/Header'
import { PhoneFrame } from '@/components/layout/PhoneFrame'
import { ScreenShell } from '@/components/layout/ScreenShell'
import { SectionHeader } from '@/components/screens/SectionHeader'
import { communityDiscoverRooms, communityRooms } from '@/data/mock'

// Screen 40 of 78: Community
// Spec: /Users/hamza/yHealth/app_design 3/40-community-chat-rooms.md

const discoverIcons = {
  fitness: Dumbbell,
  learning: BookOpen,
  meditation: Brain,
  finance: Wallet,
}

function DiscoverSection() {
  return (
    <section className="animate-fade-up">
      <SectionHeader title="Discover" className="px-1" />
      <div className="-mx-4 overflow-x-auto px-4 pb-1 hide-scrollbar">
        <div className="flex gap-3">
          {communityDiscoverRooms.map((room) => {
            const Icon = discoverIcons[room.icon as keyof typeof discoverIcons]
            const tone = domainToneClasses[room.domain]

            return (
              <Card
                key={room.id}
                variant="small"
                className="flex h-[100px] w-[120px] shrink-0 flex-col items-center justify-center rounded-lg p-4 text-center"
              >
                <div className={`flex h-8 w-8 items-center justify-center rounded-full ${tone.subtle}`}>
                  <Icon size={18} className={tone.text} strokeWidth={2.2} />
                </div>
                <h2 className="mt-2 line-clamp-2 text-[14px] font-semibold leading-[18px] text-white">
                  {room.name}
                </h2>
                <p className="mt-1 text-small leading-[14px] text-white/40 tabular-nums">
                  {room.members} members
                </p>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}

function RoomRow({ room, withDivider }: { room: (typeof communityRooms)[number]; withDivider?: boolean }) {
  const tone = domainToneClasses[room.domain]

  return (
    <article
      className={[
        'relative flex min-h-20 items-center gap-3 px-4 py-3',
        withDivider ? 'border-t border-white/[0.05]' : '',
      ].filter(Boolean).join(' ')}
    >
      <div className={`relative flex h-11 w-11 shrink-0 items-center justify-center rounded-full ${tone.subtle}`}>
        <span className="text-[15px] font-semibold leading-5 text-white">{room.initials}</span>
        {room.active && (
          <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-ink-brown-800 bg-forest-green" aria-hidden="true" />
        )}
      </div>

      <div className="min-w-0 flex-1 pr-8">
        <h2 className="truncate text-body font-semibold leading-[22px] text-white">{room.name}</h2>
        <p className="mt-0.5 text-small leading-[14px] text-white/40">{room.members} members</p>
        <p className="mt-1 truncate text-caption leading-[18px] text-white/50">{room.lastMessage}</p>
      </div>

      <div className="absolute right-4 top-3 flex flex-col items-end gap-2">
        <span className="text-small leading-[14px] text-white/30">{room.timestamp}</span>
        {room.unread > 0 && (
          <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-brand-orange px-1.5 text-small font-semibold leading-none text-white">
            {room.unread}
          </span>
        )}
      </div>
    </article>
  )
}

function RoomsList() {
  return (
    <section className="mt-6 animate-fade-up" style={{ animationDelay: '120ms' }}>
      <SectionHeader title="Your rooms" className="px-1" />
      <Card variant="small" className="rounded-lg p-0">
        {communityRooms.map((room, index) => (
          <RoomRow key={room.id} room={room} withDivider={index > 0} />
        ))}
      </Card>
    </section>
  )
}

function CreateRoomButton() {
  return (
    <button
      type="button"
      className="ml-auto inline-flex h-12 items-center justify-center gap-2 rounded-pill bg-brand-orange px-5 text-[15px] font-semibold leading-5 text-white shadow-2 shadow-brand-orange/30 transition-transform duration-[var(--dur-fast)] active:scale-[0.94]"
    >
      <Plus size={16} strokeWidth={2.4} />
      <span>Create room</span>
    </button>
  )
}

export default function CommunityScreen() {
  return (
    <PhoneFrame>
      <ScreenShell header={<Header title="Community" showBack />} activeTab="me" bottomAction={<CreateRoomButton />}>
        <main className="px-4 pb-6 pt-4">
          <DiscoverSection />
          <RoomsList />
        </main>
      </ScreenShell>
    </PhoneFrame>
  )
}
