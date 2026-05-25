import { PhoneFrame } from '@/components/layout/PhoneFrame'
import { ScreenShell } from '@/components/layout/ScreenShell'
import { BrandSymbol } from '@/components/design-system/BrandSymbol'
import { Button } from '@/components/design-system/Button'
import { Check, ChevronDown, MessageCircle } from 'lucide-react'

// Screen 03e of 78: WhatsApp enrollment
// Spec: /Users/hamza/yHealth/app_design 3/03e-whatsapp-enrollment.md

const values = ['Daily reminders', 'Check-in prompts', 'SIA coaching tips']

export default function WhatsappEnrollmentScreen() {
  return (
    <PhoneFrame>
      <ScreenShell showTabBar={false}>
        <div className="flex h-full flex-col px-6 pb-8">
          <div className="flex h-11 items-center justify-end">
            <button className="-mr-2 flex h-11 items-center px-2 text-[15px] leading-5 text-white/60 transition-colors duration-[var(--dur-fast)] hover:text-white">
              Skip
            </button>
          </div>

          <div className="mt-6 flex animate-fade-up justify-center">
            <BrandSymbol size={48} />
          </div>

          <div className="mt-8 animate-fade-up text-center" style={{ animationDelay: '80ms' }}>
            <div className="mx-auto mb-4 flex h-11 w-11 items-center justify-center rounded-xl border border-white/[0.06] bg-ink-brown-800 text-brand-orange shadow-1">
              <MessageCircle size={22} strokeWidth={1.8} />
            </div>
            <h1 className="text-[24px] font-bold leading-[30px] text-white">
              Get SIA on WhatsApp
            </h1>
            <p className="mx-auto mt-3 max-w-[270px] text-[15px] leading-[22px] text-white/50">
              Reminders, check-ins, and coaching tips - right in your chat.
            </p>
          </div>

          <div className="mt-8 flex animate-fade-up gap-2" style={{ animationDelay: '160ms' }}>
            <button className="flex h-[52px] w-[72px] shrink-0 items-center justify-center gap-1 rounded-md border border-white/10 bg-ink-brown-800 text-body text-white">
              +1
              <ChevronDown size={14} className="text-white/40" />
            </button>
            <div className="flex h-[52px] flex-1 items-center rounded-md border border-white/10 bg-ink-brown-800 px-4 text-body text-white/40">
              Phone number
            </div>
          </div>

          <div className="mt-6 animate-fade-up" style={{ animationDelay: '240ms' }}>
            <Button size="auth" fullWidth>
              Send code
            </Button>
          </div>

          <div className="mt-4 animate-fade-up space-y-2" style={{ animationDelay: '320ms' }}>
            {values.map((value) => (
              <div key={value} className="flex items-center gap-2 text-[14px] leading-5 text-white/50">
                <Check size={14} className="text-forest-green" strokeWidth={2.2} />
                <span>{value}</span>
              </div>
            ))}
          </div>

          <div className="flex-1" />
        </div>
      </ScreenShell>
    </PhoneFrame>
  )
}
