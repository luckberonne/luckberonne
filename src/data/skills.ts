export type Skill = { name: string; url: string };

export const SKILL_CATEGORIES: Record<'frontend' | 'backend' | 'database' | 'tools', Skill[]> = {
  frontend: [
    { name: 'HTML/CSS', url: 'https://developer.mozilla.org/en-US/docs/Web/HTML' },
    { name: 'JavaScript/TypeScript', url: 'https://www.typescriptlang.org/docs/' },
    { name: 'React/Next.js', url: 'https://react.dev/' },
    { name: 'Tailwind CSS', url: 'https://tailwindcss.com/docs' },
    { name: 'Blazor', url: 'https://dotnet.microsoft.com/apps/aspnet/web-apps/blazor' },
    { name: 'Angular/AngularJS', url: 'https://angular.dev/' },
  ],
  backend: [
    { name: '.NET', url: 'https://dotnet.microsoft.com/es-es/download' },
    { name: 'Node.js', url: 'https://nodejs.org/docs/latest/api/' },
    { name: 'Java', url: 'https://www.java.com/' },
    { name: 'NestJS', url: 'https://docs.nestjs.com/' },
    { name: 'REST APIs', url: 'https://restfulapi.net/' },
    { name: 'SOAP', url: 'https://graphql.org/learn/' },
  ],
  database: [
    { name: 'PostgreSQL', url: 'https://www.postgresql.org/docs/' },
    { name: 'SQL Server', url: 'https://www.microsoft.com/sql-server/sql-server-downloads?msockid=3c1366fe0c8968971239738f0df56934' },
    { name: 'Redis', url: 'https://redis.io/documentation' },
    { name: 'Prisma', url: 'https://www.prisma.io/docs/' },
    { name: 'SQL', url: 'https://www.w3schools.com/sql/' },
    { name: 'Entity Framework', url: 'https://learn.microsoft.com/es-es/ef/' },
  ],
  tools: [
    { name: 'Git/GitHub', url: 'https://git-scm.com/doc' },
    { name: 'Docker', url: 'https://docs.docker.com/' },
    { name: 'Azure', url: 'https://azure.microsoft.com/' },
    { name: 'OpenShift', url: 'https://www.redhat.com/technologies/cloud-computing/openshift' },
    { name: 'Jenkins', url: 'https://www.jenkins.io/' },
    { name: 'AzureDevops/Jira', url: 'https://www.atlassian.com/software/jira' },
  ],
};
