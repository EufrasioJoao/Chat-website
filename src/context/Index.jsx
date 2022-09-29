import React, { createContext, useState, useEffect } from "react";

export const context = createContext(null);

export function AppContext({ children }) {

    // states
    const [isAsideVisible, setIsAsideVisible] = useState(false);
    const [isLoggedIn, setIsLoogedIn] = useState(false);
    const [_username, _setUsername] = useState("");
    const [userImg, setUserImg] = useState("");
    const [searchTerm, setSearchTerm] = useState('')
    const [chatName, setChatName] = useState("");


    // function to save user data in the localstorage
    const save_user_in_localstorage = async ({image, name}) => {
        _setUsername(name);
        setUserImg(image);
        localStorage.setItem("our_chat_username", name);
        localStorage.setItem("our_chat_userimage", image);
    };

    
    // useEffect to get user data from the localstorage
    useEffect( ()=>{
        let username = localStorage.getItem("our_chat_username");
        if (username != null) {
            setIsLoogedIn(true);
            _setUsername(username);
        } else setIsLoogedIn(false);

        let userimage = localStorage.getItem("our_chat_userimage");
        if (userimage != null) {
            setIsLoogedIn(true);
            setUserImg(userimage);
        } else setIsLoogedIn(false);
    }, [])


    // values to be shared across the context
    var contextValues = {
        chatName,
        setChatName,
        searchTerm,
        setSearchTerm,
        userImg, 
        setUserImg,
        isAsideVisible,
        setIsAsideVisible,
        isLoggedIn,
        setIsLoogedIn,
        save_user_in_localstorage,
        _username
    };


    return (
        <context.Provider value={contextValues}>{children}</context.Provider>
    );
}
