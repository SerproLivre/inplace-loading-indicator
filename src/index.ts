import { NgModule, ModuleWithProviders } from '@angular/core';
import { LoadingImageAssets } from './services/loading-image-assets.service';
import { InplaceLoadingComponent } from './inplace-loading.component';

export const INPLACE_LOADING_PROVIDERS = [
    {
        provide: LoadingImageAssets,
        useClass: LoadingImageAssets
    }
];

@NgModule({
    declarations: [
        InplaceLoadingComponent
    ],
    entryComponents: [
        InplaceLoadingComponent
    ],
    exports: [
        InplaceLoadingComponent
    ]
})
export class InplaceLoadingModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: InplaceLoadingModule,
            providers: INPLACE_LOADING_PROVIDERS
        }
    }
}
