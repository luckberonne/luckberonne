import type { translations } from '../translations';
import type { Project } from '../data/projects';
import { SKILL_CATEGORIES } from '../data/skills';
import { COURSES } from '../data/courses';
import { getEducations } from '../data/education';

export type CliLineType = 'title' | 'out' | 'meta' | 'err' | 'ok' | 'menu' | 'cmd';
export type CliLine = { type: CliLineType; text: string; href?: string };
export type CliLang = 'en' | 'es';
type Translation = (typeof translations)['en'];

export const GITHUB_URL = 'https://github.com/luckberonne';
export const LINKEDIN_URL = 'https://www.linkedin.com/in/lucas-beronne/';
export const EMAIL = 'lucasberonne@gmail.com';

export const CLI_COMMANDS = [
  'help',
  'about',
  'exp',
  'proj',
  'skills',
  'courses',
  'edu',
  'cv',
  'gh',
  'li',
  'contact',
  'lang',
  'theme',
  'clear',
  'exit',
] as const;

export type CliCommand = (typeof CLI_COMMANDS)[number];

/** Commands that take a project number/name as an argument (open 1, demo 2, repo 3…). */
export const PROJECT_COMMANDS = ['open', 'demo', 'repo'] as const;
export type ProjectCommand = (typeof PROJECT_COMMANDS)[number];

/** What each command is called in the terminal — shown in help/banner and typeable as-is. */
export const DISPLAY: Record<CliLang, Record<CliCommand, string>> = {
  en: {
    help: 'help',
    about: 'about',
    exp: 'experience',
    proj: 'projects',
    skills: 'skills',
    courses: 'courses',
    edu: 'education',
    cv: 'cv',
    gh: 'github',
    li: 'linkedin',
    contact: 'contact',
    lang: 'lang',
    theme: 'theme',
    clear: 'clear',
    exit: 'exit',
  },
  es: {
    help: 'ayuda',
    about: 'sobre-mi',
    exp: 'experiencia',
    proj: 'proyectos',
    skills: 'habilidades',
    courses: 'cursos',
    edu: 'educacion',
    cv: 'cv',
    gh: 'github',
    li: 'linkedin',
    contact: 'contacto',
    lang: 'idioma',
    theme: 'tema',
    clear: 'limpiar',
    exit: 'salir',
  },
};

/** Every typeable alias, in both languages, mapped to its canonical command. Keys are
 *  space-stripped so both "sobre mi" and "sobre-mi" resolve the same way. */
const ALIASES: Record<string, string> = {
  '?': 'help',
  h: 'help',
  ayuda: 'help',
  comandos: 'help',
  experience: 'exp',
  experiencia: 'exp',
  projects: 'proj',
  proyectos: 'proj',
  habilidades: 'skills',
  stack: 'skills',
  cursos: 'courses',
  certifications: 'courses',
  certificaciones: 'courses',
  education: 'edu',
  educacion: 'edu',
  'educación': 'edu',
  estudios: 'edu',
  estudio: 'edu',
  'sobre-mi': 'about',
  'sobremi': 'about',
  'sobre-mí': 'about',
  acerca: 'about',
  'acerca-de': 'about',
  quiensoy: 'about',
  pdf: 'cv',
  resume: 'cv',
  curriculum: 'cv',
  github: 'gh',
  linkedin: 'li',
  mail: 'contact',
  email: 'contact',
  contacto: 'contact',
  idioma: 'lang',
  tema: 'theme',
  cls: 'clear',
  reset: 'clear',
  limpiar: 'clear',
  close: 'exit',
  quit: 'exit',
  salir: 'exit',
  cerrar: 'exit',
  abrir: 'open',
  repositorio: 'repo',
};

// Both display sets are always typeable, regardless of the active UI language.
for (const lang of Object.keys(DISPLAY) as CliLang[]) {
  for (const cmd of CLI_COMMANDS) {
    ALIASES[DISPLAY[lang][cmd]] = cmd;
  }
}

/** Numeric quick-shortcuts shown in the banner (1-6). */
export const NUMERIC_SHORTCUTS: Record<string, CliCommand> = {
  '1': 'about',
  '2': 'exp',
  '3': 'proj',
  '4': 'skills',
  '5': 'edu',
  '6': 'cv',
};

/** Normalizes free-typed input ("sobre mi", "Sobre-Mí") into a lookup key. */
export function normalizeInput(raw: string): string {
  return raw.trim().toLowerCase().replace(/\s+/g, '-');
}

export function canonicalize(input: string): string {
  const key = normalizeInput(input);
  return ALIASES[key] ?? key;
}

const editDistance = (a: string, b: string): number => {
  const dp = Array.from({ length: a.length + 1 }, () => Array(b.length + 1).fill(0));
  for (let i = 0; i <= a.length; i += 1) dp[i][0] = i;
  for (let j = 0; j <= b.length; j += 1) dp[0][j] = j;
  for (let i = 1; i <= a.length; i += 1) {
    for (let j = 1; j <= b.length; j += 1) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      dp[i][j] = Math.min(dp[i - 1][j] + 1, dp[i][j - 1] + 1, dp[i - 1][j - 1] + cost);
    }
  }
  return dp[a.length][b.length];
};

