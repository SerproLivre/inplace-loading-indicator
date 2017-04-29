import { ShellExecOptions } from './models/shell-exec-options';
import { ShellExecError } from './models/shell-exec-error';
import { ScriptBase } from './script-base';
import shelljs = require('shelljs');
import path = require('path');
import chalk = require('chalk');

export class PublishNpm extends ScriptBase {

  constructor(packagePath: string) {
    super(packagePath);
    this.abortIfNotValid();
  }

  run() {

  }
}
