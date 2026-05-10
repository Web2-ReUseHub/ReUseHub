import { useState } from "react";

function Categories() {
  const [showElectronics, setShowElectronics] = useState(false);
  const [showFurniture,  setShowFurniture] = useState(false);
  const [showCars, setShowCars] = useState(false);
  const [showAppliances, setShowAppliances] = useState(false);

  return (
    <div>
      <div className="form-check form-check-reverse">
        <input
          className="form-check-input"
          type="checkbox"
          id="electronics"
          onChange={() => setShowElectronics(!showElectronics)}
        />
        <label className="form-check-label " htmlFor="electronics">
          إلكترونيات
        </label>
      </div>

      {showElectronics && (
        <div className="me-4">
          <div className="form-check form-check-reverse">
            <input className="form-check-input" type="checkbox" id="laptop" />
            <label className="form-check-label" htmlFor="laptop">لابتوب</label>
          </div>
          <div className="form-check form-check-reverse">
            <input className="form-check-input" type="checkbox" id="tv" />
            <label className="form-check-label" htmlFor="tv">شاشات</label>
          </div>
          <div className="form-check form-check-reverse">
            <input className="form-check-input" type="checkbox" id="phone" />
            <label className="form-check-label" htmlFor="phone">تلفونات</label>
          </div>
        </div>

      )}





       <div className="form-check form-check-reverse ">
        <input
          className="form-check-input"
          type="checkbox"
          id="furniture"
          onChange={() => setShowFurniture(!showFurniture)}
        />
        <label className="form-check-label" htmlFor="furniture">
          أثاث
        </label>
      </div>

       {showFurniture && (
        <div className="me-4">
          <div className="form-check form-check-reverse">
            <input className="form-check-input" type="checkbox" id="bedroom" />
            <label className="form-check-label" htmlFor="bedroom">غرف نوم</label>
          </div>
          <div className="form-check form-check-reverse">
            <input className="form-check-input" type="checkbox" id="livingroom" />
            <label className="form-check-label" htmlFor="livingroom">غرف جلوس</label>
          </div>
          <div className="form-check form-check-reverse">
            <input className="form-check-input" type="checkbox" id="tables" />
            <label className="form-check-label" htmlFor="tables">طاولات</label>
          </div>
          <div className="form-check form-check-reverse">
            <input className="form-check-input" type="checkbox" id="chairs" />
            <label className="form-check-label" htmlFor="chairs">كراسي</label>
          </div>
          <div className="form-check form-check-reverse">
            <input className="form-check-input" type="checkbox" id="desks" />
            <label className="form-check-label" htmlFor="desks">مكاتب</label>
          </div>
          <div className="form-check form-check-reverse">
            <input className="form-check-input" type="checkbox" id="wardrobes" />
            <label className="form-check-label" htmlFor="wardrobes">خزائن</label>
          </div>
           <div className="form-check form-check-reverse">
            <input className="form-check-input" type="checkbox" id="shelves" />
            <label className="form-check-label" htmlFor="shelves">مكتبات/رفوف</label>
          </div>
          <div className="form-check form-check-reverse">
            <input className="form-check-input" type="checkbox" id="outdoor" />
            <label className="form-check-label" htmlFor="outdoor">أثاث خارجي</label>
          </div>
        </div>
      )}
       




       <div className="form-check form-check-reverse">
        <input
          className="form-check-input"
          type="checkbox"
          id="cars"
          onChange={() => setShowCars(!showCars)}
        />
        <label className="form-check-label" htmlFor="cars">
          سيارات
        </label>
      </div>

      {showCars && (
        <div className="me-4">
          <div className="form-check form-check-reverse">
            <input className="form-check-input" type="checkbox" id="bmw" />
            <label className="form-check-label" htmlFor="bmw">BMW</label>
          </div>
          <div className="form-check form-check-reverse">
            <input className="form-check-input" type="checkbox" id="mercedes" />
            <label className="form-check-label" htmlFor="mercedes">Mercedes</label>
          </div>
          <div className="form-check form-check-reverse">
            <input className="form-check-input" type="checkbox" id="toyota" />
            <label className="form-check-label" htmlFor="toyota">Toyota</label>
          </div>
          <div className="form-check form-check-reverse">
            <input className="form-check-input" type="checkbox" id="ford" />
            <label className="form-check-label" htmlFor="ford">Ford</label>
          </div>
          <div className="form-check form-check-reverse">
            <input className="form-check-input" type="checkbox" id="honda" />
            <label className="form-check-label" htmlFor="honda">Honda</label>
          </div>
        </div>
      )}





      <div className="form-check form-check-reverse">
        <input
          className="form-check-input"
          type="checkbox"
          id="appliances"
          onChange={() => setShowAppliances(!showAppliances)}
        />
        <label className="form-check-label" htmlFor="appliances">
          أجهزة كهربائية
        </label>
      </div>

      {showAppliances && (
        <div className="me-4">
          <div className="form-check form-check-reverse">
            <input className="form-check-input" type="checkbox" id="fridge" />
            <label className="form-check-label" htmlFor="fridge">ثلاجات</label>
          </div>
          <div className="form-check form-check-reverse">
            <input className="form-check-input" type="checkbox" id="washing" />
            <label className="form-check-label" htmlFor="washing">غسالات</label>
          </div>
          <div className="form-check form-check-reverse">
            <input className="form-check-input" type="checkbox" id="ac" />
            <label className="form-check-label" htmlFor="ac">مكيفات هواء</label>
          </div>
          <div className="form-check form-check-reverse">
            <input className="form-check-input" type="checkbox" id="oven" />
            <label className="form-check-label" htmlFor="oven">أفران/مايكروويف</label>
          </div>
          <div className="form-check form-check-reverse">
            <input className="form-check-input" type="checkbox" id="vacuum" />
            <label className="form-check-label" htmlFor="vacuum">مكانس كهربائية</label>
          </div>
          <div className="form-check form-check-reverse">
            <input className="form-check-input" type="checkbox" id="heater" />
            <label className="form-check-label" htmlFor="heater">سخانات مياه</label>
          </div>
          <div className="form-check form-check-reverse">
            <input className="form-check-input" type="checkbox" id="blender" />
            <label className="form-check-label" htmlFor="blender">خلاطات/محضرات طعام</label>
          </div>
          <div className="form-check form-check-reverse">
            <input className="form-check-input" type="checkbox" id="iron" />
            <label className="form-check-label" htmlFor="iron">مكواة</label>
          </div>
          <div className="form-check form-check-reverse">
            <input className="form-check-input" type="checkbox" id="tv2" />
            <label className="form-check-label" htmlFor="tv2">تلفزيونات</label>
          </div>
        </div>
      )}



    </div>
  );
}

export default Categories;