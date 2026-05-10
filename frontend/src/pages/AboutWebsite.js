import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../index.css";

function AboutWebsite() {
  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700&display=swap"
        rel="stylesheet"
      />
      <div
        dir="rtl"
        style={{
          fontFamily: "'Cairo', sans-serif",
          minHeight: "100vh",
          backgroundColor: "#f8f9fb",
        }}
      >
        <div className="text-center py-5 border-bottom mb-5">
          <span
            className="badge rounded-pill px-3 py-2 mb-3"
            style={{
              background: "#e8ecf7",
              color: "#1a2a5e",
              fontSize: "13px",
              fontWeight: "600",
            }}
          >
            منصتك للتسوق الذكي
          </span>
          <h1
            className="mt-2 mb-3"
            style={{ fontSize: "2.2rem", fontWeight: "700", color: "#1a2a5e" }}
          >
            مرحباً بك في <span style={{ color: "#1a2a5e" }}>ReUseHub</span>
          </h1>
          <p
            className="text-muted mx-auto"
            style={{ maxWidth: "560px", lineHeight: "1.8", fontWeight: "600" }}
          >
            - المنصة العربية الأولى لبيع وشراء القطع المستعملة بأمان وسهولة
            مدعومة - بتقنية الذكاء الاصطناعي
          </p>
        </div>

        <div className="container" style={{ maxWidth: "860px" }}>
          <h2 className="mb-3" style={{ fontWeight: "700" }}>
            عن الموقع{" "}
          </h2>
          <p
            className="text-muted mb-5"
            style={{ lineHeight: "1.9", fontWeight: "600" }}
          >
            ReUseHub هو متجر إلكتروني متخصص في بيع وشراء القطع والمنتجات
            المستعملة. هدفنا أن نوفر بيئة موثوقة وذكية تجمع البائعين والمشترين
            في مكان واحد، مع الاستفادة من أحدث تقنيات الذكاء الاصطناعي لضمان
            تجربة آمنة وسلسة للجميع.
          </p>

          <h2 className="mb-4" style={{ fontWeight: "700" }}>
            مميزات المنصة
          </h2>
          <div className="row g-4 mb-5">
            <div className="col-md-6 col-lg-4">
              <div
                className="card h-100 border"
                style={{
                  borderRadius: "14px",
                  borderColor: "#d0d8ef",
                  padding: "0.5rem",
                }}
              >
                <div className="card-body p-4">
                  <div
                    className="mb-3"
                    style={{
                      width: "48px",
                      height: "48px",
                      borderRadius: "12px",
                      background: "#E6F1FB",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <i
                      className="bi bi-pencil-square"
                      style={{ color: "#185FA5", fontSize: "20px" }}
                    ></i>
                  </div>
                  <h6
                    className="mb-2"
                    style={{ fontSize: "15px", fontWeight: "700" }}
                  >
                    تهيئة المنشور بالذكاء الاصطناعي
                  </h6>
                  <p
                    className="text-muted small mb-0"
                    style={{ lineHeight: "1.7", fontWeight: "600" }}
                  >
                    قبل ما تنشر إعلانك، الذكاء الاصطناعي يساعدك تحسّن العنوان
                    والوصف والسعر
                  </p>
                </div>
              </div>
            </div>

            <div className="col-md-6 col-lg-4">
              <div
                className="card h-100 border"
                style={{
                  borderRadius: "14px",
                  borderColor: "#f5c4c4",
                  padding: "0.5rem",
                }}
              >
                <div className="card-body p-4">
                  <div
                    className="mb-3"
                    style={{
                      width: "48px",
                      height: "48px",
                      borderRadius: "12px",
                      background: "#FCEBEB",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <i
                      className="bi bi-shield-check"
                      style={{ color: "#A32D2D", fontSize: "20px" }}
                    ></i>
                  </div>
                  <h6
                    className="mb-2"
                    style={{ fontSize: "15px", fontWeight: "700" }}
                  >
                    منع الاحتيال
                  </h6>
                  <p
                    className="text-muted small mb-0"
                    style={{ lineHeight: "1.7", fontWeight: "600" }}
                  >
                    نظام ذكي يكشف المنشورات المشبوهة ويحمي المستخدمين من عمليات
                    النصب
                  </p>
                </div>
              </div>
            </div>

            <div className="col-md-6 col-lg-4">
              <div
                className="card h-100 border"
                style={{
                  borderRadius: "14px",
                  borderColor: "#9FE1CB",
                  padding: "0.5rem",
                }}
              >
                <div className="card-body p-4">
                  <div
                    className="mb-3"
                    style={{
                      width: "48px",
                      height: "48px",
                      borderRadius: "12px",
                      background: "#E1F5EE",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <i
                      className="bi bi-search"
                      style={{ color: "#0F6E56", fontSize: "20px" }}
                    ></i>
                  </div>
                  <h6
                    className="mb-2"
                    style={{ fontSize: "15px", fontWeight: "700" }}
                  >
                    بحث ذكي
                  </h6>
                  <p
                    className="text-muted small mb-0"
                    style={{ lineHeight: "1.7", fontWeight: "600" }}
                  >
                    ابحث بلغة طبيعية والذكاء الاصطناعي سيفهم ما تحتاجه تماماً
                  </p>
                </div>
              </div>
            </div>

            <div className="col-md-6 col-lg-4">
              <div
                className="card h-100 border"
                style={{
                  borderRadius: "14px",
                  borderColor: "#FAC775",
                  padding: "0.5rem",
                }}
              >
                <div className="card-body p-4">
                  <div
                    className="mb-3"
                    style={{
                      width: "48px",
                      height: "48px",
                      borderRadius: "12px",
                      background: "#FAEEDA",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <i
                      className="bi bi-hand-thumbs-up"
                      style={{ color: "#854F0B", fontSize: "20px" }}
                    ></i>
                  </div>
                  <h6
                    className="mb-2"
                    style={{ fontSize: "15px", fontWeight: "700" }}
                  >
                    سهولة الاستخدام
                  </h6>
                  <p
                    className="text-muted small mb-0"
                    style={{ lineHeight: "1.7", fontWeight: "600" }}
                  >
                    واجهة عربية بسيطة تناسب جميع الأعمار والفئات
                  </p>
                </div>
              </div>
            </div>

            <div className="col-md-6 col-lg-4">
              <div
                className="card h-100 border"
                style={{
                  borderRadius: "14px",
                  borderColor: "#C0DD97",
                  padding: "0.5rem",
                }}
              >
                <div className="card-body p-4">
                  <div
                    className="mb-3"
                    style={{
                      width: "48px",
                      height: "48px",
                      borderRadius: "12px",
                      background: "#EAF3DE",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <i
                      className="bi bi-people"
                      style={{ color: "#3B6D11", fontSize: "20px" }}
                    ></i>
                  </div>
                  <h6
                    className="mb-2"
                    style={{ fontSize: "15px", fontWeight: "700" }}
                  >
                    مجتمع موثوق
                  </h6>
                  <p
                    className="text-muted small mb-0"
                    style={{ lineHeight: "1.7", fontWeight: "600" }}
                  >
                    نظام تقييم للبائعين والمشترين يبني ثقة حقيقية بين الأعضاء
                  </p>
                </div>
              </div>
            </div>

            <div className="col-md-6 col-lg-4">
              <div
                className="card h-100 border"
                style={{
                  borderRadius: "14px",
                  borderColor: "#AFA9EC",
                  padding: "0.5rem",
                }}
              >
                <div className="card-body p-4">
                  <div
                    className="mb-3"
                    style={{
                      width: "48px",
                      height: "48px",
                      borderRadius: "12px",
                      background: "#EEEDFE",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <i
                      className="bi bi-laptop"
                      style={{ color: "#534AB7", fontSize: "20px" }}
                    ></i>
                  </div>
                  <h6
                    className="mb-2"
                    style={{ fontSize: "15px", fontWeight: "700" }}
                  >
                    متاح على كل الأجهزة
                  </h6>
                  <p
                    className="text-muted small mb-0"
                    style={{ lineHeight: "1.7", fontWeight: "600" }}
                  >
                    تصفح وبع واشتر من موبايلك أو كمبيوترك بنفس السهولة
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AboutWebsite;
