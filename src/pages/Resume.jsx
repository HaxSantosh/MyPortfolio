import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaDownload, FaCode, FaTerminal } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { selectDarkMode } from '../features/theme/themeSlice';
import resumePDF from '../assets/resume.pdf';

const Resume = () => {
  const darkMode = useSelector(selectDarkMode);
  const [showNativeViewer, setShowNativeViewer] = useState(false);
  const [resumeText, setResumeText] = useState([
    "NAME: John Doe",
    "POSITION: Senior Software Developer",
    "LOCATION: San Francisco, CA",
    "",
    "SKILLS:",
    "> JavaScript, TypeScript, React, Node.js",
    "> Python, Django, Flask",
    "> GraphQL, RESTful APIs",
    "> Docker, AWS, CI/CD",
    "",
    "EXPERIENCE:",
    "",
    "[2022-PRESENT] Senior Developer, TechCorp",
    "* Led development of enterprise applications",
    "* Implemented microservice architecture",
    "* Mentored junior developers",
    "",
    "[2019-2022] Software Engineer, StartupX",
    "* Built user-facing features",
    "* Optimized database queries",
    "* Reduced page load time by 40%",
    "",
    "EDUCATION:",
    "* B.S. Computer Science, Tech University",
    "",
    "CONTACT: john.doe@example.com"
  ]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-gray-50 dark:from-black/10 dark:to-black/10"
    >
      <div className="max-w-7xl mx-auto terminal-card">
        <div className="terminal-header">
          <span className="terminal-title">RESUME.DATA</span>
          <span className="text-gray-400 dark:text-hacker-primary/70">FORMAT: PDF</span>
        </div>
        
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-hacker-primary mt-4">
            My Resume
          </h2>
          <p className="mt-4 text-lg text-gray-600 dark:text-hacker-primary/90">
            <span className="dark:text-hacker-secondary dark:font-mono dark:mr-2">{">"}</span>
            View or download my complete resume
          </p>
          <div className="flex flex-wrap justify-center gap-4 mt-6">
            <a
              href={resumePDF}
              download="resume.pdf"
              className="inline-flex items-center px-6 py-3 border border-transparent dark:border-hacker-primary text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 dark:bg-black/40 dark:text-hacker-primary dark:hover:bg-black/60 dark:hover:border-hacker-accent focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-hacker-primary"
              aria-label="Download resume as PDF"
            >
              <FaDownload className="mr-2" aria-hidden="true" />
              <span className="dark:font-mono">{">"} DOWNLOAD_RESUME.PDF</span>
            </a>
            <button
              onClick={() => setShowNativeViewer(!showNativeViewer)}
              className="inline-flex items-center px-6 py-3 border border-gray-300 dark:border-hacker-primary/50 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 dark:bg-black/40 dark:text-hacker-primary/90 dark:hover:bg-black/60 dark:hover:border-hacker-primary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-hacker-primary"
              aria-label="Toggle resume view mode"
            >
              {showNativeViewer ? (
                <>
                  <FaTerminal className="mr-2" aria-hidden="true" />
                  <span className="dark:font-mono">{">"} TERMINAL_VIEW</span>
                </>
              ) : (
                <>
                  <FaCode className="mr-2" aria-hidden="true" />
                  <span className="dark:font-mono">{">"} NATIVE_PDF_VIEW</span>
                </>
              )}
            </button>
          </div>
        </div>
        
        {showNativeViewer ? (
          <div className="rounded-lg shadow-lg overflow-hidden bg-white dark:bg-black/60 dark:border dark:border-hacker-primary/50">
            <div className="p-4 bg-gray-100 dark:bg-black/80 border-b dark:border-hacker-primary/40">
              <div className="flex justify-between items-center">
                <h3 className="text-sm font-mono text-gray-900 dark:text-hacker-primary">
                  <span className="dark:text-hacker-secondary dark:mr-2">{">"}</span>
                  PDF.VIEWER
                </h3>
              </div>
            </div>
            <iframe
              src={resumePDF}
              title="Resume Preview"
              className="w-full h-[800px] dark:border-t dark:border-hacker-primary/30"
              aria-label="Resume document preview"
            />
          </div>
        ) : (
          <div className="rounded-lg shadow-lg overflow-hidden bg-white dark:bg-black/60 dark:border dark:border-hacker-primary/50">
            <div className="p-4 bg-gray-100 dark:bg-black/80 border-b dark:border-hacker-primary/40">
              <div className="flex justify-between items-center">
                <h3 className="text-sm font-mono text-gray-900 dark:text-hacker-primary">
                  <span className="dark:text-hacker-secondary dark:mr-2">{">"}</span>
                  RESUME.TXT
                </h3>
                <div className="flex space-x-2">
                  <span className="inline-block w-3 h-3 rounded-full bg-red-500"></span>
                  <span className="inline-block w-3 h-3 rounded-full bg-yellow-500"></span>
                  <span className="inline-block w-3 h-3 rounded-full bg-green-500"></span>
                </div>
              </div>
            </div>
            <div className="p-6 font-mono text-sm bg-gray-50 dark:bg-black/90 text-gray-800 dark:text-hacker-primary/90 h-[800px] overflow-y-auto">
              {resumeText.map((line, index) => (
                <div key={index} className={`mb-1 ${line.startsWith(">") ? "pl-5 -ml-5" : ""}`}>
                  {line.startsWith("[") ? (
                    <span className="text-indigo-600 dark:text-hacker-accent">{line}</span>
                  ) : line.startsWith("*") ? (
                    <span><span className="text-gray-500 dark:text-hacker-secondary mr-1">{">"}</span>{line.substring(1)}</span>
                  ) : line.startsWith(">") ? (
                    <span><span className="text-gray-500 dark:text-hacker-secondary">{line.substring(0, 1)}</span>{line.substring(1)}</span>
                  ) : line === "" ? (
                    <br />
                  ) : line.includes(":") ? (
                    <span>
                      <span className="text-gray-500 dark:text-hacker-secondary">{line.split(":")[0]}:</span>
                      <span>{line.split(":").slice(1).join(":")}</span>
                    </span>
                  ) : (
                    line
                  )}
                </div>
              ))}
              <div className="h-4 w-2 inline-block bg-hacker-primary animate-cursor-blink"></div>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default Resume;