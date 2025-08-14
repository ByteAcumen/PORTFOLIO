import React from 'react';
import { useTheme } from '../contexts/useTheme';

interface SimpleBackgroundProps {
  className?: string;
}

const SimpleBackground: React.FC<SimpleBackgroundProps> = ({ className }) => {
  const { isDark } = useTheme();

  return (
    <div className={`fixed inset-0 pointer-events-none ${className || ''}`}>
      {/* Static gradient background */}
      <div className={`absolute inset-0 ${
        isDark 
          ? 'bg-gradient-to-br from-slate-900 via-slate-800 to-blue-900/10' 
          : 'bg-gradient-to-br from-gray-50 via-white to-blue-50/30'
      }`} />
      
      {/* Simple static decorative elements */}
      <div className={`absolute top-1/4 right-1/4 w-64 h-64 rounded-full blur-3xl opacity-20 ${
        isDark 
          ? 'bg-gradient-to-br from-blue-600 to-indigo-600' 
          : 'bg-gradient-to-br from-blue-400 to-indigo-400'
      }`} />
      
      <div className={`absolute bottom-1/4 left-1/4 w-48 h-48 rounded-full blur-3xl opacity-15 ${
        isDark 
          ? 'bg-gradient-to-tr from-purple-600 to-pink-600' 
          : 'bg-gradient-to-tr from-purple-400 to-pink-400'
      }`} />
      
      {/* Subtle grid pattern */}
      <div 
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, ${isDark ? '#ffffff' : '#000000'} 1px, transparent 0)`,
          backgroundSize: '50px 50px'
        }}
      />
    </div>
  );
};

export default SimpleBackground;