

import readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});



import shelljs = require('shelljs');
import path = require('path');

const writePkg: any = require('write-pkg');

(function (s) {
  s.cd('../../');
  const projectRootPath = s.exec('npm prefix').stdout.split('\n')[0];
  setupPackageJson(projectRootPath);
  s.cp('-r', path.join(__dirname, 'test'), path.join(projectRootPath, 'test'));
})(shelljs);


function setupPackageJson(projectPath: any) {
  const jestConfig = require('./jest/config.json');
  writePkg(projectPath, jestConfig);
}

function copyTemplateFiles() {

}
