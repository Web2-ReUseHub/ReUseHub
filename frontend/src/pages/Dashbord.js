import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import Foterr from "../components/Foterr";
const API_BASE_URL = "http://localhost:5004";

const Dashboard = () => {
  const [stats, setStats] = useState({
    itemsCount: 0,
    usersCount: 0,
    likesCount: 0,
    commentsCount: 0,
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
        });
      } catch (error) {
        console.error("Error fetching dashboard stats:", error);
      }
    };

    fetchStats();
  }, []);

  return (
    <div dir="rtl">
      <Navbar showFull={true} />
      <div className="container py-5">
        <h2 className="fw-bold mb-4" style={{ color: "#1a2b4c" }}>
          لوحة التحكم
        </h2>

        <div className="row g-4">
          

          <div className="col-md-3">
            <div className="card shadow-sm border-0 text-center p-4" style={{ backgroundColor: "#d6e4ec" }}>
              <h5 className="fw-bold"> عدد المستخدمين الكلي</h5>
              <p className="fs-3 fw-bold">{stats.usersCount}</p>
            </div>
          </div>


            <div className="col-md-3">
            <div className="card shadow-sm border-0 text-center p-4" style={{ backgroundColor: "#d6e4ec" }}>
              <h5 className="fw-bold">عدد المنتجات المستخدمة </h5>
              <p className="fs-3 fw-bold">{stats.itemsCount}</p>
            </div>
          </div>
         

           <div className="col-md-3">
            <div className="card shadow-sm border-0 text-center p-4" style={{ backgroundColor: "#d6e4ec" }}>
              <h5 className="fw-bold">عدد الطلبات المرسلة</h5>
              <p className="fs-3 fw-bold">{stats.usersCount}</p>
            </div>
          </div>

          <div className="col-md-3">
            <div className="card shadow-sm border-0 text-center p-4" style={{ backgroundColor: "#d6e4ec" }}>
              <h5 className="fw-bold"> عدد المستخدمين الجدد اليوم</h5>
              <p className="fs-3 fw-bold">{stats.likesCount}</p>
            </div>
          </div>

          <div className="col-md-3">
            <div className="card shadow-sm border-0 text-center p-4" style={{ backgroundColor: "#d6e4ec" }}>
              <h5 className="fw-bold">عدد المستخدمين الجدد هذا الاسبوع </h5>
              <p className="fs-3 fw-bold">{stats.commentsCount}</p>
            </div>
          </div>

           

           <div className="col-md-3">
            <div className="card shadow-sm border-0 text-center p-4" style={{ backgroundColor: "#d6e4ec" }}>
              <h5 className="fw-bold">  عدد المنتجات الجديدة اليوم </h5>
              <p className="fs-3 fw-bold">{stats.usersCount}</p>
            </div>
          </div>
            <div className="col-md-3">
            <div className="card shadow-sm border-0 text-center p-4" style={{ backgroundColor:"#d6e4ec" }}>
              <h5 className="fw-bold">عدد الطلبات المقبولة</h5>
              <p className="fs-3 fw-bold">{stats.usersCount}</p>
            </div>
          </div>
          

           <div className="col-md-3">
            <div className="card shadow-sm border-0 text-center p-4" style={{ backgroundColor: "#d6e4ec" }}>
              <h5 className="fw-bold">عدد البائعين النشطين</h5>
              <p className="fs-3 fw-bold">{stats.usersCount}</p>
            </div>
          </div>

           <div className="col-md-3">
            <div className="card shadow-sm border-0 text-center p-4" style={{ backgroundColor: "#d6e4ec" }}>
              <h5 className="fw-bold">عدد المنتجات التي تم بيعها</h5>
              <p className="fs-3 fw-bold">{stats.usersCount}</p>
            </div>
          </div>
              

              <div className="col-md-3">
            <div className="card shadow-sm border-0 text-center p-4" style={{ backgroundColor: "#d6e4ec" }}>
              <h5 className="fw-bold">عدد المنتجات المفضلة </h5>
              <p className="fs-3 fw-bold">{stats.usersCount}</p>
            </div>
          </div>
           

          

        </div>
      </div>
      <Foterr></Foterr>
    </div>
  );
};

export default Dashboard;
