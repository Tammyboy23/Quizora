import {  AiFillFire } from "react-icons/ai";
import Top from "./top";
import {  FaBook, FaChartLine, FaStackExchange, FaTrophy } from "react-icons/fa";
import { LuBell, LuBellDot, LuCheck, LuTriangleAlert, LuInfo, LuX, LuTrendingUp } from "react-icons/lu";
import { useEffect, useRef, useState } from "react";
import { getNotifications, markAllAsRead } from "../utils/notifications";

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
       <div className="explore-eyebrow">Dashboard</div>
        <Top/>
        <div className="home">
        <div className="dashboards">
            <div className="board" style={{
                border: '2px solid #4d4d4f43',
                borderTop: '2px solid var(--accent)',
            }}>
                <div className="board-top"><h3>Average</h3><span style={{
                    background: 'var(--surface3)',
                }}><LuTrendingUp size="20" color="var(--accent)" /></span></div>
                <h1 style={{
                    color: 'var(--accent)',
                }}>{average}%</h1>
            </div>
            <div className="board" style={{
                border: '2px solid #4d4d4f43',
                borderTop: '2px solid var(--accent)'
            }}>
                <div className="board-top"><h3>Streaks</h3> <span style={{
                    background: 'var(--surface3)',
                }}><AiFillFire  size="20" color="var(--accent)"/></span></div>
                <h1 style={{
                    color: 'var(--accent)',
                }}>2 Days</h1>
            </div>
            <div className="board" style={{
                border: '2px solid #4d4d4f43',
                borderTop: `2px solid var(--accent)`
            }}>
                <div className="board-top"><h3>Quizes Created</h3><span style={{
                    background: 'var(--surface3)',
                }}><FaBook size="20" color="var(--accent)"/> </span></div>
                <h1 style={{
                    color: 'var(--accent)',
                }}>{String(created.length)} Qz</h1>
            </div>
            <div className="board" style={{
                border: '2px solid #4d4d4f43',
                borderTop: '2px solid var(--accent)'
            }}>
                <div className="board-top">
                    <h3>Rankings</h3>
                    <span style={{
                        background: 'var(--surface3)',
                    }}><FaTrophy  size="20" color="var(--accent)"/></span>
                </div>
                <h1 style={{
                    color: 'var(--accent)',
                }}>#1</h1>
            </div>
        </div>
        </div>
        </>
    )
}
export default Home;