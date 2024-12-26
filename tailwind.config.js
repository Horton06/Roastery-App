module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: {
          light: '#ffffff',
          dark: '#0a0a0a',
        },
        foreground: {
          light: '#171717',
          dark: '#ededed',
        },
        primary: {
          light: '#4f46e5',
          dark: '#6366f1',
        },
        secondary: {
          light: '#d1d5db',
          dark: '#374151',
        },
      },
      fontFamily: {
        sans: ['Arial', 'Helvetica', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
