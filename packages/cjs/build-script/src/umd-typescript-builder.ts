import * as path from 'path';
import * as chalk from 'chalk';
import * as shelljs from 'shelljs';
import * as fs from 'fs';
const Template = require('template-js')

import { BuilderBase } from './builder-base';
import { ShellExecOptions } from './models/shell-exec-options';

const PACKAGE_PREFIX = 'pratico'

export class UmdTypescriptBuilder extends BuilderBase {


  constructor(packagePath: string) {
    super(packagePath);
  }

  onRun() {
    this.createDirs();
    this.installDependencies();
    this.tsLint();
    this.compileAot();
    this.rollupBuildEs2015();
    this.downlevelEs2015Es5();
    this.rollupConversion();
    this.minifyingWithUglify();
    this.copyPackageAssets();
  }

  protected createDirs() {
    shelljs.mkdir('-p', this.resolvePackageDistFile('modules'));
    shelljs.mkdir('-p', this.resolvePackageDistFile('bundles'));
  }

  protected packageDistFileName() {
    return `${PACKAGE_PREFIX}.${this.packageName}`;
  }

  protected installDependencies() {

    this.shellExec(<ShellExecOptions>{
      command: 'yarn install',
      global: true,
      label: 'Installing dependencies...',
      okText: 'Dependencies installed.',
      errorLabel: 'Error installing dependencies'
    });
  }

  protected compileTs() {
    this.shellExec(<ShellExecOptions>{
      command: 'tsc',
      label: 'Starting typescript compilation...',
      okText: 'Typescript build is OK.',
      errorLabel: 'Error transpiling typescript'
    });
  }

  protected compileAot() {
    const tsConfitAotFilePath = this.resolvePackageFile('tsconfig.aot.json');
    this.shellExec(<ShellExecOptions>{
      command: 'ngc',
      arguments: `-p ${tsConfitAotFilePath}`,
      label: 'Starting Typescript/AOT build...',
      okText: 'Typescript/AOT Build is OK.',
      errorLabel: 'Error compiling Typescript/AOT'
    });
  }


  protected getRollupConfigFileName() {
    return this.resolvePackageFile('rollup.config.js');
  }

  protected generateRollupConfigFile() {

    if (!this.checkFile(this.getRollupConfigFileName())) {
      var rollupConfigContent = new Template(path.resolve(__dirname, '../templates/rollup.config.js.tmpl'), {
        packageName: this.packageName
      });
      shelljs.echo(chalk.yellow('Writing rollup file for package: ', rollupConfigContent.toString()));
      fs.writeFileSync(this.getRollupConfigFileName(), rollupConfigContent.toString(), 'utf8');
    }
  }

  protected getDistFileBaseName(pathPrefix: string = '', extension = null) {
    return this.resolvePackageDistFile(pathPrefix + this.packageDistFileName()) + (extension ? extension : '');
  }

  protected getEs2015DistFileName(pathPrefix: string = '') {
    return this.getDistFileBaseName(pathPrefix, '.js');
  }

  protected rollupBuildEs2015() {
    this.generateRollupConfigFile();
    this.shellExec(<ShellExecOptions>{
      command: 'rollup',
      arguments: `-i ${this.resolvePackageDistFile('index.js')} -o ${this.getEs2015DistFileName('modules/')} --sourcemap`,
      label: 'Starting Rollup build...',
      okText: 'Rollup Build is OK.',
      errorLabel: 'Error building with rollup'
    });
    this.runSorcery(this.getEs2015DistFileName('modules/'));
  }

  protected runSorcery(fileToReadSourceMap: string) {
    this.shellExec(<ShellExecOptions>{
      label: `Running sorcery in file ${fileToReadSourceMap}`,
      command: 'node',
      arguments: `${this.resolveScriptBuildPath('scripts/map-sources.js')} -f ${fileToReadSourceMap}`,
      global: true
    })
  }



  protected downlevelEs2015Es5() {
    const pacakgeDistFileAsEs5Ts = this.getDistFileBaseName('modules/','.es5.ts');
    const pacakgeDistFileAsEs5Js = this.getDistFileBaseName('modules/','.es5.js');
    shelljs.cp(`${this.getEs2015DistFileName('modules/',)}`, pacakgeDistFileAsEs5Ts);
    this.shellExec(<ShellExecOptions>{
      command: 'tsc',
      arguments: `${pacakgeDistFileAsEs5Ts} --target es5 --module es2015 --noLib --sourceMap || echo 1`,
      label: 'Downleveling from Es2015 to Es5...',
      abortOnError: false,
      silent: true,
      okText: '.es5.js file generated successfully.',
      errorLabel: 'Failed to generate es5 file.'
    });
    this.runSorcery(pacakgeDistFileAsEs5Js);
  }

  protected rollupConversion() {
    this.shellExec(<ShellExecOptions>{
      command: 'rollup',
      abortOnError: false,
      silent: true,
      arguments: `-c ${this.getRollupConfigFileName()} --sourcemap`,
      label: 'Converting from Es5 to umd...',
      okText: '.umd.js file generated successfully.',
      errorLabel: 'Failed to generate umd file.'
    });
    this.runSorcery(this.getDistFileBaseName('.umd.js'));
  }

  protected minifyingWithUglify() {
    this.shellExec(<ShellExecOptions>{
      command: 'uglifyjs',
      arguments: `-c --screw-ie8 --coments -o ${this.getDistFileBaseName('bundles/','.umd.min.js')} --source-map ${this.getDistFileBaseName('bundles/','.umd.min.map.js')} \
      --source-map-include-sources ${this.getDistFileBaseName('bundles/', '.umd.js')}
      `,
      label: 'Converting from Es5 to umd...',
      okText: '.umd.js file generated successfully.',
      errorLabel: 'Failed to generate umd file.'
    });
    this.runSorcery(this.getDistFileBaseName('bundles/', '.umd.min.js'));
  }

  protected copyPackageAssets() {
    shelljs.cp('-Rf', [
      this.resolvePackageFile('package.json'),
      this.resolvePackageFile('README.md'),
      this.resolvePackageFile('LICENSE')
    ], this.resolvePackageFile(''));
  }

  protected tsLint() {
    const tslintConfigPath = path.join(this.packagePath, 'tslint.json');
    if (this.checkFile(tslintConfigPath)) {
      this.shellExec(<ShellExecOptions>{
        command: `${this.getCommandPath('tslint')} -c ${tslintConfigPath}`,
        label: 'checking code style and rules...',
        okText: 'Code style and rules is Ok. Good job!',
        errorLabel: 'Error transpiling typescript'
      });
    }
  }


}
