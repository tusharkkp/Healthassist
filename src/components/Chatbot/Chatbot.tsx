import React, { useRef, useEffect } from 'react';
import { MessageSquare, X, Minimize2, Maximize2, Send } from 'lucide-react';
import { useChatbot, ChatOption } from '../../context/ChatbotContext';
import { ChatMessage } from './ChatMessage';

/**
 * Main Chatbot component that includes the floating button and chat window
 */
export const Chatbot: React.FC = () => {
  const { 
    messages, 
    isOpen, 
    isMinimized,
    sendMessage, 
    selectOption,
    toggleChat, 
    minimizeChat,
    maximizeChat
  } = useChatbot();
  
  const inputRef = useRef<HTMLInputElement>(null);
  const messageContainerRef = useRef<HTMLDivElement>(null);

  // Focus input when chat is opened
  useEffect(() => {
    if (isOpen && !isMinimized && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen, isMinimized]);
  
  // Scroll to bottom when messages change
  useEffect(() => {
    if (messageContainerRef.current) {
      messageContainerRef.current.scrollTop = messageContainerRef.current.scrollHeight;
    }
  }, [messages]);

  // Handle sending message on Enter key
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && inputRef.current && inputRef.current.value.trim()) {
      sendMessage(inputRef.current.value);
      inputRef.current.value = '';
    }
  };

  // Handle send button click
  const handleSendClick = () => {
    if (inputRef.current && inputRef.current.value.trim()) {
      sendMessage(inputRef.current.value);
      inputRef.current.value = '';
      inputRef.current.focus();
    }
  };

  // Handle option selection
  const handleOptionClick = (option: ChatOption) => {
    selectOption(option);
  };

  return (
    <>
      {/* Floating chat button */}
      <button
        onClick={toggleChat}
        className={`fixed bottom-6 right-6 rounded-full bg-primary-600 p-4 text-white shadow-lg transition-all duration-300 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 z-50 ${
          isOpen ? 'scale-0 opacity-0' : 'scale-100 opacity-100'
        }`}
        aria-label="Chat with HealthAssist"
      >
        <MessageSquare className="h-6 w-6" />
      </button>

      {/* Chat window */}
      <div
        className={`fixed bottom-6 right-6 w-80 sm:w-96 rounded-lg bg-white shadow-xl transition-all duration-300 overflow-hidden z-50 ${
          isOpen
            ? 'opacity-100 scale-100'
            : 'opacity-0 scale-90 pointer-events-none'
        } ${
          isMinimized
            ? 'h-16'
            : 'max-h-[calc(100vh-100px)]'
        }`}
      >
        {/* Chat header */}
        <div className="bg-primary-600 p-4 text-white flex items-center justify-between">
          <div className="flex items-center">
            <MessageSquare className="h-5 w-5 mr-2" />
            <h3 className="font-medium">HealthAssist Chat</h3>
          </div>
          <div className="flex items-center space-x-2">
            {isMinimized ? (
              <button
                onClick={maximizeChat}
                className="text-white hover:text-gray-200 focus:outline-none"
                aria-label="Maximize chat"
              >
                <Maximize2 className="h-4 w-4" />
              </button>
            ) : (
              <button
                onClick={minimizeChat}
                className="text-white hover:text-gray-200 focus:outline-none"
                aria-label="Minimize chat"
              >
                <Minimize2 className="h-4 w-4" />
              </button>
            )}
            <button
              onClick={toggleChat}
              className="text-white hover:text-gray-200 focus:outline-none"
              aria-label="Close chat"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Messages container - only visible when not minimized */}
        {!isMinimized && (
          <>
            <div 
              ref={messageContainerRef}
              className="p-4 h-72 sm:h-96 overflow-y-auto flex flex-col space-y-4"
            >
              {messages.map((message) => (
                <ChatMessage 
                  key={message.id} 
                  message={message} 
                  onOptionClick={handleOptionClick} 
                />
              ))}
            </div>

            {/* Input area */}
            <div className="p-3 border-t border-gray-200 bg-gray-50 flex items-center">
              <input
                ref={inputRef}
                type="text"
                placeholder="Type your message..."
                className="flex-1 border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                onKeyDown={handleKeyDown}
              />
              <button
                onClick={handleSendClick}
                className="ml-2 rounded-full p-2 text-primary-600 hover:bg-primary-50 focus:outline-none"
                aria-label="Send message"
              >
                <Send className="h-5 w-5" />
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
}; 