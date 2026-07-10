import { useState } from "react";
import { LuPencil, LuFileText, LuSmile, LuSettings, LuZap, LuBookHeadphones } from "react-icons/lu";
import { FaRegFaceMeh, FaFaceAngry, FaTriangleExclamation } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function Create() {
  const [mode, setMode] = useState("Text");
  const [number, setNumber] = useState(5);
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [difficulty, setDifficulty] = useState("easy");
  const [quizType, setQuizType] = useState("QuizOnly");
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
        body: JSON.stringify({ title: trimmedTitle, number, difficulty, quizType }),
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
    <div className="create-page">
      {/* Header */}
      <div className="create-header">
        <div className="create-header-inner">
          <div className="create-badge">
            <LuZap size={12} /> AI-Powered
          </div>
          <h1 className="create-title">Create Quiz</h1>
          <p className="create-subtitle">
            Customize your quiz and let AI do the heavy lifting.
          </p>

          {/* Pill nav */}
          <div className="create-pill-wrap">
            <div
              className="create-pill-slider"
              style={{
                transform: mode === "PDF" ? "translateX(100%)" : "translateX(0)",
              }}
            />
            {[{ id: "Text", icon: <LuPencil size={13} /> }, { id: "PDF", icon: <LuFileText size={13} /> }].map(
              (m) => (
                <button
                  key={m.id}
                  onClick={() => {
                    setMode(m.id);
                    setErrorMessage("");
                  }}
                  className={`create-pill-btn ${mode === m.id ? "create-pill-btn--active" : ""}`}
                >
                  {m.icon} {m.id}
                </button>
              )
            )}
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="create-body">
        {mode === "Text" ? (
          <div className="create-form">
            {/* Topic input */}
            <div className="create-field">
              <label className="create-label">Topic or Subject</label>
              <input
                type="text"
                placeholder="e.g. Ancient Rome, Photosynthesis…"
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                  setErrorMessage("");
                }}
                className="create-input"
              />
              {errorMessage && (
                <div className="create-error">
                  <FaTriangleExclamation size={14} style={{ flexShrink: 0 }} />
                  {errorMessage}
                </div>
              )}
            </div>

            {/* Difficulty & Slider side by side on desktop */}
            <div className="create-row">
              <div className="create-field">
                <label className="create-label">Difficulty</label>
                <div className="create-diff-grid">
                  {diffOptions.map((d) => {
                    const isActive = difficulty === d.key;
                    const col = diffColors[d.activeClass];
                    return (
                      <button
                        key={d.key}
                        onClick={() => setDifficulty(d.key)}
                        className="create-diff-btn"
                        style={{
                          border: `1.5px solid ${isActive ? col.border : "var(--border2)"}`,
                          background: isActive ? col.bg : "var(--surface2)",
                          color: isActive ? col.color : "var(--muted)",
                        }}
                      >
                        {d.icon} {d.label}
                      </button>
                    );
                  })}
                </div>
              </div>
              

              {/* Slider */}
              <div className="create-field">
                <label className="create-label">
                  Number of Questions — <span className="create-count">{number}</span>
                </label>
                <div className="create-slider-row">
                  <span className="create-slider-bound">1</span>
                  <input
                    type="range"
                    min="1"
                    max="200"
                    step="1"
                    value={number}
                    onChange={(e) => setNumber(Number(e.target.value))}
                    className="range-input"
                  />
                  <span className="create-slider-bound">200</span>
                </div>
              </div>
            </div>

            {/* Quiz Type — Lesson or Quiz only */}
            <div className="create-field">
              <label className="create-label">Quiz Type</label>
              <div className="create-type-pill-wrap">
                <div
                  className="create-type-pill-slider"
                  style={{
                    transform:
                      quizType === "QuizOnly"
                        ? "translateX(0)"
                        : "translateX(100%)",
                  }}
                />
                {[
                  { id: "QuizOnly", label: "Quiz Only", icon: <LuZap size={13} /> },
                  { id: "Lesson", label: "Lesson", icon: <LuBookHeadphones size={13} /> },
                ].map((t) => (
                  <button
                    key={t.id}
                    onClick={() => setQuizType(t.id)}
                    className={`create-type-pill-btn ${
                      quizType === t.id ? "create-type-pill-btn--active" : ""
                    }`}
                  >
                    {t.icon} {t.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Generate button */}
            <div className="create-action">
              <button
                onClick={create}
                disabled={loading}
                className="start-btn create-generate-btn"
              >
                {loading ? (
                  <>
                    <span className="create-spinner" />
                    Generating…
                  </>
                ) : (
                  <>
                    <LuZap size={16} /> Generate Quiz
                  </>
                )}
              </button>
            </div>
          </div>
        ) : (
          /* PDF — maintenance state */
          <div className="create-maintenance">
            <div className="create-maintenance-icon">
              <LuSettings size={26} />
            </div>
            <div className="create-maintenance-title">Feature under maintenance</div>
            <div className="create-maintenance-desc">
              PDF quiz generation is being upgraded. Check back soon — it&apos;ll be worth the wait.
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
export default Create;