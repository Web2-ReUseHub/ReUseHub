import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import Foterr from "../components/Foterr";
import PostItem from "../components/postItem";

const API_BASE_URL = "http://localhost:5004";

function Products() {
  const [allItems, setAllItems] = useState([]);
  const [trendingItems, setTrendingItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showAllLatest, setShowAllLatest] = useState(false);
  const [showAllTrending, setShowAllTrending] = useState(false);

  const INITIAL_COUNT = 6;

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const [allRes, trendingRes] = await Promise.all([
          axios.get(`${API_BASE_URL}/used-items`),
          axios.get(`${API_BASE_URL}/used-items/trending`),
        ]);

        setAllItems(allRes.data);
        setTrendingItems(trendingRes.data);
      } catch (error) {
        console.error("Error fetching items:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const latestItems = [...allItems].sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );

  const visibleLatest = showAllLatest
    ? latestItems
    : latestItems.slice(0, INITIAL_COUNT);

  const visibleTrending = showAllTrending
    ? trendingItems
    : trendingItems.slice(0, INITIAL_COUNT);

  return (
    <div dir="rtl" style={{ backgroundColor: "#f0f2f5", minHeight: "100vh" }}>
      <Navbar showFull={true} />

      <div className="container py-5 px-3 px-md-5">

        <div className="text-center mb-5">
          <h2 style={{ color: "#102a56", fontWeight: 800 }}>
            استكشف المنتجات
          </h2>
          <p className="text-muted">تصفح أحدث المنتجات والأكثر تفاعلاً</p>
        </div>

        {loading ? (
          <div className="text-center py-5">
            <div className="spinner-border text-primary" role="status"></div>
            <p className="mt-2 text-muted">جاري تحميل المنتجات...</p>
          </div>
        ) : allItems.length === 0 ? (
          <div className="text-center py-5 bg-white rounded-4 shadow-sm mt-4">
            <i className="bi bi-box-seam fs-1 text-muted"></i>
            <h5 className="mt-3">لا توجد منتجات حالياً</h5>
            <p className="text-muted">كن أول من يضيف منتج!</p>
          </div>
        ) : (
          <>
            {trendingItems.length > 0 && (
              <>
                <div className="d-flex align-items-center justify-content-between mb-3">
                  <h4 className="fw-bold m-0" style={{ color: "#1a2b4c" }}>
                        الأكثر رواجاً هذا الأسبوع
                  </h4>
                  <span className="badge bg-danger text-white">
                    {trendingItems.length} منتج
                  </span>
                </div>

                <div className="row g-3">
                  {visibleTrending.map((item) => (
                    <div
                      className="col-12 col-md-6 col-lg-4"
                      key={item.used_item_id}
                    >
                      <PostItem data={item} />
                    </div>
                  ))}
                </div>

                {trendingItems.length > INITIAL_COUNT && (
                  <div className="text-center mt-4">
                    <button
                      className="btn btn-outline-danger px-4"
                      onClick={() => setShowAllTrending(!showAllTrending)}
                    >
                      {showAllTrending
                        ? "عرض أقل"
                        : `عرض الكل (${trendingItems.length})`}
                    </button>
                  </div>
                )}

                <hr className="my-5" />
              </>
            )}

            <div className="d-flex align-items-center justify-content-between mb-3">
              <h4 className="fw-bold m-0" style={{ color: "#1a2b4c" }}>
                🆕 أحدث المنتجات
              </h4>
              <span className="badge bg-primary text-white">
                {latestItems.length} منتج
              </span>
            </div>

            <div className="row g-3">
              {visibleLatest.map((item) => (
                <div
                  className="col-12 col-md-6 col-lg-4"
                  key={item.used_item_id}
                >
                  <PostItem data={item} />
                </div>
              ))}
            </div>

            {latestItems.length > INITIAL_COUNT && (
              <div className="text-center mt-4">
                <button
                  className="btn btn-outline-primary px-4"
                  onClick={() => setShowAllLatest(!showAllLatest)}
                >
                  {showAllLatest
                    ? "عرض أقل"
                    : `عرض الكل (${latestItems.length})`}
                </button>
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