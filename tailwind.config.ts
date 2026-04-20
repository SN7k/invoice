import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: ['class'],
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      boxShadow: {
        panel: '0 0 15px -3px rgba(0, 0, 0, 0.05)',
        panelDark: '0 0 40px -10px rgba(0, 0, 0, 1)'
      }
    }
  },
  plugins: []
};

export default config;
