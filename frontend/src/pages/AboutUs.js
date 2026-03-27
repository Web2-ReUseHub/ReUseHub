import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../index.css"; 
import Navbar from "../components/Navbar";
function AboutUs() {
 
  const team = [
    { name: "Mayar Othman", desc: "Cap Student at NNU || AI", link: "https://www.linkedin.com/in/username1" },
    { name: "Yahya Hattab", desc: "Cap Student at NNU", link: "https://www.linkedin.com/in/username2" },
    { name: "Mahmoud Adham", desc: "Cap Student at NNU", link: "https://www.linkedin.com/in/username3" },
    { name: "Amr Khayyat", desc: "Cap Student at NNU || SW", link: "https://www.linkedin.com/in/username4" },
    { name: "Gharam Zaki", desc: "Cap Student at NNU", link: "https://www.linkedin.com/in/username5" },
    { name: "Mahmoud Dwikat", desc: "Cap Student at NNU", link: "https://www.linkedin.com/in/username6" },
  ];

  return (
    <div dir="rtl" >
    <Navbar showFull={true} />
    <div className="container py-5">
        
      <h1 className="text-center mb-5" style={{ color: "#1a2a5e" }}>
        من نحن!
      </h1>
       
     
      <div className="row g-4 pt-5">
        {team.map((member, index) => (
          <div className="col-md-4 col-sm-6" key={index}>
            <div className="card text-center h-100" style={{ backgroundColor: "#1a2a5e" }}>             
                 <a href={member.link} target="_blank" rel="noopener noreferrer">
                  <i className="bi bi-person-circle" style={{ fontSize: "80px", color: "#dce8fa" }}></i>
                 </a>
                 <div className="card-body">
                     <h5 className="card-title" style={{ color: "#dce8fa" }}>
                      {member.name}
                      </h5>
                     <p className="card-text" style={{ color: "#dce8fa" }}>
                      {member.desc}
                      </p>
                   </div>
             </div>
           </div>
        ))}
      </div>
    </div>
    
    </div>
  );
}

export default AboutUs;