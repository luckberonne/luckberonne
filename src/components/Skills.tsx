import React from 'react';
import { Cpu } from 'lucide-react';

interface SkillsProps {
  t: any;
  isDark: boolean;
}

const skillCategories = {
  frontend: [
    { name: "HTML/CSS", url: "https://developer.mozilla.org/en-US/docs/Web/HTML" },
    { name: "JavaScript/TypeScript", url: "https://www.typescriptlang.org/docs/" },
    { name: "React/Next.js", url: "https://react.dev/" },
    { name: "Tailwind CSS", url: "https://tailwindcss.com/docs" },
    { name: "Blazor", url: "https://dotnet.microsoft.com/apps/aspnet/web-apps/blazor" },
    { name: "Angular/AngularJS", url: "https://angular.dev/" }
  ],
  backend: [
    { name: ".NET", url: "https://dotnet.microsoft.com/es-es/download" },
    { name: "Node.js", url: "https://nodejs.org/docs/latest/api/" },
    { name: "Java", url: "https://www.java.com/" },
    { name: "NestJS", url: "https://docs.nestjs.com/" },
    { name: "REST APIs", url: "https://restfulapi.net/" },
    { name: "SOAP", url: "https://graphql.org/learn/" }
  ],
  database: [
    { name: "PostgreSQL", url: "https://www.postgresql.org/docs/" },
    { name: "SQL Server", url: "https://www.microsoft.com/sql-server/sql-server-downloads?msockid=3c1366fe0c8968971239738f0df56934" },
    { name: "Redis", url: "https://redis.io/documentation" },
    { name: "Prisma", url: "https://www.prisma.io/docs/" },
    { name: "SQL", url: "https://www.w3schools.com/sql/" },
    { name: "Entity Framework", url: "https://learn.microsoft.com/es-es/ef/" }
  ],
  tools: [
    { name: "Git/GitHub", url: "https://git-scm.com/doc" },
    { name: "Docker", url: "https://docs.docker.com/" },
    { name: "Azure", url: "https://azure.microsoft.com/" },
    { name: "OpenShift", url: "https://www.redhat.com/technologies/cloud-computing/openshift" },
    { name: "Jenkins", url: "https://www.jenkins.io/" },
    { name: "AzureDevops/Jira", url: "https://www.atlassian.com/software/jira" }
  ]
};

export function Skills({ t, isDark }: SkillsProps) {
  return (
    <section className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center space-x-4 mb-12">
          <Cpu className="text-primary-400" size={32} />
          <h2 className="text-4xl font-bold">{t.skills.title}</h2>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          {Object.entries(skillCategories).map(([category, skills]) => (
            <div 
              key={category} 
              className={`skill-card ${
                isDark ? 'bg-surface-dark' : 'bg-surface-light shadow-lg'
              } p-4 sm:p-6 rounded-lg hover:shadow-xl transition-all`}
            >
              <h3 className="text-lg sm:text-xl font-bold text-primary-400 mb-4">{t.skills[category]}</h3>
              <div className="grid grid-cols-2 gap-2 sm:gap-3">
                {skills.map((skill, index) => (
                  <a
                    key={index}
                    href={skill.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${
                      isDark ? 'bg-neutral-700/50 hover:bg-primary-500/10' : 'bg-neutral-50 hover:bg-primary-50'
                    } p-2 sm:p-3 rounded-lg transition-all hover:transform hover:scale-105 cursor-pointer`}
                  >
                    <p className="font-semibold text-xs sm:text-sm text-center break-words">{skill.name}</p>
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}