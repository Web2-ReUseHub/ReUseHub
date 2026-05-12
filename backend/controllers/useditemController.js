const db = require('../models');
const { UsedItem, ProImg } = db;
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});

exports.upload = multer({ storage });

exports.createUsedItem = async (req, res) => {
  try {
    const { status, description, price, seller_id, cat_id } = req.body;
    const item = await UsedItem.create({ status, description, price, seller_id, cat_id });
    if (req.files && req.files.length > 0) {
      for (const file of req.files) {
        await ProImg.create({ used_item_id: item.used_item_id, img_url: `/uploads/${file.filename}` });
      }
    }
    res.status(201).json(item);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getUsedItems = async (req, res) => {
  try {
    const items = await UsedItem.findAll({
      include: [
        { model: db.ProImg, as: 'images' },
        { model: db.Like, as: 'likes' }
      ]
    });
    const itemsWithCount = items.map(item => ({
      ...item.toJSON(),
      likes_count: item.likes?.length || 0
    }));
    res.json(itemsWithCount);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateUsedItem = async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await UsedItem.update(req.body, { where: { used_item_id: id } });
    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteUsedItem = async (req, res) => {
  try {
    const { id } = req.params;
    await UsedItem.destroy({ where: { used_item_id: id } });
    res.json({ message: 'Deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};