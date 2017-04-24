import { NgModule, ModuleWithProviders } from '@angular/core';
import { ImageAssetsLoader } from './services/image-assets-loader.service';
import { PraticoRxModule } from '../rx/rx.module';
import { VisibleWhenLoadingComponent } from './components/inplace-loading.component';
import { ObservableWatcherPipe } from './pipes/observable-watcher.pipe';
import { SvgSpinnerComponent } from './components/svg-spinner.component';
import { BrowserModule } from '@angular/platform-browser';
import { AppSplashComponent } from './components/app-splash.component';


export const PRATICAL_UI_PROVIDERS = [
  ImageAssetsLoader
];


@NgModule({
  declarations: [AppSplashComponent, VisibleWhenLoadingComponent, SvgSpinnerComponent, ObservableWatcherPipe],
  entryComponents: [AppSplashComponent, VisibleWhenLoadingComponent, SvgSpinnerComponent],
  exports: [AppSplashComponent, VisibleWhenLoadingComponent, SvgSpinnerComponent],
  imports: [
    PraticoRxModule,
    BrowserModule
  ]
})
export class PraticoUiModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: PraticoUiModule,
      providers: PRATICAL_UI_PROVIDERS
    };
  }

}

