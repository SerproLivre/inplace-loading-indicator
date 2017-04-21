import { Injectable } from '@angular/core';

/**
 * Provides access to source code to be displayed on CodeEditor
 *
 * @export
 * @class PraticoCodeManager
 */
@Injectable()
export class CodeManager {
  getCode(path: string) {
    return `
      let a = 1;

      let p = new Promise((resolve, reject) => {
        setTimeout(() => resolve(), 3000);
      });
    `;
  }
}
