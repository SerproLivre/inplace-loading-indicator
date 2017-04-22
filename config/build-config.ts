import * as path from 'path';
const nodeExternals = require('webpack-node-externals');

export function getBuildConfig(outputFileName: string, libraryName: string) {

  return {
    entry: path.join(__dirname, '../src/index.ts'),
    devtool: 'source-map',
    target: 'node',
    externals: [
      nodeExternals({
      })
    ],
    output: {
      path: path.join(__dirname, '../dist'),
      filename: outputFileName,
      // library: libraryName,
      libraryTarget: 'commonjs',
      // umdNamedDefine: true
    },
    module: {
      loaders: [
        {
          test: /(\.jsx|\.js)$/,
          loader: 'babel',
          exclude: /(node_modules|bower_components)/
        },
        {
          test: /(\.ts)$/,
          loader: 'awesome-typescript-loader',
          query: {
            useForkChecker: true,
            //transpileOnly: true,
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
}
