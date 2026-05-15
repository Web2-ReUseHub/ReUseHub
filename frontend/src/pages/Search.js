import React from "react";
import "../index.css";
import Navbar from "../components/Navbar";
import Categories from "../components/Categories";
import { useState ,useEffect} from "react";
import { useNavigate } from "react-router-dom";
import Foterr from "../components/Foterr";
import axios from "axios";
import PostItem from "../components/postItem";

const API_BASE_URL = "http://localhost:5004";

export default function SidebarFilter() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);

  const navigate = useNavigate();

  const handleSearch = async () => {
    const searchTerm = query.trim();
    if (!searchTerm) {
      setHasSearched(false);
      setResults([]);
      return;
    }

    try {
      const response = await axios.post(`${API_BASE_URL}/api/search`, { query: searchTerm });
      let searchResults = response.data?.results || [];
      if (!searchResults.length) {
        const terms = searchTerm.toLowerCase().split(/\s+/).filter(Boolean);
        searchResults = allProducts.filter((item) => {
          const text = `${item.title || ""} ${item.description || ""} ${item.status || ""}`.toLowerCase();
          return terms.some((term) => text.includes(term));
        });
      }
      setResults(searchResults);
    } catch (error) {
      console.error("Search failed:", error);
      const terms = searchTerm.toLowerCase().split(/\s+/).filter(Boolean);
      const fallback = allProducts.filter((item) => {
        const text = `${item.title || ""} ${item.description || ""} ${item.status || ""}`.toLowerCase();
        return terms.some((term) => text.includes(term));
      });
      setResults(fallback);
    } finally {
      setHasSearched(true);
    }
  };

// Fetch all products on component mount
useEffect(() => {
  const fetchProducts = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/used-items`);
      setAllProducts(response.data || []);
    } catch (error) {
      console.error("Failed to fetch products:", error);
    }
  };

  fetchProducts();
}, []);

  return (
    <>
      <div dir="rtl">
        <Navbar showFull={true} />
        <div className="container-fluid ">
          <div className="row">
            <div className="col-12 col-md-3 sidebar">
              <div className="card h-100">
                <div className="card-header bg-light">
                  <h4 className="mb-0 text-center">تصفية النتائج</h4>
                </div>

                <div className="card-body text-end bg-light">
                  <div className="mb-4">
                    <h5>الفئة</h5>

                    <Categories />
                  </div>

                  <div className="mb-4">
                    <h5>السعر</h5>

                    <div className="form-check form-check-reverse">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="price1"
                      />
                      <label className="form-check-label" htmlFor="price1">
                        0 - 100
                      </label>
                    </div>

                    <div className="form-check form-check-reverse">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="price2"
                      />
                      <label className="form-check-label" htmlFor="price2">
                        100 - 200
                      </label>
                    </div>

                    <div className="form-check form-check-reverse">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="price3"
                      />
                      <label className="form-check-label" htmlFor="price3">
                        200 - 300
                      </label>
                    </div>

                    <div className="form-check form-check-reverse">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="price4"
                      />
                      <label className="form-check-label" htmlFor="price4">
                        أكثر من 300
                      </label>
                    </div>
                  </div>

                  <div className="mb-4">
                    <h5>الحالة</h5>
                    <div className="form-check form-check-reverse">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="Excellent"
                      />
                      <label className="form-check-label" htmlFor="Excellent">
                        ممتاز
                      </label>
                    </div>
                    <div className="form-check form-check-reverse">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="Normal"
                      />
                      <label className="form-check-label" htmlFor="Normal">
                        عادي
                      </label>
                    </div>
                  </div>

                  <div className="mb-4">
                    <h5 className="text-end">تقييم البائع</h5>
                    <div className="rating text-center">
                      <input type="radio" id="star1" name="rating" value="1" />
                      <label htmlFor="star1">
                        <i className="fas fa-star"></i>
                      </label>

                      <input type="radio" id="star2" name="rating" value="2" />
                      <label htmlFor="star2">
                        <i className="fas fa-star"></i>
                      </label>

                      <input type="radio" id="star3" name="rating" value="3" />
                      <label htmlFor="star3">
                        <i className="fas fa-star"></i>
                      </label>

                      <input type="radio" id="star4" name="rating" value="4" />
                      <label htmlFor="star4">
                        <i className="fas fa-star"></i>
                      </label>

                      <input type="radio" id="star5" name="rating" value="5" />
                      <label htmlFor="star5">
                        <i className="fas fa-star"></i>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-12 col-md-9">
              <div className=" my-4 d-flex justify-content-center">
                <div dir="ltr" className="input-group mb-4" style={{ width: "400px"  }}>
                  <button
                    className="btn btn-primary d-flex align-items-center justify-content-center"
                    style={{
                      backgroundColor: "#1a2a5e",
                      border: "none",
                      width: "40px",
                    }}
                    onClick={handleSearch}
                  >
                    <i className="bi bi-search"></i>
                  </button>
                  <input
                    type="text"
                    className="form-control text-end"
                    placeholder="ابحث عن منتج..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    style={{ fontFamily: "'Cairo', sans-serif" }}
                  />
                </div>
              </div>
              <div className="row gx-4 gy-4">
                {((hasSearched ? results : allProducts) || []).length > 0 ? (
                  (hasSearched ? results : allProducts).map((item) => (
                    <div key={item.used_item_id || item.id} className="col-12 col-md-6 col-lg-4">
                      <PostItem data={item} />
                    </div>
                  ))
                ) : (
                  <div className="col-12 text-center py-5">
                    <p className="text-muted fs-5">
                      {hasSearched
                        ? "لا توجد نتائج لعرضها"
                        : "لا توجد منتجات لعرضها حالياً"}
                    </p>
                  </div>
                )}
              </div>
            </div>

          </div>
        </div>
      </div>
      <Foterr></Foterr>
    </>
  );
}
