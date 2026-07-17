import { useLocation } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import { LuCompass, LuCirclePlus, LuSparkles } from "react-icons/lu";
import { MdDashboard } from "react-icons/md";
import { NavLink } from "react-router-dom";
import { useAuth } from "../config/auth-context";

function NavBar({ hidden }) {
  const location = useLocation();
  const { user } = useAuth();

  if (hidden || location.pathname === "/signup") return null;

  const navLinks = (
    <div className="list">
      <NavLink to="/" className={location.pathname === "/" ? "list-active" : "list-a"}>
        <MdDashboard /> Dashboard
      </NavLink>
      <NavLink to="/explore" className={location.pathname === "/explore" ? "list-active" : "list-a"}>
        <LuCompass /> Explore
      </NavLink>
      <NavLink to="/create" className={location.pathname === "/create" ? "list-active" : "list-a"}>
        <LuCirclePlus /> Create
      </NavLink>
      <NavLink to="/chat" className={location.pathname === "/chat" ? "list-active" : "list-a"}>
      <LuSparkles /> AI Chat
      </NavLink>
      <NavLink to="/profile" className={location.pathname === "/profile" ? "list-active" : "list-a"}>
        <FaUser /> Profile
      </NavLink>
    </div>
  );

  const bottomNavLinks = [
    { to: "/", icon: <MdDashboard size={20} />, label: "Dashboard" },
    { to: "/explore", icon: <LuCompass size={20} />, label: "Explore" },
    { to: "/create", icon: <LuCirclePlus size={20} />, label: "Create" },
    {to: "/chat", icon: <LuSparkles size={20}/>, label: "AI Chat"},
    { to: "/profile", icon: <FaUser size={20} />, label: "Profile" },
  ];

  return (
    <>
      {/* Desktop sidebar */}
      <div className="nav">
        <div className="logo">
          <img src="../assets/logo.png" alt="" /><h1>QUIZORA</h1>
        </div>
        {navLinks}
      </div>

      {/* Mobile bottom navigation */}
      <nav className="bottom-nav">
        {bottomNavLinks.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            end={link.to === "/"}
            className={({ isActive }) =>
              `bottom-nav-link ${isActive ? "bottom-nav-link--active" : ""}`
            }
          >
            {link.icon}
            <span className="bottom-nav-label">{link.label}</span>
          </NavLink>
        ))}
      </nav>
    </>
  );
}

export default NavBar;