import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const rootDir = process.cwd();
const publicDir = path.join(rootDir, 'public');
const imagesDir = path.join(publicDir, 'assets', 'images');
const contentFile = path.join(rootDir, 'src', 'data', 'content.js');

// ─── Priority jobs (named targets) ──────────────────────────────────────────
const priorityJobs = [
  // Mobile hero image — the most important new asset for responsive srcset
  { dir: publicDir, input: 'Fort.webp', output: 'Fort-mobile.webp', width: 600, quality: 82 },
];

async function run() {
  console.log('🖼️  Starting image optimization...\n');
  let totalSavedBytes = 0;
  let convertedCount = 0;

  // Run priority jobs first
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
      const saved = origSize - newSize;
      if (saved > 0) totalSavedBytes += saved;
      convertedCount++;
      console.log(`✅ ${job.input} → ${job.output}: ${(origSize/1024).toFixed(1)}KB → ${(newSize/1024).toFixed(1)}KB (${saved > 0 ? '-' : '+'}${Math.abs(saved/1024).toFixed(1)}KB)`);
    } else {
      console.log(`⚠️  Skipped (not found): ${job.input}`);
    }
  }

  // Batch convert all remaining images in assets/images/
  console.log('\n📁 Batch converting all images in /assets/images/...');
  const files = fs.readdirSync(imagesDir);
  for (const file of files) {
    const ext = path.extname(file).toLowerCase();
    if (ext === '.jpg' || ext === '.jpeg' || ext === '.png') {
      const baseName = path.basename(file, ext);
      const inputPath = path.join(imagesDir, file);
      const outputPath = path.join(imagesDir, `${baseName}.webp`);
      // Skip if WebP already exists and is newer than source
      if (fs.existsSync(outputPath)) {
        const srcMtime = fs.statSync(inputPath).mtimeMs;
        const dstMtime = fs.statSync(outputPath).mtimeMs;
        if (dstMtime >= srcMtime) {
          console.log(`⏭️  Already up-to-date: ${baseName}.webp`);
          continue;
        }
      }
      try {
        const origSize = fs.statSync(inputPath).size;
        await sharp(inputPath)
          .resize({ width: 800, withoutEnlargement: true })
          .webp({ quality: 80 })
          .toFile(outputPath);
        const newSize = fs.statSync(outputPath).size;
        const saved = origSize - newSize;
        if (saved > 0) totalSavedBytes += saved;
        convertedCount++;
        console.log(`✅ ${file} → ${baseName}.webp: ${(origSize/1024).toFixed(1)}KB → ${(newSize/1024).toFixed(1)}KB`);
      } catch (err) {
        console.error(`❌ Error converting ${file}:`, err.message);
      }
    }
  }

  console.log(`\n🎉 Processed ${convertedCount} images! Net payload savings: ${(totalSavedBytes / (1024 * 1024)).toFixed(2)} MB`);

  // Update content.js image paths
  if (fs.existsSync(contentFile)) {
    console.log('\n📝 Updating image paths in content.js to .webp...');
    let contentStr = fs.readFileSync(contentFile, 'utf8');
    const updatedContent = contentStr
      .replace(/\/assets\/images\/([^"'\s]+\.)(jpg|jpeg|png)/gi, '/assets/images/$1webp');
    fs.writeFileSync(contentFile, updatedContent, 'utf8');
    console.log('✅ content.js updated with .webp paths!');
  }
}

run().catch(console.error);
