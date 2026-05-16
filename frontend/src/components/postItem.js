import React, { useState } from 'react';
import axios from 'axios';

const API_BASE_URL = "http://localhost:5004";

function parseTitleAndBody(description = "", title = "") {
  const raw = String(description || "").trim();
  if (!raw) return { title: title || "", body: "" };
  const titleMatch = raw.match(/العنوان:\s*([^\n\r]+)/i);
  const bodyMatch = raw.match(/الوصف:\s*([\s\S]+)/i);
  return {
    title: title || (titleMatch ? titleMatch[1].trim() : ""),
    body: bodyMatch ? bodyMatch[1].trim() : raw.replace(titleMatch?.[0] || "", "").trim(),
  };
}

const PostItem = ({ data }) => {
  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(data?.likes_count || 0);
  const [showComment, setShowComment] = useState(false);
  const [comment, setComment] = useState("");
  const [isVisible, setIsVisible] = useState(true);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [requested, setRequested] = useState(false);
  const [showGallery, setShowGallery] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  if (!data || !isVisible) return null;

  const { title: displayTitle, body: displayDescription } = parseTitleAndBody(data.description, data.title);
  const isSold = data.is_sold;

  const images = data.images?.length
      ? data.images.map(img => `${API_BASE_URL}${img.img_url}`)
      : ["https://via.placeholder.com/600x400"];

  const handleLike = async () => {
    const token = localStorage.getItem("token");
    if (!token) { alert("يجب تسجيل الدخول أولاً"); return; }
    try {
      const res = await axios.post(
          `${API_BASE_URL}/used-items/${data.used_item_id}/like`,
          {},
          { headers: { Authorization: `Bearer ${token}` } }
      );
      if (res.data.liked) { setLiked(true); setLikesCount(prev => prev + 1); }
      else { setLiked(false); setLikesCount(prev => prev - 1); }
    } catch (error) { console.error("Like error:", error); }
  };

  const handleDelete = async () => {
    const token = localStorage.getItem("token");
    if (!token) { alert("يجب تسجيل الدخول أولاً"); return; }
    if (!window.confirm("هل تريد حذف هذا المنشور؟")) return;
    try {
      await axios.delete(`${API_BASE_URL}/used-items/${data.used_item_id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setIsVisible(false);
      alert("تم حذف المنشور بنجاح");
    } catch (error) {
      alert(error.response?.data?.error || "حدث خطأ أثناء حذف المنشور");
    }
  };

  const handleRequest = async () => {
    const token = localStorage.getItem("token");
    if (!token) { alert("يجب تسجيل الدخول أولاً"); return; }
    try {
      await axios.post(
          `${API_BASE_URL}/requests`,
          { used_item_id: data.used_item_id },
          { headers: { Authorization: `Bearer ${token}` } }
      );
      setRequested(true);
      alert("تم إرسال طلب التواصل بنجاح");
    } catch (error) {
      if (error.response?.data?.message) {
        alert(error.response.data.message);
        if (error.response.data.message.includes('مسبقاً')) setRequested(true);
      } else {
        alert("حدث خطأ أثناء إرسال طلب التواصل");
      }
    }
  };

  return (
      <>
        <div className="card mb-5 shadow border-0 mx-auto" style={{ borderRadius: '20px', overflow: 'hidden', maxWidth: '600px', backgroundColor: '#a4c6d8' }}>

          {/* Header */}
          <div className="card-header border-0 d-flex align-items-center justify-content-between p-3" style={{ backgroundColor: '#1a2a5e' }}>
            <div className="d-flex align-items-center">
              <img
                  src={data.user?.avatar || 'https://via.placeholder.com/50'}
                  className="rounded-circle border"
                  width="45" height="45" alt="user"
                  style={{ marginLeft: '12px', objectFit: 'cover' }}
              />
              <div className="text-end">
                <h6 className="m-0 fw-bold" style={{ color: '#ffffff' }}>{data.user?.name || 'مستخدم ReUseHub'}</h6>
                <small className="text-white-50">{data.created_at || 'منذ قليل'}</small>
              </div>
            </div>
            <div className="dropdown">
              <button className="btn p-0 text-white" type="button" id={`postMenu${data.used_item_id}`} data-bs-toggle="dropdown" style={{ border: 'none', background: 'transparent' }}>
                <i className="bi bi-three-dots-vertical fs-5"></i>
              </button>
              <ul className="dropdown-menu dropdown-menu-end" aria-labelledby={`postMenu${data.used_item_id}`}>
                <li><button className="dropdown-item text-danger" onClick={handleDelete}>حذف المنشور</button></li>
              </ul>
            </div>
          </div>

          {/* Image Section */}
          <div style={{ backgroundColor: '#d6e4ec', position: 'relative' }}>
            <div className="p-3 text-end">
              <h5 className="fw-bold" style={{ color: '#000000' }}>{displayTitle || 'منتج مستخدم'}</h5>
            </div>

            {/* ✅ صورة بحجم ثابت */}
            <div
                className="d-flex justify-content-center"
                style={{ cursor: images.length > 0 ? 'pointer' : 'default', position: 'relative' }}
                onClick={() => setShowGallery(true)}
            >
              <img
                  src={images[0]}
                  className="rounded mx-auto d-block"
                  style={{
                    width: "100%",
                    height: "250px",       // ✅ ارتفاع ثابت
                    objectFit: "cover",    // ✅ تملأ المساحة بدون تشويه
                  }}
                  alt="post"
              />
              {/* ✅ badge عدد الصور */}
              {images.length > 1 && (
                  <span style={{
                    position: 'absolute', bottom: 10, left: 10,
                    background: 'rgba(0,0,0,0.6)', color: '#fff',
                    borderRadius: 20, padding: '4px 12px',
                    fontSize: 13, fontWeight: 700
                  }}>
                📷 {images.length} صور
              </span>
              )}
            </div>

            {/* أزرار فوق الصورة */}
            <div className="position-absolute top-0 start-0 m-3 d-flex flex-column gap-2">
              <button
                  onClick={handleRequest}
                  className={`btn ${requested ? 'btn-success' : 'btn-primary'} shadow-sm px-3 py-2 fs-6 d-flex align-items-center gap-2`}
              >
                <i className={`bi ${requested ? 'bi-check-circle' : 'bi-telephone'}`}></i>
                {requested ? 'تم طلب التواصل' : 'طلب تواصل'}
              </button>
              {isSold
                  ? <span className="badge bg-danger shadow-sm px-3 py-1 fs-6"><i className="bi bi-slash-circle me-1"></i> تـم الـبيـع</span>
                  : <span className="badge bg-success shadow-sm px-3 py-1 fs-6"><i className="bi bi-check-circle me-1"></i> متاح للبيع</span>
              }
            </div>
          </div>

          {/* Body */}
          <div className="card-body text-end p-4" style={{ backgroundColor: '#d6e4ec' }}>
            <div className="d-flex justify-content-between align-items-center mb-3">
            <span className="fs-5 fw-bold" style={{ color: '#000000' }}>
              {data.price?.toLocaleString()} {data.currency || '₪'}
            </span>
            </div>

            <p className="card-text mb-1" style={{
              color: "#2e3a45", lineHeight: "1.8", fontWeight: "500",
              display: "-webkit-box", WebkitBoxOrient: "vertical",
              overflow: "hidden", textOverflow: "ellipsis",
              WebkitLineClamp: showFullDescription ? "unset" : 2,
            }}>
              {displayDescription}
            </p>
            <button className="btn btn-link p-0 text-primary" onClick={() => setShowFullDescription(!showFullDescription)}>
              {showFullDescription ? "إخفاء" : "رؤية المزيد"}
            </button>

            <hr className="my-3 opacity-25" />

            {/* أزرار التفاعل */}
            <div className="d-flex gap-2 w-100">
              <button onClick={handleLike} className="btn btn-light btn-sm flex-fill d-flex align-items-center justify-content-center gap-2 py-2">
                <i className={`bi ${liked ? 'bi-heart-fill' : 'bi-heart'} text-danger`}></i>
                <span>أعجبني {likesCount > 0 && `(${likesCount})`}</span>
              </button>
              <button onClick={() => setShowComment(!showComment)} className="btn btn-light btn-sm flex-fill d-flex align-items-center justify-content-center gap-2 py-2">
                <i className="bi bi-chat-dots text-primary"></i>
                <span>تعليق</span>
              </button>
              <button className="btn btn-light btn-sm flex-fill d-flex align-items-center justify-content-center gap-2 py-2">
                <i className="bi bi-share text-success"></i>
                <span>مشاركة</span>
              </button>
            </div>

            {showComment && (
                <div className="mt-3 d-flex gap-2">
                  <button className="btn btn-primary btn-sm px-3">إرسال</button>
                  <input className="form-control text-end" placeholder="اكتب تعليقاً..." value={comment} onChange={(e) => setComment(e.target.value)} />
                </div>
            )}
          </div>
        </div>

        {/* ✅ Gallery Modal */}
        {showGallery && (
            <div
                onClick={() => setShowGallery(false)}
                style={{
                  position: 'fixed', top: 0, left: 0,
                  width: '100vw', height: '100vh',
                  background: 'rgba(0,0,0,0.9)', zIndex: 9999,
                  display: 'flex', flexDirection: 'column',
                  alignItems: 'center', justifyContent: 'center'
                }}
            >
              {/* زر الإغلاق */}
              <button
                  onClick={() => setShowGallery(false)}
                  style={{ position: 'absolute', top: 20, left: 20, background: 'transparent', border: 'none', color: '#fff', fontSize: 32, cursor: 'pointer', zIndex: 10000 }}
              >✕</button>

              {/* الصورة الكبيرة مع أزرار التنقل */}
              <div onClick={(e) => e.stopPropagation()} style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
                <button
                    onClick={(e) => { e.stopPropagation(); setActiveIndex(prev => (prev - 1 + images.length) % images.length); }}
                    style={{ background: 'rgba(255,255,255,0.2)', border: 'none', color: '#fff', fontSize: 28, borderRadius: '50%', width: 50, height: 50, cursor: 'pointer' }}
                >‹</button>

                {/* ✅ حجم ثابت للصورة الكبيرة */}
                <img
                    src={images[activeIndex]}
                    alt={`صورة ${activeIndex + 1}`}
                    style={{
                      width: '70vw',
                      height: '65vh',        // ✅ ارتفاع ثابت
                      borderRadius: 16,
                      objectFit: 'contain',  // ✅ contain عشان تظهر كاملة
                      boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
                      background: '#111'
                    }}
                />

                <button
                    onClick={(e) => { e.stopPropagation(); setActiveIndex(prev => (prev + 1) % images.length); }}
                    style={{ background: 'rgba(255,255,255,0.2)', border: 'none', color: '#fff', fontSize: 28, borderRadius: '50%', width: 50, height: 50, cursor: 'pointer' }}
                >›</button>
              </div>

              {/* ✅ Thumbnails بحجم ثابت */}
              <div onClick={(e) => e.stopPropagation()} style={{ display: 'flex', gap: 10, marginTop: 20 }}>
                {images.map((img, i) => (
                    <img
                        key={i}
                        src={img}
                        alt={`thumb ${i}`}
                        onClick={() => setActiveIndex(i)}
                        style={{
                          width: 70,
                          height: 70,            // ✅ حجم ثابت
                          objectFit: 'cover',    // ✅ cover للـ thumbnails
                          borderRadius: 10,
                          cursor: 'pointer',
                          border: i === activeIndex ? '3px solid #C9A84C' : '3px solid transparent',
                          opacity: i === activeIndex ? 1 : 0.6,
                          transition: 'all 0.2s'
                        }}
                    />
                ))}
              </div>

              <p style={{ color: '#fff', marginTop: 12, fontSize: 14 }}>
                {activeIndex + 1} / {images.length}
              </p>
            </div>
        )}
      </>
  );
};

export default PostItem;