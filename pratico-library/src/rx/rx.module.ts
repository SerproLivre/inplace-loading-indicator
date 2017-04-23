import { NgModule, ModuleWithProviders } from '@angular/core';
import { ObservableWatcher } from './observable-watcher';

export const PRATICAL_RX_PROVIDERS = [
  ObservableWatcher
];

@NgModule({
  providers: [],
  declarations: [],
  entryComponents: [],
  exports: []
})
export class PraticoRxModule {
  static forRoot(): ModuleWithProviders {
        return {
            ngModule: PraticoRxModule,
            providers: PRATICAL_RX_PROVIDERS
        };
    }
}
