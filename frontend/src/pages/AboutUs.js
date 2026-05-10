import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../index.css";

function AboutUs() {
  const team = [
    {
      name: "Mayar Othman",
      desc: "Cap Student at NNU || AI",
      link: "https://www.linkedin.com/in/username1",
    },
    {
      name: "Yahya Hattab",
      desc: "Cap Student at NNU",
      link: "https://www.linkedin.com/in/username2",
    },
    {
      name: "Mahmoud Adham",
      desc: "Cap Student at NNU",
      link: "https://www.linkedin.com/in/username3",
    },
    {
      name: "Amr Khayyat",
      desc: "Cap Student at NNU || SW",
      link: "https://www.linkedin.com/in/username4",
    },
    {
      name: "Gharam Zaki",
      desc: "Cap Student at NNU",
      link: "https://www.linkedin.com/in/username5",
    },
    {
      name: "Mahmoud Dwikat",
      desc: "Cap Student at NNU",
      link: "https://www.linkedin.com/in/username6",
    },
  ];

  return (
    <>
      <div dir="rtl">
        <div className="container py-5">
          <h1 className="text-center mb-5" style={{ color: "#1a2a5e" }}>
            من نحن!
          </h1>

          <div
            className="row justify-content-center g-4 pt-5"
            style={{ padding: "80px" }}
          >
            {team.map((member, index) => (
              <div
                className="col-md-4 col-sm-6 d-flex justify-content-center"
                key={index}
              >
                <div
                  className="card text-center h-100 shadow-lg"
                  style={{
                    backgroundColor: "#1a2a5e",
                    width: "70%",
                    transition: "transform 0.3s",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.transform = "scale(1.05)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.transform = "scale(1)")
                  }
                >
                  <a
                    href={member.link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i
                      className="bi bi-person-circle"
                      style={{ fontSize: "80px", color: "#dce8fa" }}
                    ></i>
                  </a>
                  <div className="card-body">
                    <h5 className="card-title" style={{ color: "#dce8fa" }}>
                      {member.name}
                    </h5>
                    <p className="card-text" style={{ color: "#dce8fa" }}>
                      {member.desc}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="container my-5">
            <div className="row justify-content-center">
              <div className="col-12 col-md-10 text-center">
                <p
                  style={{ fontSize: "1rem", lineHeight: "1.8", color: "#333" }}
                >
                  نحن مجموعة من طلاب علم الحاسوب، نسعى إلى تطبيق ما تعلمناه في
                  الجامعة داخل سوق العمل الحقيقي. نعمل معاً على تطوير حلول
                  مبتكرة تجمع بين المعرفة الأكاديمية والخبرة العملية، ونركز على
                  بناء منصات ذكية تخدم المجتمع وتسهّل حياة الناس. شغفنا
                  بالتكنولوجيا يدفعنا للاستمرار في التعلم والتجربة، وتحويل
                  أفكارنا إلى مشاريع ملموسة.
                </p>
              </div>
            </div>
          </div>

          <div
            className="text-center rounded-3 p-4 mb-5"
            style={{ background: "#e8ecf7", border: "0.5px solid #b0bcdf" }}
          >
            <p
              className="mb-1"
              style={{ color: "#1a2a5e", fontSize: "18px", fontWeight: "700" }}
            >
              جاهز تبدأ؟
            </p>
            <p
              className="mb-0"
              style={{ color: "#2d3f7a", fontSize: "14px", fontWeight: "600" }}
            >
              سجّل الآن وانضم لآلاف المستخدمين على ReUseHub
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default AboutUs;
