const path = require('path');
const fs = require('fs');

module.exports = {
  process(src, filename, config, options) {
      console.log('AQUI NO TRANSFORMERS...............................');
    let svgContent = fs.readFileSync(filename, 'utf-8');
     //return 'module.exports = ' + JSON.stringify(path.basename(filepath)) + ';';
    return 'module.exports = "' + svgContent + '";';
  },
};