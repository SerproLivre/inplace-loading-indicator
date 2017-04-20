// see issue https://github.com/AngularClass/angular2-webpack-starter/issues/709
// import 'core-js/es6/promise';

console.log('RUNNING HERER --------------------------------------');

var fs = require('fs');
var path = require('path');
var requireHacker = require('require-hacker');

requireHacker.hook('svg', path => `module.exports = '${path}'`);

require.extensions['.svg'] = function(module, filepath) {
  console.log('REQUIRE SVG __________________________________________');

  // SEE https://github.com/chrismendis/inline-svg-register
  return 'module.exports = ' + JSON.stringify(path.basename(filepath)) + ';';

}

let ball = require('../src/icons/ball.svg');

console.log('BAL:::: ', ball);

import 'core-js/es7/reflect';

// won't be necessary after merge this pull request https://github.com/angular/zone.js/pull/711
import './patched-zone';
// import 'zone.js/dist/zone';

import 'zone.js/dist/long-stack-trace-zone';
import 'zone.js/dist/proxy.js';
import 'zone.js/dist/sync-test';
import 'zone.js/dist/jasmine-patch';
import 'zone.js/dist/async-test';
import 'zone.js/dist/fake-async-test';
import {
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting
} from '@angular/platform-browser-dynamic/testing';

import { TestBed } from '@angular/core/testing';

global['preparedTetsts'] = false;


if (!global['preparedTetsts'] && ! process.env.UNIT_TESTS) {
  global['preparedTetsts'] = true;

  beforeEach(() => {
    TestBed.initTestEnvironment(BrowserDynamicTestingModule, platformBrowserDynamicTesting());
  });

  afterEach(() => {
    TestBed.resetTestEnvironment();
  });
}

