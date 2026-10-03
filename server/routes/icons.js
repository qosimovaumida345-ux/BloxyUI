const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const catalog = require('../data/catalog');

router.get('/', async (req, res) => {
  const { search, category, page = 1, limit = 50 } = req.query;
  const p = parseInt(page);
  const l = parseInt(limit);
  const skip = (p - 1) * l;

  try {
    const where = {};
    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { tags: { has: search } }
      ];
    }
    if (category) {
      where.category = category;
    }

    const [items, total] = await Promise.all([
      prisma.icon.findMany({ where, skip, take: l }),
      prisma.icon.count({ where })
    ]);

    if (items && items.length > 0) {
      return res.json({ data: items, items, total, page: p, limit: l, totalPages: Math.ceil(total / l) });
    }
  } catch (error) {
    console.warn('Database query failed in /api/icons, using catalog fallback:', error.message);
  }

  // Fallback to in-memory catalog
  let filtered = catalog.icons;
  if (search) {
    const s = search.toLowerCase();
    filtered = filtered.filter(i => i.name.toLowerCase().includes(s) || (i.tags && i.tags.some(t => t.toLowerCase().includes(s))));
  }
  if (category) {
    filtered = filtered.filter(i => i.category.toLowerCase() === category.toLowerCase());
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
    const item = await prisma.icon.findUnique({ where: { slug: req.params.slug } });
    if (item) return res.json(item);
  } catch (e) {
    // fallback
  }

  const found = catalog.icons.find(i => i.slug === req.params.slug);
  if (!found) return res.status(404).json({ error: 'Icon not found' });
  res.json(found);
});

module.exports = router;
