import { ArrowUpRight, Ban, Bell, MessageSquare, MoreHorizontal, Phone, RefreshCw, ShieldCheck, Trash2 } from 'lucide-react'
import {
  BtnGhost,
  BtnPrimary,
  BtnSecondary,
  CIAInsightCard,
  Chip,
  ComplianceFooter,
  GlassCard,
  HifiShell,
  IconButton,
  Provenance,
  SectionTitle,
  SolidCard,
  TopBar,
} from '@/components/hifi/kit'

// Integration hub, chosen state: linked and active — richest composition,
// enrollment consented via 03e, sync current, both channel actions
// available, and full revoke/delete consent controls reachable. Skeleton
// (masked number, sync, and rows shimmer without fake content), honest-null
// (not enrolled, enrollment CTA offered instead), disabled (open thread,
// composer, and resume dim to 40% with a reason when revoked, outside the
// message window, or offline), and error (sync failure keeps linked status,
// retry labeled) are documented in the source spec rather than duplicated
// here — static prototype, no handlers. One Tiempos emphasis word: "inbox".
function MessageRow({
  icon,
  title,
  meta,
  status,
}: {
  icon: React.ReactNode
  title: string
  meta: string
  status: { label: string; tone: 'you' | 'done' | 'cia' | 'muted' }
}) {
  return (
    <div className="flex min-h-11 items-center justify-between gap-3 px-4 py-2.5">
      <div className="flex min-w-0 items-center gap-3">
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-white/[0.06] bg-white/[0.04] text-white/60">
          {icon}
        </span>
        <div className="min-w-0">
          <p className="truncate text-[13px] text-white/85">{title}</p>
          <p className="mt-0.5 text-[11px] tabular-nums text-white/40">{meta}</p>
        </div>
      </div>
      <Chip tone={status.tone}>{status.label}</Chip>
    </div>
  )
}

export function S99WhatsappInbox() {
  return (
    <HifiShell
      atmosphere="cia"
      activeTab="cia"
      header={
        <TopBar
          title={
            <>
              WhatsApp <span className="text-emphasis">inbox</span>
            </>
          }
          right={
            <div className="flex items-center gap-1.5">
              <span className="flex h-9 items-center gap-1.5 rounded-pill border border-white/10 bg-white/[0.04] px-2.5 text-[11px] tabular-nums text-white/60">
                <RefreshCw className="h-3 w-3 text-forest-green" strokeWidth={2} />
                Synced 12 min ago
              </span>
              <IconButton label="Settings and privacy">
                <MoreHorizontal className="h-5 w-5" strokeWidth={1.9} />
              </IconButton>
            </div>
          }
        />
      }
    >
      <main className="space-y-4 px-4 pb-4 pt-3">
        <GlassCard tone="cia">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-brand-orange">
                <Phone className="h-4 w-4" strokeWidth={1.9} />
              </span>
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-wider text-white/40">Linked number</p>
                <p className="mt-0.5 font-mono text-[15px] tabular-nums text-white">+92 *** 4821</p>
              </div>
            </div>
            <Chip tone="done">Active</Chip>
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            <Chip tone="cia">
              <ShieldCheck className="mr-1 h-3 w-3" strokeWidth={2} />
              Enrolled via 03e
            </Chip>
            <Provenance items={['Verified 2 days ago']} />
          </div>

          <div className="mt-4 flex items-center justify-between border-t border-white/10 pt-3">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-wider text-white/40">Last sync</p>
              <p className="mt-0.5 text-[13px] tabular-nums text-white/70">12 minutes ago</p>
            </div>
            <BtnGhost quiet>Manage WhatsApp</BtnGhost>
          </div>
        </GlassCard>

        <div>
          <SectionTitle title="Inbox preview" meta="3 recent" />
          <SolidCard className="mt-2 divide-y divide-white/[0.04] p-0">
            <MessageRow
              icon={<MessageSquare className="h-3.5 w-3.5" strokeWidth={1.9} />}
              title="Meal photo received"
              meta="Today, 1:42 pm"
              status={{ label: 'Delivered', tone: 'muted' }}
            />
            <MessageRow
              icon={<ArrowUpRight className="h-3.5 w-3.5" strokeWidth={1.9} />}
              title="Plan nudge sent"
              meta="Today, 9:15 am"
              status={{ label: 'Read', tone: 'done' }}
            />
            <MessageRow
              icon={<Bell className="h-3.5 w-3.5" strokeWidth={1.9} />}
              title="Evening check-in template"
              meta="Scheduled, 8:00 pm"
              status={{ label: 'Template', tone: 'cia' }}
            />
          </SolidCard>
        </div>

        <div className="grid grid-cols-2 gap-2.5">
          <BtnPrimary>
            <MessageSquare className="h-4 w-4" strokeWidth={1.9} />
            Open WhatsApp thread
          </BtnPrimary>
          <BtnSecondary>Resume CIA</BtnSecondary>
        </div>

        <GlassCard tone="muted">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <h2 className="text-[15px] font-semibold text-white">WhatsApp data use</h2>
              <p className="mt-1 text-[12px] leading-relaxed text-white/55">
                CIA keeps context only while linked. Replies stay open for 24 hours after the last inbound message, and inbound
                crisis language stays private in-app unless you choose to write it back.
              </p>
            </div>
            <ShieldCheck className="h-5 w-5 shrink-0 text-white/30" strokeWidth={1.9} />
          </div>

          <div className="mt-4 grid grid-cols-2 gap-2.5">
            <div className="flex min-h-[52px] flex-col justify-center gap-0.5 rounded-xl border border-white/10 bg-white/[0.02] px-3 py-2">
              <span className="flex items-center gap-1.5 text-[13px] font-medium text-white/85">
                <Ban className="h-3.5 w-3.5 text-brand-orange" strokeWidth={1.9} />
                Revoke access
              </span>
              <span className="text-[10.5px] text-white/40">Unlinks your number</span>
            </div>
            <div className="flex min-h-[52px] flex-col justify-center gap-0.5 rounded-xl border border-white/10 bg-white/[0.02] px-3 py-2">
              <span className="flex items-center gap-1.5 text-[13px] font-medium text-white/85">
                <Trash2 className="h-3.5 w-3.5 text-brand-orange" strokeWidth={1.9} />
                Delete history
              </span>
              <span className="text-[10.5px] text-white/40">Cannot undo</span>
            </div>
          </div>
        </GlassCard>

        <CIAInsightCard eyebrow="CIA note" provenance={['WhatsApp opt-in', '03e verification']}>
          <p>CIA continues your coaching thread across WhatsApp and the app, only while enrollment stays active.</p>
        </CIAInsightCard>

        <ComplianceFooter links={['Data sources', 'Retention', 'Export']} />
      </main>
    </HifiShell>
  )
}
