'use client';
import { useState } from 'react';
import Link from 'next/link';
import { Menu, X, User, Package, Globe } from 'lucide-react';
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
      <nav className="fixed w-full z-50 bg-white/95 backdrop-blur-sm shadow-md">
        <div className="container mx-auto px-4 h-20 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-1">
            <div className="w-10 h-10 bg-roller-red rounded-lg flex items-center justify-center transform rotate-45">
              <span className="text-white font-bold text-xl -rotate-45">R</span>
            </div>
            <span className="text-3xl font-bold text-roller-blue ml-2 tracking-tighter">
              Roller<span className="text-roller-red">max</span>
            </span>
          </Link>

          {/* Desktop Links */}
          <div className="hidden lg:flex items-center gap-8 font-medium text-gray-600">
            <Link href="#track" className="hover:text-roller-blue flex items-center gap-2"><Package size={18}/> Track</Link>
            <Link href="#services" className="hover:text-roller-blue flex items-center gap-2"><Globe size={18}/> Services</Link>
            <Link href="/contact" className="hover:text-roller-blue">Support</Link>
          </div>

          {/* Login Button */}
          <div className="hidden lg:flex items-center gap-4">
            <button onClick={toggleLoginPopup} className="flex items-center gap-2 text-roller-blue font-bold hover:bg-blue-50 px-4 py-2 rounded-full transition-all">
              <User size={20} />
              Log In / Sign Up
            </button>
            <Link href="/quote" className="bg-roller-red text-white px-6 py-2.5 rounded-full font-bold shadow-lg hover:shadow-red-500/30 hover:scale-105 transition-all">
              Ship Now
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button onClick={() => setIsOpen(!isOpen)} className="lg:hidden text-roller-blue">
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
              className="lg:hidden bg-white border-t p-4 flex flex-col gap-4 shadow-xl"
            >
              <Link href="#track" className="p-2 hover:bg-gray-50 rounded-lg">Track Shipment</Link>
              <Link href="#services" className="p-2 hover:bg-gray-50 rounded-lg">Our Services</Link>
              <button onClick={toggleLoginPopup} className="w-full bg-roller-blue text-white py-3 rounded-lg font-bold">Client Login</button>
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