const db = require('../models');

// إضافة عنصر للمفضلة
exports.addFavorite = async (req, res) => {
  try {
    const { userId, usedItemId } = req.body;
    const favorite = await Favorite.create({ userId, usedItemId });
    res.status(201).json(favorite);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// جلب المفضلات لمستخدم معين
exports.getFavoritesByUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const favorites = await Favorite.findAll({
      where: { userId },
      include: [UsedItem]
    });
    res.json(favorites);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// حذف عنصر من المفضلة
exports.removeFavorite = async (req, res) => {
  try {
    const { id } = req.params;
    await Favorite.destroy({ where: { id } });
    res.json({ message: 'Favorite removed successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
