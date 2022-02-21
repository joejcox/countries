module.exports = {
  darkMode: 'class',
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'dm-blue': 'hsl(209, 23%, 22%)',
        'dm-dark-blue': 'hsl(207, 26%, 17%)',
        'lm-blue': 'hsl(200, 15%, 8%)',
        'lm-grey': 'hsl(0, 0%, 52%)',
        'lm-light-grey': 'hsl(0, 0%, 98%)',
      },
      fontSize: {
        DEFAULT: '14px',
        small: '16px',
        large: '32px',
      },
      fontFamily: {
        primary: ['Nunito Sans', 'sans-serif'],
      },
      fontWeight: {
        light: 300,
        bold: 600,
        extrabold: 800,
      },
      container: {
        padding: '20px',
        screens: {
          '2xl': '1350px',
        },
      },
    },
  },
  plugins: [],
}

/*

- Dark Blue (Dark Mode Elements): hsl(209, 23%, 22%)
- Very Dark Blue (Dark Mode Background): hsl(207, 26%, 17%)
- Very Dark Blue (Light Mode Text): hsl(200, 15%, 8%)
- Dark Gray (Light Mode Input): hsl(0, 0%, 52%)
- Very Light Gray (Light Mode Background): hsl(0, 0%, 98%)
- White (Dark Mode Text & Light Mode Elements): hsl(0, 0%, 100%)

*/
