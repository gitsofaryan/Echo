import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Phone, PhoneOff, Mic, MicOff, Video, VideoOff, Settings, MessageCircle, ArrowLeft, Key, CheckCircle } from 'lucide-react';
import { prebuiltPersonas } from '../data/prebuiltPersonas';
import { useTavusIntegration } from '../hooks/useTavusIntegration';
import { TavusVideoChat } from '../components/TavusVideoChat';
import { TavusApiKeyModal } from '../components/TavusApiKeyModal';
import toast from 'react-hot-toast';

export function PrebuiltVideo() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [isConnected, setIsConnected] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [callDuration, setCallDuration] = useState(0);
  const [isConnecting, setIsConnecting] = useState(false);
  const [conversationUrl, setConversationUrl] = useState<string | null>(null);
  const [showApiKeyModal, setShowApiKeyModal] = useState(false);

  const { createConversation, isLoading, isConfigured } = useTavusIntegration();
  const persona = prebuiltPersonas.find(p => p.id === id);

  useEffect(() => {
    if (isConnected) {
      const interval = setInterval(() => {
        setCallDuration(prev => prev + 1);
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [isConnected]);

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleStartCall = async () => {
    if (!persona) return;

    setIsConnecting(true);

    try {
      // Create a conversation with the Tavus replica
      const conversation = await createConversation({
        replica_uuid: persona.replicaId,
        conversation_name: `Video call with ${persona.name}`,
      });

      setConversationUrl(conversation.conversation_url);
      setIsConnected(true);
      toast.success(`Connected to ${persona.name} via Tavus!`);
    } catch (error) {
      console.error('Failed to start conversation:', error);
      toast.error('Failed to start video call. Using demo mode.');
      
      // Fallback to demo mode
      setConversationUrl('demo');
      setIsConnected(true);
    } finally {
      setIsConnecting(false);
    }
  };

  const handleEndCall = () => {
    setIsConnected(false);
    setConversationUrl(null);
    setCallDuration(0);
    navigate('/prebuilt-personas');
  };

  const handleApiKeySaved = (apiKey: string) => {
    setShowApiKeyModal(false);
    // Automatically start the call after API key is saved
    setTimeout(() => {
      handleStartCall();
    }, 500);
  };

  if (!persona) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-900 dark:bg-slate-950">
        <div className="text-center text-white">
          <h2 className="text-2xl font-semibold mb-2">Persona not found</h2>
          <p className="text-slate-400 mb-4">This persona doesn't exist or is no longer available.</p>
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
    <div className="min-h-screen bg-slate-900 dark:bg-slate-950 relative overflow-hidden transition-colors duration-300">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="w-full h-full bg-gradient-to-br from-slate-800 to-slate-900 dark:from-slate-900 dark:to-slate-950"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-slate-900/40"></div>
      </div>

      {/* Back Button */}
      {!isConnected && (
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={() => navigate('/prebuilt-personas')}
          className="absolute top-8 left-8 z-20 flex items-center space-x-2 px-4 py-2 bg-slate-800/50 dark:bg-slate-900/50 backdrop-blur-xl rounded-2xl text-white hover:bg-slate-800/70 dark:hover:bg-slate-900/70 transition-colors border border-slate-700/50"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back</span>
        </motion.button>
      )}

      {/* Connection Status */}
      {isConfigured && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute top-8 right-8 z-20 flex items-center space-x-2 px-4 py-2 bg-emerald-600/80 backdrop-blur-xl rounded-2xl text-white border border-emerald-500/50"
        >
          <CheckCircle className="w-4 h-4" />
          <span className="text-sm font-medium">Tavus Connected</span>
        </motion.div>
      )}

      {/* Call Status */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="absolute top-8 left-1/2 transform -translate-x-1/2 z-10"
      >
        <div className="bg-slate-800/50 dark:bg-slate-900/50 backdrop-blur-2xl rounded-3xl px-6 py-3 border border-slate-700/50 shadow-2xl">
          <div className="text-center">
            <h1 className="text-xl font-semibold text-white mb-1">{persona.name}</h1>
            {!isConnected ? (
              <div className="flex items-center justify-center space-x-2">
                <div className={`w-2 h-2 rounded-full animate-pulse ${
                  isConnecting ? 'bg-yellow-500' : 'bg-slate-500'
                }`}></div>
                <p className="text-sm text-slate-300">
                  {isConnecting ? 'Connecting...' : 'Ready to connect'}
                </p>
              </div>
            ) : (
              <div className="flex items-center justify-center space-x-2">
                <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                <p className="text-sm text-slate-300">{formatDuration(callDuration)}</p>
              </div>
            )}
          </div>
        </div>
      </motion.div>

      {/* Main Video Area */}
      <div className="absolute inset-0 flex items-center justify-center">
        {isConnecting ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center"
          >
            <div className="w-32 h-32 rounded-full bg-gradient-to-br from-rose-500 to-purple-600 flex items-center justify-center mx-auto mb-6 shadow-2xl">
              <img
                src={persona.avatar}
                alt={persona.name}
                className="w-28 h-28 rounded-full object-cover"
              />
            </div>
            <div className="w-20 h-20 border-4 border-rose-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-xl text-white mb-2">Connecting to {persona.name.split(' ')[0]}</p>
            <p className="text-slate-400">
              {isConfigured ? 'Initializing Tavus AI video interface...' : 'Starting demo mode...'}
            </p>
          </motion.div>
        ) : isConnected && conversationUrl ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full h-full"
          >
            {conversationUrl === 'demo' ? (
              // Demo mode fallback
              <div className="w-full h-full flex items-center justify-center">
                <div className="text-center">
                  <div className="w-64 h-64 rounded-full bg-gradient-to-br from-rose-500 to-purple-600 flex items-center justify-center mx-auto mb-8 shadow-2xl">
                    <img
                      src={persona.avatar}
                      alt={persona.name}
                      className="w-60 h-60 rounded-full object-cover"
                    />
                  </div>
                  <h2 className="text-3xl font-bold text-white mb-4">{persona.name}</h2>
                  <p className="text-slate-300 mb-8 max-w-md mx-auto">
                    Demo mode active. Configure Tavus API for full video chat experience.
                  </p>
                  
                  {/* Demo Controls */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-slate-800/90 backdrop-blur-xl rounded-2xl p-4 border border-slate-700/50 shadow-2xl inline-block"
                  >
                    <div className="flex items-center space-x-4">
                      <button
                        onClick={() => setIsMuted(!isMuted)}
                        className={`p-3 rounded-full transition-all ${
                          isMuted ? 'bg-red-600 hover:bg-red-700' : 'bg-slate-700 hover:bg-slate-600'
                        }`}
                      >
                        {isMuted ? <MicOff className="w-5 h-5 text-white" /> : <Mic className="w-5 h-5 text-white" />}
                      </button>

                      <button
                        onClick={() => setIsVideoOff(!isVideoOff)}
                        className={`p-3 rounded-full transition-all ${
                          isVideoOff ? 'bg-red-600 hover:bg-red-700' : 'bg-slate-700 hover:bg-slate-600'
                        }`}
                      >
                        {isVideoOff ? <VideoOff className="w-5 h-5 text-white" /> : <Video className="w-5 h-5 text-white" />}
                      </button>

                      <button
                        onClick={() => navigate(`/prebuilt-chat/${id}`)}
                        className="p-3 bg-slate-700 hover:bg-slate-600 rounded-full transition-all"
                      >
                        <MessageCircle className="w-5 h-5 text-white" />
                      </button>

                      <button className="p-3 bg-slate-700 hover:bg-slate-600 rounded-full transition-all">
                        <Settings className="w-5 h-5 text-white" />
                      </button>

                      <button
                        onClick={handleEndCall}
                        className="p-3 bg-red-600 hover:bg-red-700 rounded-full transition-all"
                      >
                        <PhoneOff className="w-5 h-5 text-white" />
                      </button>
                    </div>
                  </motion.div>
                </div>
              </div>
            ) : (
              <TavusVideoChat
                conversationUrl={conversationUrl}
                onEnd={handleEndCall}
                className="w-full h-full"
              />
            )}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center"
          >
            <div className="w-48 h-48 rounded-full bg-gradient-to-br from-rose-500 to-purple-600 flex items-center justify-center mx-auto mb-8 shadow-2xl">
              <img
                src={persona.avatar}
                alt={persona.name}
                className="w-44 h-44 rounded-full object-cover"
              />
            </div>
            <h2 className="text-3xl font-bold text-white mb-4">{persona.name}</h2>
            <p className="text-slate-300 mb-8 max-w-md mx-auto">{persona.description}</p>
            
            <div className="space-y-4">
              {!isConfigured && (
                <div className="bg-blue-900/20 border border-blue-800/30 rounded-2xl p-4 mb-6 max-w-md mx-auto">
                  <p className="text-blue-200 text-sm mb-3">
                    Connect your Tavus API for the full video chat experience with professional AI personas.
                  </p>
                  <button
                    onClick={() => setShowApiKeyModal(true)}
                    className="text-blue-400 hover:text-blue-300 text-sm font-medium"
                  >
                    Configure API Key
                  </button>
                </div>
              )}
              
              <button
                onClick={handleStartCall}
                disabled={isLoading}
                className="px-8 py-4 bg-gradient-to-r from-rose-600 to-purple-600 rounded-2xl font-semibold text-white hover:shadow-xl transition-all duration-200 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
              >
                {isLoading ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    <span>Starting Call...</span>
                  </div>
                ) : (
                  `Start Video Call${isConfigured ? ' with Tavus' : ' (Demo Mode)'}`
                )}
              </button>
            </div>
          </motion.div>
        )}
      </div>

      {/* API Key Modal */}
      <TavusApiKeyModal
        isOpen={showApiKeyModal}
        onClose={() => setShowApiKeyModal(false)}
        onSave={handleApiKeySaved}
      />
    </div>
  );
}