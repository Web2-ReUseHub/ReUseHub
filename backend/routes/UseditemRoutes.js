const express = require('express');
const router = express.Router();

console.log("✅ useditemRoutes loaded successfully");

const usedItemController = require('../controllers/useditemController');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/', usedItemController.getUsedItems);

router.post('/', authMiddleware, usedItemController.createUsedItem);

router.put('/:id', authMiddleware, usedItemController.updateUsedItem);

router.delete('/:id', authMiddleware, usedItemController.deleteUsedItem);

module.exports = router;