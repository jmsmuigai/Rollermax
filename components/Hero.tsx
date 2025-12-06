'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Search, ArrowRight, Package } from 'lucide-react'
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
    <section className="relative min-h-[600px] flex items-center justify-center bg-gradient-to-br from-primary-dark via-primary to-primary-dark pt-16 overflow-hidden">
      {/* Modern background with Islamic pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-dark via-primary/80 to-primary-dark">
        {/* Islamic geometric pattern overlay */}
        <div className="absolute inset-0 opacity-20" style={{
          backgroundImage: `
            repeating-linear-gradient(45deg, transparent, transparent 20px, rgba(220, 38, 38, 0.1) 20px, rgba(220, 38, 38, 0.1) 40px),
            repeating-linear-gradient(-45deg, transparent, transparent 20px, rgba(26, 66, 138, 0.1) 20px, rgba(26, 66, 138, 0.1) 40px)
          `,
        }}></div>
        {/* Radial gradients for depth */}
        <div className="absolute inset-0" style={{
          background: 'radial-gradient(circle at 50% 50%, rgba(220, 38, 38, 0.1) 0%, transparent 70%)'
        }}></div>
        {/* Floating particles effect */}
        <div className="absolute top-20 left-20 w-64 h-64 bg-accent/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-12">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-5xl md:text-6xl font-bold mb-6 text-white"
          >
            Track your shipment
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-xl text-white/90 mb-8"
          >
            Find the latest delivery status of your shipment
          </motion.p>

          {/* Tracking Form */}
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            onSubmit={handleTrack}
            className="max-w-2xl mx-auto"
          >
            <div className="flex flex-col sm:flex-row gap-3 bg-white/95 backdrop-blur-md rounded-xl shadow-2xl p-2 border-2 border-accent/30">
              <div className="flex-1 flex items-center">
                <Package className="w-5 h-5 text-primary ml-4 mr-2" />
                <input
                  type="text"
                  value={trackingNumber}
                  onChange={(e) => setTrackingNumber(e.target.value.toUpperCase())}
                  placeholder="12 numeric digits or order reference(s)"
                  className="flex-1 px-4 py-4 bg-transparent border-0 focus:outline-none text-gray-900 placeholder-gray-500"
                />
              </div>
              <button
                type="submit"
                className="bg-gradient-to-r from-accent to-accent-light text-white px-8 py-4 rounded-lg font-semibold hover:from-accent-light hover:to-accent transition-all shadow-lg hover:shadow-xl flex items-center justify-center space-x-2"
              >
                <span>Track</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
            <p className="text-sm text-white/80 mt-4">
              Enter multiple tracking numbers separated by commas or spaces.
            </p>
          </motion.form>
        </div>

        {/* How it works section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16"
        >
          <h2 className="text-2xl font-bold text-white mb-8 text-center">
            How it works
          </h2>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { icon: '📦', title: 'Request a quote', desc: 'Get instant shipping quotes' },
              { icon: '🚚', title: 'Create shipment', desc: 'Book and schedule pickup' },
              { icon: '📍', title: 'Track delivery', desc: 'Real-time tracking updates' },
              { icon: '✅', title: 'Receive package', desc: 'Delivered to your door' },
            ].map((step, index) => (
              <div
                key={index}
                className="bg-white/10 backdrop-blur-md p-6 rounded-xl shadow-lg border-2 border-accent/20 text-center hover:shadow-xl hover:border-accent/40 transition-all hover:-translate-y-1"
              >
                <div className="text-4xl mb-4">{step.icon}</div>
                <h3 className="font-semibold text-white mb-2">{step.title}</h3>
                <p className="text-sm text-white/80">{step.desc}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
