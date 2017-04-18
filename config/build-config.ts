import * as path from 'path';
let nodeExternals = require('webpack-node-externals');

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
          exclude: /(\.spec.ts)$/,
          query: {
            useForkChecker: true,
            tsconfig: path.resolve(path.resolve(__dirname, '../tsconfig.umd.json'))
          }
        }, {
            test: /\.svg$/i,
            loaders: [
                'svg-url-loader'
            ]
        }
      ]
    },
    plugins: [
    ],
    resolve: {
      extensions: ['.ts', '.js']
    }
  };
}
