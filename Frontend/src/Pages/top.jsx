import { useEffect, useState } from "react";
import prof from "../assets/prof.jpg";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useAuth } from "../config/auth-context.jsx";
import { LuCalendar } from "react-icons/lu";


function Top() {
  const { user, isSignedIn } = useAuth();
  const greets = ["Morning", "Afternoon", "Evening"];
  const [time, settime] = useState("")
  const avatar = localStorage.getItem("avatar");
  const location = useLocation();
  useEffect(() =>{
    const date =  new Date();
  const hour = date.getHours();
  
  
  if (hour >= 0 && hour < 12){
    settime(greets[0]);
  }
  else if(hour > 12 && hour < 17){
    settime(greets[1])
  }
  else{
    settime(greets[2])
  }
  }, [])
  

  return (
    <div className="tops">
      <div className="greet">
            <h2> Good {time}, <span>{user?.displayName || "Guest"}</span> </h2>
            <p style={{
              background: 'var(--accent)',
              border: '1px solid rgba(255,255,255,0.035)',
              padding: '10px 20px ',
              width: 'fit-content',
              borderRadius: '40px',
              color: 'var(--font)',
              fontSize: '0.8rem'
            }}><LuCalendar /> {new Date().toLocaleDateString('en-NG', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric'})}</p>
        </div>

      <div className="side">
        {isSignedIn ? (
          <Link to="/profile">
            <div className="profile-top">
              <img src={user.photoURL || prof } alt="Profile" />
            </div>
          </Link>
        ) : (
          <div className="top-btns">
            <Link to="/signup"><button>Log in</button></Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default Top;