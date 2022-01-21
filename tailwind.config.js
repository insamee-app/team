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
            base: '#931f1c',
            dark: '#5f0000',
            light: '#c95144',
            grey: {
              base: '#c7bebd',
              dark: '#584443',
              light: '#e2dede',
            },
          },
          secondary: {
            base: '#3ba99c',
            dark: '#00796e',
            light: '#72dbcd',
          },
        },
        associations: {
          primary: {
            base: '#1c8b92',
            dark: '#005a61',
            light: '#6dced5',
            grey: {
              base: '#bec5c5',
              dark: '#182b2c',
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
  plugins: [require('@tailwindcss/forms')],
}
