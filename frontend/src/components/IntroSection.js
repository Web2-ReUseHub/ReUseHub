
import { useState } from "react";

export default function IntroSection() {
  const [query, setQuery] = useState("");

  return (
    <div dir="rtl" style={{ fontFamily: "'Cairo', sans-serif", minHeight: "100vh", backgroundColor: "#f8f9fb" }}>
      <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700&display=swap" rel="stylesheet" />

      
      <nav className="navbar navbar-expand-md bg-white shadow-sm px-4">
        <div className="container-fluid">
          <a className="navbar-brand fw-bold" href="#" style={{ color: "#1a2a5e" }}>ReUseHub</a>

          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navMenu">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navMenu">
            <ul className="navbar-nav mx-auto">
              <li className="nav-item"><a className="nav-link" href="#">الرئيسية</a></li>
              <li className="nav-item"><a className="nav-link" href="#">المنتجات</a></li>
              <li className="nav-item"><a className="nav-link" href="#">تواصل معنا</a></li>
            </ul>
            <button className="btn text-white px-4" style={{ backgroundColor: "#1a2a5e" }}>ابدأ الآن</button>
          </div>
        </div>
      </nav>

      
      <div className="d-flex align-items-center" style={{ minHeight: "calc(100vh - 60px)" }}>
        <div className="container">
          <div className="row align-items-center justify-content-center g-3">

            
            <div className="col-3 d-flex flex-column gap-3">
              <img src="https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=300&q=80" className="img-fluid rounded-4 shadow" style={{ height: "130px", objectFit: "cover" }} alt="laptop" />
              <img src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=300&q=80" className="img-fluid rounded-4 shadow" style={{ height: "130px", objectFit: "cover" }} alt="furniture" />
            </div>

            
            <div className="col-12 col-md-6 text-center">
              <h1 className="fw-bold mb-4" style={{ color: "#1a2a5e", fontSize: "clamp(1.5rem, 3vw, 2.5rem)" }}>
                ReUseHub - منصتك الذكية لبيع
                <br />وشراء كل شيء مستعمل
              </h1>

              <div className="d-flex align-items-center rounded-pill px-3 py-2 shadow mx-auto" style={{ backgroundColor: "#fff", border: "2px solid #c8a84b", maxWidth: "500px" }}>
                <i style={{color:"gold"}} class="bi bi-stars"></i>
                <input
                  type="text"
                  className="border-0 bg-transparent flex-grow-1 text-end mx-2"
                  placeholder="أخبر الذكاء الاصطناعي بما تبحث عنه..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  style={{ outline: "none", fontSize: "13px", fontFamily: "'Cairo', sans-serif" }}
                />
                <button className="btn rounded-circle p-0 d-flex align-items-center justify-content-center" style={{ backgroundColor: "#1a2a5e", width: "36px", height: "36px", border: "none" }}>
                 <i style={{color:"white"}} class="bi bi-search"></i>
                </button>
              </div>
            </div>

            
            <div className="col-3 d-flex flex-column gap-3 ">
              <img src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=300&q=80" className="img-fluid rounded-4 shadow" style={{ height: "130px", objectFit: "cover" }} alt="car" />
              <img src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&q=80" className="img-fluid rounded-4 shadow" style={{ height: "130px", objectFit: "cover" }} alt="watch" />
            </div>

          </div>
        </div>
      </div>

    </div>
  );
}
