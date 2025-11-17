'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Search, Package, ArrowRight, Sparkles } from 'lucide-react'
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
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-accent/10 rounded-full blur-3xl float-animation"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl float-animation" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-left"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center space-x-2 bg-accent/20 text-accent px-4 py-2 rounded-full mb-6"
            >
              <Sparkles className="w-4 h-4" />
              <span className="text-sm font-semibold">AI-Powered Tracking</span>
            </motion.div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
              <span className="gradient-text">Fast, Reliable</span>
              <br />
              <span className="text-white">Courier Services</span>
              <br />
              <span className="accent-gradient">Across Kenya</span>
            </h1>

            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              Experience next-generation logistics with our AI-powered monitoring system. 
              Track your shipments in real-time, anytime, anywhere. Serving the Somali community 
              and all of Kenya with trust, efficiency, and excellence.
            </p>

            {/* Tracking Form */}
            <motion.form
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              onSubmit={handleTrack}
              className="bg-white/10 backdrop-blur-md rounded-2xl p-6 mb-8 border border-accent/30"
            >
              <h3 className="text-2xl font-bold text-white mb-4 flex items-center">
                <Package className="w-6 h-6 mr-2 text-accent" />
                Track Your Shipment
              </h3>
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="flex-1 relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    value={trackingNumber}
                    onChange={(e) => setTrackingNumber(e.target.value)}
                    placeholder="Enter tracking number"
                    className="input-field pl-12 pr-4 py-4 text-white"
                  />
                </div>
                <button
                  type="submit"
                  className="btn-primary flex items-center justify-center space-x-2 px-8"
                >
                  <span>Track</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
              <p className="text-sm text-gray-400 mt-3">
                Enter multiple tracking numbers separated by commas or spaces.
              </p>
            </motion.form>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Link href="/contact" className="btn-primary text-center">
                Get Started
              </Link>
              <Link href="/#services" className="btn-outline text-center">
                Our Services
              </Link>
            </motion.div>
          </motion.div>

          {/* Right Side - Illustration */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative hidden lg:block"
          >
            <div className="relative w-full h-[600px]">
              {/* Main illustration area */}
              <div className="absolute inset-0 bg-gradient-to-br from-accent/20 to-blue-500/20 rounded-3xl backdrop-blur-sm border border-accent/30"></div>
              
              {/* Floating cards */}
              <motion.div
                animate={{ y: [0, -20, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute top-10 right-10 card w-64"
              >
                <div className="flex items-center space-x-3 mb-3">
                  <div className="w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center">
                    <Package className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Package Status</p>
                    <p className="text-lg font-bold text-white">In Transit</p>
                  </div>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div className="bg-accent h-2 rounded-full" style={{ width: '75%' }}></div>
                </div>
              </motion.div>

              <motion.div
                animate={{ y: [0, 20, 0] }}
                transition={{ duration: 4, repeat: Infinity, delay: 1 }}
                className="absolute bottom-20 left-10 card w-56"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-green-500/20 rounded-full flex items-center justify-center">
                    <Sparkles className="w-5 h-5 text-green-400" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400">AI Monitoring</p>
                    <p className="text-base font-bold text-white">Active</p>
                  </div>
                </div>
              </motion.div>

              {/* Center illustration */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-80 h-80 bg-gradient-to-br from-accent/30 to-blue-500/30 rounded-full blur-2xl"></div>
                <div className="absolute w-64 h-64 bg-primary-light rounded-full border-4 border-accent/50 flex items-center justify-center">
                  <Package className="w-32 h-32 text-accent" />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
      >
        <div className="w-6 h-10 border-2 border-accent rounded-full flex justify-center">
          <div className="w-1 h-3 bg-accent rounded-full mt-2"></div>
        </div>
      </motion.div>
    </section>
  )
}

