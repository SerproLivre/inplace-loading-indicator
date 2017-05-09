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
      global: true,
      label: 'Installing dependencies...',
      okText: 'Dependencies installed.',
      errorLabel: 'Error installing dependencies'
    });
  }
  private compileTs() {
    let tsConfigFilePath = path.join(this.packagePath, this.tsConfigPath);
    this.shellExec(<ShellExecOptions>{
      command: 'tsc',
      arguments: `-p ${tsConfigFilePath}`,
      label: 'Starting typescript compilation...',
      okText: 'Typescript build is OK.',
      errorLabel: 'Error transpiling typescript'
    });
  }

  private tsLint() {
    const tsLintConfigFilePath = path.join(this.packagePath, 'tslint.json');
    if (fs.existsSync(tsLintConfigFilePath)) {
      this.shellExec(<ShellExecOptions>{
        command: 'tslint',
        arguments: `-c ${tsLintConfigFilePath}`,
        label: 'checking code style and rules...',
        okText: 'Code style and rules is Ok. Good job!',
        errorLabel: 'Error checking code style'
      });
    }
  }


}
