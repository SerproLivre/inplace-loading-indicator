import { NgModule, ModuleWithProviders } from '@angular/core';
import { ImageAssetsLoader } from './services/image-assets-loader.service';
import { InplaceLoadingComponent } from './inplace-loading.component';
import { ObservableWatcherPipe } from "./pipes/observable-watcher.pipe";

export const INPLACE_LOADING_PROVIDERS = [
    {
        provide: ImageAssetsLoader,
        useClass: ImageAssetsLoader
    }
];

@NgModule({
    declarations: [
        InplaceLoadingComponent,
        ObservableWatcherPipe
    ],
    exports: [
        InplaceLoadingComponent,
        ObservableWatcherPipe
    ],
    entryComponents: [
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
