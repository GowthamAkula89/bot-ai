import React, { useState, useEffect, useRef } from "react";
import "./chatField.css";
//import { DataContext } from "../../ContextAPI/dataContext";
import AiIcon from "../../Assets/ai-icon.png";
import QnACard from "../QnACard/qnaCard";
import { HfInference } from "@huggingface/inference";
import { setActiveConversation, addConversation } from "../../redux/Reducers/chatReducer";
import { useSelector, useDispatch } from "react-redux";

const ChatField = ({ handleChatSave }) => {
    const activeConversation = useSelector((state) => state.chat.activeConversation);
    const [question, setQuestion] = useState("");
    const chatFieldRef = useRef(null);
    const [isLoading, setIsLoading] = useState(false);
    const [partialResponse, setPartialResponse] = useState("");
    const [isQuestionAsked, setIsQuestionAsked] = useState(false);
    const [activeQuestion, setActiveQuestion] = useState("");
    const dispatch = useDispatch();
    const inference = new HfInference("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");
    useEffect(() => {
        const savedActiveConversation = JSON.parse(localStorage.getItem("activeConversation")) || [];
        dispatch(setActiveConversation(savedActiveConversation));
        setTimeout(scrollToBottom, 0);
    }, [dispatch]);

    useEffect(() => {
        scrollToBottom();
    }, [activeConversation]);

    const scrollToBottom = () => {
        if (chatFieldRef.current) {
            chatFieldRef.current.scrollTop = chatFieldRef.current.scrollHeight;
        }
    };
    // Generate the response for given question
    const generateText = async (question) => {
        let fullResponse = "";
    
        for await (const chunk of inference.chatCompletionStream({
            model: "meta-llama/Meta-Llama-3-8B-Instruct",
            messages: [{ role: "user", content: question }],
            max_tokens: 350
        })) {
            const content = chunk.choices[0]?.delta?.content || "";
            const cleanContent = content.replace(/\*/g, '');
            fullResponse += cleanContent;
            setPartialResponse(fullResponse.trim());
            scrollToBottom();
        }
    
        // Check for response completion
        if (!isCompleteResponse(fullResponse)) {
            const additionalResponse = await generateAdditionalText(question, fullResponse);
            fullResponse += additionalResponse;
        }
    
        return fullResponse.trim().split('\n');
    };
    
    // Helper function to check if the response is complete
    const isCompleteResponse = (response) => {
        return /[.!?]$/.test(response.trim());
    };
    
    // Function to generate additional text if needed
    const generateAdditionalText = async (question, currentResponse) => {
        // Additional logic to continue conversation based on current state
        let additionalResponse = "";
    
        // Assuming that the last part of the conversation needs continuation
        for await (const chunk of inference.chatCompletionStream({
            model: "meta-llama/Meta-Llama-3-8B-Instruct",
            messages: [
                { role: "user", content: question },
                { role: "assistant", content: currentResponse }, // Provide current response for context
            ],
        })) {
            const content = chunk.choices[0]?.delta?.content || "";
            const cleanContent = content.replace(/\*/g, '');
            additionalResponse += cleanContent;
            setPartialResponse(currentResponse + additionalResponse.trim());
            scrollToBottom();
        }
    
        return additionalResponse.trim();
    };
    

    const handleSubmit = async (e) => {
        e.preventDefault();
        setActiveQuestion(question);
        setIsQuestionAsked(true);
        setIsLoading(true);
        const generatedTextValue = await generateText(question);
        //Making Chat update and reponse as expected
        console.log(generatedTextValue)
        setIsQuestionAsked(false);
        setActiveQuestion("");
        const newConversation = { question: question, answer: generatedTextValue, time: getTimeString() };
        dispatch(addConversation(newConversation))
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
    console.log("active Conversation", activeConversation)
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
                <button className="action-button" type="button" onClick={() => handleChatSave()}>Save</button>
            </form>
        </div>
    );
};

export default ChatField;
