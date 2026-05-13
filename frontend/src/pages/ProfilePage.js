import "../profile.css";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import axios from 'axios';


function ProfilePage() {
    const userString = localStorage.getItem('user');
    const userObj = userString ? JSON.parse(userString) : null;
    const userId = userObj ? userObj.user_id : null;
    const [userData, setUserData] = useState(null);
    const [userStats, setUserStats] = useState({
        completedDeals: 0,
        successRate: 0
    });
    const userName = "يحيى حطاب";
    const memberSince = 2023;
    const rating = 4;
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    const navigate = useNavigate();



    const location = "طولكرم";


    function GoToEditProfile() {

        navigate("/edit-profile");
    }
    function GoToCreatePost() {

        navigate("/create-post");
    }
    ///////////////////////////////////////////////////////////////////////////////////////////////


    useEffect(function () {

        async function getProfileData() {
            try {

                const token = localStorage.getItem('token');


                const response = await axios.get(`http://localhost:5004/user/${userId}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });


                setUserData(response.data);

            } catch (error) {

                console.log("cannot get data " + error);
            }
        }

        getProfileData();

    }, [userId]);



    useEffect(function () {


        async function fetchProfileAndStats() {


            try {
                const token = localStorage.getItem("token");


                const resUser = await axios.get(`http://localhost:5004/user/${userId}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setUserData(resUser.data);

                const resStats = await axios.get(`http://localhost:5004/user/stats/${userId}`);
                setUserStats(resStats.data);

            } catch (err) {
                console.error("Error fetching data:", err);
            }
        }

        if (userId) {
            fetchProfileAndStats();
        }

    }, [userId]);

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
                                    {userData !== null ? userData.f_name + " " + userData.l_name : "جاري التحميل..."}
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
                                            <div className="fw-bold fs-4">{userStats.completedDeals}</div>
                                            <div className="text-muted"> صفقة تمت بنجاح </div>
                                        </div>
                                        <div className="col">
                                            <div className="fw-bold fs-4">{userStats.successRate}%</div>
                                            <div className="text-muted">نسبة نجاح الصفقات </div>
                                        </div>
                                    </div>
                                    <div className="row mt-4" >
                                        <div className="col d-flex flex-column text-center">
                                            <div className="text-muted">الموقع </div>
                                            <div className="fw-bold fs-5">📍{userData !== null ? userData.address : "..."}</div>
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
                        </div>





                    </div>
                </div>





            </div>

        </>


    );
}


export default ProfilePage;