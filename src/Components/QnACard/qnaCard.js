import React from "react";
import "./qnaCard.css";
import UserIcon from "../../Assets/user-icon.png";
import AiIcon from "../../Assets/ai-icon.png";
const QnACard = ({ question, partialResponse, conversation, isQuestion, active }) => {
    const cleanCommand = (command) => {
        return command.replace(/[^\w\s.]/g, '').trim();
    };

    return (
        <div className="qna-card">
            <img src={isQuestion ? UserIcon : AiIcon} alt="" className="chat-type-logo" />
            <div className="qna-section">
                <div className="qna-user">{isQuestion ? "You" : "Bot AI"}</div>
                <div className="qna-res">
                    {active ? (isQuestion ? question : partialResponse) : (isQuestion ? conversation.question : conversation.answer.map((command, idx) => (
                        <p key={idx}>{cleanCommand(command)}</p>
                    )))}
                </div>
                <div className="qna-date">{active ? new Date().toLocaleTimeString() : conversation.time}</div>
            </div>
        </div>
    );
};

export default QnACard;
