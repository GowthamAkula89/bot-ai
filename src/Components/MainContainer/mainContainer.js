import React, {useContext, useEffect} from "react";
import "./mainContainer.css";
import { DataContext } from "../../ContextAPI/dataContext";
import ChatField from "../ChatField/chatField";
import { useState } from "react";
const MainContainer = () => {
   const {activeConversation, setConversations} = useContext(DataContext); 
   const [chatIndex, setChatIndex] = useState(-1);

   useEffect (() => {
    const chatHistory = JSON.parse(localStorage.getItem("chatHistory")) || [];
    setConversations(chatHistory);
   },[setConversations])

   const handleChatSave = () => {
    if(chatIndex !== -1){
        const chatHistory = JSON.parse(localStorage.getItem("chatHistory"))
        chatHistory[chatIndex] = activeConversation;
        console.log("chatHistory",chatHistory)
        localStorage.setItem("chatHistory",JSON.stringify(chatHistory));
        setConversations(chatHistory);
    }  
   }
    return(
        <div className="chatbot-page">
            <ChatField handleChatSave={handleChatSave}/>
        </div>
    )
}
export default MainContainer;