import { ShellExecOptions } from './models/shell-exec-options';
import { ShellExecError } from './models/shell-exec-error';
import shelljs = require('shelljs');
import path = require('path');
import chalk = require('chalk');
export abstract class BuilderBase {

  protected packagePathVeryfied = false;
  packageJsonVeryfied = false;
  tsconfigVeryfied = false;

  constructor(protected packagePath: string) {

  }

  getDistDirectory() {
    return path.join(this.packagePath, '/dist');
  }

  abstract onBuild(...args: any[]);

  public build(...args: any[]) {
    try {
      this.validate();
      shelljs.cd(this.packagePath);
      this.cleanDist();
      this.onBuild(...args);
    } catch (e) {
      this.handleError(e);
    }
  }

  protected shellExec(options: ShellExecOptions) {
    shelljs.echo(chalk.blue(options.label));
    const result = <shelljs.ExecOutputReturnValue>shelljs.exec(options.command, { silent: options.silent });
    if (result.code !== 0) {
      throw new ShellExecError((options.errorLabel ? options.errorLabel : `Error executing command ${options.command}`), options, result);
    }
    shelljs.echo(chalk.green(options.okText));
    return result;
  }



  protected validatePackagePath() {
    this.packagePathVeryfied = shelljs.test('-d', this.packagePath);
  }

  validate() {
    this.packagePathVeryfied = shelljs.test('-d', this.packagePath);
    this.packageJsonVeryfied = shelljs.test('-f', path.join(this.packagePath, 'package.json'));
    this.tsconfigVeryfied = shelljs.test('-f', path.join(this.packagePath, 'tsconfig.json'));
    if (!this.isValid()) {
      throw new Error(`The package is not ready for build:
          package folder => [ ${ this.packagePathVeryfied ? 'OK' : 'MISSING'} ]
          package.json   => [ ${ this.packageJsonVeryfied ? 'OK' : 'MISSING'} ]
          tsconfig.json  => [ ${ this.tsconfigVeryfied ? 'OK' : 'MISSING'} ]
      `);
    }
  }

  private cleanDist() {
    this.shellExec(<ShellExecOptions>{
      command: `rimraf ${this.getDistDirectory()}`,
      label: 'Removing dist folder...',
      okText: 'Dist directory remomved. :thumbsup:',
      errorLabel: 'Error removing dist folder :thumbsdown:'
    });
  }
  private handleError(e: ShellExecError | Error) {
    if (e instanceof ShellExecError) {
      shelljs.echo(chalk.red(e.message));
      if (e.shellExecOptions.showErrorDetail) {
        shelljs.echo('Error details: \n');
        shelljs.echo(`Error code: ${e.result.code}\n${e.result.stdout}\n${e.result.stderr}`);
      }
    } else {
      shelljs.echo(e.message);
      shelljs.echo('Error details: \n');
      shelljs.echo(chalk.red(e.stack));
    }
  }

  private isValid() {
    return this.packagePathVeryfied && this.packageJsonVeryfied && this.tsconfigVeryfied;
  }
}
