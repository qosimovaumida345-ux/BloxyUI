const express = require('express');
const router = express.Router();
const { generateLuauCode } = require('../utils/luau-generator');

router.post('/', (req, res) => {
  try {
    const { componentType, icon, effect, animation, theme, customOptions } = req.body;
    
    if (!componentType || !theme) {
      return res.status(400).json({ error: 'componentType and theme are required' });
    }

    const luauCode = generateLuauCode({
      componentType,
      icon,
      effect,
      animation,
      theme,
      customOptions: customOptions || {}
    });

    res.json({ success: true, luauCode });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
