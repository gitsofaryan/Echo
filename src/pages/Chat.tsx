import React, { useState, useRef, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Send, Mic, Video, MoreVertical, Phone } from 'lucide-react';
import { usePersona } from '../hooks/usePersona';
import { useChatMessages } from '../hooks/useChatMessages';

export function Chat() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { persona } = usePersona(id!);
  const { messages, sendMessage, isLoading } = useChatMessages(id!);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const message = inputMessage.trim();
    setInputMessage('');
    
    await sendMessage(message);
    
    // Simulate AI typing
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
    }, 2000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (!persona) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-900">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-violet-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-900 transition-colors duration-300">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-2xl border-b border-slate-200/50 dark:border-slate-700/50 p-4 shadow-lg dark:shadow-slate-900/20"
      >
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => navigate('/dashboard')}
              className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-xl transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-slate-600 dark:text-slate-400" />
            </button>
            
            <div className="flex items-center space-x-3">
              <div className="relative">
                <img
                  src={persona.avatar}
                  alt={persona.name}
                  className="w-10 h-10 rounded-full object-cover shadow-md"
                />
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white dark:border-slate-800"></div>
              </div>
              <div>
                <h1 className="text-lg font-semibold text-slate-900 dark:text-slate-100">{persona.name}</h1>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  {isTyping ? 'Typing...' : 'Online'}
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => navigate(`/call/${id}`)}
              className="p-2 bg-teal-100 dark:bg-teal-900/30 hover:bg-teal-200 dark:hover:bg-teal-900/50 rounded-xl transition-colors"
            >
              <Video className="w-5 h-5 text-teal-600 dark:text-teal-400" />
            </button>
            <button className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-xl transition-colors">
              <MoreVertical className="w-5 h-5 text-slate-600 dark:text-slate-400" />
            </button>
          </div>
        </div>
      </motion.div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="max-w-4xl mx-auto space-y-4">
          <AnimatePresence>
            {messages.map((message, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`flex items-end space-x-2 max-w-xs lg:max-w-md ${
                  message.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''
                }`}>
                  {message.sender === 'persona' && (
                    <img
                      src={persona.avatar}
                      alt={persona.name}
                      className="w-8 h-8 rounded-full object-cover shadow-md"
                    />
                  )}
                  
                  <div className={`px-4 py-3 rounded-3xl shadow-md ${
                    message.sender === 'user'
                      ? 'bg-gradient-to-r from-rose-600 to-purple-600 text-white'
                      : 'bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 border border-slate-200/50 dark:border-slate-700/50'
                  }`}>
                    <p className="text-sm leading-relaxed">{message.content}</p>
                    <p className={`text-xs mt-1 ${
                      message.sender === 'user' ? 'text-white/70' : 'text-slate-500 dark:text-slate-400'
                    }`}>
                      {message.timestamp}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {isTyping && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex justify-start"
            >
              <div className="flex items-end space-x-2">
                <img
                  src={persona.avatar}
                  alt={persona.name}
                  className="w-8 h-8 rounded-full object-cover shadow-md"
                />
                <div className="bg-white dark:bg-slate-800 border border-slate-200/50 dark:border-slate-700/50 px-4 py-3 rounded-3xl shadow-md">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-slate-400 dark:bg-slate-500 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-slate-400 dark:bg-slate-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-slate-400 dark:bg-slate-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
          
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-2xl border-t border-slate-200/50 dark:border-slate-700/50 p-4 shadow-lg dark:shadow-slate-900/20"
      >
        <div className="max-w-4xl mx-auto">
          <div className="flex items-end space-x-4">
            <div className="flex-1 relative">
              <textarea
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder={`Message ${persona.name}...`}
                rows={1}
                className="w-full px-4 py-3 pr-12 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-3xl text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-rose-500 dark:focus:border-rose-400 focus:ring-2 focus:ring-rose-500/20 dark:focus:ring-rose-400/20 transition-all resize-none shadow-sm"
              />
              <button className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 hover:bg-slate-200 dark:hover:bg-slate-600 rounded-lg transition-colors">
                <Mic className="w-5 h-5 text-slate-400 dark:text-slate-500" />
              </button>
            </div>
            
            <button
              onClick={handleSendMessage}
              disabled={!inputMessage.trim() || isLoading}
              className="p-3 bg-gradient-to-r from-rose-600 to-purple-600 rounded-3xl text-white hover:shadow-xl transition-all duration-200 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 shadow-lg"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}