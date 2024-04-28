// components/DataProvider.ts

import { promises as fs } from 'fs';

interface Course {
  company: string;
  position: string;
  date: string;
  description: string;
  certificate?: string;
}

interface Experience {
  company: string;
  link: string;
  position: string;
  date: string;
  description: string;
}

interface Item {
  name: string;
  color: string;
  icon: string;
  link: string;
}

interface Project {
  titulo: string;
  subtitulo: string;
  description: string;
  chips: string[];
  pagina: string;
  github: string;
}

interface SkillItem {
  name: string;
  level: string;
  color: string;
  icon: string;
}

interface SkillCategory {
  name: string;
  items: SkillItem[];
}

interface Data {
  title: string;
  about: string;
  curses: Course[];
  experiences: Experience[];
  items: Item[];
  projects: Project[];
  skills: SkillCategory[];
}

export async function getData(): Promise<Data> {
  const file = await fs.readFile(process.cwd() + '/src/app/data.json', 'utf8');
  const data = JSON.parse(file);
  return data;
}
