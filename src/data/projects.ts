import { translations } from '../translations';

import CombiGoImg from '../assets/images/CombiGo.png?w=800&quality=75&format=jpeg';
import CombiGoImgWebp from '../assets/images/CombiGo.png?w=800&quality=75&format=webp';
import GentoPassImg from '../assets/images/GentoPass.png?w=800&quality=75&format=jpeg';
import GentoPassImgWebp from '../assets/images/GentoPass.png?w=800&quality=75&format=webp';
import KytameImg from '../assets/images/Kytame.png?w=800&quality=75&format=jpeg';
import KytameImgWebp from '../assets/images/Kytame.png?w=800&quality=75&format=webp';
import NamurImg from '../assets/images/Namur.png?w=800&quality=75&format=jpeg';
import NamurImgWebp from '../assets/images/Namur.png?w=800&quality=75&format=webp';
import TaeGukImg from '../assets/images/TaeGuk.png?w=800&quality=75&format=jpeg';
import TaeGukImgWebp from '../assets/images/TaeGuk.png?w=800&quality=75&format=webp';
import ReciClickImg from '../assets/images/ReciClick.png?w=800&quality=75&format=jpeg';
import ReciClickImgWebp from '../assets/images/ReciClick.png?w=800&quality=75&format=webp';
import KaizenCodeImg from '../assets/images/KaizenCode.png?w=800&quality=75&format=jpeg';
import KaizenCodeImgWebp from '../assets/images/KaizenCode.png?w=800&quality=75&format=webp';
import ControlARImg from '../assets/images/ControlAR.jpg?w=800&quality=75&format=jpeg';
import ControlARImgWebp from '../assets/images/ControlAR.jpg?w=800&quality=75&format=webp';
import CasaMinkaImg from '../assets/images/CasaMinka.png?w=800&quality=75&format=jpeg';
import CasaMinkaImgWebp from '../assets/images/CasaMinka.png?w=800&quality=75&format=webp';
import TotalNewsImg from '../assets/images/TotalNews.png?w=800&quality=75&format=jpeg';
import TotalNewsImgWebp from '../assets/images/TotalNews.png?w=800&quality=75&format=webp';
import DolarHoyImg from '../assets/images/DolarHoy.png?w=800&quality=75&format=jpeg';
import DolarHoyImgWebp from '../assets/images/DolarHoy.png?w=800&quality=75&format=webp';
import FactulabsImg from '../assets/images/Factulabs.png?w=800&quality=75&format=jpeg';
import FactulabsImgWebp from '../assets/images/Factulabs.png?w=800&quality=75&format=webp';
import CodeImg from '../assets/images/Code.png?w=800&quality=75&format=jpeg';
import CodeImgWebp from '../assets/images/Code.png?w=800&quality=75&format=webp';

type Translation = (typeof translations)['en'];

export type Project = {
  title: string;
  description: string;
  image: string;
  imageWebp?: string;
  demoUrl?: string;
  githubUrl?: string;
  technologies: string[];
};

const defaultImageUrl =
  'https://images.unsplash.com/photo-1597733336794-12d05021d510?auto=format&fit=crop&q=80&w=800';

