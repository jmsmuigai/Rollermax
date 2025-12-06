'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { X } from 'lucide-react'
import Image from 'next/image'

const images = [
  { src: '/images/camel.png', label: 'Traditional Camel Delivery' },
  { src: '/images/Motorcycle.png', label: 'Urban Motorcycle Courier' },
  { src: '/images/Aeroplane.png', label: 'International Air Cargo' },
  { src: '/images/lorry.png', label: 'Heavy Freight Transport' },
  { src: '/images/Banner.png', label: 'Rollermax Brand' },
  { src: '/images/PHOTO-2025-11-11-17-25-50.jpg', label: 'Delivery Service' },
  { src: '/images/PHOTO-2025-11-11-15-06-26.jpg', label: 'Logistics Operations' },
  { src: '/images/Screenshot 2025-11-11 at 12.28.08.png', label: 'Customer Service' },
]

export default function GalleryPage() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)

  return (
     <div className="min-h-screen bg-[var(--bg-secondary)] pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-display font-bold text-primary-dark mb-4">
            Image Gallery
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Explore our fleet, services, and operations.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {images.map((image, index) => (
            <motion.div
              key={image.src}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-lg shadow-md cursor-pointer group"
              onClick={() => setSelectedImage(image.src)}
            >
              <div className="relative h-64 overflow-hidden rounded-t-lg">
                <Image
                  src={image.src}
                  alt={image.label}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-110"
                  unoptimized
                />
              </div>
              <div className="p-4">
                <h3 className="text-lg font-bold text-primary-dark">{image.label}</h3>
              </div>
            </motion.div>
          ))}
        </div>

        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              className="relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute -top-8 -right-8 text-white hover:text-accent"
              >
                <X className="w-6 h-6" />
              </button>
              <Image
                src={selectedImage}
                alt="Full size"
                width={1200}
                height={800}
                className="max-w-full max-h-[90vh] object-contain rounded-lg"
                unoptimized
              />
            </motion.div>
          </motion.div>
        )}
      </div>
    </div>
  )
}