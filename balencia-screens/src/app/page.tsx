import Link from 'next/link'
import { BrandWordmark } from '@/components/design-system/BrandWordmark'
import { screens, sections } from '@/data/screens'

export default function ScreenIndex() {
  const grouped: Record<string, typeof screens> = {}
  for (const screen of screens) {
    if (!grouped[screen.section]) grouped[screen.section] = []
    grouped[screen.section].push(screen)
  }

  const total = screens.length
  const complete = screens.filter(s => s.status === 'complete').length

  return (
    <div className="w-full max-w-[1200px] mx-auto">
      {/* Header */}
      <div className="mb-12 text-center">
        <div className="flex justify-center">
          <BrandWordmark width={164} />
        </div>
        <p className="text-[20px] text-white/70 mt-2 font-normal">Visual prototype</p>
        <p className="text-[14px] text-white/40 mt-3">
          {complete} / {total} screens complete
        </p>
        <div className="w-[200px] h-[4px] bg-white/10 rounded-full mx-auto mt-3 overflow-hidden">
          <div
            className="h-full bg-brand-orange rounded-full transition-all"
            style={{ width: `${(complete / total) * 100}%` }}
          />
        </div>
      </div>

      {/* Screen grid by section */}
      {sections.map(section => (
        <div key={section} className="mb-10">
          <h2 className="text-[12px] font-semibold text-white/40 uppercase tracking-wider mb-4">
            {section}
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {(grouped[section] || []).map(screen => (
              <Link
                key={screen.id}
                href={screen.route}
                className="group glass-card-sm p-4 hover:border-brand-orange/30 transition-all"
              >
                <div className="flex items-start justify-between mb-2">
                  <span className="text-[11px] font-mono text-white/30">
                    {screen.number}
                  </span>
                  <StatusDot status={screen.status} />
                </div>
                <p className="text-[13px] font-medium text-white/80 group-hover:text-white transition-colors leading-tight">
                  {screen.name}
                </p>
              </Link>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

function StatusDot({ status }: { status: string }) {
  const color =
    status === 'complete' ? 'bg-forest-green' :
    status === 'in-progress' ? 'bg-brand-orange' :
    'bg-white/20'

  return <div className={`w-[8px] h-[8px] rounded-full ${color}`} />
}
