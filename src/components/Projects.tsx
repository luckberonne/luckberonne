import React, { useState } from 'react';
import { Code2, ExternalLink, Github, ChevronLeft, ChevronRight } from 'lucide-react';

interface ProjectsProps {
  t: any;
  isDark: boolean;
}

const defaultImageUrl =
  'https://images.unsplash.com/photo-1597733336794-12d05021d510?auto=format&fit=crop&q=80&w=800';

const projects = [
  {
    title: 'ControlAR',
    description: 'Gestion de stock y software de Ventas.',
    image: defaultImageUrl,
    demoUrl: 'https://controlar.azurewebsites.net/',
    githubUrl: '',
    technologies: ['.NET', 'Blazor', 'Azure', 'Docker', 'Multi-tenant', 'SQL Server'],
  },
  {
    title: 'Namur',
    description: 'Landing de una empresa de productos alimenticios de la más alta calidad para el mercado mayorista.',
    image: defaultImageUrl,
    demoUrl: 'https://www.namur.com.py/',
    githubUrl: '',
    technologies: ['Astro js', 'Vercel'],
  },
  {
    title: 'Tae Guk',
    description: 'Landing page de escuela de taekwondo',
    image: defaultImageUrl,
    demoUrl: 'https://taeguk.vercel.app/',
    githubUrl: 'https://github.com/lucasberonne/TaeGuk',
    technologies: ['Astro js', 'Vercel'],
  },
  {
    title: 'KaizenCode',
    description: 'Landing de empresa consultora IT.',
    image: defaultImageUrl,
    demoUrl: 'https://www.kaizencode.com.ar/',
    githubUrl: '',
    technologies: ['Vite js', 'Vercel', 'Tailwind CSS', 'TypeScript', 'Chatbot', 'SEO', 'Gemini'],
  },
  {
    title: 'GentoPass',
    description: 'Generador de contraseñas seguras, con un historial.',
    image: defaultImageUrl,
    demoUrl: 'https://gentopass.azurewebsites.net/',
    githubUrl: 'https://github.com/lucasberonne/GentoPass',
    technologies: ['.NET', 'Blazor', 'Azure', 'Docker'],
  },
  {
    title: 'Kytame',
    description: 'Puntaje de taekwondo para torneos.',
    image: defaultImageUrl,
    demoUrl: 'https://kytame.azurewebsites.net/',
    githubUrl: 'https://github.com/lucasberonne/Kytame',
    technologies: ['Blazor', 'SignalR', '.NET 8', 'Azure'],
  },
  {
    title: 'Casa Minka',
    description: 'Página de museo virtual de cultura japonesa.',
    image: defaultImageUrl,
    demoUrl: 'https://casaminka.vercel.app/',
    githubUrl: '',
    technologies: ['Next.js', 'PostgreSQL', 'Vercel'],
  },
  {
    title: 'TotalNews',
    description: 'Página de noticias falsas generadas por IA.',
    image: defaultImageUrl,
    demoUrl: 'https://totalnews.vercel.app/',
    githubUrl: 'https://github.com/lucasberonne/totalnews',
    technologies: ['Next.js', 'PostgreSQL', 'Gemini API', 'Vercel'],
  },
  {
    title: 'GenReadme',
    description:
      'Genera un README.md con IA, extrayendo el package.json y los nombres de los archivos.',
    image: defaultImageUrl,
    demoUrl: '',
    githubUrl: 'https://github.com/lucasberonne/genreadme',
    technologies: ['TypeScript', 'Gemini API', 'VSCODE Extension', 'Node.js'],
  },
  {
    title: 'Generador de modelos SP',
    description:
      'Genera modelos a partir de los sps de una base de datos, para proyectos .NET.',
    image: defaultImageUrl,
    demoUrl: '',
    githubUrl: 'https://github.com/lucasberonne/GeneradorModelosAPI',
    technologies: ['.NET', 'API REST', 'Swagger'],
  },
  {
    title: 'CapitanKrik',
    description:
      'Automatización de tareas Testing para la lectura y subida de archivos FTP.',
    image: defaultImageUrl,
    demoUrl: '',
    githubUrl: 'https://github.com/lucasberonne/CapitanKrik',
    technologies: ['.NET', 'WPF', 'Windows app', 'Firebase', 'SQL Server'],
  },
];

export function Projects({ t, isDark }: ProjectsProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const projectsPerPage = 6;
  const totalPages = Math.ceil(projects.length / projectsPerPage);

  const indexOfLastProject = currentPage * projectsPerPage;
  const indexOfFirstProject = indexOfLastProject - projectsPerPage;
  const currentProjects = projects.slice(indexOfFirstProject, indexOfLastProject);

  const goToPage = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    // Scroll suavemente al inicio de la sección de proyectos
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="projects"
      className={`py-20 px-4 ${isDark ? 'bg-gray-800/30' : 'bg-gray-50'}`}
    >
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center space-x-4 mb-12">
          <Code2 className="text-blue-400" size={32} />
          <h2 className="text-4xl font-bold">{t.projects}</h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {currentProjects.map((project, index) => (
            <div
              key={index}
              className={`project-card relative ${
                isDark ? 'bg-gray-800/50' : 'bg-white'
              } rounded-lg shadow-lg overflow-hidden group flex flex-col h-full transition-all duration-300 hover:shadow-2xl`}
            >
              <div className="relative h-40 sm:h-48 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-110"
                />
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
                    isDark ? 'text-gray-300' : 'text-gray-600'
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
                            ? 'bg-gray-700 text-gray-300'
                            : 'bg-gray-100 text-gray-700'
                        } transition-all duration-300 hover:transform hover:scale-105`}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-2 sm:space-x-3 mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-gray-700/20">
                  {project.demoUrl && (
                    <a
                      href={project.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex-1 inline-flex items-center justify-center px-4 py-2 rounded-lg ${
                        isDark
                          ? 'bg-blue-500 hover:bg-blue-600'
                          : 'bg-blue-600 hover:bg-blue-700'
                      } text-white transition-all duration-300 hover:transform hover:scale-105 z-10`}
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
                          ? 'bg-gray-700 hover:bg-gray-600'
                          : 'bg-gray-200 hover:bg-gray-300'
                      } transition-all duration-300 hover:transform hover:scale-105 z-10`}
                    >
                      {t.viewCode} <Github size={16} className="ml-2" />
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
                  ? 'bg-gray-700 hover:bg-gray-600 disabled:bg-gray-800'
                  : 'bg-gray-200 hover:bg-gray-300 disabled:bg-gray-100'
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
                        ? 'bg-blue-500 text-white'
                        : 'bg-blue-600 text-white'
                      : isDark
                      ? 'bg-gray-700 hover:bg-gray-600'
                      : 'bg-gray-200 hover:bg-gray-300'
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
                  ? 'bg-gray-700 hover:bg-gray-600 disabled:bg-gray-800'
                  : 'bg-gray-200 hover:bg-gray-300 disabled:bg-gray-100'
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