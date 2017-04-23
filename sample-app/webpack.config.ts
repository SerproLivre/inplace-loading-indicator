import path = require('path');
import webpack = require('webpack');
import HtmlWebpackPlugin = require('html-webpack-plugin');
import CopyWebpackPlugin = require('copy-webpack-plugin');
import merge = require('webpack-merge');
import webpackBase from '../config/webpack.base.config';
const webpackSampleApp = merge(webpackBase, {
  target: 'web',
  resolve: {
    modules: [
      path.resolve(__dirname, '../node_modules'),
      path.resolve(__dirname, './node_modules'),
    ]
  },
  module: {
    rules: [
       {
        test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
        loader: 'url-loader',
        options: {
          limit: 10000
        }
      },
      {
          test: /\.(eot|svg|ttf|woff|woff2)$/,
          loader: 'file?name=public/fonts/[name].[ext]'
      },
       {
        test: /\.scss$/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader'
          },
          {
            loader: 'sass-loader',
             options: {
              limit: 10000
            }
          }
        ]
          }
    ]
  },
  plugins: [
    // Workaround for angular/angular#11580
    new webpack.ContextReplacementPlugin(
      // The (\\|\/) piece accounts for path separators in *nix and Windows
      /angular(\\|\/)core(\\|\/)(esm(\\|\/)src|src)(\\|\/)linker/,
      path.resolve(__dirname, './app'), // location of your src
      {} // a map of your routes
    ),
    new webpack.optimize.CommonsChunkPlugin({
      name: ['app', 'vendor', 'polyfills']
    }),
    new CopyWebpackPlugin(
      [
        {
          from: 'assets',
          to: 'assets'
        }, {
          from: path.resolve(__dirname, '../node_modules/@angular/material/prebuilt-themes/indigo-pink.css'),
          to: 'assets/material-indigo-ping.css'
        }
      ]
    ),
    new HtmlWebpackPlugin({
      template: 'index.html'
    })

  ],
  output: {
    path: path.join(__dirname, './dist'),
    filename: '[name].entry.js'
  },
  entry: {
    // 'ngx-pratico': path.resolve(__dirname, '../src/index.ts'),
    'polyfills': path.resolve(__dirname, './app/polyfills.ts'),
    'vendor': path.resolve(__dirname, './app/vendor.ts'),
    'app': path.resolve(__dirname, './app/main.ts')
  },
  devServer: {
    contentBase: path.join(__dirname, './'),
    compress: true,
    port: 9000
  }
});

module.exports = webpackSampleApp;
