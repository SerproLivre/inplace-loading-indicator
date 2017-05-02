import { ScriptBase } from './script-base';


export class PublishNpm extends ScriptBase {

  constructor(packagePath: string) {
    super(packagePath);
    this.abortIfNotValid();
  }

  onRun() {
    console.log('Publishing the package...');
  }
}
