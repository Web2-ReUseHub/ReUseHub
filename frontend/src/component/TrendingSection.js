import React, { useState, useEffect } from 'react';
import PostItem from './PostItem';

const TrendingSection = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, []);

  return (
    <div className="container py-5" dir="rtl">
      <div className="d-flex align-items-center mb-4 justify-content-start">
        <h2 className="fw-bold m-0" style={{ color: '#1a2b4c' }}>المنشورات الرائجة هذا الأسبوع</h2>
        <span className="ms-2 fs-3">🔥</span>
      </div>

      <div className="row justify-content-center">
        <div className="col-md-10 col-lg-8">
          {items.length > 0 ? (
            items.map((item) => <PostItem key={item.id} data={item} />)
          ) : (
            <div className="text-center py-5">
              {loading ? (
                <div className="spinner-border text-primary" role="status"></div>
              ) : (
                <p className="text-muted fs-5">لا توجد منشورات رائجة لعرضها حالياً</p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TrendingSection;