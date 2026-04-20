'use client';

import { createContext, useContext, useEffect, useMemo, useState, type PropsWithChildren } from 'react';

export type ThemePreference = 'dark' | 'light' | 'system';

interface ThemeContextValue {
  isDarkMode: boolean;
  themePreference: ThemePreference;
  setThemePreference: (value: ThemePreference) => void;
  toggleDarkMode: () => void;
}

const THEME_STORAGE_KEY = 'invoice-theme-preference';

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function ThemeProvider({ children }: PropsWithChildren) {
  const [themePreference, setThemePreference] = useState<ThemePreference>(() => {
    if (typeof window === 'undefined') {
      return 'system';
    }

    try {
      const savedPreference = window.localStorage.getItem(THEME_STORAGE_KEY);
      if (savedPreference === 'dark' || savedPreference === 'light' || savedPreference === 'system') {
        return savedPreference;
      }
    } catch {
      // Ignore storage access errors (e.g. private mode restrictions).
    }

    return 'system';
  });

  const [systemPrefersDark, setSystemPrefersDark] = useState(() => {
    if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
      return false;
    }

    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  const isDarkMode = themePreference === 'dark' || (themePreference === 'system' && systemPrefersDark);

  useEffect(() => {
    if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
      return;
    }

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    setSystemPrefersDark(mediaQuery.matches);

    const handleSystemThemeChange = (event: MediaQueryListEvent) => {
      setSystemPrefersDark(event.matches);
    };

    if (typeof mediaQuery.addEventListener === 'function') {
      mediaQuery.addEventListener('change', handleSystemThemeChange);
      return () => {
        mediaQuery.removeEventListener('change', handleSystemThemeChange);
      };
    }

    mediaQuery.addListener(handleSystemThemeChange);
    return () => {
      mediaQuery.removeListener(handleSystemThemeChange);
    };
  }, []);

  useEffect(() => {
    try {
      window.localStorage.setItem(THEME_STORAGE_KEY, themePreference);
    } catch {
      // Ignore storage write errors.
    }
  }, [themePreference]);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDarkMode);
    document.documentElement.style.colorScheme = isDarkMode ? 'dark' : 'light';
  }, [isDarkMode]);

  const value = useMemo<ThemeContextValue>(
    () => ({
      isDarkMode,
      themePreference,
      setThemePreference,
      toggleDarkMode: () => {
        const effectiveDarkMode = themePreference === 'dark' || (themePreference === 'system' && systemPrefersDark);
        setThemePreference(effectiveDarkMode ? 'light' : 'dark');
      }
    }),
    [isDarkMode, themePreference, systemPrefersDark]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }

  return context;
}