import React, { Suspense, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectDarkMode } from '../features/theme/themeSlice';
import { AnimatePresence, motion } from 'framer-motion';
import Navbar from './common/Navbar';
import Footer from './common/Footer';
import Background from './common/Background';
import MatrixBackground from './common/MatrixBackground';
import ScannerEffect from './common/ScannerEffect';
import TerminalLoader from './common/TerminalLoader';
import Home from '../pages/Home';
import About from '../pages/About';
import Projects from '../pages/Projects';
import Contact from '../pages/Contact';
import Resume from '../pages/Resume';
import NotFound from '../pages/NotFound';
import AOS from 'aos';
import 'aos/dist/aos.css';

const AppLayout = () => {
  const darkMode = useSelector(selectDarkMode);
  const location = useLocation();

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      disable: 'mobile'
    });
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
    localStorage.setItem('theme', darkMode ? 'dark' : 'light');
  }, [darkMode]);  return (
    <div className="min-h-screen w-full flex relative">
      {/* Persistent Background */}
      <Background />
      
      {/* Scanner Effect */}
      <ScannerEffect />
      
      {/* Side Navigation */}
      <Navbar />
      
      {/* Main Content Area */}      <main className="flex-1 ml-16 relative">
        <div className="absolute inset-0 overflow-auto custom-scrollbar">
          <div className="min-h-screen p-6 z-10">            <AnimatePresence mode="wait">
              <motion.div
                key={location.pathname}
                initial={{ opacity: 0, y: 20 }}
                animate={{ 
                  opacity: 1, 
                  y: 0,
                  transition: {
                    type: "spring",
                    stiffness: 260,
                    damping: 20,
                    duration: 0.5
                  }
                }}
                exit={{ 
                  opacity: 0,
                  x: -30,
                  transition: {
                    duration: 0.2
                  }
                }}
                className="relative z-10"
              >                <Suspense fallback={
                  <div className="flex items-center justify-center min-h-[80vh]">
                    <TerminalLoader 
                      text="Initializing Interface" 
                      duration={1500}
                      className="max-w-md w-full"
                    />
                  </div>
                }>
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/projects" element={<Projects />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/resume" element={<Resume />} />
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </Suspense>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AppLayout;