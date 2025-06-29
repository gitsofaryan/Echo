import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Upload, Mic, Camera, Heart, Save, Play, Pause } from 'lucide-react';
import toast from 'react-hot-toast';

const steps = [
  { id: 'basic', title: 'Basic Information', description: 'Tell us about them' },
  { id: 'photos', title: 'Photos & Videos', description: 'Visual memories' },
  { id: 'voice', title: 'Voice Samples', description: 'Capture their voice' },
  { id: 'personality', title: 'Personality', description: 'Their unique traits' },
  { id: 'memories', title: 'Stories & Memories', description: 'Preserve their essence' },
];

export function CreatePersona() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    relationship: '',
    description: '',
    photos: [],
    voiceSamples: [],
    personality: '',
    memories: '',
    favoriteThings: '',
    mannerisms: '',
  });

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleSubmit();
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    toast.success('Echo created successfully! 🎉');
    navigate('/dashboard');
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const toggleRecording = () => {
    setIsRecording(!isRecording);
    if (!isRecording) {
      toast.success('Recording started');
    } else {
      toast.success('Recording saved');
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                What was their name? *
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                placeholder="e.g., Grandma Rose, Dad, Mom"
                className="w-full px-4 py-3 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-xl text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-rose-500 dark:focus:border-rose-400 focus:ring-2 focus:ring-rose-500/20 dark:focus:ring-rose-400/20 transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                Your relationship *
              </label>
              <select
                value={formData.relationship}
                onChange={(e) => handleInputChange('relationship', e.target.value)}
                className="w-full px-4 py-3 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-xl text-slate-900 dark:text-slate-100 focus:outline-none focus:border-rose-500 dark:focus:border-rose-400 appearance-none cursor-pointer"
              >
                <option value="">Select relationship</option>
                <option value="parent">Parent</option>
                <option value="grandparent">Grandparent</option>
                <option value="spouse">Spouse/Partner</option>
                <option value="sibling">Sibling</option>
                <option value="child">Child</option>
                <option value="friend">Friend</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                Tell us about them *
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                placeholder="Share what made them special, their role in your life, and why you want to preserve their memory..."
                rows={4}
                className="w-full px-4 py-3 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-xl text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-rose-500 dark:focus:border-rose-400 focus:ring-2 focus:ring-rose-500/20 dark:focus:ring-rose-400/20 transition-all resize-none"
              />
            </div>
          </div>
        );

      case 1:
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-4">
                Upload Photos & Videos
              </label>
              <div className="border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-xl p-8 text-center hover:border-rose-400 dark:hover:border-rose-500 transition-colors bg-slate-50 dark:bg-slate-800/50">
                <Camera className="w-12 h-12 text-slate-400 dark:text-slate-500 mx-auto mb-4" />
                <p className="text-slate-600 dark:text-slate-300 mb-2">Upload photos and videos that capture their essence</p>
                <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">We recommend 5-10 photos from different angles and lighting</p>
                <button className="px-6 py-3 bg-rose-600 hover:bg-rose-700 rounded-xl text-white font-medium transition-colors shadow-md">
                  Choose Files
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=200',
                'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=200',
                'https://images.pexels.com/photos/712513/pexels-photo-712513.jpeg?auto=compress&cs=tinysrgb&w=200',
                'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=200'
              ].map((photo, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  className="relative aspect-square rounded-xl overflow-hidden border-2 border-slate-200 dark:border-slate-700 hover:border-rose-400 dark:hover:border-rose-500 transition-colors cursor-pointer shadow-md"
                >
                  <img src={photo} alt="Sample" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/20 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
                    <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-lg">
                      <span className="text-slate-900 text-sm">✓</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-4">
                Record Voice Samples
              </label>
              <div className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-8 text-center border border-slate-200 dark:border-slate-700">
                <div className={`w-20 h-20 mx-auto mb-6 rounded-full flex items-center justify-center transition-all shadow-lg ${
                  isRecording ? 'bg-red-500 animate-pulse' : 'bg-rose-600 hover:bg-rose-700'
                }`}>
                  {isRecording ? (
                    <Pause className="w-8 h-8 text-white" />
                  ) : (
                    <Mic className="w-8 h-8 text-white" />
                  )}
                </div>
                <p className="text-slate-600 dark:text-slate-300 mb-4">
                  {isRecording ? 'Recording in progress...' : 'Record them speaking naturally'}
                </p>
                <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">
                  We recommend 3-5 minutes of clear speech for best results
                </p>
                <button
                  onClick={toggleRecording}
                  className={`px-6 py-3 rounded-xl font-medium transition-colors shadow-md ${
                    isRecording 
                      ? 'bg-red-600 hover:bg-red-700 text-white' 
                      : 'bg-rose-600 hover:bg-rose-700 text-white'
                  }`}
                >
                  {isRecording ? 'Stop Recording' : 'Start Recording'}
                </button>
              </div>
            </div>

            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-6 border border-blue-200 dark:border-blue-800/30">
              <h3 className="font-medium text-slate-900 dark:text-slate-100 mb-2">Recording Tips</h3>
              <ul className="text-sm text-slate-600 dark:text-slate-300 space-y-1">
                <li>• Record in a quiet environment</li>
                <li>• Have them read a favorite poem or tell a story</li>
                <li>• Capture different emotions and tones</li>
                <li>• Include their laugh if possible</li>
              </ul>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                Personality & Character Traits
              </label>
              <textarea
                value={formData.personality}
                onChange={(e) => handleInputChange('personality', e.target.value)}
                placeholder="Describe their personality... Were they funny, serious, caring, adventurous? How did they make others feel?"
                rows={4}
                className="w-full px-4 py-3 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-xl text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-rose-500 dark:focus:border-rose-400 focus:ring-2 focus:ring-rose-500/20 dark:focus:ring-rose-400/20 transition-all resize-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                Favorite Things & Interests
              </label>
              <textarea
                value={formData.favoriteThings}
                onChange={(e) => handleInputChange('favoriteThings', e.target.value)}
                placeholder="What did they love? Hobbies, foods, music, books, places, activities..."
                rows={3}
                className="w-full px-4 py-3 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-xl text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-rose-500 dark:focus:border-rose-400 focus:ring-2 focus:ring-rose-500/20 dark:focus:ring-rose-400/20 transition-all resize-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                Mannerisms & Speech Patterns
              </label>
              <textarea
                value={formData.mannerisms}
                onChange={(e) => handleInputChange('mannerisms', e.target.value)}
                placeholder="Did they have catchphrases, gestures, or unique ways of speaking? Any habits or quirks?"
                rows={3}
                className="w-full px-4 py-3 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-xl text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-rose-500 dark:focus:border-rose-400 focus:ring-2 focus:ring-rose-500/20 dark:focus:ring-rose-400/20 transition-all resize-none"
              />
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                Stories & Memories
              </label>
              <textarea
                value={formData.memories}
                onChange={(e) => handleInputChange('memories', e.target.value)}
                placeholder="Share your favorite memories, stories they told, advice they gave, or moments that defined them..."
                rows={6}
                className="w-full px-4 py-3 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-xl text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-rose-500 dark:focus:border-rose-400 focus:ring-2 focus:ring-rose-500/20 dark:focus:ring-rose-400/20 transition-all resize-none"
              />
            </div>

            <div className="bg-rose-50 dark:bg-rose-900/20 rounded-xl p-6 border border-rose-200 dark:border-rose-800/30">
              <div className="flex items-center space-x-3 mb-3">
                <Heart className="w-6 h-6 text-rose-600 dark:text-rose-400" />
                <h3 className="font-medium text-slate-900 dark:text-slate-100">Memory Prompts</h3>
              </div>
              <ul className="text-sm text-slate-600 dark:text-slate-300 space-y-1">
                <li>• What advice would they give you today?</li>
                <li>• What was their favorite family tradition?</li>
                <li>• How did they show love and care?</li>
                <li>• What made them laugh?</li>
                <li>• What were they most proud of?</li>
              </ul>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen py-8 px-4 bg-slate-50 dark:bg-slate-900 transition-colors duration-300">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <button
            onClick={() => navigate('/dashboard')}
            className="flex items-center space-x-2 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 transition-colors mb-6"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Dashboard</span>
          </button>

          <h1 className="text-4xl font-serif font-bold mb-2 text-slate-900 dark:text-slate-100">
            Create Your Echo
          </h1>
          <p className="text-slate-600 dark:text-slate-400">Preserve their voice, personality, and memories forever</p>
        </motion.div>

        {/* Progress Steps */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between mb-4">
            {steps.map((step, index) => (
              <div
                key={step.id}
                className={`flex-1 flex items-center ${
                  index < steps.length - 1 ? 'relative' : ''
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all shadow-md ${
                    index <= currentStep
                      ? 'bg-gradient-to-br from-rose-500 to-purple-600 text-white'
                      : 'bg-slate-200 dark:bg-slate-700 text-slate-500 dark:text-slate-400'
                  }`}>
                    {index + 1}
                  </div>
                  <div className="hidden sm:block">
                    <div className={`font-medium ${
                      index <= currentStep ? 'text-slate-900 dark:text-slate-100' : 'text-slate-500 dark:text-slate-400'
                    }`}>
                      {step.title}
                    </div>
                    <div className="text-sm text-slate-500 dark:text-slate-400">{step.description}</div>
                  </div>
                </div>
                {index < steps.length - 1 && (
                  <div className={`flex-1 h-px mx-4 transition-colors ${
                    index < currentStep ? 'bg-gradient-to-r from-rose-500 to-purple-600' : 'bg-slate-200 dark:bg-slate-700'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </motion.div>

        {/* Form Content */}
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          className="bg-white dark:bg-slate-800 rounded-3xl p-8 mb-8 shadow-lg dark:shadow-slate-900/20 border border-slate-200/50 dark:border-slate-700/50"
        >
          <h2 className="text-2xl font-semibold mb-6 text-slate-900 dark:text-slate-100">
            {steps[currentStep].title}
          </h2>
          {renderStepContent()}
        </motion.div>

        {/* Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex justify-between"
        >
          <button
            onClick={handlePrevious}
            disabled={currentStep === 0}
            className={`flex items-center space-x-2 px-6 py-3 rounded-2xl font-semibold transition-all shadow-md ${
              currentStep === 0
                ? 'bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-500 cursor-not-allowed'
                : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-600'
            }`}
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Previous</span>
          </button>

          <button
            onClick={handleNext}
            className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-rose-600 to-purple-600 rounded-2xl font-semibold text-white hover:shadow-xl transition-all duration-200 hover:scale-105 shadow-lg"
          >
            {currentStep === steps.length - 1 ? (
              <>
                <Save className="w-5 h-5" />
                <span>Create Echo</span>
              </>
            ) : (
              <>
                <span>Next</span>
                <ArrowRight className="w-5 h-5" />
              </>
            )}
          </button>
        </motion.div>
      </div>
    </div>
  );
}