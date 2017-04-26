"use strict";

/**
 * @pratico script
 * from https://github.com/robisim74/angular-library-starter
 */

require('shelljs/global');
const chalk = require('chalk');
const fs = require('fs');
const path = require('path');
const Template = require('template-js')

var program = require('commander');

let cmdName = null;

function checkProjectPath(pkg) {
  let projectRoot = exec('npm prefix').split('\n')[0]
  console.log('Project Root: ', projectRoot);
  let cjsProjectPath = path.join(projectRoot, 'packages/cjs', pkg);
  let umdProjectPath = path.join(projectRoot, 'packages/umd', pkg);
  if (fs.existsSync(cjsProjectPath)) {
    return cjsProjectPath;
  }
  if (fs.existsSync(umdProjectPath)) {
    return umdProjectPath;
  }
  echo(chalk.red(`Project does not exists`));
  process.exit(27);
}

program
  .version('0.0.1')
  .command('build [package]')
  .description("builds a project")
  .action((pkg, cmd) => {
    cmdName = cmd.name();
    let projectPath = checkProjectPath(pkg);
    echo(chalk.blue(`Project "${pkg}" exists`));
    build(projectPath);
  })

program.command('publish [package] [version]')
  .description('publish the package')
  .action((pkg, version, cmd) => {
    cmdName = cmd.name();
    let projectPath = checkProjectPath(pkg);
    echo(chalk.blue(`Project "${pkg}" exists`));
    publish(pkg, version, projectPath);
  });
program.parse(process.argv);


if (!cmdName) {
  program.help();
}

function publish(pkg, version, packagePath) {
  const MANAGE_VERSION_BINARY = path.resolve(__dirname, '../node_modules/.bin/manage-version');
  echo(`Publishing npm package: ${pkg}`);

  cd(path.join(packagePath, './dist'));

  echo(`Updating package minor version...`)

  if (exec(`${MANAGE_VERSION_BINARY} update patch`)) {
    /*if (!exec('npm whoami').code == 0) {
      console.log(chalk.red('Please, you need to login (npm login).'));
      process.exit(1);
    }*/
    let result = exec(`npm publish ./ --access public `)
    if (result.code == 0) {
      echo(chalk.green(`Package: ${pkg} published successfully`));
    } else {
      echo(chalk.red(`Error publishing "${pkg}": ${JSON.stringify(result)}`));
    }
  }
}

function build(packagePath) {
  if (packagePath.indexOf('umd') >= 0) {
    buildUmd(packagePath)
  } else {
    buildCjs(packagePath);
  }
}

function buildCjs(packagePath) {
  const PACKAGE_NAME = path.basename(packagePath);
  const TSC_BINARY = path.resolve(__dirname, '../node_modules/.bin/tsc');
  exec(`${TSC_BINARY} -P ${path.join(packagePath, 'tsconfig.json')} --outDir ${path.join(packagePath, 'dist/')}`)
}

function buildUmd(packagePath) {
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

  const ROLLUP_BINARY = path.resolve(__dirname, '../node_modules/.bin/rollup');
  const TSLINT_BINARY = path.resolve(__dirname, '../node_modules/.bin/tslint');
  const NGC_BINARY = path.resolve(__dirname, '../node_modules/.bin/ngc');
  const UGLIFY_BINARY = path.resolve(__dirname, '../node_modules/.bin/uglifyjs');
  const TSC_BINARY = path.resolve(__dirname, '../node_modules/.bin/tsc');

  console.log('ROLLUP BINARY', ROLLUP_BINARY);

  cd(packagePath);

  exec('yarn install');

  exec('echo "PWD: $PWD"');

  echo('Start building...');

  rm(`-Rf`, `${NPM_DIR}/*`);
  mkdir(`-p`, `${MODULES_DIR}`);
  mkdir(`-p`, `${BUNDLES_DIR}`);

  /* TSLint with Codelyzer */
  // https://github.com/palantir/tslint/blob/master/src/configs/recommended.ts
  // https://github.com/mgechev/codelyzer
  echo(`Start TSLint`);
  echo(`${TSLINT_BINARY} --project ${path.join(packagePath, './tsconfig.json')}`);
  exec(`${TSLINT_BINARY} --project ${path.join(packagePath, './tsconfig.json')}`);
  echo(chalk.green(`TSLint completed`));

  /* Aot compilation: ES2015 sources */
  echo(`Start AoT compilation`);
  //exec(`ngc -p tsconfig-build.json`);
  echo('AOT command:: ', `${NGC_BINARY} -p ${path.join(packagePath, 'src/tsconfig.aot.json')}`);
  exec(`${NGC_BINARY} -p ${path.join(packagePath, 'src/tsconfig.aot.json')}`);
  echo(chalk.green(`AoT compilation completed`));

  /* Creates bundles: ESM/ES5 and UMD bundles */
  echo(`Start bundling`);
  echo(`Rollup package`);
  exec(`${ROLLUP_BINARY} -i ${NPM_DIR}/index.js -o ${MODULES_DIR}/${PACKAGE}.js --sourcemap`, {
    silent: false
  });
  exec(`node ${path.join(__dirname, './map-sources')} -f ${MODULES_DIR}/${PACKAGE}.js`);

  echo(`Downleveling ES2015 to ESM/ES5`);
  cp(`${MODULES_DIR}/${PACKAGE}.js`, `${MODULES_DIR}/${PACKAGE}.es5.ts`);
  exec(`${TSC_BINARY} ${MODULES_DIR}/${PACKAGE}.es5.ts --target es5 --module es2015 --noLib --sourceMap`, {
    silent: false
  });
  exec(`node ${path.join(__dirname, './map-sources')} -f ${MODULES_DIR}/${PACKAGE}.es5.js`);
  rm(`-f`, `${MODULES_DIR}/${PACKAGE}.es5.ts`);

  echo(`Run Rollup conversion on package`);
  exec(`${ROLLUP_BINARY} -c rollup.config.js --sourcemap`, {
    silent: false
  });
  exec(`node ${path.join(__dirname, './map-sources')} -f ${BUNDLES_DIR}/${PACKAGE}.umd.js`);

  echo(`Minifying`);
  cd(`${BUNDLES_DIR}`);
  exec(`${UGLIFY_BINARY} -c --screw-ie8 --comments -o ${PACKAGE}.umd.min.js --source-map ${PACKAGE}.umd.min.js.map --source-map-include-sources ${PACKAGE}.umd.js`, {
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
