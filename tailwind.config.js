module.exports = {
  content: [
    './resources/views/**/*.edge',
    './resources/css/**/*.css',
    './resources/js/**/*.js',
    './resources/js/**/*.ts',
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
      },
    },
  },
  plugins: [require('@tailwindcss/forms'), require('@tailwindcss/typography')],
}
