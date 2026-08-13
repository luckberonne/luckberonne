export type Education = {
  title: string;
  institution: string;
  institutionUrl: string;
  period: string;
  description: string;
};

type EducationSource = {
  educationsData?: Array<{ title: string; period: string; description: string }>;
};

/** Single source of truth for education data — used by the Education section and the CLI. */
export function getEducations(t: EducationSource): Education[] {
  return [
    {
      title: t.educationsData?.[0]?.title || 'Ingeniería en Sistemas de Información',
      institution: 'Universidad Tecnológica Nacional',
      institutionUrl: 'https://www.utn.edu.ar/',
      period: t.educationsData?.[0]?.period || '2018 - Actualidad',
      description:
        t.educationsData?.[0]?.description ||
        'Especialización en desarrollo de software y sistemas de información empresariales.',
    },
    {
      title: t.educationsData?.[1]?.title || 'Analista en Sistemas',
      institution: 'ORT Argentina',
      institutionUrl: 'https://landing.ort.edu.ar/sistemas',
      period: t.educationsData?.[1]?.period || '2025 - Actualidad',
      description:
        t.educationsData?.[1]?.description ||
        'Formación técnica en programación y desarrollo de aplicaciones.',
    },
  ];
}
