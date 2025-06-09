import React from 'react';
import { motion } from 'framer-motion';
import { experience, skills, personalInfo } from '../data/personalInfo';
import { FaUser, FaCode, FaTools, FaBrain, FaCertificate } from 'react-icons/fa';

const About = () => {
  // Import TypewriterText component
  const TypewriterText = React.lazy(() => import('../components/common/TypewriterText'));
  const userId = React.useMemo(() => Math.floor(Math.random() * 10000), []);
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.3 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="w-full bg-gray-50 dark:bg-black/20 backdrop-blur-sm px-4 py-8"
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left column - Profile and Skills */}
        <div className="lg:col-span-1 space-y-8">
          {/* Profile Card */}
          <motion.div 
            variants={itemVariants} 
            className="terminal-card"
            whileHover={{ 
              boxShadow: "0 10px 30px rgba(0, 255, 0, 0.15)"
            }}
          >
            <div className="terminal-header">
              <span className="terminal-title animate-cursor-blink">
                <React.Suspense fallback={"USER.PROFILE"}>
                  <TypewriterText 
                    text="USER.PROFILE" 
                    speed={50} 
                    startDelay={300} 
                    glitch={true} 
                  />
                </React.Suspense>
              </span>
              <motion.span 
                className="text-gray-400 dark:text-hacker-primary/70 font-mono"
                whileHover={{ color: '#00ff00' }}
              >
                ID: {userId}
              </motion.span>
            </div>
            <div className="p-6">
              <motion.div 
                className="flex items-center space-x-4"
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <motion.div 
                  whileHover={{ rotate: [0, -10, 10, -5, 5, 0], scale: 1.1 }}
                  transition={{ duration: 0.5 }}
                >
                  <FaUser className="h-12 w-12 text-gray-500 dark:text-hacker-primary animate-glow-pulse" />
                </motion.div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-hacker-primary">
                    <span className="dark:text-hacker-secondary dark:mr-2 animate-cursor-blink">{">"}</span>
                    {personalInfo.name}
                  </h3>
                  <p className="text-gray-600 dark:text-hacker-primary/70 font-mono animate-glow-pulse">
                    {personalInfo.title}
                  </p>
                </div>
              </motion.div>
              
              <div className="mt-6 text-gray-600 dark:text-hacker-primary/90">
                <p className="border-l-2 border-gray-300 dark:border-hacker-primary/50 pl-4 italic font-mono text-sm">
                  <span className="dark:text-hacker-secondary mr-1">{">"}</span>
                  {personalInfo.bio || "Software engineer with a passion for building user-friendly applications and solving complex problems with elegant solutions."}
                </p>
              </div>

              <div className="mt-6 font-mono">
                <motion.div 
                  className="flex justify-between border-b border-gray-200 dark:border-hacker-primary/30 py-2"
                  whileHover={{ backgroundColor: "rgba(0, 255, 0, 0.05)" }}
                >
                  <span className="text-gray-500 dark:text-hacker-primary/70">Location:</span>
                  <span className="text-gray-800 dark:text-hacker-primary">{personalInfo.location || "San Francisco, CA"}</span>
                </motion.div>
                <motion.div 
                  className="flex justify-between border-b border-gray-200 dark:border-hacker-primary/30 py-2"
                  whileHover={{ backgroundColor: "rgba(0, 255, 0, 0.05)" }}
                >
                  <span className="text-gray-500 dark:text-hacker-primary/70">Experience:</span>
                  <span className="text-gray-800 dark:text-hacker-primary">{personalInfo.experience || "5+ years"}</span>
                </motion.div>
                <motion.div 
                  className="flex justify-between border-b border-gray-200 dark:border-hacker-primary/30 py-2"
                  whileHover={{ backgroundColor: "rgba(0, 255, 0, 0.05)" }}
                >
                  <span className="text-gray-500 dark:text-hacker-primary/70">Education:</span>
                  <span className="text-gray-800 dark:text-hacker-primary">{personalInfo.education || "B.S. Computer Science"}</span>
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* Skills Cards */}
          <motion.div 
            variants={itemVariants} 
            className="terminal-card"
            whileHover={{ 
              boxShadow: "0 10px 30px rgba(0, 255, 0, 0.15)"
            }}
          >
            <div className="terminal-header">
              <span className="terminal-title animate-cursor-blink">TECHNICAL.SKILLS</span>
              <span className="text-gray-400 dark:text-hacker-primary/70">COUNT: {skills.technical.length}</span>
            </div>
            <div className="p-6">
              <div className="flex items-center mb-4">
                <FaCode className="h-5 w-5 mr-2 text-gray-600 dark:text-hacker-primary animate-glow-pulse" />
                <h3 className="text-lg font-semibold text-gray-800 dark:text-hacker-primary">Technologies</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {skills.technical.map((skill, idx) => (
                  <motion.span
                    key={skill}
                    className="px-2 py-1 border border-gray-200 dark:border-hacker-primary/60 text-gray-700 dark:text-hacker-primary rounded text-xs"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: idx * 0.05 }}
                    whileHover={{ 
                      scale: 1.1,
                      borderColor: '#00ff00',
                      boxShadow: '0 0 5px rgba(0, 255, 0, 0.5)'
                    }}
                  >
                    <span className="dark:text-hacker-secondary dark:mr-1">#</span>
                    {skill}
                  </motion.span>
                ))}
              </div>
              
              <div className="flex items-center mt-6 mb-4">
                <FaTools className="h-5 w-5 mr-2 text-gray-600 dark:text-hacker-primary animate-glow-pulse" />
                <h3 className="text-lg font-semibold text-gray-800 dark:text-hacker-primary">Tools & Frameworks</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {skills.tools && skills.tools.map((tool, idx) => (
                  <motion.span
                    key={tool}
                    className="px-2 py-1 border border-gray-200 dark:border-hacker-primary/60 text-gray-700 dark:text-hacker-primary rounded text-xs"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: idx * 0.05 }}
                    whileHover={{ 
                      scale: 1.1,
                      borderColor: '#00ff00',
                      boxShadow: '0 0 5px rgba(0, 255, 0, 0.5)'
                    }}
                  >
                    <span className="dark:text-hacker-secondary dark:mr-1">#</span>
                    {tool}
                  </motion.span>
                ))}
                {!skills.tools && (
                  <>
                    <motion.span 
                      className="px-2 py-1 border border-gray-200 dark:border-hacker-primary/60 text-gray-700 dark:text-hacker-primary rounded text-xs"
                      whileHover={{ scale: 1.1 }}
                    >
                      <span className="dark:text-hacker-secondary dark:mr-1">#</span>
                      Git
                    </motion.span>
                    <motion.span 
                      className="px-2 py-1 border border-gray-200 dark:border-hacker-primary/60 text-gray-700 dark:text-hacker-primary rounded text-xs"
                      whileHover={{ scale: 1.1 }}
                    >
                      <span className="dark:text-hacker-secondary dark:mr-1">#</span>
                      Docker
                    </motion.span>
                    <motion.span 
                      className="px-2 py-1 border border-gray-200 dark:border-hacker-primary/60 text-gray-700 dark:text-hacker-primary rounded text-xs"
                      whileHover={{ scale: 1.1 }}
                    >
                      <span className="dark:text-hacker-secondary dark:mr-1">#</span>
                      VS Code
                    </motion.span>
                  </>
                )}
              </div>
            </div>
          </motion.div>

          {/* Soft Skills Card */}
          <motion.div 
            variants={itemVariants} 
            className="terminal-card"
            whileHover={{ 
              boxShadow: "0 10px 30px rgba(0, 255, 0, 0.15)"
            }}
          >
            <div className="terminal-header">
              <span className="terminal-title animate-cursor-blink">SOFT.SKILLS</span>
              <span className="text-gray-400 dark:text-hacker-primary/70">STATUS: ACTIVE</span>
            </div>
            <div className="p-6">
              <div className="flex items-center mb-4">
                <FaBrain className="h-5 w-5 mr-2 text-gray-600 dark:text-hacker-primary animate-glow-pulse" />
                <h3 className="text-lg font-semibold text-gray-800 dark:text-hacker-primary">Soft Skills</h3>
              </div>
              <ul className="space-y-2">
                {skills.soft && skills.soft.map((skill, index) => (
                  <motion.li 
                    key={index} 
                    className="flex items-start"
                    initial={{ x: -10, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ x: 5, color: '#00FF00' }}
                  >
                    <span className="mr-2 text-gray-500 dark:text-hacker-primary font-mono animate-cursor-blink">{">"}</span>
                    <span className="text-gray-700 dark:text-hacker-primary/90">{skill}</span>
                  </motion.li>
                ))}
                {!skills.soft && (
                  <>
                    <motion.li 
                      className="flex items-start"
                      whileHover={{ x: 5, color: '#00FF00' }}
                    >
                      <span className="mr-2 text-gray-500 dark:text-hacker-primary font-mono animate-cursor-blink">{">"}</span>
                      <span className="text-gray-700 dark:text-hacker-primary/90">Problem Solving</span>
                    </motion.li>
                    <motion.li 
                      className="flex items-start"
                      whileHover={{ x: 5, color: '#00FF00' }}
                    >
                      <span className="mr-2 text-gray-500 dark:text-hacker-primary font-mono animate-cursor-blink">{">"}</span>
                      <span className="text-gray-700 dark:text-hacker-primary/90">Communication</span>
                    </motion.li>
                    <motion.li 
                      className="flex items-start"
                      whileHover={{ x: 5, color: '#00FF00' }}
                    >
                      <span className="mr-2 text-gray-500 dark:text-hacker-primary font-mono animate-cursor-blink">{">"}</span>
                      <span className="text-gray-700 dark:text-hacker-primary/90">Team Collaboration</span>
                    </motion.li>
                    <motion.li 
                      className="flex items-start"
                      whileHover={{ x: 5, color: '#00FF00' }}
                    >
                      <span className="mr-2 text-gray-500 dark:text-hacker-primary font-mono animate-cursor-blink">{">"}</span>
                      <span className="text-gray-700 dark:text-hacker-primary/90">Time Management</span>
                    </motion.li>
                  </>
                )}
              </ul>
            </div>
          </motion.div>
        </div>
        
        {/* Right column - Professional Journey */}
        <motion.div 
          variants={itemVariants} 
          className="lg:col-span-2 terminal-card"
          whileHover={{ 
            boxShadow: "0 10px 30px rgba(0, 255, 0, 0.15)"
          }}
        >
          <div className="terminal-header">
            <span className="terminal-title animate-cursor-blink">PROFESSIONAL.JOURNEY</span>
            <span className="text-gray-400 dark:text-hacker-primary/70">ACCESS: GRANTED</span>
          </div>
          
          <div className="p-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-hacker-primary mb-8">
              <React.Suspense fallback="Career Timeline">
                <TypewriterText 
                  text="Career Timeline" 
                  speed={40} 
                  startDelay={300}
                />
              </React.Suspense>
            </h2>
            
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-200 dark:bg-hacker-primary/30 animate-glow-pulse" />
              
              {/* Experience items */}
              {experience.map((exp, index) => (
                <motion.div
                  key={exp.company}
                  variants={itemVariants}
                  className="relative mb-12 ml-10"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.3 }}
                  whileHover={{ scale: 1.01 }}
                >
                  {/* Timeline dot */}
                  <div className="absolute -left-10 top-1 w-4 h-4 rounded-full bg-indigo-500 dark:bg-hacker-primary animate-ping-signal" />
                  
                  {/* Experience card */}
                  <div className="bg-white dark:bg-black/60 rounded-lg shadow-lg p-6 relative 
                    dark:border dark:border-hacker-primary/50 dark:backdrop-blur-sm hover:shadow-xl transition-shadow">
                    <div className="dark:border-b dark:border-hacker-primary/30 dark:pb-2 dark:mb-3">
                      <h3 className="text-xl font-bold text-gray-900 dark:text-hacker-primary">
                        <span className="dark:text-hacker-secondary dark:mr-2 animate-cursor-blink">{">"}</span>
                        {exp.company}
                      </h3>
                      <h4 className="text-lg text-indigo-600 dark:text-hacker-accent">{exp.position}</h4>
                      <p className="text-sm text-gray-500 dark:text-hacker-primary/70 mt-1 dark:font-mono">{exp.duration}</p>
                    </div>
                    <p className="mt-2 text-gray-600 dark:text-hacker-primary/90">{exp.description}</p>
                    <ul className="mt-4 space-y-2">
                      {exp.responsibilities.map((resp, idx) => (
                        <motion.li 
                          key={idx} 
                          className="flex items-start"
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.2 + idx * 0.1 }}
                          whileHover={{ x: 5 }}
                        >
                          <span className="mr-2 text-indigo-500 dark:text-hacker-primary font-mono animate-cursor-blink">{">"}</span>
                          <span className="text-gray-600 dark:text-hacker-primary/80">{resp}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default About;
