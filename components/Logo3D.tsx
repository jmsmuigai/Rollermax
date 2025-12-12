'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';

interface Logo3DProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  animated?: boolean;
  className?: string;
  showLabel?: boolean;
  perspective?: '3d' | 'flat';
  glowEffect?: boolean;
}

const sizeMap = {
  sm: { width: 60, height: 60, img: 'logo-small.webp' },
  md: { width: 100, height: 100, img: 'logo-navbar.webp' },
  lg: { width: 200, height: 200, img: 'logo-hero.webp' },
  xl: { width: 300, height: 300, img: 'logo-full.webp' },
};

export default function Logo3D({
  size = 'md',
  animated = true,
  className = '',
  showLabel = false,
  perspective = '3d',
  glowEffect = true,
}: Logo3DProps) {
  const { width, height, img } = sizeMap[size];

  return (
    <motion.div
      className={`flex flex-col items-center justify-center ${className}`}
      whileHover={animated ? { scale: 1.1 } : undefined}
      whileTap={animated ? { scale: 0.95 } : undefined}
    >
      <div
        className={`relative ${glowEffect ? 'drop-shadow-2xl' : ''}`}
        style={{
          perspective: perspective === '3d' ? '1000px' : 'none',
          transformStyle: perspective === '3d' ? 'preserve-3d' : 'flat',
        }}
      >
        {animated && (
          <motion.div
            animate={{
              rotateY: [0, 360],
              rotateX: [0, 5, -5, 0],
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: 'linear',
            }}
            style={{
              transformStyle: 'preserve-3d',
              backfaceVisibility: 'hidden',
            }}
          >
            <Image
              src={`/logos/${img}`}
              alt="Rollermax Logo"
              width={width}
              height={height}
              priority
              className={`object-contain filter transition-all ${
                glowEffect ? 'group-hover:drop-shadow-blue-500/50' : ''
              }`}
            />
          </motion.div>
        )}

        {!animated && (
          <Image
            src={`/logos/${img}`}
            alt="Rollermax Logo"
            width={width}
            height={height}
            priority
            className="object-contain filter drop-shadow-lg"
          />
        )}

        {/* Glow layer for extra effect */}
        {glowEffect && (
          <motion.div
            className="absolute inset-0 rounded-full bg-gradient-to-r from-roller-blue to-roller-red opacity-0"
            animate={{ opacity: [0.1, 0.2, 0.1] }}
            transition={{ duration: 3, repeat: Infinity }}
            style={{ filter: 'blur(20px)' }}
          />
        )}
      </div>

      {showLabel && (
        <motion.div
          className="mt-4 text-center"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h2 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-roller-blue via-roller-red to-blue-600 bg-clip-text text-transparent">
            Rollermax
          </h2>
          <p className="text-xs md:text-sm text-gray-400 mt-1">Professional Courier Services</p>
        </motion.div>
      )}
    </motion.div>
  );
}
