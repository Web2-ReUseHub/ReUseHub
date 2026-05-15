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

  if (!data || !isVisible) return null;

  const { title: displayTitle, body: displayDescription } = parseTitleAndBody(data.description, data.title);
  const isSold = data.is_sold;

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
    } catch (error) {
      console.error("Like error:", error);
    }
  };

  const handleDelete = async () => {
    const token = localStorage.getItem("token");
    if (!token) { alert("يجب تسجيل الدخول أولاً"); return; }
    const confirmDelete = window.confirm("هل تريد حذف هذا المنشور؟");
    if (!confirmDelete) return;

    try {
      const response = await axios.delete(`${API_BASE_URL}/used-items/${data.used_item_id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setIsVisible(false);
      alert("تم حذف المنشور بنجاح");
    } catch (error) {
      console.error("Delete error:", error.response?.data || error.message);
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
      console.error("Request error:", error.response?.data || error.message);
      if (error.response?.data?.message) {
        alert(error.response.data.message);
        if (error.response.data.message.includes('مسبقاً')) {
          setRequested(true);
        }
      } else {
        alert("حدث خطأ أثناء إرسال طلب التواصل");
      }
    }
  };

  return (
    <div className="card mb-5 shadow border-0 mx-auto" style={{ borderRadius: '20px', overflow: 'hidden', maxWidth: '600px', backgroundColor: '#a4c6d8' }}>
      <div className="card-header border-0 d-flex align-items-center justify-content-between p-3" style={{ backgroundColor: '#1a2a5e' }}>
        <div className="d-flex align-items-center">
          <img src={data.user?.avatar || 'https://via.placeholder.com/50'} className="rounded-circle border" width="45" height="45" alt="user" style={{ marginLeft: '12px', objectFit: 'cover' }} />
          <div className="text-end">
            <h6 className="m-0 fw-bold" style={{ color: '#ffffff' }}>{data.user?.name || 'مستخدم ReUseHub'}</h6>
            <small className="text-white-50">{data.created_at || 'منذ قليل'}</small>
          </div>
        </div>

        <div className="dropdown">
          <button className="btn btn-transparent p-0 text-white" type="button" id={`postMenu${data.used_item_id}`} data-bs-toggle="dropdown" aria-expanded="false" style={{ border: 'none', background: 'transparent' }}>
            <i className="bi bi-three-dots-vertical fs-5"></i>
          </button>
          <ul className="dropdown-menu dropdown-menu-end" aria-labelledby={`postMenu${data.used_item_id}`}>
            <li>
              <button className="dropdown-item text-danger" type="button" onClick={handleDelete}>
                حذف المنشور
              </button>
            </li>
          </ul>
        </div>
      </div>
      <div style={{ backgroundColor: '#d6e4ec', position: 'relative' }}>
        <div className="p-3 text-end">
           <h5 className="fw-bold" style={{ color: '#000000' }}>{displayTitle || 'منتج مستخدم'}</h5>
             </div>
       <div className="d-flex justify-content-center">
  <img
    src={
      data.images?.[0]?.img_url
        ? `http://localhost:5004${data.images[0].img_url}`
        : "https://via.placeholder.com/600x400"
    }
    className="rounded mx-auto d-block"
  style={{ width: "80%", height: "220px", objectFit: "cover" }}
    alt="post"
  />
</div>

        <div className="position-absolute top-0 start-0 m-3 d-flex flex-column gap-2">
          <button
            onClick={handleRequest}
            className={`btn ${requested ? 'btn-success' : 'btn-primary'} shadow-sm px-3 py-2 fs-6 d-flex align-items-center gap-2`}
          >
            <i className={`bi ${requested ? 'bi-check-circle' : 'bi-telephone'}`}></i>
            {requested ? 'تم طلب التواصل' : 'طلب تواصل'}
          </button>
          {isSold ? (
            <span className="badge bg-danger shadow-sm px-3 py-1 fs-6"><i className="bi bi-slash-circle me-1"></i> تـم الـبيـع</span>
          ) : (
            <span className="badge bg-success shadow-sm px-3 py-1 fs-6"><i className="bi bi-check-circle me-1"></i> متاح للبيع</span>
          )}
        </div>
      </div>
      <div className="card-body text-end p-4" style={{ backgroundColor: '#d6e4ec'}}>
        <div className="d-flex justify-content-between align-items-center mb-3">
          <span className="fs-5 fw-bold" style={{ color: '#000000' }}>{data.price?.toLocaleString()} {data.currency || '₪'}</span>
        </div>
       <p
  className="card-text mb-3"
  style={{
    color: "#2e3a45",
    lineHeight: "1.8",
    fontWeight: "500",
    display: "-webkit-box",
    WebkitBoxOrient: "vertical",
    overflow: "hidden",
    textOverflow: "ellipsis",
    WebkitLineClamp: showFullDescription ? "unset" : 1, // سطر واحد أو كامل النص
  }}
>
  {displayDescription}
</p>

<button
  className="btn btn-link p-0 text-primary"
  onClick={() => setShowFullDescription(!showFullDescription)}
>
  {showFullDescription ? "إخفاء" : "رؤية المزيد"}
</button>


        <hr className="my-3 opacity-25" />
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
  );
};

export default PostItem;