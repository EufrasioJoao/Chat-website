import React from "react";

import { Header } from "../../components/header/Index";
import { AsideComponent } from "../../components/aside_component/Index";
import { RoomsContainer } from "../../components/rooms_container/Index";
import Style from "./Style.module.css";

export function JoinRoom() {
    return (
        <div>
            <Header />
            <AsideComponent />
            <RoomsContainer />
        </div>
    );
}
