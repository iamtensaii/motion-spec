import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "motion-spec — Open semantic animation specification",
  description: "AI can build your UI. It still doesn't know how things should move.",
  openGraph: {
    title: "motion-spec",
    description: "AI can build your UI. It still doesn't know how things should move.",
    url: "https://motion-spec.dev",
    siteName: "motion-spec",
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
