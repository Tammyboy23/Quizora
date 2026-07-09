import { useState } from "react";
import { LuPencil, LuFileText, LuSmile, LuSettings, LuZap } from "react-icons/lu";
import { FaRegFaceMeh, FaFaceAngry, FaTriangleExclamation } from "react-icons/fa6";
import { RingLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function Create() {
  const [mode, setMode] = useState("Text");
  const [number, setNumber] = useState(5);
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [difficulty, setDifficulty] = useState("easy");
  const navigate = useNavigate();

  async function create() {
    const trimmedTitle = title.trim();
    if (!trimmedTitle) { setErrorMessage("Please enter a quiz title before creating."); toast.error("Enter Quiz title."); return; }
    if (number < 1) { setErrorMessage("Please choose at least 1 question."); return; }
    setLoading(true);
    setErrorMessage("");
    try {
      const response = await fetch("https://quizora-r3li.onrender.com/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: trimmedTitle, number, difficulty }),
      });
      const result = await response.json();
      if (!response.ok) { setErrorMessage(result.error || "Failed to create quiz"); return; }
      navigate("/explore");
      toast.success("Quiz Created Succesfully")
    } catch {
      setErrorMessage("Failed to create quiz. Please try again.");
      toast.error("Failed to Create Quiz")
    } finally {
      setLoading(false);
    }
  }

  const diffOptions = [
    { key: "easy",   label: "Easy",   icon: <LuSmile />,       activeClass: "easy" },
    { key: "Medium", label: "Medium", icon: <FaRegFaceMeh />,  activeClass: "med"  },
    { key: "Hard",   label: "Hard",   icon: <FaFaceAngry />,   activeClass: "hard" },
  ];

  const diffColors = {
    easy: { bg: "rgba(34,197,94,0.12)",  border: "rgba(34,197,94,0.45)",  color: "#4ade80" },
    med:  { bg: "rgba(251,146,60,0.12)", border: "rgba(251,146,60,0.45)", color: "#fb923c" },
    hard: { bg: "rgba(239,68,68,0.12)",  border: "rgba(239,68,68,0.45)",  color: "#f87171" },
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "40px 16px", background: "transparent", fontFamily: 'sans-serif' }}>
      <div style={{ width: "100%", maxWidth: 480, background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 24, overflow: "hidden" }}>

        {/* Header */}
        <div style={{ padding: "32px 36px 28px", background: "var(--surface2)", borderBottom: "1px solid var(--border)" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: "0.7rem", fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--accent2)", background: "rgba(108,99,255,0.1)", border: "1px solid rgba(108,99,255,0.22)", borderRadius: 999, padding: "4px 12px", marginBottom: 14 }}>
            <LuZap size={12} /> AI-Powered
          </div>
          <div style={{ fontSize: "1.7rem", fontWeight: 800, color: "#fff", letterSpacing: "-0.03em", marginBottom: 6, fontFamily: "outfit" }}>
            Create Quiz
          </div>
          <div style={{ fontSize: "0.83rem", color: "var(--muted)", fontFamily: "rubik", lineHeight: 1.55 }}>
            Customize your quiz and let AI do the heavy lifting.
          </div>

          {/* Pill nav */}
          <div style={{ position: "relative", display: "flex", background: "var(--surface3)", border: "1px solid var(--border)", borderRadius: 999, padding: 4, marginTop: 22 }}>
            <div style={{
              position: "absolute", top: 4, left: 4,
              height: "calc(100% - 8px)", width: "calc(50% - 4px)",
              background: "var(--accent)", borderRadius: 999,
              transition: "transform 0.28s cubic-bezier(0.4,0,0.2,1)",
              transform: mode === "PDF" ? "translateX(100%)" : "translateX(0)",
              zIndex: 0,
            }} />
            {[{ id: "Text", icon: <LuPencil size={13} /> }, { id: "PDF", icon: <LuFileText size={13} /> }].map((m) => (
              <button key={m.id} onClick={() => { setMode(m.id); setErrorMessage(""); }} style={{
                flex: 1, height: 34, border: "none", background: "transparent", borderRadius: 999,
                fontFamily: "sans-serif", fontSize: "0.85rem", fontWeight: 600, cursor: "pointer",
                position: "relative", zIndex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
                color: mode === m.id ? "#fff" : "var(--muted)", transition: "color 0.2s",
              }}>
                {m.icon} {m.id}
              </button>
            ))}
          </div>
        </div>

        {/* Body */}
        <div style={{ padding: "28px 36px 36px", display: "flex", flexDirection: "column", gap: 22 , fontFamily: 'sans-serif'}}>
          {mode === "Text" ? (
            <>
              {/* Topic input */}
              <div>
                <div style={labelStyle}>Topic or Subject</div>
                <input
                  type="text"
                  placeholder="e.g. Ancient Rome, Photosynthesis…"
                  value={title}
                  onChange={(e) => { setTitle(e.target.value); setErrorMessage(""); }}
                  style={inputStyle}
                  onFocus={(e) => { e.target.style.borderColor = "#6c63ff"; e.target.style.boxShadow = "0 0 0 3px rgba(108,99,255,0.15)"; }}
                  onBlur={(e) => { e.target.style.borderColor = "var(--border2)"; e.target.style.boxShadow = "none"; }}
                />
                {errorMessage && (
                  <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "11px 15px", background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.3)", borderRadius: 11, color: "#f87171", fontSize: "0.84rem", fontFamily: "rubik", marginTop: 8 }}>
                    <FaTriangleExclamation size={14} style={{ flexShrink: 0 }} />
                    {errorMessage}
                  </div>
                )}
              </div>

              {/* Difficulty */}
              <div>
                <div style={labelStyle}>Difficulty</div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 8 }}>
                  {diffOptions.map((d) => {
                    const isActive = difficulty === d.key;
                    const col = diffColors[d.activeClass];
                    return (
                      <button key={d.key} onClick={() => setDifficulty(d.key)} style={{
                        height: 46, borderRadius: 12,
                        border: `1.5px solid ${isActive ? col.border : "var(--border2)"}`,
                        background: isActive ? col.bg : "var(--surface2)",
                        color: isActive ? col.color : "var(--muted)",
                        fontFamily: "outfit", fontSize: "0.85rem", fontWeight: 600, cursor: "pointer",
                        display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
                        transition: "all 0.2s",
                      }}>
                        {d.icon} {d.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Slider */}
              <div>
                <div style={labelStyle}>
                  Number of Questions —{" "}
                  <span style={{ color: "var(--accent2)" }}>{number}</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <span style={{ fontSize: "0.8rem", color: "var(--muted)" }}>1</span>
                  <input
                    type="range" min="1" max="200" step="1" value={number}
                    onChange={(e) => setNumber(Number(e.target.value))}
                    className="range-input"
                    style={{ flex: 1 }}
                  />
                  <span style={{ fontSize: "0.8rem", color: "var(--muted)" }}>200</span>
                </div>
              </div>

              {/* Generate button */}
              <button
                onClick={create}
                disabled={loading}
                className="start-btn"
                style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "center", gap: 9, opacity: loading ? 0.7 : 1 }}
              >
                {loading ? (
                  <>
                    <span style={{
                      width: 17, height: 17,
                      border: "2.5px solid rgba(255,255,255,0.3)",
                      borderTopColor: "#fff", borderRadius: "50%",
                      animation: "spin 0.7s linear infinite",
                      display: "inline-block",
                    }} />
                    Generating… <RingLoader color="#ffffff" size={20}/>
                  </>
                ) : (
                  <>
                    <LuZap size={16} /> Generate Quiz
                  </>
                )}
              </button>
            </>
          ) : (
            /* PDF — maintenance state */
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 14, padding: "48px 20px", textAlign: "center" }}>
              <div style={{ width: 56, height: 56, borderRadius: 16, background: "rgba(251,146,60,0.1)", border: "1px solid rgba(251,146,60,0.25)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fb923c" }}>
                <LuSettings size={26} />
              </div>
              <div style={{ fontSize: "1.05rem", fontWeight: 700, color: "#f0f0f0", fontFamily: "outfit" }}>
                Feature under maintenance
              </div>
              <div style={{ fontSize: "0.83rem", color: "var(--muted)", fontFamily: "rubik", lineHeight: 1.6, maxWidth: 240 }}>
                PDF quiz generation is being upgraded. Check back soon — it'll be worth the wait.
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}

const labelStyle = {
  fontSize: "0.72rem", textTransform: "uppercase", letterSpacing: "0.09em",
  color: "var(--muted)", fontWeight: 600, marginBottom: 8, fontFamily: "outfit",
};

const inputStyle = {
  width: "100%", height: 48, padding: "0 16px",
  background: "var(--surface2)", border: "1.5px solid var(--border2)",
  borderRadius: 13, color: "#f0f0f0", fontFamily: "outfit", fontSize: "0.95rem",
  outline: "none", boxSizing: "border-box", caretColor: "var(--accent2)",
  transition: "border-color 0.2s, box-shadow 0.2s",
};

export default Create;