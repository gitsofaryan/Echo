import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { HelpCircle, MessageCircle, Mail, Phone, Search, ChevronDown, ChevronUp } from 'lucide-react';

export function Support() {
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const faqs = [
    {
      question: 'How does Echo create AI personas?',
      answer: 'Echo uses advanced AI technology to analyze the photos, voice recordings, and personality information you provide. Our system creates a digital representation that captures their appearance, voice patterns, and conversational style.',
    },
    {
      question: 'Is my data secure and private?',
      answer: 'Absolutely. We use enterprise-grade encryption and security measures to protect your data. Your personal information is never shared with third parties, and you maintain complete control over your data.',
    },
    {
      question: 'How much content do I need to create a persona?',
      answer: 'For best results, we recommend 5-10 photos from different angles, 3-5 minutes of voice recordings, and detailed personality descriptions. However, you can start with less and add more content over time.',
    },
    {
      question: 'Can I modify a persona after creating it?',
      answer: 'Yes! You can always add more photos, voice samples, or update personality information. The AI will continuously improve as you provide more content.',
    },
    {
      question: 'What happens to my data if I delete my account?',
      answer: 'If you choose to delete your account, all your personas, conversations, and personal data will be permanently removed from our systems within 30 days.',
    },
    {
      question: 'Can family members access the same persona?',
      answer: 'You can share access to personas with family members through our family sharing feature. Each person will need their own account, but they can interact with shared personas.',
    },
    {
      question: 'How realistic are the conversations?',
      answer: 'Our AI is designed to capture personality traits, speech patterns, and memories you provide. While not perfect, many users find the conversations remarkably authentic and comforting.',
    },
    {
      question: 'Is there a mobile app?',
      answer: 'Currently, Echo is available as a web application that works on all devices. We\'re working on dedicated mobile apps for iOS and Android.',
    },
  ];

  const filteredFaqs = faqs.filter(faq =>
    faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen py-8 px-4 bg-slate-50 dark:bg-slate-900 transition-colors duration-300">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl">
            <HelpCircle className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl font-serif font-bold text-slate-900 dark:text-slate-100 mb-4">
            Help & Support
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            We're here to help you preserve and connect with your cherished memories.
          </p>
        </motion.div>

        {/* Contact Options */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
        >
          <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 shadow-lg dark:shadow-slate-900/20 border border-slate-200/50 dark:border-slate-700/50 text-center hover:shadow-xl dark:hover:shadow-slate-900/30 transition-all duration-300 hover:scale-105">
            <div className="w-12 h-12 bg-gradient-to-br from-rose-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
              <MessageCircle className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-2">Live Chat</h3>
            <p className="text-slate-600 dark:text-slate-400 text-sm mb-4">Get instant help from our support team</p>
            <button className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-2xl font-medium transition-colors shadow-md">
              Start Chat
            </button>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 shadow-lg dark:shadow-slate-900/20 border border-slate-200/50 dark:border-slate-700/50 text-center hover:shadow-xl dark:hover:shadow-slate-900/30 transition-all duration-300 hover:scale-105">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-indigo-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
              <Mail className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-2">Email Support</h3>
            <p className="text-slate-600 dark:text-slate-400 text-sm mb-4">Send us a detailed message</p>
            <button className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-2xl font-medium transition-colors shadow-md">
              Send Email
            </button>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 shadow-lg dark:shadow-slate-900/20 border border-slate-200/50 dark:border-slate-700/50 text-center hover:shadow-xl dark:hover:shadow-slate-900/30 transition-all duration-300 hover:scale-105">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
              <Phone className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-2">Phone Support</h3>
            <p className="text-slate-600 dark:text-slate-400 text-sm mb-4">Speak with our team directly</p>
            <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-medium transition-colors shadow-md">
              Call Now
            </button>
          </div>
        </motion.div>

        {/* FAQ Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white dark:bg-slate-800 rounded-3xl p-8 shadow-lg dark:shadow-slate-900/20 border border-slate-200/50 dark:border-slate-700/50"
        >
          <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-100 mb-6">Frequently Asked Questions</h2>
          
          {/* Search */}
          <div className="relative mb-8">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 dark:text-slate-500 w-5 h-5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for answers..."
              className="w-full pl-10 pr-4 py-3 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-2xl text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-rose-500 dark:focus:border-rose-400 focus:ring-2 focus:ring-rose-500/20 dark:focus:ring-rose-400/20 transition-all"
            />
          </div>

          {/* FAQ Items */}
          <div className="space-y-4">
            {filteredFaqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="border border-slate-200 dark:border-slate-700 rounded-2xl overflow-hidden"
              >
                <button
                  onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                  className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors"
                >
                  <span className="font-medium text-slate-900 dark:text-slate-100">{faq.question}</span>
                  {expandedFaq === index ? (
                    <ChevronUp className="w-5 h-5 text-slate-500 dark:text-slate-400" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-slate-500 dark:text-slate-400" />
                  )}
                </button>
                {expandedFaq === index && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="px-6 pb-4"
                  >
                    <p className="text-slate-600 dark:text-slate-300 leading-relaxed">{faq.answer}</p>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>

          {filteredFaqs.length === 0 && (
            <div className="text-center py-8">
              <p className="text-slate-500 dark:text-slate-400">No results found for "{searchQuery}"</p>
              <p className="text-slate-400 dark:text-slate-500 text-sm mt-2">Try different keywords or contact our support team</p>
            </div>
          )}
        </motion.div>

        {/* Additional Resources */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-8 bg-gradient-to-br from-rose-50 to-purple-50 dark:from-rose-900/20 dark:to-purple-900/20 rounded-3xl p-8 border border-rose-100 dark:border-rose-800/30"
        >
          <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-100 mb-4">Still need help?</h3>
          <p className="text-slate-600 dark:text-slate-300 mb-6">
            Our support team is available 24/7 to help you with any questions or concerns. 
            We understand the sensitive nature of preserving memories and are here to support you every step of the way.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <button className="px-6 py-3 bg-rose-600 hover:bg-rose-700 text-white rounded-2xl font-medium transition-colors shadow-md">
              Contact Support
            </button>
            <button className="px-6 py-3 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-2xl font-medium border border-slate-200 dark:border-slate-700 transition-colors shadow-md">
              View Documentation
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}