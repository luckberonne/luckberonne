import { generatePortfolioSitemap } from '../utils/sitemap';

// Script para generar sitemap.xml automáticamente
const generateSitemap = () => {
  const sitemap = generatePortfolioSitemap();
  
  // En un entorno de producción, esto se ejecutaría en el servidor
  // Para desarrollo, podemos mostrar el sitemap en consola
  console.log('Generated Sitemap:');
  console.log(sitemap);
  
  return sitemap;
};

// Función para crear el archivo sitemap.xml en public/
const createSitemapFile = async () => {
  const sitemap = generateSitemap();
  
  // Crear blob y descargar (para desarrollo)
  const blob = new Blob([sitemap], { type: 'application/xml' });
  const url = URL.createObjectURL(blob);
  
  const a = document.createElement('a');
  a.href = url;
  a.download = 'sitemap.xml';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  
  URL.revokeObjectURL(url);
  
  console.log('Sitemap descargado como sitemap.xml');
};

// Ejecutar en desarrollo si es necesario
if (import.meta.env.DEV) {
  // Agregar función global para generar sitemap desde consola del navegador
  (window as any).generateSitemap = createSitemapFile;
  console.log('💡 Tip: Ejecuta generateSitemap() en la consola para generar el sitemap.xml');
}

export { generateSitemap, createSitemapFile };
