import { useNavigate } from "react-router-dom";
import Style from "./Style.module.css";

export function Card({ imgUrl, subs, members, title, desc, roomName }) {
    // navigate
    const navigate = useNavigate();

    
    // navigate to the room specified
    const navigateToRoom = async (room) => {
        navigate(`/room`, {state: room});
    };

    return (
        <div className={Style.card}>
            <div className={Style.card_header}>
                <div className={Style.card_img_container}>
                    <img alt="room logo" src={imgUrl}></img>
                </div>
                <div className={Style.card_header_column_container}>
                    <div>{subs}M Subscribers</div>
                    <div>{members}K Members</div>
                </div>
            </div>
            <div className={Style.card_content}>
                <span className={Style.card_title}>{title}</span>
                <span className={Style.card_description}>{desc}</span>
                <button onClick={() => navigateToRoom(roomName)}>JOIN</button>
            </div>
        </div>
    );
}
