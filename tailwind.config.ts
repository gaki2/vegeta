import type { Config } from 'tailwindcss';
const { nextui } = require('@nextui-org/react');

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/shared/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        'text-color': 'rgb(var(--text-color) / <alpha-value>)',
        'text-color-reverse': 'rgb(var(--text-color-reverse) / <alpha-value>)',
        background: 'rgb(var(--bg-color) / <alpha-value>)',
        'background-reverse': 'rgb(var(--bg-color-reverse) / <alpha-value>)',
      },
    },
  },
  darkMode: 'class',
  plugins: [
    require('@tailwindcss/typography'),
    nextui({
      themes: {
        light: {
          colors: {
            primary: {
              // blue-500
              DEFAULT: '#3b82f6',
            },
          },
        },
        dark: {
          colors: {
            primary: {
              DEFAULT: '#3b82f6',
            },
          },
        },
      },
    }),
  ],
};
export default config;
