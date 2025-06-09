import React, { useEffect, useRef, useState, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { selectDarkMode } from '../../features/theme/themeSlice';

const SignalMapBackground = () => {
  // Canvas and animation refs
  const canvasRef = useRef(null);
  const darkMode = useSelector(selectDarkMode);
  const [mousePosition, setMousePosition] = useState(null);
  const rafId = useRef(null);
  
  // Performance monitoring
  const performanceMetrics = useRef({
    framesCount: 0,
    lastFpsUpdateTime: 0,
    fps: 60,
    lowPerformanceMode: false,
    averageFrameTime: 16,
    frameTimeSamples: []
  });
  
  // Add state for energy waves and space-time warping
  const energyWaves = useRef([]);
  const lastEnergyWaveTime = useRef(0);
  const spaceWarps = useRef([]);
  const lastWarpTime = useRef(0);
  
  // Cosmic elements
  const stars = useRef([]);
  const galaxies = useRef([]);
  const nebulae = useRef([]);
  const supernovas = useRef([]);

  // Color themes
  const colors = useMemo(() => ({
    dark: {
      background: 'rgba(11, 15, 25, 0.8)',
      stars: ['#ffffff', '#f0f0ff', '#ebebff', '#e0e0ff', '#d6d6ff'],
      galaxies: ['#7B68EE', '#9370DB', '#BA55D3', '#8A2BE2', '#9932CC'],
      nebulae: ['#FF69B4', '#FF1493', '#FF00FF', '#DA70D6', '#EE82EE'],
      energyWaves: ['rgba(30, 144, 255, 0.6)', 'rgba(65, 105, 225, 0.6)', 'rgba(138, 43, 226, 0.6)'],
      warpEffects: ['rgba(240, 248, 255, 0.7)', 'rgba(176, 224, 230, 0.7)']
    },
    light: {
      background: 'rgba(240, 248, 255, 0.8)',
      stars: ['#555555', '#444444', '#333333', '#222222', '#111111'],
      galaxies: ['#4B0082', '#483D8B', '#6A5ACD', '#5D478B', '#8470FF'],
      nebulae: ['#8B008B', '#800080', '#9400D3', '#8B008B', '#9932CC'],
      energyWaves: ['rgba(25, 25, 112, 0.6)', 'rgba(0, 0, 128, 0.6)', 'rgba(72, 61, 139, 0.6)'],
      warpEffects: ['rgba(25, 25, 112, 0.7)', 'rgba(0, 0, 139, 0.7)']
    }
  }), []);

  // Handle mouse movement
  const handleMouseMove = (event) => {
    setMousePosition({
      x: event.clientX,
      y: event.clientY
    });
    
    // Create energy wave at intervals when mouse moves
    const currentTime = Date.now();
    if (currentTime - lastEnergyWaveTime.current > 800) {
      createEnergyWave(event.clientX, event.clientY);
      lastEnergyWaveTime.current = currentTime;
    }
  };

  // Handle mouse click to create visual effects
  const handleMouseClick = (event) => {
    // Create energy burst at mouse click location
    const x = event.clientX;
    const y = event.clientY;
    
    // Create several energy waves at once for burst effect
    for (let i = 0; i < 3; i++) {
      setTimeout(() => {
        energyWaves.current.push({
          x,
          y,
          radius: 5 + i * 10,
          maxRadius: Math.random() * 150 + 100,
          speed: Math.random() * 3 + 2,
          opacity: 0.8 - (i * 0.1),
          colorIndex: Math.floor(Math.random() * 3)
        });
      }, i * 100);
    }
    
    // Also create a space warp at click location
    spaceWarps.current.push({
      x,
      y,
      size: 10,
      maxSize: Math.random() * 200 + 100,
      growthRate: Math.random() * 2 + 1,
      opacity: 0.7,
      colorIndex: Math.floor(Math.random() * 2)
    });
  };

  // Initialize cosmic elements with dynamic counts based on screen size
  const initializeCosmicElements = (canvas) => {
    const { width, height } = canvas;
    const screenArea = width * height;
    
    // Scale element counts based on screen size for better performance
    // Use fewer elements on smaller screens or less powerful devices
    const scaleFactor = Math.min(1, Math.max(0.4, screenArea / (1920 * 1080)));
    
    // Create stars - scale count based on screen size
    const starCount = Math.floor(150 * scaleFactor);
    stars.current = Array.from({ length: starCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 1.5 + 0.5,
      alpha: Math.random() * 0.8 + 0.2,
      pulse: Math.random() * 0.03 + 0.01,
      pulseFactor: 0,
      pulseDirection: Math.random() > 0.5 ? 1 : -1
    }));
    
    // Create galaxies - adjust count based on screen size
    const galaxyCount = Math.max(1, Math.floor(3 * scaleFactor));
    galaxies.current = Array.from({ length: galaxyCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 150 + 100,
      rotation: Math.random() * Math.PI * 2,
      rotationSpeed: (Math.random() * 0.0002) + 0.0001,
      arms: Math.floor(Math.random() * 2) + 3,
      density: Math.random() * 0.6 + 0.2,
      colorIndex: Math.floor(Math.random() * 5)
    }));
    
    // Create nebulae - adjust count based on screen size
    const nebulaCount = Math.max(1, Math.floor(2 * scaleFactor));
    nebulae.current = Array.from({ length: nebulaCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 200 + 150,
      alpha: Math.random() * 0.4 + 0.1,
      colorIndex: Math.floor(Math.random() * 5),
      shape: Math.random() > 0.5 ? 'cloud' : 'filament'
    }));
    
    // Create initial supernovas if any
    supernovas.current = [];
  };

  // Create energy wave effect
  const createEnergyWave = (x, y) => {
    energyWaves.current.push({
      x,
      y,
      radius: 10,
      maxRadius: Math.random() * 150 + 100,
      speed: Math.random() * 3 + 2,
      opacity: 0.7,
      colorIndex: Math.floor(Math.random() * 3)
    });
  };

  // Create space warp effect (randomly or on significant mouse movement)
  const createSpaceWarp = () => {
    if (!mousePosition) return;
    
    const currentTime = Date.now();
    if (currentTime - lastWarpTime.current > 5000) {
      spaceWarps.current.push({
        x: mousePosition.x,
        y: mousePosition.y,
        size: 10,
        maxSize: Math.random() * 250 + 150,
        growthRate: Math.random() * 3 + 1,
        opacity: 0.8,
        colorIndex: Math.floor(Math.random() * 2)
      });
      lastWarpTime.current = currentTime;
    }
  };

  // Create supernova burst effect
  const createSupernova = () => {
    if (!mousePosition || Math.random() > 0.001) return; // Very rare event
    
    supernovas.current.push({
      x: mousePosition.x,
      y: mousePosition.y,
      radius: 5,
      maxRadius: Math.random() * 300 + 200,
      expansionSpeed: Math.random() * 4 + 3,
      opacity: 1.0,
      particles: Array(Math.floor(Math.random() * 20 + 20)).fill().map(() => ({
        angle: Math.random() * Math.PI * 2,
        speed: Math.random() * 5 + 2,
        size: Math.random() * 2 + 1,
        distance: 0,
        decay: Math.random() * 0.02 + 0.01
      })),
      colorIndex: Math.floor(Math.random() * 5)
    });
  };

  // Draw cosmic background
  const drawCosmicBackground = (ctx, width, height) => {
    const theme = darkMode ? colors.dark : colors.light;
    
    // Performance optimization: Only update parts of the canvas that need updating
    
    // Draw stars - cache star colors for better performance
    stars.current.forEach(star => {
      if (!star.cachedColor) {
        star.cachedColor = theme.stars[Math.floor(Math.random() * theme.stars.length)];
      }
      
      ctx.beginPath();
      ctx.arc(star.x, star.y, star.radius * (1 + star.pulseFactor), 0, Math.PI * 2);
      ctx.fillStyle = star.cachedColor;
      ctx.globalAlpha = star.alpha * (1 + star.pulseFactor * 0.3);
      ctx.fill();
      
      // Update star pulse animation
      star.pulseFactor += star.pulse * star.pulseDirection;
      if (star.pulseFactor > 0.3 || star.pulseFactor < 0) {
        star.pulseDirection *= -1;
      }
    });
    
    // Draw galaxies - limit the number of particles based on performance
    galaxies.current.forEach(galaxy => {
      drawGalaxy(ctx, galaxy, theme);
      galaxy.rotation += galaxy.rotationSpeed;
    });
    
    // Draw nebulae
    nebulae.current.forEach(nebula => {
      drawNebula(ctx, nebula, theme);
    });
    
    // Draw supernovas
    for (let i = supernovas.current.length - 1; i >= 0; i--) {
      const supernova = supernovas.current[i];
      drawSupernova(ctx, supernova, theme);
      
      // Update supernova
      supernova.radius += supernova.expansionSpeed;
      supernova.opacity -= 0.01;
      
      // Remove faded supernovas
      if (supernova.opacity <= 0 || supernova.radius >= supernova.maxRadius) {
        supernovas.current.splice(i, 1);
      }
    }
    
    // Use a single loop for energy waves to improve performance
    for (let i = energyWaves.current.length - 1; i >= 0; i--) {
      const wave = energyWaves.current[i];
      ctx.beginPath();
      ctx.arc(wave.x, wave.y, wave.radius, 0, Math.PI * 2);
      ctx.strokeStyle = theme.energyWaves[wave.colorIndex];
      ctx.lineWidth = 2;
      ctx.globalAlpha = wave.opacity;
      ctx.stroke();
      
      // Update wave
      wave.radius += wave.speed;
      wave.opacity -= 0.01;
      
      // Remove faded waves - more efficient with backward iteration
      if (wave.opacity <= 0 || wave.radius >= wave.maxRadius) {
        energyWaves.current.splice(i, 1);
      }
    }
    
    // Use a single loop for space warps to improve performance
    for (let i = spaceWarps.current.length - 1; i >= 0; i--) {
      const warp = spaceWarps.current[i];
      drawSpaceWarp(ctx, warp, theme);
      
      // Update warp
      warp.size += warp.growthRate;
      warp.opacity -= 0.005;
      
      // Remove faded warps - more efficient with backward iteration
      if (warp.opacity <= 0 || warp.size >= warp.maxSize) {
        spaceWarps.current.splice(i, 1);
      }
    }
    
    // Reset global alpha
    ctx.globalAlpha = 1;
  };

  // Draw galaxy with performance optimizations and adaptive quality
  const drawGalaxy = (ctx, galaxy, theme) => {
    const { x, y, size, rotation, arms, density, colorIndex } = galaxy;
    const color = theme.galaxies[colorIndex];
    const metrics = performanceMetrics.current;
    
    // Simple rendering for low performance mode
    if (metrics.useSimpleRendering) {
      // Just draw a simple radial gradient for the galaxy
      const gradient = ctx.createRadialGradient(x, y, 0, x, y, size * 0.8);
      gradient.addColorStop(0, color);
      gradient.addColorStop(0.3, color.replace(')', ', 0.5)'));
      gradient.addColorStop(0.7, color.replace(')', ', 0.2)'));
      gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
      
      ctx.beginPath();
      ctx.arc(x, y, size * 0.8, 0, Math.PI * 2);
      ctx.fillStyle = gradient;
      ctx.globalAlpha = 0.6;
      ctx.fill();
      
      // Draw just a few stars in the galaxy
      const starCount = 30;
      for (let i = 0; i < starCount; i++) {
        const angle = Math.random() * Math.PI * 2;
        const distance = Math.random() * size * 0.7;
        const starX = x + distance * Math.cos(angle);
        const starY = y + distance * Math.sin(angle);
        const starSize = Math.random() * 1.5 + 0.5;
        
        ctx.beginPath();
        ctx.arc(starX, starY, starSize, 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.globalAlpha = Math.random() * 0.5 + 0.3;
        ctx.fill();
      }
      
      return;
    }
    
    // Use a fixed number of stars based on screen performance
    // Store galaxy stars if not already calculated
    if (!galaxy.stars) {
      const numStars = Math.min(500, Math.floor(size * 0.7)); // Limit based on galaxy size
      galaxy.stars = [];
      
      for (let i = 0; i < numStars; i++) {
        // Calculate arm position using polar coordinates
        const armOffset = (i % arms) * (Math.PI * 2 / arms);
        const distance = Math.random() * size * 0.8;
        const angle = (distance * 0.01) + armOffset;
        const starDensity = 1 - (distance / size);
        
        if (Math.random() <= starDensity * density) {
          galaxy.stars.push({
            distance,
            angle,
            size: Math.random() * 1.5 + 0.5,
            alpha: Math.random() * 0.5 + 0.3
          });
        }
      }
    }
    
    // Draw precalculated stars with current rotation
    galaxy.stars.forEach(star => {
      const finalAngle = star.angle + rotation;
      const spiralX = x + star.distance * Math.cos(finalAngle);
      const spiralY = y + star.distance * Math.sin(finalAngle);
      
      ctx.beginPath();
      ctx.arc(spiralX, spiralY, star.size, 0, Math.PI * 2);
      ctx.fillStyle = color;
      ctx.globalAlpha = star.alpha;
      ctx.fill();
    });
    
    // Draw galaxy core
    const gradient = ctx.createRadialGradient(x, y, 0, x, y, size * 0.2);
    gradient.addColorStop(0, color);
    gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
    
    ctx.beginPath();
    ctx.arc(x, y, size * 0.2, 0, Math.PI * 2);
    ctx.fillStyle = gradient;
    ctx.globalAlpha = 0.7;
    ctx.fill();
  };

  // Draw nebula
  const drawNebula = (ctx, nebula, theme) => {
    const { x, y, size, alpha, colorIndex, shape } = nebula;
    const color = theme.nebulae[colorIndex];
    
    if (shape === 'cloud') {
      // Cloud-like nebula - simple and efficient
      const gradient = ctx.createRadialGradient(x, y, 0, x, y, size);
      gradient.addColorStop(0, color);
      gradient.addColorStop(0.5, color.replace(')', ', 0.5)'));
      gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
      
      ctx.beginPath();
      ctx.arc(x, y, size, 0, Math.PI * 2);
      ctx.fillStyle = gradient;
      ctx.globalAlpha = alpha;
      ctx.fill();
    } else {
      // Filament-like nebula - cache filament positions for better performance
      if (!nebula.filaments) {
        // Generate and cache filaments
        nebula.filaments = [];
        const filamentCount = Math.min(20, Math.floor(size / 10)); // Limit based on size
        
        for (let i = 0; i < filamentCount; i++) {
          nebula.filaments.push({
            x: x + (Math.random() * size * 0.8 - size * 0.4),
            y: y + (Math.random() * size * 0.8 - size * 0.4),
            size: Math.random() * size * 0.4 + size * 0.2,
            alpha: alpha * (Math.random() * 0.5 + 0.5)
          });
        }
      }
      
      // Draw cached filaments
      nebula.filaments.forEach(filament => {
        const gradient = ctx.createRadialGradient(
          filament.x, filament.y, 0, 
          filament.x, filament.y, filament.size
        );
        gradient.addColorStop(0, color);
        gradient.addColorStop(0.7, color.replace(')', ', 0.3)'));
        gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
        
        ctx.beginPath();
        ctx.arc(filament.x, filament.y, filament.size, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.globalAlpha = filament.alpha;
        ctx.fill();
      });
    }
  };

  // Draw space warp
  const drawSpaceWarp = (ctx, warp, theme) => {
    const { x, y, size, opacity, colorIndex } = warp;
    const color = theme.warpEffects[colorIndex];
    
    // Create gravitational lensing effect
    const gradient = ctx.createRadialGradient(x, y, 0, x, y, size);
    gradient.addColorStop(0, 'rgba(255, 255, 255, ' + (opacity * 0.7) + ')');
    gradient.addColorStop(0.2, color);
    gradient.addColorStop(0.7, color.replace(')', ', 0.5)'));
    gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
    
    ctx.beginPath();
    ctx.arc(x, y, size, 0, Math.PI * 2);
    ctx.fillStyle = gradient;
    ctx.globalAlpha = opacity * 0.8;
    ctx.fill();
    
    // Add distortion rings
    ctx.beginPath();
    ctx.arc(x, y, size * 0.7, 0, Math.PI * 2);
    ctx.lineWidth = 1;
    ctx.strokeStyle = color.replace(')', ', 0.8)');
    ctx.stroke();
    
    ctx.beginPath();
    ctx.arc(x, y, size * 0.4, 0, Math.PI * 2);
    ctx.lineWidth = 1.5;
    ctx.strokeStyle = color.replace(')', ', 0.9)');
    ctx.stroke();
  };

  // Draw supernova with debris trail
  const drawSupernova = (ctx, supernova, theme) => {
    const { x, y, radius, opacity, particles, colorIndex } = supernova;
    const color = theme.nebulae[colorIndex];
    
    // Draw main explosion
    const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius);
    gradient.addColorStop(0, 'rgba(255, 255, 255, ' + opacity + ')');
    gradient.addColorStop(0.3, color);
    gradient.addColorStop(0.7, color.replace(')', ', 0.5)'));
    gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
    
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fillStyle = gradient;
    ctx.globalAlpha = opacity;
    ctx.fill();
    
    // Draw explosion debris particles
    particles.forEach(particle => {
      const particleX = x + Math.cos(particle.angle) * particle.distance;
      const particleY = y + Math.sin(particle.angle) * particle.distance;
      
      ctx.beginPath();
      ctx.arc(particleX, particleY, particle.size * (1 - particle.distance/300), 0, Math.PI * 2);
      ctx.fillStyle = color;
      ctx.globalAlpha = opacity * (1 - particle.distance/300);
      ctx.fill();
      
      // Update particle
      particle.distance += particle.speed;
    });
  };

  // Optimize animation with throttling for performance
  // Animation loop with performance monitoring and adaptive quality
  const animate = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d', { alpha: false }); // Use alpha: false for better performance
    const { width, height } = canvas;
    
    // Performance monitoring
    const now = performance.now();
    const metrics = performanceMetrics.current;
    
    // Calculate frame time and update metrics
    if (animate.lastFrameTime) {
      const frameTime = now - animate.lastFrameTime;
      
      // Add to rolling average (keep last 30 frames)
      metrics.frameTimeSamples.push(frameTime);
      if (metrics.frameTimeSamples.length > 30) {
        metrics.frameTimeSamples.shift();
      }
      
      // Calculate average frame time
      const total = metrics.frameTimeSamples.reduce((sum, time) => sum + time, 0);
      metrics.averageFrameTime = total / metrics.frameTimeSamples.length;
      
      // Update FPS counter once per second
      metrics.framesCount++;
      if (now - metrics.lastFpsUpdateTime > 1000) {
        metrics.fps = Math.round(metrics.framesCount * 1000 / (now - metrics.lastFpsUpdateTime));
        metrics.framesCount = 0;
        metrics.lastFpsUpdateTime = now;
        
        // Adapt to performance
        if (metrics.fps < 30 && !metrics.lowPerformanceMode) {
          // Switch to low performance mode
          metrics.lowPerformanceMode = true;
          
          // Reduce visual elements
          const reduction = 0.6; // 40% reduction
          stars.current = stars.current.slice(0, Math.floor(stars.current.length * reduction));
          galaxies.current = galaxies.current.slice(0, Math.max(1, Math.floor(galaxies.current.length * reduction)));
          nebulae.current = nebulae.current.slice(0, Math.max(1, Math.floor(nebulae.current.length * reduction)));
          
          // Use simpler rendering techniques
          metrics.useSimpleRendering = true;
        } else if (metrics.fps > 50 && metrics.lowPerformanceMode) {
          // Return to normal mode if performance improves
          metrics.lowPerformanceMode = false;
          
          // Restore elements (will happen on next resize)
          metrics.useSimpleRendering = false;
        }
      }
    }
    animate.lastFrameTime = now;
    
    // Clear canvas with semi-transparent background for trail effect
    // Use a more opaque background in low performance mode (less trail effect)
    const opacity = metrics.lowPerformanceMode ? 0.4 : 0.2;
    ctx.fillStyle = darkMode ? `rgba(11, 15, 25, ${opacity})` : `rgba(240, 248, 255, ${opacity})`;
    ctx.fillRect(0, 0, width, height);
    
    // Draw cosmic background
    drawCosmicBackground(ctx, width, height);
    
    // Create random effects with lower probability in low performance mode
    const warpProbability = metrics.lowPerformanceMode ? 0.999 : 0.998;
    if (Math.random() > warpProbability) {
      createSpaceWarp();
    }
    
    // Create supernovas (even more rare in low performance mode)
    if (!metrics.lowPerformanceMode) {
      createSupernova();
    }
    
    // Request next frame
    rafId.current = requestAnimationFrame(animate);
  };

  // Canvas setup with performance monitoring and event handling
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const handleResize = () => {
      // Use a resize debounce for better performance
      if (handleResize.timeout) {
        clearTimeout(handleResize.timeout);
      }
      
      handleResize.timeout = setTimeout(() => {
        if (canvas) {
          canvas.width = window.innerWidth;
          canvas.height = window.innerHeight;
          initializeCosmicElements(canvas);
        }
      }, 200); // 200ms debounce
    };
    
    // Throttle mouse move events for performance
    let lastMoveTime = 0;
    const throttledMouseMove = (event) => {
      const now = Date.now();
      if (now - lastMoveTime > 30) { // 30ms throttle (~33fps)
        handleMouseMove(event);
        lastMoveTime = now;
      }
    };
    
    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', throttledMouseMove);
    window.addEventListener('click', handleMouseClick);
    
    // Initial setup
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    initializeCosmicElements(canvas);
    
    // Start animation
    animate.lastFrameTime = 0;
    animate.reducedQuality = false;
    animate();
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', throttledMouseMove);
      window.removeEventListener('click', handleMouseClick);
      if (rafId.current) {
        cancelAnimationFrame(rafId.current);
      }
      if (handleResize.timeout) {
        clearTimeout(handleResize.timeout);
      }
    };
  }, [darkMode]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full -z-10 pointer-events-none"
      style={{ pointerEvents: 'auto' }} // Enable click events
    />
  );
};

export default SignalMapBackground;
