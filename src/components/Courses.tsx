import React, { useState } from 'react';
import {
  GraduationCap,
  ExternalLink,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';

interface Course {
  name: string;
  platform: string;
  platformUrl: string;
  date: string;
  certificateUrl: string;
  description: string;
}

const courses: Course[] = [
  {
    name: 'INGLES - INTERMEDIATE (B2)',
    platform: 'AACI – ASOSIACION DE CULTURA INGLESA',
    platformUrl: '',
    date: '(03/2021 – ACTUALIDAD)',
    certificateUrl: '',
    description: '',
  },
  {
    name: 'Azure: Introducción a la nube de Microsoft',
    platform: 'Linkedin Learning',
    platformUrl: 'https://www.linkedin.com/learning/',
    date: 'VIRTUAL(09/2024)',
    certificateUrl:
      'https://www.linkedin.com/posts/lucas-beronne_certificate-of-completion-activity-7239613452590153729-8PfJ',
    description: '',
  },
  {
    name: 'Azure: Microservicios avanzados para desarrollo .NET',
    platform: 'Linkedin Learning',
    platformUrl: 'https://www.linkedin.com/learning/',
    date: 'VIRTUAL(08/2024)',
    certificateUrl:
      'https://www.linkedin.com/posts/lucas-beronne_certificate-of-completion-activity-7228861628375531521-X7yE',
    description: '',
  },
  {
    name: 'Azure: Microservicios esencial',
    platform: 'Linkedin Learning',
    platformUrl: 'https://www.linkedin.com/learning/',
    date: 'VIRTUAL(06/2024)',
    certificateUrl:
      'https://www.linkedin.com/posts/lucas-beronne_microservicios-microsoftazure-activity-7203565102707412992-LBPq',
    description: '',
  },
  {
    name: 'Fundamentos de DevOps: Contenedores',
    platform: 'Linkedin Learning',
    platformUrl: 'https://www.linkedin.com/learning/',
    date: 'VIRTUAL(05/2024)',
    certificateUrl:
      'https://www.linkedin.com/posts/lucas-beronne_contenedorizaciaejn-activity-7187649312900726785-P-qu',
    description: '',
  },
  {
    name: 'DevOps esencial',
    platform: 'Linkedin Learning',
    platformUrl: 'https://www.linkedin.com/learning/',
    date: 'VIRTUAL(04/2024)',
    certificateUrl:
      'https://www.linkedin.com/posts/lucas-beronne_devops-activity-7185498013417562112-PoPa',
    description: '',
  },
  {
    name: 'Java avanzado 2',
    platform: 'Linkedin Learning',
    platformUrl: 'https://www.linkedin.com/learning/',
    date: 'VIRTUAL(04/2024)',
    certificateUrl:
      'https://www.linkedin.com/posts/lucas-beronne_certificate-of-completion-activity-7181769181283893248-DSsp',
    description: '',
  },
  {
    name: 'CiberSeguridad y Ethical Hacking',
    platform: 'I.T.B.A. - Instituto Tecnológico',
    platformUrl: '',
    date: 'VIRTUAL(07/2023 – 11/2023)',
    certificateUrl:
      'https://certtun.vottun.com/badgedetail?id=1cfdbcfc-a63e-46f1-a1c0-f978dd5fd15c',
    description: '',
  },
  {
    name: 'DevOps, integración y agilidad continua',
    platform: 'U.T.N. - Centro e-learning',
    platformUrl: '',
    date: 'VIRTUAL(07/2023 – 09/2023)',
    certificateUrl:
      'https://www.linkedin.com/posts/lucas-beronne_activity-7143240537830076417-AFr2',
    description: '',
  },
  {
    name: '111mil - Curso de JAVA con SQL',
    platform: 'U.T.N. (F.R.B.A)-GOB (Ministerio de educación)',
    platformUrl: '',
    date: '(03/2019 – 10/2020)',
    certificateUrl: '',
    description: '',
  },
];

interface CoursesProps {
  t: any;
  isDark: boolean;
}

export function Courses({ t, isDark }: CoursesProps) {
  const [showAll, setShowAll] = useState(false);
  const displayedCourses = showAll ? courses : courses.slice(0, 4);

  return (
    <section
      className={`py-20 px-4 ${isDark ? 'bg-gray-800/30' : 'bg-gray-50'}`}
    >
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center space-x-4 mb-12">
          <GraduationCap className="text-blue-400" size={32} />
          <h2 className="text-4xl font-bold">{t.courses}</h2>
        </div>
        <div>
          <div className="grid md:grid-cols-2 gap-8">
            {displayedCourses.map((course, index) => (
              <div
                key={index}
                className={`${
                  isDark ? 'bg-gray-800/50' : 'bg-white shadow-lg'
                } p-6 rounded-lg hover:transform hover:scale-105 transition-all flex flex-col min-h-[200px]`}
              >
                <div className="flex-grow">
                  <h3 className="text-xl font-bold text-blue-400 mb-2">
                    {course.name}
                  </h3>
                  <div className="flex items-center gap-2 mb-2">
                    {course.platformUrl ? (
                      <a
                        href={course.platformUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`${
                          isDark ? 'text-gray-300' : 'text-gray-600'
                        } hover:text-blue-400 transition-colors inline-flex items-center gap-1 animated-underline`}
                      >
                        {course.platform}
                        <ExternalLink size={14} />
                      </a>
                    ) : (
                      <span className={isDark ? 'text-gray-300' : 'text-gray-600'}>
                        {course.platform}
                      </span>
                    )}
                    <span
                      className={isDark ? 'text-gray-300' : 'text-gray-600'}
                    >
                      | {course.date}
                    </span>
                  </div>
                  {course.description && (
                    <p
                      className={`${
                        isDark ? 'text-gray-400' : 'text-gray-500'
                      } mb-4`}
                    >
                      {course.description}
                    </p>
                  )}
                </div>
                {course.certificateUrl && (
                  <div className="mt-auto pt-4">
                    <a
                      href={course.certificateUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`inline-flex items-center px-4 py-2 rounded-lg ${
                        isDark
                          ? 'bg-blue-500 hover:bg-blue-600'
                          : 'bg-blue-600 hover:bg-blue-700'
                      } text-white transition-all duration-300 hover:transform hover:scale-105`}
                    >
                      {t.courseDetails.certificate}{' '}
                      <ExternalLink size={16} className="ml-2" />
                    </a>
                  </div>
                )}
              </div>
            ))}
          </div>
          {courses.length > 4 && (
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
      </div>
    </section>
  );
}