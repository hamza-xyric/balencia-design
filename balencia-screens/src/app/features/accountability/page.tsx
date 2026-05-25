import { AlertTriangle, ChevronRight, Plus, ShieldAlert, Users } from 'lucide-react'
import { Card } from '@/components/design-system/Card'
import { SegmentedControl } from '@/components/design-system/SegmentedControl'
import { Header } from '@/components/layout/Header'
import { PhoneFrame } from '@/components/layout/PhoneFrame'
import { ScreenShell } from '@/components/layout/ScreenShell'
import { SectionHeader } from '@/components/screens/SectionHeader'
import { accountability } from '@/data/mock'

// Screen 46 of 78: Accountability
// Spec: /Users/hamza/yHealth/app_design 3/46-accountability.md

const roleClasses: Record<string, string> = {
  coach: 'bg-brand-orange/15 text-brand-orange',
  buddy: 'bg-white/10 text-white/60',
  mentor: 'bg-domain-learning/15 text-domain-learning',
  family: 'bg-domain-relationships/15 text-domain-relationships',
}

function PermissionDot({ permission }: { permission: string }) {
  const color =
    permission === 'motivation' ? 'bg-forest-green' :
    permission === 'failure' ? 'bg-brand-orange' :
    'bg-error-red'

  return <span className={`h-1.5 w-1.5 rounded-full ${color}`} aria-hidden="true" />
}

function ConsentBanner() {
  if (accountability.consentConfigured) return null

  return (
    <Card className="border-l-[3px] border-l-brand-orange p-5 animate-fade-up">
      <div className="flex items-start gap-3">
        <AlertTriangle size={20} className="mt-0.5 shrink-0 text-brand-orange" strokeWidth={2.2} />
        <div className="min-w-0 flex-1">
          <h2 className="text-body font-semibold leading-[22px] text-white">Set up consent</h2>
          <p className="mt-1 text-[14px] leading-5 text-white/60">
            Configure what your partners can see before accountability features activate
          </p>
          <button type="button" className="mt-3 inline-flex h-8 items-center gap-1 text-[14px] font-semibold leading-5 text-brand-orange">
            Configure
            <ChevronRight size={14} strokeWidth={2.2} />
          </button>
        </div>
      </div>
    </Card>
  )
}

function PartnerRow({ partner, withDivider }: { partner: (typeof accountability.partners)[number]; withDivider?: boolean }) {
  return (
    <article
      className={[
        'min-h-[76px] px-4 py-3',
        withDivider ? 'border-t border-white/[0.05]' : '',
      ].filter(Boolean).join(' ')}
    >
      <div className="flex items-start gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-orange text-[15px] font-semibold text-white">
          {partner.initials}
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex min-w-0 items-center gap-2">
            <h2 className="truncate text-body font-semibold leading-[22px] text-white">{partner.name}</h2>
            <span className={`shrink-0 rounded-pill px-2 py-1 text-small font-semibold leading-3 ${roleClasses[partner.role]}`}>
              {partner.role}
            </span>
          </div>
          <div className="mt-1 flex flex-wrap gap-x-2 gap-y-1">
            {partner.permissions.map((permission) => (
              <span key={permission} className="inline-flex items-center gap-1 text-small leading-[14px] text-white/40">
                <PermissionDot permission={permission} />
                {permission}
              </span>
            ))}
          </div>
          {partner.emergency && (
            <div className="mt-1 inline-flex items-center gap-1 text-small font-semibold leading-[14px] text-error-red">
              <ShieldAlert size={12} strokeWidth={2.2} />
              Emergency contact
            </div>
          )}
        </div>
      </div>
    </article>
  )
}

function PartnersSection() {
  return (
    <section className="mt-4 animate-fade-up" style={{ animationDelay: '160ms' }}>
      <SectionHeader title="Partners" className="px-1" />
      <Card variant="small" className="rounded-lg p-0">
        {accountability.partners.map((partner, index) => (
          <PartnerRow key={partner.id} partner={partner} withDivider={index > 0} />
        ))}
      </Card>
    </section>
  )
}

