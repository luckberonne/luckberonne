import { useState } from 'react';
import { Code2, ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react';
import { GithubIcon } from './GithubIcon';
import { LazyImage } from './LazyImage';
import { getProjects } from '../data/projects';
import { scrollToSection } from '../lib/sections';

interface ProjectsProps {
  t: any;
  isDark: boolean;
}

export function Projects({ t, isDark }: ProjectsProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const projectsPerPage = 6;

  const projects = getProjects(t);

  const totalPages = Math.ceil(projects.length / projectsPerPage);

  const indexOfLastProject = currentPage * projectsPerPage;
  const indexOfFirstProject = indexOfLastProject - projectsPerPage;
  const currentProjects = projects.slice(indexOfFirstProject, indexOfLastProject);

  const goToPage = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    scrollToSection('projects');
  };

  return (
    <section
      id="projects"
      className={`py-24 px-4 ${isDark ? 'bg-surface-dark-alt' : 'bg-surface-light-alt'}`}
    >
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center space-x-4 mb-12">
          <Code2 className="text-primary-300" size={32} />
          <h2 className="text-4xl font-bold">{t.projects}</h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {currentProjects.map((project, index) => (
            <div
              key={index}
              className={`project-card relative ${
                isDark
                  ? 'bg-surface-dark border border-white/5'
                  : 'bg-surface-light border border-neutral-200'
              } rounded-2xl shadow-lg overflow-hidden group flex flex-col h-full transition-all duration-300 hover:shadow-2xl`}
            >
              <div className="relative h-40 sm:h-48 overflow-hidden">
                <LazyImage
                  src={project.image}
                  webpSrc={project.imageWebp}
                  alt={project.title}
                  className="block w-full h-full"
                  imgClassName="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-[1.04]"
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                />
                {project.unmaintained && (
                  <div className="absolute top-6 -right-9 w-40 rotate-45 bg-red-600 text-white text-[9px] sm:text-[10px] font-bold uppercase tracking-wide text-center py-1 shadow-md z-10 select-none">
                    {t.unmaintained}
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent pointer-events-none">
                  <div className="absolute bottom-0 p-3 sm:p-4">
                    <h3 className="text-lg sm:text-xl font-bold text-white mb-2">
                      {project.title}
                    </h3>
                  </div>
                </div>
              </div>

              <div className="p-3 sm:p-4 flex-1 flex flex-col">
                <p
                  className={`${
                    isDark ? 'text-neutral-300' : 'text-neutral-600'
                  } mb-3 sm:mb-4 text-sm`}
                >
                  {project.description}
                </p>

                <div className="flex-1">
                  <div className="flex flex-wrap gap-1.5 sm:gap-2">
                    {project.technologies.map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className={`px-2 py-1 rounded-full text-xs ${
                          isDark
                            ? 'bg-neutral-700 text-neutral-300'
                            : 'bg-neutral-100 text-neutral-700'
                        } transition-all duration-300 hover:transform hover:scale-[1.02]`}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div
                  className={`flex flex-col sm:flex-row gap-2 sm:space-x-3 mt-3 sm:mt-4 pt-3 sm:pt-4 border-t ${
                    isDark ? 'border-white/10' : 'border-neutral-200/80'
                  }`}
                >
                  {project.demoUrl && (
                    <a
                      href={project.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex-1 inline-flex items-center justify-center px-4 py-2 rounded-lg ${
                        isDark
                          ? 'bg-primary-500 hover:bg-primary-600'
                          : 'bg-primary-600 hover:bg-primary-700'
                      } text-white transition-all duration-300 hover:transform hover:scale-[1.02] z-10`}
                    >
                      {t.viewProject}{' '}
                      <ExternalLink size={16} className="ml-2" />
                    </a>
                  )}
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex-1 inline-flex items-center justify-center px-4 py-2 rounded-lg ${
                        isDark
                          ? 'bg-neutral-800/70 hover:bg-neutral-700/80'
                          : 'bg-neutral-200 hover:bg-neutral-300'
                      } transition-all duration-300 hover:transform hover:scale-[1.02] z-10`}
                    >
                      {t.viewCode} <GithubIcon size={16} className="ml-2" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Paginación */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-4 mt-12">
            <button
              onClick={() => goToPage(currentPage - 1)}
              disabled={currentPage === 1}
              className={`p-2 rounded-lg transition-all duration-300 ${
                isDark
                  ? 'bg-neutral-800/70 hover:bg-neutral-700/80 disabled:bg-neutral-900/70'
                  : 'bg-neutral-200 hover:bg-neutral-300 disabled:bg-neutral-100'
              } disabled:cursor-not-allowed`}
            >
              <ChevronLeft size={24} />
            </button>
            
            <div className="flex gap-2">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => goToPage(page)}
                  className={`w-10 h-10 rounded-lg transition-all duration-300 ${
                    currentPage === page
                      ? isDark
                        ? 'bg-primary-500 text-white'
                        : 'bg-primary-600 text-white'
                      : isDark
                      ? 'bg-neutral-800/70 hover:bg-neutral-700/80'
                      : 'bg-neutral-200 hover:bg-neutral-300'
                  }`}
                >
                  {page}
                </button>
              ))}
            </div>

            <button
              onClick={() => goToPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`p-2 rounded-lg transition-all duration-300 ${
                isDark
                  ? 'bg-neutral-800/70 hover:bg-neutral-700/80 disabled:bg-neutral-900/70'
                  : 'bg-neutral-200 hover:bg-neutral-300 disabled:bg-neutral-100'
              } disabled:cursor-not-allowed`}
            >
              <ChevronRight size={24} />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}