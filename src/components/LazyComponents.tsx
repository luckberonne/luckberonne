import { lazy, Suspense, useEffect } from 'react';
import { ErrorBoundary } from './ErrorBoundary';

// Lazy load components for better code splitting
export const LazyHero = lazy(() => import('./Hero'));
export const LazyExperiences = lazy(() => import('./Experiences').then(module => ({ default: module.Experiences })));
export const LazyProjects = lazy(() => import('./Projects').then(module => ({ default: module.Projects })));
export const LazySkills = lazy(() => import('./Skills').then(module => ({ default: module.Skills })));
export const LazyCourses = lazy(() => import('./Courses').then(module => ({ default: module.Courses })));
export const LazyEducations = lazy(() => import('./Educations').then(module => ({ default: module.Educations })));
export const LazyAbout = lazy(() => import('./About').then(module => ({ default: module.About })));

// Loading component con skeleton
function ComponentSkeleton({ height = '400px', className = '' }: { height?: string; className?: string }) {
  return (
    <div className={`animate-pulse ${className}`} style={{ height }}>
      <div className="bg-gray-200 dark:bg-gray-700 rounded-lg h-full"></div>
    </div>
  );
}

// Wrapper component with error boundary and suspense
interface LazyWrapperProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  sectionName: string;
  height?: string;
}

export function LazyWrapper({ children, fallback, sectionName, height }: LazyWrapperProps) {
  const defaultFallback = fallback || <ComponentSkeleton height={height} className="py-20 px-4" />;

  return (
    <ErrorBoundary
      fallback={
        <div className="py-20 px-4 text-center">
          <p className="text-gray-600 dark:text-gray-400">
            Error al cargar {sectionName}
          </p>
        </div>
      }
    >
      <Suspense fallback={defaultFallback}>
        {children}
      </Suspense>
    </ErrorBoundary>
  );
}

// Preload components when they are about to be needed
export function preloadComponent(componentLoader: () => Promise<any>) {
  // Start loading the component
  componentLoader().catch(() => {
    // Silently fail - component will be loaded when actually needed
  });
}

// Intersection Observer hook for lazy loading
export function useIntersectionObserver(
  elementRef: React.RefObject<Element>,
  callback: () => void,
  options: IntersectionObserverInit = {}
) {
  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          callback();
          observer.unobserve(element);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '100px',
      ...options,
    });

    observer.observe(element);

    return () => observer.disconnect();
  }, [elementRef, callback, options]);
}
