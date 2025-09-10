import { useEffect } from 'react';
import { Language } from '../types';

interface SEOMetaProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  lang?: Language;
}

export function SEOMeta({ 
  title = "Lucas Beronne - Portfolio", 
  description = "Portfolio de Lucas Beronne. Desarrollador Full-Stack Senior con más de 5 años de experiencia.",
  image = "/preview.jpg",
  url = "https://www.lucasberonne.com.ar",
  lang = "es"
}: SEOMetaProps) {
  
  useEffect(() => {
    // Actualizar título
    document.title = title;
    
    // Actualizar meta tags
    const updateMetaTag = (name: string, content: string) => {
      let element = document.querySelector(`meta[name="${name}"]`) as HTMLMetaElement;
      if (!element) {
        element = document.createElement('meta');
        element.name = name;
        document.head.appendChild(element);
      }
      element.content = content;
    };

    const updatePropertyTag = (property: string, content: string) => {
      let element = document.querySelector(`meta[property="${property}"]`) as HTMLMetaElement;
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute('property', property);
        document.head.appendChild(element);
      }
      element.content = content;
    };

    // Meta tags básicos
    updateMetaTag('description', description);
    updateMetaTag('author', 'Lucas Beronne');
    
    // Open Graph
    updatePropertyTag('og:title', title);
    updatePropertyTag('og:description', description);
    updatePropertyTag('og:image', image);
    updatePropertyTag('og:url', url);
    updatePropertyTag('og:type', 'website');
    updatePropertyTag('og:site_name', 'Lucas Beronne - Portfolio');
    
    // Twitter Card
    updateMetaTag('twitter:card', 'summary_large_image');
    updateMetaTag('twitter:title', title);
    updateMetaTag('twitter:description', description);
    updateMetaTag('twitter:image', image);
    
    // Lang attribute
    document.documentElement.lang = lang;
    
    // JSON-LD structured data
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "Person",
      "name": "Lucas Ariel Beronne",
      "jobTitle": "Senior Software Developer",
      "url": url,
      "image": image,
      "sameAs": [
        "https://www.linkedin.com/in/lucas-beronne/",
        "https://github.com/luckberonne"
      ],
      "worksFor": {
        "@type": "Organization",
        "name": "Banco Galicia"
      },
      "alumniOf": [
        {
          "@type": "Organization",
          "name": "Universidad Tecnológica Nacional"
        }
      ],
      "knowsAbout": [
        ".NET", "React", "Angular", "TypeScript", "SQL Server", "Azure", "DevOps"
      ]
    };

    let jsonLdScript = document.querySelector('script[type="application/ld+json"]') as HTMLScriptElement;
    if (!jsonLdScript) {
      jsonLdScript = document.createElement('script');
      jsonLdScript.type = 'application/ld+json';
      document.head.appendChild(jsonLdScript);
    }
    jsonLdScript.textContent = JSON.stringify(structuredData);
    
  }, [title, description, image, url, lang]);

  return null; // Este componente no renderiza nada visualmente
}
