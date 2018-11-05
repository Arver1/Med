const path = require('path');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');

const PATHS = {
  source: path.join(__dirname, 'src/js'),
  build: path.join(__dirname, 'build'),
};


const conf = {
  context: PATHS.source,
  entry: './index.js',

  output: {
    path: PATHS.build,
    filename: 'bundle.js',
    publicPath: '/build/'
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: PATHS.source,
        options: {
          cacheDirectory: true
        },
      },
      {
        test: /\.(png|jpg|gif|ico|svg)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192
            }
          }
        ]
      },
      {
        test: /\.(png|jpg|gif|ico|svg)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]',
          outputPath: './img',
        }
      }
    ]
  },

  plugins: [
    new CaseSensitivePathsPlugin(),
    new MiniCssExtractPlugin({
      filename: "css/style.css",
    }),
    new OptimizeCSSAssetsPlugin({}),
    new HtmlWebpackPlugin({
      template: '../../index.html'
    })
  ]
};

module.exports = (env, argv) => {
  if(argv.mode === 'development') {
    conf.devtool = 'source-map';
    conf.module.rules.push({
      test: /\.(sa|sc|c)ss$/,
      use: [
        'style-loader',
        {
          loader: "css-loader", options: {
            sourceMap: true
          }
        },
        'postcss-loader',
        {
          loader: "sass-loader", options: {
            sourceMap: true
          }
        }
      ],
    });
    return conf;
  }
  conf.devtool = false;
  conf.output.publicPath = './';
  conf.module.rules.push({
    test: /\.(sa|sc|c)ss$/,
    use: [
      {
        loader:MiniCssExtractPlugin.loader,
        options: {
          // you can specify a publicPath here
          // by default it use publicPath in webpackOptions.output
          publicPath: '../'
        }
      },
      'css-loader',
      'postcss-loader',
      'sass-loader'
    ],
  });
  return conf;
};
