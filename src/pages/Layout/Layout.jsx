import Navbar from "../../components/Navbar/Navbar.jsx";
import Sidebar from "../../components/Sidebar/Sidebar.jsx";
import {Outlet, useNavigate} from "react-router-dom";
import cookies from "../../utils/cookies.js";
import {useEffect} from "react";

export default function Layout() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = cookies.get("token");
    if (!token) {
      navigate("/auth/login");
    }
  }, []);

  return (
    <div>
      <Navbar/>
      <hr/>
      <div className="app-content">
        <Sidebar/>
        <Outlet/>
      </div>
    </div>
  )
}