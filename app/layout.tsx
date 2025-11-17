import type { Metadata } from 'next'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

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
    <html lang="en" dir="ltr">
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className="min-h-screen bg-primary-dark">
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}

