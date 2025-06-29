import React from 'react';
import { motion } from 'framer-motion';
import { Check, Heart, Star, Sparkles } from 'lucide-react';

export function Pricing() {
  const plans = [
    {
      name: 'Starter',
      price: '$19',
      period: '/month',
      description: 'Perfect for preserving one special person',
      features: [
        '1 AI Persona',
        'Unlimited conversations',
        'Voice & video calls',
        'Basic personality training',
        '5GB storage',
        'Email support',
      ],
      popular: false,
      color: 'from-slate-600 to-slate-700',
    },
    {
      name: 'Family',
      price: '$49',
      period: '/month',
      description: 'Ideal for families wanting to preserve multiple loved ones',
      features: [
        '5 AI Personas',
        'Unlimited conversations',
        'Voice & video calls',
        'Advanced personality training',
        'Family sharing',
        '50GB storage',
        'Priority support',
        'Memory timeline',
      ],
      popular: true,
      color: 'from-rose-600 to-purple-600',
    },
    {
      name: 'Legacy',
      price: '$99',
      period: '/month',
      description: 'For those who want to preserve an entire family legacy',
      features: [
        'Unlimited AI Personas',
        'Unlimited conversations',
        'Voice & video calls',
        'Premium personality training',
        'Family sharing',
        'Unlimited storage',
        '24/7 phone support',
        'Memory timeline',
        'Custom voice training',
        'API access',
      ],
      popular: false,
      color: 'from-purple-600 to-indigo-600',
    },
  ];

  return (
    <div className="min-h-screen py-8 px-4 bg-slate-50">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-slate-900 mb-6">
            Choose Your Plan
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Start preserving precious memories today. All plans include our core features with no hidden fees.
          </p>
        </motion.div>

        {/* Pricing Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16"
        >
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + index * 0.1 }}
              className={`relative bg-white rounded-2xl p-8 shadow-sm border transition-all duration-300 hover:shadow-lg ${
                plan.popular ? 'border-rose-200 ring-2 ring-rose-200' : 'border-slate-200'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-gradient-to-r from-rose-600 to-purple-600 text-white px-4 py-1 rounded-full text-sm font-medium flex items-center space-x-1">
                    <Star className="w-4 h-4" />
                    <span>Most Popular</span>
                  </div>
                </div>
              )}

              <div className="text-center mb-8">
                <h3 className="text-2xl font-semibold text-slate-900 mb-2">{plan.name}</h3>
                <p className="text-slate-600 text-sm mb-4">{plan.description}</p>
                <div className="flex items-baseline justify-center">
                  <span className="text-4xl font-bold text-slate-900">{plan.price}</span>
                  <span className="text-slate-500 ml-1">{plan.period}</span>
                </div>
              </div>

              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center space-x-3">
                    <div className="w-5 h-5 bg-emerald-100 rounded-full flex items-center justify-center">
                      <Check className="w-3 h-3 text-emerald-600" />
                    </div>
                    <span className="text-slate-700">{feature}</span>
                  </li>
                ))}
              </ul>

              <button
                className={`w-full py-3 rounded-xl font-semibold transition-all duration-200 hover:scale-105 ${
                  plan.popular
                    ? 'bg-gradient-to-r from-rose-600 to-purple-600 text-white shadow-lg'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-900'
                }`}
              >
                Get Started
              </button>
            </motion.div>
          ))}
        </motion.div>

        {/* Features Comparison */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-2xl p-8 shadow-sm border border-slate-200 mb-16"
        >
          <h2 className="text-2xl font-semibold text-slate-900 text-center mb-8">
            All Plans Include
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Heart, title: 'Secure & Private', description: 'End-to-end encryption' },
              { icon: Sparkles, title: 'AI Training', description: 'Continuous learning' },
              { icon: Check, title: 'No Contracts', description: 'Cancel anytime' },
              { icon: Star, title: '30-Day Trial', description: 'Risk-free guarantee' },
            ].map((feature, index) => (
              <div key={feature.title} className="text-center">
                <div className="w-12 h-12 bg-gradient-to-br from-rose-500 to-purple-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold text-slate-900 mb-2">{feature.title}</h3>
                <p className="text-slate-600 text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* FAQ */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-2xl p-8 shadow-sm border border-slate-200"
        >
          <h2 className="text-2xl font-semibold text-slate-900 text-center mb-8">
            Frequently Asked Questions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-semibold text-slate-900 mb-2">Can I change plans later?</h3>
              <p className="text-slate-600 text-sm">Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately.</p>
            </div>
            <div>
              <h3 className="font-semibold text-slate-900 mb-2">Is there a free trial?</h3>
              <p className="text-slate-600 text-sm">All plans come with a 30-day money-back guarantee. Try Echo risk-free.</p>
            </div>
            <div>
              <h3 className="font-semibold text-slate-900 mb-2">What payment methods do you accept?</h3>
              <p className="text-slate-600 text-sm">We accept all major credit cards, PayPal, and bank transfers.</p>
            </div>
            <div>
              <h3 className="font-semibold text-slate-900 mb-2">Can I cancel anytime?</h3>
              <p className="text-slate-600 text-sm">Yes, there are no long-term contracts. Cancel your subscription anytime from your account settings.</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}