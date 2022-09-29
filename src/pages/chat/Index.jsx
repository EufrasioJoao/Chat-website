import React from "react";

import { ChatRoomHeader } from "../../components/chatroom_header/Index";
import { AsideComponent } from "../../components/aside_component/Index";
import { MessagesContainer } from "../../components/messages_container/Index";

export function ChatRoom() {
    return (
        <div>
            <ChatRoomHeader />
            <AsideComponent />
            <MessagesContainer />
        </div>
    );
}
