import React, { useEffect } from 'react';
import {
  Mail,
  ChevronDown,
  Download,
} from 'lucide-react';
import { MedusaeBackdrop } from './MedusaeBackdrop';
import { LinkedInIcon } from './LinkedInIcon';
import { GithubIcon } from './GithubIcon';

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

  }, [setIsVisible]);

  return (
    <section className="min-h-screen flex flex-col items-center justify-center relative px-4 pt-16 overflow-hidden">
      <MedusaeBackdrop
        isDark={isDark}
        className="absolute inset-0 z-0"
      />
      <div
        className={`absolute inset-0 z-0 ${
          isDark
            ? 'bg-gradient-to-b from-neutral-950/60 via-neutral-950/20 to-neutral-950/10'
            : 'bg-gradient-to-b from-white/70 via-white/40 to-white/20'
        }`}
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
                <GithubIcon size={24} />
            </a>
          </div>
          <div className="social-icon-wrapper">
            <a
              href="https://www.linkedin.com/in/lucas-beronne/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className={`social-icon ${isDark
                  ? 'text-neutral-300 hover:text-primary-300'
                  : 'text-neutral-600 hover:text-primary-500'
                } transition-colors`}
            >
                <LinkedInIcon size={24} />
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