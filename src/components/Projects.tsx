import React, { useState } from 'react';
import { Code2, ExternalLink, Github, ChevronLeft, ChevronRight } from 'lucide-react';

import CombiGoImg from '../assets/images/CombiGo.png';
import GentoPassImg from '../assets/images/GentoPass.png';
import KytameImg from '../assets/images/Kytame.png';
import NamurImg from '../assets/images/Namur.png';
import TaeGukImg from '../assets/images/TaeGuk.png';
import ReciClickImg from '../assets/images/ReciClick.png';
import KaizenCodeImg from '../assets/images/KaizenCode.png';
import ControlARImg from '../assets/images/ControlAR.jpg';
import CasaMinkaImg from '../assets/images/CasaMinka.png';
import TotalNewsImg from '../assets/images/TotalNews.png';
import DolarHoyImg from '../assets/images/DolarHoy.png';

interface ProjectsProps {
  t: any;
  isDark: boolean;
}

const defaultImageUrl =
  'https://images.unsplash.com/photo-1597733336794-12d05021d510?auto=format&fit=crop&q=80&w=800';

const projects = [
  {
    title: 'CombiGo',
    description: 'CombiGo es una aplicación web full-stack diseñada para una empresa de transporte de media distancia.',
    image: CombiGoImg,
    demoUrl: 'https://combi-go.vercel.app/',
    technologies: ['Next.js', 'Firebase', 'NoSQL', 'Vercel'],
  },
  {
    title: 'ReciClick',
    description: 'ReciClick te ayuda a identificar residuos y clasificarlos en el contenedor correcto usando una foto.',
    image: ReciClickImg,
    demoUrl: 'https://reci-click.vercel.app/',
    technologies: ['Next.js', 'Firebase', 'Vercel'],
  },
  {
    title: 'Kytame',
    description: 'Sistema de puntuación para torneos de taekwondo en tiempo real.',
    image: KytameImg,
    demoUrl: 'https://kytame.azurewebsites.net/',
    githubUrl: 'https://github.com/lucasberonne/Kytame',
    technologies: ['Blazor', 'SignalR', '.NET 8', 'Azure'],
  },
  {
    title: 'Namur',
    description: 'Landing page para una empresa de productos alimenticios de alta calidad.',
    image: NamurImg,
    demoUrl: 'https://www.namur.com.py/',
    githubUrl: '',
    technologies: ['Astro js', 'Vercel'],
  },
  {
    title: 'GentoPass',
    description: 'Generador de contraseñas seguras con historial de uso.',
    image: GentoPassImg,
    demoUrl: 'https://gentopass.azurewebsites.net/',
    githubUrl: 'https://github.com/lucasberonne/GentoPass',
    technologies: ['.NET', 'Blazor', 'Azure', 'Docker'],
  },
  {
    title: 'KaizenCode',
    description: 'Landing page para una consultora IT con enfoque en SEO y chatbots.',
    image: KaizenCodeImg,
    demoUrl: 'https://www.kaizencode.com.ar/',
    githubUrl: '',
    technologies: ['Vite js', 'Vercel', 'Tailwind CSS', 'TypeScript', 'Chatbot', 'SEO', 'Gemini'],
  },
  {
    title: 'ControlAR',
    description: 'Sistema de gestión de stock y ventas con soporte multi-tenant.',
    image: ControlARImg,
    demoUrl: 'https://controlar.azurewebsites.net/',
    githubUrl: '',
    technologies: ['.NET', 'Blazor', 'Azure', 'Docker', 'Multi-tenant', 'SQL Server'],
  },
  {
    title: 'Tae Guk',
    description: 'Página web para una escuela de taekwondo.',
    image: TaeGukImg,
    demoUrl: 'https://taeguk.vercel.app/',
    githubUrl: 'https://github.com/lucasberonne/TaeGuk',
    technologies: ['Astro js', 'Vercel'],
  },
  {
    title: 'GenReadme',
    description: 'Herramienta para generar archivos README.md automáticamente con IA.',
    image: defaultImageUrl,
    demoUrl: '',
    githubUrl: 'https://github.com/lucasberonne/genreadme',
    technologies: ['TypeScript', 'Gemini API', 'VSCODE Extension', 'Node.js'],
  },
  {
    title: 'Generador de modelos SP',
    description: 'Generador de modelos para proyectos .NET a partir de stored procedures.',
    image: defaultImageUrl,
    demoUrl: '',
    githubUrl: 'https://github.com/lucasberonne/GeneradorModelosAPI',
    technologies: ['.NET', 'API REST', 'Swagger'],
  },
  {
    title: 'DolarHoy',
    description: 'Aplicación para consultar el valor del dólar en tiempo real.',
    image: DolarHoyImg,
    demoUrl: 'https://dolar-hoy-labs.vercel.app/',
    githubUrl: '',
    technologies: ['Vite js', 'Vercel', 'API REST'],
  },
  {
    title: 'Casa Minka',
    description: 'Museo virtual de cultura japonesa con contenido interactivo.',
    image: CasaMinkaImg,
    demoUrl: 'https://casaminka.vercel.app/',
    githubUrl: '',
    technologies: ['Next.js', 'PostgreSQL', 'Vercel'],
  },
  {
    title: 'TotalNews',
    description: 'Generador de noticias ficticias utilizando inteligencia artificial.',
    image: TotalNewsImg,
    demoUrl: 'https://totalnews.vercel.app/',
    githubUrl: 'https://github.com/lucasberonne/totalnews',
    technologies: ['Next.js', 'PostgreSQL', 'Gemini API', 'Vercel'],
  },
  {
    title: 'CapitanKrik',
    description: 'Automatización de tareas de testing para manejo de archivos FTP.',
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