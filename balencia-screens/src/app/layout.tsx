import type { Metadata } from "next"
import { Sora } from "next/font/google"
import { Sidebar } from "@/components/layout/Sidebar"
import { ScreenNav } from "@/components/layout/ScreenNav"
import "./globals.css"

const sora = Sora({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-sora",
})

export const metadata: Metadata = {
  title: "Balencia — Visual Prototype",
  description: "High-fidelity screen designs for Balencia AI life coach app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${sora.variable} h-full`}>
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
