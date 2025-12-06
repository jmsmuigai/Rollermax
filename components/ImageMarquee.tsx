'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

const images = [
  '/images/camel.png',
  '/images/Motorcycle.png',
  '/images/Aeroplane.png',
  '/images/lorry.png',
  '/images/Banner.png',
  '/images/PHOTO-2025-11-11-17-25-50.jpg',
  '/images/PHOTO-2025-11-11-15-06-26.jpg',
  '/images/Screenshot 2025-11-11 at 12.28.08.png',
]

export default function ImageMarquee() {
  const duplicatedImages = [...images, ...images]

  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-primary-dark via-primary/80 to-primary-dark py-12">
      {/* Modern background pattern */}
      <div className="absolute inset-0 opacity-10" style={{
        backgroundImage: `
          repeating-linear-gradient(45deg, transparent, transparent 25px, rgba(220, 38, 38, 0.1) 25px, rgba(220, 38, 38, 0.1) 50px),
          repeating-linear-gradient(-45deg, transparent, transparent 25px, rgba(26, 66, 138, 0.1) 25px, rgba(26, 66, 138, 0.1) 50px)
        `,
      }}></div>
      {/* Gradient overlays for fade effect */}
      <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-primary-dark via-primary-dark/80 to-transparent z-10"></div>
      <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-primary-dark via-primary-dark/80 to-transparent z-10"></div>
      
      <div className="flex space-x-4" style={{ width: '200%' }}>
        <motion.div
          className="flex space-x-4"
          animate={{
            x: [0, -50 + '%'],
          }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: 'loop',
              duration: 30,
              ease: 'linear',
            },
          }}
        >
          {duplicatedImages.map((src, index) => (
            <div
              key={index}
              className="relative w-64 h-40 flex-shrink-0 rounded-xl overflow-hidden shadow-2xl group border-2 border-accent/20 hover:border-accent/50 transition-all"
            >
              <Image
                src={src}
                alt={`Rollermax ${index}`}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary-dark/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              {/* Glow effect on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-accent/0 to-accent/0 group-hover:from-accent/20 group-hover:to-transparent transition-all duration-500"></div>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  )
}

