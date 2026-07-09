import { useState } from "react";
import { LuEye, LuEyeOff, LuMail, LuUser, LuLock } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import {signUp, signIn, signInWithGoogle, logOut, watchAuthState} from "../config/auth"
const GoogleIcon = () => (
  <svg width="18" height="18" viewBox="0 0 48 48">
    <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
    <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
    <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
    <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.18 1.48-4.97 2.31-8.16 2.31-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
  </svg>
);

function Sign() {
  const [mode, setMode] = useState("login");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [showPw, setShowPw] = useState(false);
  const navigate = useNavigate();

  function handleModeSwitch(m) {
    setMode(m);
    setEmail(""); setPassword(""); setUsername(""); setShowPw(false);
  }

  const signup = async() => {
    try{
      await signUp(email, password);
      toast.success("Account Created");
      navigate('/')

    }
    catch(err){
      console.error(`Error: ${err}`);
      toast.error(`${err}`);
    }
    
  }

  const login = async() => {
    try{
      await signIn(email, password);
      toast.success("Logged In Successfully")
      navigate('/')
    }
    catch(err){
      console.error(`Error: ${err}`)
      toast.error(`${err}`);
    }
    
  }

  const googleAuth = async() => {
    await signInWithGoogle();
    navigate('/')
  }

  return (
    <div className="sign-shell" style={{
      minHeight: "100vh", display: "flex", alignItems: "center",
      justifyContent: "center", padding: "40px 16px", background: "transparent"
    }}>
      <div className="sign-card" style={{
        width: "100%", maxWidth: 420, background: "var(--surface)",
        border: "1px solid var(--border)", borderRadius: 24, overflow: "hidden"
      }}>

        {/* Header */}
        <div style={{
          padding: "36px 36px 28px",
          background: "linear-gradient(135deg, rgba(108,99,255,0.14) 0%, rgba(156,148,255,0.06) 60%, transparent 100%)",
          borderBottom: "1px solid rgba(255,255,255,0.05)", textAlign: "center"
        }}>
          <div style={{ fontSize: "1.6rem", fontWeight: 800, color: "var(--accent)", letterSpacing: "-0.03em", marginBottom: 6, fontFamily: "outfit" }}>
            Quizora
          </div>
          <div style={{ fontSize: "0.83rem", color: "var(--muted)", fontFamily: "rubik" }}>
            Test your knowledge, track your growth
          </div>

          {/* Pill nav */}
          <div style={{
            position: "relative", display: "flex", background: "var(--surface2)",
            border: "1px solid var(--border)", borderRadius: 999,
            padding: 4, marginTop: 24
          }}>
            <div style={{
              position: "absolute", top: 4, left: 4,
              height: "calc(100% - 8px)", width: "calc(50% - 4px)",
              background: "var(--accent)", borderRadius: 999,
              transition: "transform 0.28s cubic-bezier(0.4,0,0.2,1)",
              transform: mode === "signup" ? "translateX(100%)" : "translateX(0)",
              zIndex: 0,
            }} />
            {["login", "signup"].map((m) => (
              <button key={m} onClick={() => handleModeSwitch(m)} style={{
                flex: 1, height: 36, border: "none", background: "transparent",
                borderRadius: 999, fontFamily: "outfit", fontSize: "0.88rem",
                fontWeight: 600, cursor: "pointer", position: "relative", zIndex: 1,
                color: mode === m ? "#fff" : "var(--muted)",
                transition: "color 0.2s",
              }}>
                {m === "login" ? "Login" : "Sign Up"}
              </button>
            ))}
          </div>
        </div>

        {/* Form body */}
        <div style={{ padding: "28px 36px 36px", display: "flex", flexDirection: "column", gap: 14 }}>

          {mode === "signup" && (
            <Field label="Username" icon={<LuUser size={16} />}>
              <input type="text" placeholder="coolquizzer42" value={username} onChange={(e) => setUsername(e.target.value)} style={inputStyle} />
            </Field>
          )}

          <Field label="Email" icon={<LuMail size={16} />}>
            <input type="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} style={inputStyle} />
          </Field>

          <Field label="Password" icon={<LuLock size={16} />} suffix={
            <button onClick={() => setShowPw(!showPw)} style={{ background: "none", border: "none", color: "var(--muted)", cursor: "pointer", display: "flex", alignItems: "center", padding: 0 }}>
              {showPw ? <LuEyeOff size={16} /> : <LuEye size={16} />}
            </button>
          }>
            <input type={showPw ? "text" : "password"} placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} style={inputStyle} />
          </Field>

          {mode === "login" && (
            <span style={{ alignSelf: "flex-end", fontSize: "0.78rem", color: "var(--accent)", cursor: "pointer", fontFamily: "rubik", marginTop: -6 }}>
              Forgot password?
            </span>
          )}

          <button onClick={mode === "login" ? login : signup} className="start-btn" style={{ width: "100%", marginTop: 4 }}>
            {mode === "login" ? "Login" : "Create account"}
          </button>

          <div style={{ display: "flex", alignItems: "center", gap: 12, color: "var(--muted)", fontSize: "0.8rem", fontFamily: "rubik" }}>
            <div style={{ flex: 1, height: 1, background: "var(--border)" }} />
            or
            <div style={{ flex: 1, height: 1, background: "var(--border)" }} />
          </div>

          <button onClick={googleAuth} style={{
            width: "100%", height: 48, background: "var(--surface2)",
            border: "1.5px solid var(--border2)", borderRadius: 13, color: "var(--font2)",
            fontFamily: "outfit", fontSize: "0.92rem", fontWeight: 600, cursor: "pointer",
            display: "flex", alignItems: "center", justifyContent: "center", gap: 10,
            transition: "background 0.2s, border-color 0.2s, transform 0.15s",
          }}>
            <GoogleIcon />
            Continue with Google
          </button>

          <div style={{ textAlign: "center", fontSize: "0.82rem", color: "var(--muted)", fontFamily: "rubik" }}>
            {mode === "login" ? "Don't have an account? " : "Already have an account? "}
            <span onClick={() => handleModeSwitch(mode === "login" ? "signup" : "login")}
              style={{ color: "var(--accent2)", cursor: "pointer", fontWeight: 600 }}>
              {mode === "login" ? "Sign up free" : "Log in"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

// Helper components
const inputStyle = {
  flex: 1, background: "transparent", border: "none", outline: "none",
  color: "var(--font)", fontFamily: "outfit", fontSize: "0.95rem", caretColor: "var(--accent2)",
};

function Field({ label, icon, suffix, children }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
      <div style={{ fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--muted)", fontWeight: 600, fontFamily: "outfit" }}>
        {label}
      </div>
      <div style={{
        display: "flex", alignItems: "center", gap: 10,
        background: "var(--surface2)", border: "1.5px solid var(--border2)",
        borderRadius: 12, padding: "0 14px", height: 48,
      }}>
        <span style={{ color: "var(--muted)", display: "flex", alignItems: "center", flexShrink: 0 }}>{icon}</span>
        {children}
        {suffix}
      </div>
    </div>
  );
}

export default Sign;