const { UsedItem, Request, User, Category, Favorite, Report } = require("../models");

exports.getDashboardStats = async (req, res) => {
  try {
    const totalRequests = await Request.count();
    const buyerRequests = await Request.count({ where: { type: "buyer" } });
    const sellerRequests = await Request.count({ where: { type: "seller" } });
    const acceptedRequests = await Request.count({ where: { status: "accepted" } });
    const rejectedRequests = await Request.count({ where: { status: "rejected" } });

    const soldItems = await UsedItem.count({ where: { is_sold: true } });
    const favoritesCount = await Favorite.count();
    const activeSellers = await User.count({ where: { role: "seller", is_active: true } });
    const newUsersToday = await User.count({
      where: { created_at: { [Op.gte]: new Date().setHours(0, 0, 0, 0) } }
    });

    const categoriesCount = await Category.count();
    const newPostsToday = await UsedItem.count({
      where: { created_at: { [Op.gte]: new Date().setHours(0, 0, 0, 0) } }
    });
    const pendingReports = await Report.count({ where: { status: "pending" } });

    res.json({
      totalRequests,
      buyerRequests,
      sellerRequests,
      acceptedRequests,
      rejectedRequests,
      soldItems,
      favoritesCount,
      activeSellers,
      newUsersToday,
      categoriesCount,
      newPostsToday,
      pendingReports
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "حدث خطأ أثناء جلب بيانات لوحة التحكم" });
  }
};
