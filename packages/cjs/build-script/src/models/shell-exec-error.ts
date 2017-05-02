import { ShellExecOptions } from './shell-exec-options';

import shelljs = require('shelljs');
export class ShellExecError implements Error {
  name = 'ShellExecError';
  constructor(public message: string, public shellExecOptions: ShellExecOptions, public result: shelljs.ExecOutputReturnValue) {

  }
}
