import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const rootDir = process.cwd();
const publicDir = path.join(rootDir, 'public');
const imagesDir = path.join(publicDir, 'assets', 'images');

const jobs = [
  { dir: publicDir, input: 'logo_maharana.png', output: 'logo_maharana.webp', width: 400 },
  { dir: publicDir, input: 'Fort.png', output: 'Fort.webp', width: 1200 },
  { dir: publicDir, input: 'chittortech_logo.png', output: 'chittortech_logo.webp', width: 400 },
  { dir: imagesDir, input: 'waterfall_generated.png', output: 'waterfall_generated.webp', width: 1200 },
  { dir: imagesDir, input: 'nature_generated.png', output: 'nature_generated.webp', width: 1200 },
  { dir: imagesDir, input: 'fort_generated.png', output: 'fort_generated.webp', width: 1200 },
  { dir: imagesDir, input: 'temple_generated.png', output: 'temple_generated.webp', width: 1200 },
  { dir: imagesDir, input: 'fort-legacy.jpg', output: 'fort-legacy.webp', width: 1200 },
  { dir: imagesDir, input: 'tempo_traveller.png', output: 'tempo_traveller.webp', width: 800 },
  { dir: imagesDir, input: 'sedan_taxi.png', output: 'sedan_taxi.webp', width: 800 },
  { dir: imagesDir, input: 'suv_taxi.png', output: 'suv_taxi.webp', width: 800 },
  { dir: imagesDir, input: 'chittorgarh-fort-new.jpg', output: 'chittorgarh-fort-new.webp', width: 1000 },
  { dir: imagesDir, input: 'fateh-prakash-new.jpg', output: 'fateh-prakash-new.webp', width: 1200 },
  { dir: imagesDir, input: 'Ratan SIngh.jpg', output: 'Ratan SIngh.webp', width: 800 },
  { dir: imagesDir, input: 'Fateh.jpg', output: 'Fateh.webp', width: 800 },
  { dir: imagesDir, input: 'kumbha-palace-new.jpg', output: 'kumbha-palace-new.webp', width: 800 }
];

async function run() {
  console.log('Starting image conversion with sharp...');
  let totalSavedBytes = 0;

  for (const job of jobs) {
    const inputPath = path.join(job.dir, job.input);
    const outputPath = path.join(job.dir, job.output);

    if (fs.existsSync(inputPath)) {
      const origSize = fs.statSync(inputPath).size;
      await sharp(inputPath)
        .resize({ width: job.width, withoutEnlargement: true })
        .webp({ quality: 80 })
        .toFile(outputPath);

      const newSize = fs.statSync(outputPath).size;
      const saved = origSize - newSize;
      totalSavedBytes += saved;
      console.log(`Converted ${job.output}: ${(origSize/1024).toFixed(1)} KB -> ${(newSize/1024).toFixed(1)} KB (Saved ${(saved/1024).toFixed(1)} KB)`);
    } else {
      console.log(`Skipped (not found): ${job.input}`);
    }
  }

  console.log(`\n🎉 Total payload saved: ${(totalSavedBytes / (1024 * 1024)).toFixed(2)} MB!`);
}

run().catch(console.error);
