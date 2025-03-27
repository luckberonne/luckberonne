import React, { useEffect, useRef } from 'react';
import {
  Github,
  Linkedin,
  Twitter,
  Mail,
  ChevronDown,
  Download,
} from 'lucide-react';

interface HeroProps {
  isDark: boolean;
  isVisible: boolean;
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
  t: {
    role: string;
    linkCV: string;
  };
}

const Hero: React.FC<HeroProps> = ({ isDark, isVisible, setIsVisible, t }) => {
  const particlesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsVisible(true);

    // Smooth scroll behavior
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener('click', (e: Event) => {
        e.preventDefault();
        const target = e.currentTarget as HTMLAnchorElement;
        const href = target.getAttribute('href');
        if (href) {
          document.querySelector(href)?.scrollIntoView({
            behavior: 'smooth',
          });
        }
      });
    });

    // Create particles
    if (particlesRef.current) {
      const container = particlesRef.current;
      const particleCount = 50;

      for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        const size = Math.random() * 4 + 1;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.top = `${Math.random() * 100}%`;

        // Random animation
        const duration = Math.random() * 20 + 10;
        particle.style.animation = `float ${duration}s infinite`;

        container.appendChild(particle);
      }
    }
  }, [setIsVisible]);

  return (
    <section className="min-h-screen flex flex-col items-center justify-center relative px-4 pt-16 overflow-hidden">
      <div className="absolute inset-0 animated-bg"></div>
      <div ref={particlesRef} className="particles"></div>
      <div
        className={`transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          } relative z-10`}
      >
        <div className="floating">
          <h1 className="text-6xl md:text-8xl font-bold mb-4 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 text-transparent bg-clip-text text-center">
            Lucas Ariel Beronne
          </h1>
          <p className="text-xl md:text-2xl text-center mb-8 text-opacity-80">
            {t.role}
          </p>
        </div>
        <div className="flex space-x-6 justify-center mb-12">
          <div className="social-icon-wrapper">
            <a
              href="https://github.com/luckberonne"
              target="_blank"
              rel="noopener noreferrer"
              className={`social-icon ${isDark
                  ? 'text-gray-300 hover:text-blue-400'
                  : 'text-gray-600 hover:text-blue-500'
                } transition-colors`}
            >
              <Github size={24} />
            </a>
          </div>
          <div className="social-icon-wrapper">
            <a
              href="https://www.linkedin.com/in/lucas-beronne/"
              target="_blank"
              rel="noopener noreferrer"
              className={`social-icon ${isDark
                  ? 'text-gray-300 hover:text-blue-400'
                  : 'text-gray-600 hover:text-blue-500'
                } transition-colors`}
            >
              <Linkedin size={24} />
            </a>
          </div>
          <div className="social-icon-wrapper">
            <a
              href= {t.linkCV}
              target="_blank"
              rel="noopener noreferrer"
              className={`social-icon ${isDark
                  ? 'text-gray-300 hover:text-blue-400'
                  : 'text-gray-600 hover:text-blue-500'
                } transition-colors`}
            >
              <Download size={24} />
            </a>
          </div>
          <div className="social-icon-wrapper">
            <a
              href="mailto: lucasberonne@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
              className={`social-icon ${isDark
                  ? 'text-gray-300 hover:text-blue-400'
                  : 'text-gray-600 hover:text-blue-500'
                } transition-colors`}
            >
              <Mail size={24} />
            </a>
          </div>
        </div>
      </div>
      <a href="#experience" className="absolute bottom-10 animate-bounce z-10">
        <ChevronDown
          size={32}
          className={isDark ? 'text-gray-300' : 'text-gray-600'}
        />
      </a>
    </section>
  );
};

export default Hero;