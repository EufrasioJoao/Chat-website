import React, { useContext } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import { JoinRoom } from "../pages/join/Index";
import { ChatRoom } from "../pages/chat/Index";
import { Register } from "../pages/register/Index";
import { Login } from "../pages/login/Index";
import { Profile } from "../pages/profile/Index";
import {context} from "../context/Index";

export function Router() {
    const {isLoggedIn} = useContext(context);

    // function to check if user is logged in
    let check_loggedIn = () =>{
        if(isLoggedIn){
            return <Route path="/" element={<JoinRoom />} />
        }
        if(!isLoggedIn){
            return <Route path="/" element={<Login />} />
        }
    }
    
    return (
        <div>
            <BrowserRouter>
                <Routes>
                    {check_loggedIn()} 
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/join" element={<JoinRoom />} />
                    <Route path="/room" element={<ChatRoom />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}
