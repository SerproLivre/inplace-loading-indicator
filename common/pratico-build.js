"use strict";

/**
 *
 * Builds a package of @pratico
 * from https://github.com/robisim74/angular-library-starter
 */

require('shelljs/global');
const chalk = require('chalk');
const fs = require('fs');
const path = require('path');
const Template = require('template-js')

var program = require('commander');

program
  .version('0.0.1')
  .command('build [package]')
  .action((pkg, cmd) => {
    let projectPath = path.join(process.cwd(), pkg);
    if (!fs.existsSync(projectPath)) {
      echo(chalk.red(`Project does not exists`));
      process.exit(27);
    }
    echo(chalk.blue(`Project exists`));
    build(projectPath);
  })

program.parse(process.argv);





function build(packagePath) {


  const PACKAGE_NAME = path.basename(packagePath);
  const PACKAGE_PREFIX = 'pratico.'
  const PACKAGE = `${PACKAGE_PREFIX}${PACKAGE_NAME}`;
  const NPM_DIR = `dist`;
  const MODULES_DIR = `${packagePath}/${NPM_DIR}/modules`;
  const BUNDLES_DIR = `${packagePath}/${NPM_DIR}/bundles`;

  const ROLLUP_CONFIG_FOR_PACKAGE = path.resolve(packagePath, 'rollup.config.js');
  if (!fs.existsSync(ROLLUP_CONFIG_FOR_PACKAGE)) {
    var rollupConfigContent = new Template(path.resolve(__dirname, 'rollup.config.js.tmpl'), {
      packageName: PACKAGE_NAME
    });
    echo('Writing rollup file for package: ', rollupConfigContent.toString());
    fs.writeFileSync(ROLLUP_CONFIG_FOR_PACKAGE, rollupConfigContent.toString(), 'utf8');
  }

  cd(packagePath);


  exec('echo "PWD: $PWD"');

  echo('Start building...');

  rm(`-Rf`, `${NPM_DIR}/*`);
  mkdir(`-p`, `${MODULES_DIR}`);
  mkdir(`-p`, `${BUNDLES_DIR}`);

  /* TSLint with Codelyzer */
  // https://github.com/palantir/tslint/blob/master/src/configs/recommended.ts
  // https://github.com/mgechev/codelyzer
  echo(`Start TSLint`);
  exec(`tslint --project ./tsconfig.json --type-check ./src/**/*.ts`);
  echo(chalk.green(`TSLint completed`));

  /* Aot compilation: ES2015 sources */
  echo(`Start AoT compilation`);
  //exec(`ngc -p tsconfig-build.json`);
  exec(`ngc -p ${path.join(packagePath, 'src/tsconfig.aot.json')}`);
  echo(chalk.green(`AoT compilation completed`));

  /* Creates bundles: ESM/ES5 and UMD bundles */
  echo(`Start bundling`);
  echo(`Rollup package`);
  exec(`rollup -i ${NPM_DIR}/index.js -o ${MODULES_DIR}/${PACKAGE}.js --sourcemap`, {
    silent: false
  });
  exec(`node ${path.join(__dirname, './map-sources')} -f ${MODULES_DIR}/${PACKAGE}.js`);

  echo(`Downleveling ES2015 to ESM/ES5`);
  cp(`${MODULES_DIR}/${PACKAGE}.js`, `${MODULES_DIR}/${PACKAGE}.es5.ts`);
  exec(`tsc ${MODULES_DIR}/${PACKAGE}.es5.ts --target es5 --module es2015 --noLib --sourceMap`, {
    silent: false
  });
  exec(`node ${path.join(__dirname, './map-sources')} -f ${MODULES_DIR}/${PACKAGE}.es5.js`);
  rm(`-f`, `${MODULES_DIR}/${PACKAGE}.es5.ts`);

  echo(`Run Rollup conversion on package`);
  exec(`rollup -c rollup.config.js --sourcemap`, {
    silent: false
  });
  exec(`node ${path.join(__dirname, './map-sources')} -f ${BUNDLES_DIR}/${PACKAGE}.umd.js`);

  echo(`Minifying`);
  cd(`${BUNDLES_DIR}`);
  exec(`uglifyjs -c --screw-ie8 --comments -o ${PACKAGE}.umd.min.js --source-map ${PACKAGE}.umd.min.js.map --source-map-include-sources ${PACKAGE}.umd.js`, {
    silent: false
  });
  exec(`node ${path.join(__dirname, './map-sources')} -f ${PACKAGE}.umd.min.js`);
  cd(`..`);
  cd(`..`);

  echo(chalk.green(`Bundling completed`));

  rm(`-Rf`, `${NPM_DIR}/*.js`);
  rm(`-Rf`, `${NPM_DIR}/*.js.map`);
  rm(`-Rf`, `${NPM_DIR}/src/**/*.js`);
  rm(`-Rf`, `${NPM_DIR}/src/**/*.js.map`);
  rm(`-Rf`, `${NPM_DIR}/node_modules`);

  cp(`-Rf`, [`package.json`, `LICENSE`, `README.md`], `${NPM_DIR}`);

  echo(chalk.green(`End building`));
}
