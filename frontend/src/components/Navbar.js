import React from "react";
import "../index.css";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar({ showFull }) {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));
  const ADMIN_EMAIL = "admin123@gmail.com";
  const isAdmin = user?.email === ADMIN_EMAIL;
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark naivy">
      <div className="container-fluid">
        <Link className="navbar-brand fs-3" to="/">
          ReUseHub
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarMenu"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarMenu">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0 align-items-lg-center">
            <li className="nav-item">
              <Link className="nav-link fs-5 px-2" to="/trending">
                الرئيسية
              </Link>
            </li>

            {showFull && (
              <li className="nav-item">
                <Link className="nav-link fs-5 px-2" to="/search">
                  البحث الذكي
                </Link>
              </li>
            )}

            {showFull && isAdmin && (
              <li className="nav-item">
                <Link className="nav-link fs-5 px-2" to="/dashbord">
                  لوحة التحكم
                </Link>
              </li>
            )}
          </ul>

          {showFull && (


            <ul className="navbar-nav mb-2 mb-lg-0 d-flex flex-column flex-lg-row align-items-start align-items-lg-center icon-nav">
              
                       <li className="nav-item icon-item">
  <Link className="nav-link p-0" to="/favorites">
    <i className="bi bi-heart-fill favorite-icon ms-3" style={{ color: "red" }}></i>
  </Link>
</li>
              
              
              <li className="nav-item icon-item">
                <Link className="nav-link p-0" to="/requests">
                  <i className="bi bi-clipboard-check shop-icon"></i>
                </Link>
              </li>
              <li className="nav-item icon-item">
                <Link className="nav-link p-0" to="/profile">
                  <i className="bi bi-person-circle profile-icon ms-3"></i>
                </Link>
              </li>
              
     





              <li className="nav-item ms-lg-3 mt-2 mt-lg-0">
                <button
                  className="btn btn-outline-light btn-sm"
                  onClick={handleLogout}
                >
                  تسجيل الخروج
                </button>
              </li>
            </ul>
          )}
        </div>
      </div>
    </nav>
  );
}
