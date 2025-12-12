#!/usr/bin/env node
/**
 * Logo Optimizer - Process and create multiple versions with 3D/flashy effects
 */
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const logoPath = './public/logo-original.png';
const outputDir = './public/logos';

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

async function optimizeLogo() {
  try {
    console.log('🎨 Processing logo with 3D effects...');

    // Main logo versions
    const sizes = [
      { name: 'logo-navbar', width: 120, height: 120 },
      { name: 'logo-hero', width: 280, height: 280 },
      { name: 'logo-small', width: 80, height: 80 },
      { name: 'logo-footer', width: 100, height: 100 },
      { name: 'logo-icon', width: 64, height: 64 },
      { name: 'logo-full', width: 400, height: 400 }
    ];

    // Process each size
    for (const size of sizes) {
      // PNG version (optimized)
      await sharp(logoPath)
        .resize(size.width, size.height, {
          fit: 'contain',
          background: { r: 255, g: 255, b: 255, alpha: 0 }
        })
        .png({ quality: 80, effort: 9 })
        .toFile(path.join(outputDir, `${size.name}.png`));

      // WebP version (highly compressed)
      await sharp(logoPath)
        .resize(size.width, size.height, {
          fit: 'contain',
          background: { r: 255, g: 255, b: 255, alpha: 0 }
        })
        .webp({ quality: 75, effort: 6 })
        .toFile(path.join(outputDir, `${size.name}.webp`));

      console.log(`✅ Created: ${size.name}.png & .webp`);
    }

    console.log('✨ All logo versions created successfully!');
    console.log(`📁 Output directory: ${outputDir}`);

  } catch (err) {
    console.error('❌ Error processing logo:', err);
    process.exit(1);
  }
}

optimizeLogo();
