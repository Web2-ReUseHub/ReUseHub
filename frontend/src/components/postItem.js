import React, { useState } from 'react';
import axios from 'axios';

const API_BASE_URL = "http://localhost:5004";

const PostItem = ({ data }) => {
  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(data?.likes_count || 0);
  const [showComment, setShowComment] = useState(false);
  const [comment, setComment] = useState("");

  if (!data) return null;

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

  return (
    <div className="card mb-5 shadow-sm border-0 mx-auto" style={{ borderRadius: '20px', overflow: 'hidden', maxWidth: '600px' }}>
      <div className="card-header bg-white border-0 d-flex align-items-center p-3">
        <img src={data.user?.avatar || 'https://via.placeholder.com/50'} className="rounded-circle border" width="45" height="45" alt="user" style={{ marginLeft: '12px', objectFit: 'cover' }} />
        <div className="flex-grow-1 text-end">
          <h6 className="m-0 fw-bold" style={{ color: '#1a2b4c' }}>{data.user?.name || 'مستخدم ReUseHub'}</h6>
          <small className="text-muted">{data.created_at || 'منذ قليل'}</small>
        </div>
        <i className="bi bi-three-dots-vertical text-muted"></i>
      </div>
      <div style={{ backgroundColor: '#f8f9fa', position: 'relative' }}>
        <img src={data.images?.[0]?.img_url ? `http://localhost:5004${data.images[0].img_url}` : 'https://via.placeholder.com/600x400'} className="img-fluid w-100" style={{ maxHeight: '450px', objectFit: 'cover' }} alt="post" />
        <div className="position-absolute top-0 start-0 m-3">
          {isSold ? (
            <span className="badge bg-danger shadow-sm px-3 py-2 fs-6"><i className="bi bi-slash-circle me-1"></i> تـم الـبيـع</span>
          ) : (
            <span className="badge bg-success shadow-sm px-3 py-2 fs-6"><i className="bi bi-check-circle me-1"></i> متاح للبيع</span>
          )}
        </div>
      </div>
      <div className="card-body text-end p-4">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <span className="fs-5 fw-bold" style={{ color: '#28a745' }}>{data.price?.toLocaleString()} {data.currency || 'JD'}</span>
          <h5 className="card-title fw-bold m-0" style={{ color: '#1a2b4c' }}>{data.title}</h5>
        </div>
        <p className="card-text text-secondary mb-3" style={{ lineHeight: '1.6' }}>{data.description}</p>
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