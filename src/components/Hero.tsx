import React, { useEffect, useRef } from 'react';
import {
  Github,
  Linkedin,
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
      const particleCount = 36;

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
      <div
        className={`absolute inset-0 animated-bg ${
          isDark ? 'animated-bg--dark' : 'animated-bg--light'
        }`}
      ></div>
      <div
        ref={particlesRef}
        className={`particles ${isDark ? '' : 'particles-light'}`}
      ></div>
      <div
        className={`transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          } relative z-10`}
      >
        <div className="floating">
          <h1
            className={`text-6xl md:text-8xl font-display font-semibold mb-4 bg-gradient-to-r text-transparent bg-clip-text text-center ${
              isDark
                ? 'from-primary-200 via-primary-400 to-primary-600'
                : 'from-primary-600 via-primary-500 to-primary-700'
            }`}
          >
            Lucas Ariel Beronne
          </h1>
          <p className={`text-xl md:text-2xl text-center mb-8 ${
            isDark ? 'text-neutral-300' : 'text-neutral-600'
          }`}
          >
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
                  ? 'text-neutral-300 hover:text-primary-300'
                  : 'text-neutral-600 hover:text-primary-500'
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
                  ? 'text-neutral-300 hover:text-primary-300'
                  : 'text-neutral-600 hover:text-primary-500'
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
                  ? 'text-neutral-300 hover:text-primary-300'
                  : 'text-neutral-600 hover:text-primary-500'
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
                  ? 'text-neutral-300 hover:text-primary-300'
                  : 'text-neutral-600 hover:text-primary-500'
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
          className={isDark ? 'text-neutral-400' : 'text-neutral-500'}
        />
      </a>
    </section>
  );
};

export default Hero;