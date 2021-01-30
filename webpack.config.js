/* jshint esversion: 6 */
const fs = require('fs');
const path = require('path');
const webpack = require('webpack');
const ESLintPlugin = require('eslint-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const UnusedWebpackPlugin = require('unused-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const CopyPlugin = require('copy-webpack-plugin');
const MomentLocalesPlugin = require('moment-locales-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

// Set isProduction to false, to enable the interactive bundle analyser and the Unused component analyzer
const isProduction = false;   // Developers can set this to be false, but in git it should always be true

module.exports = {
  entry: path.resolve(__dirname, './src/index.jsx'),
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {
        test: /\.(png|jp(e*)g|svg|eot|woff|ttf)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              publicPath: '/',
              name: '[path][name].[ext]',
            },
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: ['*', '.js', '.jsx'],
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: '[name].[contenthash].js',
    // filename: 'bundle.js',
    publicPath: '/',
  },
  plugins: [
    new CleanWebpackPlugin(),
    new ESLintPlugin({ failOnError: false, failOnWarning: false  }),
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      title: 'We Vote Landing Page Project',
      template: path.resolve(__dirname, './src/index.html'),
    }),
    ...(isProduction ? [] : [
      new UnusedWebpackPlugin({  // Set isProduction to false to list (likely) unused files
        directories: [path.join(__dirname, 'src')],
        exclude: [
          '/**/cert/',
          '/**/global/svg-icons/',
          '/*.test.js',
          '/robots.txt',
        ],
        root: __dirname,
      }),
      new BundleAnalyzerPlugin(),  // Set isProduction to false to start an (amazing) bundle size analyzer tool
    ]),
    new CopyPlugin({
      patterns: [
        {
          from: 'src/img/global/icons/',
          to: 'src/img/global/icons',
        },
      ],
    }),
    new MomentLocalesPlugin(),
  ],
  devServer: {
    contentBase: path.resolve(__dirname, './dist'),
    hot: true,
    port: 3000,
    host: 'localhost',
    historyApiFallback: true,
    // https: true,
    // key: fs.readFileSync('/Users/stevepodell/WebstormProjects/wevote-landing-page/src/cert/server.crt'),
    // cert: fs.readFileSync('/Users/stevepodell/WebstormProjects/wevote-landing-page/src/cert/server.crt'),
    // ca: fs.readFileSync('/Users/stevepodell/WebstormProjects/wevote-landing-page/src/cert/rootSSL.pem'),
  },
  devtool: 'source-map',
};
