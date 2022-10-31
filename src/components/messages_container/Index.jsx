import React, { useContext, useState, useEffect } from "react";
import { context } from "../../context/Index";
import { useLocation } from "react-router-dom";
import Style from "./Style.module.css";

import io from "socket.io-client";
const socket = io("https://chat-web-app-server.herokuapp.com", {transports: ['websocket']});

export function MessagesContainer() {

    // context, useLocaton and states
    const { _username, userImg, setChatName } = useContext(context);
    const location = useLocation();
    const [currentRoom, setCurrentRoom] = useState(location.state)
    const [input, setInput] = useState('')
    const [allow_to_send, setAllow_to_send] = useState(true)
    const [messageList, setMessageList] = useState([])
    
    
    // useEffect to get messages from this current room
    useEffect(()=>{
        fetch(`https://chat-web-app-server.herokuapp.com/api/messages`, {
            method: "POST",
            body: JSON.stringify({roomName: currentRoom}),
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((res) => res.json())
            .then((data) => {
                if(data.result){
                    setChatName(data.result[0].roomName);
                    setMessageList(data.result)
                }else{
                    setMessageList([])
                }
            })
            .catch((err) => console.log(err));
    }, [])
    

    // useEffect to join current room
    useEffect(()=>{
            socket.emit('join_room', currentRoom)
    }, [])

    
    // useEffect to receive messages from the backend
    useEffect(()=>{
            socket.emit('join_room', currentRoom) //also joining room in case it didn't

            
            socket.on('receive_message', (data)=>{
                // when the event above its called, we fetch data to our api to get all messages
                fetch(`https://chat-web-app-server.herokuapp.com/api/messages`, {
                    method: "POST",
                    body: JSON.stringify({roomName: currentRoom}),
                    headers: {"Content-Type": "application/json"},
                })
                .then((res) => res.json())
                .then((data) => {
                    if(data.result){
                        setMessageList(data.result)
                    }else{
                        setMessageList([])
                    }
                })
                .catch((err) => console.log(err));
            })
    }, [socket])
    


    // send message to backend and emiting send_message event
    const sendMessage = async ()=>{
        if (input != "") {
            const messageData = {
                room: currentRoom,
                author: _username,
                message: input,
                authorImage: userImg,
            }

            await socket.emit("send_message", messageData)
            setInput('')
        }
    }
    return (
        <section className={Style.messages_container}>
            <div className={Style.messages_box}>
                {messageList.map((message)=>{
                    return (
                        <div key={message.id} className={Style.message_row}>
                            <div className={Style.img_container}>
                                <img src={message.authorImage} />
                            </div>
                            <div className={Style.message_content}>
                                <div>
                                    <span className={Style.message_owner}>{message.author}</span>
                                    <span className={Style.message_text}>{message.time}</span>
                                </div>
                                <span className={Style.message_text}>{message.message}</span>
                            </div>
                        </div>
                    )
                })}
            </div>


            <div className={Style.message_input_container}>
                <div className={Style.message_input_box}>
                    <input value={input} type="text" placeholder="Enter your message" onChange={(e)=>setInput(e.target.value)} onKeyPress={(e)=>{e.key === 'Enter' && sendMessage()}}/>
                    
                    <div onClick={sendMessage}>
                        <img src="/assets/images/send.png" alt="" />
                    </div>
                </div>
            </div>
        </section>
    );
}
