import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import Foterr from "../components/Foterr";

const API_BASE_URL = "http://localhost:5004";

const Dashboard = () => {
  const [stats, setStats] = useState({
    usersCount: 0,
    itemsCount: 0,
    requestsCount: 0,
    acceptedRequestsCount: 0,
    soldItemsCount: 0,
    favoritesCount: 0,
    activeSellersCount: 0,
    newUsersToday: 0,
    newUsersWeek: 0,
    newPostsToday: 0,
    loginsToday: 0,
    reportsCount: 0,
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/admin/stats`);
        setStats(res.data);
      } catch (error) {
        console.error("Error fetching dashboard stats:", error);
        setError("فشل تحميل البيانات");
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const cards = [
    { title: "عدد المستخدمين الكلي",       value: stats.usersCount },
    { title: "عدد المنتجات المنشورة",       value: stats.itemsCount },
    { title: "عدد الطلبات المرسلة",         value: stats.requestsCount },
    { title: "عدد الطلبات المقبولة",        value: stats.acceptedRequestsCount },
    { title: "عدد المنتجات المباعة",        value: stats.soldItemsCount },
    { title: "عدد المنتجات المفضلة",        value: stats.favoritesCount },
    { title: "عدد البائعين النشطين",        value: stats.activeSellersCount },
    { title: "مستخدمون جدد اليوم",          value: stats.newUsersToday },
    { title: "مستخدمون جدد هذا الأسبوع",    value: stats.newUsersWeek },
    { title: "منتجات جديدة اليوم",          value: stats.newPostsToday },
    { title: "تسجيلات الدخول اليوم",        value: stats.loginsToday },
    { title: "البلاغات والشكاوى",           value: stats.reportsCount },
  ];

  if (loading) return (
    <div dir="rtl">
      <Navbar showFull={true} />
      <div className="container py-5 text-center">
        <div className="spinner-border" style={{ color: "#1a2b4c" }} />
        <p className="mt-3">جاري تحميل البيانات...</p>
      </div>
    </div>
  );

  if (error) return (
    <div dir="rtl">
      <Navbar showFull={true} />
      <div className="container py-5 text-center text-danger">
        <p>{error}</p>
      </div>
    </div>
  );

  return (
    <div dir="rtl">
      <Navbar showFull={true} />
      <div className="container py-5">
        <h2 className="fw-bold mb-4" style={{ color: "#1a2b4c" }}>
          لوحة التحكم
        </h2>
        <div className="row g-4">
          {cards.map((card, index) => (
            <div className="col-md-3" key={index}>
              <div
                className="card shadow-sm border-0 text-center p-4"
                style={{ backgroundColor: "#d6e4ec" }}
              >
                <h5 className="fw-bold">{card.title}</h5>
                <p className="fs-3 fw-bold mb-0">{card.value}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Foterr />
    </div>
  );
};

export default Dashboard;