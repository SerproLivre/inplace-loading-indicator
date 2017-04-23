import { NgModule, ModuleWithProviders, forwardRef , APP_INITIALIZER, InjectionToken } from '@angular/core';
import { CodeEditorComponent } from './components/code-editor.component';
import { CodeManager } from './services/code-manager.service';
import { PraticoBrowserModule } from '../browser';
import { CodeEditorConfig } from './services/code-editor.config.service';
import { MonacoTypingsLoader } from './services/monaco-typings-loader.service';
import { MonacoInitializer } from './services/monaco-initializer.service';
import { WindowRef } from '../browser/services/window-ref.service';
/**
 * Inspired on:
 * - https://www.npmjs.com/package/ng2-monaco-editor / https://github.com/0plus1/ng2-monaco-editor
 * - https://gist.github.com/chrisber/ef567098216319784c0596c5dac8e3aa
//  */

window['ijt'] = new InjectionToken('');




export const PRATICAL_CODE_EDITOR_PROVIDERS = [
  CodeManager,
  CodeEditorConfig,
  MonacoTypingsLoader,
  MonacoInitializer,
  {
    provide: APP_INITIALIZER,
    useFactory: MonacoInitializer.initialize,
    deps: [WindowRef, forwardRef(() => CodeEditorConfig ), forwardRef(() => MonacoTypingsLoader) ], multi: true

  }
];
@NgModule({
  declarations: [CodeEditorComponent],
  entryComponents: [CodeEditorComponent],
  exports: [CodeEditorComponent],
  imports: [
    PraticoBrowserModule.forRoot()
  ]
})
export class PraticoCodeEditorModule {

  static forRoot(): ModuleWithProviders {
    return {
      ngModule: PraticoCodeEditorModule,
      providers: PRATICAL_CODE_EDITOR_PROVIDERS
    };
  }

}
