import { ModuleWithProviders } from '@angular/core';
import { WindowRef } from './services/window-ref.service';
import { UUIDGenerator } from './services/uuid-generator.service';
export declare const defaultWindow: Window;
export declare function buildWindowProvider(): WindowRef;
export declare const PRATICO_BROWSER_MODULE_PROVIDERS: (typeof UUIDGenerator | {
    provide: typeof WindowRef;
    useFactory: () => WindowRef;
})[];
export declare class PraticoBrowserModule {
    static forRoot(): ModuleWithProviders;
}
