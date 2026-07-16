import { BrowserRouter, Routes ,Route} from "react-router-dom";
import { useState } from "react";
import Home from "./Pages/Home";
import Page from "./Pages/Page";
import NavBar from "./Pages/NavBar";
import Explore from "./Pages/Explore";
import Sign from "./Pages/SignUp";
import Profile from "./Pages/Profile";
import EditProfile from "./Pages/EditProfile";
import Create from "./Pages/Create";
import { Toaster } from "react-hot-toast";
import Note from "./Pages/Note";
import Chat from "./Pages/Chat";

function App(){
    const [hideNav, setHideNav] = useState(false);

    return(
        <>
        <BrowserRouter>
        <div className="layout">
        <NavBar hidden={hideNav} />
        <main className="content">
            <Toaster />
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/note/:id" element={<Note/>}/>
            <Route path="/explore" element={<Explore/>}/>
            <Route path="/quiz/:id" element={<Page onQuizModeChange={setHideNav} />}/>
            <Route path="/signup" element={<Sign/>}/>
            <Route path="/profile" element={<Profile />}/>
            <Route path="/profile/edit" element={<EditProfile />}/>
            <Route path="/create" element={<Create />} />
            <Route path="/chat" element={<Chat />} />
        </Routes>
        </main>
        </div>

        </BrowserRouter>
        </>
    )
}
export default App;