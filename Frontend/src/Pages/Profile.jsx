import { useState, useEffect } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../config/firebase-config";
import toast from "react-hot-toast";
import { FaPerson, FaPen } from "react-icons/fa6";
import { LuChartBarIncreasing, LuLogOut, LuMail, LuQuote } from "react-icons/lu";
import { useAuth } from "../config/auth-context.jsx";
import { useNavigate, useLocation } from "react-router-dom";

function Profile() {
  const [pop, setpop] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const username = user?.displayName || localStorage.getItem("username") || "Anonymous";
  const displayName = localStorage.getItem("displayName") || "";
  const bio = localStorage.getItem("bio") || "";
  const email = user?.email || localStorage.getItem("userEmail") || "";
  const avatar = user?.photoURL || localStorage.getItem("avatar") || null;

  const stats = JSON.parse(localStorage.getItem("quizStats") || '{"taken":0,"accuracy":0,"streak":0}');

  // Show success toast if coming back from editing
  useEffect(() => {
    if (location.state?.edited) {
      toast.success("Profile updated successfully");
      window.history.replaceState({}, document.title);
    }
  }, []);

  function logout() {
    signOut(auth);
    setpop(false);
    toast.success("Logged Out");
    navigate("/");
    window.location.reload();
  }

  return (
    <>
      <div className="profile-page">
        <div className="profile-page-header">
          <h2 className="profile-title">My Profile</h2>
          <p className="profile-subtitle">Your identity, stats, and account</p>
        </div>

        {/* ── Identity — view only ── */}
        <div className="profile-section-card">
          <div className="profile-section-head">
            <span className="section-icon-chip"><FaPerson /></span>
            <span className="section-label">Profile</span>
          </div>
          <div className="profile-section-body">
            {/* Avatar */}
            <div className="profile-view-avatar-row">
              <div className="profile-view-avatar">
                {avatar
                  ? <img src={avatar} alt="Profile" className="avatar-img" />
                  : <div className="avatar-placeholder">{username.charAt(0).toUpperCase()}</div>
                }
              </div>
              <div className="profile-view-avatar-info">
                <h3 className="profile-view-name">{displayName || username}</h3>
                <span className="profile-view-username">@{username}</span>
              </div>
            </div>

            {/* Bio */}
            {bio && (
              <div className="profile-view-row">
                <LuQuote size={16} className="profile-view-icon" />
                <span className="profile-view-text">{bio}</span>
              </div>
            )}

            {/* Email */}
            {email && (
              <div className="profile-view-row">
                <LuMail size={16} className="profile-view-icon" />
                <span className="profile-view-text">{email}</span>
              </div>
            )}

            {/* Edit button */}
            <button className="profile-edit-btn" onClick={() => navigate("/profile/edit")}>
              <FaPen size={13} /> Edit Profile
            </button>
          </div>
        </div>

        {/* ── Stats ── */}
        <div className="profile-section-card">
          <div className="profile-section-head">
            <span className="section-icon-chip"><LuChartBarIncreasing /></span>
            <span className="section-label">Your stats</span>
          </div>
          <div className="profile-section-body">
            <div className="stats-row">
              <div className="stat-pill">
                <span className="stat-val">{stats.taken}</span>
                <span className="stat-lbl">Quizzes taken</span>
              </div>
              <div className="stat-pill">
                <span className="stat-val">{stats.accuracy}%</span>
                <span className="stat-lbl">Avg. accuracy</span>
              </div>
              <div className="stat-pill">
                <span className="stat-val">{stats.streak}</span>
                <span className="stat-lbl">Day streak</span>
              </div>
            </div>
          </div>
        </div>

        {/* ── Danger zone ── */}
        <div className="profile-section-card profile-section-card--danger">
          <div className="profile-section-head">
            <span className="section-icon-chip section-icon-chip--danger">⚠️</span>
            <span className="section-label section-label--danger">Danger zone</span>
          </div>
          <div className="danger-zone">
            <p className="danger-desc">Log out of this device</p>
            <button className="danger-btn" onClick={() => setpop(true)}><LuLogOut /> Log Out</button>
          </div>
        </div>
      </div>

      {/* Logout confirmation modal */}
      <div className="pop" style={{ display: pop ? "flex" : "none" }}>
        <div className="pop-con">
          <div className="bar"></div>
          <div className="span"><LuLogOut color="red" size={30} /></div>
          <h1>Log Out</h1>
          <p>Are you sure you want to log out?</p>
          <div className="pop-btns">
            <button onClick={() => setpop(false)}>Cancel</button>
            <button onClick={logout}>Confirm</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;