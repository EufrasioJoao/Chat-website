import React, { useState, useContext } from "react";
import {useNavigate} from 'react-router-dom'
import {context} from "../../context/Index";
import Style from "./Style.module.css";

export function Login() {

    // context, useNavigate and states
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [serverMsg, setServerMsg] = useState("");
    const navigate = useNavigate();
    const {save_user_in_localstorage} = useContext(context);


    // function to submit the values to login a user
    const handleSubmit = async (event) => {
        event.preventDefault();

        fetch(`http://localhost:3001/api/users/login`, {
            method: "POST",
            body: JSON.stringify({username, password}),
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                setServerMsg(data.message)
                if(data.succes === true){
                    // calling the function to save users in the localstorage
                    save_user_in_localstorage({image: data.userImage, name: data.username})
                    
                    //navigate to the join page
                    navigate(`/join`)
                }
            })
            .catch((err) => console.log(err));
    };


    return (
        <div className={Style.register}>
            <form onSubmit={(e) => handleSubmit(e)} className={Style.register_container}>
                <div className={Style.form_container}>
                    <span>Login</span>
                    <small>Username</small>
                    <input
                        type="text"
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <small>Password</small>
                    <input
                        type="text"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <p>{serverMsg}</p>
                    <button>Continue</button>
                    <a href="/register">Don't have and account?</a>
                </div>
            </form>
        </div>
    );
}
