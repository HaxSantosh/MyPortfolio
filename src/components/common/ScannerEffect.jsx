import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const ScannerEffect = () => {
  const [showScanner, setShowScanner] = useState(false);
  const { darkMode } = useSelector((state) => state.theme);
  
  useEffect(() => {
    if (!darkMode) return;
    
    // Show scanner effect randomly
    const interval = setInterval(() => {
      const shouldShow = Math.random() > 0.7; // 30% chance to show
      if (shouldShow) {
        setShowScanner(true);
        // Hide after a short period
        setTimeout(() => setShowScanner(false), 3000);
      }
    }, 8000); // Check every 8 seconds
    
    return () => clearInterval(interval);
  }, [darkMode]);
  
  if (!darkMode || !showScanner) return null;
  
  return (
    <div className="fixed inset-0 pointer-events-none z-20">
      {/* Horizontal scan line */}
      <div 
        className="absolute h-10 left-0 right-0 bg-gradient-to-b from-transparent via-hacker-primary/20 to-transparent animate-scan-y"
      ></div>
      
      {/* Vertical scan line */}
      <div 
        className="absolute w-10 top-0 bottom-0 bg-gradient-to-r from-transparent via-hacker-primary/20 to-transparent animate-scan-x"
      ></div>

      {/* Target indicators that appear during scan */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-pulse">
        <div className="w-20 h-20 border-2 border-hacker-primary/50 rounded-full relative">
          <div className="w-16 h-16 border border-hacker-primary/40 rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="w-8 h-8 border border-hacker-primary/30 rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            </div>
          </div>
          {/* Crosshairs */}
          <div className="absolute top-1/2 left-0 w-full h-px bg-hacker-primary/40"></div>
          <div className="absolute top-0 left-1/2 w-px h-full bg-hacker-primary/40"></div>
        </div>
      </div>
    </div>
  );
};

export default ScannerEffect;
