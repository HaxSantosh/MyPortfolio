import React, { useEffect, useState, useRef, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { selectDarkMode } from '../../features/theme/themeSlice';

const CyberCursor = () => {
  // Keep the standard system cursor visible
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [isOverLink, setIsOverLink] = useState(false);
  const darkMode = useSelector(selectDarkMode);
  
  // Use refs for values that don't need to trigger renders
  const trail = useRef([]);
  const rafId = useRef(null);
  
  // Use useMemo to improve performance by avoiding unnecessary recalculations
  const colors = useMemo(() => {
    return darkMode ? {
      dot: '#00FF00',
      dotShadow: '0 0 10px #00FF00, 0 0 20px #00FF00',
      ring: 'rgba(0, 255, 0, 0.3)',
      trail: 'rgba(0, 255, 0, 0.6)',
      crosshair: '#00FF00'
    } : {
      dot: '#0066FF',
      dotShadow: '0 0 8px rgba(0, 102, 255, 0.8)',
      ring: 'rgba(0, 102, 255, 0.3)',
      trail: 'rgba(0, 102, 255, 0.5)',
      crosshair: '#0066FF'
    };
  }, [darkMode]);
  
  // Handle trail updates and fadeout using requestAnimationFrame
  useEffect(() => {
    const updateTrailOpacity = (timestamp) => {
      if (trail.current.length > 0) {
        // Update trail point opacities
        trail.current = trail.current
          .map(point => ({
            ...point,
            opacity: Math.max(0, point.opacity - 0.03) // Simple constant fade rate
          }))
          .filter(point => point.opacity > 0.05);
      }
      
      rafId.current = requestAnimationFrame(updateTrailOpacity);
    };
    
    rafId.current = requestAnimationFrame(updateTrailOpacity);
    
    return () => {
      cancelAnimationFrame(rafId.current);
    };
  }, []);
  
  useEffect(() => {
    // Optimized mouse tracking with direct position update
    const updateMousePosition = (e) => {
      // Direct update for zero-lag cursor position
      const mousePos = { x: e.clientX, y: e.clientY };
      setPosition(mousePos); // Direct update without any interpolation
      setIsVisible(true);
      
      // Add to trail with a lower frequency for better performance
      const newPoint = { 
        x: mousePos.x, 
        y: mousePos.y, 
        opacity: 1
      };
      
      // Only add point if moved enough distance
      const lastPoint = trail.current[trail.current.length - 1];
      if (!lastPoint || Math.hypot(lastPoint.x - mousePos.x, lastPoint.y - mousePos.y) > 5) {
        trail.current = [...trail.current, newPoint].slice(-10); // Keep only 10 points for better performance
      }
      
      // Check if cursor is over a clickable element
      const target = e.target;
      const isLinkOrButton = 
        target.tagName.toLowerCase() === 'a' || 
        target.tagName.toLowerCase() === 'button' ||
        target.closest('a') || 
        target.closest('button') ||
        target.tagName.toLowerCase() === 'input' ||
        target.tagName.toLowerCase() === 'textarea' ||
        window.getComputedStyle(target).cursor === 'pointer';
      
      setIsOverLink(isLinkOrButton);
    };
    
    // Handle mouse events
    const handleMouseDown = () => setIsClicked(true);
    const handleMouseUp = () => setIsClicked(false);
    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);
    
    // Use passive listeners for better performance
    document.addEventListener('mousemove', updateMousePosition, { passive: true });
    document.addEventListener('mousedown', handleMouseDown, { passive: true });
    document.addEventListener('mouseup', handleMouseUp, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave, { passive: true });
    document.addEventListener('mouseenter', handleMouseEnter, { passive: true });
    
    return () => {
      document.removeEventListener('mousemove', updateMousePosition);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, []);
  
  if (!isVisible) return null;
  
  return (
    <>
      {/* Trail effect only - no cursor dot replacement */}
      {trail.current.map((point, index) => (
        point.opacity > 0.1 && (
          <div
            key={index}
            className="fixed transform -translate-x-1/2 -translate-y-1/2"
            style={{
              left: `${point.x}px`,
              top: `${point.y}px`,
              width: `${4}px`,
              height: `${4}px`,
              backgroundColor: colors.trail,
              borderRadius: '50%',
              opacity: point.opacity * 0.5,
              zIndex: 9997,
              pointerEvents: 'none',
              willChange: 'transform, opacity' // Performance optimization
            }}
          />
        )
      ))}
      
      {/* Effects around cursor but not replacing it */}
      {isOverLink && (
        <div className="cyber-cursor" style={{ pointerEvents: 'none' }}>
          {/* Outer ring only when over interactive elements */}
          <div
            className="cyber-cursor-ring fixed transform -translate-x-1/2 -translate-y-1/2"
            style={{
              left: `${position.x}px`,
              top: `${position.y}px`,
              width: '40px',
              height: '40px',
              border: `1.5px solid ${colors.ring}`,
              borderRadius: '50%',
              opacity: 0.6,
              zIndex: 9998,
              transform: 'translate(-50%, -50%)',
              transition: 'width 0.15s ease-out, height 0.15s ease-out, opacity 0.15s ease-out',
              willChange: 'transform, width, height, left, top' // Performance optimization
            }}
          />
          
          {/* Crosshair lines */}
          <div
            className="cyber-cursor-line fixed transform -translate-y-1/2"
            style={{
              left: `${position.x - 20}px`,
              top: `${position.y}px`,
              width: '16px',
              height: '1.5px',
              backgroundColor: colors.crosshair,
              opacity: 0.8,
              zIndex: 9997,
              willChange: 'left, top' // Performance optimization
            }}
          />
          <div
            className="cyber-cursor-line fixed transform -translate-y-1/2"
            style={{
              left: `${position.x + 4}px`,
              top: `${position.y}px`,
              width: '16px',
              height: '1.5px',
              backgroundColor: colors.crosshair,
              opacity: 0.8,
              zIndex: 9997,
              willChange: 'left, top' // Performance optimization
            }}
          />
          <div
            className="cyber-cursor-line fixed transform -translate-x-1/2"
            style={{
              left: `${position.x}px`,
              top: `${position.y - 20}px`,
              width: '1.5px',
              height: '16px',
              backgroundColor: colors.crosshair,
              opacity: 0.8,
              zIndex: 9997,
              willChange: 'left, top' // Performance optimization
            }}
          />
          <div
            className="cyber-cursor-line fixed transform -translate-x-1/2"
            style={{
              left: `${position.x}px`,
              top: `${position.y + 4}px`,
              width: '1.5px',
              height: '16px',
              backgroundColor: colors.crosshair,
              opacity: 0.8,
              zIndex: 9997,
              willChange: 'left, top' // Performance optimization
            }}
          />
        </div>
      )}
      
      {/* Signal ping on click */}
      {isClicked && (
        <div
          className="fixed transform -translate-x-1/2 -translate-y-1/2 animate-ping-signal"
          style={{
            left: `${position.x}px`,
            top: `${position.y}px`,
            width: '30px',
            height: '30px',
            border: `2px solid ${colors.dot}`,
            borderRadius: '50%',
            zIndex: 9996,
            pointerEvents: 'none'
          }}
        />
      )}
    </>
  );
};

export default React.memo(CyberCursor); // Prevent unnecessary re-renders
