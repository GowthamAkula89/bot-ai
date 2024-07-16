import React, {useContext, useEffect} from "react";
import "./mainContainer.css";
import { DataContext } from "../../ContextAPI/dataContext";
import ChatField from "../ChatField/chatField";
import Menu from "../Menu/menu";

import { useState } from "react";
const MainContainer = () => {
   const {activeConversation,setActiveConversation, setConversations} = useContext(DataContext); 
   const [chatIndex, setChatIndex] = useState(-1);

   useEffect (() => {
    const chatHistory = JSON.parse(localStorage.getItem("chatHistory")) || [];
    setConversations(chatHistory);
   },[setConversations])

   const handleNewChat = () => {
    if (chatIndex !== -1){
        setActiveConversation([]);
        localStorage.setItem("activeConversation",JSON.stringify([]));
        setChatIndex(-1)
    }
    else if(activeConversation.length > 0 ){
        const chatHistory = JSON.parse(localStorage.getItem("chatHistory")) || [];
        chatHistory.push(activeConversation);
        localStorage.setItem("chatHistory",JSON.stringify(chatHistory));
        setConversations(chatHistory);
        setActiveConversation([]);
        localStorage.setItem("activeConversation",JSON.stringify([]));
    }
   }

    return(
        <div className="chatbot-page">
            <Menu handleNewChat={handleNewChat} setChatIndex={setChatIndex}/>
            <ChatField handleChatSave={handleNewChat}/>
        </div>
    )
}
export default MainContainer;