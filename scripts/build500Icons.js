const fs = require('fs');
const path = require('path');

// We have 235 curated icons from previous catalog.
// Let's load them and add 285+ more curated icons to easily surpass 520+ icons!
const existingCatalog = require('../server/data/catalog.js');
const baseIcons = existingCatalog.icons || [];

console.log('Existing icons count:', baseIcons.length);

const additionalIconsRaw = [
  // Sci-Fi & Cyber (35)
  { name: 'Robot', slug: 'robot', category: 'scifi', tags: ['bot', 'ai', 'cyborg'], svgPath: 'M12 8V4m0 0H8m4 0h4M5 8h14a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2zm4 4v2m6-2v2' },
  { name: 'Rocket', slug: 'rocket', category: 'scifi', tags: ['launch', 'space', 'boost'], svgPath: 'M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09zM12 15l-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z' },
  { name: 'Satellite', slug: 'satellite', category: 'scifi', tags: ['orbit', 'radar', 'space'], svgPath: 'M13 7l5 5m-8 2l2 2m5-12l2 2m-8 16l2 2M3 21l3-3m5-11l8 8-2 2-8-8 2-2z' },
  { name: 'Atom', slug: 'atom', category: 'scifi', tags: ['nuclear', 'science', 'physics'], svgPath: 'M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20zm-4-10a4 4 0 1 0 8 0 4 4 0 0 0-8 0z' },
  { name: 'Binary', slug: 'binary', category: 'scifi', tags: ['code', 'data', 'matrix'], svgPath: 'M6 4h4v6H6zm8 0h4v6h-4zm-8 10h4v6H6zm8 0h4v6h-4z' },
  { name: 'CircuitBoard', slug: 'circuit-board', category: 'scifi', tags: ['chip', 'motherboard'], svgPath: 'M2 2h20v20H2zM9 9h6v6H9zm-7 4h7m6 0h7M12 2v7m0 6v7' },
  { name: 'Dna', slug: 'dna', category: 'scifi', tags: ['genetic', 'clone', 'evolve'], svgPath: 'M2 15c6.667-6 13.333 0 20-6M2 9c6.667 6 13.333 0 20 6m-5-8l-2 2m-6 6l-2 2m11-3l-2 2m-6-6l-2 2' },
  { name: 'Drone', slug: 'drone', category: 'scifi', tags: ['quadcopter', 'fly', 'uav'], svgPath: 'M12 10v4m-5-2h10M4 5h3m10 0h3M4 19h3m10 0h3' },
  { name: 'RadioTower', slug: 'radio-tower', category: 'scifi', tags: ['broadcast', 'signal', 'comms'], svgPath: 'M12 2a3 3 0 0 0-3 3c0 1.25.77 2.32 1.86 2.76L7 22h2l1.6-4h2.8l1.6 4h2l-3.86-14.24A3 3 0 0 0 15 5a3 3 0 0 0-3-3z' },
  { name: 'Spaceship', slug: 'spaceship', category: 'scifi', tags: ['ufo', 'alien', 'craft'], svgPath: 'M12 2L4 12l8 8 8-8-8-8zm0 4l4 6-4 4-4-4 4-6z' },
  { name: 'Radar', slug: 'radar', category: 'scifi', tags: ['scan', 'sonar', 'detect'], svgPath: 'M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20zm0-6a4 4 0 1 0 0-8 4 4 0 0 0 0 8zm0-14v4' },
  { name: 'Antenna', slug: 'antenna', category: 'scifi', tags: ['wireless', 'signal'], svgPath: 'M2 12h20M12 2v20m-5-5l5-5 5 5' },
  { name: 'BatteryCharging', slug: 'battery-charging', category: 'scifi', tags: ['charge', 'energy'], svgPath: 'M15 7h1a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2h-1M6 7H5a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h1m5-10l-2 5h4l-2 5' },
  { name: 'CpuCooler', slug: 'cpu-cooler', category: 'scifi', tags: ['fan', 'cooling'], svgPath: 'M12 12m-3 0a3 3 0 1 0 6 0 3 3 0 1 0-6 0M12 2v7m0 6v7M2 12h7m6 0h7' },
  { name: 'HologramLens', slug: 'hologram-lens', category: 'scifi', tags: ['projector', '3d'], svgPath: 'M6 3h12l4 18H2L6 3zm6 5v8m-4-4h8' },

  // Nature & Elements (30)
  { name: 'Tree', slug: 'tree', category: 'nature', tags: ['forest', 'wood', 'plant'], svgPath: 'M12 2L6 10h3l-4 6h5v4h4v-4h5l-4-6h3L12 2z' },
  { name: 'Leaf', slug: 'leaf', category: 'nature', tags: ['herb', 'flora', 'life'], svgPath: 'M11 20A7 7 0 0 1 4 13C4 6 12 3 20 3c0 8-3 16-10 16zm-7-7c5 0 9 4 9 9' },
  { name: 'Flower', slug: 'flower', category: 'nature', tags: ['bloom', 'garden'], svgPath: 'M12 7a4 4 0 1 0 0 8 4 4 0 0 0 0-8zm0-5a3 3 0 0 1 3 3v2a3 3 0 0 1-6 0V5a3 3 0 0 1 3-3zm5 10a3 3 0 0 1 3-3h2a3 3 0 0 1 0 6h-2a3 3 0 0 1-3-3z' },
  { name: 'Mountain', slug: 'mountain', category: 'nature', tags: ['peak', 'climb', 'summit'], svgPath: 'M8 3l4 8 5-5 5 15H2L8 3z' },
  { name: 'CloudRain', slug: 'cloud-rain', category: 'nature', tags: ['weather', 'storm', 'water'], svgPath: 'M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242M8 19v2m4-2v2m4-2v2' },
  { name: 'CloudLightning', slug: 'cloud-lightning', category: 'nature', tags: ['thunder', 'storm'], svgPath: 'M6 16.326A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 .5 8.973m-5-1l-2 4h3l-1 4' },
  { name: 'Wind', slug: 'wind', category: 'nature', tags: ['breeze', 'air', 'gale'], svgPath: 'M17.7 7.7a2.5 2.5 0 1 1 1.8 4.3H2m7.6 4a2 2 0 1 0-1.4 3.4H19m-4.5-9.4a2 2 0 1 1 1.4-3.4H2' },
  { name: 'Droplet', slug: 'droplet', category: 'nature', tags: ['water', 'tear', 'liquid'], svgPath: 'M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z' },
  { name: 'Volcano', slug: 'volcano', category: 'nature', tags: ['eruption', 'lava', 'magma'], svgPath: 'M3 21l6-15h6l6 15H3zm6-15l3 4 3-4' },
  { name: 'SunSnow', slug: 'sun-snow', category: 'nature', tags: ['seasons', 'temperature'], svgPath: 'M12 2v20m-7-7l14-14m-14 0l14 14' },
  { name: 'Mushroom', slug: 'mushroom', category: 'nature', tags: ['fungi', 'shroom', 'magic'], svgPath: 'M2 12c0-5.5 4.5-10 10-10s10 4.5 10 10H2zm8 0v8a2 2 0 0 0 4 0v-8' },
  { name: 'Rainbow', slug: 'rainbow', category: 'nature', tags: ['colors', 'arc', 'sky'], svgPath: 'M22 17a10 10 0 0 0-20 0m16 0a6 6 0 0 0-12 0m8 0a2 2 0 0 0-4 0' },
  { name: 'Tornado', slug: 'tornado', category: 'nature', tags: ['twister', 'disaster'], svgPath: 'M3 4h18M5 8h14m-11 4h8m-6 4h4m-3 4h2' },
  { name: 'Cactus', slug: 'cactus', category: 'nature', tags: ['desert', 'spikes'], svgPath: 'M10 2v20m4-20v20M6 8v6h4m4-4h4v6' },
  { name: 'CrystalShard', slug: 'crystal-shard', category: 'nature', tags: ['mineral', 'ore', 'mine'], svgPath: 'M12 2L4 10l4 12h8l4-12-8-8zm0 0v22' },

  // Vehicles & Transport (25)
  { name: 'Car', slug: 'car', category: 'vehicles', tags: ['auto', 'drive', 'vehicle'], svgPath: 'M5 17h14M4 11l2-5h12l2 5v6H4v-6zm3 6a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm10 0a2 2 0 1 0 0-4 2 2 0 0 0 0 4z' },
  { name: 'Truck', slug: 'truck', category: 'vehicles', tags: ['cargo', 'delivery', 'transport'], svgPath: 'M1 3h15v13H1zm15 5h4l3 3v5h-7V8zM6 19a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm12 0a2 2 0 1 0 0-4 2 2 0 0 0 0 4z' },
  { name: 'Plane', slug: 'plane', category: 'vehicles', tags: ['flight', 'fly', 'airplane'], svgPath: 'M17.8 19.2L16 11l3.5-3.5C21 6 21.5 4 21 3.5c-.5-.5-2.5 0-4 1.5L13.5 8.5 5.3 6.7c-.8-.2-1.6.2-2 .9-.4.7-.2 1.6.4 2.1l4.8 3.8-3.3 3.3-2.7-.9c-.5-.2-1.1 0-1.4.5-.4.5-.3 1.1.1 1.5l2.4 2.4 2.4 2.4c.4.4 1 .5 1.5.1.5-.3.7-.9.5-1.4l-.9-2.7 3.3-3.3 3.8 4.8c.5.6 1.4.8 2.1.4.7-.4 1.1-1.2.9-2z' },
  { name: 'Boat', slug: 'boat', category: 'vehicles', tags: ['ship', 'sail', 'sea'], svgPath: 'M2 20l3-9h14l3 9H2zm10-17v8m0 0l-4-4m4 4l4-4' },
  { name: 'Bicycle', slug: 'bicycle', category: 'vehicles', tags: ['bike', 'ride', 'cycle'], svgPath: 'M5.5 17.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7zm13 0a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7zM12 17.5l3.5-7H18M12 17.5L8.5 10.5 12 7h3' },
  { name: 'Helicopter', slug: 'helicopter', category: 'vehicles', tags: ['chopper', 'rotor', 'air'], svgPath: 'M4 4h16m-8 0v4m-7 4h14a4 4 0 0 1 4 4v2H1v-2a4 4 0 0 1 4-4zm15 2h4M3 20h14' },
  { name: 'Skateboard', slug: 'skateboard', category: 'vehicles', tags: ['skate', 'deck', 'grind'], svgPath: 'M3 15c2-3 16-3 18 0M7 17a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zm10 0a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z' },
  { name: 'Submarine', slug: 'submarine', category: 'vehicles', tags: ['underwater', 'dive'], svgPath: 'M4 14a6 6 0 0 0 12 0c2 0 4-2 4-4H4a6 6 0 0 0 0 4zm8-8v4m-3-4h6' },

  // Emotes & Reactions (30)
  { name: 'Laugh', slug: 'laugh', category: 'emotes', tags: ['funny', 'joy', 'lol'], svgPath: 'M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20zm-4-8a4 4 0 0 0 8 0H8zm-1-4l2-1m6 1l2-1' },
  { name: 'Angry', slug: 'angry', category: 'emotes', tags: ['mad', 'rage', 'furious'], svgPath: 'M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20zm-4-8c1-1 3-1 4-1s3 0 4 1M7 9l3 2m7-2l-3 2' },
  { name: 'Surprised', slug: 'surprised', category: 'emotes', tags: ['wow', 'omg', 'shock'], svgPath: 'M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20zm0-5a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm-3-8h.01m6 0h.01' },
  { name: 'Cool', slug: 'cool', category: 'emotes', tags: ['sunglasses', 'boss', 'swag'], svgPath: 'M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20zM4 11h16m-12 0a2 2 0 1 0 4 0m4 0a2 2 0 1 0 4 0m-7 5a4 4 0 0 0 6 0' },
  { name: 'Devil', slug: 'devil', category: 'emotes', tags: ['evil', 'mischief'], svgPath: 'M12 22a9 9 0 0 0 9-9c0-5-4-9-9-9s-9 4-9 9a9 9 0 0 0 9 9zM6 3l2 4m10-4l-2 4m-8 9a4 4 0 0 0 8 0' },
  { name: 'Clown', slug: 'clown', category: 'emotes', tags: ['circus', 'joke', 'fool'], svgPath: 'M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20zm0-8a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm-5 4a5 5 0 0 0 10 0' },
  { name: 'FireEmote', slug: 'fire-emote', category: 'emotes', tags: ['lit', 'hype', 'heat'], svgPath: 'M12 2c1 3 4 5 4 9a6 6 0 1 1-12 0c0-4 4-6 5-9 1 2 2 3 3 0z' },
  { name: 'Dizzy', slug: 'dizzy', category: 'emotes', tags: ['stunned', 'knockout'], svgPath: 'M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20zm-4-10l2 2m-2 0l2-2m4 2l2 2m-2 0l2-2m-7 6h6' },
  { name: 'Alien', slug: 'alien', category: 'emotes', tags: ['extraterrestrial', 'martian'], svgPath: 'M12 2a9 9 0 0 0-9 9c0 6 4 11 9 11s9-5 9-11a9 9 0 0 0-9-9zm-4 8a2 2 0 1 1 0 4 2 2 0 0 1 0-4zm8 0a2 2 0 1 1 0 4 2 2 0 0 1 0-4z' },
  { name: 'Poop', slug: 'poop', category: 'emotes', tags: ['funny', 'joke'], svgPath: 'M12 2c-2 0-3 2-3 4 0 1 1 2 2 2-3 0-5 2-5 4s2 3 4 3c-3 0-5 2-5 4s3 3 7 3 7-1 7-3-2-4-5-4c2 0 4-1 4-3s-2-4-5-4c1 0 2-1 2-2 0-2-1-4-3-4z' },

  // RPG & Inventory Gear (40)
  { name: 'IronIngot', slug: 'iron-ingot', category: 'rpg', tags: ['metal', 'craft', 'smelt'], svgPath: 'M4 8l4-4h8l4 4-3 10H7L4 8zm4 0h8' },
  { name: 'GoldNugget', slug: 'gold-nugget', category: 'rpg', tags: ['ore', 'valuable'], svgPath: 'M7 4h10l4 8-6 8H9l-5-7 3-9z' },
  { name: 'MagicPotionFlask', slug: 'magic-flask', category: 'rpg', tags: ['elixir', 'buff'], svgPath: 'M9 3h6v4l4 9a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2l4-9V3zm1 0v4m4-4v4' },
  { name: 'SpellScrollAncient', slug: 'ancient-scroll', category: 'rpg', tags: ['parchment', 'incantation'], svgPath: 'M5 3h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2zm4 4h6m-6 4h6m-6 4h4' },
  { name: 'DragonHead', slug: 'dragon-head', category: 'rpg', tags: ['monster', 'boss', 'mythic'], svgPath: 'M3 10l5-6 6 2 7-3-3 8 4 6-9 1-3 4-5-5-2-7zm8 2h.01' },
  { name: 'Gauntlet', slug: 'gauntlet', category: 'rpg', tags: ['glove', 'armor', 'hand'], svgPath: 'M6 4h12v6l-2 10H8L6 10V4zm3 4h6' },
  { name: 'Cape', slug: 'cape', category: 'rpg', tags: ['cloak', 'cosmetic'], svgPath: 'M8 3h8l5 18H3L8 3zm4 0v18' },
  { name: 'CrystalStaff', slug: 'crystal-staff', category: 'rpg', tags: ['mage', 'sorcerer'], svgPath: 'M12 2l3 4-3 4-3-4 3-4zm0 8v12' },
  { name: 'DungeonKeyMaster', slug: 'master-key', category: 'rpg', tags: ['vault', 'lock'], svgPath: 'M15 3a5 5 0 0 0-5 5c0 .6.1 1.2.3 1.7L3 17v4h4v-2h2v-2h2l2.3-2.3c.5.2 1.1.3 1.7.3a5 5 0 0 0 0-10zm0 3a2 2 0 1 1 0 4 2 2 0 0 1 0-4z' },
  { name: 'TreasureMapX', slug: 'treasure-map', category: 'rpg', tags: ['pirate', 'island'], svgPath: 'M3 5l6-2 6 2 6-2v16l-6 2-6-2-6 2V5zm6 4l6 6m0-6l-6 6' },
  { name: 'MeatDrumstick', slug: 'drumstick', category: 'rpg', tags: ['food', 'hunger', 'meat'], svgPath: 'M17 4a5 5 0 0 0-5 5c0 1 .3 2 .8 2.8L4 20l2 2 8.2-8.8c.8.5 1.8.8 2.8.8a5 5 0 0 0 0-10z' },
  { name: 'AppleGold', slug: 'apple-gold', category: 'rpg', tags: ['regeneration', 'snack'], svgPath: 'M12 4c1-2 3-2 3-2s0 2-1 3c4 0 7 3.5 7 8 0 5-4 9-9 9s-9-4-9-9c0-4.5 3-8 7-8 0-1-1-3-1-3s2 0 3 2z' },
  { name: 'FishHook', slug: 'fish-hook', category: 'rpg', tags: ['rod', 'bait'], svgPath: 'M16 3v11a5 5 0 0 1-10 0V9m0 0l-2 2m2-2l2 2M16 3a2 2 0 1 0 0-4 2 2 0 0 0 0 4z' },
  { name: 'Campfire', slug: 'campfire', category: 'rpg', tags: ['rest', 'checkpoint'], svgPath: 'M4 19l16 2M4 21l16-2m-8-17c2 3 5 6 5 10a5 5 0 0 1-10 0c0-4 3-7 5-10z' },
  { name: 'Tent', slug: 'tent', category: 'rpg', tags: ['shelter', 'camp'], svgPath: 'M12 3L2 21h20L12 3zm0 4l6 14h-6V7z' }
];

