'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

export default function Logo3D() {
  return (
    <div className="relative">
      {/* 3D Circular Frame with Glow */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="relative w-20 h-20 md:w-24 md:h-24"
      >
        {/* Outer glow ring */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-accent via-accent-light to-accent-dark opacity-70 blur-xl animate-pulse"></div>
        
        {/* Middle ring with gradient */}
        <div className="absolute inset-0 rounded-full border-4 border-transparent bg-gradient-to-br from-accent via-accent-light to-accent-dark p-[2px]">
          <div className="w-full h-full rounded-full bg-gradient-to-br from-primary-dark via-primary to-primary-dark"></div>
        </div>
        
        {/* Inner circle with shine */}
        <div className="absolute inset-2 rounded-full bg-gradient-to-br from-primary via-primary-light to-primary border-2 border-accent/50 overflow-hidden shadow-2xl shine-effect">
          {/* Logo container */}
          <div className="relative w-full h-full flex items-center justify-center p-3">
            {/* Package icon or logo */}
            <div className="relative z-10">
              <div className="flex flex-col items-center">
                <div className="text-2xl md:text-3xl font-bold">
                  <span className="text-white">Roller</span>
                  <span className="text-accent">max</span>
                </div>
                <div className="text-[8px] md:text-[10px] text-gray-300 uppercase tracking-wider mt-0.5">
                  Courier
                </div>
              </div>
            </div>
            
            {/* Reflective highlight */}
            <div className="absolute top-1 left-1/2 transform -translate-x-1/2 w-8 h-8 rounded-full bg-white/20 blur-sm"></div>
          </div>
        </div>
        
        {/* Floating particles around logo */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-accent rounded-full"
            style={{
              top: `${20 + (i * 10)}%`,
              left: `${20 + (i * 10)}%`,
            }}
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 0.3,
            }}
          />
        ))}
      </motion.div>
    </div>
  )
}

