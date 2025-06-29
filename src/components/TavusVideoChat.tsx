import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Phone, PhoneOff, Mic, MicOff, Video, VideoOff, Settings } from 'lucide-react';

interface TavusVideoChatProps {
  conversationUrl: string;
  onEnd?: () => void;
  className?: string;
}

export function TavusVideoChat({ conversationUrl, onEnd, className = '' }: TavusVideoChatProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);

  useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe) return;

    const handleLoad = () => {
      setIsLoaded(true);
    };

    iframe.addEventListener('load', handleLoad);
    return () => iframe.removeEventListener('load', handleLoad);
  }, []);

  const handleEndCall = () => {
    if (onEnd) {
      onEnd();
    }
  };

  return (
    <div className={`relative w-full h-full bg-slate-900 rounded-2xl overflow-hidden ${className}`}>
      {/* Loading State */}
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-slate-900 z-10">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-rose-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-white text-lg">Connecting to Tavus...</p>
            <p className="text-slate-400 text-sm">Initializing AI conversation</p>
          </div>
        </div>
      )}

      {/* Tavus Conversation Iframe */}
      <iframe
        ref={iframeRef}
        src={conversationUrl}
        className="w-full h-full border-0"
        allow="camera; microphone; fullscreen"
        title="Tavus AI Conversation"
      />

      {/* Custom Controls Overlay */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
        className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-20"
      >
        <div className="bg-slate-800/90 backdrop-blur-xl rounded-2xl p-4 border border-slate-700/50 shadow-2xl">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setIsMuted(!isMuted)}
              className={`p-3 rounded-full transition-all ${
                isMuted
                  ? 'bg-red-600 hover:bg-red-700'
                  : 'bg-slate-700 hover:bg-slate-600'
              }`}
            >
              {isMuted ? (
                <MicOff className="w-5 h-5 text-white" />
              ) : (
                <Mic className="w-5 h-5 text-white" />
              )}
            </button>

            <button
              onClick={() => setIsVideoOff(!isVideoOff)}
              className={`p-3 rounded-full transition-all ${
                isVideoOff
                  ? 'bg-red-600 hover:bg-red-700'
                  : 'bg-slate-700 hover:bg-slate-600'
              }`}
            >
              {isVideoOff ? (
                <VideoOff className="w-5 h-5 text-white" />
              ) : (
                <Video className="w-5 h-5 text-white" />
              )}
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
        </div>
      </motion.div>

      {/* Connection Status */}
      <div className="absolute top-4 left-4 z-20">
        <div className="bg-slate-800/90 backdrop-blur-sm rounded-xl px-4 py-2 border border-slate-700/50">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-white text-sm font-medium">Connected to Tavus</span>
          </div>
        </div>
      </div>
    </div>
  );
}