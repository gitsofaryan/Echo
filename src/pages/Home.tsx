import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Heart, 
  MessageCircle, 
  Video, 
  Mic, 
  Camera,
  Shield,
  Star,
  ArrowRight,
  Play,
  CheckCircle,
  Users,
  Clock,
  Sparkles,
  Brain,
  Sun,
  Moon,
  Zap
} from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

export function Home() {
  const { theme, toggleTheme } = useTheme();

  const features = [
    {
      icon: Camera,
      title: 'Lifelike Avatars',
      description: 'Upload photos to create stunning AI avatars that capture every detail of your loved one.',
      color: 'from-rose-500 to-pink-500',
    },
    {
      icon: Mic,
      title: 'Voice Preservation',
      description: 'Record voice samples to recreate their unique speech patterns and tone.',
      color: 'from-purple-500 to-indigo-500',
    },
    {
      icon: MessageCircle,
      title: 'Natural Conversations',
      description: 'Chat naturally with AI that remembers stories, jokes, and personal memories.',
      color: 'from-blue-500 to-cyan-500',
    },
    {
      icon: Video,
      title: 'Video Calls',
      description: 'See and talk to your loved ones through immersive video conversations.',
      color: 'from-emerald-500 to-teal-500',
    },
  ];

  const steps = [
    {
      number: '01',
      title: 'Upload Memories',
      description: 'Share photos, voice recordings, and stories that capture their essence.',
    },
    {
      number: '02',
      title: 'AI Training',
      description: 'Our advanced AI learns their personality, speech patterns, and mannerisms.',
    },
    {
      number: '03',
      title: 'Connect Anytime',
      description: 'Talk, chat, or video call with your preserved loved one whenever you need them.',
    },
  ];

  const testimonials = [
    {
      name: 'Sarah Chen',
      role: 'Daughter',
      content: 'Being able to talk to my mom again has brought so much comfort to our family. It feels like she\'s still with us.',
      avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=100',
      rating: 5,
    },
    {
      name: 'Michael Rodriguez',
      role: 'Son',
      content: 'The AI captured my father\'s humor perfectly. My kids can now hear their grandfather\'s stories.',
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100',
      rating: 5,
    },
    {
      name: 'Emily Johnson',
      role: 'Wife',
      content: 'Echo helped me process my grief while keeping my husband\'s memory alive for our children.',
      avatar: 'https://images.pexels.com/photos/712513/pexels-photo-712513.jpeg?auto=compress&cs=tinysrgb&w=100',
      rating: 5,
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 transition-colors duration-300">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-2xl border-b border-slate-200/50 dark:border-slate-700/50 shadow-lg dark:shadow-slate-900/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-rose-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-serif font-bold bg-gradient-to-r from-rose-600 to-purple-600 bg-clip-text text-transparent">
                Echo
              </span>
            </div>

            <div className="hidden md:flex items-center space-x-8">
              <a href="#how-it-works" className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 font-medium transition-colors">How It Works</a>
              <a href="#testimonials" className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 font-medium transition-colors">Stories</a>
              <Link to="/prebuilt-personas" className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 font-medium transition-colors">AI Personas</Link>
              <Link to="/pricing" className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 font-medium transition-colors">Pricing</Link>
              <Link to="/about" className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 font-medium transition-colors">About</Link>
            </div>

            <div className="flex items-center space-x-4">
              {/* Theme Toggle */}
              <motion.button
                onClick={toggleTheme}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="p-2.5 rounded-2xl bg-slate-100/50 dark:bg-slate-800/50 hover:bg-slate-200/50 dark:hover:bg-slate-700/50 transition-all duration-300 border border-slate-200/50 dark:border-slate-700/50"
              >
                <motion.div
                  initial={false}
                  animate={{ rotate: theme === 'dark' ? 180 : 0 }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                >
                  {theme === 'light' ? (
                    <Moon className="w-4 h-4 text-slate-600 dark:text-slate-400" />
                  ) : (
                    <Sun className="w-4 h-4 text-slate-600 dark:text-slate-400" />
                  )}
                </motion.div>
              </motion.button>

              <Link
                to="/dashboard"
                className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 font-medium transition-colors"
              >
                Sign In
              </Link>
              <Link
                to="/create-persona"
                className="px-6 py-2 bg-gradient-to-r from-rose-600 to-purple-600 text-white rounded-2xl font-semibold hover:shadow-lg transition-all duration-200 hover:scale-105"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-24 pb-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-rose-50 via-purple-50 to-blue-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900"></div>
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-br from-rose-200/30 to-purple-200/30 dark:from-rose-600/20 dark:to-purple-600/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-br from-purple-200/30 to-blue-200/30 dark:from-purple-600/20 dark:to-blue-600/20 rounded-full blur-3xl"></div>
        
        <div className="relative max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-7xl font-serif font-bold mb-8 leading-tight">
              <span className="bg-gradient-to-r from-rose-600 via-purple-600 to-blue-600 bg-clip-text text-transparent">
                Preserve
              </span>
              <br />
              <span className="text-slate-900 dark:text-slate-100">Cherished Connections</span>
            </h1>
            <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-400 mb-6 max-w-4xl mx-auto leading-relaxed">
              Create lifelike AI avatars of loved ones to preserve their voice, personality, and memories forever. 
              Connect through video, chat, and voice interactions.
            </p>
            <p className="text-lg text-slate-500 dark:text-slate-500 mb-12 max-w-2xl mx-auto">
              Whether they've passed away or are far from home, Echo helps you maintain those precious bonds that matter most.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
          >
            <Link
              to="/create-persona"
              className="group px-8 py-4 bg-gradient-to-r from-rose-600 to-purple-600 text-white rounded-2xl font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
            >
              <span className="flex items-center space-x-2">
                <Sparkles className="w-5 h-5" />
                <span>Create Your First Echo</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>
            
            <Link
              to="/prebuilt-personas"
              className="group px-8 py-4 border-2 border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 rounded-2xl font-semibold hover:border-slate-400 dark:hover:border-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all duration-300"
            >
              <span className="flex items-center space-x-2">
                <Brain className="w-5 h-5" />
                <span>Try AI Personas</span>
              </span>
            </Link>
          </motion.div>

          {/* Demo Preview */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="relative max-w-4xl mx-auto"
          >
            <div className="relative bg-white dark:bg-slate-800 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-700 overflow-hidden">
              <div className="bg-slate-100 dark:bg-slate-700 px-6 py-4 border-b border-slate-200 dark:border-slate-600">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                  <span className="ml-4 text-sm text-slate-600 dark:text-slate-400 font-medium">Echo - Video Call with Grandma</span>
                </div>
              </div>
              <div className="aspect-video bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-700 dark:to-slate-800 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-24 h-24 bg-gradient-to-br from-rose-400 to-purple-500 rounded-full mx-auto mb-4 flex items-center justify-center shadow-xl">
                    <Video className="w-12 h-12 text-white" />
                  </div>
                  <p className="text-slate-600 dark:text-slate-400 font-medium">Interactive Demo Coming Soon</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-white dark:bg-slate-800 transition-colors duration-300">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6 text-slate-900 dark:text-slate-100">
              Advanced AI Technology
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
              Our cutting-edge AI preserves not just appearance, but the essence of who they were
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ scale: 1.05, y: -10 }}
                className="group relative"
              >
                <div className="relative bg-white dark:bg-slate-700 rounded-3xl p-8 shadow-lg border border-slate-200 dark:border-slate-600 hover:shadow-xl transition-all duration-300">
                  <div className={`w-16 h-16 bg-gradient-to-br ${feature.color} rounded-3xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-4 text-slate-900 dark:text-slate-100">{feature.title}</h3>
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 px-4 bg-slate-50 dark:bg-slate-900 transition-colors duration-300">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6 text-slate-900 dark:text-slate-100">
              How Echo Works
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
              Three simple steps to preserve your loved one's essence forever
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="text-center"
              >
                <div className="relative mb-8">
                  <div className="w-20 h-20 bg-gradient-to-br from-rose-500 to-purple-600 rounded-full flex items-center justify-center mx-auto shadow-xl">
                    <span className="text-2xl font-bold text-white">{step.number}</span>
                  </div>
                  {index < steps.length - 1 && (
                    <div className="hidden md:block absolute top-10 left-full w-full h-0.5 bg-gradient-to-r from-rose-200 to-purple-200 dark:from-rose-800 dark:to-purple-800"></div>
                  )}
                </div>
                <h3 className="text-2xl font-semibold mb-4 text-slate-900 dark:text-slate-100">{step.title}</h3>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 px-4 bg-white dark:bg-slate-800 transition-colors duration-300">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6 text-slate-900 dark:text-slate-100">
              Stories of Connection
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
              Real families sharing how Echo has helped them stay connected
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white dark:bg-slate-700 rounded-3xl p-8 shadow-lg border border-slate-200 dark:border-slate-600"
              >
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-slate-700 dark:text-slate-300 mb-6 leading-relaxed italic">"{testimonial.content}"</p>
                <div className="flex items-center">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover mr-4"
                  />
                  <div>
                    <div className="font-semibold text-slate-900 dark:text-slate-100">{testimonial.name}</div>
                    <div className="text-slate-500 dark:text-slate-400 text-sm">{testimonial.role}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Security Section */}
      <section className="py-20 px-4 bg-slate-50 dark:bg-slate-900 transition-colors duration-300">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <div className="w-20 h-20 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full flex items-center justify-center mx-auto mb-8 shadow-xl">
              <Shield className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6 text-slate-900 dark:text-slate-100">
              Your Privacy is Sacred
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto mb-8">
              We understand the deeply personal nature of what you're sharing. Your data is encrypted, secure, and never shared.
            </p>
            <div className="flex flex-wrap justify-center gap-6">
              <div className="flex items-center space-x-2 bg-white dark:bg-slate-800 px-4 py-2 rounded-full shadow-sm border border-slate-200 dark:border-slate-700">
                <CheckCircle className="w-5 h-5 text-emerald-500" />
                <span className="text-slate-700 dark:text-slate-300 font-medium">End-to-End Encryption</span>
              </div>
              <div className="flex items-center space-x-2 bg-white dark:bg-slate-800 px-4 py-2 rounded-full shadow-sm border border-slate-200 dark:border-slate-700">
                <CheckCircle className="w-5 h-5 text-emerald-500" />
                <span className="text-slate-700 dark:text-slate-300 font-medium">GDPR Compliant</span>
              </div>
              <div className="flex items-center space-x-2 bg-white dark:bg-slate-800 px-4 py-2 rounded-full shadow-sm border border-slate-200 dark:border-slate-700">
                <CheckCircle className="w-5 h-5 text-emerald-500" />
                <span className="text-slate-700 dark:text-slate-300 font-medium">SOC 2 Certified</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-rose-600 via-purple-600 to-blue-600">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6 text-white">
              Start Your Journey Today
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Create your first Echo and begin preserving the memories that matter most.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/create-persona"
                className="inline-flex items-center space-x-2 px-8 py-4 bg-white/20 backdrop-blur-sm text-white rounded-2xl font-semibold shadow-xl hover:bg-white/30 transition-all duration-300 hover:scale-105 border border-white/20"
              >
                <Heart className="w-5 h-5" />
                <span>Create Your First Echo</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                to="/prebuilt-personas"
                className="inline-flex items-center space-x-2 px-8 py-4 border-2 border-white/30 text-white rounded-2xl font-semibold hover:bg-white/10 transition-all duration-300"
              >
                <Brain className="w-5 h-5" />
                <span>Try AI Personas</span>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 px-4 bg-slate-900 dark:bg-slate-950 text-white transition-colors duration-300">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-rose-500 to-purple-600 rounded-2xl flex items-center justify-center">
                  <Heart className="w-6 h-6 text-white" />
                </div>
                <span className="text-2xl font-serif font-bold">Echo</span>
              </div>
              <p className="text-slate-400 leading-relaxed mb-6">
                Preserving cherished connections through advanced AI technology.
              </p>
              
              {/* Built with Bolt.new Badge */}
              <motion.a
                href="https://bolt.new"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl text-white text-sm font-medium hover:shadow-lg transition-all duration-300 group"
              >
                <Zap className="w-4 h-4 group-hover:animate-pulse" />
                <span>Built with Bolt.new</span>
              </motion.a>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Product</h3>
              <ul className="space-y-2 text-slate-400">
                <li><Link to="/dashboard" className="hover:text-white transition-colors">Dashboard</Link></li>
                <li><Link to="/prebuilt-personas" className="hover:text-white transition-colors">AI Personas</Link></li>
                <li><Link to="/create-persona" className="hover:text-white transition-colors">Create Echo</Link></li>
                <li><Link to="/pricing" className="hover:text-white transition-colors">Pricing</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-slate-400">
                <li><Link to="/support" className="hover:text-white transition-colors">Help Center</Link></li>
                <li><Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
                <li><Link to="/about" className="hover:text-white transition-colors">About Us</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Connect</h3>
              <ul className="space-y-2 text-slate-400">
                <li><a href="#" className="hover:text-white transition-colors">Twitter</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Facebook</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Instagram</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-slate-800 pt-8 text-center text-slate-400">
            <p>&copy; 2025 Echo. All rights reserved. Made with ❤️ for preserving memories.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}