import React, { useState } from 'react';
import { Briefcase, ExternalLink, ChevronDown, ChevronUp } from 'lucide-react';

type Experience = {
  title: string;
  company: string;
  companyUrl: string;
  period: string;
  description: string;
  responsibilities: string[];
  technologies: string[];
};

type TranslationExperienceData = {
  title: string;
  company: string;
  period: string;
  description: string;
  responsibilities: string[];
};

type ExperiencesProps = {
  isDark: boolean;
  t: {
    experience: string;
    experienceDetails: {
      company: string;
      period: string;
    };
    experiencesData?: TranslationExperienceData[];
    showMore?: string;
    showLess?: string;
  };
  setSelectedExperience: (experience: Experience) => void;
};

export const Experiences: React.FC<ExperiencesProps> = ({
  isDark,
  t,
  setSelectedExperience,
}) => {
  const [showAll, setShowAll] = useState(false);
  
  const experiences: Experience[] = [
    {
      title: 'SR Developer',
      company: 'Banco Galicia',
      companyUrl: 'https://www.galicia.ar/personas/',
      period: t.experiencesData?.[0]?.period!,
      description: t.experiencesData?.[0]?.description!,
      responsibilities: t.experiencesData?.[0]?.responsibilities!,
      technologies: ['.NET', 'SQL Server', 'REST APIs', 'React', 'Jenkins', 'NestJS'],
    },
    {
      title: 'SSr Fullstack Developer',
      company: 'PlanexWare S.A.',
      companyUrl: 'https://www.planexware.com/',
      period: t.experiencesData?.[1]?.period!,
      description: t.experiencesData?.[1]?.description!,
      responsibilities: t.experiencesData?.[1]?.responsibilities!,
      technologies: ['.NET', 'REST APIs', 'SQL Server', 'Angular'],
    },
    {
      title: 'Jr Fullstack Developer',
      company: 'PlanexWare S.A.',
      companyUrl: 'https://www.planexware.com/',
      period: t.experiencesData?.[2]?.period!,
      description: t.experiencesData?.[2]?.description!,
      responsibilities: t.experiencesData?.[2]?.responsibilities!,
      technologies: ['.NET', 'Angular', 'SQL Server', 'APIs REST'],
    },
    {
      title: 'QA Tester',
      company: 'PlanexWare S.A.',
      companyUrl: 'https://www.planexware.com/',
      period: t.experiencesData?.[3]?.period!,
      description: t.experiencesData?.[3]?.description!,
      responsibilities: t.experiencesData?.[3]?.responsibilities!,
      technologies: ['Azure DevOps', 'Testing', 'Planificación de pruebas'],
    },
  ];

  const displayedExperiences = showAll ? experiences : experiences.slice(0, 4);

  return (
    <section id="experience" className="py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center space-x-4 mb-12">
          <Briefcase className="text-primary-300" size={32} />
          <h2 className="text-4xl font-bold">{t.experience}</h2>
        </div>
        <div className="grid md:grid-cols-2 gap-8">
          {displayedExperiences.map((exp, index) => (
            <div
              key={index}
              className={`${
                isDark
                  ? 'bg-surface-dark border border-white/5'
                  : 'bg-surface-light border border-neutral-200 shadow-lg'
              } p-6 rounded-2xl transition-all cursor-pointer hover:-translate-y-1 hover:shadow-2xl`}
              onClick={() => setSelectedExperience(exp)}
            >
              <h3 className="text-xl font-bold text-primary-300">{exp.title}</h3>
              <div className="flex items-center gap-2 mb-2">
                <a
                  href={exp.companyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${
                    isDark ? 'text-neutral-300' : 'text-neutral-600'
                  } hover:text-primary-300 transition-colors inline-flex items-center gap-1 animated-underline`}
                  onClick={(e) => e.stopPropagation()}
                >
                  {exp.company}
                  <ExternalLink size={14} />
                </a>
                <span className={isDark ? 'text-neutral-300' : 'text-neutral-600'}>
                  | {exp.period}
                </span>
              </div>
              <p
                className={`${
                  isDark ? 'text-neutral-400' : 'text-neutral-500'
                } mb-4`}
              >
                {exp.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {exp.technologies.slice(0, 3).map((tech, techIndex) => (
                  <span
                    key={techIndex}
                    className={`px-2 py-1 text-sm rounded-full ${
                      isDark
                        ? 'bg-neutral-800/60 text-neutral-200'
                        : 'bg-neutral-100 text-neutral-700'
                    }`}
                  >
                    {tech}
                  </span>
                ))}
                {exp.technologies.length > 3 && (
                  <span
                    className={`px-2 py-1 text-sm rounded-full ${
                      isDark
                        ? 'bg-neutral-800/60 text-neutral-200'
                        : 'bg-neutral-100 text-neutral-700'
                    }`}
                  >
                    +{exp.technologies.length - 3}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
        {experiences.length > 4 && (
          <div className="flex justify-center mt-8">
            <button
              onClick={() => setShowAll(!showAll)}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg ${
                isDark
                  ? 'bg-primary-500 hover:bg-primary-600'
                  : 'bg-primary-600 hover:bg-primary-700'
              } text-white font-semibold transition-all duration-300 hover:transform hover:scale-[1.02]`}
            >
              {showAll ? (
                <>
                  {t.showLess || 'Show Less'} <ChevronUp size={20} />
                </>
              ) : (
                <>
                  {t.showMore || 'Show More'} <ChevronDown size={20} />
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Experiences;