import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import Foterr from "../components/Foterr";
import PostItem from "../components/postItem";

const API_BASE_URL = "http://localhost:5004";

function Products() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchItems = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/used-items`);
      setItems(res.data);
    } catch (error) {
      console.error("Error fetching items:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  // تقسيم البيانات
  const latestItems = items.slice(0, 6);

  const trendingItems = [...items]
    .sort((a, b) => (b.likes || 0) - (a.likes || 0))
    .slice(0, 6);

  return (
    <div dir="rtl" style={{ backgroundColor: "#f0f2f5", minHeight: "100vh" }}>
      <Navbar showFull={true} />

      <div className="container py-5 px-3 px-md-5">

        {/* العنوان */}
        <div className="text-center mb-5">
          <h2 style={{ color: "#102a56", fontWeight: 800 }}>
            استكشف المنتجات
          </h2>
          <p className="text-muted">تم تقسيم المنتجات لسهولة التصفح</p>
        </div>

        {/* Loading */}
        {loading ? (
          <div className="text-center py-5">
            <div className="spinner-border text-primary"></div>
            <p className="mt-2">جاري تحميل المنتجات...</p>
          </div>
        ) : (
          <>
            {/* أحدث المنتجات */}
            <h4 className="mb-3 fw-bold">🔥 أحدث المنتجات</h4>
            <div className="row g-3">
              {latestItems.map((item) => (
                <div className="col-12 col-md-6 col-lg-4" key={item.used_item_id}>
                  <PostItem data={item} />
                </div>
              ))}
            </div>

            <hr className="my-5" />

            {/* الأكثر إعجاباً */}
            <h4 className="mb-3 fw-bold">⭐ الأكثر إعجاباً</h4>
            <div className="row g-3">
              {trendingItems.map((item) => (
                <div className="col-12 col-md-6 col-lg-4" key={item.used_item_id}>
                  <PostItem data={item} />
                </div>
              ))}
            </div>

            {/* empty state */}
            {items.length === 0 && (
              <div className="text-center py-5 bg-white rounded-4 shadow-sm mt-4">
                <i className="bi bi-box-seam fs-1 text-muted"></i>
                <h5 className="mt-3">لا توجد منتجات حالياً</h5>
                <p className="text-muted">كن أول من يضيف منتج!</p>
              </div>
            )}
          </>
        )}
      </div>

      <Foterr />
    </div>
  );
}

export default Products;