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

const NavbarLink = ({ item }) => {
  const [showLabel, setShowLabel] = useState(false);
  const location = useLocation();
  const isActive = location.pathname === item.href;
  const Icon = item.icon;

  return (
    <NavLink
      to={item.href}
      className="relative group"
      onMouseEnter={() => setShowLabel(true)}
      onMouseLeave={() => setShowLabel(false)}
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

      <AnimatePresence>
        {showLabel && (
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
  const [showNav, setShowNav] = useState(false);
  let hideTimeout;

  const handleMouseMove = (e) => {
    if (e.clientX < 20) {
      clearTimeout(hideTimeout);
      setShowNav(true);
    } else if (e.clientX > 80 && showNav) {
      clearTimeout(hideTimeout);
      hideTimeout = setTimeout(() => setShowNav(false), 800);
    }
  };

  React.useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    
    // Hide nav initially after a short delay
    const initialTimeout = setTimeout(() => setShowNav(false), 2000);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      clearTimeout(hideTimeout);
      clearTimeout(initialTimeout);
    };
  }, []);
  return (
    <motion.nav
      initial={{ x: -64 }}
      animate={{
        x: showNav ? 0 : -60,
        opacity: showNav ? 1 : 0.2
      }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className="fixed left-0 top-0 h-screen w-16 z-50 flex flex-col items-center justify-center
                bg-white/90 dark:bg-hacker-dark/90 backdrop-blur-md shadow-lg
                border-r border-gray-200 dark:border-hacker-primary/30 hover:border-r-2 dark:hover:border-hacker-primary/60"
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
    </motion.nav>
  );
}