'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { BrandWordmark } from '@/components/design-system/BrandWordmark'
import { screens, sections } from '@/data/screens'

export function Sidebar() {
  const pathname = usePathname()

  const grouped: Record<string, typeof screens> = {}
  for (const screen of screens) {
    if (!grouped[screen.section]) grouped[screen.section] = []
    grouped[screen.section].push(screen)
  }

  return (
    <aside className="w-[260px] h-screen overflow-y-auto bg-ink-900 border-r border-white/5 py-6 px-4 flex-shrink-0 hide-scrollbar">
      <Link href="/" className="block mb-6">
        <BrandWordmark width={116} />
        <p className="text-[11px] text-white/40 mt-2">Visual prototype - {screens.length} screens</p>
      </Link>

      {sections.map(section => (
        <div key={section} className="mb-5">
          <h3 className="text-[11px] font-semibold text-white/40 uppercase tracking-wider mb-2 px-2">
            {section}
          </h3>
          <div className="flex flex-col gap-[2px]">
            {(grouped[section] || []).map(screen => {
              const isActive = pathname === screen.route
              return (
                <Link
                  key={screen.id}
                  href={screen.route}
                  className={`flex items-center gap-2 px-2 py-[6px] rounded-lg text-[13px] transition-colors ${
                    isActive
                      ? 'bg-brand-orange/15 text-brand-orange font-medium'
                      : 'text-white/60 hover:text-white/80 hover:bg-white/5'
                  }`}
                >
                  <span className="text-[11px] text-white/30 w-[28px] flex-shrink-0 font-mono">
                    {screen.number}
                  </span>
                  <span className="truncate">{screen.name}</span>
                </Link>
              )
            })}
          </div>
        </div>
      ))}
    </aside>
  )
}
