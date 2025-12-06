'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { X, Package, Image as ImageIcon } from 'lucide-react'
import Image from 'next/image'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import SectionBackground from '@/components/SectionBackground'

const images = [
  { src: '/images/camel.png', label: 'Traditional Camel Delivery', category: 'Traditional' },
  { src: '/images/Motorcycle.png', label: 'Urban Motorcycle Courier', category: 'Urban' },
  { src: '/images/Aeroplane.png', label: 'International Air Cargo', category: 'International' },
  { src: '/images/lorry.png', label: 'Heavy Freight Transport', category: 'Freight' },
  { src: '/images/Banner.png', label: 'Rollermax Brand', category: 'Brand' },
  { src: '/images/PHOTO-2025-11-11-17-25-50.jpg', label: 'Delivery Service', category: 'Services' },
  { src: '/images/PHOTO-2025-11-11-15-06-26.jpg', label: 'Logistics Operations', category: 'Operations' },
  { src: '/images/Screenshot 2025-11-11 at 12.28.08.png', label: 'Customer Service', category: 'Services' },
]

export default function GalleryPage() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [filter, setFilter] = useState<string>('All')

  const categories = ['All', ...Array.from(new Set(images.map(img => img.category)))]
  const filteredImages = filter === 'All' ? images : images.filter(img => img.category === filter)

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-dark via-primary to-primary-dark">
      <Navbar />
      
      <SectionBackground imageSrc="/images/Banner.png">
        <div className="pt-24 pb-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center space-x-2 bg-accent/20 text-accent px-4 py-2 rounded-full mb-6">
              <ImageIcon className="w-5 h-5" />
              <span className="text-sm font-semibold">Image Gallery</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white">
              Our <span className="accent-gradient">Fleet & Services</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Explore our comprehensive logistics solutions through images
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-wrap justify-center gap-3 mb-12"
          >
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setFilter(category)}
                className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                  filter === category
                    ? 'bg-accent text-white btn-primary'
                    : 'bg-white/10 text-gray-300 hover:bg-white/20 border-2 border-accent/30'
                }`}
              >
                {category}
              </button>
            ))}
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {filteredImages.map((image, index) => (
              <motion.div
                key={image.src}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className="card cursor-pointer group bg-white/10 backdrop-blur-md border-2 border-accent/20 hover:border-accent/50 transition-all"
                onClick={() => setSelectedImage(image.src)}
              >
                <div className="relative h-64 overflow-hidden rounded-lg mb-4">
                  <Image
                    src={image.src}
                    alt={image.label}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    unoptimized
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary-dark/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-white mb-1">{image.label}</h3>
                    <span className="text-sm text-gray-400">{image.category}</span>
                  </div>
                  <Package className="w-5 h-5 text-white" />
                </div>
              </motion.div>
            ))}
          </div>

          {selectedImage && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
              onClick={() => setSelectedImage(null)}
            >
              <motion.div
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                className="relative max-w-4xl max-h-[90vh]"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={() => setSelectedImage(null)}
                  className="absolute -top-10 right-0 text-white hover:text-accent transition-colors"
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
      </SectionBackground>

      <Footer />
    </div>
  )
}
