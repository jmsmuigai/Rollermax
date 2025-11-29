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
    <section className="relative min-h-[600px] flex items-center justify-center bg-gradient-to-br from-blue-50 to-white dark:from-gray-900 dark:to-gray-800 pt-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-12">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-5xl md:text-6xl font-bold mb-6 text-gray-900 dark:text-white"
          >
            Track your shipment
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-xl text-gray-600 dark:text-gray-300 mb-8"
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
            <div className="flex flex-col sm:flex-row gap-3 bg-white dark:bg-gray-800 rounded-xl shadow-lg p-2 border border-gray-200 dark:border-gray-700">
              <div className="flex-1 flex items-center">
                <Package className="w-5 h-5 text-gray-400 ml-4 mr-2" />
                <input
                  type="text"
                  value={trackingNumber}
                  onChange={(e) => setTrackingNumber(e.target.value.toUpperCase())}
                  placeholder="12 numeric digits or order reference(s)"
                  className="flex-1 px-4 py-4 bg-transparent border-0 focus:outline-none text-gray-900 dark:text-white placeholder-gray-400"
                />
              </div>
              <button
                type="submit"
                className="bg-primary-dark dark:bg-accent text-white px-8 py-4 rounded-lg font-semibold hover:bg-primary-light dark:hover:bg-accent-light transition-colors flex items-center justify-center space-x-2"
              >
                <span>Track</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">
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
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center">
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
                className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 text-center hover:shadow-lg transition-shadow"
              >
                <div className="text-4xl mb-4">{step.icon}</div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">{step.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">{step.desc}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
