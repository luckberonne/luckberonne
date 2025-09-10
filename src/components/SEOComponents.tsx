import React, { useEffect } from 'react';
import { useSEO } from '../utils/seo';
import { useStructuredData } from '../utils/structuredData';

interface SEOWrapperProps {
  sectionKey?: 'hero' | 'experience' | 'projects' | 'skills' | 'courses' | 'education' | 'about';
  children: React.ReactNode;
}

export const SEOWrapper: React.FC<SEOWrapperProps> = ({ sectionKey, children }) => {
  useSEO(sectionKey);
  
  return <>{children}</>;
};

export const StructuredDataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { 
    addPersonSchema, 
    addOrganizationSchema, 
    addWebsiteSchema, 
    addServiceSchema,
    addFAQSchema 
  } = useStructuredData();

  useEffect(() => {
    // Add core structured data schemas
    addPersonSchema();
    addOrganizationSchema();
    addWebsiteSchema();
    addServiceSchema();
    addFAQSchema();
  }, [addPersonSchema, addOrganizationSchema, addWebsiteSchema, addServiceSchema, addFAQSchema]);

  return <>{children}</>;
};

// SEO Enhanced Header component
export const SEOEnhancedHeader: React.FC = () => {
  return (
    <>
      {/* Base meta tags - these will be managed by the SEO utils */}
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      
      {/* PWA and Mobile */}
      <meta name="theme-color" content="#1f2937" />
      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      <meta name="apple-mobile-web-app-title" content="Lucas Beronne" />
      
      {/* Performance and Security */}
      <meta httpEquiv="Content-Security-Policy" content="default-src 'self'; img-src 'self' data: https:; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline';" />
      <meta name="referrer" content="strict-origin-when-cross-origin" />
      
      {/* Preconnect to external domains for performance */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link rel="preconnect" href="https://github.com" />
      <link rel="preconnect" href="https://linkedin.com" />
      
      {/* Favicons */}
      <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      
      {/* PWA Manifest */}
      <link rel="manifest" href="/manifest.json" />
      
      {/* Alternative formats */}
      <link rel="alternate" type="application/rss+xml" title="Lucas Beronne - Blog RSS" href="/rss.xml" />
      
      {/* DNS Prefetch for performance */}
      <link rel="dns-prefetch" href="//fonts.googleapis.com" />
      <link rel="dns-prefetch" href="//github.com" />
      <link rel="dns-prefetch" href="//linkedin.com" />
      
      {/* Preload critical resources */}
      <link rel="preload" href="/assets/images/perfil.jpeg" as="image" />
      <link rel="preload" href="/fonts/inter-var.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
    </>
  );
};

// Hook for section-specific SEO
export function useSectionSEO() {
  const { updateSEO } = useSEO();
  const { addStructuredData } = useStructuredData();

  const updateSectionSEO = (customData?: any) => {
    if (customData) {
      updateSEO(customData);
    }
  };

  const addSectionStructuredData = (data: any, id?: string) => {
    addStructuredData(data, id);
  };

  return {
    updateSectionSEO,
    addSectionStructuredData,
  };
}
