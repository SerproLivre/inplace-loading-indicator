import { EventEmitter } from '@angular/core';
import { ScrollPosition } from '../models/scroll-position';
export declare class WindowRef {
    titleChanged: EventEmitter<string>;
    scrollChanged: EventEmitter<ScrollPosition>;
    private _window;
    constructor();
    private readonly window;
    title: string;
    scrollTo(x: number, y: number): void;
    readonly nativeWindow: any;
    protected notifyTitleChanged(value: string): void;
    protected notifyScrollChanged(x: number, y: number): void;
    setCustomData(key: string, data: any): void;
    getCustomData<T>(key: string): T;
}
