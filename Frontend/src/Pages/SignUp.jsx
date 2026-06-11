import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Sign(){
    const [username, setusername] = useState("");
    const [password, setpassword] = useState("");
    const [email, setemail] = useState("");
    const navigate = useNavigate();

    function submit(){
        localStorage.setItem("username", username);
        localStorage.setItem("email", email );
        localStorage.setItem("islogedin", "true");
        navigate("/");
    }
    return(
        <>
        <div className="sign">
            <h1>Sign Up</h1>
            <div className="form">
                <input type="text" value={username} onChange={(e) => setusername(e.target.value)}placeholder="Enter Username" required/>
                <input type="text" value={email} onChange={(e) => setemail(e.target.value)}placeholder="Enter email" required/>
                <input type="password" value={password} onChange={(e) => setpassword(e.target.value)} placeholder="Enter Password" required/>
                <button type="submit" onClick={submit}>Submit</button>
            </div>
        </div>
        </>
    )
}
export default Sign;