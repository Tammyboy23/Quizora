import { useState, useRef } from "react";
import Top from "./top";

function Profile() {
  const [username, setUsername] = useState(localStorage.getItem("username") || "Anonymous");
  const [displayName, setDisplayName] = useState(localStorage.getItem("displayName") || "");
  const [bio, setBio] = useState(localStorage.getItem("bio") || "");
  const [email, setEmail] = useState(localStorage.getItem("userEmail") || "");
  const [avatar, setAvatar] = useState(localStorage.getItem("avatar") || null);
  const [timezone, setTimezone] = useState(localStorage.getItem("pref_timezone") || "");
  const [difficulty, setDifficulty] = useState(localStorage.getItem("pref_difficulty") || "any");
  const [accent, setAccent] = useState(localStorage.getItem("pref_accent") || "purple");

  const [editing, setEditing] = useState({});
  const [inputs, setInputs] = useState({});
  const [saveMsg, setSaveMsg] = useState("");
  const fileRef = useRef(null);

  const stats = JSON.parse(localStorage.getItem("quizStats") || '{"taken":0,"accuracy":0,"streak":0}');

  function showSaved(msg = "Changes saved") {
    setSaveMsg(msg);
    setTimeout(() => setSaveMsg(""), 2200);
  }

  function startEdit(key, currentVal) {
    setEditing((p) => ({ ...p, [key]: true }));
    setInputs((p) => ({ ...p, [key]: currentVal }));
  }

  function cancelEdit(key) {
    setEditing((p) => ({ ...p, [key]: false }));
  }

  function saveField(key) {
    const val = (inputs[key] || "").trim();
    if (key === "username" && !val) return;
    switch (key) {
      case "username":
        setUsername(val);
        localStorage.setItem("username", val);
        break;
      case "displayName":
        setDisplayName(val);
        val ? localStorage.setItem("displayName", val) : localStorage.removeItem("displayName");
        break;
      case "bio":
        setBio(val);
        val ? localStorage.setItem("bio", val) : localStorage.removeItem("bio");
        break;
      case "email":
        setEmail(val);
        val ? localStorage.setItem("userEmail", val) : localStorage.removeItem("userEmail");
        break;
    }
    setEditing((p) => ({ ...p, [key]: false }));
    showSaved();
  }

  function handleKeyDown(e, key) {
    if (e.key === "Enter" && key !== "bio") saveField(key);
    if (e.key === "Escape") cancelEdit(key);
  }

  function handleAvatarChange(e) {
    const file = e.target.files[0];
    if (!file) return;
    if (file.size > 2 * 1024 * 1024) { alert("Image must be under 2 MB."); return; }
    const reader = new FileReader();
    reader.onload = (ev) => {
      const dataUrl = ev.target.result;
      setAvatar(dataUrl);
      localStorage.setItem("avatar", dataUrl);
      showSaved("Photo updated");
    };
    reader.readAsDataURL(file);
  }

  function removeAvatar() {
    setAvatar(null);
    localStorage.removeItem("avatar");
    showSaved("Photo removed");
  }

  function savePref(key, value, setter) {
    setter(value);
    localStorage.setItem("pref_" + key, value);
    showSaved("Preference saved");
  }

  function resetProfile() {
    if (!window.confirm("Reset all profile data? This cannot be undone.")) return;
    ["username","displayName","bio","userEmail","avatar",
     "pref_timezone","pref_difficulty","pref_accent"].forEach((k) => localStorage.removeItem(k));
    setUsername("Anonymous");
    setDisplayName("");
    setBio("");
    setEmail("");
    setAvatar(null);
    setTimezone("");
    setDifficulty("any");
    setAccent("purple");
    showSaved("Profile reset");
  }

  function renderField(key, label, value, placeholder, isTextarea = false) {
    return (
      <div className="profile-field">
        <label className="field-label">{label}</label>
        {editing[key] ? (
          <div className={isTextarea ? "field-edit-col" : "field-edit-row"}>
            {isTextarea ? (
              <textarea
                className="field-textarea"
                value={inputs[key] ?? value}
                onChange={(e) => setInputs((p) => ({ ...p, [key]: e.target.value }))}
                autoFocus
                maxLength={200}
                placeholder={placeholder}
                rows={3}
              />
            ) : (
              <input
                className="field-input"
                value={inputs[key] ?? value}
                onChange={(e) => setInputs((p) => ({ ...p, [key]: e.target.value }))}
                onKeyDown={(e) => handleKeyDown(e, key)}
                autoFocus
                maxLength={key === "username" ? 32 : 100}
                placeholder={placeholder}
              />
            )}
            <div className="edit-btn-row">
              <button className="field-save-btn" onClick={() => saveField(key)}>Save</button>
              <button className="field-cancel-btn" onClick={() => cancelEdit(key)}>Cancel</button>
            </div>
          </div>
        ) : (
          <div className="field-display-row">
            <span className={`field-value${!value ? " field-value--empty" : ""}`}>
              {value || "Not set"}
            </span>
            <button className="field-edit-btn" onClick={() => startEdit(key, value)}>Edit</button>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="layout">
      <div className="content">
        
        <div className="profile-page">
          <div className="profile-page-header">
            <h2 className="profile-title">My Profile</h2>
            <p className="profile-subtitle">Manage your identity and quiz preferences</p>
          </div>

          {/* ── Identity ── */}
          <div className="profile-section-card">
            <div className="profile-section-head">
              <span className="section-icon-chip">👤</span>
              <span className="section-label">Identity</span>
            </div>
            <div className="profile-section-body">

              {/* Avatar */}
              <div className="avatar-section">
                <div className="avatar-wrap" onClick={() => fileRef.current.click()}>
                  {avatar
                    ? <img src={avatar} alt="Profile" className="avatar-img" />
                    : <div className="avatar-placeholder">{username.charAt(0).toUpperCase()}</div>
                  }
                  <div className="avatar-overlay"><span>Change</span></div>
                </div>
                <input type="file" accept="image/*" ref={fileRef} style={{ display:"none" }} onChange={handleAvatarChange} />
                <div className="avatar-actions">
                  <button className="avatar-upload-btn" onClick={() => fileRef.current.click()}>Upload photo</button>
                  {avatar && <button className="remove-avatar-btn" onClick={removeAvatar}>Remove</button>}
                </div>
                <p className="avatar-hint">JPG, PNG or GIF · max 2 MB</p>
              </div>

              {renderField("username",    "Username",     username,    "Your username…")}
              {renderField("displayName", "Display name", displayName, "How you appear to others…")}
              {renderField("bio",         "Bio",          bio,         "Tell others about yourself…", true)}
            </div>
          </div>

          {/* ── Contact ── */}
          <div className="profile-section-card">
            <div className="profile-section-head">
              <span className="section-icon-chip">✉️</span>
              <span className="section-label">Contact</span>
            </div>
            <div className="profile-section-body">
              {renderField("email", "Email address", email, "you@example.com")}
            </div>
          </div>

          {/* ── Preferences ── */}
          <div className="profile-section-card">
            <div className="profile-section-head">
              <span className="section-icon-chip">⚙️</span>
              <span className="section-label">Preferences</span>
            </div>
            <div className="profile-section-body">

              <div className="profile-field">
                <label className="field-label">Timezone</label>
                <select
                  className="pref-select"
                  value={timezone}
                  onChange={(e) => savePref("timezone", e.target.value, setTimezone)}
                >
                  <option value="">— Select timezone —</option>
                  <option value="UTC">UTC</option>
                  <option value="America/New_York">Eastern Time (ET)</option>
                  <option value="America/Chicago">Central Time (CT)</option>
                  <option value="America/Denver">Mountain Time (MT)</option>
                  <option value="America/Los_Angeles">Pacific Time (PT)</option>
                  <option value="Europe/London">London (GMT/BST)</option>
                  <option value="Europe/Paris">Paris (CET/CEST)</option>
                  <option value="Africa/Lagos">Lagos (WAT)</option>
                  <option value="Asia/Dubai">Dubai (GST)</option>
                  <option value="Asia/Kolkata">Mumbai / Delhi (IST)</option>
                  <option value="Asia/Singapore">Singapore (SGT)</option>
                  <option value="Asia/Tokyo">Tokyo (JST)</option>
                  <option value="Australia/Sydney">Sydney (AEST)</option>
                </select>
              </div>

              <div className="profile-field">
                <label className="field-label">Default quiz difficulty</label>
                <select
                  className="pref-select"
                  value={difficulty}
                  onChange={(e) => savePref("difficulty", e.target.value, setDifficulty)}
                >
                  <option value="any">Any difficulty</option>
                  <option value="easy">Easy</option>
                  <option value="medium">Medium</option>
                  <option value="hard">Hard</option>
                </select>
              </div>

              <div className="profile-field">
                <label className="field-label">Color accent</label>
                <select
                  className="pref-select"
                  value={accent}
                  onChange={(e) => savePref("accent", e.target.value, setAccent)}
                >
                  <option value="purple">Purple (default)</option>
                  <option value="blue">Blue</option>
                  <option value="pink">Pink</option>
                  <option value="teal">Teal</option>
                </select>
              </div>

            </div>
          </div>

          {/* ── Stats ── */}
          <div className="profile-section-card">
            <div className="profile-section-head">
              <span className="section-icon-chip">📊</span>
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
              <p className="danger-desc">Clear all saved profile data and reset to defaults</p>
              <button className="danger-btn" onClick={resetProfile}>Reset profile</button>
            </div>
          </div>

          {saveMsg && <div className="save-toast">{saveMsg} ✓</div>}
        </div>
      </div>
    </div>
  );
}

export default Profile;