function AddPartnerButton() {
  return (
    <button
      type="button"
      className="mt-4 flex h-12 w-full items-center justify-center gap-2 rounded-md border border-dashed border-white/10 bg-ink-brown-800 text-[15px] font-semibold leading-5 text-brand-orange transition-transform duration-[var(--dur-fast)] active:scale-[0.98] animate-fade-up"
      style={{ animationDelay: '240ms' }}
    >
      <Plus size={16} strokeWidth={2.4} />
      <span>Add partner</span>
    </button>
  )
}

function GroupsSection() {
  return (
    <section className="mt-6 animate-fade-up" style={{ animationDelay: '320ms' }}>
      <SectionHeader title="Groups" className="px-1" />
      <Card variant="small" className="rounded-lg p-0">
        {accountability.groups.map((group, index) => (
          <article
            key={group.id}
            className={[
              'px-4 py-4',
              index > 0 ? 'border-t border-white/[0.05]' : '',
            ].filter(Boolean).join(' ')}
          >
            <div className="flex items-center gap-2">
              <ChevronRight size={14} className={group.expanded ? 'rotate-90 text-white/50' : 'text-white/40'} strokeWidth={2.2} />
              <h2 className="text-[15px] font-semibold leading-5 text-white">{group.name}</h2>
              <span className="text-caption leading-[18px] text-white/40">({group.count})</span>
            </div>
            {group.expanded && (
              <div className="mt-4 flex items-center justify-between gap-3">
                <div className="flex -space-x-2">
                  {group.members.map((member) => (
                    <span
                      key={member}
                      className="flex h-8 w-8 items-center justify-center rounded-full border border-ink-brown-800 bg-white/10 text-small font-semibold text-white"
                    >
                      {member.slice(0, 1)}
                    </span>
                  ))}
                </div>
                <button type="button" className="text-caption font-semibold leading-[18px] text-brand-orange">Manage</button>
              </div>
            )}
          </article>
        ))}
      </Card>
    </section>
  )
}

function EmergencySection() {
  return (
    <section className="mt-6 animate-fade-up" style={{ animationDelay: '400ms' }}>
      <SectionHeader title="Emergency contacts" className="px-1" />
      {accountability.emergencyContacts.map((contact) => (
        <Card key={contact.id} variant="small" className="rounded-md border-l-[3px] border-l-error-red p-4">
          <div className="flex items-start gap-3">
            <ShieldAlert size={20} className="mt-0.5 shrink-0 text-error-red" strokeWidth={2.2} />
            <div className="min-w-0">
              <h2 className="text-[15px] font-semibold leading-5 text-white">{contact.name}</h2>
              <p className="mt-1 text-caption leading-[18px] text-white/50">{contact.rule}</p>
              <p className="mt-1 truncate text-small leading-[14px] text-white/35">{contact.message}</p>
            </div>
          </div>
        </Card>
      ))}
    </section>
  )
}

function PlusContextStrip() {
  return (
    <Card variant="small" className="mt-6 rounded-md border-brand-orange/20 p-4 animate-fade-up" style={{ animationDelay: '480ms' }}>
      <div className="flex items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-orange/15 text-brand-orange">
          <Users size={18} strokeWidth={2.2} />
        </div>
        <div className="min-w-0 flex-1">
          <h2 className="text-[15px] font-semibold leading-5 text-white">Plus accountability</h2>
          <p className="mt-0.5 text-caption leading-[18px] text-white/50">Partners, contracts, triggers, and AI safety net controls</p>
        </div>
      </div>
    </Card>
  )
}

export default function AccountabilityScreen() {
  return (
    <PhoneFrame>
      <ScreenShell header={<Header title="Accountability" showBack />} activeTab="me">
        <main className="px-4 pb-20 pt-3">
          <ConsentBanner />

          <SegmentedControl
            options={[
              { label: 'Partners', value: 'partners' },
              { label: 'Contracts', value: 'contracts' },
              { label: 'Triggers', value: 'triggers' },
            ]}
            activeValue="partners"
            className="mt-4 animate-fade-up"
            size="md"
          />

          <PartnersSection />
          <AddPartnerButton />
          <GroupsSection />
          <EmergencySection />
          <PlusContextStrip />
        </main>
      </ScreenShell>
    </PhoneFrame>
  )
}
