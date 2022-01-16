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
        'team-grey': '#6b7280',
        'mee': {
          primary: {
            base: '#931f1c',
            dark: '#5f0000',
            light: '#c95144',
          },
        },
      },
    },
  },
  plugins: [],
}
