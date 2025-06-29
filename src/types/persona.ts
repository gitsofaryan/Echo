export interface Persona {
  id: string;
  name: string;
  category: 'assistant' | 'creative' | 'educational' | 'entertainment';
  description: string;
  avatar: string;
  personality?: string;
  voice: 'neutral' | 'friendly' | 'enthusiastic' | 'calm' | 'authoritative';
  knowledge?: string;
  expertise: string[];
  rating: number;
  conversationCount: number;
  createdAt: string;
  memories?: number;
}

export interface ChatMessage {
  id: string;
  content: string;
  sender: 'user' | 'persona';
  timestamp: string;
}