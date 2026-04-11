const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const folders = [
  'images/miniarbre',
  'images/minitribu',
  'images/minichemin',
];

async function convertFolder(folder) {
  const files = fs.readdirSync(folder).filter(f => f.endsWith('.png'));
  console.log(`\n${folder}: ${files.length} PNGs`);
  for (const file of files) {
    const input = path.join(folder, file);
    const output = path.join(folder, file.replace('.png', '.webp'));
    if (fs.existsSync(output)) { console.log(`  skip: ${file} (already converted)`); continue; }
    const before = fs.statSync(input).size;
    await sharp(input).webp({ quality: 82 }).toFile(output);
    const after = fs.statSync(output).size;
    console.log(`  ${file} → ${file.replace('.png','.webp')} (${Math.round(before/1024)}KB → ${Math.round(after/1024)}KB, -${Math.round((1-after/before)*100)}%)`);
  }
}

(async () => {
  for (const folder of folders) await convertFolder(folder);
  console.log('\nDone.');
})();
