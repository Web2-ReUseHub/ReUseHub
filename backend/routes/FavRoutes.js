const express = require('express');
const router = express.Router();
const favoriteController = require('../controllers/favController');

router.post('/', favoriteController.addFavorite);
router.get('/:userId', favoriteController.getFavoritesByUser);
router.delete('/:id', favoriteController.removeFavorite);

module.exports = router;
