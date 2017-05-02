import path = require('path');
import fs = require('fs');

import { BuilderBase } from './builder-base';
import { ShellExecOptions } from './models/shell-exec-options';

/**
 *
 */
export class CjsTypescriptBuilder extends BuilderBase {

  constructor(packagePath: string) {
    super(packagePath);
  }

  onRun() {
    this.installDependencies();
    this.tsLint();
    this.compileTs();
  }

  private installDependencies() {

    this.shellExec(<ShellExecOptions>{
      command: 'yarn install',
      label: 'Installing dependencies...',
      okText: 'Dependencies installed.',
      errorLabel: 'Error installing dependencies'
    });
  }
  private compileTs() {
    this.shellExec(<ShellExecOptions>{
      command: `${path.join(this.packagePath, 'node_modules/.bin/tsc')} -p ${path.join(this.packagePath, this.tsConfigPath)}`,
      label: 'Starting typescript compilation...',
      okText: 'Typescript build is OK.',
      errorLabel: 'Error transpiling typescript'
    });
  }

  private tsLint() {
    if (fs.existsSync(path.join(this.packagePath, 'tslint.json'))) {
      this.shellExec(<ShellExecOptions>{
        command: `${path.join(this.packagePath, 'node_modules/.bin/tslint')}`,
        label: 'checking code style and rules...',
        okText: 'Code style and rules is Ok. Good job!',
        errorLabel: 'Error checking code style'
      });
    }
  }


}
