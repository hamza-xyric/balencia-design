import { Camera, Share2, X } from 'lucide-react'
import { PhoneFrame } from '@/components/layout/PhoneFrame'
import { ScreenShell } from '@/components/layout/ScreenShell'
import { imageViewer } from '@/data/mock'

// Screen 67 of 78: Image viewer
// Spec: /Users/hamza/yHealth/app_design 3/67-image-viewer.md

function GalleryDots() {
  return (
    <div className="flex items-center justify-center gap-2">
      {Array.from({ length: imageViewer.total }).map((_, index) => (
        <span
          key={index}
          className={['h-2 w-2 rounded-full', index + 1 === imageViewer.index ? 'bg-white/80' : 'bg-white/25'].join(' ')}
        />
      ))}
    </div>
  )
}

export default function ImageViewerScreen() {
  return (
    <PhoneFrame>
      <ScreenShell showTabBar={false}>
        <main className="relative flex min-h-full flex-col overflow-hidden bg-ink-900">
          <header className="z-10 flex h-14 items-center justify-between bg-gradient-to-b from-ink-900/90 to-transparent px-4">
            <button type="button" className="flex h-11 w-11 items-center justify-center rounded-full bg-ink-900/50 text-white">
              <X size={22} strokeWidth={2.1} />
            </button>
            <div className="text-[15px] font-semibold leading-5 text-white/80">
              {imageViewer.index} of {imageViewer.total}
            </div>
            <button type="button" className="flex h-11 w-11 items-center justify-center rounded-full bg-ink-900/50 text-white">
              <Share2 size={20} strokeWidth={2.1} />
            </button>
          </header>

          <section className="relative flex flex-1 items-center justify-center px-6">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,var(--glow-orange-bg)_0%,transparent_54%)] opacity-30" />
            <div className="relative flex h-[430px] w-[275px] items-center justify-center rounded-lg border border-white/[0.06] bg-ink-brown-800 shadow-3">
              <div className="absolute left-3 top-3 rounded-pill bg-ink-900/70 px-3 py-1 text-small font-semibold leading-3 text-white/60">
                {imageViewer.date}
              </div>
              <Camera size={58} className="text-white/20" strokeWidth={1.7} />
              <div className="absolute bottom-3 rounded-pill bg-ink-900/70 px-3 py-1 text-small leading-3 text-white/40">
                {imageViewer.caption}
              </div>
            </div>
          </section>

          <footer className="z-10 pb-3">
            <GalleryDots />
          </footer>
        </main>
      </ScreenShell>
    </PhoneFrame>
  )
}
