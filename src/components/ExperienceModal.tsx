import React from 'react';
import { X, ExternalLink } from 'lucide-react';

interface Experience {
  title: string;
  company: string;
  companyUrl: string;
  period: string;
  description: string;
  responsibilities: string[];
  technologies: string[];
}

interface ExperienceModalProps {
  experience: Experience;
  onClose: () => void;
  isDark: boolean;
  t: {
    experienceDetails: {
      responsibilities: string;
      technologies: string;
      company: string;
      period: string;
    };
  };
}

export function ExperienceModal({ experience, onClose, isDark, t }: ExperienceModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50 modal-backdrop" onClick={onClose} />
      <div className={`relative w-full max-w-2xl ${isDark ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-xl p-6 transform transition-all`}>
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <X size={24} />
        </button>
        
        <h3 className="text-2xl font-bold text-blue-400 mb-2">{experience.title}</h3>
        <div className="flex items-center gap-2 mb-4">
          <a
            href={experience.companyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`${
              isDark ? 'text-gray-300' : 'text-gray-600'
            } hover:text-blue-400 transition-colors inline-flex items-center gap-1 animated-underline`}
          >
            {experience.company}
            <ExternalLink size={14} />
          </a>
          <span className={isDark ? 'text-gray-300' : 'text-gray-600'}>
            | {experience.period}
          </span>
        </div>
        
        <p className={`${isDark ? 'text-gray-400' : 'text-gray-500'} mb-6`}>
          {experience.description}
        </p>
        
        <div className="mb-6">
          <h4 className={`font-semibold mb-2 ${isDark ? 'text-gray-200' : 'text-gray-700'}`}>
            {t.experienceDetails.responsibilities}:
          </h4>
          <ul className={`list-disc pl-5 ${isDark ? 'text-gray-300' : 'text-gray-600'} space-y-1`}>
            {experience.responsibilities.map((resp, index) => (
              <li key={index}>{resp}</li>
            ))}
          </ul>
        </div>
        
        <div>
          <h4 className={`font-semibold mb-2 ${isDark ? 'text-gray-200' : 'text-gray-700'}`}>
            {t.experienceDetails.technologies}:
          </h4>
          <div className="flex flex-wrap gap-2">
            {experience.technologies.map((tech, index) => (
              <span
                key={index}
                className={`px-3 py-1 rounded-full text-sm ${
                  isDark
                    ? 'bg-gray-700 text-gray-300'
                    : 'bg-gray-100 text-gray-700'
                } transition-all duration-300 hover:transform hover:scale-105`}
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}