'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'

interface SectionBackgroundProps {
  imageSrc?: string
  overlay?: boolean
  children: React.ReactNode
  className?: string
}

export default function SectionBackground({ 
  imageSrc, 
  overlay = true, 
  children,
  className = ''
}: SectionBackgroundProps) {
  const [imageLoaded, setImageLoaded] = useState(false)

  return (
    <div className={`relative ${className}`}>
      {/* Background Image */}
      {imageSrc && (
        <>
          <div className="absolute inset-0 overflow-hidden">
            <Image
              src={imageSrc}
              alt="Background"
              fill
              className={`object-cover transition-opacity duration-1000 ${
                imageLoaded ? 'opacity-20' : 'opacity-0'
              }`}
              onLoad={() => setImageLoaded(true)}
              priority={false}
              quality={75}
            />
            {/* Overlay */}
            {overlay && (
              <div className="absolute inset-0 bg-gradient-to-b from-primary-dark/95 via-primary-dark/85 to-primary-dark/95"></div>
            )}
            {/* Islamic pattern overlay */}
            <div className="absolute inset-0 opacity-30" style={{
              backgroundImage: `
                repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255, 107, 53, 0.1) 10px, rgba(255, 107, 53, 0.1) 20px),
                repeating-linear-gradient(-45deg, transparent, transparent 10px, rgba(26, 66, 138, 0.1) 10px, rgba(26, 66, 138, 0.1) 20px)
              `,
            }}></div>
          </div>
        </>
      )}
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  )
}

