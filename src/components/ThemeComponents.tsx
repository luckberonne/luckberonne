import React, { ReactNode } from 'react';
import { Sun, Moon, Monitor } from 'lucide-react';
import { useTheme, useThemeContext, ThemeContext, ThemeMode } from '../hooks/useTheme';

export function ThemeProvider({ children }: { children: ReactNode }) {
  const themeState = useTheme();

  return (
    <ThemeContext.Provider value={themeState}>
      {children}
    </ThemeContext.Provider>
  );
}

export function ThemeSwitcher({ className = '' }: { className?: string }) {
  const { mode, setThemeMode } = useThemeContext();

  const themes = [
    { id: 'light' as ThemeMode, label: 'Light', icon: Sun },
    { id: 'dark' as ThemeMode, label: 'Dark', icon: Moon },
    { id: 'system' as ThemeMode, label: 'System', icon: Monitor },
  ] as const;

  return (
    <div className={`flex items-center space-x-1 bg-gray-100 dark:bg-gray-800 rounded-lg p-1 ${className}`}>
      {themes.map(({ id, label, icon: Icon }) => (
        <button
          key={id}
          onClick={() => setThemeMode(id)}
          className={`flex items-center space-x-1 px-3 py-1.5 rounded-md text-sm transition-all ${
            mode === id
              ? 'bg-white dark:bg-gray-700 shadow-sm text-gray-900 dark:text-white'
              : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
          }`}
          title={`Switch to ${label} mode`}
        >
          <Icon size={14} />
          <span className="hidden sm:inline">{label}</span>
        </button>
      ))}
    </div>
  );
}

export function ThemeToggle({ className = '' }: { className?: string }) {
  const { isDark, toggleTheme } = useThemeContext();

  return (
    <button
      onClick={toggleTheme}
      className={`p-2 rounded-lg transition-colors ${
        isDark
          ? 'bg-gray-800 hover:bg-gray-700 text-yellow-500'
          : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
      } ${className}`}
      title={`Switch to ${isDark ? 'light' : 'dark'} mode`}
    >
      {isDark ? <Sun size={20} /> : <Moon size={20} />}
    </button>
  );
}
