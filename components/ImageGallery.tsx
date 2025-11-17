'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

export default function ImageGallery() {
  const images = [
    {
      src: '/images/camel.png',
      alt: 'Camel caravan - traditional delivery method',
      title: 'Traditional Heritage',
      description: 'Honoring our roots with modern delivery',
      delay: 0,
    },
    {
      src: '/images/Motorcycle.png',
      alt: 'Motorcycle courier - fast urban delivery',
      title: 'Fast Urban Delivery',
      description: 'Swift motorcycle couriers for city deliveries',
      delay: 0.1,
    },
    {
      src: '/images/Aeroplane.png',
      alt: 'Cargo airplane - international shipping',
      title: 'Global Reach',
      description: 'International air cargo services',
      delay: 0.2,
    },
    {
      src: '/images/lorry.png',
      alt: 'Cargo truck - heavy freight transport',
      title: 'Heavy Freight',
      description: 'Large-scale cargo transportation',
      delay: 0.3,
    },
    {
      src: '/images/Banner.png',
      alt: 'Rollermax banner - brand showcase',
      title: 'Brand Excellence',
      description: 'Professional logistics solutions',
      delay: 0.4,
    },
  ]

  return (
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
                  {/* Placeholder for image - will use actual images when available */}
                  <div className="absolute inset-0 bg-gradient-to-br from-accent/20 via-blue-500/20 to-accent/20 flex items-center justify-center">
                    <div className="text-center p-8">
                      <div className="text-6xl mb-4">🚚</div>
                      <p className="text-white font-semibold text-lg">{image.title}</p>
                    </div>
                  </div>
                  
                  {/* Overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-primary-dark via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  {/* Shine effect */}
                  <div className="absolute inset-0 shine-effect opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
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
  )
}

