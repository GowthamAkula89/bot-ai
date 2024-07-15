import React, { useState, useEffect, useContext, useRef } from "react";
import "./chatField.css";
import { DataContext } from "../../ContextAPI/dataContext";
import AiIcon from "../../Assets/ai-icon.png";
import QnACard from "../QnACard/qnaCard";

const ChatField = ({ handleChatSave }) => {
    const { activeConversation, setActiveConversation } = useContext(DataContext);
    const [question, setQuestion] = useState("");
    const conversationData = require("../../Data/chatConversations.json");
    
    const chatFieldRef = useRef(null);

    useEffect(() => {
        const savedActiveConversation = JSON.parse(localStorage.getItem("activeConversation")) || [];
        setActiveConversation(savedActiveConversation);
        setTimeout(scrollToBottom, 0);
    }, [setActiveConversation]);

    useEffect(() => {
        scrollToBottom();
    }, [activeConversation]);

    const scrollToBottom = () => {
        if (chatFieldRef.current) {
            chatFieldRef.current.scrollTop = chatFieldRef.current.scrollHeight;
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (question.trim() !== "") {
            let answer = conversationData.find((que) => que.question.toLowerCase() === question.toLowerCase()) || null;
            if (answer === null) {
                answer = conversationData.find((que) => que.question.toLowerCase().includes(question.toLowerCase())) || { response: "Add some more details to understand" };
            }
            const newConversation = { question: question, answer: answer.response, rating : 0, feedback : ""};
            setActiveConversation([...activeConversation, newConversation]);
            setQuestion("");
            localStorage.setItem("activeConversation", JSON.stringify([...activeConversation, newConversation]));
            setTimeout(scrollToBottom, 0);
        }
    };

    const handleQuestionChange = (e) => {
        setQuestion(e.target.value);
    };
    
    
    return (
        <div className="chat-qna-response">
            <div className="chat-field" ref={chatFieldRef}>
                <div className="app-title">Bot AI</div>
                <div className="app-hero-section">
                    <img src={AiIcon} alt="logo-ai" className="logo-ai"/>
                    <div className="hero-section-text">How Can I Help You Today?</div>
                    
                </div>
                <div className="chat-conversation-list">
                    {activeConversation.map((conversation, index) => (
                        <div key={index} className="qna-item">
                                <QnACard key={index + 1} question={conversation.question} isQuestion={true} />
                                <QnACard 
                                    key={index + 2} 
                                    answer={conversation.answer} 
                                    index={index} 
                                />
                        </div>
                    ))}
                </div>
            </div>
            <form className="input-field" onSubmit={handleSubmit}>
                <input
                    className="input-value"
                    type="text"
                    placeholder="Message BOT AI"
                    value={question}
                    onChange={handleQuestionChange}
                />
                <button className="action-button" type="submit">Ask</button>
                <button className="action-button" type="button" onClick={handleChatSave}>Save</button>
            </form>
        </div>
    );
};

export default ChatField;
