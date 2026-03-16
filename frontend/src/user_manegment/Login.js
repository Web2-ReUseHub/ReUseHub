import { useState } from "react";
function Login(){
     const [mode, setMode] = useState("login");
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirm: "",
  });

  const isLogin = mode === "login";

  const handleChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSwitch = (m) => {
    setMode(m);
    setForm({ name: "", email: "", password: "", confirm: "" });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isLogin) {
      console.log("Login:", { email: form.email, password: form.password });
    } else {
      console.log("Register:", form);
    }
  };

  return (
    <div
      className="min-vh-100 d-flex align-items-center justify-content-center"
      style={{ backgroundColor: "#eaf1fb" }}
    >
      <div
        className="card shadow-sm border-0 p-4"
        style={{ width: "100%", maxWidth: "420px", borderRadius: "16px" }}
      >
        
        <div className="text-center mb-3">
          <div
            className="d-inline-flex align-items-center justify-content-center rounded-3"
            style={{ width: 40, height: 40, backgroundColor: "#1a2a5e" }}
          >
            <i style={{color:"white"}} class="bi bi-person-circle"></i>
          </div>
        </div>

        
        <div className="d-flex rounded-3 p-1 mb-4" style={{ backgroundColor: "#dce8fa" }}>
          <button
            className={`btn flex-fill fw-semibold py-2 ${
              isLogin ? "text-white" : "text-primary bg-transparent border-0"
            }`}
            style={{
              borderRadius: "8px",
              backgroundColor: isLogin ? "#1a2a5e" : "transparent",
              border: "none",
              fontSize: "0.9rem",
            }}
            onClick={() => handleSwitch("login")}
          >
            Sign In
          </button>
          <button
            className={`btn flex-fill fw-semibold py-2 ${
              !isLogin ? "text-white" : "text-primary bg-transparent border-0"
            }`}
            style={{
              borderRadius: "8px",
              backgroundColor: !isLogin ? "#1a2a5e" : "transparent",
              border: "none",
              fontSize: "0.9rem",
            }}
            onClick={() => handleSwitch("register")}
          >
            Register
          </button>
        </div>

        
        <h4 className="fw-bold text-center mb-1" style={{ color: "#1a2a5e" }}>
          {isLogin ? "Welcome back" : "Create an account"}
        </h4>
        <p className="text-center text-secondary mb-4" style={{ fontSize: "0.88rem" }}>
          {isLogin
            ? "Sign in to continue to your account"
            : "Fill in the details below to get started"}
        </p>

        
        <form onSubmit={handleSubmit} key={mode}>
          {!isLogin && (
            <div className="mb-3">
              <label className="form-label fw-semibold" style={{ color: "#1a2a5e", fontSize: "0.85rem" }}>
                Full Name
              </label>
              <input
                type="text"
                name="name"
                className="form-control"
                style={{ backgroundColor: "#f0f5ff", borderColor: "#c5d8f5" }}
                placeholder="Enter your name"
                value={form.name}
                onChange={handleChange}
                required
              />
            </div>
          )}

          <div className="mb-3">
            <label className="form-label fw-semibold" style={{ color: "#1a2a5e", fontSize: "0.85rem" }}>
              Email Address
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
            <label className="form-label fw-semibold" style={{ color: "#1a2a5e", fontSize: "0.85rem" }}>
              Password
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
              <label className="form-label fw-semibold" style={{ color: "#1a2a5e", fontSize: "0.85rem" }}>
                Confirm Password
              </label>
              <input
                type="password"
                name="confirm"
                className="form-control"
                style={{ backgroundColor: "#f0f5ff", borderColor: "#c5d8f5" }}
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
            style={{ backgroundColor: "#1a2a5e", borderRadius: "10px", padding: "0.65rem" }}
          >
            {isLogin ? "Sign In" : "Create Account"}
          </button>
        </form>

       
        <div className="d-flex align-items-center my-3">
          <hr className="flex-grow-1" style={{ borderColor: "#c5d8f5" }} />
          <span className="mx-2 text-secondary" style={{ fontSize: "0.8rem" }}>or</span>
          <hr className="flex-grow-1" style={{ borderColor: "#c5d8f5" }} />
        </div>

        
        <p className="text-center text-secondary mb-0" style={{ fontSize: "0.86rem" }}>
          {isLogin ? (
            <>
              Don't have an account?
              <button
                className="btn btn-link p-0 fw-bold"
                style={{ color: "#1a2a5e", fontSize: "0.86rem" }}
                onClick={() => handleSwitch("register")}
              >
                Register here
              </button>
            </>
          ) : (
            <>
              Already have an account?
              <button
                className="btn btn-link p-0 fw-bold"
                style={{ color: "#1a2a5e", fontSize: "0.86rem" }}
                onClick={() => handleSwitch("login")}
              >
                Sign in
              </button>
            </>
          )}
        </p>
      </div>
    </div>
  );
       
        
      
    
    
}
export default Login;