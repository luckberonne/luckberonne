import { useEffect } from 'react';

export interface MetaTag {
  name?: string;
  property?: string;
  content: string;
  httpEquiv?: string;
}

export interface SEOData {
  title: string;
  description: string;
  keywords?: string[];
  image?: string;
  url?: string;
  type?: string;
  author?: string;
  publishedTime?: string;
  modifiedTime?: string;
  locale?: string;
  siteName?: string;
  twitterCard?: 'summary' | 'summary_large_image' | 'app' | 'player';
  twitterSite?: string;
  twitterCreator?: string;
}

export class MetaManager {
  private static instance: MetaManager;

  public static getInstance(): MetaManager {
    if (!MetaManager.instance) {
      MetaManager.instance = new MetaManager();
    }
    return MetaManager.instance;
  }

  private constructor() {}

  public updateTitle(title: string): void {
    document.title = title;
    this.updateMetaTag('og:title', title);
    this.updateMetaTag('twitter:title', title);
  }

  public updateDescription(description: string): void {
    this.updateMetaTag('description', description);
    this.updateMetaTag('og:description', description);
    this.updateMetaTag('twitter:description', description);
  }

  public updateImage(imageUrl: string, alt?: string): void {
    this.updateMetaTag('og:image', imageUrl);
    this.updateMetaTag('twitter:image', imageUrl);
    if (alt) {
      this.updateMetaTag('og:image:alt', alt);
      this.updateMetaTag('twitter:image:alt', alt);
    }
  }

  public updateURL(url: string): void {
    this.updateMetaTag('og:url', url);
    this.updateCanonicalLink(url);
  }

  public updateKeywords(keywords: string[]): void {
    this.updateMetaTag('keywords', keywords.join(', '));
  }

  public updateStructuredData(data: any): void {
    const script = document.querySelector('script[type="application/ld+json"]') ||
                  document.createElement('script');
    script.setAttribute('type', 'application/ld+json');
    script.textContent = JSON.stringify(data);
    
    if (!document.head.contains(script)) {
      document.head.appendChild(script);
    }
  }

  private updateMetaTag(nameOrProperty: string, content: string): void {
    let selector: string;
    let attributeName: string;
    
    if (nameOrProperty.startsWith('og:') || nameOrProperty.startsWith('twitter:') || nameOrProperty.startsWith('article:')) {
      selector = `meta[property="${nameOrProperty}"]`;
      attributeName = 'property';
    } else {
      selector = `meta[name="${nameOrProperty}"]`;
      attributeName = 'name';
    }

    let meta = document.querySelector(selector) as HTMLMetaElement;
    
    if (!meta) {
      meta = document.createElement('meta');
      meta.setAttribute(attributeName, nameOrProperty);
      document.head.appendChild(meta);
    }
    
    meta.content = content;
  }

  private updateCanonicalLink(url: string): void {
    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    
    canonical.href = url;
  }

