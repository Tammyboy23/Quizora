import {  AiFillFire } from "react-icons/ai";
import Top from "./top";
import { Link, useNavigate } from "react-router-dom";
import {  FaBook, FaChartLine, FaRobot, FaStackExchange, FaTrophy, FaBrain, FaRocket, FaGraduationCap } from "react-icons/fa";
import { LuBell, LuBellDot, LuCheck, LuTriangleAlert, LuInfo, LuX, LuTrendingUp, LuSpace, LuSparkle, LuSparkles, LuSettings, LuBook, LuPaperclip, LuSearch, LuCompass, LuNewspaper, LuArrowRight, LuZap } from "react-icons/lu";
import { useEffect, useRef, useState } from "react";
import { getNotifications, markAllAsRead } from "../utils/notifications";
import { useAuth } from "../config/auth-context.jsx";

function formatTimeAgo(timestamp) {
  if (!timestamp) return "";
  const now = new Date();
  const date = new Date(timestamp);
  const diffMs = now - date;
  const diffMins = Math.floor(diffMs / 60000);
  const diffHrs = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return "Just now";
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHrs < 24) return `${diffHrs}h ago`;
  if (diffDays < 7) return `${diffDays}d ago`;
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

function Home(){
    const average = Number(localStorage.getItem("average") || 0);
    const [notifications, setNotifications] = useState(() => getNotifications());
    const [created, setcreated] = useState([])
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();
    const { isSignedIn, checkingAuth, user } = useAuth();

    const bellRef = useRef(null);
    const panelRef = useRef(null);

    useEffect(() => {
        fetch("https://quizora-r3li.onrender.com/dashboard/created")
        .then(res => res.json())
        .then((data) => {
            setcreated(data)
        })
    },[])

    // Refresh notifications from storage whenever panel opens
    useEffect(() => {
        if (open) {
            setNotifications(getNotifications());
            markAllAsRead();
        }
    }, [open]);

    useEffect(() => {
        if (!open) return;

        const handlePointerDown = (event) => {
            const clickedInsideBell = bellRef.current?.contains(event.target);
            const clickedInsidePanel = panelRef.current?.contains(event.target);

            if (!clickedInsideBell && !clickedInsidePanel) {
                setOpen(false);
            }
        };

        document.addEventListener("mousedown", handlePointerDown);
        return () => document.removeEventListener("mousedown", handlePointerDown);
    }, [open]);

    if (checkingAuth) {
      return (
        <div className="landing-auth-loading">
          <div className="landing-loading-spinner" />
        </div>
      );
    }

    // ── Not signed in → show landing page ──
    if (!isSignedIn) {
      return (
        <div className="landing">
          {/* ── Hero Section ── */}
          <section className="landing-hero">
            <div className="landing-hero-bg-glow" />
            <div className="landing-hero-content">
              <div className="landing-hero-badge">
                <LuZap size={12} />
                <span>The future of learning</span>
              </div>
              <h1 className="landing-hero-title">
                Test your knowledge,
                <br />
                <span className="landing-hero-gradient">master your skills</span>
              </h1>
              <p className="landing-hero-subtitle">
                Create custom quizzes, explore curated subjects, track your progress, and level up with AI-powered learning — all in one place.
              </p>
              <div className="landing-hero-actions">
                <button className="landing-cta-btn" onClick={() => navigate('/signup')}>
                  Get Started
                  <LuArrowRight size={18} />
                </button>
                <button className="landing-secondary-btn" onClick={() => navigate('/explore')}>
                  Explore Quizzes
                </button>
              </div>
              <div className="landing-hero-stats">
                <div className="landing-stat">
                  <span className="landing-stat-num">50+</span>
                  <span className="landing-stat-label">Quizzes</span>
                </div>
                <div className="landing-stat-divider" />
                <div className="landing-stat">
                  <span className="landing-stat-num">AI</span>
                  <span className="landing-stat-label">Powered</span>
                </div>
                <div className="landing-stat-divider" />
                <div className="landing-stat">
                  <span className="landing-stat-num">100%</span>
                  <span className="landing-stat-label">Free</span>
                </div>
              </div>
            </div>
          </section>

          {/* ── Features Section ── */}
          <section className="landing-features">
            <div className="landing-features-header">
              <span className="landing-section-badge">Features</span>
              <h2>Everything you need to learn better</h2>
            </div>
            <div className="landing-features-grid">
              <div className="landing-feature-card">
                <div className="landing-feature-icon" style={{ background: 'rgba(93, 169, 255, 0.12)', color: 'var(--accent)' }}>
                  <FaBrain size={24} />
                </div>
                <h3>Smart Quizzes</h3>
                <p>Create and take intelligent quizzes that adapt to your learning pace and help you retain information better.</p>
              </div>
              <div className="landing-feature-card">
                <div className="landing-feature-icon" style={{ background: 'rgba(142, 209, 255, 0.12)', color: 'var(--accent2)' }}>
                  <FaRocket size={24} />
                </div>
                <h3>AI Chat Assistant</h3>
                <p>Get instant help from our AI assistant. Ask questions, get explanations, and deepen your understanding of any topic.</p>
              </div>
              <div className="landing-feature-card">
                <div className="landing-feature-icon" style={{ background: 'rgba(34, 197, 94, 0.12)', color: 'var(--correct)' }}>
                  <FaGraduationCap size={24} />
                </div>
                <h3>Track Progress</h3>
                <p>Monitor your performance with detailed stats, streaks, and rankings. See how you stack up against others.</p>
              </div>
            </div>
          </section>

          {/* ── CTA Section ── */}
          <section className="landing-cta-section">
            <div className="landing-cta-card">
              <h2>Ready to start learning?</h2>
              <p>Join Quizora today and unlock your full potential. It's free, fast, and fun.</p>
              <button className="landing-cta-btn" onClick={() => navigate('/signup')}>
                Get Started Now
                <LuArrowRight size={18} />
              </button>
            </div>
          </section>

          {/* ── Footer ── */}
          <footer className="landing-footer">
            <p>© {new Date().getFullYear()} Quizora. Built with ❤️ for learners everywhere.</p>
          </footer>
        </div>
      );
    }

    // ── Signed in → show dashboard ──
    return(
        <>
        <div className="notification-shell">
            <button
                ref={bellRef}
                className="notification-btn"
                onClick={() => setOpen((prev) => !prev)}
                aria-label="Toggle notifications"
                type="button"
            >
                {notifications.length === 0 ? <LuBell  size={22} /> : <LuBellDot size={22} />}
            </button>
            {open ? (
                <div ref={panelRef} className="notifications">
                    <div className="notification-header">
                        <div>
                            <p className="notification-kicker">Inbox</p>
                            <h3>{notifications.length} notification{notifications.length === 1 ? "" : "s"}</h3>
                        </div>
                        {notifications.some(n => !n.read) && (
                          <span className="notification-badge">{notifications.filter(n => !n.read).length} new</span>
                        )}
                    </div>
                    <div className="notif-divider"></div>
                    {notifications.length === 0 ? (
                        <div className="notif-empty-state">
                            <LuBell size={24} className="notif-empty-icon" />
                            <p className="notif-empty-text">You&rsquo;re all caught up!</p>
                        </div>
                    ) : (
                        <div className="notification-list">
                            {notifications.map((n) => {
                                let Icon = LuBell;
                                let iconColor = "var(--accent2)";
                                if (n.type === "success") { Icon = LuCheck; iconColor = "var(--correct)"; }
                                else if (n.type === "warning") { Icon = LuTriangleAlert; iconColor = "var(--incorrect)"; }
                                else if (n.type === "error") { Icon = LuX; iconColor = "var(--incorrect)"; }
                                else if (n.type === "info") { Icon = LuInfo; iconColor = "var(--accent2)"; }

                                return (
                                    <div key={n.id} className={`notif-item ${!n.read ? "notif-item--unread" : ""}`}>
                                        <div className="notif-icon-wrap" style={{ color: iconColor }}>
                                            <Icon size={16} />
                                        </div>
                                        <div className="notif-body">
                                            <span className="notif-msg">{n.message}</span>
                                            <span className="notif-time">{formatTimeAgo(n.timestamp)}</span>
                                        </div>
                                        {!n.read && <span className="notif-dot"></span>}
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>
            ) : null}
        </div>
        <Top/>
        <div className="home">
        <div className="dashboards">
            <div className="board" style={{
                border: '2px solid #4d4d4f43',
            }}>
                <div className="board-top"><h3>Average</h3><span style={{
                    background: 'var(--surface3)',
                }}><LuTrendingUp size="20" color="var(--accent)" /></span></div>
                <h1 style={{
                    color: 'var(--font)',
                }}>{average}%</h1>
            </div>
            <div className="board" style={{
                border: '2px solid #4d4d4f43',
            }}>
                <div className="board-top"><h3>Streaks</h3> <span style={{
                    background: 'var(--surface3)',
                }}><AiFillFire  size="20" color="var(--accent)"/></span></div>
                <h1 style={{
                    color: 'var(--font)',
                }}>2 Days</h1>
            </div>
            <div className="board" style={{
                border: '2px solid #4d4d4f43',
            }}>
                <div className="board-top"><h3>Quizes Created</h3><span style={{
                    background: 'var(--surface3)',
                }}><FaBook size="20" color="var(--accent)"/> </span></div>
                <h1 style={{
                    color: 'var(--font)',
                }}>{String(created.length)}</h1>
            </div>
            <div className="board" style={{
                border: '2px solid #4d4d4f43',
            }}>
                <div className="board-top">
                    <h3>Rankings</h3>
                    <span style={{
                        background: 'var(--surface3)',
                    }}><FaTrophy  size="20" color="var(--accent)"/></span>
                </div>
                <h1 style={{
                    color: 'var(--font)',
                }}>#1</h1>
            </div>
        </div>
        <div className="quick">
            <h3>Quick Actions <LuSparkles /></h3>
            <div className="quick-btns">
                <button onClick={() => navigate('/chat')}><span><FaRobot /></span> <h5>AI Chat</h5> </button>
                <button onClick={() => navigate('/profile')}><span><LuSettings /></span> <h5>Settings</h5></button>
                <button onClick={() => navigate('/create')}><span><LuBook /></span> <h5>Lessons</h5></button>
                <button onClick={() => navigate('/create')}><span>< LuNewspaper/></span> <h5>Quizes</h5></button>
                <button onClick={() => navigate('/explore')}><span><LuCompass /></span> <h5>Explore</h5></button>
            </div>
        </div>
        </div>
        </>
    )
}
export default Home;