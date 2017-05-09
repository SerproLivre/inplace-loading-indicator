
/**
 * Defines the options passed to a shellExec method of @class BuilderBase
 *
 * @export
 * @class ShellExecOptions
 */
export class ShellExecOptions {
  /**
   * The command to be executed
   *
   * @type {string}
   * @memberOf ShellExecOptions
   */
  command: string;

  abortOnError?: boolean = true;

  arguments?: string;

  global?: boolean = false;
  /**
   * The label which will be exhibited in the command line
   *
   * @type {string}
   * @memberOf ShellExecOptions
   */
  label: string;
  /**
   * The text which will be exhibited in case of successfull execution
   *
   * @type {string}
   * @memberOf ShellExecOptions
   */
  okText: string;
  /**
   * Does this command should be executed silently?
   *
   *
   * @memberOf ShellExecOptions
   */
  silent?= true;
  /**
   * The label which will be exhibited in case of error
   *
   * @type {string}
   * @memberOf ShellExecOptions
   */
  errorLabel?: string;
  /**
   * Does the error details should be exhibited?
   *
   *
   * @memberOf ShellExecOptions
   */
  showErrorDetail?= true;
}
