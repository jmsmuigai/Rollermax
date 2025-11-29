'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Menu, X, Sun, Moon } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTheme } from '@/contexts/ThemeContext'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { theme, toggleTheme } = useTheme()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = [
    { href: '/track', label: 'Track' },
    { href: '/#services', label: 'Ship' },
    { href: '/contact', label: 'Contact & Support' },
  ]

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled 
        ? 'bg-white/95 dark:bg-[var(--bg-secondary)]/95 backdrop-blur-md shadow-lg border-b border-gray-200 dark:border-gray-700' 
        : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="relative w-10 h-10">
              <Image
                src="/images/Rollermax logo.png"
                alt="Rollermax Logo"
                fill
                className="object-contain"
                priority
              />
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-bold text-primary-dark dark:text-white">
                Roller<span className="text-accent">max</span>
              </span>
              <span className="text-[10px] text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                Courier
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-gray-700 dark:text-gray-300 hover:text-primary-dark dark:hover:text-accent transition-colors font-medium text-sm relative group"
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent transition-all duration-300 group-hover:w-full"></span>
              </Link>
            ))}
            <Link
              href="/contact"
              className="ml-4 text-primary-dark dark:text-white hover:text-accent transition-colors font-medium text-sm"
            >
              Work with us
            </Link>
            <button
              onClick={toggleTheme}
              className="ml-4 p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              aria-label="Toggle theme"
            >
              {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
            </button>
            <Link
              href="/contact"
              className="ml-4 bg-primary-dark dark:bg-accent text-white px-4 py-2 rounded-lg hover:bg-primary-light dark:hover:bg-accent-light transition-colors font-medium text-sm"
            >
              Log in or Sign up
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-2">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300"
              aria-label="Toggle theme"
            >
              {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300"
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
            className="md:hidden bg-white dark:bg-[var(--bg-secondary)] border-t border-gray-200 dark:border-gray-700"
          >
            <div className="px-4 pt-2 pb-4 space-y-2">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className="block px-3 py-2 text-gray-700 dark:text-gray-300 hover:text-primary-dark dark:hover:text-accent hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-colors"
                >
                  {item.label}
                </Link>
              ))}
              <Link
                href="/contact"
                className="block px-3 py-2 text-primary-dark dark:text-accent hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Work with us
              </Link>
              <Link
                href="/contact"
                className="block w-full text-center bg-primary-dark dark:bg-accent text-white px-4 py-2 rounded-lg font-medium mt-4"
                onClick={() => setIsOpen(false)}
              >
                Log in or Sign up
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
