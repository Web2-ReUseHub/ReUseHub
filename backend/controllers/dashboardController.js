const { User, UsedItem, Fav, Req, Report } = require("../models");
const { Op } = require("sequelize");

const getDashboardStats = async (req, res) => {
  try {
    // ── أعداد أساسية ──────────────────────────────────────────
    const usersCount            = await User.count();
    const itemsCount            = await UsedItem.count();
    const requestsCount         = await Req.count();
    const acceptedRequestsCount = await Req.count({ where: { status: "accepted" } });

    // تأكد أيهم صح بجدولك: is_sold: true  أو  status: "sold"
    const soldItemsCount        = await UsedItem.count({ where: { status: "sold" } });

    const favoritesCount        = await Fav.count();

    // ── البائعون النشطون (عندهم منتجات منشورة) ─────────────────
    const activeSellersCount    = await User.count({
      include: [{ model: UsedItem, as: "posts" }],
      distinct: true,
    });

    // ── مستخدمون جدد ───────────────────────────────────────────
    let newUsersToday = 0;
    let newUsersWeek  = 0;

    try {
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const weekAgo = new Date();
      weekAgo.setDate(weekAgo.getDate() - 7);

      // إذا Sequelize بيستخدم created_at غيّر createdAt لـ created_at
      newUsersToday = await User.count({ where: { createdAt: { [Op.gte]: today } } });
      newUsersWeek  = await User.count({ where: { createdAt: { [Op.gte]: weekAgo } } });
    } catch (dateErr) {
      console.warn("Could not fetch date-based stats:", dateErr.message);
    }

    // ── منتجات جديدة اليوم ─────────────────────────────────────
    let newPostsToday = 0;
    try {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      newPostsToday = await UsedItem.count({ where: { createdAt: { [Op.gte]: today } } });
    } catch (dateErr) {
      console.warn("Could not fetch newPostsToday:", dateErr.message);
    }

    // ── البلاغات ───────────────────────────────────────────────
    // إذا عندك model اسمه Report أو مختلف، غيّر هون
    let reportsCount = 0;
    try {
      reportsCount = await Report.count({ where: { status: "pending" } });
    } catch (reportErr) {
      console.warn("Could not fetch reports:", reportErr.message);
    }

    const loginsToday = 0; // أضف logic لما يكون عندك جدول sessions

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
      newPostsToday,
      loginsToday,
      reportsCount,
    });
  } catch (error) {
    console.error("DASHBOARD ERROR:", error);
    res.status(500).json({
      error: "Failed to fetch dashboard stats",
      details: error.message,
    });
  }
};

module.exports = { getDashboardStats };