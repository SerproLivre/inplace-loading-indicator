import { Injectable } from '@angular/core';
import { WindowRef } from '../../browser/services/window-ref.service';
import { CodeEditorConfig } from './code-editor.config.service';

@Injectable()
export class MonacoInitializer {
  constructor(protected windowRef: WindowRef, protected config: CodeEditorConfig ) {
    this.init();
  }

  private init() {

    const onGotAmdLoader = () => {
      // Load monaco
      this.windowRef.nativeWindow.require.config({ paths: { 'vs': this.config.monacoPath } });
      this.windowRef.nativeWindow.require(['vs/editor/editor.main'], () => {
        this.configureTypescript();
      });
    };

    // Load AMD loader if necessary
    if (!this.windowRef.nativeWindow.require) {
      const loaderScript = document.createElement('script');
      loaderScript.type = 'text/javascript';
      loaderScript.src = 'assets/monaco/vs/loader.js';
      loaderScript.addEventListener('load', onGotAmdLoader);
      document.body.appendChild(loaderScript);
    } else {
      onGotAmdLoader();
    }
  }

  private configureTypescript() {
    monaco.languages.typescript.typescriptDefaults.setCompilerOptions({
      target: monaco.languages.typescript.ScriptTarget.ES2016,
      allowNonTsExtensions: true,
      moduleResolution: monaco.languages.typescript.ModuleResolutionKind.NodeJs,
      module: monaco.languages.typescript.ModuleKind.CommonJS,
      noEmit: true,
      allowSyntheticDefaultImports: true,
      emitDecoratorMetadata: true,
      experimentalDecorators: true,
      typeRoots: [
        '@types'
      ]
    });
  }
}
