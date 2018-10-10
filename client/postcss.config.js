const postcssPresetEnv = require('postcss-preset-env');

module.exports = {
  plugins: [
    postcssPresetEnv({
      browsers: ['>0.25%', 'not op_mini all']
    }),
    require('cssnano'),
    require('autoprefixer')
  ]
};