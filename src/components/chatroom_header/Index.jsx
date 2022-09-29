import React, { useState, useContext } from "react";
import { context } from "../../context/Index";
import { List, X } from "phosphor-react";
import Style from "./Style.module.css";

export function ChatRoomHeader() {
    // context 
    const { isAsideVisible, chatName, setIsAsideVisible } = useContext(context);

    return (
        <header className={Style.header}>
            <nav>
                <div className={Style.logo_box}>
                    {!isAsideVisible ? (
                        <List
                            onClick={() => setIsAsideVisible(true)}
                            color="tomato"
                            size={32}
                            className={Style.IconImg}
                        />
                    ) : (
                        <X
                            onClick={() => setIsAsideVisible(false)}
                            color="tomato"
                            size={32}
                            className={Style.IconImg}
                        />
                    )}
                    <div className={Style.logo}>{chatName}</div>
                </div>
            </nav>
        </header>
    );
}
