'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, Bot, User, Minimize2, Maximize2, Sparkles, Loader2 } from 'lucide-react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const GeminiBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: 'Greetings! I am the Rollermax AI. How can I assist you with your logistics today?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isOpen]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: [...messages, userMessage] }),
      });

      const data = await response.json();
      if (data.content) {
        setMessages(prev => [...prev, { role: 'assistant', content: data.content }]);
      } else {
        throw new Error('No content received');
      }
    } catch (error) {
      setMessages(prev => [...prev, { role: 'assistant', content: 'Apologies, my circuits are slightly tangled. Please try again or contact support.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col items-end">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20, transformOrigin: 'bottom right' }}
            animate={{ 
              opacity: 1, 
              scale: 1, 
              y: 0,
              height: isMinimized ? '64px' : '500px'
            }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="w-[350px] sm:w-[400px] bg-roller-dark border border-white/10 rounded-3xl shadow-2xl flex flex-col overflow-hidden mb-4"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-roller-red to-red-800 p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-md">
                  <Bot className="text-white w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-white font-bold leading-none">Rollermax AI</h3>
                  <span className="text-[10px] text-white/60 uppercase tracking-widest flex items-center gap-1 mt-1">
                    <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" /> Online
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => setIsMinimized(!isMinimized)}
                  className="p-2 hover:bg-white/10 rounded-lg transition-colors text-white"
                >
                  {isMinimized ? <Maximize2 size={18} /> : <Minimize2 size={18} />}
                </button>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="p-2 hover:bg-white/10 rounded-lg transition-colors text-white"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            {!isMinimized && (
              <>
                {/* Messages */}
                <div 
                  ref={scrollRef}
                  className="flex-1 overflow-y-auto p-4 space-y-4 bg-islamic-pattern scroll-smooth"
                >
                  {messages.map((m, idx) => (
                    <motion.div
                      initial={{ opacity: 0, x: m.role === 'user' ? 20 : -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      key={idx}
                      className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div className={`flex gap-2 max-w-[80%] ${m.role === 'user' ? 'flex-row-reverse' : ''}`}>
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                          m.role === 'user' ? 'bg-roller-blue' : 'bg-roller-red'
                        }`}>
                          {m.role === 'user' ? <User size={16} className="text-white" /> : <Bot size={16} className="text-white" />}
                        </div>
                        <div className={`p-3 rounded-2xl text-sm ${
                          m.role === 'user' 
                            ? 'bg-roller-blue text-white rounded-tr-none' 
                            : 'bg-white/5 border border-white/10 text-gray-200 rounded-tl-none'
                        }`}>
                          {m.content}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                  {isLoading && (
                    <div className="flex justify-start">
                      <div className="flex gap-2 max-w-[80%]">
                        <div className="w-8 h-8 rounded-lg bg-roller-red flex items-center justify-center shrink-0">
                          <Bot size={16} className="text-white" />
                        </div>
                        <div className="bg-white/5 border border-white/10 p-3 rounded-2xl rounded-tl-none flex items-center gap-2">
                          <Loader2 className="w-4 h-4 text-roller-red animate-spin" />
                          <span className="text-xs text-gray-400">Processing...</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Input */}
                <form onSubmit={handleSend} className="p-4 bg-white/5 border-t border-white/10">
                  <div className="relative">
                    <input
                      type="text"
                      className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-4 pr-12 text-white outline-none focus:ring-2 focus:ring-roller-red transition-all"
                      placeholder="Type your message..."
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                    />
                    <button 
                      type="submit"
                      disabled={isLoading}
                      className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-roller-red text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50"
                    >
                      <Send size={18} />
                    </button>
                  </div>
                </form>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Button */}
      {!isOpen && (
        <motion.button
          whileHover={{ scale: 1.1, rotate: 5 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsOpen(true)}
          className="w-16 h-16 bg-gradient-to-br from-roller-red to-red-800 rounded-2xl shadow-2xl flex items-center justify-center text-white relative group overflow-hidden"
        >
          <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />
          <MessageSquare size={30} />
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 border-2 border-roller-dark rounded-full" />
          <div className="absolute -bottom-1 -left-1">
            <Sparkles size={16} className="text-white/40" />
          </div>
        </motion.button>
      )}
    </div>
  );
};

export default GeminiBot;
