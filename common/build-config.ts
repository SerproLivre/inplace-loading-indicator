import * as path from 'path';
const nodeExternals = require('webpack-node-externals');

export function getBuildConfig(config: {
    outputFileName: string,
    libraryName: string,
    entryFile: string,
    outputPath: string,
    tsConfigPath: string
  }
) {

  return {
    entry: config.entryFile,
    devtool: 'source-map',
    target: 'node',
    externals: [
      nodeExternals({
        modulesDir: path.join(__dirname, '../node_modules')
      })
    ],
    output: {
      path: config.outputPath,
      filename: config.outputFileName,
      library: config.libraryName,
      libraryTarget: 'commonjs',
      // umdNamedDefine: true
    },
    module: {
      loaders: [
        {
          test: /(\.ts)$/,
          loader: 'awesome-typescript-loader',
          query: {
            useForkChecker: true,
            //transpileOnly: true,
            configFileName: config.tsConfigPath
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
