
import { useNavigate } from "react-router-dom";
import AboutWebsite from "../pages/AboutWebsite";
import AboutUs from "../pages/AboutUs";
import Navbar from "../components/Navbar";
import { useState, useEffect } from "react";
import Foterr from "../components/Foterr";

export default function IntroSection() {
 const images = [
  "/imgs/mm.jpg",
  "/imgs/slider2.jpg",
  "/imgs/elec.jpg",
  "/imgs/Cars.jpg",
  "/imgs/Inviting.jpg"
];

  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 2000);

    return () => clearInterval(interval);
  }, [images.length]);


  
  const navigate = useNavigate();
  return (
    <div dir="rtl" style={{ fontFamily: "'Cairo', sans-serif", minHeight: "100vh", backgroundColor: "#f8f9fb" }}>
      <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700&display=swap" rel="stylesheet" />
          
           <Navbar showFull={false} />
           <section>
      <div style={{ position: "relative", minHeight: "calc(100vh - 60px)", overflow: "hidden" }}>
        
     
        {images.map((img, index) => (
          <div
            key={index}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              backgroundImage: `url(${img})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              opacity: index === current ? 0.3 : 0,
              transition: "opacity 1s ease-in-out",
              zIndex: 0
            }}
          />
        ))}

        {/* النصوص والفقرات فوق الصور */}
        <div style={{ position: "relative", zIndex: 1, textAlign: "center", paddingTop: "100px" }}>
          <h1 className="fw-bold mb-4" style={{ color: "#1a2a5e", fontSize: "clamp(1.5rem, 3vw, 2.5rem)" }}>
            ReUseHub <br/><br/> منصتك الذكية لبيع<br/> وشراء كل شيء مستعمل
          </h1>

          <div className="d-flex align-items-center rounded-pill px-3 py-2 shadow mx-auto" 
               style={{ backgroundColor: "#fff", border: "2px solid #c8a84b", maxWidth: "500px" }}>
            <i style={{color:"gold"}} className="bi bi-stars"></i>
            <input
              type="text"
              className="border-0 bg-transparent flex-grow-1 text-end mx-2"
              placeholder="أخبر الذكاء الاصطناعي بما تبحث عنه..."
              readOnly
              disabled
             
              style={{ outline: "none", fontSize: "13px", fontFamily: "'Cairo', sans-serif", backgroundColor: "transparent" }}
            />

 <button className="btn rounded-circle p-0 d-flex align-items-center justify-content-center" 
                    style={{ backgroundColor: "#1a2a5e", width: "36px", height: "36px", border: "none" }}>
              <i style={{color:"white"}} className="bi bi-search"></i>
            </button>
          </div>

          <div className="text-center mt-5">
            <button
              className="btn px-5 py-2 fw-bold text-white mt-5"
              style={{ backgroundColor: "#1a2a5e", fontSize: "16px", transition: "all 0.3s ease" }}
              onMouseEnter={(e) => (e.target.style.transform = "scale(1.1)")}
              onMouseLeave={(e) => (e.target.style.transform = "scale(1)")}
              onClick={() => navigate("/login")}
            >
              ابدأ الآن
            </button>
          </div>
        </div>

     
       

      
        </div>
        </section>
                
             
          <AboutWebsite/>
          <AboutUs/>
          <Foterr></Foterr>
   
   </div>
  );
}
