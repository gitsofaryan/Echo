import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useDropzone } from 'react-dropzone';
import { ArrowLeft, Upload, Image, Video, X } from 'lucide-react';
import toast from 'react-hot-toast';

export function CreateStory() {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [mediaFile, setMediaFile] = useState<File | null>(null);
  const [mediaPreview, setMediaPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.gif'],
      'video/*': ['.mp4', '.webm', '.ogg'],
    },
    maxFiles: 1,
    onDrop: (acceptedFiles) => {
      const file = acceptedFiles[0];
      if (file) {
        setMediaFile(file);
        const url = URL.createObjectURL(file);
        setMediaPreview(url);
      }
    },
  });

  const removeMedia = () => {
    if (mediaPreview) {
      URL.revokeObjectURL(mediaPreview);
    }
    setMediaFile(null);
    setMediaPreview(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim() || !content.trim()) {
      toast.error('Please fill in all required fields');
      return;
    }

    setLoading(true);

    try {
      // In a real app, you would upload the media file and create the story
      // For now, we'll just simulate the process
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast.success('Story created successfully!');
      navigate('/stories');
    } catch (error) {
      toast.error('Failed to create story');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <button
            onClick={() => navigate('/stories')}
            className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors mb-6"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Stories</span>
          </button>

          <h1 className="text-4xl font-bold text-white mb-2">Create Story</h1>
          <p className="text-gray-400">Share your experience with the community</p>
        </motion.div>

        {/* Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-8"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Title *
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Give your story a compelling title"
                className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Content *
              </label>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Tell your story... What happened? What did you learn? How did it make you feel?"
                rows={6}
                className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all resize-none"
                required
              />
            </div>

            {/* Media Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Media (Optional)
              </label>
              
              {!mediaPreview ? (
                <div
                  {...getRootProps()}
                  className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-colors ${
                    isDragActive
                      ? 'border-blue-500 bg-blue-500/10'
                      : 'border-gray-600 hover:border-gray-500'
                  }`}
                >
                  <input {...getInputProps()} />
                  <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-400 mb-2">
                    {isDragActive
                      ? 'Drop your file here'
                      : 'Drag & drop an image or video, or click to select'}
                  </p>
                  <p className="text-sm text-gray-500">
                    Supports: JPG, PNG, GIF, MP4, WebM (Max 50MB)
                  </p>
                </div>
              ) : (
                <div className="relative">
                  {mediaFile?.type.startsWith('image/') ? (
                    <div className="relative">
                      <img
                        src={mediaPreview}
                        alt="Preview"
                        className="w-full h-64 object-cover rounded-xl"
                      />
                      <div className="absolute top-4 left-4 bg-black/50 backdrop-blur-sm rounded-lg px-3 py-1 flex items-center space-x-2">
                        <Image className="w-4 h-4 text-white" />
                        <span className="text-white text-sm">Image</span>
                      </div>
                    </div>
                  ) : (
                    <div className="relative">
                      <video
                        src={mediaPreview}
                        className="w-full h-64 object-cover rounded-xl"
                        controls
                      />
                      <div className="absolute top-4 left-4 bg-black/50 backdrop-blur-sm rounded-lg px-3 py-1 flex items-center space-x-2">
                        <Video className="w-4 h-4 text-white" />
                        <span className="text-white text-sm">Video</span>
                      </div>
                    </div>
                  )}
                  <button
                    type="button"
                    onClick={removeMedia}
                    className="absolute top-4 right-4 w-8 h-8 bg-red-500 hover:bg-red-600 rounded-full flex items-center justify-center transition-colors"
                  >
                    <X className="w-4 h-4 text-white" />
                  </button>
                </div>
              )}
            </div>

            {/* Submit Button */}
            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={() => navigate('/stories')}
                className="px-6 py-3 bg-gray-700 hover:bg-gray-600 rounded-xl text-white font-medium transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading || !title.trim() || !content.trim()}
                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl font-semibold text-white hover:scale-105 transition-transform disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                {loading ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    <span>Publishing...</span>
                  </div>
                ) : (
                  'Publish Story'
                )}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
}