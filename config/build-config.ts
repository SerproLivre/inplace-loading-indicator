import * as path from 'path';

import merge = require('webpack-merge');
import baseConfig from './webpack.base.config';
export function getBuildConfig(outputFileName: string, libraryName: string) {
  return merge(baseConfig,
    {
      entry: path.join(__dirname, '../src/index.ts'),
      output: {
        path: path.join(__dirname, '../dist'),
        filename: outputFileName,
        // library: libraryName,
        libraryTarget: 'commonjs',
        // umdNamedDefine: true
      }
    });
}
