import { NgModule, ModuleWithProviders } from '@angular/core';
import { ImageAssetsLoader } from './services/image-assets-loader.service';
import { NgxSerproRxModule } from '../rx/rx.module';
import { InplaceLoadingComponent } from './components/inplace-loading.component';
import { ObservableWatcherPipe } from './pipes/observable-watcher.pipe';
import { SvgSpinnerComponent } from './components/svg-spinner.component';
import { BrowserModule } from '@angular/platform-browser';


export const NGX_SERPRO_UI_PROVIDERS = [
  ImageAssetsLoader
];


@NgModule({
  declarations: [InplaceLoadingComponent, SvgSpinnerComponent, ObservableWatcherPipe],
  entryComponents: [InplaceLoadingComponent, SvgSpinnerComponent],
  exports: [InplaceLoadingComponent, SvgSpinnerComponent],
  imports: [
    NgxSerproRxModule,
    BrowserModule
  ]
})
export class NgxSerproUiModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: NgxSerproUiModule,
      providers: NGX_SERPRO_UI_PROVIDERS
    };
  }

}

