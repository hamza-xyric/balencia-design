'use client'

import Image from 'next/image'
import { useState } from 'react'
import { ChevronLeft, ChevronRight, Lock, Share2, X, ZoomIn, ZoomOut } from 'lucide-react'
import { PhoneFrame } from '@/components/layout/PhoneFrame'
import { ScreenShell } from '@/components/layout/ScreenShell'
import { imageViewer } from '@/data/mock'

// Screen 67 of 78: Image viewer
// Spec: /Users/hamza/yHealth/app_design 3/67-image-viewer.md

const galleryPhotos = [
  {
    date: 'May 21, 2026',
    caption: 'Progress photo',
    src: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 300 470'%3E%3Cdefs%3E%3ClinearGradient id='g' x1='0' x2='1' y1='0' y2='1'%3E%3Cstop stop-color='%236b3a22'/%3E%3Cstop offset='.45' stop-color='%23180f0b'/%3E%3Cstop offset='1' stop-color='%23ff5e00'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='300' height='470' fill='url(%23g)'/%3E%3Ccircle cx='210' cy='112' r='58' fill='%23ffffff' fill-opacity='.12'/%3E%3Cpath d='M70 390c22-90 57-139 104-147 28-5 48-31 58-78 18 55 17 105-3 151-22 50-69 76-159 74z' fill='%23fff' fill-opacity='.17'/%3E%3C/svg%3E",
  },
  {
    date: 'May 24, 2026',
    caption: 'Side progress photo',
    src: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 300 470'%3E%3Cdefs%3E%3ClinearGradient id='g' x1='0' x2='1' y1='0' y2='1'%3E%3Cstop stop-color='%23224b5f'/%3E%3Cstop offset='.5' stop-color='%23120f16'/%3E%3Cstop offset='1' stop-color='%237f24ff'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='300' height='470' fill='url(%23g)'/%3E%3Ccircle cx='86' cy='118' r='50' fill='%23ffffff' fill-opacity='.10'/%3E%3Cpath d='M114 395c8-86 26-145 54-176 24-27 37-63 38-108 31 46 43 92 36 139-8 56-44 104-128 145z' fill='%23fff' fill-opacity='.18'/%3E%3C/svg%3E",
  },
  {
    date: 'May 27, 2026',
    caption: 'Recovery posture photo',
    src: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 300 470'%3E%3Cdefs%3E%3ClinearGradient id='g' x1='0' x2='1' y1='0' y2='1'%3E%3Cstop stop-color='%232c4c38'/%3E%3Cstop offset='.45' stop-color='%230d1410'/%3E%3Cstop offset='1' stop-color='%2310b981'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='300' height='470' fill='url(%23g)'/%3E%3Ccircle cx='205' cy='134' r='42' fill='%23ffffff' fill-opacity='.11'/%3E%3Cpath d='M64 382c40-75 83-116 128-122 26-4 50-25 72-64 4 62-13 109-51 140-38 32-87 47-149 46z' fill='%23fff' fill-opacity='.17'/%3E%3C/svg%3E",
  },
  {
    date: 'May 18, 2026',
    caption: 'Baseline photo',
    src: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 300 470'%3E%3Crect width='300' height='470' fill='%231a120f'/%3E%3Crect x='36' y='54' width='228' height='360' rx='28' fill='%23ffffff' fill-opacity='.07'/%3E%3Cpath d='M86 382c30-92 66-141 108-148 24-4 43-29 58-76 13 58 8 108-17 151-25 43-74 67-149 73z' fill='%23ff5e00' fill-opacity='.24'/%3E%3C/svg%3E",
  },
  {
    date: 'May 15, 2026',
    caption: 'Check-in photo',
    src: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 300 470'%3E%3Crect width='300' height='470' fill='%23111924'/%3E%3Ccircle cx='150' cy='235' r='118' fill='%23ffffff' fill-opacity='.08'/%3E%3Cpath d='M92 386c12-74 42-124 89-149 27-14 44-45 51-94 22 48 25 93 7 134-20 47-69 83-147 109z' fill='%237f24ff' fill-opacity='.22'/%3E%3C/svg%3E",
  },
  {
    date: 'May 12, 2026',
    caption: 'Morning photo',
    src: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 300 470'%3E%3Crect width='300' height='470' fill='%23151d16'/%3E%3Cpath d='M24 410h252V90H24z' fill='%23ffffff' fill-opacity='.06'/%3E%3Cpath d='M68 388c50-66 91-103 122-111 34-9 59-44 76-104 10 70-4 122-43 157-38 35-90 54-155 58z' fill='%2310b981' fill-opacity='.23'/%3E%3C/svg%3E",
  },
  {
    date: 'May 9, 2026',
    caption: 'Training photo',
    src: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 300 470'%3E%3Crect width='300' height='470' fill='%231d100b'/%3E%3Ccircle cx='158' cy='160' r='92' fill='%23ff5e00' fill-opacity='.10'/%3E%3Cpath d='M76 388c18-88 54-142 108-162 21-8 38-37 50-87 22 62 21 113-2 153-27 47-79 79-156 96z' fill='%23fff' fill-opacity='.16'/%3E%3C/svg%3E",
  },
]

