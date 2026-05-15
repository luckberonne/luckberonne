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

function App() {
  const [isVisible, setIsVisible] = useState(false);
  const [isDark, setIsDark] = useState(true);
  const [lang, setLang] = useState<'en' | 'es'>('es');
  const [selectedExperience, setSelectedExperience] =
    useState<Experience | null>(null);
  const [showLinkedIn, setShowLinkedIn] = useState(false);

  const t = translations[lang];

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
      <Educations 
        t={{
          education: t.education,
          educationsData: undefined,
        }} 
        isDark={isDark} 
      />
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
      
      {/* Vercel Speed Insights */}
      <SpeedInsights />
    </div>
  );
}

export default App;
