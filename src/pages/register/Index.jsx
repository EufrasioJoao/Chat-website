import React, { useState, useContext } from "react";
import {useNavigate} from 'react-router-dom'
import Style from "./Style.module.css";
import {context} from "../../context/Index";

export function Register() {
    
    // context, useNavigate and states
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [gender, setGender] = useState("masculin");
    const [serverMsg, setServerMsg] = useState("");
    const navigate = useNavigate();
    const {save_user_in_localstorage} = useContext(context);


    // function to submit the values to login a user
    const handleSubmit = async (event) => {
        event.preventDefault();

        // values to be submited
        const uploadDataObject = {
            email,
            username,
            gender,
            password,
            userImage: gender == 'masculin' ? `/assets/images/m${Math.floor(Math.random()* 9)}.jpg` : `/assets/images/w${Math.floor(Math.random()* 4)}.jpg`
        };


        fetch(`http://chat-web-app-server.herokuapp.com/api/users/register`, {
            method: "POST",
            body: JSON.stringify(uploadDataObject),
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((res) => res.json())
            .then((data) => {
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
            <form
                onSubmit={(e) => handleSubmit(e)}
                className={Style.register_container}
            >
                <div className={Style.form_container}>
                    <span>Register</span>
                    <small>Email</small>
                    <input
                        type="text"
                        onChange={(e) => setEmail(e.target.value)}
                    />
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
                    <small>Gender</small>
                    <select
                        name=""
                        value={gender}
                        id="select"
                        onChange={(e) => setGender(e.target.value)}
                    >
                        <option value="masculin">Masculin</option>
                        <option value="femenin">Femenin</option>
                    </select>
                    <p>{serverMsg}</p>
                    <button>Continue</button>
                    <a href="/login">Already have and account?</a>
                </div>
            </form>
        </div>
    );
}
