import { ShellExecOptions } from './models/shell-exec-options';
import { ShellExecError } from './models/shell-exec-error';
import { ScriptBase } from './script-base';
import shelljs = require('shelljs');
import path = require('path');
import chalk = require('chalk');
export abstract class BuilderBase extends ScriptBase {

  protected packagePathVeryfied = false;
  packageJsonVeryfied = false;
  tsconfigVeryfied = false;

  constructor(packagePath: string) {
    super(packagePath);
  }

  getDistDirectory() {
    return path.join(this.packagePath, '/dist');
  }

  verifyPackage() {
    super.verifyPackage();
    this.tsconfigVeryfied = shelljs.test('-f', path.join(this.packagePath, 'tsconfig.json'));
  }

  protected isValid() {
    return super.isValid() && this.tsconfigVeryfied;
  }

  protected run() {
    this.cleanDist();
    super.run();
  }

  private cleanDist() {
    this.shellExec(<ShellExecOptions>{
      command: `rimraf ${this.getDistDirectory()}`,
      label: 'Removing dist folder...',
      okText: 'Dist directory remomved. :thumbsup:',
      errorLabel: 'Error removing dist folder :thumbsdown:'
    });
  }


}
