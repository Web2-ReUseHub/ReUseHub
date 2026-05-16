const express = require('express');
const router = express.Router();
const usedItemController = require('../controllers/useditemController');
const authMiddleware = require('../middleware/authMiddleware');
const db = require('../models');
const { Like } = db;

router.get('/', usedItemController.getUsedItems);
router.post('/', authMiddleware, usedItemController.upload.array('images', 5), usedItemController.createUsedItem);

router.get('/trending', usedItemController.getTrendingItems);
router.get('/user/:id', usedItemController.getUserItems);
router.put('/:id', authMiddleware, usedItemController.updateUsedItem);
router.delete('/:id', authMiddleware, usedItemController.deleteUsedItem);

router.post('/:id/like', authMiddleware, async (req, res) => {
  try {
    const used_item_id = req.params.id;
    const user_id = req.user.user_id;
    const existing = await Like.findOne({ where: { user_id, used_item_id } });
    if (existing) { await existing.destroy(); return res.json({ liked: false }); }
    await Like.create({ user_id, used_item_id });
    res.json({ liked: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;