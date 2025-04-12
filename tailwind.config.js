// tailwind.config.js
module.exports = {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
      extend: {
        keyframes: {
          fade: {
            '0%, 100%': { opacity: '0' },
            '10%, 30%': { opacity: '1' },
            '40%': { opacity: '0' }
          }
        },
        animation: {
          fade1: 'fade 15s infinite',
          fade2: 'fade 15s infinite 5s',
          fade3: 'fade 15s infinite 10s'
        }
      },
    },
    plugins: [],
  }
  