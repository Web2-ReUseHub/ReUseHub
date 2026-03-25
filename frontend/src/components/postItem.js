import React from 'react';

const PostItem = ({ data }) => {
  if (!data) return null;

  return (
    <div className="card mb-4 shadow-sm border-0 mx-auto" style={{ borderRadius: '15px', overflow: 'hidden' }}>
      <div className="card-header bg-white border-0 d-flex align-items-center p-3">
        <img 
          src={data.user?.avatar || 'https://via.placeholder.com/50'} 
          className="rounded-circle" 
          width="45" height="45" alt="user" 
          style={{ marginLeft: '12px' }}
        />
        <div>
          <h6 className="m-0 fw-bold">{data.user?.name || 'مستخدم'}</h6>
          <small className="text-muted">{data.created_at || 'الآن'}</small>
        </div>
      </div>

      <div style={{ backgroundColor: '#f8f9fa' }}>
        <img 
          src={data.image_url || 'https://via.placeholder.com/600x400'} 
          className="img-fluid w-100" 
          style={{ maxHeight: '500px', objectFit: 'contain' }}
        />
      </div>

      <div className="card-body text-end">
        <div className="d-flex justify-content-between align-items-center mb-2">
          <h5 className="card-title fw-bold m-0" style={{ color: '#1a2b4c' }}>
            {data.title}
          </h5>
          <span className="badge bg-primary rounded-pill px-3">
            {data.price?.toLocaleString()} {data.currency || 'ج.م'}
          </span>
        </div>
        
        <p className="card-text text-secondary">
          {data.description}
        </p>

        <hr className="text-muted" />

        <div className="d-flex justify-content-around">
          <button className="btn btn-light btn-sm w-100 me-1">❤️ أعجبني</button>
          <button className="btn btn-light btn-sm w-100 me-1">💬 تعليق</button>
          <button className="btn btn-light btn-sm w-100">🔗 مشاركة</button>
        </div>
      </div>
    </div>
  );
};

export default PostItem;