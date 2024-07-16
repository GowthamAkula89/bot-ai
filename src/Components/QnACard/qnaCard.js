import React from "react";
import "./qnaCard.css";
import UserIcon from "../../Assets/user-icon.png";
import AiIcon from "../../Assets/ai-icon.png";

const QnACard = ({ conversation, isQuestion, }) => {
    const cleanCommand = (command) => {
        return command.replace(/[^a-zA-Z\s]/g, '').trim();
    };
    return (
        <div className="qna-card">
            <img src={isQuestion ? UserIcon : AiIcon} alt="" className="chat-type-logo"/>
            <div className="qna-section">
                <div className="qna-user">{isQuestion ? "You" : "Bot AI"}</div>
                <div className="qna-res">{isQuestion ? conversation.question : 
                conversation.answer.map((command, idx) => (
                    <p key={idx}>{cleanCommand(command)}</p>
                ))}
                </div>
                <div className="qna-date">{conversation.time}</div>
            </div>
        </div>
    );
};

export default QnACard;
