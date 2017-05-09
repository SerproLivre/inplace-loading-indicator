import { ShellExecOptions } from './models/shell-exec-options';
import { ShellExecError } from './models/shell-exec-error';
import shelljs = require('shelljs');
import path = require('path');
import chalk = require('chalk');


/**
 * Base class for pratico web command line scripts
 *
 * @export
 * @abstract
 * @class ScriptBase
 */
export abstract class ScriptBase {

  protected packageName = '';
  protected packagePathVeryfied = false;
  packageJsonVeryfied = false;

  /**
   * The packagePath should be informed if it is not the current path, but a subdirectory in the packages path
   * @param {string} packagePath
   *
   * @memberOf ScriptBase
   */
  constructor(protected packagePath?: string) {
    this.packageName = path.basename(packagePath);
    this.abortIfNotValid();
  }

  /**
   * Returns the home directory path
   *
   * @returns
   *
   * @memberOf ScriptBase
   */
  getOsHomeDir() {
    return process.env[(process.platform == 'win32') ? 'USERPROFILE' : 'HOME'];

  }

  /**
   * Returns the dist directory path
   *
   * @returns
   *
   * @memberOf ScriptBase
   */
  getDistDirectory() {
    return path.join(this.packagePath, '/dist');
  }

  /**
   * Runs the script class. Classes which extends this class should implement the abstract method onRun
   *
   * @param {...any[]} args
   *
   * @memberOf ScriptBase
  */
  public run(...args: any[]) {
    try {
      shelljs.cd(this.packagePath);
      this.onRun(...args);
    } catch (e) {
      this.handleError(e);
    }
  }

  protected abstract onRun(...args: any[]);

  /**
   *  executes an shell command
   *
   * @protected
   * @param {ShellExecOptions} options
   * @returns
   *
   * @memberOf ScriptBase
   */
  protected shellExec(options: ShellExecOptions) {
    let command = options.global ? options.command : `${this.getCommandPath(options.command)}`;
    if (options.arguments) {
      command = `${command} ${options.arguments}`;
    }
    shelljs.echo(chalk.blue(options.label));
    console.log(`COMMAND: ${command}`);
    const result = <shelljs.ExecOutputReturnValue>shelljs.exec(command, { silent: options.silent });
    if (result.code !== 0) {
      if (options.abortOnError) {
      throw new ShellExecError((options.errorLabel ? options.errorLabel : `Error executing command ${command}`), options, result);
      }
    }
    shelljs.echo(chalk.green(options.okText));
    return result;
  }


  /**
   * Validates the packagePath, checking it is actual a directory and if it has a package.json
   *
   * @protected
   *
   * @memberOf ScriptBase
   */
  protected validatePackagePath() {
    this.packagePathVeryfied = shelljs.test('-d', this.packagePath);
  }

  protected resolvePackageDistFile(filePath: string) {
    return path.join(this.packagePath, 'dist', filePath);
  }

  protected resolvePackageFile(filePath: string) {
    return path.join(this.packagePath, filePath);
  }

  /**
   * Validates the package path checking it it is actual a npm package directory
   *
   *
   * @memberOf ScriptBase
   */
  verifyPackage() {
    this.packagePathVeryfied = shelljs.test('-d', this.packagePath);
    this.packageJsonVeryfied = shelljs.test('-f', path.join(this.packagePath, 'package.json'));
  }

  checkFile(filePath: string) {
    return shelljs.test('-f', filePath);
  }

  checDirectory(directoryPath: string) {
    return shelljs.test('-d', directoryPath);
  }

  /**
   *
   * Throws an error if it is not a node package path
   *
   * @memberOf ScriptBase
   */
  abortIfNotValid() {
    this.verifyPackage();
    if (!this.isValid()) {
      throw new Error(this.getNonValidMessage());
    }
  }

  protected resolveScriptBuildPath(filePath: string) {
    return path.join(__dirname, '../', filePath);
  }

  protected getCommandPath(command: string): string {
    return this.resolveScriptBuildPath(`./node_modules/.bin/${command}`);
  }

  protected getNonValidMessage() {
    return `The path "${this.packagePath}" is not a valid package:
          package folder => [ ${ this.packagePathVeryfied ? 'OK' : 'MISSING'} ]
          package.json   => [ ${ this.packageJsonVeryfied ? 'OK' : 'MISSING'} ]
      `;
  }

  protected handleError(e: ShellExecError | Error) {
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

  protected isValid() {
    return this.packagePathVeryfied && this.packageJsonVeryfied;
  }
}
