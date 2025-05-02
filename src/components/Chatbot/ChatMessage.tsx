import React from 'react';
import { ChatMessage as ChatMessageType, ChatOption } from '../../context/ChatbotContext';

interface ChatMessageProps {
  message: ChatMessageType;
  onOptionClick: (option: ChatOption) => void;
}

/**
 * Component for displaying individual chat messages with options
 */
export const ChatMessage: React.FC<ChatMessageProps> = ({ message, onOptionClick }) => {
  const isBot = message.sender === 'bot';
  
  return (
    <div className={`flex ${isBot ? 'justify-start' : 'justify-end'}`}>
      <div
        className={`max-w-[85%] rounded-lg px-4 py-2 ${
          isBot
            ? 'bg-gray-100 text-gray-800'
            : 'bg-primary-600 text-white'
        }`}
      >
        <div className="text-sm">{message.content}</div>
        
        {/* Render options if available and from bot */}
        {isBot && message.options && message.options.length > 0 && (
          <div className="mt-2 space-y-2">
            {message.options.map((option) => (
              <button
                key={option.id}
                onClick={() => onOptionClick(option)}
                className="block w-full rounded bg-white text-left p-2 text-sm text-primary-700 hover:bg-primary-50 border border-gray-200 transition-colors duration-200"
              >
                {option.text}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}; 