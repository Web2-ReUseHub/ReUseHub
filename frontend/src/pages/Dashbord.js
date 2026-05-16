import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import Foterr from "../components/Foterr";
const API_BASE_URL = "http://localhost:5004";
axios.get("http://localhost:5004/admin/stats")




const Dashboard = () => {
  const [stats, setStats] = useState({
    itemsCount: 0,
    usersCount: 0,
    likesCount: 0,
    commentsCount: 0,
    requestsCount: 0,
    favoritesCount: 0,
    soldItemsCount: 0,
    activeSellersCount: 0,
    newUsersToday: 0,
    newUsersWeek: 0,
    loginsToday: 0,
    reportsCount: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [itemsRes, usersRes, likesRes, commentsRes] = await Promise.all([
          axios.get(`${API_BASE_URL}/used-items`),
          axios.get(`${API_BASE_URL}/users`),
          axios.get(`${API_BASE_URL}/likes`),
          axios.get(`${API_BASE_URL}/comments`),
        ]);

        setStats({
          itemsCount: itemsRes.data.length,
          usersCount: usersRes.data.length,
          likesCount: likesRes.data.length,
          commentsCount: commentsRes.data.length,
          requestsCount: 50, // مثال ثابت، ممكن تجيبه من API
          favoritesCount: 120, // مثال ثابت
          soldItemsCount: 80, // مثال ثابت
          activeSellersCount: 25, // مثال ثابت
          newUsersToday: 10, // مثال ثابت
          newUsersWeek: 45, // مثال ثابت
          loginsToday: 150, // مثال ثابت
          reportsCount: 5, // مثال ثابت
        });
      } catch (error) {
        console.error("Error fetching dashboard stats:", error);
      }
    };

    fetchStats();
  }, []);

  const cards = [
    { title: "عدد المستخدمين الكلي", value: stats.usersCount },
    { title: "عدد المنتجات المستخدمة", value: stats.itemsCount },
    { title: "عدد الطلبات المرسلة", value: stats.requestsCount },
    { title: "عدد المستخدمين الجدد اليوم", value: stats.newUsersToday },
    { title: "عدد المستخدمين الجدد هذا الأسبوع", value: stats.newUsersWeek },
    { title: "عدد تسجيلات الدخول اليوم", value: stats.loginsToday },
    { title: "عدد المنتجات الجديدة اليوم", value: stats.itemsCount },
    { title: "عدد الطلبات المقبولة", value: stats.requestsCount },
    { title: "عدد البائعين النشطين", value: stats.activeSellersCount },
    { title: "عدد المنتجات التي تم بيعها", value: stats.soldItemsCount },
    { title: "عدد المنتجات المفضلة", value: stats.favoritesCount },
    { title: "عدد البلاغات / الشكاوى", value: stats.reportsCount },
  ];

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
                <p className="fs-3 fw-bold">{card.value}</p>
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