function GalleryDots({ index }: { index: number }) {
  return (
    <div className="flex items-center justify-center gap-2">
      {Array.from({ length: imageViewer.total }).map((_, dotIndex) => (
        <span
          key={dotIndex}
          className={['h-2 w-2 rounded-full', dotIndex + 1 === index ? 'bg-white/80' : 'bg-white/25'].join(' ')}
        />
      ))}
    </div>
  )
}

export default function ImageViewerScreen() {
  const [index, setIndex] = useState(imageViewer.index)
  const [zoomed, setZoomed] = useState(false)
  const [dismissed, setDismissed] = useState(false)
  const [shareState, setShareState] = useState<'idle' | 'disabled' | 'policy'>('idle')
  const currentPhoto = galleryPhotos[index - 1] ?? galleryPhotos[0]

  if (dismissed) {
    return (
      <PhoneFrame>
        <ScreenShell showTabBar={false}>
          <main className="flex min-h-full items-center justify-center bg-ink-900 px-6 text-center">
            <div>
              <p className="text-[17px] font-semibold leading-6 text-white">Image viewer closed</p>
              <button type="button" onClick={() => setDismissed(false)} className="mt-4 h-11 rounded-pill bg-white/[0.06] px-5 text-caption font-semibold text-white/70">Reopen viewer</button>
            </div>
          </main>
        </ScreenShell>
      </PhoneFrame>
    )
  }

  return (
    <PhoneFrame>
      <ScreenShell showTabBar={false}>
        <main className="relative flex min-h-full flex-col overflow-hidden bg-ink-900">
          <header className="z-10 flex h-14 items-center justify-between bg-gradient-to-b from-ink-900/90 to-transparent px-4">
            <button type="button" aria-label="Close image viewer" onClick={() => setDismissed(true)} className="flex h-11 w-11 items-center justify-center rounded-full bg-ink-900/50 text-white">
              <X size={22} strokeWidth={2.1} />
            </button>
            <div className="text-[15px] font-semibold leading-5 text-white/80">
              {index} of {imageViewer.total}
            </div>
            <button type="button" aria-label="Share image" onClick={() => setShareState('disabled')} className="flex h-11 w-11 items-center justify-center rounded-full bg-ink-900/50 text-white">
              <Share2 size={20} strokeWidth={2.1} />
            </button>
          </header>

          <section className="relative flex flex-1 items-center justify-center px-6">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,var(--glow-orange-bg)_0%,transparent_54%)] opacity-30" />
            <button type="button" aria-label="Previous image" onClick={() => setIndex(Math.max(1, index - 1))} className="absolute left-3 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-ink-900/60 text-white disabled:opacity-30" disabled={index === 1}>
              <ChevronLeft size={20} />
            </button>
            <button type="button" aria-label={zoomed ? 'Zoom out image' : 'Zoom in image'} onDoubleClick={() => setZoomed(!zoomed)} onClick={() => setZoomed(!zoomed)} className={['relative flex h-[430px] w-[275px] items-center justify-center overflow-hidden rounded-lg border border-white/[0.06] bg-ink-brown-800 shadow-3 transition-transform', zoomed ? 'scale-110' : ''].join(' ')}>
              <div className="absolute left-3 top-3 z-10 rounded-pill bg-ink-900/70 px-3 py-1 text-small font-semibold leading-3 text-white/60">
                {currentPhoto.date}
              </div>
              <Image
                src={currentPhoto.src}
                alt={`${currentPhoto.caption} from ${currentPhoto.date}`}
                fill
                sizes="275px"
                className="object-cover"
                unoptimized
              />
              <div className="absolute bottom-3 z-10 rounded-pill bg-ink-900/70 px-3 py-1 text-small leading-3 text-white/40">
                {zoomed ? <ZoomOut size={14} className="inline" /> : <ZoomIn size={14} className="inline" />} {currentPhoto.caption}
              </div>
            </button>
            <button type="button" aria-label="Next image" onClick={() => setIndex(Math.min(imageViewer.total, index + 1))} className="absolute right-3 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-ink-900/60 text-white disabled:opacity-30" disabled={index === imageViewer.total}>
              <ChevronRight size={20} />
            </button>
          </section>

          {shareState !== 'idle' && (
            <section className="z-20 mx-4 mb-4 rounded-lg border border-brand-orange/25 bg-ink-brown-800 p-4" aria-live="polite">
              <div className="flex items-center gap-2 text-[15px] font-semibold leading-5 text-white"><Lock size={16} className="text-brand-orange" /> Sharing disabled in V1</div>
              <p className="mt-1 text-caption leading-[18px] text-white/55">Progress photos stay encrypted. Future sharing will require a decrypted-copy warning and explicit confirmation.</p>
              <button type="button" onClick={() => setShareState('idle')} className="mt-3 h-11 min-w-11 rounded-pill px-3 text-caption font-semibold text-brand-orange">Got it</button>
            </section>
          )}

          <footer className="z-10 pb-3">
            <GalleryDots index={index} />
          </footer>
        </main>
      </ScreenShell>
    </PhoneFrame>
  )
}
