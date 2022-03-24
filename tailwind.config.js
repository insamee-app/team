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
            base: '#9a8019',
            dark: '#655410',
            light: '#ffe46b',
            grey: {
              base: '#c5c4be',
              dark: '#747063',
              light: '#e2e2df',
            },
          },
          secondary: {
            base: '#4720bb',
            dark: '#2b1371',
            light: '#6b86ff',
            grey: {
              base: '#c0bec5',
              dark: '#676374',
              light: '#dcdde0',
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
