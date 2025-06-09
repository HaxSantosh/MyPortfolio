import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectDarkMode } from '../../features/theme/themeSlice';

// Circuit paths for SVG patterns
const circuits = [
  "M10,10 L90,10 L90,50 L150,50 L150,90 L10,90 Z",
  "M20,20 C50,40 80,20 100,40 L150,40 L150,60 L20,60 Z",
  "M10,10 Q50,30 90,10 T170,10 L170,50 L10,50 Z",
  "M10,30 L50,30 L50,10 L90,10 L90,50 L130,50 L130,90 L10,90 Z",
  "M30,10 L130,10 L130,40 C100,60 70,30 30,40 Z"
];

const CircuitPatterns = () => {
  const darkMode = useSelector(selectDarkMode);
  const [positions, setPositions] = useState([]);
  
  // Generate random positions for the circuits
  useEffect(() => {
    const generatePositions = () => {
      const windowWidth = window.innerWidth;
      const windowHeight = window.innerHeight;
      
      const newPositions = [];
      const patternCount = Math.min(15, Math.floor((windowWidth * windowHeight) / 40000));
      
      for (let i = 0; i < patternCount; i++) {
        newPositions.push({
          x: Math.random() * windowWidth,
          y: Math.random() * windowHeight,
          rotation: Math.random() * 360,
          scale: Math.random() * 0.5 + 0.5,
          circuitIndex: Math.floor(Math.random() * circuits.length),
          opacity: Math.random() * 0.3 + 0.1,
          animationDelay: Math.random() * 5
        });
      }
      
      setPositions(newPositions);
    };
    
    generatePositions();
    window.addEventListener('resize', generatePositions);
    
    return () => window.removeEventListener('resize', generatePositions);
  }, []);
  
  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      {positions.map((pos, index) => (
        <svg
          key={index}
          className="cyber-circuit absolute animate-glow-pulse"
          style={{
            left: `${pos.x}px`,
            top: `${pos.y}px`,
            transform: `rotate(${pos.rotation}deg) scale(${pos.scale})`,
            opacity: pos.opacity,
            animationDelay: `${pos.animationDelay}s`,
            width: '200px',
            height: '100px'
          }}
          viewBox="0 0 200 100"
        >
          <path
            d={circuits[pos.circuitIndex]}
            fill="none"
            stroke={darkMode ? '#00FF00' : '#0066FF'}
            strokeWidth="2"
          />
          <circle 
            cx={Math.random() * 150 + 25} 
            cy={Math.random() * 50 + 25} 
            r="3" 
            fill={darkMode ? '#00FF00' : '#0066FF'} 
          />
          <circle 
            cx={Math.random() * 150 + 25} 
            cy={Math.random() * 50 + 25} 
            r="2" 
            fill={darkMode ? '#00FF00' : '#0066FF'} 
          />
        </svg>
      ))}
    </div>
  );
};

export default React.memo(CircuitPatterns);
