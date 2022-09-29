import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";

import { User } from "phosphor-react";
import { context } from "../../context/Index";
import Style from "./Style.module.css";

export function AsideComponent() {
    // context and navigate
    const { isAsideVisible, _username } = useContext(context);
    const navigate = useNavigate();

    // navigate to the page specified
    const navigateToPage = async (page) => {
        navigate(`/${page}`, {state: _username});
    };

    return (
        <>
            <aside className={Style.aside}>
                <div>
                    <div onClick={() => navigateToPage('profile')} className={Style.icon_cotainer}>
                        <User color="tomato" size={30} />
                    </div>
                </div>
            </aside>
            <aside className={isAsideVisible ? Style.asideRV : Style.asideRI}>
                <div className={Style.asideDR}>
                    <div onClick={() => navigateToPage('profile')} className={Style.icon_cotainerR}>
                        <User color="tomato" size={30} />
                    </div>
                </div>
            </aside>
        </>
    );
}
