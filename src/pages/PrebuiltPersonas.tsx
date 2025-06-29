import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  MessageCircle, 
  Video, 
  Star, 
  Users, 
  Filter,
  Search,
  Play,
  Sparkles,
  Brain,
  Briefcase,
  GraduationCap,
  Heart
} from 'lucide-react';
import { prebuiltPersonas, PrebuiltPersona } from '../data/prebuiltPersonas';

export function PrebuiltPersonas() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    { id: 'all', label: 'All Personas', icon: Users },
    { id: 'professional', label: 'Professional', icon: Briefcase },
    { id: 'educational', label: 'Educational', icon: GraduationCap },
    { id: 'wellness', label: 'Wellness', icon: Heart },
    { id: 'entertainment', label: 'Creative', icon: Sparkles },
  ];

  const filteredPersonas = prebuiltPersonas.filter(persona => {
    const matchesCategory = selectedCategory === 'all' || persona.category === selectedCategory;
    const matchesSearch = persona.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         persona.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         persona.features.some(feature => feature.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'professional': return 'from-blue-500 to-indigo-500';
      case 'educational': return 'from-emerald-500 to-teal-500';
      case 'wellness': return 'from-rose-500 to-pink-500';
      case 'entertainment': return 'from-purple-500 to-violet-500';
      default: return 'from-slate-500 to-slate-600';
    }
  };

  return (
    <div className="min-h-screen py-8 px-4 bg-slate-50 dark:bg-slate-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl">
            <Brain className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl font-serif font-bold text-slate-900 dark:text-slate-100 mb-4">
            Professional AI Personas
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
            Interact with expert AI personas designed for specific use cases. Perfect for learning, 
            practice, and professional development.
          </p>
        </motion.div>

        {/* Search and Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 dark:text-slate-500 w-5 h-5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search personas by name, description, or features..."
                className="w-full pl-10 pr-4 py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-rose-500 dark:focus:border-rose-400 focus:ring-2 focus:ring-rose-500/20 dark:focus:ring-rose-400/20 transition-all shadow-sm"
              />
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-2xl font-medium transition-all ${
                  selectedCategory === category.id
                    ? 'bg-rose-600 text-white shadow-lg'
                    : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700'
                }`}
              >
                <category.icon className="w-4 h-4" />
                <span>{category.label}</span>
              </button>
            ))}
          </div>
        </motion.div>

        {/* Personas Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {filteredPersonas.map((persona, index) => (
            <motion.div
              key={persona.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + index * 0.1 }}
              whileHover={{ scale: 1.02, y: -5 }}
              className="group bg-white dark:bg-slate-800 rounded-3xl p-6 shadow-lg dark:shadow-slate-900/20 border border-slate-200/50 dark:border-slate-700/50 hover:shadow-xl dark:hover:shadow-slate-900/30 transition-all duration-300"
            >
              <div className="flex items-start space-x-4 mb-4">
                <div className="relative">
                  <img
                    src={persona.avatar}
                    alt={persona.name}
                    className="w-16 h-16 rounded-2xl object-cover shadow-md"
                  />
                  <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-emerald-500 rounded-full border-2 border-white dark:border-slate-800"></div>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 group-hover:text-rose-600 dark:group-hover:text-rose-400 transition-colors">
                    {persona.name}
                  </h3>
                  <div className="flex items-center space-x-2 mb-2">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full bg-gradient-to-r ${getCategoryColor(persona.category)} text-white`}>
                      {persona.category}
                    </span>
                    <div className="flex items-center space-x-1 text-yellow-500">
                      <Star className="w-4 h-4 fill-current" />
                      <span className="text-sm text-slate-600 dark:text-slate-400">{persona.rating}</span>
                    </div>
                  </div>
                </div>
              </div>

              <p className="text-slate-600 dark:text-slate-300 text-sm mb-4 line-clamp-3">{persona.description}</p>

              <div className="mb-4">
                <div className="flex flex-wrap gap-1 mb-3">
                  {persona.features.slice(0, 3).map((feature, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-1 bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400 text-xs rounded-lg"
                    >
                      {feature}
                    </span>
                  ))}
                  {persona.features.length > 3 && (
                    <span className="px-2 py-1 bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400 text-xs rounded-lg">
                      +{persona.features.length - 3} more
                    </span>
                  )}
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400">{persona.useCase}</p>
              </div>

              <div className="flex items-center justify-between text-sm text-slate-500 dark:text-slate-400 mb-4">
                <div className="flex items-center space-x-1">
                  <Users className="w-4 h-4" />
                  <span>{persona.conversationCount.toLocaleString()} chats</span>
                </div>
              </div>

              <div className="flex space-x-2">
                <Link
                  to={`/prebuilt-chat/${persona.id}`}
                  className="flex-1 flex items-center justify-center space-x-2 py-2 bg-rose-600 hover:bg-rose-700 rounded-2xl text-white font-medium transition-all duration-300 hover:scale-105 shadow-md"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Chat</span>
                </Link>
                <Link
                  to={`/prebuilt-video/${persona.id}`}
                  className="flex-1 flex items-center justify-center space-x-2 py-2 bg-purple-600 hover:bg-purple-700 rounded-2xl text-white font-medium transition-all duration-300 hover:scale-105 shadow-md"
                >
                  <Video className="w-4 h-4" />
                  <span>Video</span>
                </Link>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {filteredPersonas.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <div className="w-16 h-16 bg-slate-200 dark:bg-slate-700 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-slate-400 dark:text-slate-500" />
            </div>
            <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-2">No personas found</h3>
            <p className="text-slate-600 dark:text-slate-400">Try adjusting your search or filter criteria</p>
          </motion.div>
        )}

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-16 bg-gradient-to-br from-rose-600 to-purple-600 rounded-3xl p-8 text-white text-center shadow-2xl"
        >
          <h2 className="text-2xl font-semibold mb-4">Ready to Create Your Own?</h2>
          <p className="text-white/90 mb-6 max-w-2xl mx-auto">
            While these professional personas are great for learning and practice, 
            create your own personal Echo to preserve the memories of your loved ones.
          </p>
          <Link
            to="/create-persona"
            className="inline-flex items-center space-x-2 px-6 py-3 bg-white/20 backdrop-blur-sm text-white rounded-2xl font-semibold hover:bg-white/30 transition-all duration-200 hover:scale-105 border border-white/20 shadow-lg"
          >
            <Sparkles className="w-5 h-5" />
            <span>Create Personal Echo</span>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}