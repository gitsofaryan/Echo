import React, { useState, useRef, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Send, Mic, Video, MoreVertical, Sparkles, Key, CheckCircle, AlertTriangle } from 'lucide-react';
import { prebuiltPersonas } from '../data/prebuiltPersonas';
import { useTavusIntegration } from '../hooks/useTavusIntegration';
import { TavusApiKeyModal } from '../components/TavusApiKeyModal';
import toast from 'react-hot-toast';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'persona';
  timestamp: string;
}

export function PrebuiltChat() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showApiKeyModal, setShowApiKeyModal] = useState(false);
  const [conversationId, setConversationId] = useState<string | null>(null);
  const [isConnectedToTavus, setIsConnectedToTavus] = useState(false);
  const [connectionError, setConnectionError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const { createConversation, sendTavusMessage, isConfigured } = useTavusIntegration();
  const persona = prebuiltPersonas.find(p => p.id === id);

  useEffect(() => {
    if (persona) {
      // Add initial greeting message
      const greeting = getPersonaGreeting(persona);
      setMessages([{
        id: '1',
        content: greeting,
        sender: 'persona',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      }]);

      // Initialize conversation if API is configured
      if (isConfigured && !conversationId) {
        initializeConversation();
      }
    }
  }, [persona, isConfigured]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const initializeConversation = async () => {
    if (!persona || !isConfigured) return;

    try {
      setIsLoading(true);
      setConnectionError(null);
      
      console.log('Initializing conversation for persona:', persona.name);
      
      // Use the exact format for Santa Claus
      const conversationData = {
        replica_id: persona.replicaId,
        conversation_name: `Echo Demo - ${persona.name}`,
        ...(persona.personaId && { persona_id: persona.personaId })
      };

      console.log('Creating conversation with data:', conversationData);

      const conversation = await createConversation(conversationData);
      console.log('Conversation created:', conversation);
      
      setConversationId(conversation.conversation_id);
      setIsConnectedToTavus(true);
      toast.success(`🎅 Connected to ${persona.name} via Tavus!`);
    } catch (error) {
      console.error('Failed to initialize conversation:', error);
      setConnectionError(error instanceof Error ? error.message : 'Unknown error');
      setIsConnectedToTavus(false);
      
      if (persona.id === 'santa-claus') {
        toast.error('Ho ho ho! Santa\'s workshop is having technical difficulties. Using magical backup responses! 🎄');
      } else {
        toast.error('Failed to connect to Tavus. Using enhanced mock responses.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const getPersonaGreeting = (persona: any) => {
    const greetings = {
      'santa-claus': "Ho ho ho! Well hello there, my dear friend! 🎅 It's Santa Claus here, straight from the North Pole! The elves just finished wrapping some presents, and I thought I'd take a break to chat with you. Have you been good this year? I'd love to hear about your Christmas wishes and maybe share some magical stories from the workshop! What brings you to visit old Santa today?",
      'tavus-researcher': "Hey there! I'm Charlie, cruising through latent space from Tavus HQ in San Francisco. Ready to dive into some AI talk? Whether you want to chat about the latest in conversational AI or just hang out and discuss the future of human-AI interaction, I'm all ears!",
      'ai-interviewer': "Hello! I'm Jane Smith, a Principal at Morrison & Blackwell. I'm excited to conduct a case interview with you today. This will be a conversational assessment focusing on a business case study. Are you ready to begin?",
      'history-teacher': "Welcome! I'm Dr. Elena Martinez, and I'm thrilled to explore history with you today. Whether you're curious about ancient civilizations, want to understand historical events, or need help with your studies, I'm here to make the past come alive. What period or topic interests you most?",
      'wellness-coach': "Hello, and welcome! I'm Maya Chen, your wellness coach. I'm here to support you on your journey toward better mental health and well-being. Whether you're dealing with stress, looking to develop mindfulness practices, or working on personal growth, we can explore this together. How are you feeling today?",
      'creative-mentor': "Hey there, creative soul! I'm Alex Rivera, and I'm absolutely excited to help you unlock your artistic potential. Whether you're facing a creative block, starting a new project, or looking to develop your skills, I'm here to inspire and guide you. What creative adventure are we embarking on today?",
      'tech-mentor': "Hi! I'm David Kim, a senior software engineer with 15 years in the tech industry. I love mentoring aspiring developers and discussing everything from coding fundamentals to system architecture. Whether you're just starting out or looking to advance your career, I'm here to help. What would you like to explore today?",
    };

    return greetings[persona.id as keyof typeof greetings] || "Hello! I'm excited to chat with you today. How can I help you?";
  };

  const generateEnhancedResponse = (userMessage: string, persona: any) => {
    const responses = {
      'santa-claus': [
        "Ho ho ho! That's wonderful! You know, that reminds me of a story from the North Pole. Just last week, the elves were working on something very similar! They're always so creative and full of Christmas spirit. 🎄",
        "Well bless my jingle bells! That's exactly the kind of thing that makes Christmas so magical! Mrs. Claus was just saying something similar while we were baking cookies yesterday. The whole kitchen smelled like cinnamon and joy! 🍪",
        "Ho ho ho! You've got the Christmas spirit, I can tell! That's the kind of joy and wonder that makes my job so special. The reindeer would love to hear about this - especially Rudolph! His nose is glowing extra bright today! 🦌",
        "My goodness, that warms my heart like a cozy fireplace! You know, spreading joy and kindness like that is what Christmas is all about. Have I told you about the time the elves learned this very lesson? It's quite a tale! ❄️",
        "Ho ho ho! That's going straight to the 'nice' list! Your thoughtfulness reminds me why I love delivering presents around the world. Speaking of which, have you been thinking about what you'd like for Christmas? 🎁",
        "Well now, that's the spirit of Christmas right there! You know, up at the North Pole, we have a saying: 'The best gifts come from the heart.' And you, my friend, have a heart full of Christmas magic! ✨",
        "Ho ho ho! That makes my belly shake like a bowl full of jelly! You remind me of the children who leave out cookies and milk - always thinking of others. Mrs. Claus would be so proud! 🥛",
        "Wonderful, simply wonderful! That's the kind of Christmas cheer that keeps the workshop running smoothly. Even the reindeer are doing little happy dances in their stalls! Would you like to hear about what they're up to? 🎵"
      ],
      'tavus-researcher': [
        "That's a fascinating question! You know, working on conversational AI at Tavus, I see this kind of thing all the time. It's like we're building the Matrix, but instead of red pills and blue pills, we're dealing with tokens and embeddings!",
        "Ah, that reminds me of something we were discussing in the office yesterday. The future of AI is really about making these interactions feel as natural as chatting with your best friend at the beach.",
        "Great point! From my perspective cruising through latent space, I'd say that's exactly the kind of challenge we're tackling with our conversational video interface technology.",
        "Dude, that's like asking Neo to explain the Matrix while he's still plugged in! But seriously, the way we're approaching this at Tavus is pretty mind-blowing.",
        "You're hitting on something really important here. In the AI research world, we call this the 'uncanny valley' of conversation - making it feel natural without being creepy.",
      ],
      'ai-interviewer': [
        "That's an interesting approach. Let me ask you to think about this from a different angle - how would you structure your analysis of the market opportunity for SodaPop's Light Bolt?",
        "Good thinking. Now, can you walk me through how you would estimate the market size for this sports drink category?",
        "I appreciate that perspective. Let's dive deeper into the competitive landscape. What factors would you consider when analyzing Red Bull and Gatorade's positioning?",
        "Excellent. That shows strong analytical thinking. How would you prioritize these factors in terms of their impact on Light Bolt's go-to-market strategy?",
        "Interesting hypothesis. Can you break down the assumptions behind that estimate? What data would you need to validate this approach?",
      ],
      'history-teacher': [
        "What a wonderful question! This actually connects to a broader pattern we see throughout history. Let me share a story that illustrates this perfectly...",
        "That's exactly the kind of critical thinking I love to see! This reminds me of a similar situation that occurred during the Renaissance period when merchants faced similar challenges.",
        "Excellent observation! You're thinking like a historian now. This event had ripple effects that we can still see in today's world - have you noticed any parallels in current events?",
        "That's a great connection! History often repeats itself in fascinating ways. The Roman Empire's approach to this issue was remarkably similar to what we see in modern democracies.",
        "You've touched on one of my favorite historical mysteries! The evidence suggests that ancient civilizations were far more connected than we previously thought.",
      ],
      'wellness-coach': [
        "I hear you, and what you're experiencing is completely valid. Many people go through similar challenges. Let's explore some gentle techniques that might help you find more balance.",
        "That sounds like it's been really difficult for you. Thank you for sharing that with me. Have you tried any mindfulness practices before, or would you like me to guide you through a simple breathing exercise?",
        "It's wonderful that you're taking this step to focus on your well-being. Self-awareness is such an important part of personal growth. What does self-care look like for you right now?",
        "That's a beautiful insight. Sometimes the most profound healing comes from simply acknowledging our feelings without judgment. How does it feel to name what you're experiencing?",
        "I can sense the strength in your words, even as you're going through this challenge. What small step could you take today to honor your needs?",
      ],
      'creative-mentor': [
        "Oh, I love where your mind is going with this! That creative spark is exactly what we want to nurture. Let's explore some techniques to develop this idea further - have you tried mind mapping?",
        "Creative blocks are just part of the process - they're actually signs that your brain is working on something important in the background. Let's try a different approach. What if we started with play instead of pressure?",
        "That's such a unique perspective! I can see your artistic vision coming through. Have you considered experimenting with different mediums to express this concept? Sometimes constraints can actually free us up.",
        "Wow, that's incredibly innovative! You're pushing boundaries in exactly the way great artists do. What inspired this direction? I'm curious about your creative process.",
        "I'm getting excited just hearing about this project! The way you're combining these elements reminds me of some groundbreaking work I've seen in contemporary art. What's your next experimental step?",
      ],
      'tech-mentor': [
        "That's a great question that many developers ask! Let me break this down into manageable pieces and share some best practices I've learned over the years in both startups and enterprise environments.",
        "I remember facing a similar challenge early in my career at a fintech startup. The key is to think about scalability and maintainability from the start. Here's how I'd approach it...",
        "Excellent! You're thinking about this the right way. In my experience at both startups and large tech companies, this kind of problem-solving approach is exactly what separates good developers from great ones.",
        "That's a solid foundation! Now, let's think about how this would scale. What happens when you have 10x or 100x more users? I've seen this exact scenario play out at three different companies.",
        "Smart question! This is actually a common architectural decision point. Let me share a war story from when we had to refactor this exact pattern at scale - it taught me a lot about trade-offs.",
      ],
    };

    const personaResponses = responses[persona.id as keyof typeof responses] || [
      "That's really interesting! Tell me more about that.",
      "I appreciate you sharing that with me. What are your thoughts on this?",
      "That's a great point. How do you think we should approach this?",
      "I find that perspective fascinating. What led you to that conclusion?",
      "That's exactly the kind of insight I was hoping we'd explore together.",
    ];

    return personaResponses[Math.floor(Math.random() * personaResponses.length)];
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || !persona) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputMessage.trim(),
      sender: 'user',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages(prev => [...prev, userMessage]);
    const messageContent = inputMessage.trim();
    setInputMessage('');
    setIsTyping(true);

    try {
      let aiResponse: string;

      if (isConnectedToTavus && conversationId) {
        // Try to use real Tavus API
        try {
          console.log('Sending message to Tavus:', messageContent);
          const response = await sendTavusMessage(conversationId, messageContent);
          console.log('Tavus response:', response);
          aiResponse = response.message || generateEnhancedResponse(messageContent, persona);
        } catch (error) {
          console.error('Tavus API error, falling back to enhanced responses:', error);
          aiResponse = generateEnhancedResponse(messageContent, persona);
          
          // Show specific error for Santa
          if (persona.id === 'santa-claus') {
            toast.error('🎅 Santa\'s magic communication is having issues! Using backup North Pole responses!');
          }
        }
      } else {
        // Use enhanced mock responses
        aiResponse = generateEnhancedResponse(messageContent, persona);
      }

      // Simulate realistic response delay
      setTimeout(() => {
        const aiMessage: Message = {
          id: (Date.now() + 1).toString(),
          content: aiResponse,
          sender: 'persona',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };

        setMessages(prev => [...prev, aiMessage]);
        setIsTyping(false);
      }, 1000 + Math.random() * 2000);

    } catch (error) {
      console.error('Error sending message:', error);
      setIsTyping(false);
      toast.error('Failed to send message. Please try again.');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleApiKeySaved = () => {
    setShowApiKeyModal(false);
    initializeConversation();
  };

  const handleRetryConnection = () => {
    setConnectionError(null);
    initializeConversation();
  };

  if (!persona) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-900">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-100 mb-2">Persona not found</h2>
          <p className="text-slate-600 dark:text-slate-400 mb-4">This persona doesn't exist or is no longer available.</p>
          <button
            onClick={() => navigate('/prebuilt-personas')}
            className="px-6 py-3 bg-rose-600 text-white rounded-xl font-medium hover:bg-rose-700 transition-colors"
          >
            Back to Personas
          </button>
        </div>
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
              onClick={() => navigate('/prebuilt-personas')}
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
                <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white dark:border-slate-800 ${
                  isConnectedToTavus ? 'bg-emerald-500' : connectionError ? 'bg-red-500' : 'bg-blue-500'
                }`}></div>
              </div>
              <div>
                <h1 className="text-lg font-semibold text-slate-900 dark:text-slate-100">{persona.name}</h1>
                <div className="flex items-center space-x-2">
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    {isTyping ? 'Typing...' : 'Online'}
                  </p>
                  {isConnectedToTavus && (
                    <div className="flex items-center space-x-1">
                      <CheckCircle className="w-3 h-3 text-emerald-500" />
                      <span className="text-xs text-emerald-600 dark:text-emerald-400 font-medium">Tavus</span>
                    </div>
                  )}
                  {connectionError && (
                    <div className="flex items-center space-x-1">
                      <AlertTriangle className="w-3 h-3 text-red-500" />
                      <span className="text-xs text-red-600 dark:text-red-400 font-medium">Backup Mode</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            {connectionError && (
              <button
                onClick={handleRetryConnection}
                className="flex items-center space-x-2 px-3 py-2 bg-yellow-100 dark:bg-yellow-900/30 hover:bg-yellow-200 dark:hover:bg-yellow-900/50 rounded-xl transition-colors text-yellow-700 dark:text-yellow-300 text-sm"
              >
                <AlertTriangle className="w-4 h-4" />
                <span>Retry</span>
              </button>
            )}
            {!isConnectedToTavus && !connectionError && (
              <button
                onClick={() => setShowApiKeyModal(true)}
                className="flex items-center space-x-2 px-3 py-2 bg-blue-100 dark:bg-blue-900/30 hover:bg-blue-200 dark:hover:bg-blue-900/50 rounded-xl transition-colors text-blue-700 dark:text-blue-300 text-sm"
              >
                <Key className="w-4 h-4" />
                <span>Connect Tavus</span>
              </button>
            )}
            <button
              onClick={() => navigate(`/prebuilt-video/${persona.id}`)}
              className="p-2 bg-purple-100 dark:bg-purple-900/30 hover:bg-purple-200 dark:hover:bg-purple-900/50 rounded-xl transition-colors"
            >
              <Video className="w-5 h-5 text-purple-600 dark:text-purple-400" />
            </button>
            <button className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-xl transition-colors">
              <MoreVertical className="w-5 h-5 text-slate-600 dark:text-slate-400" />
            </button>
          </div>
        </div>
      </motion.div>

      {/* Connection Status Banner */}
      {connectionError && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-yellow-50 dark:bg-yellow-900/20 border-b border-yellow-200 dark:border-yellow-800/30 px-4 py-2"
        >
          <div className="max-w-4xl mx-auto flex items-center justify-between">
            <div className="flex items-center space-x-2 text-sm">
              <AlertTriangle className="w-4 h-4 text-yellow-600 dark:text-yellow-400" />
              <span className="text-yellow-800 dark:text-yellow-200">
                {persona.id === 'santa-claus' 
                  ? "🎅 Santa's magical connection is having issues! Using backup North Pole responses."
                  : "Tavus connection failed. Using enhanced backup responses."
                }
              </span>
            </div>
            <button
              onClick={handleRetryConnection}
              className="text-yellow-700 dark:text-yellow-300 hover:text-yellow-900 dark:hover:text-yellow-100 font-medium text-sm"
            >
              Retry Connection
            </button>
          </div>
        </motion.div>
      )}

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="max-w-4xl mx-auto space-y-4">
          <AnimatePresence>
            {messages.map((message, index) => (
              <motion.div
                key={message.id}
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
                placeholder={`Message ${persona.name.split(' ')[0]}...`}
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

      {/* API Key Modal */}
      <TavusApiKeyModal
        isOpen={showApiKeyModal}
        onClose={() => setShowApiKeyModal(false)}
        onSave={handleApiKeySaved}
      />
    </div>
  );
}