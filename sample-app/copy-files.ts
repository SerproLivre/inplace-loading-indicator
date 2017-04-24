const path = require('path');
const fs = require('fs');
const shelljs = require('shelljs');

const NPM_DIR = path.join(__dirname, '../node_modules');
// const DIST_DIR = path.join(__dirname, '../dist');
const CURRENT_PATH = path.join(__dirname, './');


const resources = {
  'monaco-editor': {
    target: path.join(NPM_DIR, 'monaco-editor/min/vs'),
    destination: path.join(CURRENT_PATH, 'assets/monaco'),
    recursive: true
  }
  // 'typings': {
  //   target: path.join(NPM_DIR, '@types'),
  //   destination: path.join(CURRENT_PATH, 'assets/'),
  //   recursive: true
  // }
};

Object.keys(resources).forEach(fileKey => {
  const copyConfig = resources[fileKey];
  if (! fs.existsSync(copyConfig.destination)) {
    shelljs.mkdir('-p', copyConfig.destination);
  }
  if (copyConfig.recursive) {
    shelljs.cp('-r', copyConfig.target, copyConfig.destination);
  } else {
    shelljs.cp(copyConfig.target, copyConfig.destination);
  }
});

//shelljs.cp(path.join(DIST_DIR, 'ngx-pratico.umd.js'), path.join(CURRENT_PATH, 'js/'));
