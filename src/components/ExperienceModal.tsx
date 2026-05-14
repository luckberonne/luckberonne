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
      <div className="absolute inset-0 bg-neutral-950/70 modal-backdrop" onClick={onClose} />
      <div
        className={`relative w-full max-w-2xl ${
          isDark
            ? 'bg-surface-dark-card border border-white/5'
            : 'bg-surface-light border border-neutral-200'
        } rounded-2xl shadow-xl p-6 transform transition-all`}
      >
        <button
          onClick={onClose}
          className={`absolute top-4 right-4 ${
            isDark
              ? 'text-neutral-400 hover:text-neutral-200'
              : 'text-neutral-500 hover:text-neutral-700'
          }`}
        >
          <X size={24} />
        </button>

        <h3 className="text-2xl font-bold text-primary-300 mb-2">{experience.title}</h3>
        <div className="flex items-center gap-2 mb-4">
          <a
            href={experience.companyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`${
              isDark ? 'text-neutral-300' : 'text-neutral-600'
            } hover:text-primary-300 transition-colors inline-flex items-center gap-1 animated-underline`}
          >
            {experience.company}
            <ExternalLink size={14} />
          </a>
          <span className={isDark ? 'text-neutral-300' : 'text-neutral-600'}>
            | {experience.period}
          </span>
        </div>

        <p className={`${isDark ? 'text-neutral-400' : 'text-neutral-500'} mb-6`}>
          {experience.description}
        </p>

        <div className="mb-6">
          <h4 className={`font-semibold mb-2 ${isDark ? 'text-neutral-200' : 'text-neutral-700'}`}>
            {t.experienceDetails.responsibilities}:
          </h4>
          <ul className={`list-disc pl-5 ${isDark ? 'text-neutral-300' : 'text-neutral-600'} space-y-1`}>
            {experience.responsibilities.map((resp, index) => (
              <li key={index}>{resp}</li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className={`font-semibold mb-2 ${isDark ? 'text-neutral-200' : 'text-neutral-700'}`}>
            {t.experienceDetails.technologies}:
          </h4>
          <div className="flex flex-wrap gap-2">
            {experience.technologies.map((tech, index) => (
              <span
                key={index}
                className={`px-3 py-1 rounded-full text-sm ${
                  isDark
                    ? 'bg-neutral-800/70 text-neutral-200'
                    : 'bg-neutral-100 text-neutral-700'
                } transition-all duration-300 hover:transform hover:scale-[1.02]`}
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
