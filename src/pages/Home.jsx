import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import { personalInfo } from '../data/personalInfo';
import { Link } from 'react-scroll';
import { FaGithub, FaLinkedin, FaEnvelope, FaCode, FaServer, FaMobileAlt, FaBrain, FaRocket, FaDatabase, FaLaptopCode, FaNetworkWired, FaTools } from 'react-icons/fa';

const Home = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [activeStats, setActiveStats] = useState([]);
  const terminalRef = useRef(null);
  
  // Update time every second for the terminal display
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);

  // Terminal animation effect
  useEffect(() => {
    if (terminalRef.current) {
      const stats = [
        { name: 'STATUS', value: 'ONLINE' },
        { name: 'VERSION', value: '1.0.5' },
        { name: 'UPTIME', value: '97.8%' },
        { name: 'SYSTEM', value: 'ACTIVE' }
      ];
      
      // Add stats one by one with delay
      let index = 0;
      const interval = setInterval(() => {
        if (index < stats.length) {
          setActiveStats(prev => [...prev, stats[index]]);
          index++;
        } else {
          clearInterval(interval);
        }
      }, 300);
      
      return () => clearInterval(interval);
    }
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10,
        duration: 0.5
      }
    }
  };

  const boxVariants = {
    hover: {
      scale: 1.05,
      boxShadow: "0px 5px 15px rgba(0, 255, 0, 0.2)",
      borderColor: "rgba(0, 255, 0, 0.5)",
      transition: { duration: 0.3 }
    }
  };

  // Format the current time in terminal style
  const terminalTime = currentTime.toLocaleTimeString([], { hour12: false });
  const terminalDate = currentTime.toLocaleDateString([], { year: 'numeric', month: '2-digit', day: '2-digit' }).replace(/\//g, '-');

  return (
    <motion.section
      id="home"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="relative min-h-[calc(100vh-4rem)] w-full bg-gradient-to-br from-white/80 via-indigo-50/80 to-white/80 dark:from-black/10 dark:via-black/10 dark:to-black/10 py-12"
    >
      {/* Decorative circuit pattern elements */}
      <div className="absolute top-20 left-10 w-24 h-24 border border-indigo-300 dark:border-hacker-primary/30 rounded-lg opacity-40 dark:opacity-20 pointer-events-none"></div>
      <div className="absolute bottom-40 right-10 w-32 h-32 border-2 border-dashed border-indigo-200 dark:border-hacker-primary/20 rounded-full opacity-30 dark:opacity-10 animate-spin pointer-events-none" style={{animationDuration: '30s'}}></div>
      <div className="absolute top-1/3 right-1/4 w-4 h-4 bg-indigo-400 dark:bg-hacker-accent rounded-full opacity-40 animate-ping-signal pointer-events-none" style={{animationDuration: '4s'}}></div>
      
      <div className="w-full max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main identity terminal */}
        <motion.div 
          variants={itemVariants}
          className="lg:col-span-2 terminal-card flex flex-col justify-center relative overflow-hidden"
        >
          {/* Terminal scanline effect */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className="w-full h-2 bg-hacker-primary/10 dark:bg-hacker-primary/20 absolute animate-scan-fast"></div>
          </div>
          
          <div className="terminal-header">
            <div className="flex items-center">
              <span className="h-3 w-3 rounded-full bg-red-500 mx-1 animate-pulse"></span>
              <span className="h-3 w-3 rounded-full bg-yellow-500 mx-1"></span>
              <span className="h-3 w-3 rounded-full bg-green-500 mx-1"></span>
              <span className="terminal-title ml-2">IDENTITY.SYS</span>
            </div>
            <span className="text-gray-400 dark:text-hacker-primary/70 font-mono">{terminalDate} | {terminalTime}</span>
          </div>
          
          <div className="p-6 relative">
            {/* System loading/boot animation */}
            <div className="mb-4 flex flex-wrap gap-2">
              {activeStats.map((stat, index) => (
                <motion.div 
                  key={stat.name}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="px-3 py-1 bg-gray-100 dark:bg-black/30 rounded-md border border-gray-200 dark:border-hacker-primary/30 text-xs font-mono flex items-center"
                >
                  <span className="text-gray-500 dark:text-hacker-primary/50 mr-1">{stat.name}:</span>
                  <span className="text-indigo-600 dark:text-hacker-accent">{stat.value}</span>
                </motion.div>
              ))}
            </div>
            
            <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 dark:text-hacker-primary sm:text-5xl md:text-6xl">
              <motion.span 
                className="block dark:font-mono dark:border-b dark:border-hacker-primary/30 dark:pb-2 dark:inline-block"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <span className="dark:text-hacker-primary dark:font-normal dark:text-sm dark:mr-2 dark:font-mono animate-cursor-blink">{">"}</span>
                <span className="glitch-text" data-text={`Hi, I'm ${personalInfo.name}`}>
                  Hi, I'm {personalInfo.name}
                </span>
              </motion.span>
              <motion.span 
                className="block text-indigo-600 dark:text-hacker-primary mt-3"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.8 }}
              >
                <TypeAnimation
                  sequence={[
                    'Software Developer',
                    2000,
                    'Full Stack Developer',
                    2000,
                    'React Specialist',
                    2000,
                    '.NET Developer',
                    2000,
                  ]}
                  wrapper="span"
                  speed={50}
                  repeat={Infinity}
                  className="animate-glow-pulse dark:text-hacker-accent"
                />
              </motion.span>
            </h1>
          </div>
          
          <div className="p-6 border-t border-gray-200 dark:border-hacker-primary/30">
            <motion.div
              variants={itemVariants}
              className="mt-2 text-lg text-gray-600 dark:text-hacker-primary/90 max-w-3xl mx-auto dark:p-4 dark:border dark:border-hacker-primary/30 dark:bg-black/40 dark:backdrop-blur-sm rounded-md dark:font-mono"
            >
              <span className="dark:text-hacker-secondary dark:mr-2 dark:font-mono">{">"}</span>
              {personalInfo.summary}
            </motion.div>
            
            <motion.div
              variants={itemVariants}
              className="mt-10 flex gap-4 justify-center flex-wrap"
            >
              <Link
                to="projects"
                smooth={true}
                duration={500}
                className="px-6 py-2 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 transform hover:scale-105 transition-all cursor-pointer shadow-lg dark:bg-black/50 dark:text-hacker-primary dark:border-hacker-primary dark:hover:bg-black dark:hover:shadow-hacker-primary/20 animate-vibrate-hover"
                onMouseEnter={(e) => {
                  e.currentTarget.classList.add('animate-vibrate');
                  setTimeout(() => {
                    e.currentTarget.classList.remove('animate-vibrate');
                  }, 300);
                }}
              >
                <span className="dark:font-mono dark:text-sm flex items-center">
                  <span className="animate-cursor-blink mr-1">{">"}</span> 
                  EXECUTE: VIEW_PROJECTS
                  <span className="ml-1 opacity-70 animate-glow-pulse">_</span>
                </span>
              </Link>
              <Link
                to="contact"
                smooth={true}
                duration={500}
                className="px-6 py-2 border border-indigo-600 text-base font-medium rounded-md text-indigo-600 hover:bg-indigo-50 transform hover:scale-105 transition-all cursor-pointer dark:text-hacker-primary dark:border-hacker-primary/50 dark:hover:bg-black/30 dark:hover:border-hacker-primary animate-vibrate-hover"
                onMouseEnter={(e) => {
                  e.currentTarget.classList.add('animate-vibrate');
                  setTimeout(() => {
                    e.currentTarget.classList.remove('animate-vibrate');
                  }, 300);
                }}
              >
                <span className="dark:font-mono dark:text-sm flex items-center">
                  <span className="animate-cursor-blink mr-1">{">"}</span> 
                  EXECUTE: CONTACT_DEV
                  <span className="ml-1 opacity-70 animate-glow-pulse">_</span>
                </span>
              </Link>
              <Link
                to="about"
                smooth={true}
                duration={500}
                className="px-6 py-2 border border-indigo-300 text-base font-medium rounded-md text-indigo-700 hover:bg-indigo-50 transform hover:scale-105 transition-all cursor-pointer dark:text-hacker-secondary dark:border-hacker-secondary/50 dark:hover:bg-black/30 dark:hover:border-hacker-secondary animate-vibrate-hover"
                onMouseEnter={(e) => {
                  e.currentTarget.classList.add('animate-vibrate');
                  setTimeout(() => {
                    e.currentTarget.classList.remove('animate-vibrate');
                  }, 300);
                }}
              >
                <span className="dark:font-mono dark:text-sm flex items-center">
                  <span className="animate-cursor-blink mr-1">{">"}</span> 
                  EXECUTE: ABOUT_DEV
                  <span className="ml-1 opacity-70 animate-glow-pulse">_</span>
                </span>
              </Link>
            </motion.div>
            
            <motion.div
              variants={itemVariants}
              className="mt-12 flex justify-center space-x-8"
            >
              <motion.a
                href={`https://${personalInfo.contact.linkedin}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-indigo-600 transition-colors dark:text-hacker-primary/70 dark:hover:text-hacker-accent dark:flex dark:flex-col dark:items-center relative"
                aria-label="LinkedIn Profile"
                whileHover={{ scale: 1.2, rotate: [0, 5, -5, 0] }}
                transition={{ duration: 0.3 }}
              >
                <FaLinkedin className="h-6 w-6 animate-glow-pulse" />
                <div className="hidden dark:block dark:absolute dark:top-full dark:mt-1 dark:text-[10px] dark:font-mono dark:text-hacker-accent">[LINK]</div>
              </motion.a>
              <motion.a
                href={`mailto:${personalInfo.contact.email}`}
                className="text-gray-500 hover:text-indigo-600 transition-colors dark:text-hacker-primary/70 dark:hover:text-hacker-accent relative"
                aria-label="Email Contact"
                whileHover={{ scale: 1.2, rotate: [0, 5, -5, 0] }}
                transition={{ duration: 0.3 }}
              >
                <FaEnvelope className="h-6 w-6 animate-glow-pulse" />
                <div className="hidden dark:block dark:absolute dark:top-full dark:mt-1 dark:text-[10px] dark:font-mono dark:text-hacker-accent">[MAIL]</div>
              </motion.a>
              <motion.a
                href="https://github.com/HaxSantosh"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-indigo-600 transition-colors dark:text-hacker-primary/70 dark:hover:text-hacker-accent relative"
                aria-label="GitHub Profile"
                whileHover={{ scale: 1.2, rotate: [0, 5, -5, 0] }}
                transition={{ duration: 0.3 }}
              >
                <FaGithub className="h-6 w-6 animate-glow-pulse" />
                <div className="hidden dark:block dark:absolute dark:top-full dark:mt-1 dark:text-[10px] dark:font-mono dark:text-hacker-accent">[GIT]</div>
              </motion.a>
            </motion.div>
          </div>
        </motion.div>

        {/* Right side panels */}
        <div className="lg:col-span-1 flex flex-col gap-6">
          {/* Skills and Tools terminal */}
          <motion.div
            variants={itemVariants}
            whileHover="hover"
            className="terminal-card p-4 overflow-hidden"
          >
            <div className="terminal-header">
              <span className="terminal-title">SKILLS.TXT</span>
              <span className="text-gray-400 dark:text-hacker-primary/70 font-mono">cat skills.txt</span>
            </div>
            <div className="mt-4">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-hacker-primary mb-4">
                <span className="dark:font-mono">{">"} Skills & Tools</span>
              </h2>
              <div className="grid grid-cols-2 gap-2">
                <ul className="space-y-2 text-gray-700 dark:text-hacker-primary/90 list-disc list-inside">
                  <li className="flex items-center">
                    <FaCode className="h-4 w-4 mr-2 text-indigo-600 dark:text-hacker-accent" />
                    <span className="dark:font-mono text-sm">JavaScript/TS</span>
                  </li>
                  <li className="flex items-center">
                    <FaCode className="h-4 w-4 mr-2 text-indigo-600 dark:text-hacker-accent" />
                    <span className="dark:font-mono text-sm">React/Redux</span>
                  </li>
                  <li className="flex items-center">
                    <FaServer className="h-4 w-4 mr-2 text-indigo-600 dark:text-hacker-accent" />
                    <span className="dark:font-mono text-sm">Node.js</span>
                  </li>
                  <li className="flex items-center">
                    <FaDatabase className="h-4 w-4 mr-2 text-indigo-600 dark:text-hacker-accent" />
                    <span className="dark:font-mono text-sm">SQL/NoSQL</span>
                  </li>
                </ul>
                <ul className="space-y-2 text-gray-700 dark:text-hacker-primary/90 list-disc list-inside">
                  <li className="flex items-center">
                    <FaMobileAlt className="h-4 w-4 mr-2 text-indigo-600 dark:text-hacker-accent" />
                    <span className="dark:font-mono text-sm">Responsive UI</span>
                  </li>
                  <li className="flex items-center">
                    <FaTools className="h-4 w-4 mr-2 text-indigo-600 dark:text-hacker-accent" />
                    <span className="dark:font-mono text-sm">Docker/K8s</span>
                  </li>
                  <li className="flex items-center">
                    <FaNetworkWired className="h-4 w-4 mr-2 text-indigo-600 dark:text-hacker-accent" />
                    <span className="dark:font-mono text-sm">REST/GraphQL</span>
                  </li>
                  <li className="flex items-center">
                    <FaRocket className="h-4 w-4 mr-2 text-indigo-600 dark:text-hacker-accent" />
                    <span className="dark:font-mono text-sm">CI/CD</span>
                  </li>
                </ul>
              </div>
            </div>
            
            {/* Skill progress bars */}
            <div className="mt-4 px-2">
              <div className="mb-2">
                <div className="flex justify-between text-xs font-mono">
                  <span className="dark:text-hacker-primary/80">Frontend</span>
                  <span className="dark:text-hacker-accent">95%</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-black/50 rounded-full h-2">
                  <div className="bg-indigo-600 dark:bg-hacker-accent h-2 rounded-full" style={{ width: "95%" }}></div>
                </div>
              </div>
              <div className="mb-2">
                <div className="flex justify-between text-xs font-mono">
                  <span className="dark:text-hacker-primary/80">Backend</span>
                  <span className="dark:text-hacker-accent">85%</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-black/50 rounded-full h-2">
                  <div className="bg-indigo-600 dark:bg-hacker-accent h-2 rounded-full" style={{ width: "85%" }}></div>
                </div>
              </div>
              <div className="mb-2">
                <div className="flex justify-between text-xs font-mono">
                  <span className="dark:text-hacker-primary/80">DevOps</span>
                  <span className="dark:text-hacker-accent">80%</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-black/50 rounded-full h-2">
                  <div className="bg-indigo-600 dark:bg-hacker-accent h-2 rounded-full" style={{ width: "80%" }}></div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Status Box */}
          <motion.div
            variants={itemVariants}
            whileHover="hover"
            className="terminal-card p-4"
          >
            <div className="terminal-header">
              <span className="terminal-title">STATUS.SYS</span>
              <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></span>
            </div>
            <div className="p-2 text-sm font-mono">
              <div className="grid grid-cols-2 gap-2">
                <motion.div 
                  className="border border-gray-200 dark:border-hacker-primary/30 rounded p-2 dark:bg-black/20"
                  whileHover={{ scale: 1.03 }}
                >
                  <div className="text-gray-600 dark:text-hacker-secondary text-xs">Current Project:</div>
                  <div className="text-gray-900 dark:text-hacker-primary">Portfolio v2.0</div>
                </motion.div>
                <motion.div 
                  className="border border-gray-200 dark:border-hacker-primary/30 rounded p-2 dark:bg-black/20"
                  whileHover={{ scale: 1.03 }}
                >
                  <div className="text-gray-600 dark:text-hacker-secondary text-xs">Project Status:</div>
                  <div className="text-green-600 dark:text-green-400">Active</div>
                </motion.div>
                <motion.div 
                  className="border border-gray-200 dark:border-hacker-primary/30 rounded p-2 dark:bg-black/20"
                  whileHover={{ scale: 1.03 }}
                >
                  <div className="text-gray-600 dark:text-hacker-secondary text-xs">Last Update:</div>
                  <div className="text-gray-900 dark:text-hacker-primary">Today</div>
                </motion.div>
                <motion.div 
                  className="border border-gray-200 dark:border-hacker-primary/30 rounded p-2 dark:bg-black/20"
                  whileHover={{ scale: 1.03 }}
                >
                  <div className="text-gray-600 dark:text-hacker-secondary text-xs">Availability:</div>
                  <div className="text-indigo-600 dark:text-hacker-accent">Open to Work</div>
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* Certifications Box */}
          <motion.div
            variants={itemVariants}
            whileHover="hover"
            className="terminal-card p-4 hidden lg:block"
          >
            <div className="terminal-header">
              <span className="terminal-title">CERTIFICATIONS</span>
            </div>
            <div className="p-2">
              <ul className="space-y-2 text-sm">
                <li className="flex items-center">
                  <FaBrain className="h-4 w-4 mr-2 text-indigo-600 dark:text-hacker-accent" />
                  <span className="dark:font-mono dark:text-hacker-primary">AWS Solutions Architect</span>
                </li>
                <li className="flex items-center">
                  <FaBrain className="h-4 w-4 mr-2 text-indigo-600 dark:text-hacker-accent" />
                  <span className="dark:font-mono dark:text-hacker-primary">Microsoft Certified: Azure</span>
                </li>
                <li className="flex items-center">
                  <FaBrain className="h-4 w-4 mr-2 text-indigo-600 dark:text-hacker-accent" />
                  <span className="dark:font-mono dark:text-hacker-primary">React Advanced Concepts</span>
                </li>
              </ul>
            </div>
          </motion.div>
        </div>
        
        {/* Additional highlighted features - full width */}
        <motion.div 
          variants={itemVariants}
          className="col-span-1 lg:col-span-3 mt-6"
        >
          <h2 className="text-xl font-bold text-center mb-6 text-gray-800 dark:text-hacker-primary dark:font-mono">
            <span className="animate-cursor-blink">{">"}</span> Key Features & Specializations
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <motion.div 
              whileHover={{scale: 1.03, boxShadow: "0 10px 25px rgba(0, 255, 0, 0.1)"}}
              className="terminal-card p-4 transition-all"
            >
              <div className="flex flex-col items-center">
                <div className="h-12 w-12 rounded-full bg-indigo-100 dark:bg-black/50 flex items-center justify-center mb-4 border border-indigo-200 dark:border-hacker-primary/30">
                  <FaLaptopCode className="h-6 w-6 text-indigo-600 dark:text-hacker-accent" />
                </div>
                <h3 className="font-bold text-lg text-gray-900 dark:text-hacker-primary">Modern Web Apps</h3>
                <p className="text-center text-gray-600 dark:text-hacker-primary/70 text-sm mt-2">
                  Building robust and scalable web applications with cutting-edge technologies.
                </p>
              </div>
            </motion.div>
            <motion.div 
              whileHover={{scale: 1.03, boxShadow: "0 10px 25px rgba(0, 255, 0, 0.1)"}}
              className="terminal-card p-4 transition-all relative overflow-hidden"
            >
              <div className="absolute right-0 top-0 w-24 h-24 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 dark:from-hacker-accent/5 dark:to-hacker-primary/5 rounded-bl-full"></div>
              <div className="flex flex-col items-center">
                <div className="h-12 w-12 rounded-full bg-indigo-100 dark:bg-black/50 flex items-center justify-center mb-4 border border-indigo-200 dark:border-hacker-primary/30">
                  <FaRocket className="h-6 w-6 text-indigo-600 dark:text-hacker-accent" />
                </div>
                <h3 className="font-bold text-lg text-gray-900 dark:text-hacker-primary">Optimized Performance</h3>
                <p className="text-center text-gray-600 dark:text-hacker-primary/70 text-sm mt-2">
                  Creating lightning-fast experiences with optimized code and efficient algorithms.
                </p>
              </div>
            </motion.div>
            <motion.div 
              whileHover={{scale: 1.03, boxShadow: "0 10px 25px rgba(0, 255, 0, 0.1)"}}
              className="terminal-card p-4 transition-all"
            >
              <div className="flex flex-col items-center">
                <div className="h-12 w-12 rounded-full bg-indigo-100 dark:bg-black/50 flex items-center justify-center mb-4 border border-indigo-200 dark:border-hacker-primary/30">
                  <FaMobileAlt className="h-6 w-6 text-indigo-600 dark:text-hacker-accent" />
                </div>
                <h3 className="font-bold text-lg text-gray-900 dark:text-hacker-primary">Responsive Design</h3>
                <p className="text-center text-gray-600 dark:text-hacker-primary/70 text-sm mt-2">
                  Crafting beautiful interfaces that work flawlessly on all devices.
                </p>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
      
      {/* Terminal decoration */}
      <div className="hidden lg:block absolute bottom-5 right-5 max-w-[200px] text-xs font-mono text-indigo-500 dark:text-hacker-primary/40 opacity-70">
        <p>&gt; Running system diagnostics</p>
        <p>&gt; All systems functional</p>
        <p>&gt; Performance levels: optimal</p>
        <p className="animate-cursor-blink">&gt; _</p>
      </div>
    </motion.section>
  );
};

export default Home;