import type { Metadata } from "next";
import { Sora } from "next/font/google";
import { LenisProvider } from "@/components/LenisProvider";
import "./globals.css";

const sora = Sora({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
  variable: "--font-sora",
});

export const metadata: Metadata = {
  title: "Balencia — find your balance.",
  description:
    "Balencia is an AI life coach. SIA sees every dimension of your life at once and coaches you on the connections single-purpose apps miss — the Life Correlation Matrix.",
  applicationName: "Balencia",
  openGraph: {
    title: "Balencia — find your balance.",
    description:
      "One app that sees the whole of you. SIA maps how your sleep, work, money, and relationships move together — and hands you one clear move each morning.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={sora.variable}>
      <body className="bg-ink-900 font-sans antialiased">
        <LenisProvider>{children}</LenisProvider>
      </body>
    </html>
  );
}
