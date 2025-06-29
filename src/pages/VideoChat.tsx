import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Video, 
  VideoOff, 
  Mic, 
  MicOff, 
  Phone, 
  PhoneOff, 
  Monitor,
  Users,
  Settings,
  MessageCircle
} from 'lucide-react';
import { useWebRTC } from '../hooks/useWebRTC';
import { useVideoStore } from '../stores/videoStore';
import toast from 'react-hot-toast';

// Mock user for demo purposes
const mockUser = {
  id: 'demo-user-123',
  email: 'demo@example.com'
};

export function VideoChat() {
  const navigate = useNavigate();
  const [roomId, setRoomId] = useState('');
  const [isInCall, setIsInCall] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const localVideoRef = useRef<HTMLVideoElement>(null);
  
  const {
    localStream,
    remoteStreams,
    isVideoEnabled,
    isAudioEnabled,
    isScreenSharing,
    participants,
    isConnected,
    toggleVideo,
    toggleAudio,
    toggleScreenShare,
  } = useVideoStore();

  const { joinRoom, leaveRoom } = useWebRTC({
    roomId,
    userId: mockUser.id,
  });

  useEffect(() => {
    if (localVideoRef.current && localStream) {
      localVideoRef.current.srcObject = localStream;
    }
  }, [localStream]);

  const handleJoinRoom = async () => {
    if (!roomId.trim()) {
      toast.error('Please enter a room ID');
      return;
    }

    try {
      await joinRoom();
      setIsInCall(true);
    } catch (error) {
      console.error('Failed to join room:', error);
    }
  };

  const handleLeaveRoom = () => {
    leaveRoom();
    setIsInCall(false);
    setRoomId('');
  };

  const generateRoomId = () => {
    const id = Math.random().toString(36).substring(2, 8).toUpperCase();
    setRoomId(id);
  };

  if (!isInCall) {
    return (
      <div className="min-h-screen py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <h1 className="text-4xl font-bold text-white mb-4">Video Chat</h1>
            <p className="text-gray-400">Start or join a video chat session</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-8 max-w-md mx-auto"
          >
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Room ID
                </label>
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={roomId}
                    onChange={(e) => setRoomId(e.target.value.toUpperCase())}
                    placeholder="Enter room ID"
                    className="flex-1 px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                  />
                  <button
                    onClick={generateRoomId}
                    className="px-4 py-3 bg-gray-600 hover:bg-gray-500 rounded-xl text-white transition-colors"
                  >
                    Generate
                  </button>
                </div>
              </div>

              <button
                onClick={handleJoinRoom}
                disabled={!roomId.trim()}
                className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl font-semibold text-white hover:scale-105 transition-transform disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                Join Room
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 relative">
      {/* Video Grid */}
      <div className="absolute inset-0 p-4">
        <div className="h-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Local Video */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative bg-gray-800 rounded-2xl overflow-hidden"
          >
            <video
              ref={localVideoRef}
              autoPlay
              muted
              playsInline
              className="w-full h-full object-cover"
            />
            {!isVideoEnabled && (
              <div className="absolute inset-0 bg-gray-800 flex items-center justify-center">
                <div className="w-16 h-16 bg-gray-600 rounded-full flex items-center justify-center">
                  <VideoOff className="w-8 h-8 text-gray-400" />
                </div>
              </div>
            )}
            <div className="absolute bottom-4 left-4 bg-black/50 backdrop-blur-sm rounded-lg px-3 py-1">
              <span className="text-white text-sm">You</span>
            </div>
            <div className="absolute top-4 right-4 flex space-x-2">
              {!isAudioEnabled && (
                <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center">
                  <MicOff className="w-4 h-4 text-white" />
                </div>
              )}
              {isScreenSharing && (
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                  <Monitor className="w-4 h-4 text-white" />
                </div>
              )}
            </div>
          </motion.div>

          {/* Remote Videos */}
          {Array.from(remoteStreams.entries()).map(([peerId, stream], index) => (
            <motion.div
              key={peerId}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className="relative bg-gray-800 rounded-2xl overflow-hidden"
            >
              <video
                autoPlay
                playsInline
                className="w-full h-full object-cover"
                ref={(video) => {
                  if (video) video.srcObject = stream;
                }}
              />
              <div className="absolute bottom-4 left-4 bg-black/50 backdrop-blur-sm rounded-lg px-3 py-1">
                <span className="text-white text-sm">Participant {index + 1}</span>
              </div>
            </motion.div>
          ))}

          {/* Empty Slots */}
          {Array.from({ length: Math.max(0, 6 - remoteStreams.size - 1) }).map((_, index) => (
            <div
              key={`empty-${index}`}
              className="bg-gray-800/50 border-2 border-dashed border-gray-600 rounded-2xl flex items-center justify-center"
            >
              <div className="text-center">
                <Users className="w-12 h-12 text-gray-500 mx-auto mb-2" />
                <p className="text-gray-500">Waiting for participant</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Controls */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <div className="bg-gray-800/90 backdrop-blur-xl rounded-2xl p-4 border border-gray-700">
          <div className="flex items-center space-x-4">
            <button
              onClick={toggleAudio}
              className={`p-4 rounded-full transition-all ${
                isAudioEnabled
                  ? 'bg-gray-700 hover:bg-gray-600'
                  : 'bg-red-600 hover:bg-red-700'
              }`}
            >
              {isAudioEnabled ? (
                <Mic className="w-6 h-6 text-white" />
              ) : (
                <MicOff className="w-6 h-6 text-white" />
              )}
            </button>

            <button
              onClick={toggleVideo}
              className={`p-4 rounded-full transition-all ${
                isVideoEnabled
                  ? 'bg-gray-700 hover:bg-gray-600'
                  : 'bg-red-600 hover:bg-red-700'
              }`}
            >
              {isVideoEnabled ? (
                <Video className="w-6 h-6 text-white" />
              ) : (
                <VideoOff className="w-6 h-6 text-white" />
              )}
            </button>

            <button
              onClick={toggleScreenShare}
              className={`p-4 rounded-full transition-all ${
                isScreenSharing
                  ? 'bg-blue-600 hover:bg-blue-700'
                  : 'bg-gray-700 hover:bg-gray-600'
              }`}
            >
              <Monitor className="w-6 h-6 text-white" />
            </button>

            <button
              onClick={() => setShowSettings(!showSettings)}
              className="p-4 bg-gray-700 hover:bg-gray-600 rounded-full transition-all"
            >
              <Settings className="w-6 h-6 text-white" />
            </button>

            <button className="p-4 bg-gray-700 hover:bg-gray-600 rounded-full transition-all">
              <MessageCircle className="w-6 h-6 text-white" />
            </button>

            <button
              onClick={handleLeaveRoom}
              className="p-4 bg-red-600 hover:bg-red-700 rounded-full transition-all"
            >
              <PhoneOff className="w-6 h-6 text-white" />
            </button>
          </div>
        </div>
      </motion.div>

      {/* Room Info */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="absolute top-8 left-8"
      >
        <div className="bg-gray-800/90 backdrop-blur-xl rounded-xl p-4 border border-gray-700">
          <div className="flex items-center space-x-3">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
            <div>
              <div className="text-white font-medium">Room: {roomId}</div>
              <div className="text-gray-400 text-sm">
                {participants.size + 1} participant{participants.size !== 0 ? 's' : ''}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}