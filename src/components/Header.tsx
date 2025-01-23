import React, { useState, useEffect } from 'react';
import { Sun, Moon, Languages } from 'lucide-react';

interface HeaderProps {
  isDark: boolean;
  setIsDark: (value: boolean) => void;
  lang: 'en' | 'es';
  setLang: (value: 'en' | 'es') => void;
}

export function Header({ isDark, setIsDark, lang, setLang }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-200 ${
        isScrolled
          ? isDark
            ? 'bg-gray-900/90'
            : 'bg-white/90'
          : 'bg-transparent'
      } backdrop-blur-sm`}
    >
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <h2 
          onClick={scrollToTop}
          className="text-lg sm:text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text cursor-pointer hover:opacity-80 transition-opacity"
        >
          Lucas Ariel Beronne
        </h2>
        <div className="flex items-center space-x-2 sm:space-x-4">
          <button
            onClick={() => setLang(lang === 'en' ? 'es' : 'en')}
            className={`p-1.5 rounded-lg flex items-center ${
              isDark
                ? 'bg-white/10 hover:bg-white/20'
                : 'bg-black/10 hover:bg-black/20'
            } transition-colors backdrop-blur-sm`}
          >
            <Languages size={16} />
            <span className="ml-1 text-xs sm:text-sm">{lang.toUpperCase()}</span>
          </button>
          <button
            onClick={() => setIsDark(!isDark)}
            className={`p-1.5 rounded-lg ${
              isDark
                ? 'bg-white/10 hover:bg-white/20'
                : 'bg-black/10 hover:bg-black/20'
            } transition-colors backdrop-blur-sm`}
          >
            {isDark ? <Sun size={16} /> : <Moon size={16} />}
          </button>
        </div>
      </div>
    </header>
  );
}