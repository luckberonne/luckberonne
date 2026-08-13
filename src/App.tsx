import { useState, useEffect } from 'react';
import { translations } from './translations';
import { Header } from './components/Header';
import { Experiences } from './components/Experiences';
import { Projects } from './components/Projects';
import { Skills } from './components/Skills';
import { Courses } from './components/Courses';
import { Educations } from './components/Educations';
import { About } from './components/About';
import Hero from './components/Hero';
import { ExperienceModal } from './components/ExperienceModal';
import { LinkedInIcon } from './components/LinkedInIcon';
import { CLITerminal } from './components/CLITerminal';
import { resolveSectionId, scrollToSection } from './lib/sections';
import { SpeedInsights } from '@vercel/speed-insights/react';

type Experience = {
  title: string;
  company: string;
  companyUrl: string;
  period: string;
  description: string;
  responsibilities: string[];
  technologies: string[];
};

// localStorage throws when cookies/storage are blocked — never let a preference break render.
const readStored = (key: string): string | null => {
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
};

const writeStored = (key: string, value: string) => {
  try {
    localStorage.setItem(key, value);
  } catch {
    /* ignore quota / private mode */
  }
};

function App() {
  const [isVisible, setIsVisible] = useState(false);
  const [isDark, setIsDark] = useState(() => readStored('theme') !== 'light');
  const [lang, setLang] = useState<'en' | 'es'>(() =>
    readStored('lang') === 'en' ? 'en' : 'es',
  );
  const [selectedExperience, setSelectedExperience] =
    useState<Experience | null>(null);
  const [showLinkedIn, setShowLinkedIn] = useState(false);
  const [cliOpen, setCliOpen] = useState(false);

  const t = translations[lang];

  useEffect(() => {
    writeStored('theme', isDark ? 'dark' : 'light');
  }, [isDark]);

  // Keeps <html lang> in sync so screen readers and crawlers get the right language.
  useEffect(() => {
    writeStored('lang', lang);
    document.documentElement.lang = lang;
  }, [lang]);

  useEffect(() => {
    const handleScroll = () => {
      const heroSection = document.getElementById('hero');
      if (heroSection) {
        const heroBottom = heroSection.offsetTop + heroSection.offsetHeight;
        setShowLinkedIn(window.scrollY > heroBottom - 100);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // CLI easter egg — press "T" outside inputs to toggle.
  useEffect(() => {
    const isTypingTarget = (el: EventTarget | null) => {
      if (!(el instanceof Element)) return false;
      return Boolean(el.closest('input, textarea, select, [contenteditable="true"]'));
    };

    const onKey = (e: KeyboardEvent) => {
      if (e.repeat || e.ctrlKey || e.metaKey || e.altKey) return;
      if (isTypingTarget(e.target)) return;
      if (e.code !== 'KeyT') return;
      e.preventDefault();
      setCliOpen((open) => !open);
    };

    document.addEventListener('keydown', onKey, true);
    return () => document.removeEventListener('keydown', onKey, true);
  }, []);

  // Deep-linking: resolve section hashes in any supported language (#proyectos, #projects…)
  // and canonicalize the URL so links always share the same shape.
  useEffect(() => {
    const goHash = () => {
      const raw = window.location.hash.slice(1);
      if (!raw) return;
      const id = resolveSectionId(raw);
      if (!id) return;
      if (id !== raw) {
        const url = `${window.location.pathname}${window.location.search}#${id}`;
        window.history.replaceState(null, '', url);
      }
      scrollToSection(id);
    };

    if (window.location.hash) {
      window.requestAnimationFrame(goHash);
    }
    window.addEventListener('hashchange', goHash);
    return () => window.removeEventListener('hashchange', goHash);
  }, []);

  return (
    <div
      className={`min-h-screen page-shell ${
        isDark
          ? 'bg-gradient-to-br from-neutral-950 via-neutral-900 to-neutral-950 text-neutral-100'
          : 'bg-gradient-to-br from-neutral-50 via-white to-neutral-100 text-neutral-900'
      }`}
    >
      <Header
        isDark={isDark}
        setIsDark={setIsDark}
        lang={lang}
        setLang={setLang}
        onOpenTerminal={() => setCliOpen(true)}
      />
      <section id="hero">
        <Hero
          isDark={isDark}
          isVisible={isVisible}
          setIsVisible={setIsVisible}
          t={t}
        />
      </section>
      <Experiences
        isDark={isDark}
        t={{
          experience: t.experience,
          experienceDetails: t.experienceDetails,
          experiencesData: t.experiencesData,
          showMore: t.showMore,
          showLess: t.showLess,
        }}
        setSelectedExperience={setSelectedExperience}
      />
      <Projects t={t} isDark={isDark} />
      <Skills t={t} isDark={isDark} />
      <Courses t={t} isDark={isDark} />
      <Educations t={t} isDark={isDark} />
      <About t={t} isDark={isDark} />

      {/* Footer */}
      <footer
        className={`py-8 px-4 text-center ${
          isDark ? 'text-neutral-400' : 'text-neutral-500'
        }`}
      >
        <p>© {new Date().getFullYear()} Lucas Ariel Beronne. {t.allRightsReserved}</p>
      </footer>

      {/* Experience Modal */}
      {selectedExperience && (
        <ExperienceModal
          experience={selectedExperience}
          onClose={() => setSelectedExperience(null)}
          isDark={isDark}
          t={t}
        />
      )}

      {/* LinkedIn Floating Button */}
      <a
        href="https://www.linkedin.com/in/lucas-beronne"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="LinkedIn"
        className={`fixed bottom-6 right-6 p-4 rounded-full shadow-lg transition-all duration-300 transform ${
          showLinkedIn
            ? 'translate-y-0 opacity-100'
            : 'translate-y-16 opacity-0 pointer-events-none'
        } ${
          isDark
            ? 'bg-neutral-900/80 hover:bg-neutral-800 ring-1 ring-white/10'
            : 'bg-white/90 hover:bg-neutral-100 ring-1 ring-neutral-200'
        } hover:scale-[1.04] z-[100]`}
      >
        <LinkedInIcon size={24} className="text-primary-400" />
      </a>
      
      <CLITerminal
        open={cliOpen}
        onClose={() => setCliOpen(false)}
        isDark={isDark}
        lang={lang}
        setLang={setLang}
        setIsDark={setIsDark}
        t={t}
      />

      {/* Vercel Speed Insights */}
      <SpeedInsights />
    </div>
  );
}

export default App;
