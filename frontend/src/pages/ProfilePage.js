import "../profile.css";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const API_BASE_URL = "http://localhost:5004";

function ProfilePage() {
    const [requests, setRequests] = useState([]);
    const [receivedRequests, setReceivedRequests] = useState([]);
    const [loadingRequests, setLoadingRequests] = useState(true);
    const [loadingReceivedRequests, setLoadingReceivedRequests] = useState(true);
    const [requestsError, setRequestsError] = useState(null);
    const [receivedError, setReceivedError] = useState(null);

    const userName = "يحيى حطاب";

    const memberSince = 2023;
    const rating = 4;

    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    const navigate = useNavigate();

    const completedDeals = 18;
    const totalDeals = 20;

    const successRate = Math.round((completedDeals / totalDeals) * 100);

    const location = "طولكرم";

    // جلب الطلبات التي أرسلتها (كمشتري)
    useEffect(() => {
      const fetchRequests = async () => {
        const token = localStorage.getItem("token");
        if (!token) {
          setRequestsError("يجب تسجيل الدخول لعرض الطلبات.");
          setLoadingRequests(false);
          return;
        }

        try {
          const response = await axios.get(`${API_BASE_URL}/requests/my`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          setRequests(response.data || []);
        } catch (error) {
          console.error("My requests error:", error.response?.data || error.message);
          setRequestsError("حدث خطأ أثناء جلب طلبات التواصل.");
        } finally {
          setLoadingRequests(false);
        }
      };

      fetchRequests();
    }, []);

    // جلب الطلبات المستقبلة (كبائع)
    useEffect(() => {
      const fetchReceivedRequests = async () => {
        const token = localStorage.getItem("token");
        if (!token) {
          setReceivedError("يجب تسجيل الدخول لعرض الطلبات.");
          setLoadingReceivedRequests(false);
          return;
        }

        try {
          const response = await axios.get(`${API_BASE_URL}/requests/received`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          setReceivedRequests(response.data || []);
        } catch (error) {
          console.error("Received requests error:", error.response?.data || error.message);
          setReceivedError("حدث خطأ أثناء جلب الطلبات المستقبلة.");
        } finally {
          setLoadingReceivedRequests(false);
        }
      };

      fetchReceivedRequests();
    }, []);

    // قبول طلب
    const handleAcceptRequest = async (req_id) => {
      const token = localStorage.getItem("token");
      try {
        await axios.put(
          `${API_BASE_URL}/requests/${req_id}/accept`,
          {},
          { headers: { Authorization: `Bearer ${token}` } }
        );
        // تحديث قائمة الطلبات المستقبلة
        setReceivedRequests(prev => prev.filter(r => r.req_id !== req_id));
        alert("تم قبول الطلب وإرسال رقمك للمشتري!");
      } catch (error) {
        alert(error.response?.data?.message || "حدث خطأ");
      }
    };

    // رفض طلب
    const handleRejectRequest = async (req_id) => {
      const token = localStorage.getItem("token");
      try {
        await axios.put(
          `${API_BASE_URL}/requests/${req_id}/reject`,
          {},
          { headers: { Authorization: `Bearer ${token}` } }
        );
        // تحديث قائمة الطلبات المستقبلة
        setReceivedRequests(prev => prev.filter(r => r.req_id !== req_id));
        alert("تم رفض الطلب");
      } catch (error) {
        alert(error.response?.data?.message || "حدث خطأ");
      }
    };

    function GoToEditProfile() {
      navigate("/edit-profile");
    }
    function GoToCreatePost() {
      navigate("/create-post");
    }

    return (
        <>
            <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700;900&display=swap" rel="stylesheet"></link>
            <div dir="rtl" style={{ fontFamily: "'Cairo', sans-serif" }}>
              <Navbar showFull={true} />

                <div className="container-fluid">
                    <div className="row">




                        <div className="col-md-4  mt-3">
                            <div className="profile-box ms-4">
                                <div className="avatar-wrapper position-relative">
                                    <div className="avatar-placeholder d-flex justify-content-center align-items-center p-5" >
                                     <span>
                                       <i className="fa fa-user-circle" style={{ fontSize: "5rem", color: "#1a2a5e" }}></i>
                                   </span>


                                    </div>
                                    <button
                                        type="button"
                                        className="btn btn-light edit-profile-btn"
                                        onClick={GoToEditProfile}
                                    >
                                        <i className="bi bi-gear"></i>
                                    </button>
                                </div>


                                <div className="text-center mt-3 fw-bold fs-3">
                                    {userName}
                                </div>
                                <div className="rating-box">
                                    <span className="rating-number">{rating}</span>
                                    <div className="rating-stars">
                                        {[...Array(fullStars)].map((_, i) => (
                                            <i key={i} className="bi bi-star-fill"></i>
                                        ))}
                                        {hasHalfStar && <i className="bi bi-star-half"></i>}
                                        {[...Array(emptyStars)].map((_, i) => (
                                            <i key={i} className="bi bi-star"></i>
                                        ))}
                                    </div>
                                </div>



                                <div className="statistics-box mt-3">
                                    <div className="d-flex justify-content-center align-items-center flex-column">
                                        <div className="text-muted">عدد المقيميين</div>
                                        <div className=" number-of-ratings fw-bold fs-4">25</div>
                                    </div>
                                    <div className="row text-center mt-3">
                                        <div className="col">
                                            <div className="fw-bold fs-4">{completedDeals}</div>
                                            <div className="text-muted"> صفقة تمت بنجاح </div>
                                        </div>
                                        <div className="col">
                                            <div className="fw-bold fs-4">{successRate}%</div>
                                            <div className="text-muted">نسبة نجاح الصفقات </div>
                                        </div>
                                    </div>
                                    <div className="row mt-4" >
                                        <div className="col d-flex flex-column text-center">
                                            <div className="text-muted">الموقع </div>
                                            <div className="fw-bold fs-5">📍{location}</div>
                                        </div>
                                        <div className="col d-flex flex-column text-center">
                                            <div className="text-muted">عضو منذ</div>
                                            <div className="text-center fs-5 fw-bold "> {memberSince}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>






                        <div className=" col-md-8 mt-3">
                            <div className=" create-post-card bg-white rounded shadow-sm p-5 text-center" onClick={GoToCreatePost}>
                                <div className="create-icon mx-auto mb-3 d-flex justify-content-center align-items-center" onClick={GoToCreatePost}>

                                    <i className="bi bi-plus-lg"></i>
                                </div>
                                 <div>   
                                           إنشاء منشور
                                  </div>
                            </div>

                            <div className="requests-card bg-white rounded shadow-sm p-4 mt-4">
                              <div className="d-flex justify-content-between align-items-center mb-3">
                                <h5 className="fw-bold mb-0">📨 طلبات التواصل التي أرسلتها</h5>
                                <small className="text-muted">{requests.length} طلب</small>
                              </div>

                              {loadingRequests ? (
                                <div className="text-center text-secondary py-4">جارٍ تحميل الطلبات...</div>
                              ) : requestsError ? (
                                <div className="text-danger">{requestsError}</div>
                              ) : requests.length === 0 ? (
                                <div className="text-secondary">لم ترسل أي طلبات تواصل بعد.</div>
                              ) : (
                                <div className="list-group">
                                  {requests.map((request) => (
                                    <div key={request.req_id} className="list-group-item list-group-item-action rounded mb-2">
                                      <div className="d-flex justify-content-between align-items-center">
                                        <div>
                                          <div className="fw-bold">{request?.product?.description?.slice(0, 50) || 'منتج'}</div>
                                          <div className="text-muted small">{request?.product?.description?.slice(0, 80) || ''}</div>
                                          <div className="text-muted small mt-1">البائع: {request?.product?.seller?.f_name} {request?.product?.seller?.l_name}</div>
                                        </div>
                                        <div className="d-flex flex-column align-items-center">
                                          <span className={`badge ${request.status === 'pending' ? 'bg-warning' : request.status === 'accepted' ? 'bg-success' : 'bg-danger'}`}>
                                            {request.status === 'pending' ? 'قيد الانتظار' : request.status === 'accepted' ? 'موافق عليه' : 'مرفوض'}
                                          </span>
                                        </div>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              )}
                            </div>

                            {/* الطلبات المستقبلة من المشترين */}
                            <div className="received-requests-card bg-white rounded shadow-sm p-4 mt-4">
                              <div className="d-flex justify-content-between align-items-center mb-3">
                                <h5 className="fw-bold mb-0">🔔 طلبات من المشترين</h5>
                                <small className="text-muted">{receivedRequests.length} طلب جديد</small>
                              </div>

                              {loadingReceivedRequests ? (
                                <div className="text-center text-secondary py-4">جارٍ تحميل الطلبات...</div>
                              ) : receivedError ? (
                                <div className="text-danger">{receivedError}</div>
                              ) : receivedRequests.length === 0 ? (
                                <div className="text-secondary">لا توجد طلبات تواصل جديدة.</div>
                              ) : (
                                <div className="list-group">
                                  {receivedRequests.map((request) => (
                                    <div key={request.req_id} className="list-group-item rounded mb-3 p-3" style={{ border: '1px solid #ddd' }}>
                                      <div className="d-flex justify-content-between align-items-start mb-3">
                                        <div>
                                          <div className="fw-bold text-primary">{request?.buyer?.f_name} {request?.buyer?.l_name}</div>
                                          <div className="text-muted small">🏙️ {request?.buyer?.city}</div>
                                          <div className="text-muted small">📞 {request?.buyer?.phone}</div>
                                          <div className="text-muted small">📍 المنتج: {request?.product?.description?.slice(0, 50)}</div>
                                        </div>
                                      </div>
                                      <div className="d-flex gap-2 justify-content-end">
                                        <button
                                          className="btn btn-success btn-sm d-flex align-items-center gap-1"
                                          onClick={() => handleAcceptRequest(request.req_id)}
                                        >
                                          <i className="bi bi-check-circle"></i> قبول
                                        </button>
                                        <button
                                          className="btn btn-danger btn-sm d-flex align-items-center gap-1"
                                          onClick={() => handleRejectRequest(request.req_id)}
                                        >
                                          <i className="bi bi-x-circle"></i> رفض
                                        </button>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              )}
                            </div>
                        </div>





                    </div>
                </div>





            </div>

        </>


    );
}


export default ProfilePage;