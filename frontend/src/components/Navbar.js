import React from "react";
import '../index.css';
import { Link } from "react-router-dom";
export default function Navbar({ showFull }) {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark naivy">
      <div className="container-fluid">
        {/* اسم الموقع */}
        <Link className="navbar-brand fs-3" to="/">ReUseHub</Link>


        {/* زر القائمة */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarMenu"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* محتوى الناف بار */}
        <div className="collapse navbar-collapse" id="navbarMenu">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0 me-5">
            <li className="nav-item">
                  <a className="nav-link me-5 fs-5" href="/trending">الرئيسية</a>
                </li>
            {showFull && (
              <>
                
                <li className="nav-item">
                  <a className="nav-link me-3 fs-5" href="/search">البحث الذكي</a>
                </li>
              </>
            )}
            <li className="nav-item">
              <a className="nav-link me-3 fs-5" href="#">من نحن</a>
            </li>
            <li className="nav-item">
              <a className="nav-link me-3 fs-5" href="/about">عن الموقع</a>
            </li>
          </ul>

          {showFull && (
            <ul className="navbar-nav me-auto ms-3">
              <li className="nav-item ms-1 mt-2">
                <a className="nav-link" href="#">
                  <i className="bi bi-cart shop-icon"></i>
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  <i className="bi bi-person-circle profile-icon"></i>
                </a>
              </li>
            </ul>
          )}
        </div>
      </div>
    </nav>
  );
}