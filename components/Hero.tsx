'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Package } from 'lucide-react'
import Link from 'next/link'

export default function Hero() {
  const [trackingNumber, setTrackingNumber] = useState('')

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault()
    if (trackingNumber.trim()) {
      window.location.href = `/track?number=${trackingNumber}`
    }
  }

  return (
    <section className="relative min-h-[70vh] flex items-center justify-center text-white overflow-hidden">
      <div className="absolute inset-0">
        <img
          src="/images/Banner.png"
          alt="Background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-primary-dark opacity-80"></div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-6xl font-display font-bold mb-6"
        >
          Reliable & Efficient Logistics
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-lg md:text-xl text-gray-200 mb-8"
        >
          Your trusted partner for courier and logistics services. Fast, secure, and always on time.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Link href="/contact">
            <a className="bg-accent hover:bg-accent-light text-white px-8 py-4 rounded-full font-semibold transition-all shadow-lg hover:shadow-xl flex items-center justify-center space-x-2 w-max mx-auto">
              <span>Get a Free Quote</span>
              <ArrowRight className="w-5 h-5" />
            </a>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}