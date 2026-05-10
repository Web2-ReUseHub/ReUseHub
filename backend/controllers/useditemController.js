const db = require('../models');
const { UsedItem, Category, ProImg } = db;

// إضافة عنصر جديد
exports.createUsedItem = async (req, res) => {
  try {
    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({ error: 'Request body is missing or invalid JSON.' });
    }

    const { status, description, price, seller_id, cat_id } = req.body;
    const item = await UsedItem.create({ status, description, price, seller_id, cat_id });
    res.status(201).json(item);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// جلب كل العناصر
exports.getUsedItems = async (req, res) => {
  try {
    console.log("✅ getUsedItems function called");
    console.log("📦 UsedItem model:", UsedItem);
    const items = await UsedItem.findAll();
    console.log("📋 Items found:", items);
    res.json(items);
  } catch (error) {
    console.error("❌ Error in getUsedItems:", error.message);
    console.error("📍 Error stack:", error.stack);
    res.status(500).json({ error: error.message });
  }
};


// تحديث عنصر
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
    res.json({ message: 'Used item deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
