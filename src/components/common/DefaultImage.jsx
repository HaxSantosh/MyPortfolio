import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { selectDarkMode } from '../../features/theme/themeSlice';
import { motion } from 'framer-motion';

const DefaultImage = ({ title, className = '' }) => {
  const darkMode = useSelector(selectDarkMode);
  const canvasRef = useRef(null);
  const [uniqueId] = useState(`cyber-canvas-${Math.random().toString(36).substr(2, 9)}`);
  
  // Advanced color palettes for better cyberpunk aesthetics
  const lightColors = [
    { bg: 'bg-indigo-100', primary: '#4F46E5', secondary: '#818CF8' },
    { bg: 'bg-blue-100', primary: '#2563EB', secondary: '#60A5FA' },
    { bg: 'bg-purple-100', primary: '#7C3AED', secondary: '#A78BFA' },
    { bg: 'bg-cyan-100', primary: '#0891B2', secondary: '#22D3EE' },
    { bg: 'bg-rose-100', primary: '#E11D48', secondary: '#FB7185' },
  ];
  
  const darkColors = [
    { bg: 'bg-black', primary: '#00FF00', secondary: '#00AA00' }, // Hacker green
    { bg: 'bg-black', primary: '#00FFFF', secondary: '#00AAAA' }, // Cyber cyan
    { bg: 'bg-black', primary: '#FF00FF', secondary: '#AA00AA' }, // Neon purple
    { bg: 'bg-black', primary: '#0088FF', secondary: '#0044AA' }, // Digital blue
    { bg: 'bg-black', primary: '#FF0088', secondary: '#AA0044' }, // Hot pink
  ];
  // Use first letter to consistently get the same color scheme
  const colorIndex = title.charCodeAt(0) % lightColors.length;
  const colorScheme = darkMode ? darkColors[colorIndex] : lightColors[colorIndex];
  
  // Generate unique but consistent background pattern based on project title
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const { width, height } = canvas;
    
    // Reset canvas
    ctx.fillStyle = darkMode ? '#000000' : '#F8FAFC';
    ctx.fillRect(0, 0, width, height);
    
    // Title hash for consistent pattern generation
    const hash = title.split('').reduce((acc, char) => {
      return acc + char.charCodeAt(0);
    }, 0);
    
    // Draw cyberpunk grid
    ctx.strokeStyle = colorScheme.secondary;
    ctx.lineWidth = 0.5;
    
    // Horizontal lines
    const lineGap = 20;
    for (let y = 0; y < height; y += lineGap) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.globalAlpha = 0.3;
      ctx.stroke();
    }
    
    // Vertical lines
    for (let x = 0; x < width; x += lineGap) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.globalAlpha = 0.2;
      ctx.stroke();
    }
    
    // Draw circuit-like patterns
    ctx.strokeStyle = colorScheme.primary;
    ctx.lineWidth = 1.5;
    ctx.globalAlpha = 0.8;
    
    const nodeCount = 5 + (hash % 7);
    const nodes = [];
    
    // Create nodes
    for (let i = 0; i < nodeCount; i++) {
      nodes.push({
        x: width * (0.2 + 0.6 * ((hash * (i + 1)) % 100) / 100),
        y: height * (0.2 + 0.6 * ((hash * (i + 2)) % 100) / 100),
        size: 3 + (hash * i) % 4
      });
    }
    
    // Connect nodes
    for (let i = 0; i < nodes.length; i++) {
      const nodeA = nodes[i];
      
      // Draw node
      ctx.fillStyle = colorScheme.primary;
      ctx.beginPath();
      ctx.arc(nodeA.x, nodeA.y, nodeA.size, 0, Math.PI * 2);
      ctx.fill();
      
      // Connect to some nodes
      for (let j = i + 1; j < nodes.length; j++) {
        if ((i * j + hash) % 4 !== 0) continue; // Not all nodes connect
        
        const nodeB = nodes[j];
        
        ctx.beginPath();
        ctx.moveTo(nodeA.x, nodeA.y);
        
        // Create bezier curve for more interesting connections
        const midX = (nodeA.x + nodeB.x) / 2;
        const midY = (nodeA.y + nodeB.y) / 2;
        const offset = ((hash * i * j) % 50) - 25;
        
        ctx.quadraticCurveTo(
          midX + offset, 
          midY + offset, 
          nodeB.x, 
          nodeB.y
        );
        
        ctx.stroke();
      }
    }
    
    // Generate initials from the title
    const initials = title
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
    
    // Draw initials in the center
    ctx.font = 'bold 48px monospace';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = colorScheme.primary;
    ctx.globalAlpha = 0.9;
    ctx.fillText(initials, width / 2, height / 2);
    
    // Add a subtle scan line effect
    ctx.fillStyle = darkMode ? 'rgba(255, 255, 255, 0.03)' : 'rgba(0, 0, 0, 0.02)';
    for (let y = 0; y < height; y += 2) {
      ctx.fillRect(0, y, width, 1);
    }
    
  }, [title, darkMode, colorScheme]);
  
  return (
    <div className={`relative flex items-center justify-center bg-black dark:bg-black ${className} overflow-hidden`}>
      <canvas 
        ref={canvasRef} 
        id={uniqueId}
        width="400" 
        height="225"
        className="w-full h-full"
      />
      
      {/* Scanline overlay */}
      <div className="absolute inset-0 pointer-events-none animate-scan-fast opacity-10"></div>
      
      {/* Glitch effect on hover */}
      <motion.div 
        className="absolute bottom-4 left-0 right-0 text-center font-mono text-sm truncate px-4"
        initial={{ opacity: 0.7 }}
        whileHover={{ 
          opacity: 1,
          textShadow: "0 0 8px rgba(0, 255, 255, 0.8)"
        }}
        style={{ color: colorScheme.primary }}
      >
        <span className="mr-2 opacity-70">{">"}</span>
        {title}
      </motion.div>
    </div>
  );
};

export default DefaultImage;