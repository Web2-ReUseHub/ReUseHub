import { useNavigate } from "react-router-dom";
import { useState } from "react";
function Login() {
  const navigate = useNavigate();

  const [mode, setMode] = useState("login");
  const isLogin = mode === "login";

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirm: "",
  });

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const switchMode = (newMode) => {
    setMode(newMode);
    setForm({ name: "", email: "", password: "", confirm: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isLogin && form.password !== form.confirm) {
      alert("كلمة المرور غير متطابقة");
      return;
    }

    const url = isLogin
      ? "http://localhost:5004/user/login"
      : "http://localhost:5004/user/register";

    const body = isLogin
      ? {
          email: form.email,
          password: form.password,
        }
      : {
          name: form.name,
          email: form.email,
          password: form.password,
        };

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || data.error || "حدث خطأ");
        return;
      }

      if (isLogin) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));

        alert("تم تسجيل الدخول بنجاح");
        navigate("/trending");
      } else {
        alert("تم إنشاء الحساب بنجاح، سجل دخولك الآن");
        switchMode("login");
      }
    } catch (error) {
      console.log("FETCH ERROR:", error);
      alert(error.message);
    }
  };

  return (
    
    <div className="container-fluid vh-100 p-0">
      <div className="row h-100 m-0">
        <div
          className="col-md-6 d-none d-md-flex flex-column justify-content-center align-items-center p-5"
          style={{
            background: "linear-gradient(145deg, #0a1628, #1a2a5e, #0d3b7a)",
          }}
        >
          <button
            className="btn position-absolute top-0 start-0 m-3 rounded-circle shadow d-flex align-items-center justify-content-center"
            style={{
              width: 48,
              height: 48,
              backgroundColor: "#1a2a5e",
              border: "none",
              zIndex: 10,
            }}
            onClick={() => navigate("/")}
          >
            <i
              className="bi bi-arrow-left"
              style={{ color: "white", fontSize: 18 }}
            />
          </button>
          <div
            className="d-flex align-items-center gap-2 rounded-pill px-3 py-2 mb-4"
            style={{
              background: "rgba(255,255,255,0.1)",
              border: "1px solid rgba(255,255,255,0.2)",
            }}
          >
            <span style={{ fontSize: 22, color: "green" }}>
              <i class="bi bi-recycle"></i>
            </span>
            <span className="fw-bold text-white fs-5">
              Reuse<span style={{ color: "#63b3ff" }}>Hub</span>
            </span>
          </div>

          <h1
            className="fw-bold text-white text-center mb-3"
            style={{ fontSize: "2rem", direction: "rtl" }}
          >
            سوق ذكي للأغراض <span style={{ color: "#63b3ff" }}>المستعملة</span>
          </h1>

          <p
            className="text-center mb-4"
            style={{
              color: "rgba(255,255,255,0.65)",
              direction: "rtl",
              lineHeight: 1.8,
            }}
          >
            منصة تربط البائعين بالمشترين بطريقة سهلة وآمنة،
            <br />
            مع مساعد ذكاء اصطناعي يرافقك في كل خطوة.
          </p>

          <div
            className="d-flex flex-column gap-3 w-100"
            style={{ maxWidth: 400, direction: "rtl" }}
          >
            <div
              className="d-flex align-items-center gap-3 rounded-3 p-3"
              style={{
                background: "rgba(255,255,255,0.07)",
                border: "1px solid rgba(255,255,255,0.12)",
              }}
            >
              <span style={{ fontSize: 26, color: "black" }}>
                <i class="bi bi-robot"></i>
              </span>
              <div>
                <div
                  className="fw-bold text-white"
                  style={{ fontSize: "0.88rem" }}
                >
                  إعلانات بمساعدة AI
                </div>
                <div
                  style={{
                    fontSize: "0.78rem",
                    color: "rgba(255,255,255,0.55)",
                  }}
                >
                  الذكاء الاصطناعي يكتب وصف منتجك تلقائياً
                </div>
              </div>
            </div>

            <div
              className="d-flex align-items-center gap-3 rounded-3 p-3"
              style={{
                background: "rgba(255,255,255,0.07)",
                border: "1px solid rgba(255,255,255,0.12)",
              }}
            >
              <span style={{ fontSize: 26, color: "lightblue" }}>
                <i class="bi bi-search"></i>
              </span>
              <div>
                <div
                  className="fw-bold text-white"
                  style={{ fontSize: "0.88rem" }}
                >
                  بحث ذكي
                </div>
                <div
                  style={{
                    fontSize: "0.78rem",
                    color: "rgba(255,255,255,0.55)",
                  }}
                >
                  ابحث بالطريقة اللي تريحك وسيجد ما تريد
                </div>
              </div>
            </div>

            <div
              className="d-flex align-items-center gap-3 rounded-3 p-3"
              style={{
                background: "rgba(255,255,255,0.07)",
                border: "1px solid rgba(255,255,255,0.12)",
              }}
            >
              <span style={{ fontSize: 26, color: "black" }}>
                <i class="bi bi-shield-shaded"></i>
              </span>
              <div>
                <div
                  className="fw-bold text-white"
                  style={{ fontSize: "0.88rem" }}
                >
                  حماية من الاحتيال
                </div>
                <div
                  style={{
                    fontSize: "0.78rem",
                    color: "rgba(255,255,255,0.55)",
                  }}
                >
                  نظام ذكي يكتشف العروض المشبوهة ويحميك
                </div>
              </div>
            </div>

            <div
              className="d-flex align-items-center gap-3 rounded-3 p-3"
              style={{
                background: "rgba(255,255,255,0.07)",
                border: "1px solid rgba(255,255,255,0.12)",
              }}
            >
              <span style={{ fontSize: 26, color: "lightblue" }}>
                <i class="bi bi-check2-all"></i>
              </span>
              <div>
                <div
                  className="fw-bold text-white"
                  style={{ fontSize: "0.88rem" }}
                >
                  تواصل مباشر
                </div>
                <div
                  style={{
                    fontSize: "0.78rem",
                    color: "rgba(255,255,255,0.55)",
                  }}
                >
                  تفاوض وأتمم الصفقة بكل سهولة وأمان
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          className="col-12 col-md-6 d-flex align-items-center justify-content-center p-4 position-relative overflow-hidden"
          style={{ background: "#dce8fa" }}
        >
          <div
            className="bg-white rounded-4 shadow p-4 w-100 position-relative"
            style={{ maxWidth: 420, zIndex: 5 }}
          >
            <div className="text-center mb-3">
              <div
                className="d-inline-flex align-items-center justify-content-center rounded-3"
                style={{ width: 44, height: 44, backgroundColor: "#1a2a5e" }}
              >
                <i
                  className="bi bi-person-circle"
                  style={{ color: "white", fontSize: 20 }}
                />
              </div>
            </div>

            <div
              className="d-flex rounded-3 p-1 mb-4"
              style={{ backgroundColor: "#dce8fa" }}
            >
              <button
                className="btn flex-fill fw-semibold py-2"
                style={{
                  borderRadius: 8,
                  border: "none",
                  fontSize: "0.9rem",
                  backgroundColor: isLogin ? "#1a2a5e" : "transparent",
                  color: isLogin ? "white" : "#1a2a5e",
                }}
                onClick={() => switchMode("login")}
              >
                تسجيل الدخول
              </button>
              <button
                className="btn flex-fill fw-semibold py-2"
                style={{
                  borderRadius: 8,
                  border: "none",
                  fontSize: "0.9rem",
                  backgroundColor: !isLogin ? "#1a2a5e" : "transparent",
                  color: !isLogin ? "white" : "#1a2a5e",
                }}
                onClick={() => switchMode("register")}
              >
                إنشاء حساب
              </button>
            </div>

            <h4
              className="fw-bold text-center mb-1"
              style={{ color: "#1a2a5e" }}
            >
              {isLogin ? "أهلاً بعودتك " : "إنشاء حساب جديد"}
            </h4>
            <p
              className="text-center text-secondary mb-4"
              style={{ fontSize: "0.87rem" }}
            >
              {isLogin ? "سجّل دخولك للمتابعة" : "أدخل بياناتك للبدء"}
            </p>

            <form onSubmit={handleSubmit} key={mode}>
              {!isLogin && (
                <div className="mb-3">
                  <label
                    className="form-label fw-semibold"
                    style={{ color: "#1a2a5e", fontSize: "0.85rem" }}
                  >
                    الاسم الكامل
                  </label>
                  <input
                    type="text"
                    name="name"
                    className="form-control"
                    style={{
                      backgroundColor: "#f0f5ff",
                      borderColor: "#c5d8f5",
                    }}
                    placeholder="أدخل اسمك"
                    value={form.name}
                    onChange={handleChange}
                    required
                  />
                </div>
              )}

              <div className="mb-3">
                <label
                  className="form-label fw-semibold"
                  style={{ color: "#1a2a5e", fontSize: "0.85rem" }}
                >
                  البريد الإلكتروني
                </label>
                <input
                  type="email"
                  name="email"
                  className="form-control"
                  style={{ backgroundColor: "#f0f5ff", borderColor: "#c5d8f5" }}
                  placeholder="you@example.com"
                  value={form.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label
                  className="form-label fw-semibold"
                  style={{ color: "#1a2a5e", fontSize: "0.85rem" }}
                >
                  كلمة المرور
                </label>
                <input
                  type="password"
                  name="password"
                  className="form-control"
                  style={{ backgroundColor: "#f0f5ff", borderColor: "#c5d8f5" }}
                  placeholder="••••••••"
                  value={form.password}
                  onChange={handleChange}
                  required
                />
              </div>

              {!isLogin && (
                <div className="mb-3">
                  <label
                    className="form-label fw-semibold"
                    style={{ color: "#1a2a5e", fontSize: "0.85rem" }}
                  >
                    تأكيد كلمة المرور
                  </label>
                  <input
                    type="password"
                    name="confirm"
                    className="form-control"
                    style={{
                      backgroundColor: "#f0f5ff",
                      borderColor: "#c5d8f5",
                    }}
                    placeholder="••••••••"
                    value={form.confirm}
                    onChange={handleChange}
                    required
                  />
                </div>
              )}

              <button
                type="submit"
                className="btn w-100 fw-semibold text-white mt-2"
                style={{
                  backgroundColor: "#1a2a5e",
                  borderRadius: 10,
                  padding: "0.65rem",
                }}
              >
                {isLogin ? "تسجيل الدخول" : "إنشاء الحساب"}
              </button>
            </form>

            <div className="d-flex align-items-center my-3">
              <hr className="flex-grow-1" style={{ borderColor: "#c5d8f5" }} />
              <span
                className="mx-2 text-secondary"
                style={{ fontSize: "0.8rem" }}
              >
                أو
              </span>
              <hr className="flex-grow-1" style={{ borderColor: "#c5d8f5" }} />
            </div>

            <p
              className="text-center text-secondary mb-0"
              style={{ fontSize: "0.86rem" }}
            >
              {isLogin ? "ليس لديك حساب؟" : "لديك حساب بالفعل؟"}{" "}
              <button
                className="btn btn-link p-0 fw-bold"
                style={{ color: "#1a2a5e", fontSize: "0.86rem" }}
                onClick={() => switchMode(isLogin ? "register" : "login")}
              >
                {isLogin ? "سجّل الآن" : "تسجيل الدخول"}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
    
  );
}

export default Login;
