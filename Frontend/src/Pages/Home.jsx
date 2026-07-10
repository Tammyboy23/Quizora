import {  AiFillFire } from "react-icons/ai";
import Top from "./top";
import {  FaChartLine, FaStackExchange, FaTrophy } from "react-icons/fa";
import { LuBell, LuBellDot } from "react-icons/lu";
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
                {notifications.length === 0 ? <LuBell color="#facc15" size={22} /> : <LuBellDot color="#facc15" size={22} />}
            </button>
            {open ? (
                <div ref={panelRef} className="notifications">
                    <div className="notification-header">
                        <div>
                            <p className="notification-kicker">Updates</p>
                            <h3>You have {notifications.length} notification{notifications.length === 1 ? "" : "s"}</h3>
                        </div>
                        <span className="notification-badge">New</span>
                    </div>
                    <div className="line"></div>
                    {notifications.length === 0 ? (
                        <p className="notification-empty">You&rsquo;re all caught up for now.</p>
                    ) : (
                        <ul className="notification-list">
                            {notifications.map((n) => (
                                <li key={n.id} className="notification-item">
                                    
                                    <span className="notification-msg">{n.message}</span>
                                    <span className="notification-time">{formatTimeAgo(n.timestamp)}</span>
                                </li>
                            ))}
                        </ul>
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
                borderTop: '2px solid #6c63ff',
            }}>
                <div className="board-top"><h3>Average</h3><span style={{
                    background: '#22213d',
                }}><FaChartLine size="20" color="#6c63ff" /></span></div>
                <h1 style={{
                    color: '#6c63ff',
                }}>{average}%</h1>
            </div>
            <div className="board" style={{
                border: '2px solid #4d4d4f43',
                borderTop: '2px solid #f87171'
            }}>
                <div className="board-top"><h3>Streaks</h3> <span style={{
                    background: '#32222a',
                }}><AiFillFire  size="20" color="#f87171"/></span></div>
                <h1 style={{
                    color: '#f87171',
                }}>2 Days</h1>
            </div>
            <div className="board" style={{
                border: '2px solid #4d4d4f43',
                borderTop: `2px solid hsl(150, 100%, 47%)`
            }}>
                <div className="board-top"><h3>Quizes Created</h3><span style={{
                    background: '#182c2c',
                }}><FaStackExchange size="20" color="hsl(150, 100%, 47%)"/> </span></div>
                <h1 style={{
                    color: 'hsl(150, 100%, 47%)',
                }}>{String(created.length)} Qz</h1>
            </div>
            <div className="board" style={{
                border: '2px solid #4d4d4f43',
                borderTop: '2px solid orange'
            }}>
                <div className="board-top">
                    <h3>Rankings</h3>
                    <span style={{
                        background: '#332b1f',
                    }}><FaTrophy  size="20" color="orange"/></span>
                </div>
                <h1 style={{
                    color: 'orange',
                }}>#1</h1>
            </div>
        </div>
        </div>
        </>
    )
}
export default Home;