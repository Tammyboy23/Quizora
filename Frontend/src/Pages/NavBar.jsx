import { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import {  FaUser, FaQq } from "react-icons/fa";
import { LuCompass,  LuX, LuMenu , LuFilePenLine} from "react-icons/lu";
import { MdDashboard } from "react-icons/md";
import { AiOutlineBulb } from "react-icons/ai";
import { NavLink } from "react-router-dom";
function NavBar({ hidden }) {
  const [open, setOpen] = useState(false);
  const drawerRef = useRef(null);
  const location = useLocation();

  function logout() {
    localStorage.setItem("islogedin", "false");
    localStorage.setItem("username", "");
    window.location.reload();
  }

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    function handleClickOutside(e) {
      if (open && drawerRef.current && !drawerRef.current.contains(e.target)) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  if (hidden) return null;

  const navLinks = (
    <div className="list">
      <NavLink to="/" onClick={() => setOpen(false)} className={ location.pathname ==='/' ? "list-active" : "list-a"}><MdDashboard /> Dashboard</ NavLink>
      <NavLink to="/explore" onClick={() => setOpen(false)} className={ location.pathname ==='/explore' ? "list-active" : "list-a"}><LuCompass /> Explore</NavLink>
      <NavLink to="/create" onClick={() => setOpen(false)} className={ location.pathname ==='/create' ? "list-active" : "list-a"}><LuFilePenLine /> Create Quiz</NavLink>
      <NavLink to="/profile" onClick={() => setOpen(false)} className={ location.pathname ==='/profile' ? "list-active" : "list-a"}><FaUser /> Profile</NavLink>
    </div>
  );

  return (
    <>
      <button className="burger-btn" onClick={() => setOpen(true)} aria-label="Open menu">
        <LuMenu />
      </button>

      {open && <div className="drawer-overlay" onClick={() => setOpen(false)} />}

      <div className={`drawer ${open ? "drawer-open" : ""}`} ref={drawerRef}>
        <div className="drawer-header">
          <div className="logo">
            <h1><AiOutlineBulb /> QUIZORA</h1>
          </div>
          <button className="drawer-close" onClick={() => setOpen(false)} aria-label="Close menu">
            <LuX />
          </button>
        </div>
        {navLinks}
        <button onClick={logout} className="logout-btn">Logout</button>
      </div>

      <div className="nav">
        <div className="logo">
          <h1><FaQq /> QUIZORA</h1>
        </div>
        {navLinks}
        <button onClick={logout}>Logout</button>
      </div>
    </>
  );
}

export default NavBar;