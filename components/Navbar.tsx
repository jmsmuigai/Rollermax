'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Menu, X, Phone, Package, Sun, Moon } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { usePathname } from 'next/navigation'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [theme, setTheme] = useState<'light' | 'dark'>('dark')
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null
      if (savedTheme) {
        setTheme(savedTheme)
        document.documentElement.setAttribute('data-theme', savedTheme)
      } else {
        document.documentElement.setAttribute('data-theme', 'dark')
      }
    }
  }, [])

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light'
    setTheme(newTheme)
    if (typeof window !== 'undefined') {
      localStorage.setItem('theme', newTheme)
      document.documentElement.setAttribute('data-theme', newTheme)
    }
  }

  const navItems = [
    { href: '/', label: 'Home', icon: '🏠' },
    { href: '/#services', label: 'Services', icon: '🚚' },
    { href: '/#about', label: 'About', icon: '📦' },
    { href: '/track', label: 'Track Shipment', icon: '📍' },
    { href: '/gallery', label: 'Gallery', icon: '🖼️' },
    { href: '/contact', label: 'Contact', icon: '📞' },
  ]

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('#')) {
      e.preventDefault()
      const targetId = href.substring(1)
      const element = document.getElementById(targetId)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' })
      } else if (pathname !== '/') {
        window.location.href = `/${href}`
      }
    }
    setIsOpen(false)
  }

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 nav-islamic ${
      scrolled ? 'bg-primary-dark/95 backdrop-blur-md shadow-2xl' : 'bg-primary-dark/90'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo with actual logo image */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="relative logo-container">
              <img
                src="/images/Rollermax logo.png"
                alt="Rollermax Logo"
                className="logo-image"
                width={60}
                height={60}
                onError={(e) => {
                  console.error('Logo failed to load');
                  (e.target as HTMLImageElement).style.display = 'none';
                }}
              />
            </div>
            <div className="flex flex-col">
              <span className="logo-text text-2xl font-bold">
                Roller<span className="text-accent-red">max</span>
              </span>
              <span className="text-xs text-gray-300 uppercase tracking-wider group-hover:text-accent transition-colors">
                Courier & Logistics
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className="nav-link text-gray-300 hover:text-accent transition-colors font-medium flex items-center space-x-2"
              >
                <span className="text-lg">{item.icon}</span>
                <span>{item.label}</span>
              </Link>
            ))}
            <button
              onClick={toggleTheme}
              className="ml-4 p-2 rounded-lg bg-white/10 text-white hover:bg-accent/20 transition-colors"
              aria-label="Toggle theme"
            >
              {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
            </button>
            <Link
              href="/contact"
              className="btn-primary text-white ml-4 flex items-center space-x-2"
            >
              <span>Get Quote</span>
              <span>🚀</span>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-2">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-white/10 text-white"
              aria-label="Toggle theme"
            >
              {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-300 hover:text-accent parcel-icon"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
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
                  onClick={(e) => handleNavClick(e, item.href)}
                  className="flex items-center space-x-3 px-3 py-3 text-gray-300 hover:text-accent hover:bg-primary/50 rounded-lg transition-colors nav-link"
                >
                  <span className="text-xl">{item.icon}</span>
                  <span className="font-medium">{item.label}</span>
                </Link>
              ))}
              <Link
                href="tel:+254722227172"
                className="flex items-center space-x-2 px-3 py-3 text-accent hover:bg-primary/50 rounded-lg transition-colors btn-outline justify-center"
              >
                <Phone className="w-5 h-5" />
                <span className="font-bold">Call Now</span>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
