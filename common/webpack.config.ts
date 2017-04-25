import { getBuildConfig} from './build-config';
import path = require('path');
export default getBuildConfig('pratico-ngx.umd.js', 'PraticoNgx', path.join(__dirname, '../src/index.ts'));
