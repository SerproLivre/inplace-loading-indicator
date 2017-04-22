import { Injectable } from '@angular/core';


export const TEMPLATE_SCRIPT = `let a = 1;
let p = new Promise((resolve, reject) => {
  setTimeout(() => resolve(), 3000);
});`;
/**
 * Provides access to source code to be displayed on CodeEditor
 *
 * @export
 * @class PraticoCodeManager
 */
@Injectable()
export class CodeManager {
  getCode(path: string) {
    return TEMPLATE_SCRIPT;
  }
}
