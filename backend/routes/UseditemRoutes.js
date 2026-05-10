const express = require('express');
const router = express.Router();
console.log("✅ useditemRoutes loaded successfully");

const usedItemController = require('../controllers/useditemController');

router.post('/', usedItemController.createUsedItem);
router.get('/', usedItemController.getUsedItems);
router.put('/:id', usedItemController.updateUsedItem);
router.delete('/:id', usedItemController.deleteUsedItem);

module.exports = router;

