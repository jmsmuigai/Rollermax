'use client';
import { motion } from 'framer-motion';
import { Search, ArrowRight, Truck, Plane, Ship } from 'lucide-react';
import { useState, useEffect } from 'react';
import Image from 'next/image';

const Hero = () => {
  const [trackingId, setTrackingId] = useState('');
  const [bannerSrc, setBannerSrc] = useState<string | null>(null);

  useEffect(() => {
    async function loadBanner() {
      try {
        const res = await fetch('/images/manifest.json');
        if (!res.ok) return;
        const list = await res.json();
        const banner = list.find((f: string) => /banner/i.test(f));
        if (banner) setBannerSrc(`/images/${banner}`);
      } catch (e) {
        // ignore
      }
    }
    loadBanner();
  }, []);

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Searching for shipment: ${trackingId}. (Backend Integration Ready)`);
  };

  return (
    <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-gradient-to-br from-slate-50 to-blue-50">
      
      {/* Background Abstract 3D Shapes */}
      <div className="absolute top-0 right-0 w-1/2 h-full opacity-10 pointer-events-none">
        <div className="absolute top-20 right-10 w-64 h-64 bg-roller-blue rounded-full blur-3xl mix-blend-multiply animate-pulse"></div>
        <div className="absolute top-40 right-40 w-64 h-64 bg-roller-red rounded-full blur-3xl mix-blend-multiply animate-pulse" style={{ animationDelay: '700ms' }} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          
          {/* Left: Text Content */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="flex-1 max-w-2xl"
          >
            <span className="inline-block py-1 px-3 rounded-full bg-blue-100 text-roller-blue text-sm font-bold mb-6">
              🚀 AI-Powered Logistics v2.0
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold leading-tight text-roller-dark mb-6">
              Global Shipping. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-roller-blue to-roller-red">
                Simplified.
              </span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Experience the future of delivery with Rollermax. We combine Islamic business ethics with cutting-edge AI to deliver your packages faster, safer, and smarter.
            </p>
          </motion.div>

          {/* Right: Banner Image or Tracking Card */}
          {bannerSrc && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex-1 w-full max-w-md h-96 rounded-3xl overflow-hidden shadow-2xl relative"
            >
              <Image
                src={bannerSrc}
                alt="Rollermax Delivery"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-roller-blue/60 to-transparent" />
            </motion.div>
          )}
          
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex-1 w-full max-w-md"
          >
            <div className="glass-panel p-6 sm:p-8 rounded-3xl relative overflow-hidden bg-gradient-to-br from-white/80 to-roller-blue/5">
              {/* Decorative top bar */}
              <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-roller-blue to-roller-red"></div>
              
              <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <Search className="text-roller-red" /> Track Your Shipment
              </h3>

              <form onSubmit={handleTrack} className="space-y-4">
                <div className="relative">
                  <textarea 
                    className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-roller-blue focus:border-transparent outline-none transition-all resize-none font-mono text-sm"
                    rows={3}
                    placeholder="Enter tracking number(s)..."
                    value={trackingId}
                    onChange={(e) => setTrackingId(e.target.value)}
                  />
                </div>
                <button type="submit" className="w-full py-4 bg-gradient-to-r from-roller-blue to-roller-red text-white rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2">
                  Track Now <ArrowRight size={20} />
                </button>
              </form>

              <div className="mt-8 grid grid-cols-3 gap-4 text-center border-t border-gray-100 pt-6">
                <div className="flex flex-col items-center gap-2 text-gray-500 hover:text-roller-blue cursor-pointer transition-colors">
                  <div className="p-3 bg-blue-50 rounded-full"><Plane size={20} /></div>
                  <span className="text-xs font-bold">Air Freight</span>
                </div>
                <div className="flex flex-col items-center gap-2 text-gray-500 hover:text-roller-blue cursor-pointer transition-colors">
                  <div className="p-3 bg-blue-50 rounded-full"><Ship size={20} /></div>
                  <span className="text-xs font-bold">Ocean</span>
                </div>
                <div className="flex flex-col items-center gap-2 text-gray-500 hover:text-roller-blue cursor-pointer transition-colors">
                  <div className="p-3 bg-blue-50 rounded-full"><Truck size={20} /></div>
                  <span className="text-xs font-bold">Road</span>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
export default Hero;