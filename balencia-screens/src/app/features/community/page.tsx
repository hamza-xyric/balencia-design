'use client'

import { useState } from 'react'
import { BookOpen, Brain, ChevronLeft, Dumbbell, Plus, Settings, ShieldCheck, UserPlus, Wallet } from 'lucide-react'
import { BottomSheet, PhoneModalLayer } from '@/components/design-system/BottomSheet'
import { Card } from '@/components/design-system/Card'
import { domainToneClasses } from '@/components/design-system/Chip'
import { Header } from '@/components/layout/Header'
import { PhoneFrame } from '@/components/layout/PhoneFrame'
import { ScreenShell } from '@/components/layout/ScreenShell'
import { SectionHeader } from '@/components/screens/SectionHeader'
import { communityDiscoverRooms, communityRooms } from '@/data/mock'
import type { DomainKey } from '@/data/domains'

// Screen 40 of 78: Community
// Spec: /Users/hamza/yHealth/app_design 3/40-community-chat-rooms.md

type CommunityRoom = {
  id: string
  name: string
  members: number
  lastMessage: string
  timestamp: string
  unread: number
  initials: string
  domain: DomainKey
  active: boolean
}

type DiscoverRoom = (typeof communityDiscoverRooms)[number]

const discoverIcons = {
  fitness: Dumbbell,
  learning: BookOpen,
  meditation: Brain,
  finance: Wallet,
}

const initialRooms: CommunityRoom[] = communityRooms.map((room) => ({
  ...room,
  domain: room.domain,
}))

function roomFromDiscover(room: DiscoverRoom): CommunityRoom {
  return {
    id: room.id,
    name: room.name,
    members: room.members + 1,
    lastMessage: 'Welcome. Introduce yourself when you are ready.',
    timestamp: 'now',
    unread: 0,
    initials: room.name.slice(0, 1).toUpperCase(),
    domain: room.domain,
    active: true,
  }
}

function DiscoverSection({ onOpen }: { onOpen: (room: DiscoverRoom) => void }) {
  return (
    <section className="animate-fade-up">
      <SectionHeader title="Discover" className="px-1" />
      <div className="-mx-4 overflow-x-auto px-4 pb-1 hide-scrollbar">
        <div className="flex gap-3">
          {communityDiscoverRooms.map((room) => {
            const Icon = discoverIcons[room.icon as keyof typeof discoverIcons]
            const tone = domainToneClasses[room.domain]

            return (
              <button
                key={room.id}
                type="button"
                onClick={() => onOpen(room)}
                className="flex h-[112px] w-[124px] shrink-0 flex-col items-center justify-center rounded-lg border border-white/[0.06] bg-ink-brown-800 p-4 text-center shadow-1 transition-transform duration-[var(--dur-fast)] active:scale-[0.98]"
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
              </button>
            )
          })}
        </div>
      </div>
    </section>
  )
}

function RoomRow({ room, withDivider, onOpen }: { room: CommunityRoom; withDivider?: boolean; onOpen: () => void }) {
  const tone = domainToneClasses[room.domain]

  return (
    <button
      type="button"
      onClick={onOpen}
      className={[
        'relative flex min-h-20 w-full items-center gap-3 px-4 py-3 text-left transition-colors duration-[var(--dur-fast)] active:bg-white/[0.05]',
        withDivider ? 'border-t border-white/[0.05]' : '',
      ].filter(Boolean).join(' ')}
      aria-label={`Open ${room.name} room`}
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
    </button>
  )
}

function RoomsList({ rooms, onOpen }: { rooms: CommunityRoom[]; onOpen: (room: CommunityRoom) => void }) {
  return (
    <section className="mt-6 animate-fade-up" style={{ animationDelay: '120ms' }}>
      <SectionHeader title="Your rooms" className="px-1" />
      <Card variant="small" className="rounded-lg p-0">
        {rooms.map((room, index) => (
          <RoomRow key={room.id} room={room} withDivider={index > 0} onOpen={() => onOpen(room)} />
        ))}
      </Card>
    </section>
  )
}

function CreateRoomButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="ml-auto inline-flex h-12 items-center justify-center gap-2 rounded-pill bg-brand-orange px-5 text-[15px] font-semibold leading-5 text-white shadow-2 shadow-brand-orange/30 transition-transform duration-[var(--dur-fast)] active:scale-[0.94]"
    >
      <Plus size={16} strokeWidth={2.4} />
      <span>Create room</span>
    </button>
  )
}

function RoomHeader({ room, onBack, onSettings }: { room: CommunityRoom; onBack: () => void; onSettings: () => void }) {
  return (
    <div className="relative flex h-[56px] items-center bg-ink-900 px-4">
      <button type="button" onClick={onBack} className="flex h-11 w-11 items-center justify-center rounded-full text-white" aria-label="Back to community">
        <ChevronLeft size={20} strokeWidth={2.1} />
      </button>
      <h1 className="absolute left-1/2 max-w-[190px] -translate-x-1/2 truncate text-[17px] font-semibold text-white">
        {room.name}
      </h1>
      <button type="button" onClick={onSettings} className="ml-auto flex h-11 w-11 items-center justify-center rounded-full text-white/70" aria-label={`Open ${room.name} settings`}>
        <Settings size={19} strokeWidth={2.1} />
      </button>
    </div>
  )
}

