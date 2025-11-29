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
    <div className="relative overflow-hidden bg-gray-100 dark:bg-gray-900 py-8">
      {/* Gradient overlays */}
      <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-white dark:from-gray-900 to-transparent z-10"></div>
      <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white dark:from-gray-900 to-transparent z-10"></div>
      
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
              className="relative w-64 h-40 flex-shrink-0 rounded-lg overflow-hidden shadow-lg group"
            >
              <Image
                src={src}
                alt={`Rollermax ${index}`}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  )
}

