import React, { useEffect, useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import { selectDarkMode } from '../../features/theme/themeSlice';

const DataTransferEffect = () => {
  const darkMode = useSelector(selectDarkMode);
  const [beams, setBeams] = useState([]);
  const timeoutRef = useRef(null);
  const intervalRef = useRef(null);
  
  // Generate lightning-like data beams at random intervals
  useEffect(() => {
    const createNewBeam = () => {
      const windowWidth = window.innerWidth;
      const windowHeight = window.innerHeight;
      
      // Start and end points
      let startPoint, endPoint;
      
      // Decide which edge to start from and which to end at
      const startEdge = Math.floor(Math.random() * 4); // 0: top, 1: right, 2: bottom, 3: left
      const endEdge = (startEdge + 2) % 4; // Opposite edge
      
      switch (startEdge) {
        case 0: // Top
          startPoint = { x: Math.random() * windowWidth, y: 0 };
          break;
        case 1: // Right
          startPoint = { x: windowWidth, y: Math.random() * windowHeight };
          break;
        case 2: // Bottom
          startPoint = { x: Math.random() * windowWidth, y: windowHeight };
          break;
        case 3: // Left
          startPoint = { x: 0, y: Math.random() * windowHeight };
          break;
        default:
          startPoint = { x: 0, y: 0 };
      }
      
      switch (endEdge) {
        case 0: // Top
          endPoint = { x: Math.random() * windowWidth, y: 0 };
          break;
        case 1: // Right
          endPoint = { x: windowWidth, y: Math.random() * windowHeight };
          break;
        case 2: // Bottom
          endPoint = { x: Math.random() * windowWidth, y: windowHeight };
          break;
        case 3: // Left
          endPoint = { x: 0, y: Math.random() * windowHeight };
          break;
        default:
          endPoint = { x: windowWidth, y: windowHeight };
      }
      
      // Generate control points for the bezier curve
      const numSegments = 3 + Math.floor(Math.random() * 3);
      const segments = [];
      
      for (let i = 0; i <= numSegments; i++) {
        const t = i / numSegments;
        
        // Linear interpolation between start and end
        const baseX = startPoint.x + (endPoint.x - startPoint.x) * t;
        const baseY = startPoint.y + (endPoint.y - startPoint.y) * t;
        
        // Add some randomness to make it look like lightning
        const jitterAmount = 100 * Math.min(t, 1 - t); // Less jitter at endpoints
        const jitterX = (Math.random() - 0.5) * jitterAmount;
        const jitterY = (Math.random() - 0.5) * jitterAmount;
        
        segments.push({
          x: baseX + jitterX,
          y: baseY + jitterY
        });
      }
      
      // Ensure the first and last points match the start and end
      segments[0] = { ...startPoint };
      segments[segments.length - 1] = { ...endPoint };
      
      // Create the new beam
      const newBeam = {
        id: Math.random().toString(36).substring(7),
        segments,
        color: darkMode ? `rgba(0, 255, 0, ${0.7 + Math.random() * 0.3})` : `rgba(0, 102, 255, ${0.7 + Math.random() * 0.3})`,
        width: 2 + Math.random() * 3,
        createdAt: Date.now(),
        duration: 500 + Math.random() * 1000, // 0.5 to 1.5 seconds
        glow: Math.random() > 0.5 // 50% chance to add glow effect
      };
      
      setBeams(prev => [...prev, newBeam]);
      
      // Clean up after animation
      timeoutRef.current = setTimeout(() => {
        setBeams(prev => prev.filter(beam => beam.id !== newBeam.id));
      }, newBeam.duration);
    };
    
    // Create a beam immediately
    createNewBeam();
    
    // Create new beams at random intervals
    intervalRef.current = setInterval(() => {
      // Only create new beam if there aren't too many already
      if (Math.random() < 0.3) { // 30% chance each interval
        createNewBeam();
      }
    }, 2000);
    
    return () => {
      clearTimeout(timeoutRef.current);
      clearInterval(intervalRef.current);
    };
  }, [darkMode]);
  
  return (
    <div className="fixed inset-0 pointer-events-none z-10">
      <svg className="w-full h-full">
        {beams.map(beam => {
          // Create path commands from segments
          const pathCommands = beam.segments.map((point, index) => {
            return index === 0 ? `M${point.x},${point.y}` : `L${point.x},${point.y}`;
          }).join(' ');
          
          // Calculate progress for stroke-dasharray animation
          const progress = Math.min(1, (Date.now() - beam.createdAt) / beam.duration);
          const pathLength = 1000; // Arbitrary large number
          
          return (
            <g key={beam.id}>
              <path
                d={pathCommands}
                stroke={beam.color}
                strokeWidth={beam.width}
                fill="none"
                strokeDasharray={pathLength}
                strokeDashoffset={(1 - progress) * pathLength}
                style={{
                  transition: 'stroke-dashoffset 0.1s linear',
                  filter: beam.glow ? `drop-shadow(0 0 5px ${beam.color})` : 'none'
                }}
              />
              
              {/* Add a few highlight points along the path */}
              {beam.segments.filter((_, i) => i % 2 === 1).map((point, index) => (
                <circle
                  key={index}
                  cx={point.x}
                  cy={point.y}
                  r={beam.width}
                  fill={beam.color}
                  style={{
                    filter: beam.glow ? `drop-shadow(0 0 3px ${beam.color})` : 'none',
                    opacity: Math.random() * 0.5 + 0.5
                  }}
                />
              ))}
            </g>
          );
        })}
      </svg>
    </div>
  );
};

export default React.memo(DataTransferEffect);
