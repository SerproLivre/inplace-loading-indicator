import { NgModule, ModuleWithProviders } from '@angular/core';
import { ObservableWatcher } from './observable-watcher';

export const NGX_SERPRO_RX_PROVIDERS = [
  ObservableWatcher
];

@NgModule({
  providers: [],
  declarations: [],
  entryComponents: [],
  exports: []
})
export class NgxSerproRxModule {
  static forRoot(): ModuleWithProviders {
        return {
            ngModule: NgxSerproRxModule,
            providers: NGX_SERPRO_RX_PROVIDERS
        };
    }
}
