const { User, UsedItem, Fav, Req, Like, Comment } = require("../models");
const { Op } = require("sequelize");

const getDashboardStats = async (req, res) => {
  try {
    // عدد المستخدمين الكلي
    const usersCount = await User.count();

    // عدد المنتجات المستخدمة
    const itemsCount = await UsedItem.count();

    // عدد الطلبات المرسلة
    const requestsCount = await Req.count();

    // عدد الطلبات المقبولة (مثلاً status = 'accepted')
    const acceptedRequestsCount = await Req.count({ where: { status: "accepted" } });

    // عدد المنتجات التي تم بيعها (مثلاً sold = true)
    const soldItemsCount = await UsedItem.count({ where: { sold: true } });

    // عدد المنتجات المفضلة
    const favoritesCount = await Fav.count();

    // عدد البائعين النشطين (مثلاً عندهم منتجات مفعّلة)
    const activeSellersCount = await User.count({
      include: [{ model: UsedItem, as: "posts" }],
      distinct: true
    });

    // عدد المستخدمين الجدد اليوم
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const newUsersToday = await User.count({
      where: { createdAt: { [Op.gte]: today } }
    });

    // عدد المستخدمين الجدد هذا الأسبوع
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
    const newUsersWeek = await User.count({
      where: { createdAt: { [Op.gte]: weekAgo } }
    });

    // عدد تسجيلات الدخول اليوم (لو عندك جدول login_logs)
    const loginsToday = 0; // مؤقت، ممكن تربطيه لاحقًا بجدول login_logs

    // عدد البلاغات / الشكاوى (لو عندك جدول reports)
    const reportsCount = 0; // مؤقت، ممكن تربطيه لاحقًا بجدول reports

    res.json({
      usersCount,
      itemsCount,
      requestsCount,
      acceptedRequestsCount,
      soldItemsCount,
      favoritesCount,
      activeSellersCount,
      newUsersToday,
      newUsersWeek,
      loginsToday,
      reportsCount
    });
  } catch (error) {
    console.error("Error fetching dashboard stats:", error);
    res.status(500).json({ error: "Failed to fetch dashboard stats" });
  }
};

module.exports = { getDashboardStats };
