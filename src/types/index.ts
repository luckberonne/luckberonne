// Definiciones de tipos centralizadas
export interface Experience {
  title: string;
  company: string;
  companyUrl: string;
  period: string;
  description: string;
  responsibilities: string[];
  technologies: string[];
}

export interface Education {
  title: string;
  institution: string;
  institutionUrl: string;
  period: string;
  description: string;
}

export interface Course {
  name: string;
  platform: string;
  platformUrl: string;
  date: string;
  certificateUrl: string;
  description: string;
}

export interface Project {
  title: string;
  description: string;
  image: string;
  demoUrl?: string;
  githubUrl?: string;
  technologies: string[];
}

export interface Skill {
  name: string;
  url: string;
}

export interface SkillCategory {
  [key: string]: Skill[];
}

export type Language = 'en' | 'es';

export interface TranslationData {
  role: string;
  linkCV: string;
  experience: string;
  projects: string;
  skills: {
    title: string;
    frontend: string;
    backend: string;
    database: string;
    tools: string;
  };
  education: string;
  courses: string;
  about: string;
  viewProject: string;
  viewCode: string;
  viewCertificate: string;
  showMore: string;
  showLess: string;
  allRightsReserved: string;
  aboutText: string;
  experienceDetails: {
    responsibilities: string;
    technologies: string;
    company: string;
    period: string;
    viewMore: string;
  };
  projectDetails: {
    viewLive: string;
    sourceCode: string;
    techStack: string;
  };
  courseDetails: {
    platform: string;
    date: string;
    certificate: string;
    description: string;
  };
  educationDetails: {
    institution: string;
    period: string;
    description: string;
  };
  projectsData: Project[];
  experiencesData: Experience[];
  educationsData: Education[];
}
