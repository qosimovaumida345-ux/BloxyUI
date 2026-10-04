const express = require('express');
const router = express.Router();
const { generateLuauCode } = require('../utils/luau-generator');

router.post('/', (req, res) => {
  try {
    const componentType = req.body.componentType || 'button';
    const text = req.body.text || req.body.customOptions?.text || (componentType === 'panel' ? 'INVENTORY' : componentType === 'progressbar' ? 'LEVEL 42' : 'SHOP');
    const subText = req.body.subText || req.body.customOptions?.subText;
    const theme = req.body.theme || req.body.themeSlug || 'cartoony';
    const icon = req.body.icon || req.body.iconSlug || 'shop';
    const sparkles = req.body.sparkles !== false;
    const shine = req.body.shine !== false;
    const idleFloat = req.body.idleFloat !== false;
    const bevelOffset = req.body.bevelOffset;
    const cornerRadius = req.body.cornerRadius;
    const strokeWidth = req.body.strokeWidth;

    const luauCode = generateLuauCode({
      componentType,
      text,
      subText,
      theme,
      icon,
      sparkles,
      shine,
      idleFloat,
      bevelOffset,
      cornerRadius,
      strokeWidth
    });

    res.json({ success: true, code: luauCode, luauCode });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
