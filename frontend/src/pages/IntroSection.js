
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useState } from "react";

export default function IntroSection() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  return (
    <div dir="rtl" style={{ fontFamily: "'Cairo', sans-serif", minHeight: "100vh", backgroundColor: "#f8f9fb" }}>
      <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700&display=swap" rel="stylesheet" />
          
           <Navbar showFull={false} />

           

      
      <div className="d-flex align-items-center" style={{ minHeight: "calc(100vh - 60px)" }}>
        <div className="container">
          <div className="row align-items-center justify-content-center g-3">

            
            <div className="col-3 d-flex flex-column gap-3">
               <img src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=300&q=80" className="img-fluid rounded-4 shadow" style={{ height: "130px", objectFit: "cover" }} alt="car" />
              <img src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&q=80" className="img-fluid rounded-4 shadow" style={{ height: "130px", objectFit: "cover" }} alt="watch" />
              <img src="https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=300&q=80" className="img-fluid rounded-4 shadow" style={{ height: "130px", objectFit: "cover" }} alt="laptop" />
              <img src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=300&q=80" className="img-fluid rounded-4 shadow" style={{ height: "130px", objectFit: "cover" }} alt="furniture" />
            
            </div>

            
            <div className="col-12 col-md-6 text-center">
              <h1 className="fw-bold mb-4" style={{ color: "#1a2a5e", fontSize: "clamp(1.5rem, 3vw, 2.5rem)" }}>
                ReUseHub <br/> <br/>  منصتك الذكية لبيع
                <br />وشراء كل شيء مستعمل
                 <br />
               </h1>

              <div className="d-flex align-items-center rounded-pill px-3 py-2 shadow mx-auto" style={{ backgroundColor: "#fff", border: "2px solid #c8a84b", maxWidth: "500px" }}>
                <i style={{color:"gold"}} class="bi bi-stars"></i>
                <input
                  type="text"
                  className="border-0 bg-transparent flex-grow-1 text-end mx-2"
                  placeholder="أخبر الذكاء الاصطناعي بما تبحث عنه..."
                  readOnly
                  disabled
                  onChange={(e) => setQuery(e.target.value)}
                  style={{ outline: "none", fontSize: "13px", fontFamily: "'Cairo', sans-serif", pointerEvents: "none", backgroundColor: "transparent" }}
                />
                <button className="btn rounded-circle p-0 d-flex align-items-center justify-content-center" style={{ backgroundColor: "#1a2a5e", width: "36px", height: "36px", border: "none", pointerEvents: "none" }}>
                 <i style={{color:"white"}} class="bi bi-search"></i>
                </button>
                  

              </div>
                    <div className="text-center mt-5">
                         <button
                         className="btn px-5 py-2 fw-bold text-white mt-5 "
                         style={{
                      
                         backgroundColor: "#1a2a5e", 
                         fontSize: "16px",
                         transition: "all 0.3s ease"
                                                      }}
                         onMouseEnter={(e) => (e.target.style.transform = "scale(1.1)")}
                         onMouseLeave={(e) => (e.target.style.transform = "scale(1)")}
                         onClick={() => navigate("/login")}
                          > ابدأ الآن </button>
                     </div>


            </div>

            
            <div className="col-3 d-flex flex-column gap-3 ">
              <img src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=300&q=80" className="img-fluid rounded-4 shadow" style={{ height: "130px", objectFit: "cover" }} alt="car" />
              <img src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&q=80" className="img-fluid rounded-4 shadow" style={{ height: "130px", objectFit: "cover" }} alt="watch" />
              <img src="https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=300&q=80" className="img-fluid rounded-4 shadow" style={{ height: "130px", objectFit: "cover" }} alt="laptop" />
              <img src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=300&q=80" className="img-fluid rounded-4 shadow" style={{ height: "130px", objectFit: "cover" }} alt="furniture" />
            </div>


          </div>
        </div>
      </div>

    </div>
  );
}
