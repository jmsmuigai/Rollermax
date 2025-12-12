'use client';
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X, User, Package, Globe, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import LoginPopup from './LoginPopup';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showLoginPopup, setShowLoginPopup] = useState(false);

  const toggleLoginPopup = () => {
    setShowLoginPopup(!showLoginPopup);
  };

  return (
    <>
      <nav className="fixed w-full z-50 bg-primary/90 backdrop-blur-lg shadow-lg border-b border-white/5">
        <div className="container mx-auto px-4 h-20 flex items-center justify-between">
          {/* Logo with 3D Effects */}
          <Link href="/" className="flex items-center group">
            <motion.div
              className="flex items-center gap-3 px-3 py-1 rounded-lg hover:bg-white/5 transition-all"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.98 }}
            >
              {/* 3D Rectangular Frame */}
              <div className="relative w-14 h-12 transform-gpu" style={{ perspective: 800 }}>
                <motion.div
                  className="absolute inset-0 rounded-lg bg-white/6 border border-white/10 flex items-center justify-center"
                  animate={{ rotateY: [0, 6, -6, 0] }}
                  transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  <Image
                    src="/logos/logo-navbar.webp"
                    alt="Rollermax Logo"
                    width={52}
                    height={52}
                    priority
                    className="object-contain drop-shadow-lg"
                  />
                </motion.div>
                {/* subtle inner shine */}
                <div className="absolute inset-0 pointer-events-none rounded-lg" style={{ boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.04)' }} />
              </div>

              <span className="text-lg font-bold bg-gradient-to-r from-roller-blue via-roller-red to-roller-blue bg-clip-text text-transparent">Rollermax</span>
            </motion.div>
          </Link>

          {/* Desktop Links */}
          <div className="hidden lg:flex items-center gap-8 font-medium text-accent">
            <Link href="#track" className="hover:text-white flex items-center gap-2"><Package size={18}/> Track</Link>
            <Link href="#services" className="hover:text-white flex items-center gap-2"><Globe size={18}/> Services</Link>
            <Link href="/contact" className="hover:text-white">Support</Link>
          </div>

          {/* Login & Ship Now Buttons */}
          <div className="hidden lg:flex items-center gap-4">
            <button onClick={toggleLoginPopup} className="flex items-center gap-2 text-accent font-semibold hover:text-white px-4 py-2 rounded-full transition-all">
              <User size={20} />
              Login
            </button>
            <Link href="/quote" className="group bg-roller-blue text-white px-6 py-2.5 rounded-full font-bold shadow-lg hover:shadow-blue-500/40 hover:scale-105 transition-all flex items-center gap-2">
              Ship Now <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button onClick={() => setIsOpen(!isOpen)} className="lg:hidden text-white">
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
        
        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden bg-primary/95 backdrop-blur-lg border-t border-white/5 p-4 flex flex-col gap-4 shadow-xl"
            >
              <Link href="#track" className="p-2 text-accent hover:bg-white/5 rounded-lg">Track Shipment</Link>
              <Link href="#services" className="p-2 text-accent hover:bg-white/5 rounded-lg">Our Services</Link>
              <button onClick={toggleLoginPopup} className="w-full bg-roller-blue text-white py-3 rounded-lg font-bold mt-2">Client Login</button>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
      <AnimatePresence>
        {showLoginPopup && <LoginPopup onClose={toggleLoginPopup} />}
      </AnimatePresence>
    </>
  );
};
export default Navbar;