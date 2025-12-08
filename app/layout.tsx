import type { Metadata } from 'next'
import { Inter, Lexend } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/contexts/ThemeContext'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const lexend = Lexend({ subsets: ['latin'], variable: '--font-lexend' })

export const metadata: Metadata = {
  title: 'Rollermax Courier - AI-Powered Logistics & Delivery Services',
  description: 'Professional courier and logistics services in Kenya. Track your shipments in real-time with AI-powered monitoring. Local and international shipping, freight forwarding, and door-to-door delivery.',
  keywords: 'courier, logistics, delivery, Kenya, shipping, freight, AI tracking, Rollermax',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" dir="ltr" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className={`${inter.variable} ${lexend.variable} min-h-screen transition-colors duration-300 font-sans bg-islamic-pattern`}>
        <ThemeProvider>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  )
}

