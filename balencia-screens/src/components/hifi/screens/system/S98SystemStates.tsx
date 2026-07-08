import { CloudOff, Wrench, ShieldAlert, Lock, Sparkles, RefreshCw, Database, LifeBuoy } from 'lucide-react'
import {
  HifiShell,
  TopBar,
  GlassCard,
  SolidCard,
  SectionTitle,
  Chip,
  Provenance,
  BtnPrimary,
  BtnSecondary,
  BtnGhost,
  ComplianceFooter,
  ProgressRing
} from '@/components/hifi/kit'

export function S98SystemStates() {
  return (
    <HifiShell
      header={
        <TopBar
          title="System States"
          eyebrow="Balencia"
          right={
            <button type="button" aria-label="Support" className="flex h-11 w-11 items-center justify-center text-white/60 transition-colors hover:text-white">
              <LifeBuoy className="h-5 w-5" />
            </button>
          }
        />
      }
      showTabBar={false}
    >
      <main className="hide-scrollbar space-y-5 px-4 pb-6 pt-3">
        <p className="px-1 text-[15px] leading-relaxed text-white/60">
          Reusable utility treatments for connection, access, and release <span className="text-emphasis">states</span>.
        </p>

        <section className="space-y-3">
          <SectionTitle title="Offline Banner" meta="/offline" />
          <GlassCard tone="you">
            <div className="flex items-start gap-3">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-orange/15 text-brand-orange">
                <CloudOff className="h-5 w-5" />
              </div>
              <div className="flex-1 space-y-1">
                <h3 className="text-[15px] font-semibold text-white">You&apos;re Offline</h3>
                <p className="text-[13px] leading-relaxed text-white/55">
                  Showing last sync from 2 hours ago.
                </p>
              </div>
            </div>
            <div className="pt-3">
              <Provenance items={['Cached dashboard', 'Stale health data']} />
            </div>
            <div className="flex gap-2 pt-4">
              <BtnPrimary>
                <span className="flex items-center gap-2">
                  <RefreshCw className="h-4 w-4" /> Retry Connection
                </span>
              </BtnPrimary>
              <BtnSecondary>View Cache</BtnSecondary>
            </div>
          </GlassCard>
        </section>

        <section className="space-y-3">
          <SectionTitle title="Cached Snapshot" meta="Last safe data" />
          <SolidCard>
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-[13px] text-white/50">Today actions</p>
                <p className="text-[15px] font-medium text-white">Cached at 8:42 AM</p>
              </div>
              <Chip tone="muted">2h old</Chip>
            </div>
            <div className="flex items-center gap-4 pt-4">
              <ProgressRing percent={68} value="68%" size={72} tone="you" label="Run mission" />
              <div className="flex-1 space-y-3">
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-[12px]">
                    <span className="text-white/60">Steps</span>
                    <span className="tabular-nums text-white/80">8.2k</span>
                  </div>
                  <div className="skeleton-block h-4 w-3/4" />
                </div>
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-[12px]">
                    <span className="text-white/60">Sleep</span>
                    <span className="tabular-nums text-white/80">7.5h</span>
                  </div>
                  <div className="skeleton-block h-4 w-3/4" />
                </div>
              </div>
            </div>
            <div className="pt-3">
              <Provenance items={['Local cache']} />
            </div>
          </SolidCard>
        </section>

        <section className="space-y-3">
          <SectionTitle title="Error State" meta="/unauthorized" />
          <GlassCard tone="muted">
            <div className="flex items-start gap-3">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/5 text-white/70">
                <Lock className="h-5 w-5" />
              </div>
              <div className="flex-1 space-y-1">
                <h3 className="text-[15px] font-semibold text-white">Sign In Required</h3>
                <p className="text-[13px] leading-relaxed text-white/55">
                  Your session expired. Please sign in again to continue your missions.
                </p>
              </div>
            </div>
            <div className="pt-4">
              <BtnPrimary>Sign In</BtnPrimary>
            </div>
          </GlassCard>
        </section>

        <section className="space-y-3">
          <SectionTitle title="Empty State" meta="/forbidden" />
          <GlassCard tone="muted">
            <div className="flex items-start gap-3">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/5 text-white/70">
                <ShieldAlert className="h-5 w-5" />
              </div>
              <div className="flex-1 space-y-1">
                <h3 className="text-[15px] font-semibold text-white">Permission Needed</h3>
                <p className="text-[13px] leading-relaxed text-white/55">
                  Not enough access yet. Your current role does not include this view.
                </p>
              </div>
            </div>
            <div className="flex gap-2 pt-4">
              <BtnSecondary>Request Access</BtnSecondary>
              <BtnGhost quiet>Go Home</BtnGhost>
            </div>
          </GlassCard>
        </section>

        <section className="space-y-3">
          <SectionTitle title="Skeleton State" meta="Loading cache" />
          <SolidCard>
            <div className="flex items-center justify-between">
              <p className="text-[13px] text-white/50">Synthesis status</p>
              <Chip tone="muted">Checking</Chip>
            </div>
            <div className="space-y-3 pt-4">
              <div className="h-3 w-3/4 rounded-full bg-white/[0.06]" />
              <div className="h-3 w-1/2 rounded-full bg-white/[0.06]" />
              <div className="h-3 w-2/3 rounded-full bg-white/[0.06]" />
            </div>
          </SolidCard>
        </section>

        <section className="space-y-3">
          <SectionTitle title="Maintenance" meta="/maintenance" />
          <GlassCard tone="cia">
            <div className="flex items-start gap-3">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-royal-purple/15 text-royal-purple">
                <Wrench className="h-5 w-5" />
              </div>
              <div className="flex-1 space-y-1">
                <h3 className="text-[15px] font-semibold text-white">Scheduled Maintenance</h3>
                <p className="text-[13px] leading-relaxed text-white/55">
                  Balencia is undergoing scheduled maintenance. No service window published yet.
                </p>
              </div>
            </div>
            <div className="pt-3">
              <Provenance items={['Status page', 'No ETA promised']} />
            </div>
            <div className="pt-4">
              <BtnSecondary>
                <span className="flex items-center gap-2">
                  <Database className="h-4 w-4" /> View Status
                </span>
              </BtnSecondary>
            </div>
          </GlassCard>
        </section>

        <section className="space-y-3">
          <SectionTitle title="Coming Soon" meta="/coming-soon" />
          <GlassCard tone="cia">
            <div className="flex items-start gap-3">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-royal-purple/15 text-royal-purple">
                <Sparkles className="h-5 w-5" />
              </div>
              <div className="flex-1 space-y-1">
                <h3 className="text-[15px] font-semibold text-white">Feature Not Released</h3>
                <p className="text-[13px] leading-relaxed text-white/55">
                  This module is in development. Check mission notes for updates from Amira&apos;s buddy, Aisha Khan.
                </p>
              </div>
            </div>
            <div className="pt-4">
              <BtnGhost>Notify Me</BtnGhost>
            </div>
          </GlassCard>
        </section>

        <ComplianceFooter />
      </main>
    </HifiShell>
  )
}