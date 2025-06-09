import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';

const MatrixBackground = () => {
  const canvasRef = useRef(null);
  const { darkMode } = useSelector((state) => state.theme);

  useEffect(() => {
    if (!darkMode) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);    // Matrix characters
    const chars = '01ABCDEFabcdef0123456789ロドコンヰメリバヌポモナカキソラネロワ'; // Expanded character set including Katakana
    const charSize = 12;
    const columns = canvas.width / charSize;
    const drops = new Array(Math.floor(columns)).fill(1);    // Animation
    const draw = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Different brightness levels for more authentic terminal look
      const brightGreen = '#00FF00';
      const midGreen = '#00DD00';
      const dimGreen = '#00AA00';
      
      // Draw grid lines like in the terminal image
      ctx.strokeStyle = 'rgba(0, 255, 0, 0.15)';
      ctx.lineWidth = 1;
      
      // Horizontal grid lines
      for (let y = 0; y < canvas.height; y += 80) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }
      
      // Vertical grid lines
      for (let x = 0; x < canvas.width; x += 80) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }

      ctx.font = `${charSize}px "Fira Code"`;

      for (let i = 0; i < drops.length; i++) {
        // Randomize character brightness for more authentic terminal look
        const brightness = Math.random();
        if (brightness > 0.9) {
          ctx.fillStyle = brightGreen; // Bright characters (rare)
        } else if (brightness > 0.5) {
          ctx.fillStyle = midGreen; // Medium brightness (common)
        } else {
          ctx.fillStyle = dimGreen; // Dim characters (common)
        }
        
        const text = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillText(text, i * charSize, drops[i] * charSize);

        if (drops[i] * charSize > canvas.height && Math.random() > 0.98) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    };

    const interval = setInterval(draw, 50);

    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [darkMode]);  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 -z-20 opacity-25 dark:opacity-35 pointer-events-none"
    />
  );
};

export default MatrixBackground;
