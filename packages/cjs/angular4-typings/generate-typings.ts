import shelljs = require('shelljs');
import chalk = require('chalk');
import path = require('path');
import fs = require('fs');

import replace = require('replace-in-file');

import { createIndex } from './create-index';

console.log('Started to generate bundles');

const ROOT_DIR = __dirname;

const DTS_BUNDLE_BINARY = path.resolve(ROOT_DIR, '../../../node_modules/.bin/dts-bundle');

const TYPINGS_SOURCE = path.resolve(ROOT_DIR, 'typings-source');

const indexFilesGenerated: string[] = [];

const exportExpressionsTemp: string[] = [];
const exportExpressionsFinal: string[] = [];

interface DtsBundleResult {
  ok: boolean;
  error?: string;
}


// ['common', 'platform-browser', 'platform-browser-dynamic', 'core', 'forms', 'http', 'router', 'compiler']
['core'].forEach((packageName) => {
  const bundleResult = generateDtsBundle(packageName);
  if (!bundleResult.ok) {
    cleanIndexesCreated();
    process.abort();
  }
  cleanIndexesCreated();
});

function cleanIndexesCreated() {
  indexFilesGenerated.forEach((file) => {
    shelljs.rm(file);
  });
}


function generateDtsBundle(packageName: string): DtsBundleResult {
  const bundleName = `angular-${packageName}.d.ts`;
  const outputFileName =  `${ROOT_DIR}/typings/${bundleName}`;
  const packageDirectory = `${TYPINGS_SOURCE}/${packageName}/package/src/`;
  const mainDefinitionFile = `${packageDirectory}/${packageName}.d.ts`;
  const cmd = `${DTS_BUNDLE_BINARY} --name "@angular/${packageName}" \
--main ${mainDefinitionFile} \
--baseDir ${TYPINGS_SOURCE}/${packageName}/package/src/ \
--out ${outputFileName}`;


  if (!fs.existsSync(mainDefinitionFile)) {
    downloadPackage(packageName);
  }

  const scriptResult = <shelljs.ExecOutputReturnValue>shelljs.exec(cmd, { silent: true });

  if (!fs.existsSync(mainDefinitionFile)) {
    shelljs.echo(`Main definition file is missing: "${mainDefinitionFile}"`);
    process.exit(27);
  }

  if (scriptResult.code === 0) {
    shelljs.echo(chalk.green(`Successfuly created bundle "${bundleName}" on file "${outputFileName}"`));
    const changedFiles = replace.sync({
      files: [ outputFileName ],
      from: exportExpressionsTemp,
      to: exportExpressionsFinal
    });
    console.log('CHANGED FILES: ', JSON.stringify(changedFiles, null, '\t'));
    return { ok: true };
  } else {
    handleDtsBundleError(packageName, packageDirectory, scriptResult.stdout, scriptResult.stderr);
    return generateDtsBundle(packageName);
  }
}

function handleDtsBundleError(packageName: string, packageDirectory: string, stdout: string, stderr: string) {
  const MISSING_INDEX_REGEXP = /Error: ENOENT: no such file or directory, open '(.+)\/([^/]+)'/;
  const matchResult = MISSING_INDEX_REGEXP.exec(stdout) || MISSING_INDEX_REGEXP.exec(stderr);
  if (matchResult) {
    const directoryWithMissingIndex = matchResult[1];
    shelljs.echo('MISSING INDEX IN DIRECTORY: ', directoryWithMissingIndex);
    try {
      indexFilesGenerated.push(path.join(directoryWithMissingIndex, 'index.d.ts'));
      const createIndexResult = createIndex(directoryWithMissingIndex, packageDirectory);
      exportExpressionsTemp.concat(createIndexResult.temp);
      exportExpressionsFinal.concat(createIndexResult.final);
    } catch (e) {
      shelljs.echo(chalk.red(`Failed to create index to directory: "${directoryWithMissingIndex}"`));
      process.exit(27);
    }
  } else {
    shelljs.echo(chalk.red(`Failed to generate dts-bundle for Package: ${packageName}\n${stdout}\n${stderr}`))
    process.exit(0);
  }
}


function downloadPackage(packageName) {
  const result = <shelljs.ExecOutputReturnValue>shelljs.exec(`  mkdir -p typings-source/${packageName} && \
curl https://registry.npmjs.org/@angular/${packageName}/-/${packageName}-4.1.0.tgz |  tar -xzv -C typings-source/${packageName}`,
    { silent: true });
  if (result.code !== 0) {
    shelljs.echo(chalk.red(`Failed to download tar.gz from npm for package "${packageName}"\n${result.stderr}`));
    process.exit(27);
  }
}
