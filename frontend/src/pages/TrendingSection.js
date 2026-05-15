import React, { useState, useEffect } from "react";
import axios from "axios";
import PostItem from "../components/postItem";
import Navbar from "../components/Navbar";
import Foterr from "../components/Foterr";
const API_BASE_URL = "http://localhost:5004";

const TrendingSection = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchTrendingItems = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${API_BASE_URL}/used-items`);
      const allItems = res.data;
      const sortedItems = allItems.sort((a, b) => {
        const engagementA = (a.likes_count || 0) + (a.comments_count || 0);
        const engagementB = (b.likes_count || 0) + (b.comments_count || 0);
        return engagementB - engagementA;
      });
      setItems(sortedItems);
    } catch (error) {
      console.error("Error fetching trending items:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchTrendingItems(); }, []);

  return (
    <div dir="rtl">
      <Navbar showFull={true} />
      <div className="container py-5">
        <div className="d-flex align-items-center mb-4 justify-content-start">
          <h2 className="fw-bold m-0" style={{ color: "#1a2b4c" }}>المنشورات الرائجة هذا الأسبوع</h2>
          <span className="ms-2 fs-3">🔥</span>
        </div>
        <div className="row justify-content-center">
  {loading ? (
    <div className="text-center py-5">
      <div className="spinner-border text-primary" role="status"></div>
    </div>
  ) : items.length > 0 ? (
    items.map((item) => (
      <div className="col-md-6 col-lg-4 mb-4" key={item.used_item_id}>
        <PostItem data={item} />
      </div>
    ))
  ) : (
    <div className="text-center py-5">
      <p className="text-muted fs-5">لا توجد منشورات رائجة لعرضها حالياً</p>
    </div>
  )}
</div>
        </div>
        <Foterr></Foterr>
      </div>
   
  );
};

export default TrendingSection;