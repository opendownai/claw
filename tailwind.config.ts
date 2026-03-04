import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'primary': 'var(--primary)',
        'primary-light': 'var(--primary-light)',
        'secondary': 'var(--secondary)',
        'accent': 'var(--accent)',
        'card-bg': 'var(--card-bg)',
        'border': 'var(--border)',
      },
      boxShadow: {
        'shadow-card': 'var(--shadow)',
        'shadow-card-lg': 'var(--shadow-lg)',
      }
    },
  },
  plugins: [],
};
export default config;