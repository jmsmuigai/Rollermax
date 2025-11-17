'use client'

import { motion } from 'framer-motion'
import { 
  Plane, 
  Truck, 
  FileText, 
  Globe, 
  Box, 
  Home,
  Sparkles 
} from 'lucide-react'
import Link from 'next/link'

const services = [
  {
    icon: Globe,
    title: 'Local & International Shipping',
    description: 'Seamless shipping services across Kenya and worldwide. Fast, secure, and reliable delivery to any destination.',
    color: 'from-blue-500 to-blue-600',
  },
  {
    icon: Plane,
    title: 'Freight Forwarding',
    description: 'Professional freight forwarding services for businesses. Air, sea, and land freight solutions tailored to your needs.',
    color: 'from-accent to-accent-dark',
  },
  {
    icon: FileText,
    title: 'Parcel & Document Delivery',
    description: 'Secure document and parcel delivery with real-time tracking. Ideal for important documents and small packages.',
    color: 'from-green-500 to-green-600',
  },
  {
    icon: Box,
    title: 'Customs Clearance',
    description: 'Expert customs clearance services to ensure smooth international shipments. We handle all documentation.',
    color: 'from-purple-500 to-purple-600',
  },
  {
    icon: Home,
    title: 'Packaging & Crating',
    description: 'Professional packaging and crating services to protect your items during transit. Custom solutions available.',
    color: 'from-orange-500 to-orange-600',
  },
  {
    icon: Truck,
    title: 'Door to Door Delivery',
    description: 'Convenient door-to-door delivery service. We pick up and deliver directly to your address anywhere in Kenya.',
    color: 'from-cyan-500 to-cyan-600',
  },
]

export default function Services() {
  return (
    <section id="services" className="section-padding">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center space-x-2 bg-accent/20 text-accent px-4 py-2 rounded-full mb-4">
            <Sparkles className="w-4 h-4" />
            <span className="text-sm font-semibold">Our Services</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Comprehensive <span className="accent-gradient">Logistics Solutions</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            We offer a wide range of courier and logistics services designed to meet all your shipping needs
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
              className="card group cursor-pointer relative overflow-hidden"
            >
              {/* Hover glow effect */}
              <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500 rounded-2xl blur-xl`}></div>
              <div className={`relative w-16 h-16 rounded-2xl bg-gradient-to-br ${service.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-lg`}>
                {/* Glow effect */}
                <div className={`absolute inset-0 bg-gradient-to-br ${service.color} rounded-2xl blur-md opacity-50 group-hover:opacity-75 transition-opacity`}></div>
                <service.icon className="w-8 h-8 text-white relative z-10" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">{service.title}</h3>
              <p className="text-gray-400 mb-6 leading-relaxed">{service.description}</p>
              <Link 
                href="/contact" 
                className="text-accent font-semibold hover:underline inline-flex items-center"
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
          <Link href="/contact" className="btn-primary inline-block">
            Get a Quote
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