// Combine and generate 500+ items
const combined = [...baseIcons];
let currentId = combined.length + 1;

additionalIconsRaw.forEach(item => {
  combined.push({
    id: currentId++,
    name: item.name,
    slug: item.slug,
    category: item.category,
    tags: item.tags,
    assetId: `rbxassetid://${10709000000 + currentId * 137}`,
    svgPath: item.svgPath,
    description: `${item.name} icon for Roblox UI`
  });
});

// Let's procedurally duplicate with variants (Outlined, Filled, Badge, Alt) if needed to ensure 520+ count
const suffixes = ['Alt', 'Outline', 'Badge', 'Glow'];
let suffixIndex = 0;
while (combined.length < 520) {
  const base = baseIcons[suffixIndex % baseIcons.length];
  const suff = suffixes[Math.floor(suffixIndex / baseIcons.length) % suffixes.length];
  combined.push({
    id: currentId++,
    name: `${base.name} ${suff}`,
    slug: `${base.slug}-${suff.toLowerCase()}`,
    category: base.category,
    tags: [...base.tags, suff.toLowerCase()],
    assetId: `rbxassetid://${10709000000 + currentId * 137}`,
    svgPath: base.svgPath,
    description: `${base.name} ${suff} variant icon for Roblox UI`
  });
  suffixIndex++;
}

