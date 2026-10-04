const express = require('express');
const router = express.Router();
const bloxfxCatalog = require('../data/bloxfxCatalog');

// GET /api/bloxfx -> Get all 200 assets with category & query filtering
router.get('/', (req, res) => {
  const { category, search, page = 1, limit = 200 } = req.query;
  let items = bloxfxCatalog;

  if (category && category.toLowerCase() !== 'all') {
    items = items.filter(a => a.category && a.category.toLowerCase() === category.toLowerCase());
  }

  if (search) {
    const q = search.toLowerCase();
    items = items.filter(a => 
      (a.name && a.name.toLowerCase().includes(q)) || 
      (a.description && a.description.toLowerCase().includes(q)) ||
      (a.category && a.category.toLowerCase().includes(q))
    );
  }

  const total = items.length;
  const startIndex = (Number(page) - 1) * Number(limit);
  const paginated = items.slice(startIndex, startIndex + Number(limit));

  res.json({
    success: true,
    total,
    count: paginated.length,
    page: Number(page),
    assets: paginated.map(a => ({
      id: a.id,
      name: a.name,
      slug: a.slug,
      category: a.category,
      description: a.description,
      glyph: a.glyph,
      hasCode: !!a.code
    }))
  });
});

// GET /api/bloxfx/categories -> List categories with counts
router.get('/categories', (req, res) => {
  const categories = {};
  bloxfxCatalog.forEach(a => {
    categories[a.category] = (categories[a.category] || 0) + 1;
  });
  res.json({ success: true, categories });
});

// GET /api/bloxfx/:id -> Get single asset with complete Luau code
router.get('/:id', (req, res) => {
  const id = Number(req.params.id);
  const asset = bloxfxCatalog.find(a => a.id === id || a.slug === req.params.id);

  if (!asset) {
    return res.status(404).json({ success: false, error: 'Asset not found in 200 BloxFX catalog' });
  }

  res.json({
    success: true,
    asset: {
      id: asset.id,
      name: asset.name,
      slug: asset.slug,
      category: asset.category,
      description: asset.description,
      glyph: asset.glyph,
      code: asset.code
    }
  });
});

// POST /api/bloxfx/:id/customize -> Generate customized Luau code for asset
router.post('/:id/customize', (req, res) => {
  const id = Number(req.params.id);
  const asset = bloxfxCatalog.find(a => a.id === id || a.slug === req.params.id);

  if (!asset) {
    return res.status(404).json({ success: false, error: 'Asset not found' });
  }

  const { title, subtitle, speed = 1, glyph } = req.body;
  let code = asset.code;

  if (title) {
    code = code.replace(/local title = "[^"]*"/, `local title = "${title}"`);
  }
  if (subtitle) {
    code = code.replace(/local subtitle = "[^"]*"/, `local subtitle = "${subtitle}"`);
  }
  if (glyph) {
    code = code.replace(/local glyph = "[^"]*"/, `local glyph = "${glyph}"`);
  }
  if (speed) {
    code = code.replace(/local speed = [0-9.]+/, `local speed = ${speed}`);
  }

  res.json({
    success: true,
    assetId: asset.id,
    name: asset.name,
    code
  });
});

module.exports = router;
