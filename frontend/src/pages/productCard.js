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
      // جلب البيانات من المسار الصحيح في الباك إند الخاص بك
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

  return (
    <div dir="rtl" style={{ backgroundColor: "#f0f2f5", minHeight: "100vh" }}>
      <Navbar showFull={true} />

      <div className="container py-5">
        <div className="text-center mb-5">
          <h2 style={{ color: "#102a56", fontWeight: 800 }}>خلاصة المنتجات</h2>
          <p className="text-muted">تصفح آخر ما تم نشره في ReUseHub</p>
        </div>

        <div className="row justify-content-center">
          <div className="col-md-8 col-lg-6"> {/* لجعل المنشورات في المنتصف مثل فيسبوك وانستغرام */}
            
            {loading ? (
              <div className="text-center py-5">
                <div className="spinner-border text-primary" role="status"></div>
                <p className="mt-2">جاري جلب المنشورات...</p>
              </div>
            ) : items.length === 0 ? (
              <div className="text-center py-5 bg-white rounded-4 shadow-sm">
                <i className="bi bi-box-seam fs-1 text-muted"></i>
                <p className="mt-3 fs-5">لا توجد منشورات حالياً.</p>
              </div>
            ) : (
              // هنا نقوم بخرط البيانات داخل مكون PostItem
              items.map((item) => (
                <PostItem key={item.used_item_id} data={item} />
              ))
            )}

          </div>
        </div>
      </div>

      <Foterr />
    </div>
  );
}

export default Products;