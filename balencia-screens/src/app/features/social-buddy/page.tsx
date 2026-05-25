import { MessageCircle, Shield, UserPlus, Users } from 'lucide-react'
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

function BuddyHero() {
  return (
    <section className="animate-fade-up rounded-xl border border-domain-relationships/25 bg-[linear-gradient(145deg,rgba(236,72,153,0.16),rgba(33,16,8,0.96)_64%)] p-5 text-center shadow-2">
      <div className="flex justify-center">
        <ConversationAvatar initials="AK" domain="relationships" active size="large" />
      </div>
      <h2 className="mt-4 text-[22px] font-semibold leading-[28px] text-white">Aisha Khan</h2>
      <p className="mt-2 text-[13px] leading-[19px] text-white/55">Running partner, accountability buddy, 12 shared check-ins.</p>
      <div className="mt-4 flex justify-center gap-2">
        <SignalPill tone="green">Trusted</SignalPill>
        <SignalPill tone="purple">SIA-assisted</SignalPill>
      </div>
    </section>
  )
}

function BottomAction() {
  return (
    <div className="grid grid-cols-2 gap-2">
      <Button variant="ghost" leftIcon={<Shield size={16} strokeWidth={2.2} />}>
        Privacy
      </Button>
      <Button leftIcon={<MessageCircle size={16} strokeWidth={2.2} />}>
        Message
      </Button>
    </div>
  )
}

export default function SocialBuddyScreen() {
  return (
    <PhoneFrame>
      <ScreenShell header={<Header title="Buddy profile" showBack />} activeTab="me" bottomAction={<BottomAction />}>
        <main className="space-y-5 px-4 pb-6 pt-4">
          <BuddyHero />
          <section>
            <SectionHeader title="Shared missions" />
            <div className="space-y-3">
              {sharedMissions.map((mission) => (
                <div key={mission.name} className="rounded-lg border border-white/[0.06] bg-ink-brown-800 p-4 shadow-1">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <h2 className="text-[15px] font-semibold leading-5 text-white">{mission.name}</h2>
                      <div className="mt-2">
                        <DomainTag domain={mission.domain} />
                      </div>
                    </div>
                    <span className="text-[15px] font-semibold leading-5 text-white">{mission.progress}%</span>
                  </div>
                  <div className="mt-3 h-2 overflow-hidden rounded-pill bg-white/[0.08]">
                    <div className="h-full rounded-pill bg-domain-relationships" style={{ width: `${mission.progress}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </section>
          <section className="rounded-lg border border-white/[0.06] bg-white/[0.04] p-4">
            <div className="flex items-center gap-2 text-white">
              <Users size={17} strokeWidth={2} />
              <h2 className="text-[15px] font-semibold leading-5">Network controls</h2>
            </div>
            <p className="mt-2 text-[13px] leading-[19px] text-white/50">Follow requests, buddy permissions, and report controls stay one tap away.</p>
            <Button className="mt-4" size="compact" variant="ghost" leftIcon={<UserPlus size={15} strokeWidth={2} />}>
              Invite buddy
            </Button>
          </section>
        </main>
      </ScreenShell>
    </PhoneFrame>
  )
}
