import React, { useState, useEffect, useContext, useRef } from "react";
import "./chatField.css";
import { DataContext } from "../../ContextAPI/dataContext";
import AiIcon from "../../Assets/ai-icon.png";
import QnACard from "../QnACard/qnaCard";
import generateText from "../../apis/generateText";
import extractGitCommands from "../../apis/generateGitCommands";

const ChatField = ({ handleChatSave }) => {
    const { activeConversation, setActiveConversation } = useContext(DataContext);
    const [question, setQuestion] = useState("");
    const chatFieldRef = useRef(null);
    const [isLoading, setIsLoading] = useState(false);
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

    const handleSubmit = async (e) => {
        setIsLoading(true);
        e.preventDefault();
        if (question.trim() !== "") {
            const generatedText = await generateText(question);
            console.log("Generated Text:", generatedText);
            const extractedCommands = await extractGitCommands(generatedText);
            console.log("Extracted Commands:", extractedCommands);
            const newConversation = { question: question, answer: extractedCommands, time:getTimeString() };
            console.log("New Conversation:", newConversation);
            setActiveConversation([...activeConversation, newConversation]);
            setQuestion("");
            localStorage.setItem("activeConversation", JSON.stringify([...activeConversation, newConversation]));
            setTimeout(scrollToBottom, 0);
        }
        setIsLoading(false)
    };

    const handleQuestionChange = (e) => {
        setQuestion(e.target.value);
    };

    const getTimeString = () => {
        const now = new Date();
        const hours = now.getHours();
        const minutes = now.getMinutes();
        const ampm = hours >= 12 ? "PM" : "AM";
        const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
        const formattedMinutes = minutes < 10 ? "0" + minutes : minutes;
        return `${formattedHours}:${formattedMinutes} ${ampm}`;
    };

    return (
        <div className="chat-qna-response">
            <div className="chat-field" ref={chatFieldRef}>
                <div className="app-title">Bot AI</div>
                <div className="app-hero-section">
                    <img src={AiIcon} alt="logo-ai" className="logo-ai" />
                    <div className="hero-section-text">How Can I Help You Today?</div>
                </div>
                <div className="chat-conversation-list">
                    {activeConversation.map((conversation, index) => (
                        <div key={index} className="qna-item">
                            <QnACard key={index + 1} conversation={conversation} isQuestion={true} />
                            <QnACard key={index + 2} conversation={conversation} index={index} />
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
                <button className="action-button" type="submit">{isLoading ? <div className="submit-loading"></div> :"Ask"}</button>
                <button className="action-button" type="button" onClick={handleChatSave}>Save</button>
            </form>
        </div>
    );
};

export default ChatField;
