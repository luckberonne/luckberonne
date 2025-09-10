import { useState, useEffect } from 'react';

export type ThemeMode = 'light' | 'dark' | 'system';

interface ThemeState {
  mode: ThemeMode;
  isDark: boolean;
}

export function useTheme() {
  const [theme, setTheme] = useState<ThemeState>(() => {
    // Recuperar del localStorage o usar 'system' por defecto
    const savedMode = localStorage.getItem('theme-mode') as ThemeMode;
    const mode = savedMode || 'system';
    
    const isDark = getIsDark(mode);
    
    return { mode, isDark };
  });

  // Aplicar tema al DOM
  useEffect(() => {
    const root = document.documentElement;
    
    if (theme.isDark) {
      root.classList.add('dark');
      root.style.colorScheme = 'dark';
    } else {
      root.classList.remove('dark');
      root.style.colorScheme = 'light';
    }
  }, [theme.isDark]);

  // Escuchar cambios en las preferencias del sistema
  useEffect(() => {
    if (theme.mode !== 'system') return;

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const handleChange = (e: MediaQueryListEvent) => {
      setTheme(prev => ({ ...prev, isDark: e.matches }));
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [theme.mode]);

  const setThemeMode = (mode: ThemeMode) => {
    const isDark = getIsDark(mode);
    setTheme({ mode, isDark });
    localStorage.setItem('theme-mode', mode);
  };

  const toggleTheme = () => {
    const newMode = theme.isDark ? 'light' : 'dark';
    setThemeMode(newMode);
  };

  return {
    mode: theme.mode,
    isDark: theme.isDark,
    setThemeMode,
    toggleTheme,
  };
}

function getIsDark(mode: ThemeMode): boolean {
  switch (mode) {
    case 'dark':
      return true;
    case 'light':
      return false;
    case 'system':
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    default:
      return false;
  }
}

// Theme Provider Context
import { createContext, useContext } from 'react';

interface ThemeContextType {
  mode: ThemeMode;
  isDark: boolean;
  setThemeMode: (mode: ThemeMode) => void;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export { ThemeContext };

export function useThemeContext() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useThemeContext must be used within a ThemeProvider');
  }
  return context;
}

// Hook para detectar preferencias del sistema
export function useSystemTheme() {
  const [systemTheme, setSystemTheme] = useState<'light' | 'dark'>(() =>
    window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  );

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const handleChange = (e: MediaQueryListEvent) => {
      setSystemTheme(e.matches ? 'dark' : 'light');
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  return systemTheme;
}

// Hook para detectar si el usuario prefiere modo reducido de movimiento
export function usePrefersReducedMotion() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(() =>
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    
    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  return prefersReducedMotion;
}
