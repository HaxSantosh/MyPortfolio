import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';
import { selectDarkMode } from '../../features/theme/themeSlice';

/**
 * TerminalLoader - A cyberpunk-styled terminal loading animation
 * 
 * @param {Object} props
 * @param {string} props.text - The loading text
 * @param {boolean} props.showPercentage - Whether to show percentage (default: true)
 * @param {string} props.className - Additional CSS classes
 * @param {number} props.duration - Loading duration in ms (default: 3000)
 * @param {Function} props.onComplete - Callback when loading completes
 */
const TerminalLoader = ({
  text = "Loading",
  showPercentage = true,
  className = '',
  duration = 3000,
  onComplete = () => {}
}) => {
  const [progress, setProgress] = useState(0);
  const [messages, setMessages] = useState([]);
  const darkMode = useSelector(selectDarkMode);
  
  // Terminal-style loading messages
  const loadingMessages = [
    "Initializing systems...",
    "Establishing secure connection...",
    "Decrypting data matrices...",
    "Verifying node integrity...",
    "Analyzing protocol structures...",
    "Compiling quantum algorithms...",
    "Processing neural patterns...",
    "Activating defense systems...",
  ];
  
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        const next = prev + (100 / (duration / 100));
        return next >= 100 ? 100 : next;
      });
    }, 100);
    
    // Add random terminal messages during loading
    const messageInterval = setInterval(() => {
      if (messages.length < 5) {
        const randomMessage = loadingMessages[Math.floor(Math.random() * loadingMessages.length)];
        setMessages(prev => [...prev, randomMessage]);
      }
    }, duration / 5);
    
    // Invoke callback when complete
    const completionTimer = setTimeout(() => {
      onComplete();
    }, duration);
    
    return () => {
      clearInterval(interval);
      clearInterval(messageInterval);
      clearTimeout(completionTimer);
    };
  }, [duration, onComplete, messages.length, loadingMessages]);
  
  // Colors based on theme
  const primaryColor = darkMode ? '#00FF00' : '#0066FF';
  const bgColor = darkMode ? 'rgba(0,0,0,0.7)' : 'rgba(240,240,240,0.9)';
  
  return (
    <motion.div 
      className={`terminal-loader p-4 rounded-md ${className}`}
      style={{ backgroundColor: bgColor, border: `1px solid ${primaryColor}` }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="terminal-header mb-4">
        <span className="terminal-title">{text.toUpperCase()}</span>
        {showPercentage && (
          <span style={{ color: primaryColor, fontFamily: 'monospace' }}>
            {Math.floor(progress)}%
          </span>
        )}
      </div>
      
      {/* Progress bar */}
      <div 
        className="w-full h-2 rounded-full mb-4"
        style={{ backgroundColor: `${primaryColor}30` }}
      >
        <motion.div 
          className="h-full rounded-full"
          style={{ 
            backgroundColor: primaryColor,
            width: `${progress}%`,
            boxShadow: `0 0 10px ${primaryColor}`
          }}
          initial={{ width: '0%' }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.1 }}
        />
      </div>
      
      {/* Terminal messages */}
      <div 
        className="terminal-messages font-mono text-sm max-h-32 overflow-y-auto"
        style={{ color: primaryColor }}
      >
        {messages.map((msg, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className="mb-1 flex"
          >
            <span className="mr-2">{">"}</span>
            <span>{msg}</span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default React.memo(TerminalLoader);
