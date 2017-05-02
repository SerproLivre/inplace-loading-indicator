import { BuilderBase } from './builder-base';
import { ShellExecOptions } from './models/shell-exec-options';


export class UmdTypescriptBuilder extends BuilderBase {

  constructor(packagePath: string) {
    super(packagePath);
  }

  onRun() {
    this.installDependencies();
    this.tsLint();
    this.compileTs();
  }

  protected installDependencies() {

    this.shellExec(<ShellExecOptions>{
      command: 'yarn install',
      label: 'Installing dependencies...',
      okText: 'Dependencies installed. :thumbsup:',
      errorLabel: 'Error installing dependencies :thumbsdown:'
    });
  }
  protected compileTs() {
    this.shellExec(<ShellExecOptions>{
      command: 'tsc',
      label: 'Starting typescript compilation...',
      okText: 'Typescript build is OK. :thumbsup:',
      errorLabel: 'Error transpiling typescript :thumbsdown:'
    });
  }

  protected rollupFirstBuild() {

  }

  protected rollupConversion() {

  }

  protected   downlevelEs2015Es5() {

  }

  protected   minifyingWithUglify() {

  }

  protected  copyPackageAssets() {

  }

  protected tsLint() {
    this.shellExec(<ShellExecOptions>{
      command: 'tslint',
      label: 'checking code style and rules...',
      okText: 'Code style and rules is Ok. Good job! :thumbsup:',
      errorLabel: 'Error transpiling typescript :thumbsdown:'
    });
  }


}
