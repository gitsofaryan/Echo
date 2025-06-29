import React from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, MessageCircle, Video, Heart, Calendar, Mic, Share, Settings } from 'lucide-react';
import { usePersona } from '../hooks/usePersona';

export function PersonaDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: persona, isLoading } = usePersona(id!);

  const recentConversations = [
    { id: 1, type: 'video', preview: 'We talked about your childhood memories...', timestamp: '2 hours ago', duration: '15 min' },
    { id: 2, type: 'chat', preview: 'I shared that story about the summer vacation...', timestamp: '1 day ago', messages: 23 },
    { id: 3, type: 'voice', preview: 'You asked about my favorite recipe...', timestamp: '3 days ago', duration: '8 min' },
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-900">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-rose-500"></div>
      </div>
    );
  }

  if (!persona) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-900">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-100 mb-2">Echo not found</h2>
          <p className="text-slate-600 dark:text-slate-400 mb-4">This Echo doesn't exist or has been removed.</p>
          <button
            onClick={() => navigate('/dashboard')}
            className="px-6 py-3 bg-rose-600 text-white rounded-xl font-medium hover:bg-rose-700 transition-colors"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8 px-4 bg-slate-50 dark:bg-slate-900 transition-colors duration-300">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <button
            onClick={() => navigate('/dashboard')}
            className="flex items-center space-x-2 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 transition-colors mb-6"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Dashboard</span>
          </button>
        </motion.div>

        {/* Persona Profile */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white dark:bg-slate-800 rounded-3xl p-8 mb-8 shadow-lg dark:shadow-slate-900/20 border border-slate-200/50 dark:border-slate-700/50"
        >
          <div className="flex flex-col lg:flex-row items-start space-y-6 lg:space-y-0 lg:space-x-8">
            <div className="relative">
              <img
                src={persona.avatar}
                alt={persona.name}
                className="w-32 h-32 rounded-3xl object-cover shadow-xl"
              />
              <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-emerald-500 rounded-full border-4 border-white dark:border-slate-800 flex items-center justify-center shadow-lg">
                <Heart className="w-4 h-4 text-white" />
              </div>
            </div>

            <div className="flex-1">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-3xl font-serif font-bold text-slate-900 dark:text-slate-100 mb-2">{persona.name}</h1>
                  <p className="text-lg text-slate-600 dark:text-slate-400 capitalize">{persona.category}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <button className="p-2 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 rounded-xl transition-colors">
                    <Share className="w-5 h-5 text-slate-600 dark:text-slate-400" />
                  </button>
                  <button className="p-2 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 rounded-xl transition-colors">
                    <Settings className="w-5 h-5 text-slate-600 dark:text-slate-400" />
                  </button>
                </div>
              </div>

              <p className="text-slate-700 dark:text-slate-300 mb-6 leading-relaxed">{persona.description}</p>

              <div className="flex flex-wrap items-center gap-6 text-sm text-slate-500 dark:text-slate-400 mb-6">
                <div className="flex items-center space-x-2">
                  <Calendar className="w-4 h-4" />
                  <span>Created {persona.createdAt}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <MessageCircle className="w-4 h-4" />
                  <span>{persona.conversationCount} conversations</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Heart className="w-4 h-4" />
                  <span>{persona.memories || 0} memories</span>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <Link
                  to={`/chat/${persona.id}`}
                  className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-rose-600 to-purple-600 rounded-2xl font-semibold text-white hover:shadow-xl transition-all duration-300 hover:scale-105 shadow-lg"
                >
                  <MessageCircle className="w-5 h-5" />
                  <span>Start Chat</span>
                </Link>

                <Link
                  to={`/call/${persona.id}`}
                  className="flex items-center space-x-2 px-6 py-3 bg-purple-100 dark:bg-purple-900/30 hover:bg-purple-200 dark:hover:bg-purple-900/50 rounded-2xl font-semibold text-purple-700 dark:text-purple-300 transition-all duration-300 hover:scale-105"
                >
                  <Video className="w-5 h-5" />
                  <span>Video Call</span>
                </Link>

                <button className="flex items-center space-x-2 px-6 py-3 bg-blue-100 dark:bg-blue-900/30 hover:bg-blue-200 dark:hover:bg-blue-900/50 rounded-2xl font-semibold text-blue-700 dark:text-blue-300 transition-all duration-300 hover:scale-105">
                  <Mic className="w-5 h-5" />
                  <span>Voice Chat</span>
                </button>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Personality & Memories */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2 space-y-6"
          >
            <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 shadow-lg dark:shadow-slate-900/20 border border-slate-200/50 dark:border-slate-700/50">
              <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100 mb-4">Personality</h2>
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                {persona.personality || 'A warm and caring person who always put family first. Known for their gentle wisdom, infectious laugh, and ability to make everyone feel loved and valued. They had a wonderful sense of humor and could find joy in the simplest moments.'}
              </p>
            </div>

            <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 shadow-lg dark:shadow-slate-900/20 border border-slate-200/50 dark:border-slate-700/50">
              <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100 mb-4">Cherished Memories</h2>
              <div className="space-y-4">
                <div className="p-4 bg-rose-50 dark:bg-rose-900/20 rounded-2xl border border-rose-100 dark:border-rose-800/30">
                  <h3 className="font-medium text-slate-900 dark:text-slate-100 mb-2">Sunday Family Dinners</h3>
                  <p className="text-slate-600 dark:text-slate-400 text-sm">Every Sunday, the whole family would gather for dinner. They would tell stories, share laughs, and create memories that lasted a lifetime.</p>
                </div>
                <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-2xl border border-purple-100 dark:border-purple-800/30">
                  <h3 className="font-medium text-slate-900 dark:text-slate-100 mb-2">Bedtime Stories</h3>
                  <p className="text-slate-600 dark:text-slate-400 text-sm">They had a magical way of telling bedtime stories, complete with different voices for each character and dramatic pauses that kept everyone captivated.</p>
                </div>
                <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-2xl border border-blue-100 dark:border-blue-800/30">
                  <h3 className="font-medium text-slate-900 dark:text-slate-100 mb-2">Garden Wisdom</h3>
                  <p className="text-slate-600 dark:text-slate-400 text-sm">Spent countless hours in the garden, teaching about patience, growth, and the beauty of nurturing something from seed to bloom.</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Recent Conversations */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="space-y-6"
          >
            <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 shadow-lg dark:shadow-slate-900/20 border border-slate-200/50 dark:border-slate-700/50">
              <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100 mb-4">Recent Conversations</h2>
              <div className="space-y-4">
                {recentConversations.map((conversation) => (
                  <div key={conversation.id} className="p-4 bg-slate-50 dark:bg-slate-700/50 rounded-2xl hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors cursor-pointer">
                    <div className="flex items-start space-x-3">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                        conversation.type === 'video' ? 'bg-purple-100 dark:bg-purple-900/30' :
                        conversation.type === 'chat' ? 'bg-rose-100 dark:bg-rose-900/30' : 'bg-blue-100 dark:bg-blue-900/30'
                      }`}>
                        {conversation.type === 'video' ? (
                          <Video className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                        ) : conversation.type === 'chat' ? (
                          <MessageCircle className="w-5 h-5 text-rose-600 dark:text-rose-400" />
                        ) : (
                          <Mic className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                        )}
                      </div>
                      <div className="flex-1">
                        <p className="text-slate-700 dark:text-slate-300 text-sm mb-1">{conversation.preview}</p>
                        <div className="flex items-center space-x-2 text-xs text-slate-500 dark:text-slate-400">
                          <span>{conversation.timestamp}</span>
                          <span>•</span>
                          <span>{conversation.duration || `${conversation.messages} messages`}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-br from-rose-50 to-purple-50 dark:from-rose-900/20 dark:to-purple-900/20 rounded-3xl p-6 border border-rose-100 dark:border-rose-800/30">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-rose-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <Heart className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">Connection Tip</h3>
              </div>
              <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
                Try asking about their favorite memories or stories. The more you interact, 
                the more their personality will shine through in conversations.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}