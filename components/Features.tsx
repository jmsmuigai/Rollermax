'use client'

import { motion } from 'framer-motion'
import { 
  Brain, 
  Shield, 
  Zap, 
  MapPin, 
  Clock, 
  Headphones 
} from 'lucide-react'

const features = [
  {
    icon: Brain,
    title: 'AI-Powered Monitoring',
    description: 'Our advanced AI system monitors your shipments 24/7, providing real-time updates and predictive delivery times.',
    gradient: 'from-purple-500 to-pink-500',
  },
  {
    icon: Shield,
    title: 'Secure & Insured',
    description: 'All shipments are fully insured and protected. Your goods are in safe hands with comprehensive coverage.',
    gradient: 'from-blue-500 to-cyan-500',
  },
  {
    icon: Zap,
    title: 'Fast Delivery',
    description: 'Express delivery options available. Get your packages delivered in the shortest possible time.',
    gradient: 'from-yellow-500 to-orange-500',
  },
  {
    icon: MapPin,
    title: 'Real-Time Tracking',
    description: 'Track your shipment at every step of the journey with our GPS-enabled tracking system.',
    gradient: 'from-green-500 to-emerald-500',
  },
  {
    icon: Clock,
    title: '24/7 Support',
    description: 'Our customer support team is available around the clock to assist you with any queries.',
    gradient: 'from-indigo-500 to-purple-500',
  },
  {
    icon: Headphones,
    title: 'Multilingual Support',
    description: 'We speak your language. Support available in English, Somali, and Swahili for your convenience.',
    gradient: 'from-red-500 to-pink-500',
  },
]

export default function Features() {
  return (
    <section className="section-padding bg-primary/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Why Choose <span className="accent-gradient">Rollermax</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Experience the future of logistics with cutting-edge technology and personalized service
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-20 transition-opacity rounded-2xl blur-xl"
                   style={{ 
                     background: `linear-gradient(135deg, var(--accent), var(--accent-light))` 
                   }}
              ></div>
              <div className="relative card h-full">
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                  <feature.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                <p className="text-gray-400 leading-relaxed">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

