import React, { useState } from 'react';
import {
  GraduationCap,
  ExternalLink,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import { COURSES as courses } from '../data/courses';

interface CoursesProps {
  t: any;
  isDark: boolean;
}

export function Courses({ t, isDark }: CoursesProps) {
  const [showAll, setShowAll] = useState(false);
  const displayedCourses = showAll ? courses : courses.slice(0, 4);

  return (
    <section
      id="courses"
      className={`py-24 px-4 ${isDark ? 'bg-surface-dark-alt' : 'bg-surface-light-alt'}`}
    >
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center space-x-4 mb-12">
          <GraduationCap className="text-primary-300" size={32} />
          <h2 className="text-4xl font-bold">{t.courses}</h2>
        </div>
        <div>
          <div className="grid md:grid-cols-2 gap-8">
            {displayedCourses.map((course, index) => (
              <div
                key={index}
                className={`${
                  isDark
                    ? 'bg-surface-dark border border-white/5'
                    : 'bg-surface-light border border-neutral-200 shadow-lg'
                } p-6 rounded-2xl hover:shadow-xl transition-all flex flex-col min-h-[200px]`}
              >
                <div className="flex-grow">
                  <h3 className="text-xl font-bold text-primary-300 mb-2">
                    {course.name}
                  </h3>
                  <div className="flex items-center gap-2 mb-2">
                    {course.platformUrl ? (
                      <a
                        href={course.platformUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`${
                          isDark ? 'text-neutral-300' : 'text-neutral-600'
                        } hover:text-primary-300 transition-colors inline-flex items-center gap-1 animated-underline`}
                      >
                        {course.platform}
                        <ExternalLink size={14} />
                      </a>
                    ) : (
                      <span className={isDark ? 'text-neutral-300' : 'text-neutral-600'}>
                        {course.platform}
                      </span>
                    )}
                    <span
                      className={isDark ? 'text-neutral-300' : 'text-neutral-600'}
                    >
                      | {course.date}
                    </span>
                  </div>
                  {course.description && (
                    <p
                      className={`${
                        isDark ? 'text-neutral-400' : 'text-neutral-500'
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
                          ? 'bg-primary-500 hover:bg-primary-600'
                          : 'bg-primary-600 hover:bg-primary-700'
                      } text-white transition-all duration-300 hover:transform hover:scale-[1.02]`}
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
                    ? 'bg-primary-500 hover:bg-primary-600'
                    : 'bg-primary-600 hover:bg-primary-700'
                } text-white font-semibold transition-all duration-300 hover:transform hover:scale-[1.02]`}
              >
                {showAll ? (
                  <>
                    {t.showLess} <ChevronUp size={20} />
                  </>
                ) : (
                  <>
                    {t.showMore} <ChevronDown size={20} />
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