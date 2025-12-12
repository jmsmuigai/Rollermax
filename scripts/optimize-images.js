const fs = require('fs').promises;
const path = require('path');
const sharp = require('sharp');

async function ensureDir(dir) {
  try { await fs.mkdir(dir, { recursive: true }); } catch (e) {}
}

async function optimize() {
  const src = path.join(process.cwd(), 'public', 'images');
  const webpDir = path.join(src, 'webp');
  const thumbsDir = path.join(src, 'thumbs');
  await ensureDir(webpDir);
  await ensureDir(thumbsDir);

  try {
    const files = await fs.readdir(src);
    const imageFiles = files.filter(f => /\.(jpe?g|png|webp|gif|heic)$/i.test(f));
    if (!imageFiles.length) {
      console.log('No image files found in public/images');
      return;
    }

    for (const file of imageFiles) {
      const input = path.join(src, file);
      const base = path.parse(file).name;
      const webpOut = path.join(webpDir, `${base}.webp`);
      const thumbOut = path.join(thumbsDir, `${base}-thumb.webp`);

      try {
        await sharp(input)
          .resize({ width: 1600 })
          .webp({ quality: 80 })
          .toFile(webpOut);

        await sharp(input)
          .resize({ width: 400 })
          .webp({ quality: 70 })
          .toFile(thumbOut);

        console.log(`Optimized ${file} -> webp & thumbnail`);
      } catch (err) {
        console.error(`Failed to process ${file}:`, err.message || err);
      }
    }
    console.log('Image optimization complete.');
  } catch (err) {
    console.error('Error reading images:', err.message || err);
  }
}

optimize();
