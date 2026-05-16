const db = require('../models');
const { UsedItem, ProImg } = db;
const multer = require('multer');
const path = require('path');
const { Op } = require('sequelize');

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
        { model: db.Like, as: 'likes' },
        {
          model: db.User,
          as: 'seller',
          attributes: ['user_id', 'f_name', 'l_name', 'avatar_url']
        }
      ]
    });

    const itemsWithCount = items.map(item => ({
      ...item.toJSON(),
      likes_count: item.likes?.length || 0,
      user: item.seller ? {
        name: `${item.seller.f_name || ''} ${item.seller.l_name || ''}`.trim(),
        avatar: item.seller.avatar_url || null
      } : null
    }));

    res.json(itemsWithCount);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getTrendingItems = async (req, res) => {
  try {
    const items = await UsedItem.findAll({
      include: [
        { model: db.ProImg, as: 'images' },
        {
          model: db.Like,
          as: 'likes',
          required: false
        },
        {
          model: db.User,
          as: 'seller',
          attributes: ['user_id', 'f_name', 'l_name', 'avatar_url']
        }
      ]
    });

    const itemsWithEngagement = items.map(item => ({
      ...item.toJSON(),
      likes_count: item.likes?.length || 0,
      engagement: item.likes?.length || 0,
      user: item.seller ? {
        name: `${item.seller.f_name || ''} ${item.seller.l_name || ''}`.trim(),
        avatar: item.seller.avatar_url || null
      } : null
    }));

    const trending = itemsWithEngagement
      .sort((a, b) => b.engagement - a.engagement)
      .slice(0, 5);

    res.json(trending);
  } catch (error) {
    console.error("TRENDING ERROR:", error);
    res.status(500).json({ error: error.message });
  }
};

// ← هاد هو التعديل
exports.getUserItems = async (req, res) => {
  try {
    const id = req.params.id;

    const items = await db.UsedItem.findAll({
      where: { seller_id: id },
      include: [
        { model: db.ProImg, as: 'images' },
        {
          model: db.User,
          as: 'seller',
          attributes: ['user_id', 'f_name', 'l_name', 'avatar_url']
        }
      ]
    });

    const itemsWithCount = items.map(item => ({
      ...item.toJSON(),
      user: item.seller ? {
        name: `${item.seller.f_name || ''} ${item.seller.l_name || ''}`.trim(),
        avatar: item.seller.avatar_url || null
      } : null
    }));

    res.json(itemsWithCount);
  } catch (error) {
    console.error("GET USER ITEMS ERROR:", error);
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

    await db.Like.destroy({ where: { used_item_id: id } });
    await db.ProImg.destroy({ where: { used_item_id: id } });
    await db.Fav.destroy({ where: { used_item_id: id } });

    const deleted = await UsedItem.destroy({ where: { used_item_id: id } });
    if (deleted === 0) {
      return res.status(404).json({ error: 'Item not found' });
    }
    res.json({ message: 'Deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};