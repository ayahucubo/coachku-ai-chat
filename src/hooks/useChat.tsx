
import { useState, useCallback } from 'react';
import { useAuth } from './useAuth';
import { v4 as uuidv4 } from 'uuid';
import { toast } from '@/hooks/use-toast';

export type Message = {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: Date;
};

export type ChatSession = {
  chatId: string;
  title: string;
  lastMessageTimestamp: Date;
  messages: Message[];
};

export type CoachingMode = 'career' | 'goal' | 'self-discovery' | 'problem-solving' | 'curhat';

export const useChat = () => {
  const { user } = useAuth();
  const [currentChatId, setCurrentChatId] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [chatHistory, setChatHistory] = useState<ChatSession[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentMode, setCurrentMode] = useState<CoachingMode>('career');

  // Function to create a new chat session
  const startNewChat = useCallback(async () => {
    if (!user) return;
    
    try {
      setIsLoading(true);
      // Generate a new unique chatId
      const newChatId = uuidv4();
      setCurrentChatId(newChatId);
      setMessages([
        {
          id: uuidv4(),
          content: `Welcome to CoachKu! I'm your AI coach for ${currentMode} coaching. How can I help you today?`,
          sender: 'bot',
          timestamp: new Date(),
        },
      ]);
      
      // You might want to initialize the chat session on the backend here
      // For now, we'll just update the local state
      return newChatId;
    } catch (error) {
      console.error('Failed to start new chat:', error);
      toast({
        title: 'Error',
        description: 'Failed to start a new chat session',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  }, [user, currentMode]);

  // Function to load chat history
  const loadChatHistory = useCallback(async () => {
    if (!user) return;
    
    try {
      setIsLoading(true);
      const response = await fetch('http://localhost:5678/webhook-test/00bfb828-bd47-48f7-ba20-1d6f471789bd', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId: user.userId }),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch chat history');
      }

      const data = await response.json();
      setChatHistory(data);
    } catch (error) {
      console.error('Failed to load chat history:', error);
      toast({
        title: 'Error',
        description: 'Failed to load chat history',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  }, [user]);

  // Function to load a specific chat session
  const loadChatSession = useCallback(async (chatId: string) => {
    if (!user) return;
    
    try {
      setIsLoading(true);
      const response = await fetch('http://localhost:5678/webhook-test/00bfb828-bd47-48f7-ba20-1d6f471789bd', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ chatId }),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch chat session');
      }

      const data = await response.json();
      setCurrentChatId(chatId);
      setMessages(data.messages || []);
    } catch (error) {
      console.error('Failed to load chat session:', error);
      toast({
        title: 'Error',
        description: 'Failed to load chat session',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  }, [user]);

  // Function to send a message to the AI
  const sendMessage = useCallback(async (content: string) => {
    if (!user || !currentChatId) return;
    
    // Add user message to the UI immediately
    const userMessage: Message = {
      id: uuidv4(),
      content,
      sender: 'user',
      timestamp: new Date(),
    };
    
    setMessages((prev) => [...prev, userMessage]);
    
    try {
      setIsLoading(true);
      // Send message to the backend
      const response = await fetch('http://localhost:5678/webhook-test/30b42ee2-bf42-4882-aa4d-ec66506f8874', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: user.userId,
          chatId: currentChatId,
          message: content,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to send message');
      }

      const data = await response.json();
      
      // Add AI response to the UI
      const botMessage: Message = {
        id: uuidv4(),
        content: data.response || "I'm processing your message. Please wait a moment.",
        sender: 'bot',
        timestamp: new Date(),
      };
      
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error('Failed to send message:', error);
      // Add an error message from the bot
      const errorMessage: Message = {
        id: uuidv4(),
        content: "I'm sorry, I couldn't process your message. Please try again.",
        sender: 'bot',
        timestamp: new Date(),
      };
      
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  }, [user, currentChatId]);

  // Change the coaching mode
  const changeMode = (mode: CoachingMode) => {
    setCurrentMode(mode);
    // Optionally start a new chat when changing modes
    startNewChat();
  };

  return {
    currentChatId,
    messages,
    chatHistory,
    isLoading,
    currentMode,
    startNewChat,
    loadChatHistory,
    loadChatSession,
    sendMessage,
    changeMode,
  };
};