  public setFullSEO(seoData: SEOData): void {
    // Basic meta tags
    this.updateTitle(seoData.title);
    this.updateDescription(seoData.description);
    
    if (seoData.keywords) {
      this.updateKeywords(seoData.keywords);
    }
    
    if (seoData.url) {
      this.updateURL(seoData.url);
    }
    
    if (seoData.image) {
      this.updateImage(seoData.image);
    }
    
    // Open Graph
    this.updateMetaTag('og:type', seoData.type || 'website');
    
    if (seoData.siteName) {
      this.updateMetaTag('og:site_name', seoData.siteName);
    }
    
    if (seoData.locale) {
      this.updateMetaTag('og:locale', seoData.locale);
    }
    
    // Twitter Card
    this.updateMetaTag('twitter:card', seoData.twitterCard || 'summary_large_image');
    
    if (seoData.twitterSite) {
      this.updateMetaTag('twitter:site', seoData.twitterSite);
    }
    
    if (seoData.twitterCreator) {
      this.updateMetaTag('twitter:creator', seoData.twitterCreator);
    }
    
    // Additional meta tags
    if (seoData.author) {
      this.updateMetaTag('author', seoData.author);
    }
    
    if (seoData.publishedTime) {
      this.updateMetaTag('article:published_time', seoData.publishedTime);
    }
    
    if (seoData.modifiedTime) {
      this.updateMetaTag('article:modified_time', seoData.modifiedTime);
    }

    // Robots and other SEO meta tags
    this.updateMetaTag('robots', 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1');
    this.updateMetaTag('googlebot', 'index, follow');
  }
}

// Portfolio section SEO configurations
export const portfolioSEOConfig = {
  base: {
    siteName: 'Lucas Beronne - Desarrollador Full Stack',
    author: 'Lucas Beronne',
    locale: 'es_AR',
    twitterSite: '@luckberonne',
    twitterCreator: '@luckberonne',
    baseUrl: 'https://lucasberonne.com.ar',
    defaultImage: '/preview.jpg'
  },
  
  sections: {
    hero: {
      title: 'Lucas Beronne - Desarrollador Full Stack | React, TypeScript, Node.js',
      description: 'Desarrollador Full Stack especializado en React, TypeScript y Node.js. Experiencia en desarrollo web moderno, aplicaciones móviles y soluciones tecnológicas innovadoras.',
      keywords: ['desarrollador full stack', 'react', 'typescript', 'nodejs', 'programador', 'argentina', 'frontend', 'backend'],
      type: 'website'
    },
    
    experience: {
      title: 'Experiencia Profesional - Lucas Beronne | Desarrollador Full Stack',
      description: 'Más de 5 años de experiencia en desarrollo web. Trabajé en empresas como CombiGo, ReciClick y proyectos freelance desarrollando aplicaciones web y móviles.',
      keywords: ['experiencia laboral', 'desarrollador senior', 'combigo', 'reciclick', 'freelancer'],
      type: 'profile'
    },
    
    projects: {
      title: 'Proyectos - Portfolio de Lucas Beronne | Desarrollos Web y Móviles',
      description: 'Portfolio de proyectos desarrollados: aplicaciones web con React, apps móviles, sistemas de gestión y soluciones tecnológicas innovadoras.',
      keywords: ['portfolio', 'proyectos web', 'aplicaciones react', 'desarrollo móvil', 'sistemas de gestión'],
      type: 'website'
    },
    
    skills: {
      title: 'Habilidades Técnicas - Lucas Beronne | Frontend y Backend Developer',
      description: 'Stack tecnológico: React, TypeScript, Node.js, Python, SQL, MongoDB, AWS, Docker. Especialización en desarrollo frontend y backend moderno.',
      keywords: ['react', 'typescript', 'nodejs', 'python', 'mongodb', 'aws', 'docker', 'habilidades técnicas'],
      type: 'profile'
    },
    
    courses: {
      title: 'Cursos y Certificaciones - Formación Técnica de Lucas Beronne',
      description: 'Formación continua en tecnologías web modernas. Certificaciones en React, Node.js, AWS y metodologías de desarrollo ágil.',
      keywords: ['cursos programación', 'certificaciones', 'formación técnica', 'educación continua'],
      type: 'profile'
    },
    
    education: {
      title: 'Formación Académica - Lucas Beronne | Estudios en Programación',
      description: 'Formación académica en ciencias de la computación y desarrollo de software. Base sólida en algoritmos, estructuras de datos y arquitectura de software.',
      keywords: ['formación académica', 'ciencias computación', 'estudios programación'],
      type: 'profile'
    },
    
    about: {
      title: 'Acerca de Lucas Beronne - Desarrollador Full Stack Argentino',
      description: 'Desarrollador apasionado por crear soluciones tecnológicas innovadoras. Enfoque en código limpio, buenas prácticas y experiencia de usuario excepcional.',
      keywords: ['sobre mi', 'desarrollador argentino', 'programador', 'innovación tecnológica'],
      type: 'profile'
    }
  }
};

// React hook for managing meta tags
export function useSEO(sectionKey?: keyof typeof portfolioSEOConfig.sections) {
  const metaManager = MetaManager.getInstance();

  useEffect(() => {
    if (sectionKey && portfolioSEOConfig.sections[sectionKey]) {
      const sectionSEO = portfolioSEOConfig.sections[sectionKey];
      const baseSEO = portfolioSEOConfig.base;
      
      const seoData: SEOData = {
        title: sectionSEO.title,
        description: sectionSEO.description,
        keywords: sectionSEO.keywords,
        type: sectionSEO.type,
        siteName: baseSEO.siteName,
        author: baseSEO.author,
        locale: baseSEO.locale,
        twitterSite: baseSEO.twitterSite,
        twitterCreator: baseSEO.twitterCreator,
        url: `${baseSEO.baseUrl}/#${sectionKey}`,
        image: `${baseSEO.baseUrl}${baseSEO.defaultImage}`,
        twitterCard: 'summary_large_image'
      };
      
      metaManager.setFullSEO(seoData);
    }
  }, [sectionKey, metaManager]);

  return {
    updateSEO: (seoData: SEOData) => metaManager.setFullSEO(seoData),
    updateTitle: (title: string) => metaManager.updateTitle(title),
    updateDescription: (description: string) => metaManager.updateDescription(description),
    updateImage: (imageUrl: string, alt?: string) => metaManager.updateImage(imageUrl, alt),
    updateURL: (url: string) => metaManager.updateURL(url),
  };
}
