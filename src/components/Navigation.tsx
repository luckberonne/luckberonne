import { ReactNode } from 'react';
import { ChevronRight, Home } from 'lucide-react';

interface BreadcrumbItem {
  label: string;
  href?: string;
  onClick?: () => void;
  active?: boolean;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
  separator?: ReactNode;
  showHome?: boolean;
}

export function Breadcrumbs({ 
  items, 
  className = '', 
  separator = <ChevronRight size={14} />,
  showHome = true 
}: BreadcrumbsProps) {
  const allItems = showHome 
    ? [{ label: 'Home', href: '#hero', active: false }, ...items]
    : items;

  const handleClick = (item: BreadcrumbItem, e: React.MouseEvent) => {
    if (item.onClick) {
      e.preventDefault();
      item.onClick();
    } else if (item.href && item.href.startsWith('#')) {
      e.preventDefault();
      const element = document.querySelector(item.href);
      element?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className={`flex items-center space-x-2 text-sm ${className}`} aria-label="Breadcrumb">
      <ol className="flex items-center space-x-2">
        {allItems.map((item, index) => (
          <li key={index} className="flex items-center space-x-2">
            {index > 0 && (
              <span className="text-gray-400 dark:text-gray-500">
                {separator}
              </span>
            )}
            
            {item.active ? (
              <span className="text-gray-900 dark:text-white font-medium" aria-current="page">
                {index === 0 && showHome ? <Home size={14} /> : item.label}
              </span>
            ) : (
              <button
                onClick={(e) => handleClick(item, e)}
                className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors flex items-center"
              >
                {index === 0 && showHome ? <Home size={14} /> : item.label}
              </button>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

// Hook para generar breadcrumbs automáticamente basado en scroll
export function useScrollBreadcrumbs() {
  const [currentSection, setCurrentSection] = useState<string>('hero');

  useEffect(() => {
    const sections = [
      { id: 'hero', label: 'Inicio' },
      { id: 'experience', label: 'Experiencia' },
      { id: 'projects', label: 'Proyectos' },
      { id: 'skills', label: 'Habilidades' },
      { id: 'courses', label: 'Cursos' },
      { id: 'education', label: 'Educación' },
      { id: 'about', label: 'Sobre Mí' },
    ];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setCurrentSection(entry.target.id);
          }
        });
      },
      {
        threshold: 0.3,
        rootMargin: '-20% 0px -70% 0px',
      }
    );

    sections.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, []);

  const breadcrumbItems: BreadcrumbItem[] = [
    {
      label: getSectionLabel(currentSection),
      href: `#${currentSection}`,
      active: true,
    },
  ];

  return { currentSection, breadcrumbItems };
}

function getSectionLabel(sectionId: string): string {
  const labels: Record<string, string> = {
    hero: 'Inicio',
    experience: 'Experiencia',
    projects: 'Proyectos', 
    skills: 'Habilidades',
    courses: 'Cursos',
    education: 'Educación',
    about: 'Sobre Mí',
  };
  
  return labels[sectionId] || 'Inicio';
}

// Componente de navegación flotante
interface FloatingNavProps {
  className?: string;
}

export function FloatingNav({ className = '' }: FloatingNavProps) {
  const { breadcrumbItems } = useScrollBreadcrumbs();

  return (
    <div className={`fixed bottom-4 left-4 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 px-4 py-2 z-40 ${className}`}>
      <Breadcrumbs 
        items={breadcrumbItems} 
        showHome={false}
        className="text-xs"
      />
    </div>
  );
}

// Navigation dots component
export function NavigationDots({ className = '' }: { className?: string }) {
  const { currentSection } = useScrollBreadcrumbs();

  const sections = [
    { id: 'hero', label: 'Inicio' },
    { id: 'experience', label: 'Experiencia' },
    { id: 'projects', label: 'Proyectos' },
    { id: 'skills', label: 'Habilidades' },
    { id: 'courses', label: 'Cursos' },
    { id: 'education', label: 'Educación' },
    { id: 'about', label: 'Sobre Mí' },
  ];

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className={`fixed right-4 top-1/2 transform -translate-y-1/2 space-y-3 z-40 ${className}`}>
      {sections.map(({ id, label }) => (
        <div key={id} className="relative group">
          <button
            onClick={() => scrollToSection(id)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              currentSection === id
                ? 'bg-blue-500 scale-125'
                : 'bg-gray-400 dark:bg-gray-600 hover:bg-gray-600 dark:hover:bg-gray-400'
            }`}
            title={label}
          />
          
          {/* Tooltip */}
          <div className="absolute right-full mr-3 top-1/2 transform -translate-y-1/2 bg-gray-900 dark:bg-white text-white dark:text-gray-900 px-2 py-1 rounded text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
            {label}
          </div>
        </div>
      ))}
    </div>
  );
}

import { useState, useEffect } from 'react';
