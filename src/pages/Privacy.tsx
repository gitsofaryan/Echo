import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Lock, Eye, Server, UserCheck, FileText } from 'lucide-react';

export function Privacy() {
  const sections = [
    {
      icon: Shield,
      title: 'Data Protection',
      content: 'Your personal data and memories are protected with enterprise-grade security measures including end-to-end encryption and secure cloud storage.',
    },
    {
      icon: Lock,
      title: 'Privacy Controls',
      content: 'You have complete control over your data. You can view, edit, or delete any information at any time through your account settings.',
    },
    {
      icon: Eye,
      title: 'Data Usage',
      content: 'We only use your data to create and improve your AI personas. We never sell your personal information or use it for advertising purposes.',
    },
    {
      icon: Server,
      title: 'Secure Storage',
      content: 'All data is stored on secure, encrypted servers with regular backups and 99.9% uptime guarantee. Your memories are safe with us.',
    },
    {
      icon: UserCheck,
      title: 'Access Rights',
      content: 'Only you have access to your personas and conversations. Our team cannot view your personal data without explicit consent.',
    },
    {
      icon: FileText,
      title: 'Transparency',
      content: 'We provide clear information about how we collect, use, and protect your data. No hidden practices or unclear terms.',
    },
  ];

  return (
    <div className="min-h-screen py-8 px-4 bg-slate-50 dark:bg-slate-900 transition-colors duration-300">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="w-20 h-20 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl">
            <Shield className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl font-serif font-bold text-slate-900 dark:text-slate-100 mb-4">
            Privacy & Security
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Your trust is sacred to us. Learn how we protect your most precious memories and personal data.
          </p>
        </motion.div>

        {/* Security Features */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12"
        >
          {sections.map((section, index) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + index * 0.1 }}
              className="bg-white dark:bg-slate-800 rounded-3xl p-6 shadow-lg dark:shadow-slate-900/20 border border-slate-200/50 dark:border-slate-700/50 hover:shadow-xl dark:hover:shadow-slate-900/30 transition-all duration-300 hover:scale-105"
            >
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <section.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">{section.title}</h3>
              </div>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">{section.content}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Detailed Privacy Policy */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white dark:bg-slate-800 rounded-3xl p-8 shadow-lg dark:shadow-slate-900/20 border border-slate-200/50 dark:border-slate-700/50"
        >
          <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-100 mb-6">Privacy Policy</h2>
          
          <div className="space-y-6 text-slate-700 dark:text-slate-300">
            <div>
              <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-2">Information We Collect</h3>
              <p className="leading-relaxed">
                We collect only the information necessary to create and maintain your AI personas, including photos, voice recordings, 
                personality descriptions, and conversation history. All data is collected with your explicit consent.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-2">How We Use Your Information</h3>
              <p className="leading-relaxed">
                Your data is used exclusively to train and operate your AI personas. We use advanced machine learning techniques 
                to create realistic avatars and conversation models while maintaining the highest privacy standards.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-2">Data Sharing</h3>
              <p className="leading-relaxed">
                We never sell, rent, or share your personal data with third parties for marketing purposes. 
                Your memories and conversations remain private and are only accessible to you.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-2">Data Retention</h3>
              <p className="leading-relaxed">
                You can delete your account and all associated data at any time. Upon deletion, all your personas, 
                conversations, and personal information will be permanently removed from our systems within 30 days.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-2">Security Measures</h3>
              <p className="leading-relaxed">
                We employ industry-standard security measures including AES-256 encryption, secure data centers, 
                regular security audits, and strict access controls to protect your information.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-2">Your Rights</h3>
              <p className="leading-relaxed">
                You have the right to access, modify, or delete your personal data at any time. You can also 
                request a copy of all data we have about you or ask questions about our privacy practices.
              </p>
            </div>
          </div>

          <div className="mt-8 p-6 bg-slate-50 dark:bg-slate-700/50 rounded-2xl">
            <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-2">Questions or Concerns?</h3>
            <p className="text-slate-600 dark:text-slate-300 mb-4">
              If you have any questions about our privacy practices or need to exercise your data rights, 
              please don't hesitate to contact us.
            </p>
            <button className="px-6 py-3 bg-rose-600 hover:bg-rose-700 text-white rounded-2xl font-medium transition-colors shadow-md">
              Contact Privacy Team
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}