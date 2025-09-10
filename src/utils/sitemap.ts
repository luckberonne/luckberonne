// Sitemap generator utility
export interface SitemapUrl {
  loc: string;
  lastmod?: string;
  changefreq?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority?: number;
}

export class SitemapGenerator {
  private baseUrl: string;
  private urls: SitemapUrl[] = [];

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl.replace(/\/$/, '');
  }

  public addUrl(url: SitemapUrl): void {
    this.urls.push({
      ...url,
      loc: url.loc.startsWith('http') ? url.loc : `${this.baseUrl}${url.loc}`,
    });
  }

  public addUrls(urls: SitemapUrl[]): void {
    urls.forEach(url => this.addUrl(url));
  }

  public generateXML(): string {
    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml"
        xmlns:mobile="http://www.google.com/schemas/sitemap-mobile/1.0"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
        xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
${this.urls.map(url => this.generateUrlXML(url)).join('\n')}
</urlset>`;

    return xml;
  }

  private generateUrlXML(url: SitemapUrl): string {
    return `  <url>
    <loc>${this.escapeXML(url.loc)}</loc>
    ${url.lastmod ? `<lastmod>${url.lastmod}</lastmod>` : ''}
    ${url.changefreq ? `<changefreq>${url.changefreq}</changefreq>` : ''}
    ${url.priority !== undefined ? `<priority>${url.priority}</priority>` : ''}
  </url>`;
  }

  private escapeXML(text: string): string {
    return text
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&apos;');
  }
}

// Generate portfolio sitemap
export function generatePortfolioSitemap(baseUrl: string = 'https://lucasberonne.com.ar'): string {
  const generator = new SitemapGenerator(baseUrl);
  const currentDate = new Date().toISOString();

  // Main pages
  generator.addUrls([
    {
      loc: '/',
      lastmod: currentDate,
      changefreq: 'weekly',
      priority: 1.0,
    },
    {
      loc: '/#hero',
      lastmod: currentDate,
      changefreq: 'monthly',
      priority: 0.9,
    },
    {
      loc: '/#experience',
      lastmod: currentDate,
      changefreq: 'monthly',
      priority: 0.8,
    },
    {
      loc: '/#projects',
      lastmod: currentDate,
      changefreq: 'weekly',
      priority: 0.9,
    },
    {
      loc: '/#skills',
      lastmod: currentDate,
      changefreq: 'monthly',
      priority: 0.7,
    },
    {
      loc: '/#courses',
      lastmod: currentDate,
      changefreq: 'monthly',
      priority: 0.6,
    },
    {
      loc: '/#education',
      lastmod: currentDate,
      changefreq: 'yearly',
      priority: 0.6,
    },
    {
      loc: '/#about',
      lastmod: currentDate,
      changefreq: 'monthly',
      priority: 0.8,
    },
  ]);

  // Project URLs (if you have individual project pages)
  const projects = [
    'combigo',
    'reciclick', 
    'kytame',
    'namur',
    'gentopass',
    'kaizencode',
    'controlar',
    'taeguk',
  ];

  projects.forEach(project => {
    generator.addUrl({
      loc: `/projects/${project}`,
      lastmod: currentDate,
      changefreq: 'monthly',
      priority: 0.7,
    });
  });

  return generator.generateXML();
}

// Function to download sitemap
export function downloadSitemap(): void {
  const sitemap = generatePortfolioSitemap();
  const blob = new Blob([sitemap], { type: 'application/xml' });
  const url = URL.createObjectURL(blob);
  
  const a = document.createElement('a');
  a.href = url;
  a.download = 'sitemap.xml';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  
  URL.revokeObjectURL(url);
}

// Function to submit sitemap to search engines
export function submitSitemapToSearchEngines(sitemapUrl: string): void {
  const searchEngines = [
    `https://www.google.com/webmasters/tools/ping?sitemap=${encodeURIComponent(sitemapUrl)}`,
    `https://www.bing.com/webmaster/ping.aspx?siteMap=${encodeURIComponent(sitemapUrl)}`,
  ];

  searchEngines.forEach(url => {
    // In a real application, you'd make these requests server-side
    console.log(`Submit sitemap to: ${url}`);
  });
}

// React hook to generate and manage sitemap
export function useSitemap(baseUrl?: string) {
  const generateSitemap = () => {
    return generatePortfolioSitemap(baseUrl);
  };

  const downloadSitemapFile = () => {
    downloadSitemap();
  };

  const submitToSearchEngines = (sitemapUrl: string) => {
    submitSitemapToSearchEngines(sitemapUrl);
  };

  return {
    generateSitemap,
    downloadSitemap: downloadSitemapFile,
    submitToSearchEngines,
  };
}
