const fs = require('fs').promises;
const path = require('path');

async function ensureDir(dir) {
  try {
    await fs.mkdir(dir, { recursive: true });
  } catch (e) {}
}

function normalizeName(name) {
  return name
    .replace(/\s+/g, '-')
    .replace(/[^a-zA-Z0-9._-]/g, '')
    .toLowerCase();
}

async function run() {
  const srcDir = path.join(process.cwd(), 'assets_to_import');
  const destDir = path.join(process.cwd(), 'public', 'images');

  await ensureDir(destDir);

  try {
    const files = await fs.readdir(srcDir);
    if (!files.length) {
      console.log('No files found in assets_to_import. Add images there and run `npm run import-images`.');
      return;
    }

    for (const file of files) {
      const srcPath = path.join(srcDir, file);
      const stat = await fs.stat(srcPath);
      if (!stat.isFile()) continue;
      const normalized = normalizeName(file);
      const destPath = path.join(destDir, normalized);
      await fs.copyFile(srcPath, destPath);
      console.log(`Copied: ${file} -> ${path.relative(process.cwd(), destPath)}`);
    }
    console.log('Import complete. Please check public/images and commit the files.');
  } catch (err) {
    console.error('Error importing images:', err.message || err);
  }
}

run();
