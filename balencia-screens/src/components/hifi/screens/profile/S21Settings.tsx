import { ChevronRight, Globe, KeyRound, LogOut, Moon, PiggyBank, Plug, ShieldPlus, User } from 'lucide-react'
import { BtnSecondary, ComplianceFooter, HifiShell, Provenance, SafetyCard, SolidCard, TopBar } from '@/components/hifi/kit'

export function S21Settings() {
  return (
    <HifiShell
      header={<TopBar title="Settings" back />}
      activeTab="me"
    >
      <main className="space-y-5 px-4 pb-4 pt-3">
        
        <div className="flex flex-col gap-1 px-1">
          <h1 className="text-[28px] font-semibold leading-tight tracking-[-0.02em] text-white">
            Your <span className="text-emphasis">settings</span>
          </h1>
          <p className="text-sm text-white/45">Manage your account, CIA preferences, and privacy.</p>
        </div>

        <section className="flex flex-col gap-3">
          <h2 className="px-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-white/45">Account</h2>
          <SolidCard>
            <div className="flex flex-col">
              <button type="button" className="flex w-full items-center justify-between gap-3 px-4 py-3.5 min-h-[44px] border-b border-white/[0.06]">
                <div className="flex items-center gap-3 text-left">
                  <User className="h-5 w-5 text-white/50" aria-hidden="true" />
                  <span className="text-[15px] text-white/90">Amira · Lv 12</span>
                </div>
                <ChevronRight className="h-5 w-5 text-white/30" aria-hidden="true" />
              </button>
              <button type="button" className="flex w-full items-center justify-between gap-3 px-4 py-3.5 min-h-[44px] border-b border-white/[0.06]">
                <div className="flex items-center gap-3 text-left">
                  <span className="text-[15px] text-white/90 tabular-nums">Signed in as amira@balencia.app</span>
                </div>
                <ChevronRight className="h-5 w-5 text-white/30" aria-hidden="true" />
              </button>
              <button type="button" className="flex w-full items-center justify-between gap-3 px-4 py-3.5 min-h-[44px] border-b border-white/[0.06]">
                <div className="flex items-center gap-3 text-left">
                  <KeyRound className="h-5 w-5 text-white/50" aria-hidden="true" />
                  <span className="text-[15px] text-white/90">Change password</span>
                </div>
                <ChevronRight className="h-5 w-5 text-white/30" aria-hidden="true" />
              </button>
              <button type="button" className="flex w-full items-center justify-between gap-3 px-4 py-3.5 min-h-[44px] border-b border-white/[0.06]">
                <div className="flex items-center gap-3 text-left">
                  <PiggyBank className="h-5 w-5 text-white/50" aria-hidden="true" />
                  <span className="text-[15px] text-white/90">Subscription & billing</span>
                </div>
                <ChevronRight className="h-5 w-5 text-white/30" aria-hidden="true" />
              </button>
              <button type="button" className="flex w-full items-center justify-between gap-3 px-4 py-3.5 min-h-[44px]">
                <div className="flex items-center gap-3 text-left">
                  <Plug className="h-5 w-5 text-white/50" aria-hidden="true" />
                  <span className="text-[15px] text-white/90">Connected services</span>
                </div>
                <ChevronRight className="h-5 w-5 text-white/30" aria-hidden="true" />
              </button>
            </div>
          </SolidCard>
        </section>

        <section className="flex flex-col gap-3">
          <h2 className="px-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-white/45">CIA preferences</h2>
          <SolidCard>
            <div className="flex flex-col">
              <button type="button" className="flex w-full items-center justify-between gap-3 px-4 py-3.5 min-h-[44px] border-b border-white/[0.06]">
                <div className="flex items-center gap-3 text-left">
                  <span className="text-[15px] text-white/90">Coaching style</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[15px] text-white/60">Supportive</span>
                  <ChevronRight className="h-5 w-5 text-white/30" aria-hidden="true" />
                </div>
              </button>
              <button type="button" className="flex w-full items-center justify-between gap-3 px-4 py-3.5 min-h-[44px] border-b border-white/[0.06]">
                <div className="flex items-center gap-3 text-left">
                  <span className="text-[15px] text-white/90">Formality</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[15px] text-white/60 tabular-nums">4 / 10</span>
                  <ChevronRight className="h-5 w-5 text-white/30" aria-hidden="true" />
                </div>
              </button>
              <button type="button" className="flex w-full items-center justify-between gap-3 px-4 py-3.5 min-h-[44px]">
                <div className="flex items-center gap-3 text-left">
                  <span className="text-[15px] text-white/90">Check-in times</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[15px] text-white/60 tabular-nums">8:00, 20:00</span>
                  <ChevronRight className="h-5 w-5 text-white/30" aria-hidden="true" />
                </div>
              </button>
            </div>
            <div className="border-t border-white/[0.06] px-4 py-3">
              <p className="text-[13px] italic text-white/50">Your coaching is built on what CIA learns from our conversations.</p>
            </div>
          </SolidCard>
        </section>

        <section className="flex flex-col gap-3">
          <h2 className="px-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-white/45">Appearance & locale</h2>
          <SolidCard>
            <div className="flex flex-col">
              <div className="flex w-full items-center justify-between gap-3 px-4 py-3.5 min-h-[44px] border-b border-white/[0.06]">
                <div className="flex items-center gap-3">
                  <Moon className="h-5 w-5 text-white/50" aria-hidden="true" />
                  <span className="text-[15px] text-white/90">Theme</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[15px] text-white/60">Dark</span>
                  <span className="rounded-full border border-white/10 bg-white/[0.04] px-2 py-0.5 text-[10px] uppercase tracking-wide text-white/40">Coming soon</span>
                </div>
              </div>
              <button type="button" className="flex w-full items-center justify-between gap-3 px-4 py-3.5 min-h-[44px] border-b border-white/[0.06]">
                <div className="flex items-center gap-3 text-left">
                  <Globe className="h-5 w-5 text-white/50" aria-hidden="true" />
                  <span className="text-[15px] text-white/90">Language</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[15px] text-white/60">English (US)</span>
                  <ChevronRight className="h-5 w-5 text-white/30" aria-hidden="true" />
                </div>
              </button>
              <button type="button" className="flex w-full items-center justify-between gap-3 px-4 py-3.5 min-h-[44px]">
                <div className="flex items-center gap-3 text-left">
                  <span className="text-[15px] text-white/90">Units</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[15px] text-white/60">Metric</span>
                  <ChevronRight className="h-5 w-5 text-white/30" aria-hidden="true" />
                </div>
              </button>
            </div>
          </SolidCard>
        </section>

        <section className="flex flex-col gap-3">
          <h2 className="px-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-white/45">Privacy & data</h2>
          <SolidCard>
            <div className="px-4 py-4 min-h-[44px]">
              <div className="flex items-center gap-2">
                <ShieldPlus className="h-4 w-4 text-white/50" aria-hidden="true" />
                <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-white/50">Data categories</span>
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                <Provenance items={['Source', 'Retention', 'Export', 'Revoke', 'Delete']} />
              </div>
              <button type="button" className="mt-4 w-full text-left text-[15px] text-white/90 min-h-[44px]">
                Manage data controls
              </button>
            </div>
          </SolidCard>
        </section>

        <section className="flex flex-col gap-3">
          <h2 className="px-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-white/45">Emergency</h2>
          <SafetyCard />
        </section>

        <div className="flex flex-col items-center gap-4 pt-2">
          <BtnSecondary aria-label="Sign out">
            <span className="flex items-center gap-2">
              <LogOut className="h-4 w-4" aria-hidden="true" />
              Sign out
            </span>
          </BtnSecondary>
          <ComplianceFooter />
        </div>

      </main>
    </HifiShell>
  )
}