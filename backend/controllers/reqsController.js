const db = require('../models');

// إضافة طلب جديد
exports.createRequest = async (req, res) => {
  try {
    const { userId, usedItemId, comment, rating } = req.body;
    const request = await Request.create({ userId, usedItemId, comment, rating });
    res.status(201).json(request);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// جلب كل الطلبات
exports.getRequests = async (req, res) => {
  try {
    const requests = await Request.findAll({ include: [User, UsedItem] });
    res.json(requests);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// حذف طلب
exports.deleteRequest = async (req, res) => {
  try {
    const { id } = req.params;
    await Request.destroy({ where: { id } });
    res.json({ message: 'Request deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
