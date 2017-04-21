import { NgModule, ModuleWithProviders } from '@angular/core';
import { WindowRef } from './services/window-ref.service';


export const defaultWindow = window;

export function buildWindowProvider() {
  const windowRef = new WindowRef();
  windowRef['_window'] = defaultWindow;
  return windowRef;
}

export const PRATICAL_BROWSER_MODULE_PROVIDERS = [
  {
    provide: WindowRef,
    useFactory: buildWindowProvider
  }
];



@NgModule({
  providers: [
  ]
})
export class PraticoBrowserModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: PraticoBrowserModule,
      providers: PRATICAL_BROWSER_MODULE_PROVIDERS
    };

  }
}
