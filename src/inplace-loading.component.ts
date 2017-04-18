import {
    Component, HostBinding, ChangeDetectorRef, Input, OnChanges,
    SimpleChanges, ChangeDetectionStrategy, Output, EventEmitter/*, ViewChild, ElementRef,*/
} from '@angular/core';

import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/concat';
import 'rxjs/add/observable/of';
import { LoadingImageAssets } from './loading-image-assets.service';
//import { Renderer } from '@angular/core';

@Component({
    selector: 'serpro-inplace-loading',
    template: `<span class="loading-indicator"><img [src]="imageUrl"></span>`,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class InplaceLoadingComponent implements OnChanges {

    _loading: boolean = false;

    // @ViewChild('img') imageElement: ElementRef;

    
    private get loading() {
        return this._loading;
    }

    private set loading(value: boolean) {
        this._loading = value;
    }

    _loadingImage: string = null;

    @Input()
    get loadingImage() {
        return this._loadingImage;
    }

    set loadingImage(value: string) {
        this._loadingImage = value;
        //this.ref.markForCheck();
    }

    @Output()
    afterLoad = new EventEmitter<void>();

    _observable: Observable<any>;

    @HostBinding('style.display')
    get style() {
        return this.loading ? 'inline-block' : 'none';
    }

    constructor(
        protected assets: LoadingImageAssets,
        protected ref: ChangeDetectorRef,
        protected sanitizer: DomSanitizer,
        //protected renderer: Renderer
    ) {
    }

    // ngAfterViewInit() {
    //     this.updateImage();
    // }

    // private updateImage() {
    //     this.renderer.setElementAttribute(this.imageElement.nativeElement, 'src', this.imageUrl.toString());

    // }
    ngOnChanges(changes: SimpleChanges) {
        //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
        //Add 'implements OnChanges' to the class.
        if (changes['observable'] && changes['observable'].currentValue) {
            this.ref.detectChanges();
            (<Observable<any>>changes['observable'].currentValue)
                .subscribe(
                null,
                () => this.onAfterLoad(),
                () => this.onAfterLoad());
        }
        if (changes['loadingImage'] && changes['loadingImage'].currentValue) {
            console.log('NgOnChanges', 'loadingImage', changes['loadingImage']);
            this._loadingImage = changes['loadingImage'].currentValue;
            this.ref.markForCheck();
            this.ref.detectChanges();
        }

    }

    get imageUrl(): SafeHtml {
        if (this.loadingImage && this.assets.getAssetByName(this.loadingImage)) {
            return this.sanitizer.bypassSecurityTrustResourceUrl(window['unescape'](this.assets.getAssetByName(this.loadingImage)).replace("\"", "").replace("\"", ""));
        } else {
            return this.sanitizer.bypassSecurityTrustResourceUrl(window['unescape'](this.assets.getDefaultAsset()).replace("\"", "").replace("\"", ""));
        }
    }

    @Input()
    get observable() {
        return this._observable;
    }

    set observable(value: Observable<any>) {
        if (value) {
            this._observable = Observable.of(null);
            value.concat(this._observable)
            this.loading = true;
        }
    }

    private onAfterLoad() {
        this.afterLoad.emit();
        this.loading = false;
        this.ref.markForCheck()
    }

}

