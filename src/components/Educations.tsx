import { GraduationCap, ExternalLink } from 'lucide-react';

interface Education {
  title: string;
  institution: string;
  institutionUrl: string;
  period: string;
  description: string;
}

interface EducationsProps {
  t: {
    education: string;
    educationsData?: Education[];
  };
  isDark: boolean;
}

export function Educations({ t, isDark }: EducationsProps) {
  // Combinar datos estáticos con traducciones
  const educations: Education[] = [
    {
      title: t.educationsData?.[0]?.title || 'Ingeniería en Sistemas de Información',
      institution: 'Universidad Tecnológica Nacional',
      institutionUrl: 'https://www.utn.edu.ar/',
      period: t.educationsData?.[0]?.period || '2018 - Actualidad',
      description: t.educationsData?.[0]?.description || 'Especialización en desarrollo de software y sistemas de información empresariales.',
    },
    {
      title: t.educationsData?.[1]?.title || 'Analista en Sistemas',
      institution: 'ORT Argentina',
      institutionUrl: 'https://landing.ort.edu.ar/sistemas',
      period: t.educationsData?.[1]?.period || '2025 - Actualidad',
      description: t.educationsData?.[1]?.description || 'Formación técnica en programación y desarrollo de aplicaciones.',
    }
  ];
  return (
    <section
      id="education"
      className={`py-20 px-4 ${isDark ? 'bg-gray-800/30' : 'bg-gray-50'}`}
    >
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center space-x-4 mb-12">
          <GraduationCap className="text-blue-400" size={32} />
          <h2 className="text-4xl font-bold">{t.education}</h2>
        </div>
        <div className="space-y-8">
          {educations.map((edu, index) => (
            <div
              key={index}
              className={`${
                isDark ? 'bg-gray-800/50' : 'bg-white shadow-lg'
              } p-6 rounded-lg hover:transform hover:scale-105 transition-all`}
            >
              <h3 className="text-xl font-bold text-blue-400 mb-2">{edu.title}</h3>
              <div className="flex items-center gap-2 mb-2">
                <a
                  href={edu.institutionUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${
                    isDark ? 'text-gray-300' : 'text-gray-600'
                  } hover:text-blue-400 transition-colors inline-flex items-center gap-1 animated-underline`}
                >
                  {edu.institution}
                  <ExternalLink size={14} />
                </a>
                <span className={isDark ? 'text-gray-300' : 'text-gray-600'}>
                  | {edu.period}
                </span>
              </div>
              <p className={`${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                {edu.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}