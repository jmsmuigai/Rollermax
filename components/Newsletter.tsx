'use client'

import { motion } from 'framer-motion'
import { Mail, ArrowRight, CheckCircle2 } from 'lucide-react'
import { useState } from 'react'

export default function Newsletter() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setSubmitted(true)
      setEmail('')
      setTimeout(() => setSubmitted(false), 5000)
    }
  }

  return (
    <section className="py-20 bg-gradient-to-r from-roller-blue to-roller-red">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Stay Updated with Rollermax
          </h2>
          <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
            Get exclusive deals, shipment tips, and industry insights delivered to your inbox.
          </p>

          <motion.form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <div className="flex-1 relative">
              <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/60 w-5 h-5" />
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-12 pr-4 py-4 rounded-full bg-white/10 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/30 transition-all"
              />
            </div>
            <motion.button
              type="submit"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-white text-roller-blue rounded-full font-bold flex items-center justify-center gap-2 hover:shadow-xl transition-all"
            >
              {submitted ? (
                <>
                  <CheckCircle2 size={20} />
                  Thanks!
                </>
              ) : (
                <>
                  Subscribe
                  <ArrowRight size={20} />
                </>
              )}
            </motion.button>
          </motion.form>

          {submitted && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-white/80 mt-4 text-sm"
            >
              ✓ Check your inbox for our latest updates!
            </motion.p>
          )}
        </motion.div>

        {/* Stats Row */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 text-center text-white"
        >
          <div>
            <p className="text-4xl font-bold">5000+</p>
            <p className="text-white/70">Happy Customers</p>
          </div>
          <div>
            <p className="text-4xl font-bold">220+</p>
            <p className="text-white/70">Countries Served</p>
          </div>
          <div>
            <p className="text-4xl font-bold">99.8%</p>
            <p className="text-white/70">On-Time Rate</p>
          </div>
          <div>
            <p className="text-4xl font-bold">24/7</p>
            <p className="text-white/70">Support</p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
