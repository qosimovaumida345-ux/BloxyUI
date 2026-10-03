const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const catalog = require('../data/catalog');

router.get('/', async (req, res) => {
  const { search, type, category, page = 1, limit = 50 } = req.query;
  const p = parseInt(page);
  const l = parseInt(limit);
  const skip = (p - 1) * l;

  try {
    const where = {};
    if (search) where.name = { contains: search, mode: 'insensitive' };
    if (type) where.type = type;

    const [items, total] = await Promise.all([
      prisma.animation.findMany({ where, skip, take: l }),
      prisma.animation.count({ where })
    ]);

    if (items && items.length > 0) {
      return res.json({ data: items, items, total, page: p, limit: l, totalPages: Math.ceil(total / l) });
    }
  } catch (error) {
    console.warn('Database query failed in /api/animations, using catalog fallback:', error.message);
  }

  // Fallback to in-memory catalog
  let filtered = catalog.animations;
  if (search) {
    const s = search.toLowerCase();
    filtered = filtered.filter(a => a.name.toLowerCase().includes(s) || a.description.toLowerCase().includes(s));
  }
  if (type) {
    filtered = filtered.filter(a => a.type.toLowerCase() === type.toLowerCase());
  }
  if (category) {
    filtered = filtered.filter(a => a.category.toLowerCase() === category.toLowerCase());
  }

  const paginated = filtered.slice(skip, skip + l);
  res.json({
    data: paginated,
    items: paginated,
    total: filtered.length,
    page: p,
    limit: l,
    totalPages: Math.ceil(filtered.length / l)
  });
});

router.get('/:slug', async (req, res) => {
  try {
    const item = await prisma.animation.findUnique({ where: { slug: req.params.slug } });
    if (item) return res.json(item);
  } catch (e) {}

  const found = catalog.animations.find(a => a.slug === req.params.slug);
  if (!found) return res.status(404).json({ error: 'Animation not found' });
  res.json(found);
});

module.exports = router;
