const express = require('express');
const router = express.Router();
const { generateLuauCode } = require('../utils/luau-generator');

router.post('/', (req, res) => {
  try {
    const text = req.body.text || req.body.customOptions?.text || 'SHOP';
    const theme = req.body.theme || req.body.themeSlug || 'cartoony';
    const icon = req.body.icon || req.body.iconSlug || 'shop';
    const sparkles = req.body.sparkles !== false;
    const shine = req.body.shine !== false;
    const idleFloat = req.body.idleFloat !== false;

    const luauCode = generateLuauCode({
      text,
      theme,
      icon,
      sparkles,
      shine,
      idleFloat
    });

    res.json({ success: true, code: luauCode, luauCode });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
