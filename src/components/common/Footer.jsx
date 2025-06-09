import React from 'react';
import { personalInfo } from '../../data/personalInfo';
import { FaLinkedin, FaGithub, FaEnvelope } from 'react-icons/fa';

const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-gray-900 dark:bg-black/60 dark:border-t dark:border-hacker-primary/30 text-white mt-20">
      <div className="w-[80%] mx-auto py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Contact Information */}
          <div>
            <h3 className="text-lg font-semibold mb-4 dark:text-hacker-primary dark:font-mono">
              <span className="dark:text-hacker-secondary dark:mr-1">{">"}</span> CONTACT
            </h3>
            <div className="space-y-2">
              <a 
                href={`mailto:${personalInfo.contact.email}`}
                className="flex items-center text-gray-300 hover:text-white dark:text-hacker-primary/80 dark:hover:text-hacker-accent transition-colors"
              >
                <FaEnvelope className="mr-2" />
                <span className="dark:font-mono">{personalInfo.contact.email}</span>
              </a>
              <p className="flex items-center text-gray-300 dark:text-hacker-primary/80">
                <svg className="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span className="dark:font-mono">{personalInfo.contact.location}</span>
              </p>
            </div>
          </div>          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 dark:text-hacker-primary dark:font-mono">
              <span className="dark:text-hacker-secondary dark:mr-1">{">"}</span> NAVIGATION
            </h3>
            <div className="space-y-2">
              <a href="/" className="block text-gray-300 hover:text-white dark:text-hacker-primary/80 dark:hover:text-hacker-accent transition-colors dark:font-mono">cd /home</a>
              <a href="/about" className="block text-gray-300 hover:text-white dark:text-hacker-primary/80 dark:hover:text-hacker-accent transition-colors dark:font-mono">cd /about</a>
              <a href="/projects" className="block text-gray-300 hover:text-white dark:text-hacker-primary/80 dark:hover:text-hacker-accent transition-colors dark:font-mono">cd /projects</a>
              <a href="/contact" className="block text-gray-300 hover:text-white dark:text-hacker-primary/80 dark:hover:text-hacker-accent transition-colors dark:font-mono">cd /contact</a>
            </div>
          </div>

          {/* Social Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 dark:text-hacker-primary dark:font-mono">
              <span className="dark:text-hacker-secondary dark:mr-1">{">"}</span> CONNECT
            </h3>
            <div className="flex space-x-4">
              <a
                href={`https://${personalInfo.contact.linkedin}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-white transition-colors"
              >
                <FaLinkedin className="h-6 w-6" />
              </a>
              <a
                href="https://github.com/HaxSantosh"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-white transition-colors"
              >
                <FaGithub className="h-6 w-6" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-800 text-center">
          <p className="text-gray-400">
            © {year} {personalInfo.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;