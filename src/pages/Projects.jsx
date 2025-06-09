import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import projectsData from '../data/projects.json';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import DefaultImage from '../components/common/DefaultImage';

// Set of dummy projects to add if needed
const dummyProjects = [
  {
    id: 'dummy1',
    title: 'Cybernetic Dashboard',
    description: 'A responsive dashboard for monitoring system performance with real-time analytics and interactive visualizations.',
    technologies: ['React', 'D3.js', 'Socket.io', 'Firebase'],
    image: null,
    github: 'https://github.com/example/cybernetic-dashboard',
    demo: 'https://cybernetic-dashboard.example.com'
  },
  {
    id: 'dummy2',
    title: 'Neural Network Visualizer',
    description: 'Interactive tool for building and visualizing neural networks. Users can experiment with different architectures and see results in real time.',
    technologies: ['TypeScript', 'TensorFlow.js', 'Three.js', 'Express'],
    image: null,
    github: 'https://github.com/example/neural-vis',
    demo: 'https://neural-vis.example.com'
  },
  {
    id: 'dummy3',
    title: 'Crypto Tracker Pro',
    description: 'Advanced cryptocurrency tracking application with portfolio management, price alerts, and detailed market analysis tools.',
    technologies: ['Vue.js', 'Node.js', 'Chart.js', 'MongoDB'],
    image: null,
    github: 'https://github.com/example/crypto-tracker',
    demo: 'https://crypto-tracker.example.com'
  },
  {
    id: 'dummy4',
    title: 'Smart Home Control Center',
    description: 'IoT control system for managing connected devices in smart homes, featuring voice commands and automated routines.',
    technologies: ['React Native', 'AWS IoT', 'GraphQL', 'WebSockets'],
    image: null, 
    github: 'https://github.com/example/smart-home',
    demo: null
  },
  {
    id: 'dummy5',
    title: 'Augmented Reality Navigation',
    description: 'Mobile app that provides AR navigation overlays for urban environments, highlighting points of interest and optimal routes.',
    technologies: ['Unity', 'ARKit', 'C#', 'MapBox API'],
    image: null,
    github: 'https://github.com/example/ar-navigation',
    demo: null
  }
];

