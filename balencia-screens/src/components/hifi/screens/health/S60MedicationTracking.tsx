import { AlertCircle, Check, Lock, Plus, RefreshCw, ShieldCheck } from 'lucide-react'
import { HifiShell, TopBar, GlassCard, SolidCard, Chip, Provenance, ProgressRing, Sparkline, CIAInsightCard } from '@/components/hifi/kit'

export function S60MedicationTracking() {
  return (
    <HifiShell 
      header={
        <TopBar 
          title="Medication tracking"
          right={<button type="button" className="flex h-11 w-11 items-center justify-center text-white/70" aria-label="Add medication"><Plus size={22} /></button>}
        />
      } 
      activeTab="today" 
      showTabBar={false}
      atmosphere="you"
    >
      <main className="space-y-4 px-4 pb-6 pt-3">
        
        {/* Hero Focal Moment */}
        <GlassCard tone="you" className="relative overflow-hidden p-6">
          <div className="relative flex flex-col items-center text-center">
            <h2 className="text-[15px] font-medium text-white/60 mb-4">
              Daily <span className="text-emphasis">tracking</span>
            </h2>
            
            <div className="relative">
              <ProgressRing 
                percent={75} 
                value="75%" 
                label="3 of 4 doses today" 
                size={96} 
                tone="you"
              />
            </div>
            
            <div className="mt-5">
              <Provenance items={["You logged"]} />
            </div>
          </div>
        </GlassCard>

        {/* CIA Synthesis */}
        <CIAInsightCard 
          eyebrow="CIA coach"
          actions={
            <button type="button" className="text-xs text-royal-purple/80 hover:text-royal-purple flex items-center gap-1">
              <Lock size={10} />
              <span>Learn how CIA helps</span>
            </button>
          }
        >
          <p className="text-[15px] text-white/85 leading-snug">
            Today is a fresh start. Three of four doses done, no pressure on the last.
          </p>
        </CIAInsightCard>

        {/* Safety ListRow */}
        <SolidCard className="p-0 overflow-hidden">
          <div className="flex items-center gap-3 p-3.5 bg-white/[0.03] border-l-2 border-royal-purple/50">
            <ShieldCheck size={18} className="text-royal-purple/80 shrink-0" />
            <p className="text-[13px] text-white/80 leading-tight">
              Consult your doctor before changing dosages.
            </p>
          </div>
        </SolidCard>

        {/* Timeline Agenda */}
        <div className="space-y-1 pt-1">
          
          {/* Morning */}
          <div className="pt-3 pb-1">
            <h3 className="text-[11px] tracking-[0.12em] uppercase text-white/40 font-medium">Morning</h3>
          </div>
          
          <div className="relative pl-6">
            <div className="absolute left-[7px] top-4 bottom-4 w-px bg-gradient-to-b from-forest-green/50 via-forest-green/30 to-transparent" aria-hidden="true" />
            
            <div className="flex items-center gap-3 py-2.5 min-h-[44px]">
              <div className="absolute left-1.5 w-2 h-2 rounded-full bg-forest-green ring-2 ring-forest-green/20" />
              <div className="h-5 w-5 rounded-full bg-forest-green/20 flex items-center justify-center shrink-0">
                <Check size={12} className="text-forest-green" />
              </div>
              <div className="flex-1 flex justify-between items-baseline">
                <span className="text-[15px] text-white/90">Vitamin D</span>
                <span className="text-[11px] text-white/40 tabular-nums">500mg · 08:12 AM</span>
              </div>
            </div>
            
            <div className="flex items-center gap-3 py-2.5 min-h-[44px]">
              <div className="absolute left-1.5 w-2 h-2 rounded-full bg-forest-green ring-2 ring-forest-green/20" />
              <div className="h-5 w-5 rounded-full bg-forest-green/20 flex items-center justify-center shrink-0">
                <Check size={12} className="text-forest-green" />
              </div>
              <div className="flex-1 flex justify-between items-baseline">
                <span className="text-[15px] text-white/90">Magnesium</span>
                <span className="text-[11px] text-white/40 tabular-nums">250mg · 08:12 AM</span>
              </div>
            </div>
          </div>

          {/* Afternoon */}
          <div className="pt-4 pb-1">
            <h3 className="text-[11px] tracking-[0.12em] uppercase text-white/40 font-medium">Afternoon</h3>
          </div>
          
          <div className="relative pl-6">
            <div className="absolute left-[7px] top-4 bottom-4 w-px bg-gradient-to-b from-royal-purple/50 via-royal-purple/30 to-transparent" aria-hidden="true" />
            
            <div className="flex items-center gap-3 py-2.5 min-h-[44px]">
              <div className="absolute left-1.5 w-2 h-2 rounded-full bg-royal-purple ring-2 ring-royal-purple/20" />
              <div className="h-5 w-5 rounded-full border border-white/20 flex items-center justify-center shrink-0" />
              <div className="flex-1 flex justify-between items-center">
                <div className="flex flex-col">
                  <span className="text-[15px] text-white/90">Adderall XR</span>
                  <span className="text-[11px] text-royal-purple/70">Take when ready</span>
                </div>
                <span className="text-[11px] text-white/40 tabular-nums">10mg · 01:00 PM</span>
              </div>
            </div>
          </div>

          {/* Evening */}
          <div className="pt-4 pb-1">
            <h3 className="text-[11px] tracking-[0.12em] uppercase text-white/40 font-medium">Evening</h3>
          </div>
          
          <div className="relative pl-6">
            <div className="absolute left-[7px] top-4 bottom-4 w-px bg-white/5" aria-hidden="true" />
            
            <div className="flex items-center gap-3 py-2.5 min-h-[44px]">
              <div className="absolute left-1.5 w-2 h-2 rounded-full bg-white/20" />
              <div className="h-5 w-5 rounded-full border border-white/20 flex items-center justify-center shrink-0" />
              <div className="flex-1 flex justify-between items-baseline">
                <span className="text-[15px] text-white/90">Melatonin</span>
                <span className="text-[11px] text-white/40 tabular-nums">3mg · 09:00 PM</span>
              </div>
            </div>
          </div>

        </div>

        {/* All Medications Roster */}
        <SolidCard className="p-5 space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-[15px] font-medium text-white/90">All medications</h3>
            <Chip tone="muted">3 listed</Chip>
          </div>
          
          <div className="space-y-3.5">
            <div className="flex items-center justify-between gap-3">
              <span className="text-[14px] text-white/80">Vitamin D</span>
              <div className="flex items-center gap-2">
                <div className="h-5 w-16 opacity-90"><Sparkline tone="you" /></div>
                <span className="text-[11px] text-white/50 tabular-nums w-8 text-right">92%</span>
              </div>
            </div>
            <div className="flex items-center justify-between gap-3">
              <span className="text-[14px] text-white/80">Magnesium</span>
              <div className="flex items-center gap-2">
                <div className="h-5 w-16 opacity-90"><Sparkline tone="you" /></div>
                <span className="text-[11px] text-white/50 tabular-nums w-8 text-right">88%</span>
              </div>
            </div>
            <div className="flex items-center justify-between gap-3">
              <span className="text-[14px] text-white/80">Adderall XR</span>
              <div className="flex items-center gap-2">
                <div className="h-5 w-16 opacity-90"><Sparkline tone="you" /></div>
                <span className="text-[11px] text-white/50 tabular-nums w-8 text-right">95%</span>
              </div>
            </div>
          </div>
          
          <div className="pt-1 border-t border-white/5">
            <Provenance items={["You logged"]} />
          </div>
        </SolidCard>

        {/* Adherence History Heatmap */}
        <SolidCard className="p-5 space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-[15px] font-medium text-white/90">Adherence history</h3>
            <Chip tone="muted">4 weeks</Chip>
          </div>
          
          {/* Error State Implementation */}
          <div className="flex flex-col items-center justify-center py-6 gap-3 bg-white/[0.02] rounded-xl border border-white/5">
            <AlertCircle size={20} className="text-royal-purple/70" />
            <p className="text-[13px] text-white/70 text-center px-4">Could not load adherence chart</p>
            <button type="button" className="text-[12px] text-royal-purple/80 hover:text-royal-purple flex items-center gap-1.5">
              <RefreshCw size={12} />
              <span>Tap to retry</span>
            </button>
          </div>
        </SolidCard>

        {/* Privacy Footer */}
        <div className="flex items-center justify-center gap-2 px-6 pt-2 pb-4">
          <ShieldCheck size={12} className="text-white/55 shrink-0" />
          <p className="text-[11px] text-white/55 text-center leading-tight tracking-wide">
            Medication data stays private. Source, retention, export, and delete live in settings.
          </p>
        </div>

      </main>
    </HifiShell>
  )
}