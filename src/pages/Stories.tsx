import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Plus, Heart, MessageCircle, Share, MoreHorizontal, Play } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

// Mock data for stories
const mockStories = [
  {
    id: '1',
    user: {
      id: '1',
      username: 'alice_wonder',
      full_name: 'Alice Wonder',
      avatar_url: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=100',
    },
    title: 'My AI Training Journey',
    content: 'Just completed my first AI model training session! The results are incredible. The model learned to recognize emotions in video calls with 95% accuracy. This technology is going to revolutionize how we communicate.',
    media_url: 'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=800',
    media_type: 'image',
    created_at: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    likes: 24,
    comments: 8,
  },
  {
    id: '2',
    user: {
      id: '2',
      username: 'tech_guru',
      full_name: 'Tech Guru',
      avatar_url: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100',
    },
    title: 'Video Chat with 50 People!',
    content: 'Had an amazing video conference today with developers from around the world. The AI-powered noise cancellation and real-time translation features worked flawlessly. The future is here!',
    media_url: 'https://images.pexels.com/photos/4348401/pexels-photo-4348401.jpeg?auto=compress&cs=tinysrgb&w=800',
    media_type: 'image',
    created_at: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
    likes: 42,
    comments: 15,
  },
  {
    id: '3',
    user: {
      id: '3',
      username: 'creative_mind',
      full_name: 'Creative Mind',
      avatar_url: 'https://images.pexels.com/photos/712513/pexels-photo-712513.jpeg?auto=compress&cs=tinysrgb&w=100',
    },
    title: 'AI-Generated Art Collaboration',
    content: 'Collaborated with an AI to create this stunning digital artwork during our video session. The AI analyzed my drawing style in real-time and suggested improvements. Art and technology in perfect harmony!',
    media_url: 'https://images.pexels.com/photos/1762851/pexels-photo-1762851.jpeg?auto=compress&cs=tinysrgb&w=800',
    media_type: 'image',
    created_at: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    likes: 67,
    comments: 23,
  },
];

function StoryCard({ story, index }: { story: any; index: number }) {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ delay: index * 0.1 }}
      className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl overflow-hidden hover:border-gray-600 transition-all duration-300"
    >
      {/* Header */}
      <div className="p-6 pb-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <img
              src={story.user.avatar_url}
              alt={story.user.username}
              className="w-12 h-12 rounded-full object-cover"
            />
            <div>
              <h3 className="text-white font-semibold">{story.user.full_name}</h3>
              <p className="text-gray-400 text-sm">@{story.user.username}</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-gray-400 text-sm">
              {formatDistanceToNow(new Date(story.created_at), { addSuffix: true })}
            </span>
            <button className="p-2 hover:bg-gray-700/50 rounded-lg transition-colors">
              <MoreHorizontal className="w-5 h-5 text-gray-400" />
            </button>
          </div>
        </div>

        <h2 className="text-xl font-bold text-white mb-3">{story.title}</h2>
        <p className="text-gray-300 leading-relaxed">{story.content}</p>
      </div>

      {/* Media */}
      {story.media_url && (
        <div className="relative">
          {story.media_type === 'image' ? (
            <img
              src={story.media_url}
              alt={story.title}
              className="w-full h-64 object-cover"
            />
          ) : story.media_type === 'video' ? (
            <div className="relative">
              <video
                src={story.media_url}
                className="w-full h-64 object-cover"
                poster={story.media_url}
              />
              <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                <button className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors">
                  <Play className="w-8 h-8 text-white ml-1" />
                </button>
              </div>
            </div>
          ) : null}
        </div>
      )}

      {/* Actions */}
      <div className="p-6 pt-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <button className="flex items-center space-x-2 text-gray-400 hover:text-red-400 transition-colors">
              <Heart className="w-5 h-5" />
              <span className="text-sm">{story.likes}</span>
            </button>
            <button className="flex items-center space-x-2 text-gray-400 hover:text-blue-400 transition-colors">
              <MessageCircle className="w-5 h-5" />
              <span className="text-sm">{story.comments}</span>
            </button>
            <button className="flex items-center space-x-2 text-gray-400 hover:text-green-400 transition-colors">
              <Share className="w-5 h-5" />
              <span className="text-sm">Share</span>
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export function Stories() {
  const [stories] = useState(mockStories);

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-8"
        >
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">Stories</h1>
            <p className="text-gray-400">Share your AI and video chat experiences</p>
          </div>
          <Link
            to="/stories/create"
            className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl font-semibold text-white hover:scale-105 transition-transform"
          >
            <Plus className="w-5 h-5" />
            <span>Create Story</span>
          </Link>
        </motion.div>

        {/* Stories Feed */}
        <div className="space-y-8">
          {stories.map((story, index) => (
            <StoryCard key={story.id} story={story} index={index} />
          ))}
        </div>

        {/* Load More */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center mt-12"
        >
          <button className="px-8 py-3 bg-gray-700 hover:bg-gray-600 rounded-xl text-white font-medium transition-colors">
            Load More Stories
          </button>
        </motion.div>
      </div>
    </div>
  );
}