/** Single source of truth for project data — used by the Projects section and the CLI. */
export function getProjects(t: Translation): Project[] {
  return [
    {
      title: 'Code Carrusel',
      description:
        t.projectsData[16]?.description ||
        'Generador de imágenes profesionales. Diseña slides con código resaltado, branding y exportación en alta resolución listo para LinkedIn.',
      image: CodeImg,
      imageWebp: CodeImgWebp,
      demoUrl: 'https://code-carrusel.vercel.app/',
      githubUrl: '',
      technologies: ['Next.js', 'Vercel', 'Tailwind CSS', 'Exportación HD', 'Branding', 'Slides'],
    },
    {
      title: 'MCPrompt',
      description:
        t.projectsData[15]?.description ||
        'MCPrompt es un bibliotecario de chatmodes para Copilot que busca e inserta el chatmode más adecuado según el contexto del código.',
      image: defaultImageUrl,
      githubUrl: 'https://github.com/luckberonne/MCPrompt',
      technologies: ['.NET', 'C#', 'MCP', 'VSCode', 'AI', 'ChatModes'],
    },
    {
      title: 'Factulabs',
      description:
        t.projectsData[14]?.description ||
        'Factulabs es una aplicación de facturación electrónica desarrollada con .NET MAUI, enfocada principalmente en Windows',
      image: FactulabsImg,
      imageWebp: FactulabsImgWebp,
      githubUrl: 'https://github.com/luckberonne/Factulabs_Release',
      technologies: ['.NET MAUI', '.NET 9', 'SQL LITE', 'Windows', 'Android', 'PDF'],
    },
    {
      title: 'Namur',
      description: t.projectsData[3]?.description || 'Landing page para una empresa de productos alimenticios de alta calidad.',
      image: NamurImg,
      imageWebp: NamurImgWebp,
      demoUrl: 'https://www.namur.com.py/',
      githubUrl: '',
      technologies: ['Astro js', 'Vercel'],
    },
    {
      title: 'ReciClick',
      description: t.projectsData[1]?.description || 'ReciClick te ayuda a identificar residuos y clasificarlos en el contenedor correcto usando una foto.',
      image: ReciClickImg,
      imageWebp: ReciClickImgWebp,
      demoUrl: 'https://reci-click.vercel.app/',
      technologies: ['Next.js', 'Firebase', 'Vercel', 'Gemini API', 'AI'],
    },
    {
      title: 'Kytame',
      description: t.projectsData[2]?.description || 'Sistema de puntuación para torneos de taekwondo en tiempo real.',
      image: KytameImg,
      imageWebp: KytameImgWebp,
      demoUrl: 'https://kytame.azurewebsites.net/',
      githubUrl: 'https://github.com/luckberonne/Kytame',
      technologies: ['Blazor', 'SignalR', '.NET 8', 'Azure'],
    },
    {
      title: 'CombiGo',
      description: t.projectsData[0]?.description || 'CombiGo es una aplicación web full-stack diseñada para una empresa de transporte de media distancia.',
      image: CombiGoImg,
      imageWebp: CombiGoImgWebp,
      demoUrl: 'https://combi-go.vercel.app/',
      technologies: ['Next.js', 'Firebase', 'NoSQL', 'Vercel'],
    },
    {
      title: 'GentoPass',
      description: t.projectsData[4]?.description || 'Generador de contraseñas seguras con historial de uso.',
      image: GentoPassImg,
      imageWebp: GentoPassImgWebp,
      demoUrl: 'https://gentopass.azurewebsites.net/',
      githubUrl: 'https://github.com/luckberonne/GentoPass',
      technologies: ['.NET', 'Blazor', 'Azure', 'Docker'],
    },
    {
      title: 'KaizenCode',
      description: t.projectsData[5]?.description || 'Landing page para una consultora IT con enfoque en SEO y chatbots.',
      image: KaizenCodeImg,
      imageWebp: KaizenCodeImgWebp,
      demoUrl: 'https://www.kaizencode.com.ar/',
      githubUrl: '',
      technologies: ['Vite js', 'Vercel', 'Tailwind CSS', 'TypeScript', 'Chatbot', 'SEO', 'Gemini'],
    },
    {
      title: 'ControlAR',
      description: t.projectsData[6]?.description || 'Sistema de gestión de stock y ventas con soporte multi-tenant.',
      image: ControlARImg,
      imageWebp: ControlARImgWebp,
      demoUrl: 'https://controlar.azurewebsites.net/',
      githubUrl: '',
      technologies: ['.NET', 'Blazor', 'Azure', 'Docker', 'Multi-tenant', 'SQL Server'],
    },
    {
      title: 'Tae Guk',
      description: t.projectsData[7]?.description || 'Página web para una escuela de taekwondo.',
      image: TaeGukImg,
      imageWebp: TaeGukImgWebp,
      demoUrl: 'https://taeguk.vercel.app/',
      githubUrl: 'https://github.com/luckberonne/TaeGuk',
      technologies: ['Astro js', 'Vercel'],
    },
    {
      title: 'GenReadme',
      description: t.projectsData[8]?.description || 'Herramienta para generar archivos README.md automáticamente con IA.',
      image: defaultImageUrl,
      demoUrl: '',
      githubUrl: 'https://github.com/luckberonne/genreadme',
      technologies: ['TypeScript', 'Gemini API', 'VSCODE Extension', 'Node.js'],
    },
    {
      title: 'Generador de modelos SP',
      description: t.projectsData[9]?.description || 'Generador de modelos para proyectos .NET a partir de stored procedures.',
      image: defaultImageUrl,
      demoUrl: '',
      githubUrl: 'https://github.com/luckberonne/GeneradorModelosAPI',
      technologies: ['.NET', 'API REST', 'Swagger'],
    },
    {
      title: 'DolarHoy',
      description: t.projectsData[10]?.description || 'Aplicación para consultar el valor del dólar en tiempo real.',
      image: DolarHoyImg,
      imageWebp: DolarHoyImgWebp,
      demoUrl: 'https://dolar-hoy-labs.vercel.app/',
      githubUrl: '',
      technologies: ['Vite js', 'Vercel', 'API REST'],
    },
    {
      title: 'Casa Minka',
      description: t.projectsData[11]?.description || 'Museo virtual de cultura japonesa con contenido interactivo.',
      image: CasaMinkaImg,
      imageWebp: CasaMinkaImgWebp,
      demoUrl: 'https://casaminka.vercel.app/',
      githubUrl: '',
      technologies: ['Next.js', 'PostgreSQL', 'Vercel'],
    },
    {
      title: 'TotalNews',
      description: t.projectsData[12]?.description || 'Generador de noticias ficticias utilizando inteligencia artificial.',
      image: TotalNewsImg,
      imageWebp: TotalNewsImgWebp,
      demoUrl: 'https://totalnews.vercel.app/',
      githubUrl: 'https://github.com/luckberonne/totalnews',
      technologies: ['Next.js', 'PostgreSQL', 'Gemini API', 'Vercel'],
    },
    {
      title: 'CapitanKrik',
      description: t.projectsData[13]?.description || 'Automatización de tareas de testing para manejo de archivos FTP.',
      image: defaultImageUrl,
      demoUrl: '',
      githubUrl: 'https://github.com/luckberonne/CapitanKrik',
      technologies: ['.NET', 'WPF', 'Windows app', 'Firebase', 'SQL Server'],
    },
  ];
}
