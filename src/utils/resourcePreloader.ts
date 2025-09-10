// Resource preloading utilities
export class ResourcePreloader {
  private static instance: ResourcePreloader;
  private preloadedResources = new Set<string>();

  private constructor() {}

  public static getInstance(): ResourcePreloader {
    if (!ResourcePreloader.instance) {
      ResourcePreloader.instance = new ResourcePreloader();
    }
    return ResourcePreloader.instance;
  }

  // Preload critical CSS
  public preloadCSS(href: string): void {
    if (this.preloadedResources.has(href)) return;

    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'style';
    link.href = href;
    link.onload = () => {
      link.rel = 'stylesheet';
    };
    document.head.appendChild(link);
    this.preloadedResources.add(href);
  }

  // Preload JavaScript modules
  public preloadJS(src: string): void {
    if (this.preloadedResources.has(src)) return;

    const link = document.createElement('link');
    link.rel = 'modulepreload';
    link.href = src;
    document.head.appendChild(link);
    this.preloadedResources.add(src);
  }

  // Preload images with different strategies
  public preloadImage(src: string, priority: 'high' | 'low' = 'low'): Promise<void> {
    if (this.preloadedResources.has(src)) return Promise.resolve();

    return new Promise((resolve, reject) => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'image';
      link.href = src;
      
      if (priority === 'high') {
        link.setAttribute('fetchpriority', 'high');
      }

      link.onload = () => {
        this.preloadedResources.add(src);
        resolve();
      };
      link.onerror = reject;

      document.head.appendChild(link);
    });
  }

  // Preload multiple images
  public async preloadImages(srcs: string[], priority: 'high' | 'low' = 'low'): Promise<void> {
    const promises = srcs.map(src => this.preloadImage(src, priority));
    await Promise.allSettled(promises);
  }

  // Preload fonts
  public preloadFont(href: string, format: string = 'woff2'): void {
    if (this.preloadedResources.has(href)) return;

    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'font';
    link.href = href;
    link.type = `font/${format}`;
    link.crossOrigin = 'anonymous';
    document.head.appendChild(link);
    this.preloadedResources.add(href);
  }

  // Prefetch resources for future navigation
  public prefetchResource(href: string): void {
    if (this.preloadedResources.has(`prefetch-${href}`)) return;

    const link = document.createElement('link');
    link.rel = 'prefetch';
    link.href = href;
    document.head.appendChild(link);
    this.preloadedResources.add(`prefetch-${href}`);
  }

  // DNS prefetch for external domains
  public dnsPrefetch(domain: string): void {
    if (this.preloadedResources.has(`dns-${domain}`)) return;

    const link = document.createElement('link');
    link.rel = 'dns-prefetch';
    link.href = domain;
    document.head.appendChild(link);
    this.preloadedResources.add(`dns-${domain}`);
  }

  // Preconnect to external services
  public preconnect(url: string, crossorigin: boolean = false): void {
    if (this.preloadedResources.has(`preconnect-${url}`)) return;

    const link = document.createElement('link');
    link.rel = 'preconnect';
    link.href = url;
    if (crossorigin) {
      link.crossOrigin = 'anonymous';
    }
    document.head.appendChild(link);
    this.preloadedResources.add(`preconnect-${url}`);
  }

  // Initialize critical resource preloading
  public initializeCriticalResources(): void {
    // DNS prefetch para servicios externos
    this.dnsPrefetch('//fonts.googleapis.com');
    this.dnsPrefetch('//fonts.gstatic.com');
    this.dnsPrefetch('//images.unsplash.com');
    this.dnsPrefetch('//drive.google.com');

    // Preconnect a servicios críticos
    this.preconnect('https://fonts.googleapis.com');
    this.preconnect('https://fonts.gstatic.com', true);

    // Preload fuentes críticas (si las tienes)
    // this.preloadFont('/fonts/inter-var.woff2');

    // Preload imágenes críticas above the fold
    this.preloadImage('/assets/images/perfil.jpeg', 'high');
    
    console.log('Critical resources initialized');
  }
}

// React hook for resource preloading
export function useResourcePreloader() {
  const preloader = ResourcePreloader.getInstance();

  return {
    preloadImage: preloader.preloadImage.bind(preloader),
    preloadImages: preloader.preloadImages.bind(preloader),
    preloadJS: preloader.preloadJS.bind(preloader),
    preloadCSS: preloader.preloadCSS.bind(preloader),
    preloadFont: preloader.preloadFont.bind(preloader),
    prefetchResource: preloader.prefetchResource.bind(preloader),
    dnsPrefetch: preloader.dnsPrefetch.bind(preloader),
    preconnect: preloader.preconnect.bind(preloader),
  };
}

// Priority loading hint component
import React from 'react';

interface PriorityImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  priority?: 'high' | 'low' | 'auto';
  loading?: 'lazy' | 'eager';
}

export function PriorityImage({ priority = 'auto', loading = 'lazy', ...props }: PriorityImageProps) {
  const imgProps: React.ImgHTMLAttributes<HTMLImageElement> = {
    ...props,
    loading,
  };

  if (priority !== 'auto') {
    (imgProps as any).fetchPriority = priority;
  }

  return React.createElement('img', imgProps);
}
