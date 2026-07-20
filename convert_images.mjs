import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const rootDir = process.cwd();
const publicDir = path.join(rootDir, 'public');
const imagesDir = path.join(publicDir, 'assets', 'images');
const contentFile = path.join(rootDir, 'src', 'data', 'content.js');

const priorityJobs = [
  { dir: publicDir, input: 'Fort.webp', output: 'Fort-mobile.webp', width: 600, quality: 82 },
];

async function run() {
  console.log('🖼️ Starting image optimization and mobile resizing...\n');
  let totalSavedBytes = 0;
  let convertedCount = 0;

  // Run priority hero image job
  for (const job of priorityJobs) {
    const inputPath = path.join(job.dir, job.input);
    const outputPath = path.join(job.dir, job.output);
    if (fs.existsSync(inputPath)) {
      const origSize = fs.statSync(inputPath).size;
      await sharp(inputPath)
        .resize({ width: job.width, withoutEnlargement: true })
        .webp({ quality: job.quality || 80 })
        .toFile(outputPath);
      const newSize = fs.statSync(outputPath).size;
      console.log(`Hero Mobile Image Created: ${job.output}`);
    }
  }

  // Batch convert and resize all assets/images/ files
  const files = fs.readdirSync(imagesDir);
  for (const file of files) {
    const ext = path.extname(file).toLowerCase();
    if (ext === '.webp' && !file.endsWith('-mobile.webp')) {
      const baseName = path.basename(file, ext);
      const inputPath = path.join(imagesDir, file);
      const mobileOutputPath = path.join(imagesDir, `${baseName}-mobile.webp`);

      try {
        const origSize = fs.statSync(inputPath).size;
        
        // Generate a 400px wide version for mobile viewports (huge bandwidth saver!)
        await sharp(inputPath)
          .resize({ width: 400, withoutEnlargement: true })
          .webp({ quality: 75 })
          .toFile(mobileOutputPath);

        const newSize = fs.statSync(mobileOutputPath).size;
        const saved = origSize - newSize;
        if (saved > 0) totalSavedBytes += saved;
        convertedCount++;
        console.log(`Optimized mobile variant: ${baseName}-mobile.webp (${(newSize/1024).toFixed(1)} KB)`);
      } catch (err) {
        console.error(`Error converting ${file}:`, err.message);
      }
    }
  }

  console.log(`\n🎉 Processed ${convertedCount} mobile image variants! Saved: ${(totalSavedBytes / (1024 * 1024)).toFixed(2)} MB`);
}

run().catch(console.error);
