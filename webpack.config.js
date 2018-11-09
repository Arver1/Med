const PATH = require('path');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');

const PATHS = {
  source: PATH.join(__dirname, 'src/js'),
  build: PATH.join(__dirname, 'src/js')
};

const isDevelopment = !process.env.NODE_ENV || process.env.NODE_ENV.trim() === 'development';
module.exports = {
  mode: isDevelopment ? 'development' : 'production',
  context: PATHS.source,
  entry: {
    index: './index.js',
  },

  output: {
    filename: 'main.js',
    path: PATHS.build
  },

  plugins: [
    new CaseSensitivePathsPlugin()
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      }
    ]
  },
  devtool: isDevelopment ? 'eval' : 'source-map'
};
