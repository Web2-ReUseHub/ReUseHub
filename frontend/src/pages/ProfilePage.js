import "../profile.css";
import Navbar from "../components/Navbar";
import PostItem from "../components/postItem";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const API = "http://localhost:5004";

function ProfilePage() {
    const { id } = useParams();
    const currentUser = JSON.parse(localStorage.getItem("user") || "{}");
    const profileId = id || currentUser.user_id;
    const isOwnProfile = !id || currentUser.user_id == id;
    const navigate = useNavigate();

    const [userData, setUserData] = useState(null);
    const [userStats, setUserStats] = useState({
        completedDeals: 0,
        successRate: 0,
        ratingCount: 0,
        rating: 0,
    });
    const [userItems, setUserItems] = useState([]);
    const [hoveredStar, setHoveredStar] = useState(0);
    const [submitted, setSubmitted] = useState(false);

    const safeRating = Number(userStats?.rating) || 0;
    const fullStars = Math.max(0, Math.min(5, Math.floor(safeRating)));
    const hasHalfStar = (safeRating % 1) >= 0.5 && fullStars < 5;
    const emptyStars = Math.max(0, 5 - fullStars - (hasHalfStar ? 1 : 0));

    useEffect(() => {
        async function getProfileData() {
            try {
                const token = localStorage.getItem("token");
                const response = await axios.get(`${API}/user/${profileId}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setUserData(response.data);
            } catch (error) {
                console.log("cannot get data " + error);
            }
        }
        if (profileId) getProfileData();
    }, [profileId]);

    useEffect(() => {
        async function fetchStats() {
            try {
                const token = localStorage.getItem("token");
                const resStats = await axios.get(`${API}/user/stats/${profileId}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setUserStats(resStats.data);
            } catch (err) {
                console.error("Error fetching stats:", err);
            }
        }
        if (profileId) fetchStats();
    }, [profileId]);

    useEffect(() => {
        async function fetchUserItems() {
            try {
                const token = localStorage.getItem("token");
                const response = await axios.get(`${API}/used-items/user/${profileId}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setUserItems(response.data);
            } catch (err) {
                console.error("Error fetching user items:", err);
            }
        }
        if (profileId) fetchUserItems();
    }, [profileId]);

    const handleRate = async (star) => {
        if (submitted) return;
        try {
            const token = localStorage.getItem("token");
            await axios.post(
                `${API}/user/rate/${profileId}`,
                { rating: star },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setSubmitted(true);
            const resStats = await axios.get(`${API}/user/stats/${profileId}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setUserStats(resStats.data);
        } catch (err) {
            console.error("Error rating:", err);
        }
    };

    const joinDate = userData?.createdAt ? new Date(userData.createdAt) : null;
    const memberSince = joinDate ? joinDate.getFullYear() : "2024";

    const avatarSrc = userData?.avatar_url
        ? userData.avatar_url.startsWith("data:")
            ? userData.avatar_url
            : `${API}${userData.avatar_url}`
        : null;

    return (
        <>
            <link
                href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700;900&display=swap"
                rel="stylesheet"
            />
            <div dir="rtl" style={{ fontFamily: "'Cairo', sans-serif" }}>
                <Navbar showFull={true} />

                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-4 mt-3">
                            <div className="profile-box ms-4">
                                <div className="avatar-wrapper position-relative">
                                    <div className="avatar-placeholder d-flex justify-content-center align-items-center p-5">
                                        {avatarSrc ? (
                                            <img
                                                src={avatarSrc}
                                                alt="avatar"
                                                style={{
                                                    width: 120,
                                                    height: 120,
                                                    borderRadius: "50%",
                                                    objectFit: "cover",
                                                    border: "3px solid #1a2a5e",
                                                }}
                                            />
                                        ) : (
                                            <i
                                                className="fa fa-user-circle"
                                                style={{ fontSize: "5rem", color: "#1a2a5e" }}
                                            />
                                        )}
                                    </div>

                                    {/* زر التعديل بس لصاحب الحساب */}
                                    {isOwnProfile && (
                                        <button
                                            type="button"
                                            className="btn btn-light edit-profile-btn"
                                            onClick={() => navigate("/edit-profile")}
                                        >
                                            <i className="bi bi-gear" />
                                        </button>
                                    )}
                                </div>

                                <div className="text-center mt-3 fw-bold fs-3">
                                    {userData ? `${userData.f_name}` : "جاري التحميل..."}
                                </div>

                                {/* التقييم الحالي */}
                                <div className="rating-box">
                                    <span className="rating-number">{userStats.rating}</span>
                                    <div className="rating-stars">
                                        {[...Array(fullStars)].map((_, i) => (
                                            <i key={i} className="bi bi-star-fill" />
                                        ))}
                                        {hasHalfStar && <i className="bi bi-star-half" />}
                                        {[...Array(emptyStars)].map((_, i) => (
                                            <i key={i} className="bi bi-star" />
                                        ))}
                                    </div>
                                </div>

                                {/* نجوم التقييم - بس للمستخدمين الثانيين */}
                                {!isOwnProfile && (
                                    <div className="text-center mt-3">
                                        <div className="text-muted mb-1">
                                            {submitted ? "✅ شكراً على تقييمك!" : "قيّم هذا البائع"}
                                        </div>
                                        <div>
                                            {[1, 2, 3, 4, 5].map((star) => (
                                                <i
                                                    key={star}
                                                    className={`bi ${hoveredStar >= star ? "bi-star-fill" : "bi-star"}`}
                                                    style={{
                                                        fontSize: "1.8rem",
                                                        color: hoveredStar >= star ? "#f5a623" : "#c0c0c0",
                                                        cursor: submitted ? "default" : "pointer",
                                                        transition: "color 0.2s",
                                                        marginLeft: "4px",
                                                    }}
                                                    onMouseEnter={() => !submitted && setHoveredStar(star)}
                                                    onMouseLeave={() => !submitted && setHoveredStar(0)}
                                                    onClick={() => handleRate(star)}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                )}

                                <div className="statistics-box mt-3">
                                    <div className="d-flex justify-content-center align-items-center flex-column">
                                        <div className="text-muted">عدد المقيّمين</div>
                                        <div className="number-of-ratings fw-bold fs-4">
                                            {userStats.ratingCount}
                                        </div>
                                    </div>
                                    <div className="row text-center mt-3">
                                        <div className="col">
                                            <div className="fw-bold fs-4">{userStats.completedDeals}</div>
                                            <div className="text-muted">صفقة تمت بنجاح</div>
                                        </div>
                                        <div className="col">
                                            <div className="fw-bold fs-4">{userStats.successRate}%</div>
                                            <div className="text-muted">نسبة نجاح الصفقات</div>
                                        </div>
                                    </div>
                                    <div className="row mt-4">
                                        <div className="col d-flex flex-column text-center">
                                            <div className="text-muted">الموقع</div>
                                            <div className="fw-bold fs-5">
                                                📍 {userData?.address || "..."}
                                            </div>
                                        </div>
                                        <div className="col d-flex flex-column text-center">
                                            <div className="text-muted">عضو منذ</div>
                                            <div className="text-center fs-5 fw-bold">{memberSince}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-8 mt-3">
                            {/* زر إنشاء منشور بس لصاحب الحساب */}
                            {isOwnProfile && (
                                <div
                                    className="create-post-card bg-white rounded shadow-sm p-5 text-center mb-3"
                                    onClick={() => navigate("/create-post")}
                                    style={{ cursor: "pointer" }}
                                >
                                    <div className="create-icon mx-auto mb-3 d-flex justify-content-center align-items-center">
                                        <i className="bi bi-plus-lg" />
                                    </div>
                                    <div>إنشاء منشور</div>
                                </div>
                            )}

                            <div className="row text-start">
                                {userItems && userItems.length > 0 ? (
                                    userItems.map((item) => (
                                        <div key={item.used_item_id} className="col-md-6 mb-3">
                                            <PostItem data={item} />
                                        </div>
                                    ))
                                ) : (
                                    <div className="text-center text-muted p-4 bg-white rounded shadow-sm w-100">
                                        لا توجد منشورات لعرضها.
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