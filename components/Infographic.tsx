'use client'

import { motion } from 'framer-motion'
import { TrendingUp, Clock, Shield, Globe } from 'lucide-react'

export default function Infographic() {
  const stats = [
    {
      icon: TrendingUp,
      value: '99.9%',
      label: 'On-Time Delivery',
      color: 'from-green-500 to-emerald-500',
      description: 'Guaranteed timely delivery',
    },
    {
      icon: Clock,
      value: '24/7',
      label: 'AI Monitoring',
      color: 'from-blue-500 to-cyan-500',
      description: 'Round-the-clock tracking',
    },
    {
      icon: Shield,
      value: '100%',
      label: 'Secure',
      color: 'from-purple-500 to-pink-500',
      description: 'Fully insured shipments',
    },
    {
      icon: Globe,
      value: '25+',
      label: 'Countries',
      color: 'from-accent to-accent-dark',
      description: 'Global reach',
    },
  ]

  return (
    <section className="section-padding relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
            Powerful insights into our service excellence
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="relative group"
            >
              {/* Glow effect */}
              <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} rounded-3xl blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-500`}></div>
              
              {/* Card */}
              <div className="relative card border-2 border-accent/20 bg-gradient-to-br from-primary/90 to-primary-dark/90 backdrop-blur-xl">
                {/* Icon with gradient background */}
                <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${stat.color} flex items-center justify-center mb-6 mx-auto group-hover:scale-110 transition-transform shadow-lg`}>
                  <stat.icon className="w-10 h-10 text-white" />
                </div>
                
                {/* Value */}
                <h3 className="text-4xl md:text-5xl font-bold text-white mb-2 text-center bg-gradient-to-br from-white via-white to-gray-300 bg-clip-text text-transparent">
                  {stat.value}
                </h3>
                
                {/* Label */}
                <p className="text-xl font-semibold text-accent mb-3 text-center">{stat.label}</p>
                
                {/* Description */}
                <p className="text-gray-400 text-sm text-center">{stat.description}</p>
                
                {/* Decorative corner elements */}
                <div className="absolute top-0 right-0 w-16 h-16 border-t-2 border-r-2 border-accent/30 rounded-tr-2xl"></div>
                <div className="absolute bottom-0 left-0 w-16 h-16 border-b-2 border-l-2 border-accent/30 rounded-bl-2xl"></div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Visual flow diagram */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-16 card bg-gradient-to-br from-accent/10 to-blue-500/10 border-accent/30"
        >
          <h3 className="text-2xl font-bold text-white mb-8 text-center">Our Delivery Process</h3>
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            {['Pick Up', 'Processing', 'In Transit', 'Delivered'].map((step, index) => (
              <div key={index} className="flex items-center flex-col md:flex-row flex-1">
                <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${index === 0 ? 'from-green-500 to-emerald-500' : index === 1 ? 'from-blue-500 to-cyan-500' : index === 2 ? 'from-accent to-accent-dark' : 'from-purple-500 to-pink-500'} flex items-center justify-center text-white font-bold text-lg mb-4 md:mb-0 shadow-lg`}>
                  {index + 1}
                </div>
                <div className="text-center md:text-left md:ml-4">
                  <p className="text-white font-semibold">{step}</p>
                  <p className="text-gray-400 text-sm">Step {index + 1}</p>
                </div>
                {index < 3 && (
                  <motion.div
                    className="hidden md:block mx-4 flex-1 h-1 bg-gradient-to-r from-accent to-blue-500"
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.7 + index * 0.2, duration: 0.5 }}
                  />
                )}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

