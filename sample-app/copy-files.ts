#!/usr/bin/env ../node_modules/.bin/ts-node
const path = require('path');
const fs = require('fs');
const shelljs = require('shelljs');

const NPM_DIR = path.join(__dirname, '../node_modules');
const DIST_DIR = path.join(__dirname, '../dist');
const CURRENT_PATH = path.join(__dirname, './');


const resources = {
  'monaco-editor': {
    target: path.join(NPM_DIR, 'monaco-editor/min'),
    destination: path.join(CURRENT_PATH, 'assets/monaco'),
    recursive: true
  },
  'library-file': {
    target: path.join(DIST_DIR, 'ngx-pratico.umd.js'),
    destination: path.join(CURRENT_PATH, 'assets/')
  },
  // 'typings': {
  //   target: path.join(NPM_DIR, '@types'),
  //   destination: path.join(CURRENT_PATH, 'assets/'),
  //   recursive: true
  // }
};

Object.keys(resources).forEach(fileKey => {
  const copyConfig = resources[fileKey];
  if (copyConfig.recursive) {
    shelljs.cp('-r', copyConfig.target, copyConfig.destination);
  } else {
    shelljs.cp(copyConfig.target, copyConfig.destination);
  }
});

//shelljs.cp(path.join(DIST_DIR, 'ngx-pratico.umd.js'), path.join(CURRENT_PATH, 'js/'));