const Projects = () => {
  const [failedImages, setFailedImages] = useState(new Set());
  
  // Add dummy projects if needed to fill grid (aim for at least 8 projects to fill 2 rows of 4)
  const allProjects = useMemo(() => {
    const originalProjects = projectsData.projects || [];
    if (originalProjects.length >= 8) return originalProjects;
    
    const numDummyToAdd = Math.min(8 - originalProjects.length, dummyProjects.length);
    return [
      ...originalProjects,
      ...dummyProjects.slice(0, numDummyToAdd)
    ];
  }, []);
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  const handleImageError = (projectId) => {
    setFailedImages(prev => new Set([...prev, projectId]));
  };
  // Import the TypewriterText component
  const TypewriterText = React.lazy(() => import('../components/common/TypewriterText'));

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="w-full bg-transparent"
    >
      <div className="w-full">
        <motion.div
          variants={itemVariants}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold text-gray-900 dark:text-hacker-primary">
            <React.Suspense fallback={<span>My Projects</span>}>
              <TypewriterText 
                text="PROJECT.DATABASE" 
                speed={40} 
                glitch={true}
                className="inline-block dark:border-b dark:border-hacker-primary/30 dark:pb-2" 
              />
            </React.Suspense>
          </h2>
          <p className="text-gray-600 dark:text-hacker-primary/70 mt-4 font-mono">
            {">"} Initiating project data visualization sequence...
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {allProjects.map((project) => (            <motion.div
              key={project.id}
              variants={itemVariants}
              className="terminal-card overflow-hidden transition-all duration-300 group"
              whileHover={{ 
                scale: 1.02,
                boxShadow: "0px 10px 30px rgba(0, 255, 0, 0.2)"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.classList.add('animate-vibrate');
                setTimeout(() => {
                  e.currentTarget.classList.remove('animate-vibrate');
                }, 300);
              }}
            >
              <div className="aspect-video relative overflow-hidden">
                {project.image && !failedImages.has(project.id) ? (
                  <motion.img
                    src={project.image}
                    alt={project.title}
                    className="object-cover w-full h-full transform group-hover:scale-110 transition-transform duration-700"
                    onError={() => handleImageError(project.id)}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                  />
                ) : (
                  <DefaultImage 
                    title={project.title} 
                    className="w-full h-full"
                  />
                )}
                
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>              <div className="p-4 relative">
                <div className="terminal-header">
                  <motion.span 
                    className="terminal-title animate-cursor-blink"
                    initial={{ opacity: 0.7 }}
                    whileHover={{ opacity: 1 }}
                  >
                    PROJECT #{project.id}
                  </motion.span>
                  <motion.span 
                    className="text-gray-400 dark:text-hacker-primary/70"
                    whileHover={{ 
                      color: '#00ff00', 
                      textShadow: '0 0 5px rgba(0, 255, 0, 0.7)' 
                    }}
                  >
                    SYS.OK
                  </motion.span>
                </div>
                <motion.h3 
                  className="text-xl font-bold text-gray-900 dark:text-hacker-primary mb-2 group-hover:text-indigo-600 dark:group-hover:text-hacker-accent transition-colors duration-300"
                  whileHover={{ scale: 1.01 }}
                >
                  <span className="dark:text-hacker-secondary dark:inline-block dark:mr-1 dark:group-hover:text-hacker-accent">{">"}</span>
                  {project.title}
                </motion.h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4 font-mono text-sm transition-all duration-300 group-hover:text-gray-900 dark:group-hover:text-hacker-primary/90">
                  {project.description}
                </p>                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech, index) => (
                    <motion.span
                      key={index}
                      className="px-2 py-0.5 text-xs border border-gray-300 dark:border-hacker-primary/70 
                                 text-gray-700 dark:text-hacker-primary rounded transition-all duration-300"
                      whileHover={{ 
                        scale: 1.1,
                        borderColor: '#00ff00',
                        boxShadow: '0 0 5px rgba(0, 255, 0, 0.5)'
                      }}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1, duration: 0.3 }}
                    >
                      <span className="dark:text-hacker-secondary dark:mr-1">#</span>
                      {tech}
                    </motion.span>
                  ))}
                </div>                <div className="flex space-x-4 pt-2 border-t border-gray-200 dark:border-hacker-primary/30 mt-4">
                  {project.github && (
                    <motion.a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-600 dark:text-hacker-primary hover:text-indigo-600 dark:hover:text-hacker-accent transition-colors flex items-center"
                      aria-label={`View ${project.title} source code on GitHub`}
                      whileHover={{ scale: 1.1, x: 2 }}
                      whileTap={{ scale: 0.95 }}
                      onHoverStart={() => {}}
                    >
                      <FaGithub className="w-5 h-5 mr-1 animate-glow-pulse" /> 
                      <span className="text-xs font-mono">
                        <span className="dark:text-hacker-secondary dark:mr-1 animate-cursor-blink">{">"}</span>
                        SOURCE
                      </span>
                    </motion.a>
                  )}
                  {project.demo && (
                    <motion.a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"                      
                      className="text-gray-600 dark:text-hacker-primary hover:text-indigo-600 dark:hover:text-hacker-accent transition-colors flex items-center"
                      aria-label={`View ${project.title} live demo`}
                      whileHover={{ scale: 1.1, x: 2 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <FaExternalLinkAlt className="w-4 h-4 mr-1 animate-glow-pulse" /> 
                      <span className="text-xs font-mono">
                        <span className="dark:text-hacker-secondary dark:mr-1 animate-cursor-blink">{">"}</span>
                        DEMO
                      </span>
                    </motion.a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default Projects;