import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen flex items-center justify-center bg-gradient-to-b from-white to-gray-50 dark:from-black/10 dark:to-black/10 py-12 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-md w-full text-center terminal-card p-8">
        <div className="terminal-header mb-6">
          <span className="terminal-title">ERROR.404</span>
          <span className="text-gray-400 dark:text-hacker-primary/70">SYSTEM FAILURE</span>
        </div>
        
        <h1 className="text-9xl font-bold text-indigo-600 dark:text-hacker-primary dark:glow font-mono">404</h1>
        <h2 className="mt-6 text-3xl font-bold text-gray-900 dark:text-hacker-accent font-mono">
          <span className="dark:text-hacker-primary dark:font-mono">{">"}</span> Page_Not_Found
        </h2>
        <p className="mt-4 text-lg text-gray-600 dark:text-hacker-primary/80 font-mono">
          // ERROR: Unable to locate requested resource in database
        </p>
        <div className="mt-8 border-t border-gray-200 dark:border-hacker-primary/30 pt-6">
          <Link
            to="/"
            className="inline-flex items-center px-6 py-3 border border-transparent dark:border-hacker-primary text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 dark:bg-black/40 dark:text-hacker-primary dark:hover:bg-black/60 dark:hover:border-hacker-accent"
          >
            <span className="dark:font-mono">{">"} RETURN_TO_HOME</span>
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default NotFound;