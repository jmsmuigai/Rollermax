'use client'

import { motion } from 'framer-motion'
import { ArrowRight, Phone, Mail } from 'lucide-react'
import Link from 'next/link'

export default function CTA() {
  return (
    <section className="section-padding relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-accent/20 via-primary/50 to-blue-500/20"></div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Ship? <span className="accent-gradient">Get Started Today</span>
          </h2>
          <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
            Experience the future of logistics with Rollermax. Fast, secure, and AI-powered delivery services.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Link href="/contact" className="btn-primary flex items-center space-x-2">
              <span>Get a Quote</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
            <a href="tel:+254722227172" className="btn-outline flex items-center space-x-2">
              <Phone className="w-5 h-5" />
              <span>Call Us Now</span>
            </a>
          </div>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center text-gray-300">
            <a href="tel:+254722227172" className="flex items-center space-x-2 hover:text-accent transition-colors">
              <Phone className="w-5 h-5" />
              <span>0722 227 172</span>
            </a>
            <span className="hidden sm:block">|</span>
            <a href="tel:+254714848821" className="flex items-center space-x-2 hover:text-accent transition-colors">
              <Phone className="w-5 h-5" />
              <span>0714 848 821</span>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

