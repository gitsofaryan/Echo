import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Key, ExternalLink, AlertCircle, CheckCircle } from 'lucide-react';
import { useTavusIntegration } from '../hooks/useTavusIntegration';

interface TavusApiKeyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (apiKey: string) => void;
}

export function TavusApiKeyModal({ isOpen, onClose, onSave }: TavusApiKeyModalProps) {
  const [apiKey, setApiKey] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isValid, setIsValid] = useState<boolean | null>(null);
  
  const { setApiKey: saveApiKey, testConnection } = useTavusIntegration();

  const handleTest = async () => {
    if (!apiKey.trim()) return;

    setIsLoading(true);
    try {
      // Temporarily set the API key for testing
      saveApiKey(apiKey.trim());
      const valid = await testConnection();
      setIsValid(valid);
    } catch (error) {
      setIsValid(false);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async () => {
    if (!apiKey.trim()) return;

    setIsLoading(true);
    try {
      saveApiKey(apiKey.trim());
      onSave(apiKey.trim());
      setApiKey('');
      setIsValid(null);
    } catch (error) {
      console.error('Error saving API key:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setApiKey('');
    setIsValid(null);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={handleClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white dark:bg-slate-800 rounded-3xl p-8 max-w-md w-full border border-slate-200 dark:border-slate-700 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center">
                  <Key className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-100">
                  Configure Tavus API
                </h3>
              </div>
              <button
                onClick={handleClose}
                className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-xl transition-colors"
              >
                <X className="w-5 h-5 text-slate-500 dark:text-slate-400" />
              </button>
            </div>

            {/* Info Alert */}
            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800/30 rounded-2xl p-4 mb-6">
              <div className="flex items-start space-x-3">
                <AlertCircle className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm text-blue-800 dark:text-blue-200 mb-2">
                    Your API key is already configured! You can update it here or use the current one.
                  </p>
                  <a
                    href="https://platform.tavus.io/api-keys"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-1 text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium"
                  >
                    <span>Get your API key</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>

            {/* API Key Input */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                Tavus API Key
              </label>
              <div className="relative">
                <input
                  type="password"
                  value={apiKey}
                  onChange={(e) => {
                    setApiKey(e.target.value);
                    setIsValid(null);
                  }}
                  placeholder="Enter your Tavus API key"
                  className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-2xl text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-blue-500 dark:focus:border-blue-400 focus:ring-2 focus:ring-blue-500/20 dark:focus:ring-blue-400/20 transition-all"
                />
                {isValid !== null && (
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                    {isValid ? (
                      <CheckCircle className="w-5 h-5 text-green-500" />
                    ) : (
                      <AlertCircle className="w-5 h-5 text-red-500" />
                    )}
                  </div>
                )}
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">
                Your API key is stored locally and never shared with our servers.
              </p>
            </div>

            {/* Test Button */}
            {apiKey.trim() && isValid === null && (
              <div className="mb-4">
                <button
                  onClick={handleTest}
                  disabled={isLoading}
                  className="w-full py-2 bg-blue-100 dark:bg-blue-900/30 hover:bg-blue-200 dark:hover:bg-blue-900/50 rounded-xl text-blue-700 dark:text-blue-300 font-medium transition-colors disabled:opacity-50"
                >
                  {isLoading ? 'Testing...' : 'Test Connection'}
                </button>
              </div>
            )}

            {/* Validation Message */}
            {isValid !== null && (
              <div className={`mb-4 p-3 rounded-xl ${
                isValid 
                  ? 'bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800/30' 
                  : 'bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800/30'
              }`}>
                <div className="flex items-center space-x-2">
                  {isValid ? (
                    <CheckCircle className="w-4 h-4 text-green-600 dark:text-green-400" />
                  ) : (
                    <AlertCircle className="w-4 h-4 text-red-600 dark:text-red-400" />
                  )}
                  <span className={`text-sm ${
                    isValid 
                      ? 'text-green-800 dark:text-green-200' 
                      : 'text-red-800 dark:text-red-200'
                  }`}>
                    {isValid ? 'API key is valid!' : 'Invalid API key. Please check and try again.'}
                  </span>
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="flex space-x-3">
              <button
                onClick={handleClose}
                className="flex-1 py-3 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 rounded-2xl text-slate-700 dark:text-slate-300 font-medium transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={!apiKey.trim() || isLoading || isValid === false}
                className="flex-1 py-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl text-white font-medium hover:shadow-lg transition-all duration-200 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center space-x-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    <span>Saving...</span>
                  </div>
                ) : (
                  'Save & Connect'
                )}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}