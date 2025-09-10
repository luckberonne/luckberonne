import React from 'react';

interface SkeletonProps {
  className?: string;
  variant?: 'text' | 'rectangular' | 'circular' | 'rounded';
  width?: string | number;
  height?: string | number;
  animation?: 'pulse' | 'wave' | 'none';
}

export function Skeleton({
  className = '',
  variant = 'text',
  width,
  height,
  animation = 'pulse',
}: SkeletonProps) {
  const baseClasses = 'bg-gray-200 dark:bg-gray-700';
  
  const variantClasses = {
    text: 'rounded',
    rectangular: '',
    circular: 'rounded-full',
    rounded: 'rounded-lg',
  };

  const animationClasses = {
    pulse: 'animate-pulse',
    wave: 'animate-shimmer',
    none: '',
  };

  const styles: React.CSSProperties = {};
  if (width) styles.width = width;
  if (height) styles.height = height;

  return (
    <div
      className={`${baseClasses} ${variantClasses[variant]} ${animationClasses[animation]} ${className}`}
      style={styles}
    />
  );
}

// Skeleton components for specific sections

export function HeroSkeleton() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative px-4 pt-16">
      <div className="text-center space-y-6">
        <Skeleton variant="text" width="300px" height="60px" className="mx-auto" />
        <Skeleton variant="text" width="400px" height="24px" className="mx-auto" />
        
        <div className="flex space-x-6 justify-center mt-12">
          {[1, 2, 3, 4].map((i) => (
            <Skeleton key={i} variant="circular" width="48px" height="48px" />
          ))}
        </div>
      </div>
    </div>
  );
}

export function ExperienceSkeleton() {
  return (
    <div className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center space-x-4 mb-12">
          <Skeleton variant="circular" width="32px" height="32px" />
          <Skeleton variant="text" width="200px" height="32px" />
        </div>
        
        <div className="grid md:grid-cols-2 gap-8">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
              <Skeleton variant="text" width="60%" height="24px" className="mb-2" />
              <Skeleton variant="text" width="80%" height="16px" className="mb-4" />
              <Skeleton variant="text" width="100%" height="16px" className="mb-2" />
              <Skeleton variant="text" width="90%" height="16px" className="mb-4" />
              
              <div className="flex flex-wrap gap-2">
                {[1, 2, 3].map((j) => (
                  <Skeleton key={j} variant="rounded" width="60px" height="24px" />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function ProjectSkeleton() {
  return (
    <div className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center space-x-4 mb-12">
          <Skeleton variant="circular" width="32px" height="32px" />
          <Skeleton variant="text" width="200px" height="32px" />
        </div>
        
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="bg-gray-50 dark:bg-gray-800 rounded-lg overflow-hidden">
              <Skeleton variant="rectangular" width="100%" height="200px" />
              
              <div className="p-4">
                <Skeleton variant="text" width="70%" height="20px" className="mb-2" />
                <Skeleton variant="text" width="100%" height="16px" className="mb-1" />
                <Skeleton variant="text" width="90%" height="16px" className="mb-4" />
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {[1, 2, 3].map((j) => (
                    <Skeleton key={j} variant="rounded" width="50px" height="20px" />
                  ))}
                </div>
                
                <div className="flex space-x-2">
                  <Skeleton variant="rounded" width="80px" height="32px" />
                  <Skeleton variant="rounded" width="80px" height="32px" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function SkillsSkeleton() {
  return (
    <div className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center space-x-4 mb-12">
          <Skeleton variant="circular" width="32px" height="32px" />
          <Skeleton variant="text" width="200px" height="32px" />
        </div>
        
        <div className="grid md:grid-cols-2 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
              <Skeleton variant="text" width="40%" height="24px" className="mb-4" />
              
              <div className="grid grid-cols-2 gap-3">
                {[1, 2, 3, 4, 5, 6].map((j) => (
                  <Skeleton key={j} variant="rounded" width="100%" height="40px" />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function AboutSkeleton() {
  return (
    <div className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center space-x-4 mb-12">
          <Skeleton variant="circular" width="32px" height="32px" />
          <Skeleton variant="text" width="200px" height="32px" />
        </div>
        
        <div className="bg-gray-50 dark:bg-gray-800 p-8 rounded-lg">
          <div className="flex flex-col md:flex-row gap-8 items-start">
            <Skeleton variant="rounded" width="192px" height="192px" />
            
            <div className="flex-1 space-y-4">
              <Skeleton variant="text" width="100%" height="20px" />
              <Skeleton variant="text" width="95%" height="20px" />
              <Skeleton variant="text" width="80%" height="20px" />
              <Skeleton variant="text" width="90%" height="20px" />
              
              <Skeleton variant="rounded" width="120px" height="40px" className="mt-6" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Shimmer animation CSS (add to your CSS file)
export const shimmerCSS = `
@keyframes shimmer {
  0% {
    background-position: -468px 0;
  }
  100% {
    background-position: 468px 0;
  }
}

.animate-shimmer {
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 400% 100%;
  animation: shimmer 1.5s infinite;
}

.dark .animate-shimmer {
  background: linear-gradient(90deg, #374151 25%, #4b5563 50%, #374151 75%);
  background-size: 400% 100%;
}
`;
