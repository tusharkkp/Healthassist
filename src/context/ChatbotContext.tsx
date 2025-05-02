import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';

// Types for chatbot messages
export interface ChatMessage {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  options?: ChatOption[];
}

export interface ChatOption {
  id: string;
  text: string;
  action: string; // 'navigate', 'reply', etc.
  value: string; // route or response
}

interface ChatbotContextType {
  messages: ChatMessage[];
  isOpen: boolean;
  isMinimized: boolean;
  sendMessage: (content: string) => void;
  selectOption: (option: ChatOption) => void;
  toggleChat: () => void;
  minimizeChat: () => void;
  maximizeChat: () => void;
}

const ChatbotContext = createContext<ChatbotContextType | undefined>(undefined);

/**
 * Provider component for managing chatbot state
 */
export function ChatbotProvider({ children }: { children: ReactNode }) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isMinimized, setIsMinimized] = useState<boolean>(false);
  const [initialMessageSent, setInitialMessageSent] = useState<boolean>(false);
  const navigate = useNavigate();

  // Send initial welcome message
  useEffect(() => {
    if (!initialMessageSent && isOpen) {
      const welcomeMessage: ChatMessage = {
        id: Date.now().toString(),
        content: "Hi there! 👋 I'm your HealthAssist virtual assistant. How can I help you today?",
        sender: 'bot',
        timestamp: new Date(),
        options: [
          {
            id: '1',
            text: 'Upload X-ray',
            action: 'navigate',
            value: '/xray'
          },
          {
            id: '2',
            text: 'Check symptoms',
            action: 'navigate',
            value: '/symptoms'
          },
          {
            id: '3',
            text: 'Analyze Blood Test',
            action: 'navigate',
            value: '/blood-test'
          },
          {
            id: '4',
            text: 'What can HealthAssist do?',
            action: 'reply',
            value: 'about'
          }
        ]
      };
      
      setMessages([welcomeMessage]);
      setInitialMessageSent(true);
    }
  }, [isOpen, initialMessageSent]);

  /**
   * Generate a response based on user message
   */
  const generateResponse = (userMessage: string): ChatMessage => {
    // Convert to lowercase for easier matching
    const message = userMessage.toLowerCase();
    
    // Basic NLP pattern matching
    if (message.includes('hello') || message.includes('hi') || message.includes('hey')) {
      return {
        id: Date.now().toString(),
        content: "Hello! 😊 How can I assist you with HealthAssist today?",
        sender: 'bot',
        timestamp: new Date(),
        options: [
          {
            id: '1',
            text: 'Upload X-ray',
            action: 'navigate',
            value: '/xray'
          },
          {
            id: '2',
            text: 'Check symptoms',
            action: 'navigate',
            value: '/symptoms'
          },
          {
            id: '3',
            text: 'Analyze Blood Test',
            action: 'navigate',
            value: '/blood-test'
          }
        ]
      };
    }
    
    // Blood test related queries
    else if (
      message.includes('blood') || 
      message.includes('test') || 
      message.includes('report') || 
      message.includes('analysis') || 
      message.includes('lab')
    ) {
      return {
        id: Date.now().toString(),
        content: "You can upload your blood test report for AI-powered analysis. Our system can analyze various blood parameters and provide insights. Would you like to try it now?",
        sender: 'bot',
        timestamp: new Date(),
        options: [
          {
            id: '1',
            text: 'Go to Blood Test Analysis',
            action: 'navigate',
            value: '/blood-test'
          },
          {
            id: '2',
            text: 'How does it work?',
            action: 'reply',
            value: 'blood-test-info'
          }
        ]
      };
    }
    
    // X-ray related queries
    else if (
      message.includes('x-ray') || 
      message.includes('xray') || 
      message.includes('x ray') || 
      message.includes('upload') || 
      message.includes('scan')
    ) {
      return {
        id: Date.now().toString(),
        content: "You can upload your X-ray for AI-powered analysis through our X-ray Upload feature. Would you like to go there now?",
        sender: 'bot',
        timestamp: new Date(),
        options: [
          {
            id: '1',
            text: 'Yes, take me to X-ray upload',
            action: 'navigate',
            value: '/xray'
          },
          {
            id: '2',
            text: 'How does it work?',
            action: 'reply',
            value: 'xray-info'
          }
        ]
      };
    }
    
    // Symptom related queries
    else if (
      message.includes('symptom') || 
      message.includes('sickness') || 
      message.includes('disease') || 
      message.includes('ill') || 
      message.includes('feel') || 
      message.includes('pain') || 
      message.includes('ache') || 
      message.includes('fever')
    ) {
      return {
        id: Date.now().toString(),
        content: "You can use our Symptom Checker to identify possible conditions based on your symptoms. Would you like to try it?",
        sender: 'bot',
        timestamp: new Date(),
        options: [
          {
            id: '1',
            text: 'Go to Symptom Checker',
            action: 'navigate',
            value: '/symptoms'
          },
          {
            id: '2',
            text: 'How does Symptom Checker work?',
            action: 'reply',
            value: 'symptoms-info'
          }
        ]
      };
    }
    
    // About the platform
    else if (
      message.includes('what can') || 
      message.includes('about') || 
      message.includes('features') || 
      message.includes('do for me') || 
      message.includes('help me') ||
      message.includes('what do you do')
    ) {
      return {
        id: Date.now().toString(),
        content: "HealthAssist offers three main features: \n\n1) X-ray Analysis - upload X-rays to detect fractures or abnormalities using AI\n\n2) Symptom Checker - enter your symptoms to identify possible conditions\n\n3) Blood Test Analysis - upload blood test reports for AI-powered analysis and insights\n\nWhat would you like to know more about?",
        sender: 'bot',
        timestamp: new Date(),
        options: [
          {
            id: '1',
            text: 'X-ray Analysis',
            action: 'reply',
            value: 'xray-info'
          },
          {
            id: '2',
            text: 'Symptom Checker',
            action: 'reply',
            value: 'symptoms-info'
          },
          {
            id: '3',
            text: 'Blood Test Analysis',
            action: 'reply',
            value: 'blood-test-info'
          }
        ]
      };
    }
    
    // History related
    else if (
      message.includes('history') || 
      message.includes('previous') || 
      message.includes('past') || 
      message.includes('records') || 
      message.includes('reports')
    ) {
      return {
        id: Date.now().toString(),
        content: "You can view your previous health records and analyses in your History page. Would you like to check your history?",
        sender: 'bot',
        timestamp: new Date(),
        options: [
          {
            id: '1',
            text: 'Go to History',
            action: 'navigate',
            value: '/history'
          }
        ]
      };
    }
    
    // Default response for unknown queries
    else {
      return {
        id: Date.now().toString(),
        content: "I'm sorry, I didn't quite understand that. Can you please choose from one of these options?",
        sender: 'bot',
        timestamp: new Date(),
        options: [
          {
            id: '1',
            text: 'Upload X-ray',
            action: 'navigate',
            value: '/xray'
          },
          {
            id: '2',
            text: 'Check symptoms',
            action: 'navigate',
            value: '/symptoms'
          },
          {
            id: '3',
            text: 'Analyze Blood Test',
            action: 'navigate',
            value: '/blood-test'
          },
          {
            id: '4',
            text: 'View my history',
            action: 'navigate',
            value: '/history'
          }
        ]
      };
    }
  };

  /**
   * Handle pre-defined responses based on option selection
   */
  const getPredefinedResponse = (value: string): ChatMessage => {
    switch (value) {
      case 'about':
        return {
          id: Date.now().toString(),
          content: "HealthAssist is your AI-powered health companion! We offer: \n\n🔹 X-ray Analysis: Upload X-rays to detect fractures, pneumonia, or confirm normal results\n\n🔹 Symptom Checker: Enter your symptoms to identify possible conditions\n\n🔹 Blood Test Analysis: Upload blood test reports for comprehensive analysis\n\nAll features use advanced AI to provide preliminary insights to assist with your healthcare decisions. What would you like to try?",
          sender: 'bot',
          timestamp: new Date(),
          options: [
            {
              id: '1',
              text: 'Upload X-ray',
              action: 'navigate',
              value: '/xray'
            },
            {
              id: '2',
              text: 'Check symptoms',
              action: 'navigate',
              value: '/symptoms'
            },
            {
              id: '3',
              text: 'Analyze Blood Test',
              action: 'navigate',
              value: '/blood-test'
            }
          ]
        };
        
      case 'xray-info':
        return {
          id: Date.now().toString(),
          content: "Our X-ray Analysis feature uses AI to analyze your X-ray images. Here's how it works:\n\n1. Upload your X-ray image (JPG, PNG formats)\n2. Our AI model analyzes the image\n3. Get instant results showing possible fractures, pneumonia, or normal findings\n4. Receive recommendations based on the diagnosis\n\nWould you like to try it now?",
          sender: 'bot',
          timestamp: new Date(),
          options: [
            {
              id: '1',
              text: 'Go to X-ray Upload',
              action: 'navigate',
              value: '/xray'
            }
          ]
        };
        
      case 'symptoms-info':
        return {
          id: Date.now().toString(),
          content: "Our Symptom Checker helps identify possible conditions based on your symptoms. Here's how it works:\n\n1. Select the symptoms you're experiencing\n2. Provide additional health information if needed\n3. Our AI analyzes the information\n4. Get a list of possible conditions and recommendations\n\nWould you like to check your symptoms now?",
          sender: 'bot',
          timestamp: new Date(),
          options: [
            {
              id: '1',
              text: 'Go to Symptom Checker',
              action: 'navigate',
              value: '/symptoms'
            }
          ]
        };
        
      case 'blood-test-info':
        return {
          id: Date.now().toString(),
          content: "Our Blood Test Analysis feature uses AI to analyze your blood test reports. Here's how it works:\n\n1. Upload your blood test report (PDF or image format)\n2. Our AI model analyzes the report\n3. Get detailed analysis of blood parameters\n4. Receive recommendations based on the results\n\nWould you like to try it now?",
          sender: 'bot',
          timestamp: new Date(),
          options: [
            {
              id: '1',
              text: 'Go to Blood Test Analysis',
              action: 'navigate',
              value: '/blood-test'
            }
          ]
        };
        
      default:
        return {
          id: Date.now().toString(),
          content: "I'm sorry, I don't have information about that specific topic. Can I help you with something else?",
          sender: 'bot',
          timestamp: new Date(),
          options: [
            {
              id: '1',
              text: 'Upload X-ray',
              action: 'navigate',
              value: '/xray'
            },
            {
              id: '2',
              text: 'Check symptoms',
              action: 'navigate',
              value: '/symptoms'
            },
            {
              id: '3',
              text: 'Analyze Blood Test',
              action: 'navigate',
              value: '/blood-test'
            }
          ]
        };
    }
  };

  /**
   * Send a user message and get a bot response
   */
  const sendMessage = (content: string) => {
    if (!content.trim()) return;
    
    // Create user message
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      content,
      sender: 'user',
      timestamp: new Date()
    };
    
    // Add user message to chat
    setMessages(prev => [...prev, userMessage]);
    
    // Generate bot response (with slight delay for natural feel)
    setTimeout(() => {
      const botResponse = generateResponse(content);
      setMessages(prev => [...prev, botResponse]);
    }, 500);
  };

  /**
   * Handle option selection
   */
  const selectOption = (option: ChatOption) => {
    switch (option.action) {
      case 'navigate':
        navigate(option.value);
        break;
        
      case 'reply':
        const response = getPredefinedResponse(option.value);
        setMessages(prev => [...prev, response]);
        break;
        
      default:
        break;
    }
  };

  /**
   * Toggle chat open/closed
   */
  const toggleChat = () => {
    setIsOpen(prev => !prev);
    if (isMinimized) {
      setIsMinimized(false);
    }
  };

  /**
   * Minimize chat
   */
  const minimizeChat = () => {
    setIsMinimized(true);
  };

  /**
   * Maximize chat
   */
  const maximizeChat = () => {
    setIsMinimized(false);
  };

  const value = {
    messages,
    isOpen,
    isMinimized,
    sendMessage,
    selectOption,
    toggleChat,
    minimizeChat,
    maximizeChat
  };

  return <ChatbotContext.Provider value={value}>{children}</ChatbotContext.Provider>;
}

/**
 * Hook for using the chatbot context
 */
export function useChatbot() {
  const context = useContext(ChatbotContext);
  if (context === undefined) {
    throw new Error('useChatbot must be used within a ChatbotProvider');
  }
  return context;
} 