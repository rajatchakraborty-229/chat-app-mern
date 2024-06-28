import { create } from 'zustand';

const useConversation = create((set) => ({
  selectedConversation: null,
  setSelectedConversation: (selectedConversation) => set({ selectedConversation }),
  messages: [],
  hasMessages: true,
  setMessages: (messages, hasMessages = true) => set({ messages, hasMessages }),
  searchQuery: '',
  setSearchQuery: (searchQuery) => set({ searchQuery }),
}));

export default useConversation;
