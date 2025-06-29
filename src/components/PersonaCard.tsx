import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MessageCircle, Video, Edit, Trash2, Calendar, Star } from 'lucide-react';
import { Persona } from '../types/persona';

interface PersonaCardProps {
  persona: Persona;
  viewMode: 'grid' | 'list';
}

export function PersonaCard({ persona, viewMode }: PersonaCardProps) {
  if (viewMode === 'list') {
    return (
      <motion.div
        whileHover={{ scale: 1.02 }}
        className="group relative bg-dark-800/30 backdrop-blur-sm border border-white/5 rounded-2xl p-6 hover:border-violet-400/30 transition-all duration-300"
      >
        <div className="flex items-center space-x-6">
          <div className="relative">
            <img
              src={persona.avatar}
              alt={persona.name}
              className="w-16 h-16 rounded-xl object-cover"
            />
            <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-dark-800"></div>
          </div>

          <div className="flex-1">
            <div className="flex items-start justify-between mb-2">
              <div>
                <h3 className="text-xl font-semibold text-white group-hover:text-violet-400 transition-colors">
                  {persona.name}
                </h3>
                <p className="text-gray-400 capitalize">{persona.category}</p>
              </div>
              <div className="flex items-center space-x-1 text-gold-400">
                <Star className="w-4 h-4 fill-current" />
                <span className="text-sm">{persona.rating}</span>
              </div>
            </div>
            <p className="text-gray-300 text-sm mb-4 line-clamp-2">{persona.description}</p>
            <div className="flex items-center space-x-4 text-sm text-gray-400">
              <div className="flex items-center space-x-1">
                <Calendar className="w-4 h-4" />
                <span>Created {persona.createdAt}</span>
              </div>
              <div className="flex items-center space-x-1">
                <MessageCircle className="w-4 h-4" />
                <span>{persona.conversationCount} chats</span>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Link
              to={`/chat/${persona.id}`}
              className="p-2 bg-violet-600/20 hover:bg-violet-600/30 rounded-lg transition-colors"
            >
              <MessageCircle className="w-5 h-5 text-violet-400" />
            </Link>
            <Link
              to={`/call/${persona.id}`}
              className="p-2 bg-teal-600/20 hover:bg-teal-600/30 rounded-lg transition-colors"
            >
              <Video className="w-5 h-5 text-teal-400" />
            </Link>
            <button className="p-2 bg-dark-700/50 hover:bg-dark-700 rounded-lg transition-colors">
              <Edit className="w-5 h-5 text-gray-400" />
            </button>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      whileHover={{ scale: 1.05, y: -5 }}
      className="group relative bg-dark-800/30 backdrop-blur-sm border border-white/5 rounded-2xl overflow-hidden hover:border-violet-400/30 transition-all duration-300"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-violet-600/10 to-teal-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      
      <div className="relative p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="relative">
            <img
              src={persona.avatar}
              alt={persona.name}
              className="w-16 h-16 rounded-xl object-cover"
            />
            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-dark-800"></div>
          </div>
          <div className="flex items-center space-x-1 text-gold-400">
            <Star className="w-4 h-4 fill-current" />
            <span className="text-sm">{persona.rating}</span>
          </div>
        </div>

        <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-violet-400 transition-colors">
          {persona.name}
        </h3>
        <p className="text-sm text-gray-400 capitalize mb-3">{persona.category}</p>
        <p className="text-gray-300 text-sm mb-4 line-clamp-3">{persona.description}</p>

        <div className="flex items-center justify-between text-sm text-gray-400 mb-6">
          <div className="flex items-center space-x-1">
            <MessageCircle className="w-4 h-4" />
            <span>{persona.conversationCount}</span>
          </div>
          <span>{persona.createdAt}</span>
        </div>

        <div className="flex items-center space-x-2">
          <Link
            to={`/chat/${persona.id}`}
            className="flex-1 flex items-center justify-center space-x-2 py-2 bg-violet-600/20 hover:bg-violet-600/30 rounded-lg transition-colors text-violet-400 font-medium"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Chat</span>
          </Link>
          <Link
            to={`/call/${persona.id}`}
            className="flex-1 flex items-center justify-center space-x-2 py-2 bg-teal-600/20 hover:bg-teal-600/30 rounded-lg transition-colors text-teal-400 font-medium"
          >
            <Video className="w-4 h-4" />
            <span>Call</span>
          </Link>
        </div>
      </div>
    </motion.div>
  );
}