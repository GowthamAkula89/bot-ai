import React, { useState, useEffect, useContext, useRef } from "react";
import "./chatField.css";
import { DataContext } from "../../ContextAPI/dataContext";
import AiIcon from "../../Assets/ai-icon.png";
import QnACard from "../QnACard/qnaCard";
import { HfInference } from "@huggingface/inference";

const ChatField = ({ handleChatSave }) => {
    const { activeConversation, setActiveConversation } = useContext(DataContext);
    const [question, setQuestion] = useState("");
    const chatFieldRef = useRef(null);
    const [isLoading, setIsLoading] = useState(false);
    const [partialResponse, setPartialResponse] = useState("");
    const [isQuestionAsked, setIsQuestionAsked] = useState(false);
    const [activeQuestion, setActiveQuestion] = useState("");

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

    const generateText = async (question) => {
        const inference = new HfInference("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");
        let fullResponse = "";

        for await (const chunk of inference.chatCompletionStream({
            model: "meta-llama/Meta-Llama-3-8B-Instruct",
            messages: [{ role: "user", content: question }],
            max_tokens: 500,
        })) {
            const content = chunk.choices[0]?.delta?.content || "";
            fullResponse += content;
            setPartialResponse(fullResponse.trim());
            scrollToBottom();
        }
        return fullResponse.trim().split('\n');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setActiveQuestion(question);
        setIsQuestionAsked(true);
        setIsLoading(true);
        const generatedText = await generateText(question);
        //Making Chat update and reponse as expected
        setIsQuestionAsked(false);
        setActiveQuestion("");
        const newConversation = { question: question, answer: generatedText, time: getTimeString() };
        console.log("New Conversation:", newConversation);
        setActiveConversation([...activeConversation, newConversation]);
        setQuestion("");
        setPartialResponse("")
        localStorage.setItem("activeConversation", JSON.stringify([...activeConversation, newConversation]));
        setIsLoading(false);
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
                            <QnACard key={`q-${index}`} conversation={conversation} isQuestion={true} />
                            <QnACard key={`a-${index}`} conversation={conversation} isQuestion={false} />
                        </div>
                    ))}
                    {isQuestionAsked && (
                        <>
                            <QnACard key="active-question" question={activeQuestion} isQuestion={true} active={true} />
                            <QnACard key="active-answer" partialResponse={partialResponse} isQuestion={false} active={true} />
                        </>
                    )}
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
                <button className="action-button" type="submit">{isLoading ? <div className="submit-loading"></div> : "Ask"}</button>
                <button className="action-button" type="button" onClick={handleChatSave}>Save</button>
            </form>
        </div>
    );
};

export default ChatField;
