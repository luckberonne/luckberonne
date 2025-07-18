import React, { useState, useEffect } from 'react';
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
import { Linkedin } from 'lucide-react';

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
      className={`min-h-screen ${
        isDark
          ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white'
          : 'bg-gradient-to-br from-gray-100 via-white to-gray-100 text-gray-900'
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
        t={t}
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
          isDark ? 'text-gray-400' : 'text-gray-600'
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
        className={`fixed bottom-6 right-6 p-4 rounded-full shadow-lg transition-all duration-300 transform z-[100]${
          showLinkedIn
            ? 'translate-y-0 opacity-100'
            : 'translate-y-16 opacity-0 pointer-events-none'
        } ${
          isDark
            ? 'bg-gray-800 hover:bg-gray-700'
            : 'bg-white hover:bg-gray-100'
        } hover:scale-110 z-[100]`}
      >
        <Linkedin className="text-blue-400" size={24} />
      </a>
    </div>
  );
}

export default App;
