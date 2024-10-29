import './Navbar.css'
import { assets } from '../../assets/assets'
import cookies from "../../utils/cookies.js";
import AuthService from "../../services/auth.service.js";
import {useNavigate} from "react-router-dom";

const Navbar = () => {
  const email = cookies.get("email");
  const navigate = useNavigate();

  const handleLogout = () => {
    AuthService.logout();
    navigate("/auth/login");
  }

  return (
    <div className='navbar'>
      <img className='logo' src={assets.logo} alt="" />
      <div className='account'>
        <span>{email}</span>
        <button onClick={handleLogout}>Logout</button>
      </div>
    </div>
  )
}

export default Navbar
