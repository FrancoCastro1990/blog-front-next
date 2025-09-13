'use client';

import { useState, useEffect, createContext, useContext } from 'react';
import { ConfigProvider, theme, ThemeConfig } from 'antd';
import { ThemeMode } from '@/types';

const { darkAlgorithm, defaultAlgorithm } = theme;

const darkTheme: ThemeConfig = {
  algorithm: darkAlgorithm,
  token: {
    colorPrimary: '#8ec07c',
    colorSuccess: '#8ec07c',
    colorInfo: '#83a598',
    colorWarning: '#fabd2f',
    colorError: '#fb4934',
    colorBgBase: '#0d0d0d',
    colorTextBase: '#eaeaea',
    fontFamily: 'Inter, system-ui, sans-serif',
    fontFamilyCode: 'Fira Code, JetBrains Mono, monospace',
    fontSize: 16,
    borderRadius: 8,
  },
  components: {
    Layout: {
      colorBgHeader: '#1c1c1c',
      colorBgBody: '#0d0d0d',
      colorBgTrigger: '#2a2a2a',
    },
    Card: {
      colorBgContainer: '#1c1c1c',
    },
    Button: {
      primaryShadow: '0 2px 0 rgba(142, 192, 124, 0.1)',
    },
  },
};

const lightTheme: ThemeConfig = {
  algorithm: defaultAlgorithm,
  token: {
    colorPrimary: '#427b58',
    colorSuccess: '#427b58',
    colorInfo: '#076678',
    colorWarning: '#b57614',
    colorError: '#9d0006',
    colorBgBase: '#fdfdfd',
    colorTextBase: '#1c1c1c',
    fontFamily: 'Inter, system-ui, sans-serif',
    fontFamilyCode: 'Fira Code, JetBrains Mono, monospace',
    fontSize: 16,
    borderRadius: 8,
  },
  components: {
    Layout: {
      colorBgHeader: '#f5f5f5',
      colorBgBody: '#fdfdfd',
      colorBgTrigger: '#e8e8e8',
    },
    Card: {
      colorBgContainer: '#ffffff',
    },
    Button: {
      primaryShadow: '0 2px 0 rgba(66, 123, 88, 0.1)',
    },
  },
};

interface ThemeContextType {
  themeMode: ThemeMode;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

interface ThemeProviderProps {
  children: React.ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [themeMode, setThemeMode] = useState<ThemeMode>('light');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem('theme') as ThemeMode;
    if (saved) {
      setThemeMode(saved);
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = themeMode === 'light' ? 'dark' : 'light';
    setThemeMode(newTheme);
    localStorage.setItem('theme', newTheme);
  };

  const currentTheme = themeMode === 'dark' ? darkTheme : lightTheme;

  if (!mounted) {
    return null;
  }

  return (
    <ThemeContext.Provider value={{ themeMode, toggleTheme }}>
      <ConfigProvider theme={currentTheme}>
        {children}
      </ConfigProvider>
    </ThemeContext.Provider>
  );
}