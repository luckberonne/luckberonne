import { Project, Experience, Education, Course } from '../types';

export interface StructuredDataConfig {
  organizationName: string;
  personName: string;
  url: string;
  logo: string;
  image: string;
  email?: string;
  telephone?: string;
  address?: {
    streetAddress: string;
    addressLocality: string;
    addressRegion: string;
    addressCountry: string;
  };
  socialMedia: string[];
}

export class StructuredDataGenerator {
  private config: StructuredDataConfig;

  constructor(config: StructuredDataConfig) {
    this.config = config;
  }

  // Person Schema
  public generatePersonSchema(): object {
    return {
      '@context': 'https://schema.org',
      '@type': 'Person',
      '@id': this.config.url + '#person',
      name: this.config.personName,
      url: this.config.url,
      image: this.config.image,
      sameAs: this.config.socialMedia,
      jobTitle: 'Desarrollador Full Stack',
      worksFor: {
        '@type': 'Organization',
        name: 'Freelancer'
      },
      knowsAbout: [
        'React',
        'TypeScript',
        'Node.js',
        'Python',
        'JavaScript',
        'Desarrollo Web',
        'Desarrollo de Software',
        'Frontend Development',
        'Backend Development'
      ],
      email: this.config.email,
      telephone: this.config.telephone,
      address: this.config.address && {
        '@type': 'PostalAddress',
        ...this.config.address
      }
    };
  }

  // Organization Schema (for professional work)
  public generateOrganizationSchema(): object {
    return {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      '@id': this.config.url + '#organization',
      name: this.config.organizationName,
      url: this.config.url,
      logo: this.config.logo,
      image: this.config.image,
      founder: {
        '@id': this.config.url + '#person'
      },
      sameAs: this.config.socialMedia
    };
  }

  // Website Schema
  public generateWebsiteSchema(): object {
    return {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      '@id': this.config.url + '#website',
      url: this.config.url,
      name: this.config.organizationName,
      description: 'Portfolio profesional de Lucas Beronne, Desarrollador Full Stack especializado en React, TypeScript y Node.js',
      publisher: {
        '@id': this.config.url + '#person'
      },
      potentialAction: {
        '@type': 'SearchAction',
        target: {
          '@type': 'EntryPoint',
          urlTemplate: this.config.url + '/?s={search_term_string}'
        },
        'query-input': 'required name=search_term_string'
      },
      inLanguage: 'es-AR'
    };
  }

