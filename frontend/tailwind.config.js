/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: '#1877f2',
        dark: {
          primary: '#18191a',
          secondary: '#242526',
          tertiary: '#3a3b3c',
        },
        light: {
          primary: '#f0f2f5',
          secondary: '#ffffff',
          tertiary: '#e4e6eb',
        }
      },
      scrollbar: {
        hide: {
          '-ms-overflow-style': 'none',
          'scrollbar-width': 'none',
          '&::-webkit-scrollbar': {
            display: 'none'
          }
        }
      }
    },
  },
  plugins: [],
}