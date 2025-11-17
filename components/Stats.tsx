'use client'

import { motion } from 'framer-motion'
import { Package, Users, Globe, Clock } from 'lucide-react'

const stats = [
  {
    icon: Package,
    value: '50K+',
    label: 'Packages Delivered',
    color: 'text-accent',
  },
  {
    icon: Users,
    value: '10K+',
    label: 'Happy Customers',
    color: 'text-blue-400',
  },
  {
    icon: Globe,
    value: '25+',
    label: 'Countries Served',
    color: 'text-green-400',
  },
  {
    icon: Clock,
    value: '99.9%',
    label: 'On-Time Delivery',
    color: 'text-gold',
  },
]

export default function Stats() {
  return (
    <section className="section-padding bg-primary/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="text-center"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-light rounded-2xl mb-4 border border-accent/20">
                <stat.icon className={`w-8 h-8 ${stat.color}`} />
              </div>
              <h3 className="text-3xl md:text-4xl font-bold text-white mb-2">
                {stat.value}
              </h3>
              <p className="text-gray-400 text-sm md:text-base">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

