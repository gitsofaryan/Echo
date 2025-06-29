import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Plus, MessageCircle, Video, Heart, Clock, Users, Sparkles } from 'lucide-react';
import { mockPersonas } from '../data/mockPersonas';

export function Dashboard() {
  const recentInteractions = [
    { persona: 'Grandma Rose', type: 'video', time: '2 hours ago', duration: '15 min' },
    { persona: 'Dad', type: 'chat', time: '1 day ago', messages: 12 },
    { persona: 'Mom', type: 'voice', time: '3 days ago', duration: '8 min' },
  ];

  const stats = [
    { label: 'Total Echoes', value: '4', icon: Users, color: 'from-rose-500 to-pink-500' },
    { label: 'Conversations', value: '127', icon: MessageCircle, color: 'from-purple-500 to-indigo-500' },
    { label: 'Hours Connected', value: '24', icon: Clock, color: 'from-blue-500 to-cyan-500' },
    { label: 'Memories Preserved', value: '89', icon: Heart, color: 'from-emerald-500 to-teal-500' },
  ];

  return (
    <div className="min-h-screen py-8 px-4 bg-slate-50 dark:bg-slate-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-serif font-bold text-slate-900 dark:text-slate-100 mb-2">
            Welcome back, Demo User
          </h1>
          <p className="text-slate-600 dark:text-slate-400">
            Your preserved connections are waiting for you
          </p>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <div className="bg-gradient-to-br from-rose-500 to-purple-600 rounded-3xl p-8 text-white shadow-2xl">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="mb-6 md:mb-0">
                <h2 className="text-2xl font-semibold mb-2">Create Your First Echo</h2>
                <p className="text-white/90">Preserve the voice and personality of someone special</p>
              </div>
              <Link
                to="/create-persona"
                className="flex items-center space-x-2 px-6 py-3 bg-white/20 backdrop-blur-sm text-white rounded-2xl font-semibold hover:bg-white/30 transition-all duration-200 hover:scale-105 border border-white/20"
              >
                <Plus className="w-5 h-5" />
                <span>Get Started</span>
              </Link>
            </div>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + index * 0.1 }}
              className="bg-white dark:bg-slate-800 rounded-3xl p-6 shadow-lg dark:shadow-slate-900/20 border border-slate-200/50 dark:border-slate-700/50 hover:shadow-xl dark:hover:shadow-slate-900/30 transition-all duration-300 hover:scale-105"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 bg-gradient-to-br ${stat.color} rounded-2xl flex items-center justify-center shadow-lg`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
              </div>
              <div className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-1">{stat.value}</div>
              <div className="text-slate-600 dark:text-slate-400 text-sm">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* My Echoes */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="lg:col-span-2"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">My Echoes</h2>
              <Link
                to="/create-persona"
                className="flex items-center space-x-2 text-rose-600 dark:text-rose-400 hover:text-rose-700 dark:hover:text-rose-300 font-medium transition-colors duration-200"
              >
                <Plus className="w-4 h-4" />
                <span>Create New</span>
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {mockPersonas.slice(0, 4).map((persona, index) => (
                <motion.div
                  key={persona.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  whileHover={{ scale: 1.02, y: -5 }}
                  className="group"
                >
                  <Link
                    to={`/personas/${persona.id}`}
                    className="block bg-white dark:bg-slate-800 rounded-3xl p-6 shadow-lg dark:shadow-slate-900/20 border border-slate-200/50 dark:border-slate-700/50 hover:shadow-xl dark:hover:shadow-slate-900/30 transition-all duration-300"
                  >
                    <div className="flex items-center space-x-4 mb-4">
                      <div className="relative">
                        <img
                          src={persona.avatar}
                          alt={persona.name}
                          className="w-16 h-16 rounded-2xl object-cover shadow-md"
                        />
                        <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-emerald-500 rounded-full border-2 border-white dark:border-slate-800 shadow-sm"></div>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 group-hover:text-rose-600 dark:group-hover:text-rose-400 transition-colors">
                          {persona.name}
                        </h3>
                        <p className="text-slate-500 dark:text-slate-400 text-sm capitalize">{persona.category}</p>
                      </div>
                    </div>

                    <p className="text-slate-600 dark:text-slate-300 text-sm mb-4 line-clamp-2">{persona.description}</p>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4 text-sm text-slate-500 dark:text-slate-400">
                        <div className="flex items-center space-x-1">
                          <MessageCircle className="w-4 h-4" />
                          <span>{persona.conversationCount}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Heart className="w-4 h-4" />
                          <span>{persona.memories || 0}</span>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <button className="p-2 bg-rose-50 dark:bg-rose-900/20 hover:bg-rose-100 dark:hover:bg-rose-900/30 rounded-xl transition-colors">
                          <MessageCircle className="w-4 h-4 text-rose-600 dark:text-rose-400" />
                        </button>
                        <button className="p-2 bg-purple-50 dark:bg-purple-900/20 hover:bg-purple-100 dark:hover:bg-purple-900/30 rounded-xl transition-colors">
                          <Video className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                        </button>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Recent Activity */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="space-y-6"
          >
            <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 shadow-lg dark:shadow-slate-900/20 border border-slate-200/50 dark:border-slate-700/50">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-4">Recent Interactions</h3>
              <div className="space-y-4">
                {recentInteractions.map((interaction, index) => (
                  <div key={index} className="flex items-center space-x-3 p-3 bg-slate-50 dark:bg-slate-700/50 rounded-2xl hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors cursor-pointer">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                      interaction.type === 'video' ? 'bg-purple-100 dark:bg-purple-900/30' :
                      interaction.type === 'chat' ? 'bg-rose-100 dark:bg-rose-900/30' : 'bg-blue-100 dark:bg-blue-900/30'
                    }`}>
                      {interaction.type === 'video' ? (
                        <Video className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                      ) : interaction.type === 'chat' ? (
                        <MessageCircle className="w-5 h-5 text-rose-600 dark:text-rose-400" />
                      ) : (
                        <Sparkles className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="font-medium text-slate-900 dark:text-slate-100">{interaction.persona}</div>
                      <div className="text-sm text-slate-500 dark:text-slate-400">
                        {interaction.time} • {interaction.duration || `${interaction.messages} messages`}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-3xl p-6 border border-blue-100 dark:border-blue-800/30">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">Memory Tip</h3>
              </div>
              <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
                Add more voice recordings to make your Echo's responses even more authentic. 
                The more samples you provide, the better we can capture their unique speech patterns.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}