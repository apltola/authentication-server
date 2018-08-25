const path = require('path');
const CLIENT_ROOT = path.resolve(__dirname, '../');

module.exports= {
  clientRoot: CLIENT_ROOT,
  outputPath: path.join(CLIENT_ROOT, 'dist'),
  appEntry: path.join(CLIENT_ROOT, 'src')
};