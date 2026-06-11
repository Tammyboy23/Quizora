import { useEffect, useState } from "react";
import prof from "../assets/prof.jpg";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";


function Top() {
  const greets = ["MORNING", "AFTERNOON", "EVENING"];
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
            <p>GOOD {time}</p>
            <h2>{ location.pathname === '/explore' ? "Hello": "Welcome"} {user || "Guest"} 👋 </h2>
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