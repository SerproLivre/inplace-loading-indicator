import { NgModule, ModuleWithProviders } from '@angular/core';
import { SvgSpinnerComponent } from './svg-spinner.component';
import { ImageAssetsLoader } from './image-assets-loader.service';

export const PRATICO_SVG_SPINNER_PROVIDERS = [
  ImageAssetsLoader
];

@NgModule({
  declarations: [
    SvgSpinnerComponent
  ],
  entryComponents: [
    SvgSpinnerComponent
  ],
  exports: [
    SvgSpinnerComponent
  ]
})
export class PraticoSvgSpinnerModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: PraticoSvgSpinnerModule,
      providers: PRATICO_SVG_SPINNER_PROVIDERS
    };
  }
}
