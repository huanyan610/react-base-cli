/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  prefix: 'tw-',
  theme: {
    spacing: Array.from({ length: 2000 }).reduce((map, _, index) => {
      map[index] = `${index}px`;
      return map;
    }, {}),
    extend: {
      fontSize: ({ theme }) => ({
        ...theme('spacing'),
      }),
    },
  },
  plugins: [require('@tailwindcss/line-clamp'), require('@savvywombat/tailwindcss-grid-areas')],
};
