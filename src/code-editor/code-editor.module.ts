import { NgModule, ModuleWithProviders } from '@angular/core';
import { CodeEditorComponent } from './components/code-editor.component';
import { CodeManager } from './services/code-manager.service';
import { PraticoBrowserModule } from '../browser';
import { CodeEditorConfig } from './services/code-editor.config.service';
import { MonacoInitializer } from './services/monaco-initializer.service';
import { MonacoTypingsLoader } from './services/monaco-typings-loader.service';

export const PRATICAL_CODEEDITOR_PROVIDERS = [
  CodeManager,
  CodeEditorConfig,
  MonacoInitializer,
  MonacoTypingsLoader
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
      providers: PRATICAL_CODEEDITOR_PROVIDERS
    };
  }
}
