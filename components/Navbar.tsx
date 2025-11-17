'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Menu, X, Package, Phone } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = [
    { href: '/', label: 'Home' },
    { href: '/#services', label: 'Services' },
    { href: '/#about', label: 'About' },
    { href: '/track', label: 'Track Shipment' },
    { href: '/contact', label: 'Contact' },
  ]

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? 'bg-primary-dark/95 backdrop-blur-md shadow-lg' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3">
            <div className="relative">
              <Package className="w-10 h-10 text-accent" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-accent rounded-full pulse-glow"></div>
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-bold">
                <span className="text-white">Roller</span>
                <span className="text-accent">max</span>
              </span>
              <span className="text-xs text-gray-400 uppercase tracking-wider">Courier</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-gray-300 hover:text-accent transition-colors font-medium"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/contact"
              className="btn-primary text-white"
            >
              Get Quote
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-gray-300 hover:text-accent"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-primary-light border-t border-accent/20"
          >
            <div className="px-4 pt-2 pb-4 space-y-2">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className="block px-3 py-2 text-gray-300 hover:text-accent hover:bg-primary/50 rounded-lg transition-colors"
                >
                  {item.label}
                </Link>
              ))}
              <Link
                href="tel:+254722227172"
                className="flex items-center space-x-2 px-3 py-2 text-accent hover:bg-primary/50 rounded-lg transition-colors"
              >
                <Phone className="w-4 h-4" />
                <span>Call Now</span>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}

