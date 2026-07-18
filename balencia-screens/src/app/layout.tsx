import type { Metadata } from "next"
import { Hanken_Grotesk, Newsreader, Sora } from "next/font/google"
import { Sidebar } from "@/components/layout/Sidebar"
import { ScreenNav } from "@/components/layout/ScreenNav"
import "./globals.css"

const sora = Sora({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-sora",
})

// Hi-fi canon stand-ins (COMPACT-CANON §5): Hanken Grotesk for Neue Montreal,
// Newsreader italic for the Tiempos emphasis word. Scoped via the .hifi class —
// the legacy layer keeps Sora.
const hanken = Hanken_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-hanken",
})

const newsreader = Newsreader({
  subsets: ["latin"],
  style: ["italic"],
  weight: ["500"],
  variable: "--font-emphasis",
})

export const metadata: Metadata = {
  title: "Balencia — Visual Prototype",
  description: "High-fidelity screen designs for Balencia AI life coach app",
  robots: {
    index: false,
    follow: false,
    nocache: true,
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${sora.variable} ${hanken.variable} ${newsreader.variable} h-full`}>
      <body className="h-full flex bg-ink-900 font-sans antialiased">
        <Sidebar />
        <main className="flex-1 flex items-center justify-center min-h-screen overflow-auto p-8">
          {children}
        </main>
        <ScreenNav />
      </body>
    </html>
  )
}
