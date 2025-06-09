import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { FaHome, FaUser, FaCode, FaEnvelope, FaFile, FaSun, FaMoon } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
import { selectDarkMode, toggleTheme } from '../../features/theme/themeSlice';
import { motion, AnimatePresence } from 'framer-motion';

const navigation = [
  { name: 'Home', href: '/', icon: FaHome },
  { name: 'About', href: '/about', icon: FaUser },
  { name: 'Projects', href: '/projects', icon: FaCode },
  { name: 'Contact', href: '/contact', icon: FaEnvelope },
  { name: 'Resume', href: '/resume', icon: FaFile },
];

const NavbarLink = ({ item, isMobile = false }) => {
  const location = useLocation();
  const isActive = location.pathname === item.href;
  const Icon = item.icon;
  const [showTooltip, setShowTooltip] = useState(false);

  // Mobile version (shown at bottom)
  if (isMobile) {
    return (
      <NavLink
        to={item.href}
        className="relative flex items-center justify-center px-2"
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
      >
        <div className={`
          p-2 rounded-lg transition-all duration-300
          ${isActive 
            ? 'text-modern-primary dark:text-hacker-primary dark:glow'
            : 'text-gray-600 dark:text-gray-400 hover:text-modern-primary dark:hover:text-hacker-primary'
          }
        `}>
          <Icon className="w-5 h-5" />
        </div>
        
        {/* Mobile Tooltip (appears above icon) */}
        <AnimatePresence>
          {showTooltip && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="absolute bottom-full mb-2 z-50"
            >
              <div className="bg-white dark:bg-hacker-dark/90 px-2 py-1 rounded shadow-lg
                          border border-gray-200 dark:border-hacker-primary/30">
                <span className="text-xs whitespace-nowrap font-mono
                            text-gray-900 dark:text-hacker-primary">
                  {item.name}
                </span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </NavLink>
    );
  }

  // Desktop version (shown on left)
  return (
    <NavLink
      to={item.href}
      className="relative group w-full flex items-center"
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      <div className={`
        p-3 rounded-lg transition-all duration-300
        ${isActive 
          ? 'text-modern-primary dark:text-hacker-primary dark:glow'
          : 'text-gray-600 dark:text-gray-400 hover:text-modern-primary dark:hover:text-hacker-primary'
        }
      `}>
        <Icon className="w-6 h-6" />
      </div>
      
      {/* Desktop Tooltip (appears to the right of icon) */}
      <AnimatePresence>
        {showTooltip && (
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            className="absolute left-16 top-1/2 -translate-y-1/2 z-50"
          >
            <div className="bg-white dark:bg-hacker-dark/90 px-3 py-1.5 rounded-lg shadow-lg
                          border border-gray-200 dark:border-hacker-primary/30">
              <span className="text-sm whitespace-nowrap font-mono
                            text-gray-900 dark:text-hacker-primary">
                {item.name}
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </NavLink>
  );
};

export default function Navbar() {
  const darkMode = useSelector(selectDarkMode);
  const dispatch = useDispatch();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  
  // Check if the screen is mobile size on resize
  React.useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);  return (
    <>
      {/* Desktop Navigation (Left Side) */}
      {!isMobile && (
        <nav className="fixed left-0 top-0 h-screen w-16 z-50 flex flex-col items-center justify-center
                  bg-white/90 dark:bg-hacker-dark/90 backdrop-blur-md shadow-lg
                  border-r border-gray-200 dark:border-hacker-primary/30 dark:border-r-2"
        >
          <div className="flex flex-col items-center space-y-6">
            {navigation.map((item) => (
              <NavbarLink key={item.name} item={item} />
            ))}
            <button
              onClick={() => dispatch(toggleTheme())}
              className="p-2 rounded-lg transition-all duration-200
                        text-gray-600 dark:text-hacker-primary
                        hover:text-modern-primary dark:hover:text-hacker-accent
                        border border-transparent dark:hover:border-hacker-primary/70
                        dark:hover:shadow-hacker-primary/20 dark:hover:shadow-sm"
              aria-label="Toggle theme"
            >
              <motion.div
                initial={false}
                animate={{ rotate: darkMode ? 180 : 0 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col items-center"
              >
                {darkMode ? (
                  <>
                    <FaMoon className="w-5 h-5" />
                    <span className="text-[8px] mt-1 font-mono">TERMINAL</span>
                  </>
                ) : (
                  <>
                    <FaSun className="w-5 h-5" />
                    <span className="text-[8px] mt-1 font-mono">STANDARD</span>
                  </>
                )}
              </motion.div>
            </button>
          </div>
        </nav>
      )}
      
      {/* Mobile Navigation (Bottom) */}
      {isMobile && (
        <nav className="fixed bottom-0 left-0 w-full z-50 
                  bg-white/95 dark:bg-hacker-dark/95 backdrop-blur-md shadow-lg-up
                  border-t border-gray-200 dark:border-hacker-primary/30 py-2"
        >
          <div className="flex justify-around items-center">
            {navigation.map((item) => (
              <NavbarLink key={item.name} item={item} isMobile={true} />
            ))}
            <div className="flex flex-col items-center px-2">
              <button
                onClick={() => dispatch(toggleTheme())}
                className="p-2 rounded-lg transition-all duration-200
                          text-gray-600 dark:text-hacker-primary
                          hover:text-modern-primary dark:hover:text-hacker-accent"
                aria-label="Toggle theme"
              >
                {darkMode ? <FaMoon className="w-5 h-5" /> : <FaSun className="w-5 h-5" />}
              </button>
              <span className="text-xs font-mono mt-1">
                {darkMode ? 'DARK' : 'LIGHT'}
              </span>
            </div>
          </div>
        </nav>
      )}
    </>
  );
}