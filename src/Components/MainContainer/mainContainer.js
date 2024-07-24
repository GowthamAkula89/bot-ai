import React, {useEffect, useState} from "react";
import "./mainContainer.css";
//import { DataContext } from "../../ContextAPI/dataContext";
import { useSelector, useDispatch } from "react-redux";
import { setConversations, clearActiveConversation, updateConversationItem } from "../../redux/Reducers/chatReducer";
import ChatField from "../ChatField/chatField";
import Menu from "../Menu/menu";

const MainContainer = () => {

    const dispatch = useDispatch();
    const activeConversation = useSelector((state) => state.chat.activeConversation);
    const [chatIndex, setChatIndex] = useState(-1);
    //const conversations = useSelector((state) => state.chat.conversations)
    //const {activeConversation,setActiveConversation, setConversations} = useContext(DataContext); 
    //const [chatIndex, setChatIndex] = useState(-1);
    // console.log("Main Container active conversation", activeConversation)
    useEffect (() => {
        const chatHistory = JSON.parse(localStorage.getItem("chatHistory")) || [];
        dispatch(setConversations(chatHistory))
    },[dispatch])

    const handleNewChat = () => {
        const chatHistory = JSON.parse(localStorage.getItem("chatHistory")) || [];
        if(chatIndex !== -1){
            dispatch(updateConversationItem({ index: chatIndex, updatedConversation: activeConversation }));
            chatHistory[chatIndex] = activeConversation;
        }
        else if(activeConversation.length > 0 ){
            chatHistory.push(activeConversation);
            dispatch(setConversations(chatHistory));
        }
        dispatch(clearActiveConversation())
        localStorage.setItem("chatHistory",JSON.stringify(chatHistory));
        localStorage.setItem("activeConversation",JSON.stringify([]));
    }

    return(
        <div className="chatbot-page">
            <Menu handleNewChat={handleNewChat} setChatIndex={setChatIndex}/>
            <ChatField handleChatSave={handleNewChat}/>
        </div>
    )
}
export default MainContainer;