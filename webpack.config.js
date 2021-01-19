const webpack = require('webpack');
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {

  mode: 'development',

  entry: path.resolve(__dirname, 'pages', 'index.js'),

  output: {
    filename: 'index.js',
    path: path.join(__dirname, 'dist'),
    publicPath: '',
  },

  plugins: [
    new webpack.ProgressPlugin(),
    new MiniCssExtractPlugin({ filename: 'main.css' }),
    new CopyPlugin(
      {
        patterns: [
          {
            from: path.resolve(__dirname, 'pages'),
            filter: async (resourcePath) => /\.html$/.test(resourcePath),
            to: path.resolve(__dirname, 'dist'),
          },
          {
            from: path.resolve(__dirname, 'assets'),
            to: path.resolve(__dirname, 'dist', 'assets'),
          },
        ],
      },
    ),
  ],

  module: {
    rules: [
      {
        test: /\.html$/,
        use: [
          {
            // Pass the result to bemdecl-to-fs-loader
            loader: 'bemdecl-to-fs-loader',
            // Sets the levels for redefinition and technology extending
            options: { levels: ['common.blocks'], extensions: ['scss', 'js'] },
          },
          {
            loader: 'html2bemdecl-loader',
          },
        ],
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node-modules/,
        use: ['babel-loader', 'eslint-loader'],
      },
      {
        test: /.(scss|css)$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
            },
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
            },
          },
        ],
      },
      {
        test: /\.(gif|png|jpe?g|svg)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'assets/images',
            },
          },
          {
            loader: 'image-webpack-loader',
            options: {
              disable: true,
            },
          },
        ],
      },
      {
        test: /.(ttf|otf|eot|woff(2)?)(\?[a-z0-9]+)?$/,
        use: [{
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            outputPath: 'fonts/',
          },
        }],
      },

    ],
  },
};
