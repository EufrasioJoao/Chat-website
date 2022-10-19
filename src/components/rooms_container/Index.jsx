import React, { useEffect, useState, useContext } from "react";
import { context } from "../../context/Index";
import { Card } from "../card/Index";
import Style from "./Style.module.css";

export function RoomsContainer() {
    // context and states
    const [rooms, setRooms] = useState([])
    const { searchTerm, setSearchTerm } = useContext(context);
    
    
    // useEffect to get all rooms 
    useEffect(()=>{
        fetch(`https://chat-web-app-server.herokuapp.com/api/rooms`)
            .then((res) => res.json())
            .then((data) => {
                setRooms(data)
            })
            .catch((err) => console.log(err));
        }, [])

    return (
        <section className={Style.rooms_container}>
            <div className={Style.rooms_box}>
                {
                    // filtering the array of rooms to get the room that has the name provided
                    rooms.filter((room)=>{
                        if (searchTerm === '') { /* if there was not found any room with the values provided */
                            return(
                                <div key={room.id} className={Style.card_container}>
                                    <Card
                                        imgUrl={room.imageUrl}
                                        subs={room.subscribers}
                                        members={room.members}
                                        title={room.roomName}
                                        desc={room.description}
                                        roomName={room.roomName}
                                        />
                                </div>
                            )
                        }

                        // if there was found any room with the values provided
                        else if(room.roomName.toLowerCase().includes(searchTerm.toLowerCase())){
                            return(
                                <div key={room.id} className={Style.card_container}>
                                    <Card
                                        imgUrl={room.imageUrl}
                                        subs={room.subscribers}
                                        members={room.members}
                                        title={room.roomName}
                                        desc={room.description}
                                        roomName={room.roomName}
                                    />
                                </div>
                            )
                        }
                    }).map((room)=>{ /* maping through the array filtered */
                        return(
                            <div key={room.id} className={Style.card_container}>
                                <Card
                                    imgUrl={room.imageUrl}
                                    subs={room.subscribers}
                                    members={room.members}
                                    title={room.roomName}
                                    desc={room.description}
                                    roomName={room.roomName}
                                />
                            </div>
                        )
                    })
                }
            </div>
        </section>
    );
}
