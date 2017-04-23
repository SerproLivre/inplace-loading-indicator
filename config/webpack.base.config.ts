
import path = require('path');

const nodeExternals = require('webpack-node-externals');

const baseConfig = {
  devtool: 'source-map',
  target: 'node',
  externals: [
    nodeExternals({
    })
  ],

  module: {
    rules: [
      {
        test: /(\.ts)$/,
        loader: 'awesome-typescript-loader',
        query: {
          useForkChecker: true,
          configFileName: path.resolve(__dirname, '../src/tsconfig.umd.json')
        }
      }, {
        test: /\.svg$/i,
        loaders: [
          'raw-loader'
        ]
      }
    ]
  },
  plugins: [
  ],
  resolve: {
    modules: [
      path.resolve(__dirname, '../src'),
      path.resolve(__dirname, '../node_modules')
    ],
    extensions: ['.ts', '.js']
  }
};

export default baseConfig;
