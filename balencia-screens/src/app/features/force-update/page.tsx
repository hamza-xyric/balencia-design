import { ArrowUp, Circle } from 'lucide-react'
import { BrandSymbol } from '@/components/design-system/BrandSymbol'
import { BrandWordmark } from '@/components/design-system/BrandWordmark'
import { Button } from '@/components/design-system/Button'
import { Card } from '@/components/design-system/Card'
import { PhoneFrame } from '@/components/layout/PhoneFrame'
import { ScreenShell } from '@/components/layout/ScreenShell'
import { forceUpdate } from '@/data/mock'

// Screen 65 of 78: Force update
// Spec: /Users/hamza/yHealth/app_design 3/65-force-update.md

export default function ForceUpdateScreen() {
  return (
    <PhoneFrame>
      <ScreenShell showTabBar={false}>
        <main className="flex min-h-full flex-col px-6 pb-6 pt-12 text-center">
          <div className="mx-auto animate-fade-up">
            <BrandWordmark width={136} />
          </div>

          <div className="relative mx-auto mt-8 animate-fade-up" style={{ animationDelay: '80ms' }}>
            <BrandSymbol size={96} glow className="rounded-lg bg-ink-brown-800 shadow-2" />
            <span className="absolute -bottom-3 left-1/2 flex h-8 w-8 -translate-x-1/2 items-center justify-center rounded-full bg-brand-orange text-white shadow-2 shadow-brand-orange/30">
              <ArrowUp size={17} strokeWidth={2.4} />
            </span>
          </div>

          <section className="mt-10 animate-fade-up" style={{ animationDelay: '160ms' }}>
            <h1 className="text-[22px] font-bold leading-7 text-white">{forceUpdate.title}</h1>
            <p className="mx-auto mt-3 max-w-[270px] text-[15px] leading-[22px] text-white/60">{forceUpdate.subtitle}</p>
          </section>

          <Card className="mt-6 p-5 text-left animate-fade-up" style={{ animationDelay: '240ms' }}>
            <div className="text-eyebrow font-semibold uppercase leading-4 tracking-[0.12em] text-white/40">New in this version</div>
            <div className="mt-4 space-y-3">
              {forceUpdate.whatsNew.map((item) => (
                <div key={item} className="flex items-center gap-3 text-caption leading-[18px] text-white/70">
                  <Circle size={8} className="fill-brand-orange text-brand-orange" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </Card>

          <div className="flex-1" />

          <div className="animate-fade-up" style={{ animationDelay: '320ms' }}>
            <Button size="auth" fullWidth>Update now</Button>
            <p className="mt-4 text-small leading-[14px] text-white/30">
              {forceUpdate.currentVersion} -&gt; {forceUpdate.requiredVersion} required
            </p>
          </div>
        </main>
      </ScreenShell>
    </PhoneFrame>
  )
}
