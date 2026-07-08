import { useEffect, useState } from "react";
import prof from "../assets/prof.jpg";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";


function Top() {
  const greets = ["Morning", "Afternoon", "Evening"];
  const [time, settime] = useState("")
  const [loggedIn] = useState(localStorage.getItem("islogedin") === "true");
  const avatar = localStorage.getItem("avatar");
  const user = localStorage.getItem("username");
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
            <h2> Good {time},  {user || "Guest"} </h2>
            <p style={{
              background: `rgb(29, 20, 63)`,
              border: '1px solid var(--accent)',
              padding: '10px 20px ',
              width: 'fit-content',
              borderRadius: '40px',
              color: '#7b7a7a',
              fontSize: '0.8rem'
            }}>{new Date().toLocaleDateString('en-NG', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric'})}</p>
        </div>

      <div className="side">
        {loggedIn ? (
          <Link to="/profile">
            <div className="profile-top">
              <img src={avatar || prof } alt="Profile" />
            </div>
          </Link>
        ) : (
          <div className="top-btns">
            <Link to="/signup"><button>Login</button></Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default Top;