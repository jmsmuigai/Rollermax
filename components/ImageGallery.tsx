'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { useState } from 'react'
import SectionBackground from './SectionBackground'

export default function ImageGallery() {
  const images = [
    {
      src: '/images/camel.png',
      fallbackSrc: '/images/PHOTO-2025-11-11-17-25-50.jpg',
      alt: 'Camel caravan - traditional delivery method',
      title: 'Traditional Heritage',
      description: 'Honoring our roots with modern delivery',
      delay: 0,
    },
    {
      src: '/images/Motorcycle.png',
      fallbackSrc: '/images/Screenshot 2025-11-11 at 12.28.08.png',
      alt: 'Motorcycle courier - fast urban delivery',
      title: 'Fast Urban Delivery',
      description: 'Swift motorcycle couriers for city deliveries',
      delay: 0.1,
    },
    {
      src: '/images/Aeroplane.png',
      fallbackSrc: '/images/PHOTO-2025-11-11-15-06-26.jpg',
      alt: 'Cargo airplane - international shipping',
      title: 'Global Reach',
      description: 'International air cargo services',
      delay: 0.2,
    },
    {
      src: '/images/lorry.png',
      fallbackSrc: '/images/PHOTO-2025-11-11-17-25-50.jpg',
      alt: 'Cargo truck - heavy freight transport',
      title: 'Heavy Freight',
      description: 'Large-scale cargo transportation',
      delay: 0.3,
    },
    {
      src: '/images/Banner.png',
      fallbackSrc: '/images/Screenshot 2025-11-11 at 12.28.08.png',
      alt: 'Rollermax banner - brand showcase',
      title: 'Brand Excellence',
      description: 'Professional logistics solutions',
      delay: 0.4,
    },
  ]

  return (
    <SectionBackground imageSrc="/images/PHOTO-2025-11-11-17-25-50.jpg">
      <section className="section-padding relative overflow-hidden bg-gradient-to-b from-primary/50 to-primary-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Our <span className="accent-gradient">Delivery Fleet</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            From traditional caravans to modern aircraft - we deliver everywhere
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {images.map((image, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: image.delay }}
              className="group relative"
            >
              {/* Card with image */}
              <div className="card overflow-hidden p-0 bg-gradient-to-br from-primary/90 to-primary-dark/90 border-2 border-accent/20 group-hover:border-accent/50 transition-all duration-500">
                {/* Image container */}
                <div className="relative h-64 md:h-72 overflow-hidden">
                  {/* Actual image */}
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    onError={(e) => {
                      // Fallback to fallback image or placeholder
                      const target = e.target as HTMLImageElement
                      if (image.fallbackSrc) {
                        target.src = image.fallbackSrc
                      }
                    }}
                  />
                  
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/80 via-primary/60 to-primary-dark/90"></div>
                  
                  {/* Overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-primary-dark via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  {/* Shine effect */}
                  <div className="absolute inset-0 shine-effect opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  {/* Corner accent */}
                  <div className="absolute top-4 right-4 w-16 h-16 bg-accent/20 rounded-full blur-xl group-hover:bg-accent/40 transition-all duration-500"></div>
                </div>
                
                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-2">{image.title}</h3>
                  <p className="text-gray-400 text-sm">{image.description}</p>
                </div>
                
                {/* Corner accent */}
                <div className="absolute top-4 right-4 w-12 h-12 bg-accent/20 rounded-full blur-xl group-hover:bg-accent/40 transition-all duration-500"></div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Decorative elements */}
        <div className="absolute top-10 left-10 w-64 h-64 bg-accent/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl"></div>
        </div>
      </section>
    </SectionBackground>
  )
}

