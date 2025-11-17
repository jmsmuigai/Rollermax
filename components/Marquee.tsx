'use client'

import { motion } from 'framer-motion'

interface MarqueeProps {
  items: string[]
  direction?: 'left' | 'right'
  speed?: number
  className?: string
}

export default function Marquee({ 
  items, 
  direction = 'left', 
  speed = 30,
  className = '' 
}: MarqueeProps) {
  const duplicatedItems = [...items, ...items]

  return (
    <div className={`overflow-hidden whitespace-nowrap ${className}`}>
      <motion.div
        className="inline-flex"
        animate={{
          x: direction === 'left' ? [0, -50] : [0, 50],
        }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: 'loop',
            duration: speed,
            ease: 'linear',
          },
        }}
        style={{
          width: '200%',
        }}
      >
        {duplicatedItems.map((item, index) => (
          <div
            key={index}
            className="inline-flex items-center px-8 text-xl md:text-2xl font-bold text-white/80 hover:text-accent transition-colors"
          >
            <span className="mr-8">{item}</span>
            <span className="text-accent">•</span>
          </div>
        ))}
      </motion.div>
    </div>
  )
}

// Special illusional marquee with gradient effect
export function IllusionalMarquee() {
  const services = [
    '🚀 AI-Powered Tracking',
    '⚡ Fast Delivery',
    '🌍 Global Shipping',
    '📦 Secure Packaging',
    '🔄 Real-Time Updates',
    '💎 Premium Service',
    '🤝 Trusted Partner',
    '📱 24/7 Support',
  ]

  return (
    <div className="relative py-6 bg-gradient-to-r from-primary via-primary-light to-primary overflow-hidden">
      {/* Gradient overlays for illusional effect */}
      <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-primary-dark to-transparent z-10"></div>
      <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-primary-dark to-transparent z-10"></div>
      
      {/* Animated gradient background */}
      <motion.div
        className="absolute inset-0 opacity-20"
        animate={{
          background: [
            'linear-gradient(90deg, #1A428A 0%, #FF6B35 50%, #1A428A 100%)',
            'linear-gradient(90deg, #FF6B35 0%, #1A428A 50%, #FF6B35 100%)',
            'linear-gradient(90deg, #1A428A 0%, #FF6B35 50%, #1A428A 100%)',
          ],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: 'linear',
        }}
      ></motion.div>
      
      <div className="relative z-0">
        <Marquee items={services} direction="left" speed={25} />
      </div>
      
      {/* Second layer for depth */}
      <div className="relative z-0 -mt-4 opacity-60">
        <Marquee items={services} direction="right" speed={30} />
      </div>
    </div>
  )
}