/** Best-guess command word (in the given language) for a typo, or null if too far off. */
export function suggestCommand(token: string, lang: CliLang): string | null {
  if (!token) return null;
  const words = CLI_COMMANDS.map((cmd) => DISPLAY[lang][cmd]);
  let best: string | null = null;
  let bestDist = Infinity;
  for (const word of words) {
    if (word.startsWith(token) && word !== token) return word;
    const d = editDistance(token, word);
    if (d < bestDist) {
      bestDist = d;
      best = word;
    }
  }
  return bestDist <= 2 ? best : null;
}

/** All words the terminal recognizes as a command (canonical ids + project commands). */
export const KNOWN_COMMANDS = new Set<string>([...CLI_COMMANDS, ...PROJECT_COMMANDS]);

/** Resolves a typed token to a project — by 1-based index or exact title. */
export function resolveProject(token: string, projects: Project[]): Project | null {
  if (!token) return null;
  const n = Number.parseInt(token, 10);
  if (!Number.isNaN(n) && n >= 1 && n <= projects.length) return projects[n - 1];
  const lower = token.toLowerCase();
  return projects.find((p) => p.title.toLowerCase() === lower) ?? null;
}

/** Numbered project listing with demo/repo links — output of the "proj" command. */
export function projectLines(t: Translation, projects: Project[]): CliLine[] {
  const lines: CliLine[] = [{ type: 'title', text: t.projects }];
  projects.forEach((p, i) => {
    lines.push({ type: 'out', text: `${i + 1}. **${p.title}**` });
    if (p.demoUrl) lines.push({ type: 'meta', text: `demo  ${p.demoUrl}`, href: p.demoUrl });
    if (p.githubUrl) lines.push({ type: 'meta', text: `repo  ${p.githubUrl}`, href: p.githubUrl });
    if (!p.demoUrl && !p.githubUrl) lines.push({ type: 'meta', text: t.cli.inProgress });
  });
  lines.push({ type: 'meta', text: '' });
  lines.push({ type: 'meta', text: t.cli.projIndexHint });
  return lines;
}

/** Output of the "exp" command — job history, inline. */
export function experienceLines(t: Translation): CliLine[] {
  const lines: CliLine[] = [{ type: 'title', text: t.experience }];
  t.experiencesData.forEach((e) => {
    lines.push({ type: 'out', text: `**${e.title}** — ${e.company}` });
    lines.push({ type: 'meta', text: e.period });
    lines.push({ type: 'meta', text: e.description });
  });
  return lines;
}

/** Output of the "skills" command — stack by category, inline. */
export function skillsLines(t: Translation): CliLine[] {
  const lines: CliLine[] = [{ type: 'title', text: t.skills.title }];
  (Object.keys(SKILL_CATEGORIES) as Array<keyof typeof SKILL_CATEGORIES>).forEach((category) => {
    const items = SKILL_CATEGORIES[category].map((s) => s.name).join(', ');
    lines.push({ type: 'out', text: `**${t.skills[category]}:** ${items}` });
  });
  return lines;
}

/** Output of the "courses" command — certifications, inline. */
export function coursesLines(t: Translation): CliLine[] {
  const lines: CliLine[] = [{ type: 'title', text: t.courses }];
  COURSES.forEach((c) => {
    lines.push({ type: 'out', text: `**${c.name}** — ${c.platform}` });
    lines.push({ type: 'meta', text: c.date });
    if (c.certificateUrl) lines.push({ type: 'meta', text: c.certificateUrl, href: c.certificateUrl });
  });
  return lines;
}

/** Output of the "edu" command — academic background, inline. */
export function educationLines(t: Translation): CliLine[] {
  const lines: CliLine[] = [{ type: 'title', text: t.education }];
  getEducations(t).forEach((e) => {
    lines.push({ type: 'out', text: `**${e.title}** — ${e.institution}`, href: e.institutionUrl });
    lines.push({ type: 'meta', text: e.period });
    lines.push({ type: 'meta', text: e.description });
  });
  return lines;
}

/** Tab-completion: single match completes it, multiple matches return the shared prefix.
 *  Only suggests words from the active UI language, so it doesn't mix "about"/"sobre-mi". */
export function completeCommand(raw: string, lang: CliLang): { matches: string[]; completed: string } {
  const trimmed = raw.trimStart();
  if (!trimmed || trimmed.includes(' ')) return { matches: [], completed: raw };
  const lower = trimmed.toLowerCase();
  const words = [...Object.values(DISPLAY[lang]), ...PROJECT_COMMANDS];
  const matches = words.filter((w) => w.startsWith(lower));
  if (matches.length === 1) return { matches, completed: matches[0] };
  if (matches.length > 1) {
    let prefix = matches[0];
    for (const m of matches.slice(1)) {
      let i = 0;
      while (i < prefix.length && i < m.length && prefix[i] === m[i]) i += 1;
      prefix = prefix.slice(0, i);
    }
    return { matches, completed: prefix || raw };
  }
  return { matches: [], completed: raw };
}

const HISTORY_KEY = 'cli-cmd-history-v1';
const HISTORY_MAX = 40;

/** Loads the persisted command history (survives reloads within the same tab). */
export function loadCliHistory(): string[] {
  try {
    const raw = sessionStorage.getItem(HISTORY_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.filter((x) => typeof x === 'string') : [];
  } catch {
    return [];
  }
}

/** Persists the command history — called once per submitted command, capped and cheap. */
export function saveCliHistory(history: string[]): void {
  try {
    sessionStorage.setItem(HISTORY_KEY, JSON.stringify(history.slice(0, HISTORY_MAX)));
  } catch {
    /* ignore quota / private mode */
  }
}

export const PROMPT = 'lucas@portfolio:~$';