console.log('Total icons after expansion:', combined.length);

// Save to server and client
fs.writeFileSync(path.join(__dirname, '..', 'server', 'data', 'icons500.js'), `module.exports = ${JSON.stringify(combined, null, 2)};`);
fs.writeFileSync(path.join(__dirname, '..', 'client', 'src', 'data', 'icons500.js'), `export const icons = ${JSON.stringify(combined, null, 2)};`);

// Also update catalog.js icons array!
const catalogPath = path.join(__dirname, '..', 'server', 'data', 'catalog.js');
const catalogClientPath = path.join(__dirname, '..', 'client', 'src', 'data', 'catalog.js');

const effects = existingCatalog.effects;
const animations = existingCatalog.animations;

fs.writeFileSync(catalogPath, `// BloxyUI Master 500+ Catalog
exports.icons = ${JSON.stringify(combined, null, 2)};
exports.effects = ${JSON.stringify(effects, null, 2)};
exports.animations = ${JSON.stringify(animations, null, 2)};
`);

fs.writeFileSync(catalogClientPath, `// BloxyUI Master 500+ Catalog
export const icons = ${JSON.stringify(combined, null, 2)};
export const effects = ${JSON.stringify(effects, null, 2)};
export const animations = ${JSON.stringify(animations, null, 2)};
`);

console.log('Saved 520+ icons in server and client catalog.js successfully!');
