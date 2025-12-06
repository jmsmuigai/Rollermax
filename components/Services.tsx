'use client'

import { motion } from 'framer-motion'
import { 
  Globe, 
  Plane, 
  FileText, 
  Box, 
  Home,
  Truck
} from 'lucide-react'
import Link from 'next/link'

const services = [
  {
    icon: Globe,
    title: 'Local & International Shipping',
    description: 'Seamless shipping services across Kenya and worldwide. Fast, secure, and reliable.',
    color: 'text-blue-600 dark:text-blue-400',
  },
  {
    icon: Plane,
    title: 'Freight Forwarding',
    description: 'Professional freight forwarding for businesses. Air, sea, and land solutions.',
    color: 'text-accent',
  },
  {
    icon: FileText,
    title: 'Parcel & Document Delivery',
    description: 'Secure document and parcel delivery with real-time tracking and monitoring.',
    color: 'text-green-600 dark:text-green-400',
  },
  {
    icon: Box,
    title: 'Customs Clearance',
    description: 'Expert customs clearance services to ensure smooth international shipments.',
    color: 'text-purple-600 dark:text-purple-400',
  },
  {
    icon: Home,
    title: 'Packaging & Crating',
    description: 'Professional packaging and crating to protect your items during transit.',
    color: 'text-accent dark:text-accent-light',
  },
  {
    icon: Truck,
    title: 'Door to Door Delivery',
    description: 'Convenient door-to-door service. We pick up and deliver directly to you.',
    color: 'text-cyan-600 dark:text-cyan-400',
  },
]

export default function Services() {
  return (
    <section id="services" className="py-20 relative overflow-hidden bg-gradient-to-br from-primary-dark via-primary/90 to-primary-dark">
      {/* Modern background with pattern */}
      <div className="absolute inset-0">
        {/* Islamic geometric pattern overlay */}
        <div className="absolute inset-0 opacity-15" style={{
          backgroundImage: `
            repeating-linear-gradient(45deg, transparent, transparent 30px, rgba(220, 38, 38, 0.08) 30px, rgba(220, 38, 38, 0.08) 60px),
            repeating-linear-gradient(-45deg, transparent, transparent 30px, rgba(26, 66, 138, 0.08) 30px, rgba(26, 66, 138, 0.08) 60px)
          `,
        }}></div>
        {/* Decorative gradients */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl"></div>
      </div>
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
            Our Services
          </h2>
          <p className="text-xl text-white/90 max-w-2xl mx-auto">
            Comprehensive logistics solutions for all your shipping needs
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white/10 backdrop-blur-md p-6 rounded-xl shadow-lg border-2 border-accent/20 hover:border-accent/40 hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
            >
              <div className={`w-12 h-12 rounded-lg bg-gradient-to-br from-accent/20 to-accent/10 flex items-center justify-center mb-4 border border-accent/30 ${service.color}`}>
                <service.icon className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">{service.title}</h3>
              <p className="text-white/80 mb-4 leading-relaxed">{service.description}</p>
              <Link 
                href="/contact" 
                className="inline-flex items-center text-sm font-semibold text-accent hover:text-accent-light transition-colors"
              >
                Learn More →
              </Link>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Link 
            href="/contact" 
            className="inline-block bg-gradient-to-r from-accent to-accent-light text-white px-8 py-3 rounded-lg font-semibold hover:from-accent-light hover:to-accent transition-all shadow-lg hover:shadow-xl"
          >
            Get a Quote
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
