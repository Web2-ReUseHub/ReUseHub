import React from "react";
import '../index.css';
import Navbar from "../components/Navbar";
import Categories from "../components/Categories";
export default function SidebarFilter() {
  return (

  <div dir="rtl">
    <Navbar showFull={true} />
    <div className="container-fluid">
      <div className="row g-0">
        <div className="sidebar col-md-3">
          <div className="card h-100">
            <div className="card-header bg-light">
              <h4 className="mb-0 text-center">تصفية النتائج</h4>
            </div>

            <div className="card-body text-end bg-light">
                 
                {/* الفئة */}
               <div className="mb-4">
                  <h5>الفئة</h5>

                      <Categories /> 
                </div>
                {/* السعر */}
              <div className="mb-4">
                   <h5>السعر</h5>

                    <div className="form-check form-check-reverse">
                       <input className="form-check-input" type="checkbox" id="price1" />
                       <label className="form-check-label" htmlFor="price1">0 - 100</label>
                   </div>

                   <div className="form-check form-check-reverse">
                       <input className="form-check-input" type="checkbox" id="price2" />
                       <label className="form-check-label" htmlFor="price2">100 - 200</label>
                   </div>

                   <div className="form-check form-check-reverse">
                       <input className="form-check-input" type="checkbox" id="price3" />
                       <label className="form-check-label" htmlFor="price3">200 - 300</label>
                  </div>

                  <div className="form-check form-check-reverse">
                       <input className="form-check-input" type="checkbox" id="price4" />
                       <label className="form-check-label" htmlFor="price4">أكثر من 300</label>
                 </div>
             </div>

              {/* الحالة */}
              <div className="mb-4">
                <h5>الحالة</h5>
                <div className="form-check form-check-reverse">
                  <input className="form-check-input" type="checkbox" id="Excellent" />
                  <label className="form-check-label" htmlFor="Excellent">ممتاز</label>
                </div>
                <div className="form-check form-check-reverse">
                  <input className="form-check-input" type="checkbox" id="Normal" />
                  <label className="form-check-label" htmlFor="Normal">عادي</label>
                </div>
              </div>

              {/* التقييم */}
              <div className="mb-4">
                <h5 className="text-end">تقييم البائع</h5>
                <div className="rating text-center">
                  <input type="radio" id="star1" name="rating" value="1" />
                  <label htmlFor="star1"><i className="fas fa-star"></i></label>

                  <input type="radio" id="star2" name="rating" value="2" />
                  <label htmlFor="star2"><i className="fas fa-star"></i></label>

                  <input type="radio" id="star3" name="rating" value="3" />
                  <label htmlFor="star3"><i className="fas fa-star"></i></label>

                  <input type="radio" id="star4" name="rating" value="4" />
                  <label htmlFor="star4"><i className="fas fa-star"></i></label>

                  <input type="radio" id="star5" name="rating" value="5" />
                  <label htmlFor="star5"><i className="fas fa-star"></i></label>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  );
}