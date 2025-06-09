/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['Fira Code', 'Source Code Pro', 'monospace'],
      },      colors: {
        hacker: {
          primary: '#00FF00',
          secondary: '#008F11',
          tertiary: '#00DD00', 
          dark: '#0D0208',
          light: '#003B00',
          border: '#00FF00',
          accent: '#00FFAA',
        },
        modern: {
          primary: '#2563eb',
          secondary: '#3b82f6',
          dark: '#1e293b',
          light: '#f8fafc',
          border: '#e2e8f0',
        }
      },      keyframes: {
        flicker: {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0.8 },
        },
        scanline: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100%)' },
        },
        glow: {
          '0%, 100%': { boxShadow: '0 0 5px #00FF00, 0 0 10px #00FF00, 0 0 15px #00FF00' },
          '50%': { boxShadow: '0 0 10px #00FF00, 0 0 20px #00FF00, 0 0 30px #00FF00' },
        },
        matrix: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100%)' },
        },
        'scan-y': {
          '0%': { transform: 'translateY(-100vh)' },
          '100%': { transform: 'translateY(100vh)' },
        },
        'scan-x': {
          '0%': { transform: 'translateX(-100vw)' },
          '100%': { transform: 'translateX(100vw)' },
        },
        'spin-slow': {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        'ping-signal': {
          '0%': { transform: 'scale(0.95)', opacity: '1' },
          '70%': { transform: 'scale(1.5)', opacity: '0.3' },
          '100%': { transform: 'scale(1.7)', opacity: '0' }
        },
        'cursor-blink': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.5' }
        },
        'cursor-pulse': {
          '0%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.3)' },
          '100%': { transform: 'scale(1)' }
        },
        'trail-fade': {
          '0%': { opacity: '0.7' },
          '100%': { opacity: '0' }
        },
        'signal-travel': {
          '0%': { strokeDashoffset: '100%' },
          '100%': { strokeDashoffset: '0%' }
        },
      },
      animation: {
        flicker: 'flicker 3s linear infinite',
        scanline: 'scanline 8s linear infinite',
        glow: 'glow 2s ease-in-out infinite',
        matrix: 'matrix 20s linear infinite',
        'scan-y': 'scan-y 3s linear infinite',
        'scan-x': 'scan-x 4s linear infinite',
        'spin-slow': 'spin-slow 60s linear infinite',
        'ping-signal': 'ping-signal 2s cubic-bezier(0, 0, 0.2, 1) infinite',
        'cursor-blink': 'cursor-blink 1s ease-in-out infinite',
        'cursor-pulse': 'cursor-pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'trail-fade': 'trail-fade 0.5s linear forwards',
        'signal-travel': 'signal-travel 2s linear',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      }
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
