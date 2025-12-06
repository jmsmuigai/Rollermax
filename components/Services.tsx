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
  },
  {
    icon: Plane,
    title: 'Freight Forwarding',
    description: 'Professional freight forwarding for businesses. Air, sea, and land solutions.',
  },
  {
    icon: FileText,
    title: 'Parcel & Document Delivery',
    description: 'Secure document and parcel delivery with real-time tracking and monitoring.',
  },
  {
    icon: Box,
    title: 'Customs Clearance',
    description: 'Expert customs clearance services to ensure smooth international shipments.',
  },
  {
    icon: Home,
    title: 'Packaging & Crating',
    description: 'Professional packaging and crating to protect your items during transit.',
  },
  {
    icon: Truck,
    title: 'Door to Door Delivery',
    description: 'Convenient door-to-door service. We pick up and deliver directly to you.',
  },
]

export default function Services() {
  return (
    <section id="services" className="py-20 bg-secondary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-4 text-primary-dark">
            Our Services
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Comprehensive logistics solutions for all your shipping needs
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
            >
              <div className="w-16 h-16 rounded-full bg-accent flex items-center justify-center mb-6">
                <service.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-primary-dark mb-3">{service.title}</h3>
              <p className="text-gray-600 mb-4 leading-relaxed">{service.description}</p>
              <Link 
                href="/contact" 
                className="inline-flex items-center font-semibold text-accent hover:underline"
              >
                Learn More
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}