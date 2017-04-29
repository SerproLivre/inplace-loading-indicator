import { BuilderBase } from './builder-base';
import { ShellExecOptions } from './models/shell-exec-options';
import program = require('commander');
import path = require('path');
import shelljs = require('shelljs');

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
      okText: 'Dependencies installed. :thumbsup:',
      errorLabel: 'Error installing dependencies :thumbsdown:'
    });
  }
  private compileTs() {
    this.shellExec(<ShellExecOptions>{
      command: 'tsc',
      label: 'Starting typescript compilation...',
      okText: 'Typescript build is OK. :thumbsup:',
      errorLabel: 'Error transpiling typescript :thumbsdown:'
    });
  }

  private tsLint() {
    this.shellExec(<ShellExecOptions>{
      command: 'tslint',
      label: 'checking code style and rules...',
      okText: 'Code style and rules is Ok. Good job! :thumbsup:',
      errorLabel: 'Error transpiling typescript :thumbsdown:'
    });
  }


}
