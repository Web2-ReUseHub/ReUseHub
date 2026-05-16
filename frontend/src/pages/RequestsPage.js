import "../profile.css";
import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";
import axios from "axios";

const API_BASE_URL = "http://localhost:5004";

function RequestsPage() {
  const [requests, setRequests] = useState([]);
  const [receivedRequests, setReceivedRequests] = useState([]);
  const [loadingRequests, setLoadingRequests] = useState(true);
  const [loadingReceivedRequests, setLoadingReceivedRequests] = useState(true);
  const [requestsError, setRequestsError] = useState(null);
  const [receivedError, setReceivedError] = useState(null);

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

  const handleAcceptRequest = async (req_id) => {
    const token = localStorage.getItem("token");
    try {
      await axios.put(
        `${API_BASE_URL}/requests/${req_id}/accept`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setReceivedRequests((prev) => prev.filter((r) => r.req_id !== req_id));
      alert("تم قبول الطلب وإرسال رقمك للمشتري!");
    } catch (error) {
      alert(error.response?.data?.message || "حدث خطأ");
    }
  };

  const handleRejectRequest = async (req_id) => {
    const token = localStorage.getItem("token");
    try {
      await axios.put(
        `${API_BASE_URL}/requests/${req_id}/reject`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setReceivedRequests((prev) => prev.filter((r) => r.req_id !== req_id));
      alert("تم رفض الطلب");
    } catch (error) {
      alert(error.response?.data?.message || "حدث خطأ");
    }
  };

  const renderRequestItem = (request, showActions = false) => {
    const productTitle = request?.product?.description || "منتج";
    const sellerName = `${request?.product?.seller?.f_name || ""} ${request?.product?.seller?.l_name || ""}`.trim();
    const buyerName = `${request?.buyer?.f_name || ""} ${request?.buyer?.l_name || ""}`.trim();

    return (
      <div key={request.req_id} className="list-group-item list-group-item-action rounded mb-2">
        <div className="d-flex justify-content-between align-items-start flex-column flex-md-row">
          <div>
            <div className="fw-bold">{productTitle.slice(0, 60)}</div>
            <div className="text-muted small mt-1">{request?.product?.description?.slice(0, 90) || ""}</div>
            <div className="text-muted small mt-1">
              {showActions ? `المشتري: ${buyerName}` : `البائع: ${sellerName}`}
            </div>
          </div>
          <div className="text-end mt-3 mt-md-0">
            <span
              className={`badge ${request.status === "pending" ? "bg-warning" : request.status === "accepted" ? "bg-success" : "bg-danger"}`}
            >
              {request.status === "pending"
                ? "قيد الانتظار"
                : request.status === "accepted"
                ? "مقبول"
                : "مرفوض"}
            </span>
            {showActions && request.status === "pending" && (
              <div className="mt-2">
                <button className="btn btn-sm btn-success me-2" onClick={() => handleAcceptRequest(request.req_id)}>
                  قبول
                </button>
                <button className="btn btn-sm btn-danger" onClick={() => handleRejectRequest(request.req_id)}>
                  رفض
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700;900&display=swap" rel="stylesheet"></link>
      <div dir="rtl" style={{ fontFamily: "'Cairo', sans-serif" }}>
        <Navbar showFull={true} />
        <div className="container-fluid mt-4">
          <div className="row">
            <div className="col-12 col-lg-6 mb-4">
              <div className="bg-white rounded shadow-sm p-4">
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
                    {requests.map((request) => renderRequestItem(request))}
                  </div>
                )}
              </div>
            </div>

            <div className="col-12 col-lg-6 mb-4">
              <div className="bg-white rounded shadow-sm p-4">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h5 className="fw-bold mb-0">📥 الطلبات المستقبلة</h5>
                  <small className="text-muted">{receivedRequests.length} طلب</small>
                </div>
                {loadingReceivedRequests ? (
                  <div className="text-center text-secondary py-4">جارٍ تحميل الطلبات...</div>
                ) : receivedError ? (
                  <div className="text-danger">{receivedError}</div>
                ) : receivedRequests.length === 0 ? (
                  <div className="text-secondary">لا توجد طلبات واردة حالياً.</div>
                ) : (
                  <div className="list-group">
                    {receivedRequests.map((request) => renderRequestItem(request, true))}
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

export default RequestsPage;