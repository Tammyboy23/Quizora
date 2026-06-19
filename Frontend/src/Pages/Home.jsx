import {  AiFillFire } from "react-icons/ai";
import Top from "./top";
import {  FaChartLine, FaStackExchange, FaTrophy } from "react-icons/fa";
import { FaMagnifyingGlass, FaStopwatch } from "react-icons/fa6";
import { LuBell, LuBellDot } from "react-icons/lu";
import { useEffect, useRef, useState } from "react";

function Home(){
    const average = Number(localStorage.getItem("average") || 0);
    const notifications = [];
    const [open, setOpen] = useState(false);
    const bellRef = useRef(null);
    const panelRef = useRef(null);

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
                        <p className="notification-empty">You’re all caught up for now.</p>
                    ) : (
                        <ul className="notification-list">
                            {notifications.map((i) => {
                                <li key={i.id}>i</li>
                            })}
                        </ul>
                    )}
                </div>
            ) : null}
        </div>
       
        <Top/>
        <div className="home">
        <div className="dashboards">
            <div className="board" style={{
                borderTop: '4px solid blue'
            }}>
                <div className="board-top"><h3>Average</h3><span style={{
                    background: 'hsl(205, 14%, 53%)',
                }}><FaChartLine size="20" color="blue" /></span></div>
                <h1 style={{
                    color: average > 80 ? 'green' : average > 50 ? 'orange' :  average > 30 ? 'yellow' : 'red',
                }}>{average}%</h1>
            </div>
            <div className="board" style={{
                borderTop: '4px solid red'
            }}>
                <div className="board-top"><h3>Streaks</h3> <span style={{
                    background: 'hsl(0, 12%, 48%)',
                }}><AiFillFire  size="20" color="red"/></span></div>
                <h1>2 Days</h1>
            </div>
            <div className="board" style={{
                borderTop: `4px solid hsl(150, 100%, 47%)`
            }}>
                <div className="board-top"><h3>Quizes Taken</h3><span style={{
                    background: 'hsl(120, 11%, 44%)',
                }}><FaStackExchange size="20" color="hsl(150, 100%, 47%)"/> </span></div>
                <h1>10 Qz</h1>
            </div>
            <div className="board" style={{
                borderTop: '4px solid orange'
            }}>
                <div className="board-top">
                    <h3>Rankings</h3>
                    <span style={{
                        background: '#91907b',
                    }}><FaTrophy  size="20" color="orange"/></span>
                </div>
                <h1>#1</h1>
            </div>
        </div>
        </div>
        </>
    )
}
export default Home;