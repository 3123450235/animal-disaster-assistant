import type React from "react"
import type { Metadata } from "next"
import { Inter } from 'next/font/google'
import "./globals.css"
import { Sidebar } from "@/components/sidebar"
import { ThemeProvider } from "@/components/theme-provider"
import { SettingsButton } from "@/components/settings-button"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Animal & Disaster Assistance App",
  description: "App para ayudar a animales y en desastres naturales",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body
        className={`${inter.className} bg-gradient-to-br from-lightBlue-200 to-lightBlue-400 text-blue-900 min-h-screen`}
      >
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <div className="flex h-screen">
            <Sidebar />
            <main className="flex-1 p-4 overflow-auto relative">
              <SettingsButton />
              <div className="mt-12">{children}</div>
            </main>
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}