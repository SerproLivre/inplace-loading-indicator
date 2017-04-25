const path = require('path');
const getBuildConfig = require('../../common/build-config').getBuildConfig;
const webpackMerge = require('webpack-merge');
const webpackConfig = webpackMerge(
  getBuildConfig({
    outputFileName: 'pratico-rx-extensions.umd.js',
    libraryName: 'pratico.rx-extensions',
    entryFile: path.resolve(__dirname, './src/index.ts'),
    outputPath: path.resolve(__dirname, './dist'),
    tsConfigPath: path.resolve(__dirname, './src/tsconfig.umd.json')
  })/*,
  {
    dependencies: [
      path.join(__dirname, '../../node_modules')
    ],
    resolveLoader: {
      modules: [ path.resolve(__dirname, './node_modules'), path.resolve(__dirname, '../../node_modules') ]
    },
    resolve: {
      modules: [ path.join(__dirname, './node_modules'), path.join(__dirname, '../../node_modules') ]
    }
  }*/);


module.exports = webpackConfig;
