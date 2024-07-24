import React, { useState } from "react";
import "./menu.css";
import AiIcon from "../../Assets/ai-icon.png";
import EditIcon from "../../Assets/edit.png";
//import { DataContext } from "../../ContextAPI/dataContext";
import { RiDeleteBinFill } from "react-icons/ri";
import { setActiveConversation, deleteConversation, clearActiveConversation } from "../../redux/Reducers/chatReducer";
import { useSelector, useDispatch } from "react-redux";

const Menu = ({ handleNewChat, setChatIndex }) => {
    //const {activeConversation, setActiveConversation, conversations, setConversations } = useContext(DataContext);
    const activeConversation = useSelector((state) => state.chat.activeConversation);
    const conversations = useSelector((state) => state.chat.conversations);
    const dispatch = useDispatch();
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    const handleChat = (index) => {
        return () => {
            dispatch(setActiveConversation(conversations[index]));
            localStorage.setItem("activeConversation",JSON.stringify(activeConversation));
            setChatIndex(index);
            setMenuOpen(false);
        };
    };
    
    const handleDelete = (index) => {
        dispatch(deleteConversation(index));
        localStorage.setItem("chatHistory", JSON.stringify(conversations));
        dispatch(clearActiveConversation());
        localStorage.setItem("activeConversation", JSON.stringify([]));
    }

    const handleNewChatAction = () => {
        handleNewChat()
        setMenuOpen(false);
    }

    return (
        <div className="menu-bar-container">
            <div className="menu">
                <div className="new-chat-btn" onClick={handleNewChatAction}>
                    <img style={{ width: "32px", height: "32px" }} src={AiIcon} alt="img" />
                    <div className="new-chat-text">New Chat</div>
                    <img className="edit-icon" src={EditIcon} alt="" />
                </div>
                <div className="conversation-list">
                    {conversations.map((conversation, index) => (
                        <div key={index} className="conversation-item">
                            <div 
                                style={{cursor:"pointer"}} 
                                onClick={handleChat(index)}>
                                Conversation {index + 1}
                            </div>
                            <RiDeleteBinFill 
                                style={{cursor:"pointer"}} 
                                onClick={() => handleDelete(index)}/>
                        </div>
                    ))}
                </div>
            </div>
            <div className="menu-mobile-screen">
                <div className="menu-navbar">
                    <div className="menu-icon" onClick={toggleMenu}>
                        <div className="bar"></div>
                        <div className="bar"></div>
                        <div className="bar"></div>
                    </div>
                    <div className="app-title">Bot AI</div>
                </div>
                {menuOpen && (
                    <div className="menu-mobile-view">
                        <div className="new-chat-btn" onClick={handleNewChatAction}>
                            <img style={{ width: "32px", height: "32px" }} src={AiIcon} alt="img" />
                            <div className="new-chat-text">New Chat</div>
                            <img className="edit-icon" src={EditIcon} alt="" />
                        </div>
                        <div className="conversation-list">
                            {conversations.map((conversation, index) => (
                                <div key={index} className="conversation-item">
                                    <div className="" style={{cursor:"pointer"}} onClick={handleChat(index)}>
                                        Conversation {index + 1}
                                    </div>
                                    <RiDeleteBinFill style={{cursor:"pointer"}} onClick={() => handleDelete(index)}/>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Menu;
