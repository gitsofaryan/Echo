import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Phone, PhoneOff, Mic, MicOff, Video, VideoOff, Settings, MessageCircle } from 'lucide-react';
import { usePersona } from '../hooks/usePersona';

export function VideoCall() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { persona } = usePersona(id!);
  const [isConnected, setIsConnected] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [callDuration, setCallDuration] = useState(0);

  useEffect(() => {
    // Simulate connection
    const timer = setTimeout(() => {
      setIsConnected(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

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

  const handleEndCall = () => {
    navigate('/dashboard');
  };

  if (!persona) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-violet-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dark-900 relative overflow-hidden">
      {/* Background Video/Avatar */}
      <div className="absolute inset-0">
        <img
          src={persona.avatar}
          alt={persona.name}
          className="w-full h-full object-cover opacity-80"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-dark-900/80 via-transparent to-dark-900/40"></div>
      </div>

      {/* Call Status */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="absolute top-8 left-1/2 transform -translate-x-1/2 z-10"
      >
        <div className="bg-dark-800/50 backdrop-blur-xl rounded-2xl px-6 py-3 border border-white/10">
          <div className="text-center">
            <h1 className="text-xl font-semibold text-white mb-1">{persona.name}</h1>
            {!isConnected ? (
              <div className="flex items-center justify-center space-x-2">
                <div className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse"></div>
                <p className="text-sm text-gray-300">Connecting...</p>
              </div>
            ) : (
              <div className="flex items-center justify-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <p className="text-sm text-gray-300">{formatDuration(callDuration)}</p>
              </div>
            )}
          </div>
        </div>
      </motion.div>

      {/* Your Video (Small) */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5 }}
        className="absolute top-8 right-8 z-10"
      >
        <div className="w-32 h-24 bg-dark-700 rounded-xl overflow-hidden border-2 border-white/20">
          {isVideoOff ? (
            <div className="w-full h-full flex items-center justify-center bg-dark-800">
              <VideoOff className="w-6 h-6 text-gray-400" />
            </div>
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-violet-600/20 to-teal-600/20 flex items-center justify-center">
              <div className="w-8 h-8 bg-white/20 rounded-full"></div>
            </div>
          )}
        </div>
      </motion.div>

      {/* AI Speech Indicator */}
      {isConnected && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="absolute bottom-40 left-1/2 transform -translate-x-1/2 z-10"
        >
          <div className="bg-dark-800/50 backdrop-blur-xl rounded-full px-6 py-3 border border-white/10">
            <div className="flex items-center space-x-3">
              <div className="flex space-x-1">
                <div className="w-2 h-8 bg-gradient-to-t from-violet-600 to-teal-400 rounded-full animate-pulse"></div>
                <div className="w-2 h-6 bg-gradient-to-t from-violet-600 to-teal-400 rounded-full animate-pulse" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-2 h-10 bg-gradient-to-t from-violet-600 to-teal-400 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                <div className="w-2 h-4 bg-gradient-to-t from-violet-600 to-teal-400 rounded-full animate-pulse" style={{ animationDelay: '0.3s' }}></div>
                <div className="w-2 h-7 bg-gradient-to-t from-violet-600 to-teal-400 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
              </div>
              <span className="text-sm text-gray-300">Speaking...</span>
            </div>
          </div>
        </motion.div>
      )}

      {/* Call Controls */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10"
      >
        <div className="bg-dark-800/50 backdrop-blur-xl rounded-3xl p-4 border border-white/10">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setIsMuted(!isMuted)}
              className={`p-4 rounded-full transition-all ${
                isMuted
                  ? 'bg-red-600 hover:bg-red-700'
                  : 'bg-dark-700/50 hover:bg-dark-700'
              }`}
            >
              {isMuted ? (
                <MicOff className="w-6 h-6 text-white" />
              ) : (
                <Mic className="w-6 h-6 text-white" />
              )}
            </button>

            <button
              onClick={() => setIsVideoOff(!isVideoOff)}
              className={`p-4 rounded-full transition-all ${
                isVideoOff
                  ? 'bg-red-600 hover:bg-red-700'
                  : 'bg-dark-700/50 hover:bg-dark-700'
              }`}
            >
              {isVideoOff ? (
                <VideoOff className="w-6 h-6 text-white" />
              ) : (
                <Video className="w-6 h-6 text-white" />
              )}
            </button>

            <button
              onClick={() => navigate(`/chat/${id}`)}
              className="p-4 bg-dark-700/50 hover:bg-dark-700 rounded-full transition-all"
            >
              <MessageCircle className="w-6 h-6 text-white" />
            </button>

            <button className="p-4 bg-dark-700/50 hover:bg-dark-700 rounded-full transition-all">
              <Settings className="w-6 h-6 text-white" />
            </button>

            <button
              onClick={handleEndCall}
              className="p-4 bg-red-600 hover:bg-red-700 rounded-full transition-all"
            >
              <PhoneOff className="w-6 h-6 text-white" />
            </button>
          </div>
        </div>
      </motion.div>

      {/* Connection Status */}
      {!isConnected && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute inset-0 bg-dark-900/50 flex items-center justify-center z-20"
        >
          <div className="text-center">
            <div className="w-20 h-20 border-4 border-violet-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-xl text-white mb-2">Connecting to {persona.name}</p>
            <p className="text-gray-400">Please wait while we establish the connection...</p>
          </div>
        </motion.div>
      )}
    </div>
  );
}