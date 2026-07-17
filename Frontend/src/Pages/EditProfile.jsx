import { useState, useRef } from "react";
import { updateProfile } from "firebase/auth";
import { auth } from "../config/firebase-config";
import toast from "react-hot-toast";
import { FaArrowLeft, FaPen, FaPerson } from "react-icons/fa6";
import { LuSave, LuX, LuTriangleAlert, LuSun, LuMoon } from "react-icons/lu";
import { useAuth } from "../config/auth-context.jsx";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../config/ThemeContext";

function EditProfile() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const fileRef = useRef(null);

  const [username, setUsername] = useState(
    user?.displayName || localStorage.getItem("username") || "Anonymous"
  );
  const [displayName, setDisplayName] = useState(
    localStorage.getItem("displayName") || user?.displayName || ""
  );
  const [bio, setBio] = useState(localStorage.getItem("bio") || "");
  const [email, setEmail] = useState(
    localStorage.getItem("userEmail") || user?.email || ""
  );
  const [avatar, setAvatar] = useState(
    user?.photoURL || localStorage.getItem("avatar") || null
  );
  const [timezone, setTimezone] = useState(
    localStorage.getItem("pref_timezone") || ""
  );
  const [difficulty, setDifficulty] = useState(
    localStorage.getItem("pref_difficulty") || "any"
  );
  const { darkMode, toggleTheme } = useTheme();

  const [saving, setSaving] = useState(false);

  function handleAvatarChange(e) {
    const file = e.target.files[0];
    if (!file) return;
    if (file.size > 2 * 1024 * 1024) {
      toast.error("Image must be under 2 MB.");
      return;
    }
    const reader = new FileReader();
    reader.onload = (ev) => {
      setAvatar(ev.target.result);
    };
    reader.readAsDataURL(file);
  }

  function removeAvatar() {
    setAvatar(null);
  }

  async function saveAll() {
    const trimmedUser = username.trim();
    if (!trimmedUser) {
      toast.error("Username cannot be empty.");
      return;
    }

    setSaving(true);

    localStorage.setItem("username", trimmedUser);
    if (displayName.trim()) {
      localStorage.setItem("displayName", displayName.trim());
    } else {
      localStorage.removeItem("displayName");
    }
    if (bio.trim()) {
      localStorage.setItem("bio", bio.trim());
    } else {
      localStorage.removeItem("bio");
    }
    if (email.trim()) {
      localStorage.setItem("userEmail", email.trim());
    } else {
      localStorage.removeItem("userEmail");
    }
    if (avatar) {
      localStorage.setItem("avatar", avatar);
    } else {
      localStorage.removeItem("avatar");
    }

    // Save preferences
    localStorage.setItem("pref_timezone", timezone);
    localStorage.setItem("pref_difficulty", difficulty);

    // Sync with Firebase
    if (user) {
      updateProfile(user, {
        displayName: displayName.trim() || trimmedUser,
        photoURL: avatar,
      }).catch(() => {});
    }

    await new Promise((r) => setTimeout(r, 300));
    setSaving(false);
    navigate("/profile", { state: { edited: true } });
  }

  function resetProfile() {
    if (!window.confirm("Reset all profile data? This cannot be undone.")) return;
    [
      "username",
      "displayName",
      "bio",
      "userEmail",
      "avatar",
      "pref_timezone",
      "pref_difficulty",
    ].forEach((k) => localStorage.removeItem(k));
    setUsername("Anonymous");
    setDisplayName("");
    setBio("");
    setEmail("");
    setAvatar(null);
    setTimezone("");
    setDifficulty("any");
    toast.success("Profile reset");
    navigate("/profile");
  }

  return (
    <div className="edit-profile-page">
      {/* Header */}
      <div className="edit-profile-header">
        <div className="edit-profile-header-inner">
          <button className="edit-profile-back" onClick={() => navigate("/profile")}>
            <FaArrowLeft size={14} /> Back to Profile
          </button>
          <h1 className="edit-profile-title">Edit Profile</h1>
          <p className="edit-profile-subtitle">
            Update your personal information and preferences
          </p>
        </div>
      </div>

      {/* Body */}
      <div className="edit-profile-body">
        {/* Avatar section */}
        <div className="edit-card">
          <div className="edit-card-head">
            <span className="section-icon-chip"><FaPerson /></span>
            <span className="section-label">Avatar</span>
          </div>
          <div className="edit-card-body">
            <div className="edit-avatar-row">
              <div
                className="edit-avatar-wrap"
                onClick={() => fileRef.current.click()}
              >
                {avatar ? (
                  <img src={avatar} alt="Profile" className="avatar-img" />
                ) : (
                  <div className="avatar-placeholder">
                    {username.charAt(0).toUpperCase()}
                  </div>
                )}
                <div className="avatar-overlay">
                  <FaPen size={14} />
                </div>
              </div>
              <input
                type="file"
                accept="image/*"
                ref={fileRef}
                style={{ display: "none" }}
                onChange={handleAvatarChange}
              />
              <div className="edit-avatar-actions">
                <button
                  className="edit-btn-secondary"
                  onClick={() => fileRef.current.click()}
                >
                  Upload photo
                </button>
                {avatar && (
                  <button className="edit-btn-ghost" onClick={removeAvatar}>
                    <LuX size={14} /> Remove
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Personal info */}
        <div className="edit-card">
          <div className="edit-card-head">
            <span className="section-icon-chip"><FaPerson /></span>
            <span className="section-label">Personal Information</span>
          </div>
          <div className="edit-card-body">
            <div className="edit-field">
              <label className="edit-label">Username</label>
              <input
                className="edit-input"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Your username…"
                maxLength={32}
              />
            </div>

            <div className="edit-field">
              <label className="edit-label">Display name</label>
              <input
                className="edit-input"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                placeholder="How you appear to others…"
                maxLength={100}
              />
            </div>

            <div className="edit-field">
              <label className="edit-label">Bio</label>
              <textarea
                className="edit-textarea"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                placeholder="Tell others about yourself…"
                maxLength={200}
                rows={3}
              />
            </div>

            <div className="edit-field">
              <label className="edit-label">Email</label>
              <input
                className="edit-input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                type="email"
                maxLength={100}
              />
            </div>
          </div>
        </div>

        {/* Preferences */}
        <div className="edit-card">
          <div className="edit-card-head">
            <span className="section-icon-chip"><LuSave size={14} /></span>
            <span className="section-label">Preferences</span>
          </div>
          <div className="edit-card-body">
            <div className="edit-field">
              <label className="edit-label">Timezone</label>
              <input
                className="edit-input"
                value={timezone}
                onChange={(e) => setTimezone(e.target.value)}
                placeholder="e.g. America/New_York"
              />
            </div>

            <div className="edit-field">
              <label className="edit-label">Default Difficulty</label>
              <select
                className="pref-select"
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value)}
              >
                <option value="any">Any</option>
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
              </select>
            </div>

            <div className="edit-field">
              <label className="edit-label">Theme</label>
              <div className="edit-theme-toggle" onClick={toggleTheme}>
                <div className="edit-theme-toggle-track">
                  <div className={`edit-theme-toggle-thumb ${darkMode ? "dark" : "light"}`}>
                    {darkMode ? <LuMoon size={14} /> : <LuSun size={14} />}
                  </div>
                </div>
                <span className="edit-theme-toggle-label">
                  {darkMode ? "Dark Mode" : "Light Mode"}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Danger zone */}
        <div className="edit-card" style={{ borderColor: "rgba(239, 68, 68, 0.18)" }}>
          <div className="edit-card-head">
            <span
              className="section-icon-chip section-icon-chip--danger"
            >
              <LuTriangleAlert size={16} />
            </span>
            <span className="section-label section-label--danger">
              Danger zone
            </span>
          </div>
          <div className="danger-zone">
            <p className="danger-desc">
              Reset all profile data — this cannot be undone
            </p>
            <button className="danger-btn" onClick={resetProfile}>
              Reset profile
            </button>
          </div>
        </div>

        {/* Actions */}
        <div className="edit-actions">
          <button
            className="edit-btn-cancel"
            onClick={() => navigate("/profile")}
          >
            Cancel
          </button>
          <button
            className="edit-btn-save"
            onClick={saveAll}
            disabled={saving}
          >
            {saving ? (
              <>
                <span className="create-spinner" /> Saving…
              </>
            ) : (
              <>
                <LuSave size={15} /> Save Changes
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditProfile;
