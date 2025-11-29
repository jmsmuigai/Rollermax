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
    <section id="services" className="py-20 bg-white dark:bg-[var(--bg-secondary)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-white">
            Our Services
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
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
              className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <div className={`w-12 h-12 rounded-lg bg-gray-100 dark:bg-gray-700 flex items-center justify-center mb-4 ${service.color}`}>
                <service.icon className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{service.title}</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">{service.description}</p>
              <Link 
                href="/contact" 
                className={`inline-flex items-center text-sm font-semibold ${service.color} hover:underline`}
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
            className="inline-block bg-primary-dark dark:bg-accent text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary-light dark:hover:bg-accent-light transition-colors"
          >
            Get a Quote
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
