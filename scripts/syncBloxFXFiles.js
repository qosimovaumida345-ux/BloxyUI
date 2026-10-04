const fs = require('fs');
const path = require('path');
const { assets, scriptFor } = require('../client/src/assets.ts');

const baseDir = path.join(__dirname, '../module/BloxyUI/BloxFX');
let updatedCount = 0;

const catalogEntries = [];

assets.forEach(asset => {
  const catFolder = asset.category.replace(/\s+/g, '');
  const folderPath = path.join(baseDir, catFolder);
  if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath, { recursive: true });
  }

  const filePath = path.join(folderPath, `${asset.slug}.luau`);
  const code = scriptFor(asset);
  fs.writeFileSync(filePath, code, 'utf8');
  updatedCount++;

  catalogEntries.push({
    id: asset.id,
    name: asset.name,
    slug: asset.slug,
    category: asset.category,
    description: asset.description,
    icon: asset.icon,
    code: code
  });
});

console.log(`Successfully synced all ${updatedCount} BloxFX Luau files in module/BloxyUI/BloxFX/!`);

const jsonCatalog = JSON.stringify(catalogEntries, null, 2);
const serverCatalogPath = path.join(__dirname, '../server/data/bloxfxCatalog.js');
if (fs.existsSync(path.dirname(serverCatalogPath))) {
  fs.writeFileSync(serverCatalogPath, `module.exports = ${jsonCatalog};\n`, 'utf8');
}
const clientCatalogPath = path.join(__dirname, '../client/src/data/bloxfxCatalog.js');
if (fs.existsSync(path.dirname(clientCatalogPath))) {
  fs.writeFileSync(clientCatalogPath, `export const bloxfxAssets = ${jsonCatalog};\n`, 'utf8');
}
console.log('Successfully updated server and client bloxfxCatalog.js with real vector ImageLabel icons and full animations!');
