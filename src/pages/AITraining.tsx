import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Brain, 
  Play, 
  Pause, 
  Square, 
  Upload, 
  Settings, 
  TrendingUp,
  Clock,
  CheckCircle,
  AlertCircle,
  Plus
} from 'lucide-react';
import toast from 'react-hot-toast';

// Mock training sessions
const mockSessions = [
  {
    id: '1',
    model_name: 'Emotion Recognition Model',
    status: 'completed',
    progress: 100,
    created_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    completed_at: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    training_data: { samples: 1500, accuracy: 95.2 },
  },
  {
    id: '2',
    model_name: 'Voice Enhancement AI',
    status: 'training',
    progress: 67,
    created_at: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
    training_data: { samples: 800, accuracy: 87.5 },
  },
  {
    id: '3',
    model_name: 'Background Noise Filter',
    status: 'pending',
    progress: 0,
    created_at: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
    training_data: { samples: 2000 },
  },
];

function TrainingCard({ session }: { session: any }) {
  const getStatusIcon = () => {
    switch (session.status) {
      case 'completed':
        return <CheckCircle className="w-5 h-5 text-green-400" />;
      case 'training':
        return <Clock className="w-5 h-5 text-blue-400 animate-spin" />;
      case 'failed':
        return <AlertCircle className="w-5 h-5 text-red-400" />;
      default:
        return <Clock className="w-5 h-5 text-gray-400" />;
    }
  };

  const getStatusColor = () => {
    switch (session.status) {
      case 'completed':
        return 'text-green-400';
      case 'training':
        return 'text-blue-400';
      case 'failed':
        return 'text-red-400';
      default:
        return 'text-gray-400';
    }
  };

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-6 hover:border-gray-600 transition-all duration-300"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
            <Brain className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white">{session.model_name}</h3>
            <div className="flex items-center space-x-2">
              {getStatusIcon()}
              <span className={`text-sm capitalize ${getStatusColor()}`}>
                {session.status}
              </span>
            </div>
          </div>
        </div>
        <button className="p-2 hover:bg-gray-700/50 rounded-lg transition-colors">
          <Settings className="w-5 h-5 text-gray-400" />
        </button>
      </div>

      {/* Progress Bar */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-gray-400">Progress</span>
          <span className="text-sm text-white">{session.progress}%</span>
        </div>
        <div className="w-full bg-gray-700 rounded-full h-2">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${session.progress}%` }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full"
          />
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <div className="text-sm text-gray-400">Training Samples</div>
          <div className="text-lg font-semibold text-white">
            {session.training_data.samples?.toLocaleString() || 'N/A'}
          </div>
        </div>
        {session.training_data.accuracy && (
          <div>
            <div className="text-sm text-gray-400">Accuracy</div>
            <div className="text-lg font-semibold text-white">
              {session.training_data.accuracy}%
            </div>
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="flex items-center space-x-2">
        {session.status === 'training' && (
          <button className="flex items-center space-x-2 px-4 py-2 bg-red-600/20 hover:bg-red-600/30 rounded-lg text-red-400 transition-colors">
            <Square className="w-4 h-4" />
            <span>Stop</span>
          </button>
        )}
        {session.status === 'completed' && (
          <button className="flex items-center space-x-2 px-4 py-2 bg-green-600/20 hover:bg-green-600/30 rounded-lg text-green-400 transition-colors">
            <TrendingUp className="w-4 h-4" />
            <span>View Results</span>
          </button>
        )}
        {session.status === 'pending' && (
          <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600/20 hover:bg-blue-600/30 rounded-lg text-blue-400 transition-colors">
            <Play className="w-4 h-4" />
            <span>Start Training</span>
          </button>
        )}
      </div>
    </motion.div>
  );
}

export function AITraining() {
  const [sessions] = useState(mockSessions);
  const [showCreateModal, setShowCreateModal] = useState(false);

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-8"
        >
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">AI Training</h1>
            <p className="text-gray-400">Train custom AI models for enhanced video experiences</p>
          </div>
          <button
            onClick={() => setShowCreateModal(true)}
            className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl font-semibold text-white hover:scale-105 transition-transform"
          >
            <Plus className="w-5 h-5" />
            <span>New Training</span>
          </button>
        </motion.div>

        {/* Stats Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8"
        >
          {[
            { label: 'Active Models', value: '3', icon: Brain, color: 'from-purple-500 to-pink-500' },
            { label: 'Training Hours', value: '24.5', icon: Clock, color: 'from-blue-500 to-cyan-500' },
            { label: 'Avg Accuracy', value: '91.2%', icon: TrendingUp, color: 'from-green-500 to-emerald-500' },
            { label: 'Data Samples', value: '4.3K', icon: Upload, color: 'from-orange-500 to-red-500' },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + index * 0.1 }}
              className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 bg-gradient-to-r ${stat.color} rounded-xl flex items-center justify-center`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
              </div>
              <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
              <div className="text-gray-400 text-sm">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Training Sessions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h2 className="text-2xl font-bold text-white mb-6">Training Sessions</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {sessions.map((session, index) => (
              <motion.div
                key={session.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
              >
                <TrainingCard session={session} />
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Create Training Modal */}
        {showCreateModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowCreateModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-gray-800 border border-gray-700 rounded-2xl p-8 max-w-md w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-2xl font-bold text-white mb-6">Create New Training</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Model Name
                  </label>
                  <input
                    type="text"
                    placeholder="Enter model name"
                    className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Model Type
                  </label>
                  <select className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-xl text-white focus:outline-none focus:border-purple-500 appearance-none cursor-pointer">
                    <option value="">Select model type</option>
                    <option value="emotion">Emotion Recognition</option>
                    <option value="voice">Voice Enhancement</option>
                    <option value="noise">Noise Reduction</option>
                    <option value="gesture">Gesture Recognition</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Training Data
                  </label>
                  <div className="border-2 border-dashed border-gray-600 rounded-xl p-6 text-center">
                    <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-gray-400 text-sm">Upload training dataset</p>
                  </div>
                </div>
              </div>

              <div className="flex space-x-4 mt-8">
                <button
                  onClick={() => setShowCreateModal(false)}
                  className="flex-1 py-3 bg-gray-700 hover:bg-gray-600 rounded-xl text-white font-medium transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    toast.success('Training session created!');
                    setShowCreateModal(false);
                  }}
                  className="flex-1 py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl text-white font-medium hover:scale-105 transition-transform"
                >
                  Start Training
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </div>
    </div>
  );
}