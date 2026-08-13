import React from 'react';
import { Cpu } from 'lucide-react';
import { SKILL_CATEGORIES } from '../data/skills';

interface SkillsProps {
  t: any;
  isDark: boolean;
}

export function Skills({ t, isDark }: SkillsProps) {
  return (
    <section id="skills" className="py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center space-x-4 mb-12">
          <Cpu className="text-primary-300" size={32} />
          <h2 className="text-4xl font-bold">{t.skills.title}</h2>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          {Object.entries(SKILL_CATEGORIES).map(([category, skills]) => (
            <div 
              key={category} 
              className={`skill-card ${
                isDark
                  ? 'bg-surface-dark border border-white/5'
                  : 'bg-surface-light border border-neutral-200 shadow-lg'
              } p-4 sm:p-6 rounded-2xl hover:shadow-xl transition-all`}
            >
              <h3 className="text-lg sm:text-xl font-bold text-primary-300 mb-4">{t.skills[category]}</h3>
              <div className="grid grid-cols-2 gap-2 sm:gap-3">
                {skills.map((skill, index) => (
                  <a
                    key={index}
                    href={skill.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${
                      isDark
                        ? 'bg-neutral-800/60 hover:bg-primary-500/10'
                        : 'bg-neutral-100 hover:bg-primary-50'
                    } p-2 sm:p-3 rounded-lg transition-all hover:transform hover:scale-[1.02] cursor-pointer`}
                  >
                    <p className="font-semibold text-xs sm:text-sm text-center break-words">{skill.name}</p>
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}