function RoomInterior({
  room,
  status,
  onBack,
  onInvite,
  onSettings,
}: {
  room: CommunityRoom
  status: string
  onBack: () => void
  onInvite: () => void
  onSettings: () => void
}) {
  const tone = domainToneClasses[room.domain]

  return (
    <ScreenShell header={<RoomHeader room={room} onBack={onBack} onSettings={onSettings} />} activeTab="me">
      <main className="px-4 pb-20 pt-4">
        <section className={`rounded-xl border ${tone.border} bg-ink-brown-800 p-5 shadow-2`}>
          <div className="flex items-start gap-3">
            <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full ${tone.subtle}`}>
              <ShieldCheck size={20} className={tone.text} strokeWidth={2.2} />
            </div>
            <div>
              <h2 className="text-[18px] font-semibold leading-6 text-white">Private room</h2>
              <p className="mt-1 text-[13px] leading-[18px] text-white/55">
                Members see your name, posts, and opted-in SIA summaries only. Report, block, leave, and invite controls are in settings.
              </p>
            </div>
          </div>
        </section>

        <section className="mt-5 space-y-3">
          <div className="max-w-[86%] rounded-xl rounded-bl-sm bg-ink-brown-800 p-3 text-[13px] leading-[18px] text-white/70">
            Welcome to {room.name}. Share one mission update or ask the room for support.
          </div>
          <div className="ml-auto max-w-[86%] rounded-xl rounded-br-sm bg-brand-orange p-3 text-[13px] font-semibold leading-[18px] text-white">
            I am joining privately first.
          </div>
        </section>

        <div className="mt-5 grid grid-cols-2 gap-2">
          <button type="button" onClick={onInvite} className="flex h-11 items-center justify-center gap-2 rounded-pill bg-brand-orange text-[15px] font-semibold leading-5 text-white">
            <UserPlus size={16} strokeWidth={2.2} />
            Invite
          </button>
          <button type="button" onClick={onSettings} className="h-11 rounded-pill border border-white/10 text-[15px] font-semibold leading-5 text-white/70">
            Settings
          </button>
        </div>
        {status && <p className="mt-4 rounded-md bg-forest-green/10 p-3 text-[12px] font-semibold leading-4 text-forest-green" role="status">{status}</p>}
      </main>
    </ScreenShell>
  )
}

export default function CommunityScreen() {
  const [rooms, setRooms] = useState<CommunityRoom[]>(initialRooms)
  const [activeRoom, setActiveRoom] = useState<CommunityRoom | null>(null)
  const [previewRoom, setPreviewRoom] = useState<DiscoverRoom | null>(null)
  const [previewSettings, setPreviewSettings] = useState(false)
  const [createOpen, setCreateOpen] = useState(false)
  const [settingsOpen, setSettingsOpen] = useState(false)
  const [inviteOpen, setInviteOpen] = useState(false)
  const [status, setStatus] = useState('')

  const joinRoom = (room: DiscoverRoom) => {
    const joinedRoom = rooms.find((item) => item.id === room.id) ?? roomFromDiscover(room)
    setRooms((items) => items.some((item) => item.id === joinedRoom.id) ? items : [joinedRoom, ...items])
    setPreviewRoom(null)
    setPreviewSettings(false)
    setActiveRoom(joinedRoom)
    setStatus(`Joined ${joinedRoom.name}. Private visibility is active.`)
  }

  const createPrivateRoom = () => {
    const createdRoom: CommunityRoom = {
      id: 'private-habit-pod',
      name: 'Private habit pod',
      members: 1,
      lastMessage: 'Invite members when you are ready.',
      timestamp: 'now',
      unread: 0,
      initials: 'P',
      domain: 'wellbeing',
      active: true,
    }
    setRooms((items) => [createdRoom, ...items])
    setCreateOpen(false)
    setActiveRoom(createdRoom)
    setInviteOpen(true)
    setStatus('Private habit pod created. Invitees are required before anyone can join.')
  }

  if (activeRoom) {
    return (
      <PhoneFrame>
        <RoomInterior
          room={activeRoom}
          status={status}
          onBack={() => {
            setActiveRoom(null)
            setStatus('')
          }}
          onInvite={() => setInviteOpen(true)}
          onSettings={() => setSettingsOpen(true)}
        />
        {settingsOpen && (
          <PhoneModalLayer>
            <BottomSheet title="Room settings" onClose={() => setSettingsOpen(false)} closeLabel="Close room settings" variant="modal" contentClassName="px-4 pb-1 pt-1">
              <div className="space-y-3">
                <div className="rounded-md bg-white/[0.04] p-3 text-[13px] leading-[18px] text-white/60">
                  Visibility is private invite-only. SIA summaries stay off unless each member opts in.
                </div>
                <button type="button" onClick={() => setStatus(`Report submitted for ${activeRoom.name}. Moderation review started.`)} className="h-11 w-full rounded-pill border border-white/10 text-[15px] font-semibold leading-5 text-white/70">
                  Report room
                </button>
                <button type="button" onClick={() => setStatus('Member blocked. Their posts are hidden from this room.')} className="h-11 w-full rounded-pill border border-error-red/30 text-[15px] font-semibold leading-5 text-error-red">
                  Block member
                </button>
                <button type="button" onClick={() => { setSettingsOpen(false); setActiveRoom(null); setStatus('Left room. You can rejoin by invitation.') }} className="h-11 w-full rounded-pill bg-ink-700 text-[15px] font-semibold leading-5 text-white/70">
                  Leave room
                </button>
              </div>
            </BottomSheet>
          </PhoneModalLayer>
        )}
        {inviteOpen && (
          <PhoneModalLayer>
            <BottomSheet title="Invite members" onClose={() => setInviteOpen(false)} closeLabel="Close invite members" variant="modal" contentClassName="px-4 pb-1 pt-1">
              <div className="space-y-3">
                <p className="rounded-md bg-white/[0.04] p-3 text-[13px] leading-[18px] text-white/60">
                  Invites show room name, member count, and privacy rules. No health or SIA summaries are shared in the invite.
                </p>
                <button type="button" onClick={() => setStatus(`Invite link prepared for ${activeRoom.name}.`)} className="h-11 w-full rounded-pill bg-brand-orange text-[15px] font-semibold leading-5 text-white">
                  Prepare invite link
                </button>
              </div>
            </BottomSheet>
          </PhoneModalLayer>
        )}
      </PhoneFrame>
    )
  }

  return (
    <PhoneFrame>
      <ScreenShell header={<Header title="Community" showBack />} activeTab="me" bottomAction={<CreateRoomButton onClick={() => setCreateOpen(true)} />}>
        <main className="px-4 pb-6 pt-4">
          <DiscoverSection onOpen={(room) => { setPreviewRoom(room); setPreviewSettings(false) }} />
          <RoomsList rooms={rooms} onOpen={(room) => { setActiveRoom(room); setStatus('') }} />
        </main>

        {previewRoom && (
          <PhoneModalLayer>
            <BottomSheet title={previewSettings ? 'Room safety' : previewRoom.name} onClose={() => { setPreviewRoom(null); setPreviewSettings(false) }} closeLabel="Close room preview" variant="modal" contentClassName="px-4 pb-1 pt-1">
              {previewSettings ? (
                <div className="space-y-3">
                  <p className="rounded-md bg-white/[0.04] p-3 text-[13px] leading-[18px] text-white/60">
                    Private-first discovery. Report room, block member, leave room, and SIA-summary consent are available after joining.
                  </p>
                  <button type="button" onClick={() => setPreviewSettings(false)} className="h-11 w-full rounded-pill bg-brand-orange text-[15px] font-semibold leading-5 text-white">
                    Back to preview
                  </button>
                </div>
              ) : (
                <div className="space-y-3">
                  <p className="rounded-md bg-white/[0.04] p-3 text-[13px] leading-[18px] text-white/60">
                    {previewRoom.members} members. You join privately first; members see your name, posts, and opted-in SIA summaries only.
                  </p>
                  <div className="grid grid-cols-2 gap-2">
                    <button type="button" onClick={() => joinRoom(previewRoom)} className="h-11 rounded-pill bg-brand-orange text-[15px] font-semibold leading-5 text-white">Join</button>
                    <button type="button" onClick={() => setPreviewSettings(true)} className="h-11 rounded-pill border border-white/10 text-[15px] font-semibold leading-5 text-white/70">Settings</button>
                  </div>
                </div>
              )}
            </BottomSheet>
          </PhoneModalLayer>
        )}

        {createOpen && (
          <PhoneModalLayer>
            <BottomSheet title="Create room" onClose={() => setCreateOpen(false)} closeLabel="Cancel create room" variant="modal" contentClassName="px-4 pb-1 pt-1">
              <div className="space-y-3">
                <p className="rounded-md bg-white/[0.04] p-3 text-[13px] leading-[18px] text-white/60">
                  New rooms default to private. Choose invitees before any SIA summary or public discovery.
                </p>
                <button type="button" onClick={createPrivateRoom} className="min-h-11 w-full rounded-md border border-brand-orange bg-brand-orange/10 px-4 text-left text-[15px] font-semibold leading-5 text-white">
                  Private habit pod
                </button>
                <button type="button" disabled aria-disabled="true" className="min-h-11 w-full rounded-md border border-white/10 bg-ink-900 px-4 text-left text-[15px] font-semibold leading-5 text-white/35">
                  Public topic room unavailable
                </button>
                <p className="text-[12px] leading-4 text-white/45">Public rooms wait until wider moderation, report, block, and visibility controls are live.</p>
              </div>
            </BottomSheet>
          </PhoneModalLayer>
        )}
      </ScreenShell>
    </PhoneFrame>
  )
}
