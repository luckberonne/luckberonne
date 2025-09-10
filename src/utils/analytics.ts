interface AnalyticsEvent {
  action: string;
  category: string;
  label?: string;
  value?: number;
}

class Analytics {
  private static instance: Analytics;
  private isInitialized = false;

  private constructor() {}

  public static getInstance(): Analytics {
    if (!Analytics.instance) {
      Analytics.instance = new Analytics();
    }
    return Analytics.instance;
  }

  // Inicializar Google Analytics (opcional)
  public init(measurementId?: string) {
    if (this.isInitialized || typeof window === 'undefined') return;

    if (measurementId) {
      // Cargar Google Analytics
      const script = document.createElement('script');
      script.async = true;
      script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
      document.head.appendChild(script);

      const configScript = document.createElement('script');
      configScript.innerHTML = `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', '${measurementId}');
      `;
      document.head.appendChild(configScript);
    }

    this.isInitialized = true;
  }

  // Tracking de eventos personalizado
  public trackEvent({ action, category, label, value }: AnalyticsEvent) {
    // Console log para desarrollo
    console.log('Analytics Event:', { action, category, label, value });

    // Google Analytics
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', action, {
        event_category: category,
        event_label: label,
        value: value,
      });
    }

    // También podrías enviar a otros servicios como Mixpanel, Amplitude, etc.
  }

  // Tracking de vistas de página
  public trackPageView(path: string, title?: string) {
    console.log('Page View:', { path, title });

    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('config', 'GA_MEASUREMENT_ID', {
        page_path: path,
        page_title: title,
      });
    }
  }

  // Tracking de clicks en proyectos
  public trackProjectClick(projectName: string, actionType: 'demo' | 'code') {
    this.trackEvent({
      action: 'project_click',
      category: 'Portfolio',
      label: `${projectName}_${actionType}`,
    });
  }

  // Tracking de descargas de CV
  public trackCVDownload(language: 'en' | 'es') {
    this.trackEvent({
      action: 'cv_download',
      category: 'CV',
      label: language,
    });
  }

  // Tracking de cambios de tema
  public trackThemeChange(theme: 'dark' | 'light') {
    this.trackEvent({
      action: 'theme_change',
      category: 'UI',
      label: theme,
    });
  }

  // Tracking de cambios de idioma
  public trackLanguageChange(language: 'en' | 'es') {
    this.trackEvent({
      action: 'language_change',
      category: 'UI',
      label: language,
    });
  }

  // Tracking de scrolling (para medir engagement)
  public trackScrollDepth(percentage: number) {
    const milestones = [25, 50, 75, 100];
    const milestone = milestones.find(m => percentage >= m && percentage < m + 5);
    
    if (milestone) {
      this.trackEvent({
        action: 'scroll_depth',
        category: 'Engagement',
        label: `${milestone}%`,
      });
    }
  }
}

// Hook para usar Analytics
export function useAnalytics() {
  const analytics = Analytics.getInstance();

  return {
    trackEvent: analytics.trackEvent.bind(analytics),
    trackPageView: analytics.trackPageView.bind(analytics),
    trackProjectClick: analytics.trackProjectClick.bind(analytics),
    trackCVDownload: analytics.trackCVDownload.bind(analytics),
    trackThemeChange: analytics.trackThemeChange.bind(analytics),
    trackLanguageChange: analytics.trackLanguageChange.bind(analytics),
    trackScrollDepth: analytics.trackScrollDepth.bind(analytics),
  };
}

export default Analytics;
