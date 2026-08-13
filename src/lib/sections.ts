const SECTION_ALIASES: Record<string, string[]> = {
  hero: ['hero', 'inicio', 'home', 'top'],
  experience: ['experience', 'experiencia', 'exp'],
  projects: ['projects', 'proyectos', 'proj'],
  skills: ['skills', 'habilidades', 'stack'],
  courses: ['courses', 'cursos', 'certifications', 'certificaciones'],
  education: ['education', 'educacion', 'educación', 'edu'],
  about: ['about', 'sobre-mi', 'sobre-mí', 'acerca'],
};

export const SECTION_IDS = Object.keys(SECTION_ALIASES);

/** Resolves a raw hash/token (any language alias) to its canonical section id. */
export function resolveSectionId(raw: string): string | null {
  const token = raw.trim().toLowerCase().replace(/^#/, '');
  if (!token) return null;
  if (SECTION_ALIASES[token]) return token;
  for (const [id, aliases] of Object.entries(SECTION_ALIASES)) {
    if (aliases.includes(token)) return id;
  }
  return null;
}

/** Smooth-scrolls to a section, offsetting for the fixed header. */
export function scrollToSection(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  const headerOffset = 64; // Header is h-16
  const top = el.getBoundingClientRect().top + window.scrollY - headerOffset;
  window.scrollTo({ top, behavior: 'smooth' });
}
