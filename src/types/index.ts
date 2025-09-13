export * from './auth.types';
export * from './post.types';
export * from './api.types';

export type ThemeMode = 'light' | 'dark';

export interface AppContextType {
  theme: ThemeMode;
  toggleTheme: () => void;
}