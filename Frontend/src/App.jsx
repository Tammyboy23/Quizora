import { BrowserRouter, Routes ,Route} from "react-router-dom";
import { useState } from "react";
import Home from "./Pages/Home";
import Page from "./Pages/Page";
import NavBar from "./Pages/NavBar";
import Explore from "./Pages/Explore";
import Sign from "./Pages/SignUp";
import Profile from "./Pages/Profile";
import Create from "./Pages/Create";

function App(){
    const [hideNav, setHideNav] = useState(false);

    return(
        <>
        <BrowserRouter>
        <div className="layout">
        <NavBar hidden={hideNav} />
        <main className="content">
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/explore" element={<Explore/>}/>
            <Route path="/quiz/:id" element={<Page onQuizModeChange={setHideNav} />}/>
            <Route path="/signup" element={<Sign/>}/>
            <Route path="/profile" element={<Profile />}/>
            <Route path="/create" element={<Create />} />
        </Routes>
        </main>
        </div>

        </BrowserRouter>
        </>
    )
}
export default App;