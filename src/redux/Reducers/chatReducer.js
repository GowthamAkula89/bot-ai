import { createSlice } from '@reduxjs/toolkit';

const chatSlice = createSlice({
  name: 'chat',
  initialState: {
    activeConversation: [],
    conversations: [],
  },
  reducers: {
    setActiveConversation: (state, action) => {
      state.activeConversation = action.payload;
    },
    addConversation: (state, action) => {
      state.activeConversation.push(action.payload);
    },
    setConversations: (state, action) => {
      state.conversations = action.payload;
    },
    updateConversationItem : (state, action) => {
      const { index, updatedConversation } = action.payload;
      if (index >= 0 && index < state.conversations.length) {
        state.conversations[index] = updatedConversation;
      }
    },
    clearActiveConversation: (state) => {
      state.activeConversation = [];
    },
    deleteConversation: (state, action) => {
      state.conversations = state.conversations.filter(
        (_, index) => index !== action.payload
      );
    },
  },
});

export const {
  setActiveConversation,
  setConversations,
  addConversation,
  updateConversationItem,
  clearActiveConversation,
  deleteConversation,
} = chatSlice.actions;

export default chatSlice.reducer;
