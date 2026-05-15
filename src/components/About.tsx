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
    <section id="about" className="py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center space-x-4 mb-12">
          <User className="text-primary-300" size={32} />
          <h2 className="text-4xl font-bold">{t.about}</h2>
        </div>
        <div
          className={`${
            isDark
              ? 'bg-surface-dark border border-white/5'
              : 'bg-surface-light border border-neutral-200 shadow-lg'
          } p-8 rounded-2xl`}
        >
          <div className="flex flex-col md:flex-row gap-8 items-start">
            <div className="relative group">
              <img
                src={perfil}
                alt="Profile"
                className="w-48 h-48 rounded-2xl object-cover shadow-lg transition-transform duration-300 group-hover:scale-[1.02]"
              />
              <a
                href="https://github.com/luckberonne"
                target="_blank"
                rel="noopener noreferrer"
                className={`absolute bottom-4 right-4 p-1 rounded-full ${
                  isDark ? 'bg-neutral-900/90' : 'bg-white/90'
                } shadow-lg backdrop-blur-sm transition-transform duration-300 hover:scale-[1.04] overflow-hidden`}
              >
                <img src={githubLogo} alt="GitHub" className="w-6 h-6 object-cover rounded-full transition-transform duration-300 hover:scale-[1.04]" />
              </a>
            </div>
            <div className="flex-1">
              <p className={`${isDark ? 'text-neutral-300' : 'text-neutral-600'} text-lg leading-relaxed mb-4`}>
                {t.aboutText}
              </p>
              <a
                href="https://github.com/luckberonne"
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center px-4 py-2 rounded-lg ${
                  isDark
                    ? 'bg-neutral-800/70 hover:bg-neutral-700/80'
                    : 'bg-neutral-200 hover:bg-neutral-300'
                } transition-all duration-300 hover:transform hover:scale-[1.02]`}
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