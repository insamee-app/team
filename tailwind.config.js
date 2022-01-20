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
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
}
