import React, { useState, useContext } from "react";
import { context } from "../../context/Index";
import { List, X } from "phosphor-react";
import Style from "./Style.module.css";

export function Header() {
    // context and states
    const [showSearch, setShowSearch] = useState(false);
    const [showAside, setShowAside] = useState(false);
    const { isAsideVisible, setIsAsideVisible, searchTerm, setSearchTerm } = useContext(context);

    return (
        <header className={Style.header}>
            <nav>
                <div className={Style.logo_box}>
                    {!isAsideVisible ? (
                        <List
                            onClick={() => setIsAsideVisible(true)}
                            className={Style.menu_icon}
                            color="tomato"
                            size={30}
                        />
                    ) : (
                        <X
                            onClick={() => setIsAsideVisible(false)}
                            className={Style.menu_icon}
                            color="tomato"
                            size={30}
                        />
                        )}
                    <div className={showSearch ? Style.logoN : Style.logo}>
                        Our Chat <small>inspired by <a href='/' target='_blank'>Yubter</a></small>
                    </div>
                </div>
                {showSearch ? (
                    <div className={Style.input_container}>
                        <input type="text" placeholder="search here"   onChange={(e)=>setSearchTerm(e.target.value)}></input>
                        <div className={Style.iconX}>
                            <X
                                onClick={() => {
                                    setSearchTerm('')
                                    setShowSearch(!showSearch)
                                }}
                                color="#bbb"
                                size={30}
                            />
                        </div>
                    </div>
                ) : (
                    <img
                        onClick={() => {setShowSearch(!showSearch)}}
                        className={Style.search_img}
                        alt="menu"
                        src="/assets/images/search.png"
                    ></img>
                )}
            </nav>
        </header>
    );
}
