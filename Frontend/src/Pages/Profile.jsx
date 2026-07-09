import { useState, useRef, useEffect } from "react";
import { signOut, updateProfile } from "firebase/auth";
import { auth } from "../config/firebase-config";
import toast from "react-hot-toast";
import { FaPerson } from "react-icons/fa6";
import { LuCalculator, LuChartBar, LuChartBarIncreasing, LuChartCandlestick, LuLogOut } from "react-icons/lu";
import { useAuth } from "../config/auth-context.jsx";

function Profile() {
  const [pop, setpop] = useState(false);
  const { user, isSignedIn } = useAuth();
  const [username, setUsername] = useState(user?.displayName || localStorage.getItem("username") || "Anonymous");
  const [displayName, setDisplayName] = useState(user?.displayName || "");
  const [bio, setBio] = useState(localStorage.getItem("bio") || "");
  const [email, setEmail] = useState(user?.email || "");
  const [avatar, setAvatar] = useState(user?.photoURL || localStorage.getItem("avatar") || null);
  const [timezone, setTimezone] = useState(localStorage.getItem("pref_timezone") || "");
  const [difficulty, setDifficulty] = useState(localStorage.getItem("pref_difficulty") || "any");
  const [accent, setAccent] = useState(localStorage.getItem("pref_accent") || "purple");

  const [editing, setEditing] = useState({});
  const [inputs, setInputs] = useState({});
  const [saveMsg, setSaveMsg] = useState("");
  const fileRef = useRef(null);

  const stats = JSON.parse(localStorage.getItem("quizStats") || '{"taken":0,"accuracy":0,"streak":0}');

  // Sync Firebase user data when user object changes
  useEffect(() => {
    if (user) {
      setDisplayName(user.displayName || "");
      setEmail(user.email || "");
      setAvatar(user.photoURL || localStorage.getItem("avatar") || null);
      setUsername(user.displayName || localStorage.getItem("username") || "Anonymous");
    }
  }, [user?.uid]);

  function logout() {
      signOut(auth)
      setpop(!pop)
      toast.success("Logged Out")
      navigation('/')
      window.location.reload();
    }
  function showSaved(msg = "Changes saved") {
    setSaveMsg(msg);
    setTimeout(() => setSaveMsg(""), 2200)
    toast.success("Changed Saved");
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
        if (user) updateProfile(user, { displayName: val }).catch(() => {});
        break;
      case "displayName":
        setDisplayName(val);
        if (user) updateProfile(user, { displayName: val }).catch(() => {});
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
      if (user) updateProfile(user, { photoURL: dataUrl }).catch(() => {});
      showSaved("Photo updated");
    };
    reader.readAsDataURL(file);
  }

  function removeAvatar() {
    setAvatar(null);
    localStorage.removeItem("avatar");
    if (user) updateProfile(user, { photoURL: null }).catch(() => {});
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
    <>
    
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
              <span className="section-icon-chip"><FaPerson /></span>
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
              {renderField("email",       "Email",        email,       "your@email.com")}
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
              <p className="danger-desc">Logout Of Current Device</p>
              <button className="danger-btn" onClick={() => setpop(!pop)}><LuLogOut /> LogOut </button>
            </div>
          </div>

          {saveMsg && <div className="save-toast">{saveMsg} ✓</div>}
        </div>
      </div>
      
    </div>
    <div className="pop" style={{
      display: pop? 'flex': 'none',
    }}>
        <div className="pop-con" >
          <div className="bar"></div>
          <div className="span"><LuLogOut color="red" size={30}/></div>
          <h1>Log Out</h1>
          <p>Are you sure you want to log out</p>
          <div className="pop-btns">
            <button onClick={() => setpop(!pop)}>Cancel</button>
            <button onClick={logout}>Confirm</button>
          </div>
        </div>
      </div>
    </>
  );

}

export default Profile;