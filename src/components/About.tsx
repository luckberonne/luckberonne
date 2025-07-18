import React from 'react';
import { User, Github } from 'lucide-react';
import perfil from '../assets/images/perfil.jpeg';
import githubLogo from '../assets/images/GithubLogo.jpeg';

interface AboutProps {
  t: any;
  isDark: boolean;
}

export function About({ t, isDark }: AboutProps) {
  return (
    <section className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center space-x-4 mb-12">
          <User className="text-blue-400" size={32} />
          <h2 className="text-4xl font-bold">{t.about}</h2>
        </div>
        <div className={`${isDark ? 'bg-gray-800/50' : 'bg-white shadow-lg'} p-8 rounded-lg`}>
          <div className="flex flex-col md:flex-row gap-8 items-start">
            <div className="relative group">
              <img
                src={perfil}
                alt="Profile"
                className="w-48 h-48 rounded-lg object-cover shadow-lg transition-transform duration-300 group-hover:scale-105"
              />
              <a
                href="https://github.com/luckberonne"
                target="_blank"
                rel="noopener noreferrer"
                className={`absolute bottom-4 right-4 p-1 rounded-full ${
                  isDark ? 'bg-gray-800/90' : 'bg-white/90'
                } shadow-lg backdrop-blur-sm transition-transform duration-300 hover:scale-110 overflow-hidden`}
              >
                <img src={githubLogo} alt="GitHub" className="w-6 h-6 object-cover rounded-full transition-transform duration-300 hover:scale-110" />
              </a>
            </div>
            <div className="flex-1">
              <p className={`${isDark ? 'text-gray-300' : 'text-gray-600'} text-lg leading-relaxed mb-4`}>
                {t.aboutText}
              </p>
              <a
                href="https://github.com/luckberonne"
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center px-4 py-2 rounded-lg ${
                  isDark
                    ? 'bg-gray-700 hover:bg-gray-600'
                    : 'bg-gray-200 hover:bg-gray-300'
                } transition-all duration-300 hover:transform hover:scale-105`}
              >
                GitHub <Github size={16} className="ml-2" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}