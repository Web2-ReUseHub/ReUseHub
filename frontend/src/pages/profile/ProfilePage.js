
import "./ProfilePage.css";
import 'bootstrap-icons/font/bootstrap-icons.css';


function ProfilePage() {

    const userName = "يحيى حطاب";
    const memberSince = 2023;
    const rating = 4;

    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);


    const completedDeals = 18;
    const totalDeals = 20;

    const successRate = Math.round((completedDeals / totalDeals) * 100);

    const location = "طولكرم";

    function handleCreatePost() {

        alert("Go to create post page");
    }

    return (
        <>
            <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700;900&display=swap" rel="stylesheet"></link>
            <div dir="rtl" style={{ fontFamily: "'Cairo', sans-serif" }}>


                <div className="container-fluid">
                    <div className="row">




                        <div className="col-md-4  mt-3">
                            <div className="profile-box ms-4">
                                <div className="default-avatar">
                                    <span >👤</span>
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
                            <div className=" create-post-card bg-white rounded shadow-sm p-5 text-center" onClick={handleCreatePost}>
                                <div className="create-icon mx-auto mb-3 d-flex justify-content-center align-items-center" onClick={handleCreatePost}>

                                    <i className="bi bi-plus-lg"></i>
                                </div>
                                <div className="fw-bold fs-5" style={{ cursor: "pointer" }}>إنشاء منشور</div>
                            </div>
                        </div>





                    </div>
                </div>
































            </div>






        </>







    );
}


export default ProfilePage;