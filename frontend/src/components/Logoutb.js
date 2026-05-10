import { useNavigate } from "react-router-dom";

function Logoutb() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div>
      <button onClick={handleLogout}>تسجيل الخروج</button>

      
    </div>
  );
}

export default Logoutb;