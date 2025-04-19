const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
    "../node_modules/@material-tailwind/react/components/**/*.{js,ts,jsx,tsx}",
    "../node_modules/@material-tailwind/react/theme/components/**/*.{js,ts,jsx,tsx}"
  ],

  theme: {
    screens: {
      sm: '480px',
      md: '768px',
      lg: '976px',
      xl: '1440px',
    },
    colors: {
      'primary-green': '#095723',
      'primary-deep-green': '#5bc410',
      'primary-bg': '#F5F5F5',
      'primary-white': '#FFF',
      'primary-gray': '#F0F0F0',
      'primary-gray-deep': '#777777',
      'primary-red': '#095723',
      'primary-black': '#222222',
      'primary-yellow': '#FEB954',
      'primary-text': '#39404a',
      'nav-color': 'rgb(255, 255, 255, 0.7)',
      'overlay-color-primary': 'rgb(0, 0, 0, 0.5)',
      'overlay-color-secondary': 'rgb(0, 0, 0, 0.7)',
      'overlay-color-Tertiary': 'rgb(0, 0, 0, 0.9)',
      'facebook': '#006AFF',
      'Twitter': '#55acee',
      'Whatsapp': '#43d854',
      'messenger': '	#9333ea',

    },
    borderColor: {
      'primary': '#e5e5e5',
      'primary-green': '#81D742',
      'primary-deep-green': '#5bc410',
      'primary-black': '#222',
      'secondary': '#cfcfcf',
      'input': 'rgba(19, 38, 77, 0.2)'
    },
    extend: {
      boxShadow: {
        'light': '0 1px 3px #00000026',
        'deep': '0 -5px 15px #0000001a'
      },
    },
  },

  plugins: [],
})