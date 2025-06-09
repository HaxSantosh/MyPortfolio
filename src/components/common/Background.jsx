import React from 'react';
import { useSelector } from 'react-redux';
import { selectDarkMode } from '../../features/theme/themeSlice';
import MatrixBackground from './MatrixBackground';
import TerminalElements from './TerminalElements';
import SignalMapBackground from './SignalMapBackground';
import CyberCursor from './CyberCursor';
import CircuitPatterns from './CircuitPatterns';
import DataTransferEffect from './DataTransferEffect';

const Background = () => {
  const darkMode = useSelector(selectDarkMode);
  return (
    <>
      {/* Custom Cyber Cursor with enhanced animations */}
      <CyberCursor />
        <div className="fixed inset-0 -z-10 pointer-events-none">
        {/* Galaxy-style cosmic background */}
        <SignalMapBackground />
        
        {/* Matrix background for dark mode (with reduced opacity) */}
        {darkMode && <div className="opacity-30"><MatrixBackground /></div>}
        
        {/* Circuit pattern decorations with reduced visibility */}
        <div className={darkMode ? "opacity-40" : "opacity-30"}>
          <CircuitPatterns />
        </div>
        
        {/* Lightning-like data transfer animations */}
        <DataTransferEffect />
        
        {/* Terminal elements overlay */}
        {darkMode && <TerminalElements />}
        
        {/* Subtle grid overlay for both themes */}
        <div 
          className={`fixed inset-0 ${darkMode ? 'opacity-15' : 'opacity-10'} 
                    bg-grid-pattern bg-[length:75px_75px]`}
        ></div>
        
        {/* Gradient overlay for light mode */}
        {!darkMode && (
          <div 
            className="fixed inset-0 bg-gradient-radial from-blue-50/50 via-purple-50/30 to-pink-50/50 opacity-70"
          ></div>
        )}
        
        {/* Gradient overlay for dark mode */}
        {darkMode && (
          <div 
            className="fixed inset-0 bg-gradient-radial from-hacker-dark via-black/80 to-hacker-dark/90 opacity-60"
          ></div>
        )}
      </div>
    </>
  );
};

export default Background;