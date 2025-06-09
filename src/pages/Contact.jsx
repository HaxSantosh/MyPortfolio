import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaLinkedin, FaEnvelope, FaPhone, FaMapMarkerAlt, FaGithub } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { selectDarkMode } from '../features/theme/themeSlice';
import { personalInfo } from '../data/personalInfo';

const Contact = () => {
  const darkMode = useSelector(selectDarkMode);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [commandLog, setCommandLog] = useState([]);

  // Terminal-like log effect
  useEffect(() => {
    const initialLogs = [
      { text: 'Initializing communication portal...', delay: 500 },
      { text: 'Secure connection established', delay: 1000 },
      { text: 'Input channels ready', delay: 1300 },
      { text: 'Awaiting user input...', delay: 1600 }
    ];
    
    let timer = 0;
    initialLogs.forEach(log => {
      timer += log.delay;
      setTimeout(() => {
        setCommandLog(prev => [...prev, log.text]);
      }, timer);
    });
    
    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Terminal-like submission messaging
    setCommandLog(prev => [...prev, `Processing form submission from ${formData.name}...`]);
    
    // Simulate form submission
    setTimeout(() => {
      setCommandLog(prev => [...prev, 'Message successfully transmitted!']);
      setSubmitStatus('success');
      setIsSubmitting(false);
      setFormData({ name: '', email: '', message: '' });
      
      setTimeout(() => {
        setCommandLog(prev => [...prev, 'Awaiting new input...']);
      }, 1000);
    }, 1500);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Default values if personalInfo lacks data
  const contactInfo = {
    phone: personalInfo.contact?.phone || "+1 (555) 123-4567",
    email: personalInfo.contact?.email || "contact@example.com",
    location: personalInfo.location || "San Francisco, CA",
    linkedin: personalInfo.contact?.linkedin || "https://linkedin.com/in/username",
    github: personalInfo.contact?.github || "https://github.com/username"
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-gray-50 dark:from-black/10 dark:to-black/10"
    >
      <div className="max-w-7xl mx-auto terminal-card">
        <div className="terminal-header">
          <span className="terminal-title">COMMUNICATION.PORTAL</span>
          <span className="text-gray-400 dark:text-hacker-primary/70">STATUS: ONLINE</span>
        </div>
        
        <div className="text-center p-6">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-hacker-primary">
            Get in Touch
          </h2>
          <p className="mt-4 text-lg text-gray-600 dark:text-hacker-primary/90">
            <span className="dark:text-hacker-secondary dark:font-mono dark:mr-2">{">"}</span>
            I'd love to hear from you! Let's discuss how we can work together.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 p-6">
          {/* Contact Information */}
          <div className="space-y-8">
            <div className="p-6 rounded-lg bg-white dark:bg-black/60 shadow-lg dark:border dark:border-hacker-primary/50">
              <div className="terminal-header">
                <span className="terminal-title">CONTACT.INFO</span>
                <span className="text-gray-400 dark:text-hacker-primary/70">SECURE CHANNEL</span>
              </div>
              
              <div className="space-y-4 mt-4">
                <div className="flex items-center">
                  <FaPhone className="w-6 h-6 text-gray-600 dark:text-hacker-primary" />
                  <a
                    href={`tel:${contactInfo.phone}`}
                    className="ml-3 text-gray-600 hover:text-gray-800 dark:text-hacker-primary/80 dark:hover:text-hacker-accent font-mono"
                    aria-label="Phone number"
                  >
                    {contactInfo.phone}
                  </a>
                </div>
                <div className="flex items-center">
                  <FaEnvelope className="w-6 h-6 text-gray-600 dark:text-hacker-primary" />
                  <a
                    href={`mailto:${contactInfo.email}`}
                    className="ml-3 text-gray-600 hover:text-gray-800 dark:text-hacker-primary/80 dark:hover:text-hacker-accent font-mono"
                    aria-label="Email address"
                  >
                    {contactInfo.email}
                  </a>
                </div>
                <div className="flex items-center">
                  <FaMapMarkerAlt className="w-6 h-6 text-gray-600 dark:text-hacker-primary" />
                  <span className="ml-3 text-gray-600 dark:text-hacker-primary/80 font-mono">
                    {contactInfo.location}
                  </span>
                </div>
                <div className="flex items-center">
                  <FaLinkedin className="w-6 h-6 text-gray-600 dark:text-hacker-primary" />
                  <a
                    href={contactInfo.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ml-3 text-gray-600 hover:text-gray-800 dark:text-hacker-primary/80 dark:hover:text-hacker-accent font-mono"
                    aria-label="LinkedIn profile"
                  >
                    LinkedIn Profile
                  </a>
                </div>
                <div className="flex items-center">
                  <FaGithub className="w-6 h-6 text-gray-600 dark:text-hacker-primary" />
                  <a
                    href={contactInfo.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ml-3 text-gray-600 hover:text-gray-800 dark:text-hacker-primary/80 dark:hover:text-hacker-accent font-mono"
                    aria-label="GitHub profile"
                  >
                    GitHub Profile
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="p-6 rounded-lg bg-white dark:bg-black/60 shadow-lg dark:border dark:border-hacker-primary/50">
            <div className="terminal-header">
              <span className="terminal-title">MESSAGE.INPUT</span>
              <span className="text-gray-400 dark:text-hacker-primary/70">ENCRYPTION: ENABLED</span>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-6 mt-4">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 dark:text-hacker-primary/90"
                >
                  <span className="dark:font-mono">{">"} USER.NAME</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 rounded-md bg-transparent border-2 border-gray-300 dark:border-hacker-primary text-gray-900 dark:text-hacker-primary focus:ring-2 focus:ring-indigo-500 dark:focus:ring-hacker-accent focus:border-indigo-500 dark:focus:border-hacker-accent dark:bg-black/40 transition-all focus:animate-vibrate"
                  onFocus={(e) => {
                    e.target.classList.add('animate-vibrate');
                    setTimeout(() => e.target.classList.remove('animate-vibrate'), 300);
                  }}
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 dark:text-hacker-primary/90"
                >
                  <span className="dark:font-mono">{">"} USER.EMAIL</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 rounded-md bg-transparent border-2 border-gray-300 dark:border-hacker-primary text-gray-900 dark:text-hacker-primary focus:ring-2 focus:ring-indigo-500 dark:focus:ring-hacker-accent focus:border-indigo-500 dark:focus:border-hacker-accent dark:bg-black/40 transition-all focus:animate-vibrate"
                  onFocus={(e) => {
                    e.target.classList.add('animate-vibrate');
                    setTimeout(() => e.target.classList.remove('animate-vibrate'), 300);
                  }}
                />
              </div>
              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-700 dark:text-hacker-primary/90"
                >
                  <span className="dark:font-mono">{">"} MESSAGE.BODY</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  required
                  value={formData.message}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 rounded-md bg-transparent border-2 border-gray-300 dark:border-hacker-primary text-gray-900 dark:text-hacker-primary focus:ring-2 focus:ring-indigo-500 dark:focus:ring-hacker-accent focus:border-indigo-500 dark:focus:border-hacker-accent dark:bg-black/40 transition-all focus:animate-vibrate"
                  onFocus={(e) => {
                    e.target.classList.add('animate-vibrate');
                    setTimeout(() => e.target.classList.remove('animate-vibrate'), 300);
                  }}
                />
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex justify-center py-2 px-4 border border-transparent dark:border-hacker-primary rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 dark:bg-black/40 dark:text-hacker-primary dark:hover:bg-black dark:hover:border-hacker-accent focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-hacker-primary transform transition-all hover:scale-105 animate-vibrate-hover"
                aria-label={isSubmitting ? 'Submitting form...' : 'Submit form'}
                onMouseEnter={(e) => {
                  if (!isSubmitting) {
                    e.currentTarget.classList.add('animate-vibrate');
                    setTimeout(() => e.currentTarget.classList.remove('animate-vibrate'), 300);
                  }
                }}
              >
                {isSubmitting ? (
                  <span className="font-mono dark:text-hacker-primary animate-glow-pulse flex items-center">
                    <span className="animate-ping-signal mr-2">◉</span> TRANSMITTING...
                  </span>
                ) : (
                  <span className="font-mono dark:text-hacker-primary flex items-center">
                    <span className="animate-cursor-blink mr-2">{">"}</span> TRANSMIT MESSAGE
                    <span className="ml-2 animate-glow-pulse">_</span>
                  </span>
                )}
              </button>
              {submitStatus === 'success' && (
                <p className="mt-2 text-sm text-green-600 dark:text-hacker-accent font-mono">
                  <span className="dark:text-hacker-secondary mr-2">{">"}</span>
                  Message transmitted successfully!
                </p>
              )}
            </form>

            {/* Command Log */}
            <div className="mt-8 p-4 rounded-lg bg-black/10 dark:bg-black/30 border border-gray-200 dark:border-hacker-primary/50 terminal-card">
              <div className="terminal-header mb-2">
                <span className="terminal-title">SYSTEM.LOG</span>
                <span className="text-gray-400 dark:text-hacker-primary/70">REAL-TIME</span>
              </div>
              <div className="mt-2 text-sm text-gray-600 dark:text-hacker-primary/80 max-h-40 overflow-y-auto custom-scrollbar">
                {commandLog.map((log, index) => (
                  <motion.div 
                    key={index} 
                    className="flex items-center mb-1"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <span className="text-hacker-secondary dark:text-hacker-secondary mr-2 animate-cursor-blink">{">"}</span>
                    <span className="font-mono">{log}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Contact;
