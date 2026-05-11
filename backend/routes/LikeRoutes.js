const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const db = require('../models');
const { Like } = db;

// toggle لايك
router.post('/:id/like', authMiddleware, async (req, res) => {
  try {
    const used_item_id = req.params.id;
    const user_id = req.user.id;

    const existing = await Like.findOne({ where: { user_id, used_item_id } });

    if (existing) {
      await existing.destroy();
      return res.json({ liked: false });
    }

    await Like.create({ user_id, used_item_id });
    res.json({ liked: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;