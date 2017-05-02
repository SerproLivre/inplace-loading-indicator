import { ShellExecOptions } from './models/shell-exec-options';
import { ScriptBase } from './script-base';
import shelljs = require('shelljs');
import path = require('path');


export interface Builder {
  run();
}

export abstract class BuilderBase extends ScriptBase implements Builder  {

  protected packagePathVeryfied = false;
  packageJsonVeryfied = false;
  tsconfigVeryfied = false;
  tsConfigPath: string;

  constructor(packagePath: string) {
    super(packagePath);
  }

  getDistDirectory() {
    return path.join(this.packagePath, '/dist');
  }

  verifyPackage() {
    super.verifyPackage();
    debugger;
    this.tsconfigVeryfied = shelljs.test('-f', path.join(this.packagePath, 'tsconfig.json'));

    if (this.tsconfigVeryfied) {
      this.tsConfigPath = './';
    } else {
      this.tsconfigVeryfied = shelljs.test('-f', path.join(this.packagePath, 'src/tsconfig.json'));
      this.tsConfigPath = './src';
    }
  }

  protected isValid() {
    return super.isValid() && this.tsconfigVeryfied;
  }

  run() {
    this.cleanDist();
    super.run();
  }

  private cleanDist() {
    this.shellExec(<ShellExecOptions>{
      command: `${path.join(this.packagePath, './node_modules/.bin/rimraf')} ${this.getDistDirectory()}`,
      label: 'Removing dist folder...',
      okText: 'Dist directory removed.',
      errorLabel: 'Error removing dist folder.'
    });
  }


}
