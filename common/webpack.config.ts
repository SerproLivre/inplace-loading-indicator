import { getBuildConfig} from './build-config';
import path = require('path');
export default getBuildConfig({
  outputFileName: 'pratico-ngx.umd.js',
  libraryName: 'PraticoNgx',
  entryFile: path.join(__dirname, '../src/index.ts'),
  outputPath: path.join(__dirname, '../dist'),
  tsConfigPath: path.join(__dirname, '../tsconfig.json')
});
