const fs = require('fs');
const path = require('path');

const BLOXFX_DIR = 'C:\\Users\\user\\Desktop\\BLOXFX-200-assets';

console.log('--- 1. Importing 200 BLOXFX Assets ---');

if (!fs.existsSync(BLOXFX_DIR)) {
  console.error('Directory not found:', BLOXFX_DIR);
  process.exit(1);
}

const folders = fs.readdirSync(BLOXFX_DIR).filter(f => fs.statSync(path.join(BLOXFX_DIR, f)).isDirectory());

// Destination in module
const moduleBloxFXDir = path.join(__dirname, '..', 'module', 'BloxyUI', 'BloxFX');
if (!fs.existsSync(moduleBloxFXDir)) {
  fs.mkdirSync(moduleBloxFXDir, { recursive: true });
}

const bloxfxAssets = [];

folders.forEach(folder => {
  const folderPath = path.join(BLOXFX_DIR, folder);
  const destFolder = path.join(moduleBloxFXDir, folder.replace(/\s+/g, ''));
  if (!fs.existsSync(destFolder)) fs.mkdirSync(destFolder, { recursive: true });

  const files = fs.readdirSync(folderPath).filter(f => f.endsWith('.luau'));

  files.forEach(file => {
    const srcPath = path.join(folderPath, file);
    const code = fs.readFileSync(srcPath, 'utf-8');
    
    // Copy to module
    fs.writeFileSync(path.join(destFolder, file), code);

    // Extract title & description
    const lines = code.split('\n');
    let title = file.replace(/^\d+-/, '').replace('.luau', '').replace(/-/g, ' ');
    title = title.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
    let desc = '';
    let glyph = '⚡';

    const line1 = lines[0] || '';
    const m1 = line1.match(/--\s*BLOXFX\s*\/\s*(.*?)\s*\(/i);
    if (m1 && m1[1]) title = m1[1].trim();

    const line2 = lines[1] || '';
    if (line2.startsWith('--')) {
      desc = line2.replace(/^--\s*/, '').trim();
    }

    const glyphMatch = code.match(/local\s+glyph\s*=\s*["'](.*?)["']/);
    if (glyphMatch) glyph = glyphMatch[1];

    bloxfxAssets.push({
      id: bloxfxAssets.length + 1,
      filename: file,
      category: folder,
      name: title,
      slug: file.replace('.luau', ''),
      description: desc || `${title} procedural effect for Roblox`,
      glyph: glyph,
      code: code
    });
  });
});

console.log(`Successfully parsed and copied ${bloxfxAssets.length} BloxFX assets!`);

// Save BloxFX catalog to server and client
const bloxfxJson = JSON.stringify(bloxfxAssets, null, 2);
fs.writeFileSync(path.join(__dirname, '..', 'server', 'data', 'bloxfxCatalog.js'), `module.exports = ${bloxfxJson};`);
fs.writeFileSync(path.join(__dirname, '..', 'client', 'src', 'data', 'bloxfxCatalog.js'), `export const bloxfxAssets = ${bloxfxJson};`);

console.log('Saved bloxfxCatalog.js in server and client data folders.');
