'use client'

import { useState } from 'react'
import { Eye, Flag, MessageCircle, Shield, UserPlus, Users, X } from 'lucide-react'
import { Button } from '@/components/design-system/Button'
import { DomainTag } from '@/components/design-system/DomainTag'
import { Header } from '@/components/layout/Header'
import { PhoneFrame } from '@/components/layout/PhoneFrame'
import { ScreenShell } from '@/components/layout/ScreenShell'
import { ConversationAvatar, SignalPill } from '@/components/screens/ConversationSuite'
import { SectionHeader } from '@/components/screens/SectionHeader'

// Screen 83 of 90: Social buddy profile

const sharedMissions = [
  { name: 'Run a half marathon', progress: 68, domain: 'fitness' as const },
  { name: 'Read 2 books this month', progress: 35, domain: 'learning' as const },
]

function BuddyHero({ onAvatar }: { onAvatar: () => void }) {
  return (
    <section className="animate-fade-up rounded-xl border border-domain-relationships/25 bg-[linear-gradient(145deg,rgba(236,72,153,0.16),rgba(33,16,8,0.96)_64%)] p-5 text-center shadow-2">
      <button type="button" onClick={onAvatar} className="mx-auto flex h-24 w-24 items-center justify-center rounded-full">
        <ConversationAvatar initials="AK" domain="relationships" active size="large" />
      </button>
      <h2 className="mt-4 text-[22px] font-semibold leading-[28px] text-white">Aisha Khan</h2>
      <p className="mt-2 text-[13px] leading-[19px] text-white/55">Running partner, accountability buddy, 12 shared check-ins.</p>
      <div className="mt-4 flex justify-center gap-2">
        <SignalPill tone="green">Trusted</SignalPill>
        <SignalPill tone="purple">SIA-assisted</SignalPill>
      </div>
    </section>
  )
}

function BottomAction({ onPrivacy, onMessage }: { onPrivacy: () => void; onMessage: () => void }) {
  return (
    <div className="grid grid-cols-2 gap-2">
      <Button variant="ghost" onClick={onPrivacy} leftIcon={<Shield size={16} strokeWidth={2.2} />}>
        Privacy
      </Button>
      <Button onClick={onMessage} leftIcon={<MessageCircle size={16} strokeWidth={2.2} />}>
        Message
      </Button>
    </div>
  )
}

export default function SocialBuddyScreen() {
  const [sheet, setSheet] = useState<'none' | 'privacy' | 'message' | 'invite' | 'avatar' | 'report' | 'mission'>('none')

  return (
    <PhoneFrame>
      <ScreenShell header={<Header title="Buddy profile" showBack />} activeTab="me" bottomAction={<BottomAction onPrivacy={() => setSheet('privacy')} onMessage={() => setSheet('message')} />}>
        <main className="space-y-5 px-4 pb-6 pt-4">
          <BuddyHero onAvatar={() => setSheet('avatar')} />
          <section>
            <SectionHeader title="Shared missions" />
            <div className="space-y-3">
              {sharedMissions.map((mission) => (
                <button type="button" key={mission.name} onClick={() => setSheet('mission')} className="w-full rounded-lg border border-white/[0.06] bg-ink-brown-800 p-4 text-left shadow-1">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <h2 className="text-[15px] font-semibold leading-5 text-white">{mission.name}</h2>
                      <div className="mt-2">
                        <DomainTag domain={mission.domain} />
                      </div>
                    </div>
                    <span className="text-[15px] font-semibold leading-5 text-white">{mission.progress}%</span>
                  </div>
                  <div className="mt-3 h-2 overflow-hidden rounded-pill bg-white/[0.08]" role="progressbar" aria-label={`${mission.name} progress`} aria-valuemin={0} aria-valuemax={100} aria-valuenow={mission.progress}>
                    <div className="h-full rounded-pill bg-domain-relationships" style={{ width: `${mission.progress}%` }} />
                  </div>
                </button>
              ))}
            </div>
          </section>
          <section className="rounded-lg border border-white/[0.06] bg-white/[0.04] p-4">
            <div className="flex items-center gap-2 text-white">
              <Users size={17} strokeWidth={2} />
              <h2 className="text-[15px] font-semibold leading-5">Network controls</h2>
            </div>
            <p className="mt-2 text-[13px] leading-[19px] text-white/50">Follow requests, buddy permissions, and report controls stay one tap away.</p>
            <div className="mt-4 grid grid-cols-2 gap-2">
              <Button className="min-h-11" size="compact" variant="ghost" onClick={() => setSheet('invite')} leftIcon={<UserPlus size={15} strokeWidth={2} />}>
                Invite buddy
              </Button>
              <Button className="min-h-11" size="compact" variant="ghost" onClick={() => setSheet('report')} leftIcon={<Flag size={15} strokeWidth={2} />}>
                Report
              </Button>
            </div>
          </section>
          {sheet !== 'none' && (
            <section className="rounded-lg border border-domain-relationships/25 bg-ink-brown-800 p-4" role="dialog" aria-label="Buddy action">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <h2 className="text-[15px] font-semibold leading-5 text-white">
                    {sheet === 'privacy' && 'Buddy privacy'}
                    {sheet === 'message' && 'Opening direct chat'}
                    {sheet === 'invite' && 'Invite buddy'}
                    {sheet === 'avatar' && 'Profile preview'}
                    {sheet === 'report' && 'Report or block'}
                    {sheet === 'mission' && 'Shared mission detail'}
                  </h2>
                  <p className="mt-1 text-caption leading-[18px] text-white/60">
                    {sheet === 'privacy' && 'Visible to Aisha: shared mission progress, opted-in proof, and check-in status. SIA assistance requires explicit read consent.'}
                    {sheet === 'message' && 'Direct chat route prepared: /tabs/sia/direct. Message history respects buddy visibility settings.'}
                    {sheet === 'invite' && 'Choose a contact and preview exactly what data the invite will request.'}
                    {sheet === 'avatar' && 'Aisha Khan, trusted running partner. Tap privacy to adjust shared categories.'}
                    {sheet === 'report' && 'Report, block, and remove buddy controls are available before any future interaction.'}
                    {sheet === 'mission' && 'Mission detail opens with shared progress only; private notes and SIA chats stay hidden.'}
                  </p>
                </div>
                <button type="button" aria-label="Close buddy action" onClick={() => setSheet('none')} className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-white/45"><X size={17} /></button>
              </div>
              {sheet === 'privacy' && (
                <div className="mt-3 space-y-2 text-caption leading-[18px] text-white/60">
                  <label className="flex min-h-11 items-center gap-3"><input type="checkbox" defaultChecked /> <Eye size={14} /> Shared missions</label>
                  <label className="flex min-h-11 items-center gap-3"><input type="checkbox" defaultChecked /> Accountability proof</label>
                  <label className="flex min-h-11 items-center gap-3"><input type="checkbox" /> SIA can read this buddy thread</label>
                </div>
              )}
            </section>
          )}
        </main>
      </ScreenShell>
    </PhoneFrame>
  )
}
