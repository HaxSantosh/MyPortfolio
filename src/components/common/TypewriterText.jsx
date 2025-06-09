import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { selectDarkMode } from '../../features/theme/themeSlice';

/**
 * TypewriterText - A high-performance, cyberpunk-styled typewriter effect
 * 
 * @param {Object} props
 * @param {string} props.text - The text to be typed
 * @param {number} props.speed - Typing speed in ms (default: 50)
 * @param {number} props.startDelay - Delay before typing starts in ms (default: 0)
 * @param {boolean} props.showCursor - Whether to show the cursor (default: true)
 * @param {string} props.className - Additional CSS classes
 * @param {boolean} props.glitch - Whether to add glitch effect (default: false)
 */
const TypewriterText = ({ 
  text, 
  speed = 50,
  startDelay = 0,
  showCursor = true,
  className = '',
  glitch = false
}) => {
  const [displayText, setDisplayText] = useState('');
  const [cursorVisible, setCursorVisible] = useState(true);
  const [isTyping, setIsTyping] = useState(false);
  const [isGlitching, setIsGlitching] = useState(false);
  const darkMode = useSelector(selectDarkMode);
  const textRef = useRef(text);
  const indexRef = useRef(0);
  const timerRef = useRef(null);
  const glitchTimerRef = useRef(null);

  // Define colors based on dark mode
  const accentColor = darkMode ? '#00FF00' : '#0066FF';
  
  // Handle typing animation with optimized performance
  useEffect(() => {
    // Reset if text changes
    if (textRef.current !== text) {
      textRef.current = text;
      indexRef.current = 0;
      setDisplayText('');
    }
    
    // Start typing after delay
    const startTyping = () => {
      setIsTyping(true);
      
      const typeNextChar = () => {
        if (indexRef.current < text.length) {
          setDisplayText(prev => prev + text[indexRef.current]);
          indexRef.current++;
          
          // Randomize typing speed slightly for more natural effect
          const randomizedSpeed = speed * (0.8 + Math.random() * 0.4);
          timerRef.current = setTimeout(typeNextChar, randomizedSpeed);
          
          // Random glitch effect during typing (but not too often)
          if (glitch && Math.random() < 0.08) {
            triggerGlitch();
          }
        } else {
          setIsTyping(false);
        }
      };
      
      timerRef.current = setTimeout(typeNextChar, speed);
    };
    
    const initialDelay = setTimeout(() => {
      startTyping();
    }, startDelay);
    
    return () => {
      clearTimeout(initialDelay);
      clearTimeout(timerRef.current);
      clearTimeout(glitchTimerRef.current);
    };
  }, [text, speed, startDelay, glitch]);
  
  // Blinking cursor effect
  useEffect(() => {
    if (!showCursor) return;
    
    const blinkInterval = setInterval(() => {
      setCursorVisible(prev => !prev);
    }, 530); // Slightly irregular blink timing for more realistic effect
    
    return () => clearInterval(blinkInterval);
  }, [showCursor]);
  
  // Trigger random glitch effect
  const triggerGlitch = () => {
    if (isGlitching) return;
    
    setIsGlitching(true);
    
    // Clear glitch after short duration
    glitchTimerRef.current = setTimeout(() => {
      setIsGlitching(false);
    }, 150);
  };
  
  return (
    <span className={`typewriter-text inline-block ${className} ${isGlitching ? 'animate-vibrate' : ''}`}>
      <span>{displayText}</span>
      {showCursor && (
        <span 
          className={`text-cursor ${cursorVisible ? 'opacity-100' : 'opacity-0'}`}
          style={{ 
            borderRight: `2px solid ${accentColor}`,
            marginLeft: '1px',
            animation: 'cursor-blink 1s infinite'
          }}
        >&nbsp;</span>
      )}
    </span>
  );
};

export default React.memo(TypewriterText);
