import { NgModule, ModuleWithProviders } from '@angular/core';
import { CodeEditorComponent } from './components/code-editor.component';
import { CodeManager } from './services/code-manager.service';
import { PraticoBrowserModule } from '../browser';

export const PRATICAL_CODEEDITOR_PROVIDERS = [
  CodeManager
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
      ngModule: PraticoBrowserModule,
      providers: PRATICAL_CODEEDITOR_PROVIDERS
    };
  }
}
