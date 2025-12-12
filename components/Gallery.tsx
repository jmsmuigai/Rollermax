'use client'
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useEffect, useState } from 'react';

const Gallery = () => {
  const [images, setImages] = useState<string[]>([]);

  useEffect(() => {
    async function loadManifest() {
      try {
        const res = await fetch('/images/manifest.json');
        if (!res.ok) return;
        const list = await res.json();
        // filter out thumbnails/webp folders
        const filtered = list.filter((f: string) => !f.includes('thumb') && !f.startsWith('webp/'));
        setImages(filtered);
      } catch (e) {
        console.warn('No manifest found for gallery:', e);
      }
    }
    loadManifest();
  }, []);

  return (
    <section className="py-20 bg-transparent">
      <div className="container mx-auto px-4">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl lg:text-5xl font-bold text-center mb-16 text-roller-blue"
        >
          Our <span className="text-roller-red">Operations</span> Gallery
        </motion.h2>

        {images.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {images.map((filename, index) => (
              <motion.div
                key={filename}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.06 }}
                className="group relative h-80 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300"
              >
                <div className="relative w-full h-full">
                  <Image
                    src={`/images/${filename}`}
                    alt={filename}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-roller-blue/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                    <p className="text-white text-xl font-semibold p-6">{filename.replace(/[-_]/g, ' ').replace(/\.(jpg|jpeg|png|webp|gif|svg)$/i, '')}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="mt-8 p-8 rounded-2xl bg-gradient-to-r from-roller-blue to-roller-red text-white text-center">
            <p className="text-2xl font-bold">Gallery coming soon — add your images to /assets_to_import and run `npm run import-images`</p>
            <p className="mt-2 text-sm">Bring your brand alive with high-quality photos of your fleet and operations.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default Gallery;
