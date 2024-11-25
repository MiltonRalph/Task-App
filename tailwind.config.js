/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        xsm: '412px',
        sm: '468px',
        md: '768px',
        lg: '976px',
        xl: '1440px',
      },
    },
    extend: {
      colors: {
        primaryColor: 'hsl(210, 100%, 50%)', //007BFF
        secondaryColor: 'hsl(210, 9%, 45%)', //6C757D
        bgColor: 'hsl(0, 0%, 100%)', //FFFFFF
        linkColor: 'hsl(211, 100%, 35%)', //212529
        fontColor: 'hsl(210, 11%, 15%)', //0056B3
        hoverColor: 'hsl(211, 80%, 21%)', //003865
      },
      keyframes: {
        typing: {
          from: { width: '0' },
          to: { width: '35ch' },
        },
        caret: {
          '50%': { borderColor: 'transparent' },
          '100%': { borderColor: 'currentColor' },
        },
      },
      animation: {
        caret: "caret 0.7s steps(1) infinite", // Blinking caret animation
      },
    },
  },
  plugins: [],
};
