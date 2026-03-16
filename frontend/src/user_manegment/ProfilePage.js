import { useState } from "react";
const user = {
  firstName: "",
  lastName: "",
  email: "",
  city: "",
  phone: "",
};

export default function ProfilePage() {
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState(user);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  return (
    <div dir="rtl" style={{ fontFamily: "'Cairo', sans-serif", backgroundColor: "#f5f6fa", minHeight: "100vh" }}>
      <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700&display=swap" rel="stylesheet" />

      

      
      <div className="container py-4">
        <div className="row g-4">

          
          <div className="col-12 col-md-3">
            <div className="card border-0 text-white text-center p-4" style={{ backgroundColor: "#1a2a5e", borderRadius: "12px" }}>
              <i style={{fontSize:"50px"}} class="bi bi-person"></i>
              <h6 className="fw-bold mb-0">أهلاً، {form.firstName} {form.lastName}</h6>
              <small>{form.email}</small>

              <hr className="border-light" />

              <div
                className="d-flex align-items-center gap-2 py-2 px-3 rounded mb-2"
                style={{ backgroundColor: editing ? "rgba(255,255,255,0.15)" : "transparent", cursor: "pointer" }}
                onClick={() => setEditing(true)}
              >
                <i class="bi bi-person"></i> الملف الشخصي
              </div>

              <div
                className="d-flex align-items-center gap-2 py-2 px-3 rounded"
                style={{ cursor: "pointer" }}
                onClick={() => alert("تم تسجيل الخروج")}
              >
                <i class="bi bi-door-closed-fill"></i> تسجيل الخروج
              </div>
            </div>
          </div>

          
          <div className="col-12 col-md-9">
            <div className="card border-0 p-4" style={{ borderRadius: "12px" }}>

              {!editing ? (
                
                <>
                  <div className="d-flex justify-content-between align-items-center mb-4">
                    <h5 className="fw-bold mb-0" style={{ color: "#1a2a5e" }}>الملف الشخصي</h5>
                    <button className="btn text-white" style={{ backgroundColor: "#1a2a5e" }} onClick={() => setEditing(true)}>
                      تعديل الملف الشخصي
                    </button>
                  </div>

                  <div className="row g-3">
                    <div className="col-6">
                      <small className="text-muted">الاسم الأول</small>
                      <p className="fw-semibold">{form.firstName}</p>
                    </div>
                    <div className="col-6">
                      <small className="text-muted">اسم العائلة</small>
                      <p className="fw-semibold">{form.lastName}</p>
                    </div>
                    <div className="col-12">
                      <small className="text-muted">المدينة</small>
                      <p className="fw-semibold">{form.city}</p>
                    </div>
                    <div className="col-12">
                      <small className="text-muted">البريد الإلكتروني</small>
                      <p className="fw-semibold">{form.email}</p>
                    </div>
                    <div className="col-12">
                      <small className="text-muted">رقم الهاتف</small>
                      <p className="fw-semibold">{form.phone}</p>
                    </div>
                  </div>
                </>
              ) : (
              
                <>
                  <h5 className="fw-bold mb-4" style={{ color: "#1a2a5e" }}>تعديل الملف الشخصي</h5>

                  <div className="row g-3">
                    <div className="col-6">
                      <label className="form-label">الاسم الأول</label>
                      <input className="form-control" name="firstName" value={form.firstName} onChange={handleChange} />
                    </div>
                    <div className="col-6">
                      <label className="form-label">اسم العائلة</label>
                      <input className="form-control" name="lastName" value={form.lastName} onChange={handleChange} />
                    </div>
                    <div className="col-12">
                      <label className="form-label">المدينة</label>
                      <input className="form-control" name="city" value={form.city} onChange={handleChange} />
                    </div>
                    <div className="col-12">
                      <label className="form-label">البريد الإلكتروني</label>
                      <input className="form-control" name="email" value={form.email} onChange={handleChange} />
                    </div>
                    <div className="col-12">
                      <label className="form-label">رقم الهاتف</label>
                      <input className="form-control" name="phone" value={form.phone} onChange={handleChange} />
                    </div>
                    <div className="col-12 d-flex gap-2">
                      <button className="btn text-white w-100" style={{ backgroundColor: "#1a2a5e" }} onClick={() => setEditing(false)}>
                        حفظ التغييرات
                      </button>
                      <button className="btn btn-light w-100" onClick={() => setEditing(false)}>
                        إلغاء
                      </button>
                    </div>
                  </div>
                </>
              )}

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
