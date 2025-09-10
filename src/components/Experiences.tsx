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
    <section id="experience" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center space-x-4 mb-12">
          <Briefcase className="text-blue-400" size={32} />
          <h2 className="text-4xl font-bold">{t.experience}</h2>
        </div>
        <div className="grid md:grid-cols-2 gap-8">
          {displayedExperiences.map((exp, index) => (
            <div
              key={index}
              className={`${
                isDark ? 'bg-gray-800/50' : 'bg-white shadow-lg'
              } p-6 rounded-lg hover:transform hover:scale-105 transition-all cursor-pointer`}
              onClick={() => setSelectedExperience(exp)}
            >
              <h3 className="text-xl font-bold text-blue-400">{exp.title}</h3>
              <div className="flex items-center gap-2 mb-2">
                <a
                  href={exp.companyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${
                    isDark ? 'text-gray-300' : 'text-gray-600'
                  } hover:text-blue-400 transition-colors inline-flex items-center gap-1 animated-underline`}
                  onClick={(e) => e.stopPropagation()}
                >
                  {exp.company}
                  <ExternalLink size={14} />
                </a>
                <span className={isDark ? 'text-gray-300' : 'text-gray-600'}>
                  | {exp.period}
                </span>
              </div>
              <p
                className={`${
                  isDark ? 'text-gray-400' : 'text-gray-500'
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
                        ? 'bg-gray-700 text-gray-300'
                        : 'bg-gray-100 text-gray-700'
                    }`}
                  >
                    {tech}
                  </span>
                ))}
                {exp.technologies.length > 3 && (
                  <span
                    className={`px-2 py-1 text-sm rounded-full ${
                      isDark
                        ? 'bg-gray-700 text-gray-300'
                        : 'bg-gray-100 text-gray-700'
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
                  ? 'bg-blue-500 hover:bg-blue-600'
                  : 'bg-blue-600 hover:bg-blue-700'
              } text-white font-semibold transition-all duration-300 hover:transform hover:scale-105`}
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