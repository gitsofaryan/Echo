import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { mockMessages, mockPersonas } from '../data/mockData';

export function useChatMessages(personaId: string) {
  const [messages, setMessages] = useState(mockMessages);
  const [isLoading, setIsLoading] = useState(false);

  const persona = mockPersonas.find(p => p.id === personaId);

  const sendMessage = async (content: string) => {
    setIsLoading(true);
    
    // Add user message
    const userMessage = {
      id: Date.now().toString(),
      content,
      sender: 'user' as const,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages(prev => [...prev, userMessage]);

    // Simulate AI response
    setTimeout(() => {
      const aiResponses = [
        "That's a fascinating question! Let me think about that for a moment.",
        "I appreciate you sharing that with me. Here's my perspective...",
        "That reminds me of something I was thinking about earlier.",
        "I find that topic really interesting. What made you curious about it?",
        "Great point! I'd love to explore that idea further with you.",
        "That's exactly the kind of thoughtful question I enjoy discussing.",
      ];

      const aiMessage = {
        id: (Date.now() + 1).toString(),
        content: aiResponses[Math.floor(Math.random() * aiResponses.length)],
        sender: 'persona' as const,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages(prev => [...prev, aiMessage]);
      setIsLoading(false);
    }, 1500);
  };

  return {
    messages,
    sendMessage,
    isLoading,
  };
}