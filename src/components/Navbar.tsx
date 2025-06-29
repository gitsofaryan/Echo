import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Heart, 
  Users, 
  Plus, 
  Brain,
  User,
  HelpCircle,
  Shield,
  Sun,
  Moon
} from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

export function Navbar() {
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();

  const navItems = [
    { path: '/dashboard', icon: Users, label: 'My Personas' },
    { path: '/prebuilt-personas', icon: Brain, label: 'AI Personas' },
    { path: '/create-persona', icon: Plus, label: 'Create' },
    { path: '/support', icon: HelpCircle, label: 'Support' },
    { path: '/privacy', icon: Shield, label: 'Privacy' },
  ];

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 w-full z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-2xl border-b border-slate-200/50 dark:border-slate-700/50 shadow-lg dark:shadow-slate-900/20"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="w-10 h-10 bg-gradient-to-br from-rose-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105">
              <Heart className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-serif font-bold bg-gradient-to-r from-rose-600 to-purple-600 bg-clip-text text-transparent">
              Echo
            </span>
          </Link>

          {/* Navigation Items */}
          <div className="flex items-center space-x-1">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className="relative px-4 py-2.5 rounded-2xl transition-all duration-300 group"
                >
                  <div className="flex items-center space-x-2 relative z-10">
                    <item.icon className={`w-4 h-4 transition-all duration-300 ${
                      isActive 
                        ? 'text-rose-600 dark:text-rose-400' 
                        : 'text-slate-600 dark:text-slate-400 group-hover:text-slate-900 dark:group-hover:text-slate-100 group-hover:scale-110'
                    }`} />
                    <span className={`text-sm font-medium transition-all duration-300 ${
                      isActive 
                        ? 'text-rose-600 dark:text-rose-400' 
                        : 'text-slate-600 dark:text-slate-400 group-hover:text-slate-900 dark:group-hover:text-slate-100'
                    }`}>
                      {item.label}
                    </span>
                  </div>
                  
                  {/* Active state background */}
                  {isActive && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute inset-0 bg-gradient-to-r from-rose-50 to-purple-50 dark:from-rose-900/20 dark:to-purple-900/20 rounded-2xl border border-rose-200/50 dark:border-rose-700/50 shadow-sm"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  
                  {/* Hover state background */}
                  {!isActive && (
                    <div className="absolute inset-0 bg-slate-100/50 dark:bg-slate-800/50 rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:shadow-md" />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Right side controls */}
          <div className="flex items-center space-x-3">
            {/* Theme Toggle */}
            <motion.button
              onClick={toggleTheme}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="p-2.5 rounded-2xl bg-slate-100/50 dark:bg-slate-800/50 hover:bg-slate-200/50 dark:hover:bg-slate-700/50 transition-all duration-300 border border-slate-200/50 dark:border-slate-700/50 hover:shadow-md"
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

            {/* User Profile */}
            <div className="flex items-center space-x-2 px-3 py-2 rounded-2xl bg-slate-100/50 dark:bg-slate-800/50 hover:bg-slate-200/50 dark:hover:bg-slate-700/50 transition-all duration-300 border border-slate-200/50 dark:border-slate-700/50 hover:shadow-md group cursor-pointer">
              <div className="w-8 h-8 bg-gradient-to-br from-rose-500 to-purple-600 rounded-full flex items-center justify-center shadow-md group-hover:shadow-lg transition-all duration-300 group-hover:scale-105">
                <User className="w-4 h-4 text-white" />
              </div>
              <span className="text-sm text-slate-700 dark:text-slate-300 hidden sm:block font-medium">
                Demo User
              </span>
            </div>
          </div>
        </div>
      </div>
    </motion.nav>
  );
}