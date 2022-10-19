import React, { useState, useEffect, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Style from "./Style.module.css";

export function Profile() {
    
    // useLocation, useNavigate and states
    const [userData, setUserData] = useState([]);
    const location = useLocation();
    const navigate = useNavigate();
    const [username, setUsername] = useState(location.state);


    // getting user info from the backend
    useEffect(()=>{
        fetch(`http://chat-web-app-server.herokuapp.com/api/users/info`, {
            method: "POST",
            body: JSON.stringify({username}),
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data)
                setUserData(data)
            })
            .catch((err) => console.log(err));
    }, [])
    

    // logs out the user
    const handleLogout = async ()=>{
        await localStorage.removeItem("our_chat_username");
        await localStorage.removeItem("our_chat_userimage");
        
        navigate('/login')
    }


    return (
        <div className={Style.profile}>
            <div className={Style.userinfo_container}>
                <div className={Style.profile_container}>
                    <div className={Style.profile_img_container}>
                        <img src={userData[0] && userData[0].userImage}/>
                    </div>
                    <p>{userData[0] && userData[0].username}</p>
                    <p>{userData[0] && userData[0].email}</p>
                </div>
                <div className={Style.buttons_container}>
                    <button onClick={handleLogout} className={Style.black_button}>Logout</button>
                    <button onClick={()=>navigate('/join')}>Close</button>
                </div>
            </div>
        </div>
    );
}
