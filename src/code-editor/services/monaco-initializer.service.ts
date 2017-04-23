import { WindowRef } from '../../browser/services/window-ref.service';
import { CodeEditorConfig } from './code-editor.config.service';
import { MonacoTypingsLoader } from './monaco-typings-loader.service';
import { Injectable } from '@angular/core';
@Injectable()
export class MonacoInitializer {

  private resolve: Function;
  private reject: Function;

  static initialize(windowRef: WindowRef, config: CodeEditorConfig, typingsLoader: MonacoTypingsLoader) {
    return function() {
      console.log('ASDASDSA ASDAS DSA DA');
      const monacoInitializer = new MonacoInitializer(windowRef, config, typingsLoader);
      debugger;
      return monacoInitializer.init();
    };
  }

  constructor(private windowRef: WindowRef, private config: CodeEditorConfig, private typingsLoader: MonacoTypingsLoader) {
  }

  private init(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      this.resolve = resolve;
      this.reject = reject;

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
    });
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
    this.typingsLoader.loadTypings();
    this.resolve();
  }
}
