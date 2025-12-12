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
        const list: string[] = await res.json();

        // pick only the five desired images (prefer originals over "-2" duplicates)
        const desired = ['banner', 'motor', 'rollermax', 'camel', 'lorry'];

        const pickBest = (key: string) => {
          const candidates = list.filter(f => f.toLowerCase().includes(key));
          if (candidates.length === 0) return null;
          // prefer filenames without -2 or duplicates
          const noDup = candidates.find(c => !c.includes('-2') && !c.includes('copy'));
          return (noDup || candidates[0]) as string;
        };

        const selected = desired.map(d => pickBest(d)).filter(Boolean) as string[];
        setImages(selected);
      } catch (e) {
        console.warn('No manifest found for gallery:', e);
      }
    }
    loadManifest();
  }, []);

  return (
    <section className="py-20 bg-gradient-to-tr from-roller-blue/5 via-transparent to-roller-red/5">
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {images.map((filename, index) => (
              <motion.div
                key={filename}
                initial={{ opacity: 0, scale: 0.98 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.08 }}
                className="relative h-80 rounded-3xl overflow-hidden transform-gpu hover:scale-[1.03] transition-all duration-500"
              >
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-roller-red/10 via-roller-blue/5 to-roller-red/10 blur-[6px] opacity-70"></div>
                <div className="relative w-full h-full rounded-3xl overflow-hidden ring-1 ring-roller-blue/20">
                  <Image
                    src={`/images/${filename}`}
                    alt={`Operations photo ${index + 1}`}
                    fill
                    className="object-cover transition-transform duration-700 hover:scale-105 filter saturate-125"
                  />
                </div>
                {/* no captions per request */}
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
