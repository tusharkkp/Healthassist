import React, { ReactNode } from 'react';
import { Header } from './Header';
import { Footer } from './Footer';
import { Chatbot } from '../Chatbot/Chatbot';

interface LayoutProps {
  children: ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-gray-50 to-white">
      <Header />
      <main className="flex-grow w-full max-w-[100rem] mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-12 animate-fade-in">
        {children}
      </main>
      <Footer />
      <Chatbot />
    </div>
  );
};