  // Project/Software Application Schema
  public generateProjectSchema(project: Project): object {
    return {
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      name: project.title,
      description: project.description,
      url: project.demoUrl || project.githubUrl,
      applicationCategory: 'WebApplication',
      operatingSystem: 'Web Browser',
      image: project.image,
      screenshot: project.image,
      author: {
        '@id': this.config.url + '#person'
      },
      creator: {
        '@id': this.config.url + '#person'
      },
      programmingLanguage: project.technologies,
      codeRepository: project.githubUrl,
      license: 'MIT',
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '5',
        ratingCount: '1'
      },
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD',
        availability: 'https://schema.org/InStock'
      }
    };
  }

  // Work Experience Schema
  public generateWorkExperienceSchema(experience: Experience): object {
    return {
      '@context': 'https://schema.org',
      '@type': 'WorkExperience',
      position: experience.title,
      description: experience.description,
      startDate: experience.period,
      employer: {
        '@type': 'Organization',
        name: experience.company,
        url: experience.companyUrl
      },
      employee: {
        '@id': this.config.url + '#person'
      },
      skills: experience.technologies?.join(', ') || '',
      workLocation: {
        '@type': 'Place',
        name: 'Remoto'
      }
    };
  }

  // Education Schema
  public generateEducationSchema(education: Education): object {
    return {
      '@context': 'https://schema.org',
      '@type': 'EducationalOccupationalCredential',
      name: education.title,
      description: education.description,
      educationalLevel: 'Professional',
      credentialCategory: 'degree',
      recognizedBy: {
        '@type': 'Organization',
        name: education.institution
      },
      startDate: education.period?.split(' - ')[0],
      endDate: education.period?.split(' - ')[1] || new Date().getFullYear().toString()
    };
  }

  // Course/Certification Schema
  public generateCourseSchema(course: Course): object {
    return {
      '@context': 'https://schema.org',
      '@type': 'EducationalOccupationalCredential',
      name: course.name,
      description: course.description,
      credentialCategory: 'certificate',
      recognizedBy: {
        '@type': 'Organization',
        name: course.platform
      },
      dateCreated: course.date,
      url: course.certificateUrl,
      educationalLevel: 'Professional Development'
    };
  }

  // Portfolio/Creative Work Schema
  public generatePortfolioSchema(projects: Project[]): object {
    return {
      '@context': 'https://schema.org',
      '@type': 'CreativeWorkSeries',
      name: 'Portfolio de Proyectos - Lucas Beronne',
      description: 'Colección de proyectos de desarrollo web y aplicaciones realizados por Lucas Beronne',
      creator: {
        '@id': this.config.url + '#person'
      },
      hasPart: projects.map(project => ({
        '@type': 'CreativeWork',
        name: project.title,
        description: project.description,
        url: project.demoUrl || project.githubUrl,
        image: project.image,
        creator: {
          '@id': this.config.url + '#person'
        }
      })),
      genre: 'Software Development',
      inLanguage: 'es-AR'
    };
  }

  // Professional Service Schema
  public generateServiceSchema(): object {
    return {
      '@context': 'https://schema.org',
      '@type': 'ProfessionalService',
      '@id': this.config.url + '#service',
      name: 'Servicios de Desarrollo Web',
      description: 'Desarrollo de aplicaciones web modernas, sitios web responsivos y soluciones de software a medida',
      provider: {
        '@id': this.config.url + '#person'
      },
      serviceType: 'Software Development',
      areaServed: {
        '@type': 'Country',
        name: 'Argentina'
      },
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Servicios de Desarrollo',
        itemListElement: [
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Desarrollo Frontend',
              description: 'Desarrollo de interfaces de usuario con React y TypeScript'
            }
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Desarrollo Backend',
              description: 'Desarrollo de APIs y servicios backend con Node.js'
            }
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Desarrollo Full Stack',
              description: 'Desarrollo completo de aplicaciones web'
            }
          }
        ]
      }
    };
  }

  // Breadcrumb Schema
  public generateBreadcrumbSchema(items: { name: string; url: string }[]): object {
    return {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: items.map((item, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: item.name,
        item: item.url
      }))
    };
  }

  // FAQ Schema (for about section)
  public generateFAQSchema(): object {
    return {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: '¿Qué tecnologías utiliza Lucas Beronne?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Especializado en React, TypeScript, Node.js, Python, MongoDB, PostgreSQL, AWS y Docker entre otras tecnologías modernas.'
          }
        },
        {
          '@type': 'Question',
          name: '¿Qué tipo de proyectos desarrolla?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Desarrollo aplicaciones web completas, sitios web responsivos, APIs REST, aplicaciones móviles y soluciones de software a medida.'
          }
        },
        {
          '@type': 'Question',
          name: '¿Dónde está ubicado?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Basado en Argentina, trabajando con clientes locales e internacionales de forma remota.'
          }
        }
      ]
    };
  }
}

// Portfolio configuration for structured data
export const portfolioStructuredDataConfig: StructuredDataConfig = {
  organizationName: 'Lucas Beronne - Desarrollador Full Stack',
  personName: 'Lucas Beronne',
  url: 'https://lucasberonne.com.ar',
  logo: 'https://lucasberonne.com.ar/logo.png',
  image: 'https://lucasberonne.com.ar/preview.jpg',
  email: 'luckberonne@gmail.com',
  socialMedia: [
    'https://github.com/luckberonne',
    'https://linkedin.com/in/luckberonne',
    'https://twitter.com/luckberonne'
  ],
  address: {
    streetAddress: '',
    addressLocality: 'Buenos Aires',
    addressRegion: 'CABA',
    addressCountry: 'Argentina'
  }
};

// React hook for structured data
export function useStructuredData() {
  const generator = new StructuredDataGenerator(portfolioStructuredDataConfig);

  const addStructuredData = (data: object, id?: string) => {
    const scriptId = id || 'structured-data';
    let script = document.getElementById(scriptId) as HTMLScriptElement;
    
    if (!script) {
      script = document.createElement('script');
      script.id = scriptId;
      script.type = 'application/ld+json';
      document.head.appendChild(script);
    }
    
    script.textContent = JSON.stringify(data);
  };

  const removeStructuredData = (id: string) => {
    const script = document.getElementById(id);
    if (script) {
      script.remove();
    }
  };

  return {
    generator,
    addStructuredData,
    removeStructuredData,
    addPersonSchema: () => addStructuredData(generator.generatePersonSchema(), 'person-schema'),
    addOrganizationSchema: () => addStructuredData(generator.generateOrganizationSchema(), 'organization-schema'),
    addWebsiteSchema: () => addStructuredData(generator.generateWebsiteSchema(), 'website-schema'),
    addProjectSchema: (project: Project, id?: string) => addStructuredData(generator.generateProjectSchema(project), `project-${id || project.title.toLowerCase().replace(/\s+/g, '-')}-schema`),
    addPortfolioSchema: (projects: Project[]) => addStructuredData(generator.generatePortfolioSchema(projects), 'portfolio-schema'),
    addServiceSchema: () => addStructuredData(generator.generateServiceSchema(), 'service-schema'),
    addFAQSchema: () => addStructuredData(generator.generateFAQSchema(), 'faq-schema'),
  };
}
