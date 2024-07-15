import React, { createContext, useState } from "react";
export const DataContext = createContext();
export const DataProvider = ({children}) => {
    const [activeConversation, setActiveConversation] = useState([]);
    const [conversations, setConversations] = useState([]);
    return(
        <DataContext.Provider value={{activeConversation, setActiveConversation, conversations, setConversations}}>
            {children}
        </DataContext.Provider>
    )
}
export default DataProvider;