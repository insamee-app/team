module.exports = {
  content: [
    './resources/views/**/*.edge',
    './resources/css/**/*.css',
    './resources/js/**/*.js',
    './resources/js/**/*.ts',
    './start/view.ts',
  ],
  theme: {
    extend: {
      colors: {
        mee: {
          primary: {
            base: '#931c1c',
            dark: '#5f0000',
            light: '#d56d6d',
            grey: {
              base: '#c6bfbf',
              dark: '#746363',
              light: '#e2dede',
            },
          },
          secondary: {
            base: '#1c9284',
            dark: '#006156',
            light: '#6dd5c8',
          },
        },
        associations: {
          primary: {
            base: '#1c8b92',
            dark: '#005a61',
            light: '#6dced5',
            grey: {
              base: '#bec5c5',
              dark: '#637374',
              light: '#dee2e2',
            },
          },
          secondary: {
            base: '#921c6a',
            dark: '#610041',
            light: '#d56db2',
          },
        },
        evenements: {
          primary: {
            base: '#a88900',
            dark: '#a88900',
            light: '#ffe46b',
            grey: {
              base: '#c5c4be',
              dark: '#747163',
              light: '#e2e1de',
            },
          },
        },
        tutorat: {
          primary: {
            base: '#1c5392',
            dark: '#002d61',
            light: '#6d9dd5',
            grey: {
              base: '#bec2c5',
              dark: '#636b74',
              light: '#dee0e2',
            },
          },
        },
      },
    },
  },
  plugins: [require('@tailwindcss/forms'), require('@tailwindcss/typography')],
}
