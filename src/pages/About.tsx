import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Users, Shield, Sparkles, Target, Award } from 'lucide-react';

export function About() {
  const values = [
    {
      icon: Heart,
      title: 'Compassion First',
      description: 'We understand the deep emotional significance of preserving memories and approach every interaction with empathy and care.',
    },
    {
      icon: Shield,
      title: 'Privacy & Trust',
      description: 'Your most precious memories deserve the highest level of protection. We maintain strict privacy standards and transparent practices.',
    },
    {
      icon: Sparkles,
      title: 'Innovation',
      description: 'We continuously advance AI technology to create more authentic and meaningful connections with your loved ones.',
    },
    {
      icon: Users,
      title: 'Community',
      description: 'We believe in the power of shared experiences and support families in their journey of preserving and celebrating life.',
    },
  ];

  const team = [
    {
      name: 'Sarah Chen',
      role: 'CEO & Co-Founder',
      bio: 'Former AI researcher at Stanford, passionate about using technology to preserve human connections.',
      avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=200',
    },
    {
      name: 'Michael Rodriguez',
      role: 'CTO & Co-Founder',
      bio: 'Expert in machine learning and computer vision with 15+ years in AI development.',
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=200',
    },
    {
      name: 'Dr. Emily Johnson',
      role: 'Head of AI Ethics',
      bio: 'PhD in Psychology, ensuring our AI technology respects human dignity and emotional well-being.',
      avatar: 'https://images.pexels.com/photos/712513/pexels-photo-712513.jpeg?auto=compress&cs=tinysrgb&w=200',
    },
  ];

  return (
    <div className="min-h-screen py-8 px-4 bg-slate-50">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="w-20 h-20 bg-gradient-to-br from-rose-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <Heart className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-slate-900 mb-6">
            About Echo
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            We believe that love transcends physical presence. Echo was born from the desire to preserve 
            the essence of those we cherish most, creating lasting connections through advanced AI technology.
          </p>
        </motion.div>

        {/* Mission */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl p-8 mb-16 shadow-sm border border-slate-200"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <div className="flex items-center space-x-3 mb-6">
                <Target className="w-8 h-8 text-rose-600" />
                <h2 className="text-2xl font-semibold text-slate-900">Our Mission</h2>
              </div>
              <p className="text-slate-700 leading-relaxed mb-6">
                To help families preserve and celebrate the lives of their loved ones through cutting-edge AI technology. 
                We're creating a world where distance, time, and even death cannot break the bonds of love and connection.
              </p>
              <p className="text-slate-700 leading-relaxed">
                Every conversation, every laugh, every piece of wisdom shared through Echo helps keep precious memories alive 
                for current and future generations.
              </p>
            </div>
            <div className="bg-gradient-to-br from-rose-50 to-purple-50 rounded-2xl p-8">
              <div className="text-center">
                <div className="text-4xl font-bold text-slate-900 mb-2">10,000+</div>
                <div className="text-slate-600 mb-4">Families Connected</div>
                <div className="text-4xl font-bold text-slate-900 mb-2">1M+</div>
                <div className="text-slate-600 mb-4">Conversations Preserved</div>
                <div className="text-4xl font-bold text-slate-900 mb-2">99.9%</div>
                <div className="text-slate-600">Customer Satisfaction</div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Values */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-serif font-bold text-slate-900 text-center mb-12">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + index * 0.1 }}
                className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200"
              >
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-rose-500 to-purple-600 rounded-xl flex items-center justify-center">
                    <value.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-slate-900">{value.title}</h3>
                </div>
                <p className="text-slate-600 leading-relaxed">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Team */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-serif font-bold text-slate-900 text-center mb-12">Meet Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 text-center"
              >
                <img
                  src={member.avatar}
                  alt={member.name}
                  className="w-24 h-24 rounded-full object-cover mx-auto mb-4"
                />
                <h3 className="text-xl font-semibold text-slate-900 mb-1">{member.name}</h3>
                <p className="text-rose-600 font-medium mb-3">{member.role}</p>
                <p className="text-slate-600 text-sm leading-relaxed">{member.bio}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Recognition */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-8 text-white text-center"
        >
          <Award className="w-16 h-16 text-rose-400 mx-auto mb-6" />
          <h2 className="text-2xl font-semibold mb-4">Recognition & Awards</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <div className="text-lg font-semibold text-rose-400 mb-1">TechCrunch Disrupt</div>
              <div className="text-slate-300 text-sm">Best AI Innovation 2024</div>
            </div>
            <div>
              <div className="text-lg font-semibold text-rose-400 mb-1">Fast Company</div>
              <div className="text-slate-300 text-sm">Most Innovative Company</div>
            </div>
            <div>
              <div className="text-lg font-semibold text-rose-400 mb-1">TIME Magazine</div>
              <div className="text-slate-300 text-sm">Best Invention 2024</div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}