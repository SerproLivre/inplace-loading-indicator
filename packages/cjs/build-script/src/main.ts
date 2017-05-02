#!/usr/bin/env node

/**
 * Pratico scripts allow to build npm typescript based packages both pure common-js and hybrid (cjs + umd)
 * @author Abner Oliveira
 * @license MIT
 */

"use strict";

/**
 * @pratico script
 * from https://github.com/robisim74/angular-library-starter
 */

import shelljs = require('shelljs');
import chalk = require('chalk');
// import fs = require('fs');
// import path = require('path');
// import Template = require('template-js');

// import figures | figures-colored
// titleize | humanize-string | root-check

// use autocomplete feature
// tabtab

// to check if it was called with sudo
// https://github.com/sindresorhus/root-check

// to find the closes npm package
// https://www.npmjs.com/package/read-pkg-up

// notifies user of a new update
// https://www.npmjs.com/package/update-notifier

// cli-box
// Draws boxes for command line application

// pad-component
// to use to place textx in the cli-box
import program = require('commander');
import { BuilderFactory } from "./builder-factory";

let cmdName = null;

program
  .version('0.0.1')
  .command('build [type]')
  .description('builds a project')
  .action((type, cmd) => {
    cmdName = cmd.name();
    let projectbuilder = BuilderFactory.getInstanceFor(type);
    shelljs.echo(chalk.blue(`Build Project: "Type > "${type}"`));
    projectbuilder.run();
  });

program.parse(process.argv);

if (!cmdName) {
  shelljs.echo('No Pratico command specified!');
  program.help();
}
