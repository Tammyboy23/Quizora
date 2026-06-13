import { useState } from "react";
import { FaVoicemail } from "react-icons/fa6";
import { LuEye, LuMail, LuUser } from "react-icons/lu";
import { useNavigate } from "react-router-dom";

function Sign(){

    const [username, setusername] = useState("");
    const [password, setpassword] = useState("");
    const [email, setemail] = useState("");
    const navigate = useNavigate();
    const [mode, setmode] = useState("login");

    function submit(){

        localStorage.setItem("username", username);
        localStorage.setItem("email", email );
        localStorage.setItem("islogedin", "true");
        navigate("/");
    }
    return(
        <>
        <div className="sign">
            <div className="sign-top">
                <button style={{
                    background: mode === "login"? '#65659e': 'transparent',
                }} onClick={() => setmode("login")}>Login</button>
                <button  style={{
                    background: mode === "signup"? '#65659e': 'transparent',
                }} onClick={() => setmode("signup")}>Sign Up</button>
            </div>
            {mode === "login" ? (
                <div className="login">
                    <h1>LOGIN</h1>
                    <form>
                       
                        <div className="input"><LuMail /><input type="email" placeholder="Enter Email" value={email} onChange={(e) => setemail(e.target.value)}/></div>
                        <div className="input"><LuEye /><input type="password" placeholder="Enter Paswword" value={password} onChange={(e) => setpassword(e.target.value)}/></div>
                        <button onClick={submit}>LOGIN</button>
                    </form>
                </div>
            ): (
                <div className="signup">
                    <h1>Sign-UP</h1>
                    <form>
                        <div className="input"><LuUser /><input type="text" placeholder="Enter Username .." value={username} onChange={(e) => setusername(e.target.value)}/></div>
                        <div className="input"><LuMail /><input type="email" placeholder="Enter Email" value={email} onChange={(e) => setemail(e.target.value)}/></div>
                        <div className="input"><LuEye /><input type="password" placeholder="Enter Paswword" value={password} onChange={(e) => setpassword(e.target.value)}/></div>
                        <button>SIGN-UP</button>
                    </form>
                </div>
            )}
        </div>
        </>
    )
}
export default Sign;